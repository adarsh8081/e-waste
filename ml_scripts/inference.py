import json
import sys
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from typing import Optional, Dict, List
import numpy as np

class EWasteAssistant:
    def __init__(
        self,
        model_path: str = "microsoft/phi-2",
        device: str = "cuda" if torch.cuda.is_available() else "cpu",
        max_length: int = 2048,
        temperature: float = 0.8,
        top_p: float = 0.92,
        top_k: int = 50,
        repetition_penalty: float = 1.2,
        no_repeat_ngram_size: int = 3,
    ):
        self.device = device
        self.max_length = max_length
        self.temperature = temperature
        self.top_p = top_p
        self.top_k = top_k
        self.repetition_penalty = repetition_penalty
        self.no_repeat_ngram_size = no_repeat_ngram_size
        
        print(f"Loading model from {model_path}...")
        self.tokenizer = AutoTokenizer.from_pretrained(
            model_path,
            padding_side="left",
            truncation_side="left",
        )
        self.model = AutoModelForCausalLM.from_pretrained(
            model_path,
            torch_dtype=torch.float16 if device == "cuda" else torch.float32,
            low_cpu_mem_usage=True,
            device_map="auto" if device == "cuda" else None,
            trust_remote_code=True
        ).to(device)
        
        self.conversation_template = [
            {
                "role": "system",
                "content": """You are EcoGuide, a friendly and engaging E-Waste Management Assistant. Your communication style is:

1. 👋 Warm and Approachable
- Use natural, conversational language
- Show enthusiasm and empathy
- Make complex topics accessible

2. 🤝 Interactive and Engaging
- Ask relevant follow-up questions
- Encourage dialogue and exploration
- Provide options for users to learn more

3. 💡 Practical and Actionable
- Give specific, implementable advice
- Share real-world examples
- Break down complex processes into steps

4. 🎯 Clear and Structured
- Use bullet points and emojis
- Organize information logically
- Highlight key points visually

5. 🌟 Educational and Informative
- Share interesting facts and statistics
- Explain environmental impacts
- Connect concepts to daily life

Remember to:
- Start with a friendly greeting
- Address the specific question
- Provide practical examples
- End with an engaging question
- Use emojis and formatting for engagement"""
            }
        ]
        
        # Define interactive response templates
        self.greeting_template = """👋 Hello! I'm EcoGuide, your friendly e-waste management assistant. How can I help you today?

Choose a topic you'd like to explore:

1. 📱 Basic concepts and definitions
2. ♻️ Disposal and recycling methods
3. 🌍 Environmental impacts
4. 📋 Regulations and compliance
5. 📊 Statistics and trends
6. 🔧 Specific device types or materials

Or feel free to ask any specific question!"""

        self.clarification_template = """I'd love to help you better! Could you please:

1. 🤔 Provide more specific details about your e-waste query?

2. 🎯 Choose a specific area of interest:
   • 📱 Basic concepts and definitions
   • ♻️ Disposal and recycling methods
   • 🌍 Environmental impacts
   • 📋 Regulations and compliance
   • 📊 Statistics and trends
   • 🔧 Specific device types or materials

Or try rephrasing your question with more details!"""

    def format_prompt(self, message: str, conversation_history: Optional[List[Dict[str, str]]] = None) -> str:
        if conversation_history is None:
            conversation_history = []
        
        # Handle special cases
        if message.lower() in ['hi', 'hello', 'hey', 'help']:
            return self.greeting_template
        
        if len(message.split()) <= 2:
            return self.clarification_template
        
        prompt = ""
        for turn in self.conversation_template:
            if turn["role"] == "system":
                prompt += f"{turn['content']}\n\n"
        
        recent_history = conversation_history[-3:] if len(conversation_history) > 3 else conversation_history
        for turn in recent_history:
            if turn["role"] == "user":
                prompt += f"User: {turn['content']}\n"
            else:
                prompt += f"Assistant: {turn['content']}\n"
        
        prompt += f"User: {message}\nAssistant: Let me help you with that! Here's a friendly and informative response: "
        return prompt

    def post_process_response(self, response: str) -> str:
        """Enhance response with interactive elements"""
        response = response.strip()
        
        # Add emojis based on content
        if 'recycling' in response.lower() and '♻️' not in response:
            response = '♻️ ' + response
        if 'environment' in response.lower() and '🌍' not in response:
            response = '🌍 ' + response
        if any(word in response.lower() for word in ['tip', 'suggest', 'recommend']) and '💡' not in response:
            response = '💡 ' + response
        
        # Add follow-up questions if none present
        if not any(sentence.strip().endswith('?') for sentence in response.split('.')):
            if 'recycling' in response.lower():
                response += "\n\n💭 Would you like to know more about specific recycling methods or locations near you?"
            elif 'environmental' in response.lower():
                response += "\n\n💭 Are you interested in learning more about the environmental impact of specific devices?"
            elif 'disposal' in response.lower():
                response += "\n\n💭 Shall I provide information about local e-waste collection centers?"
            else:
                response += "\n\n💭 What specific aspect would you like to explore further?"
        
        # Format lists and bullet points
        lines = response.split('\n')
        formatted_lines = []
        for line in lines:
            if line.strip().startswith(('-', '*')):
                line = '• ' + line.strip('-*').strip()
            formatted_lines.append(line)
        response = '\n'.join(formatted_lines)
        
        # Ensure proper ending
        if not response.endswith(('?', '!', '.')):
            response += '.'
        
        return response

    @torch.inference_mode()
    def generate_response(
        self,
        message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None
    ) -> str:
        """Generate an interactive response"""
        # Handle special cases first
        if message.lower() in ['hi', 'hello', 'hey', 'help']:
            return self.greeting_template
        
        if len(message.split()) <= 2 and message.lower() not in ['hi', 'hello', 'hey', 'help']:
            return self.clarification_template
        
        # Format the prompt
        prompt = self.format_prompt(message, conversation_history)
        
        # Tokenize input with padding
        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            truncation=True,
            max_length=self.max_length,
            padding=True,
        ).to(self.device)
        
        # Generate response with enhanced parameters
        outputs = self.model.generate(
            **inputs,
            max_length=self.max_length,
            temperature=self.temperature,
            top_p=self.top_p,
            top_k=self.top_k,
            do_sample=True,
            num_return_sequences=1,
            pad_token_id=self.tokenizer.pad_token_id,
            eos_token_id=self.tokenizer.eos_token_id,
            repetition_penalty=self.repetition_penalty,
            no_repeat_ngram_size=self.no_repeat_ngram_size,
            early_stopping=True,
            length_penalty=1.0,
            num_beams=3,  # Use beam search for better coherence
        )
        
        # Decode and clean response
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = response[len(prompt):].strip()
        
        # Post-process response
        response = self.post_process_response(response)
        
        return response
    
    def save_conversation(
        self,
        conversation_history: List[Dict[str, str]],
        filepath: str = "conversation_history.json"
    ):
        """Save conversation history to a file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(conversation_history, f, ensure_ascii=False, indent=2)
    
    def load_conversation(
        self,
        filepath: str = "conversation_history.json"
    ) -> List[Dict[str, str]]:
        """Load conversation history from a file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

def create_assistant(model_path: str = "microsoft/phi-2") -> EWasteAssistant:
    """Create and return an instance of EWasteAssistant"""
    return EWasteAssistant(model_path=model_path)

if __name__ == "__main__":
    # Test the assistant
    assistant = create_assistant()
    
    # Example conversation
    conversation = []
    
    while True:
        user_input = input("\nYou: ").strip()
        if user_input.lower() in ['quit', 'exit', 'bye']:
            break
            
        response = assistant.generate_response(user_input, conversation)
        print(f"\nAssistant: {response}")
        
        # Update conversation history
        conversation.extend([
            {"role": "user", "content": user_input},
            {"role": "assistant", "content": response}
        ])
        
    # Save conversation history
    assistant.save_conversation(conversation) 