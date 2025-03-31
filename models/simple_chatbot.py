import json
from difflib import get_close_matches
import google.generativeai as genai
import os

# Configure Gemini
genai.configure(api_key='AIzaSyBv-2pIOvWKeT0iQ6D-4lAZZRq6lydNJeQ')

# Set up the model
generation_config = {
    "temperature": 0.7,  # Balanced between creativity and accuracy
    "top_p": 0.9,
    "top_k": 40,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Initialize conversation history with categories
conversation_history = []
MAX_HISTORY = 5  # Keep last 5 exchanges for context

def format_conversation_history():
    """Format conversation history for the prompt"""
    if not conversation_history:
        return ""
    
    history_text = "\nPrevious conversation:\n"
    for msg in conversation_history:
        role = "User" if msg['is_user'] else "Assistant"
        category = msg.get('category', '')
        category_text = f" [{category}]" if category else ""
        history_text += f"{role}{category_text}: {msg['text']}\n"
    return history_text

model = genai.GenerativeModel(
    model_name="gemini-pro",
    generation_config=generation_config,
    safety_settings=safety_settings
)

def get_category_from_question(question, qa_database):
    """Determine the most likely category for a question"""
    question = question.lower()
    best_match = None
    best_score = 0
    
    for qa in qa_database:
        category = qa['category']
        # Check direct matches in questions
        if any(q in question for q in qa['questions']):
            return category
        
        # Calculate word overlap with questions
        question_words = set(question.split())
        for q in qa['questions']:
            current_words = set(q.split())
            overlap = len(question_words.intersection(current_words))
            score = overlap / max(len(question_words), len(current_words))
            if score > best_score:
                best_score = score
                best_match = category
    
    return best_match if best_score > 0.3 else "General"

def get_response(user_message, qa_database):
    """
    Get a response from the chatbot based on the user's message.
    Uses Gemini model for advanced responses, falls back to pattern matching.
    """
    try:
        # Determine category
        category = get_category_from_question(user_message, qa_database)
        
        # Update conversation history
        conversation_history.append({
            'text': user_message,
            'is_user': True,
            'category': category
        })
        if len(conversation_history) > MAX_HISTORY * 2:
            conversation_history.pop(0)

        # First try Gemini model
        try:
            # Create a more detailed prompt with conversation history and category
            history = format_conversation_history()
            enhanced_prompt = f"""You are an expert E-Waste Management AI Assistant. Your role is to provide accurate, helpful, and practical information about electronic waste management.

{history}

Current question category: {category}
Current question: {user_message}

Please provide a response that:
1. Focuses on the {category} aspect of e-waste management
2. Includes specific examples and actionable steps when relevant
3. References current best practices and regulations
4. Considers both individual and business perspectives
5. Maintains scientific accuracy while being easy to understand

Consider these aspects:
- Latest developments in e-waste management and recycling
- Environmental and health impacts
- Local and international regulations
- Practical solutions and best practices
- Cost-effectiveness and accessibility
- Regional variations and requirements

Format your response with clear sections and bullet points when appropriate."""

            response = model.generate_content(enhanced_prompt)
            if response and response.text:
                ai_response = response.text.strip()
                conversation_history.append({
                    'text': ai_response,
                    'is_user': False,
                    'category': category
                })
                return ai_response
        except Exception as e:
            print(f"Gemini API error: {str(e)}")
            # Fall back to pattern matching if Gemini fails
            pass

        # Enhanced pattern matching fallback
        user_message = user_message.lower().strip()
        
        # Direct match with improved response selection
        best_match = None
        best_score = 0
        matched_category = None
        
        for qa in qa_database:
            # Prioritize matches within the same category
            category_boost = 1.2 if qa['category'] == category else 1.0
            
            # Check for exact matches first
            if user_message in qa.get('questions', []):
                best_match = qa.get('answer', '')
                matched_category = qa['category']
                break
            
            # Calculate match score based on word overlap
            question_words = set(user_message.split())
            for question in qa.get('questions', []):
                current_words = set(question.split())
                overlap = len(question_words.intersection(current_words))
                score = (overlap / len(question_words)) * category_boost
                if score > best_score:
                    best_score = score
                    best_match = qa.get('answer', '')
                    matched_category = qa['category']

        if best_match:
            conversation_history.append({
                'text': best_match,
                'is_user': False,
                'category': matched_category
            })
            return best_match

        # If no good match found, use a more helpful default response
        default_response = f"""I'm not quite sure about your question regarding {category}. To help you better, could you:
1. Provide more specific details about your e-waste query?
2. Specify if you're interested in:
   - Basic concepts and definitions
   - Disposal and recycling methods
   - Environmental impacts
   - Regulations and compliance
   - Statistics and trends
   - Specific device types or materials

You can also try rephrasing your question or asking about a specific aspect of e-waste management."""
        
        conversation_history.append({
            'text': default_response,
            'is_user': False,
            'category': 'General'
        })
        return default_response
        
    except Exception as e:
        print(f"Error in get_response: {str(e)}")
        error_response = "I apologize, but I encountered an error. Please try rephrasing your question about e-waste management."
        conversation_history.append({
            'text': error_response,
            'is_user': False,
            'category': 'Error'
        })
        return error_response 