import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import json
import speech_recognition as sr
from gtts import gTTS
import pygame
import os
from langdetect import detect, LangDetectException
from deep_translator import GoogleTranslator
import time
from concurrent.futures import ThreadPoolExecutor, TimeoutError
import threading
import google.generativeai as genai
from datetime import datetime

class MultilingualEWasteChatbot:
    def __init__(self):
        print("Initializing E-Waste Management Assistant...")
        
        # Initialize with shorter timeouts and connection handling
        self.max_retries = 2
        self.timeout = 10  # 10 seconds timeout
        
        # Initialize components with proper error handling
        try:
            print("Loading NLTK data...")
            nltk.download('punkt', quiet=True)
            nltk.download('stopwords', quiet=True)
            nltk.download('wordnet', quiet=True)
            self.stop_words = set(stopwords.words('english'))
            self.lemmatizer = WordNetLemmatizer()
        except Exception as e:
            print(f"Warning: NLTK initialization error: {str(e)}")

        # Initialize speech components
        self.recognizer = sr.Recognizer()
        self.audio_enabled = False
        pygame.mixer.init()

        # Initialize chat history
        self.chat_history = []

        # Initialize Gemini with fallback
        self.initialize_gemini()
        
        # Set up language support
        self.supported_languages = {
            'en': 'English',
            'es': 'Spanish',
            'de': 'German',
            'fr': 'French',
            'zh': 'Chinese',
            'ja': 'Japanese'
        }
        self.preferred_language = 'en'
        
        print("Loading knowledge database...")
        self.load_knowledge_base()
        print("Database loaded successfully!")

    def initialize_gemini(self):
        """Initialize Gemini model with proper error handling and timeouts"""
        print("Initializing Gemini model...")
        try:
            # Configure Gemini
            genai.configure(api_key=os.getenv('GOOGLE_API_KEY', 'your-api-key'))
            
            # Set up the model with safety settings
            generation_config = {
                "temperature": 0.7,
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 2048,
            }

            safety_settings = [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]

            # Define system prompt
            self.system_prompt = """You are an advanced E-Waste Management AI Assistant with comprehensive knowledge of electronic waste, environmental science, and sustainability. Your expertise includes:

1. Deep Technical Knowledge:
   - Electronic components and materials
   - Chemical composition of different e-waste types
   - Advanced recycling technologies and processes
   - Global e-waste statistics and trends
   - Emerging technologies in e-waste management

2. Environmental & Health Expertise:
   - Detailed understanding of environmental impacts
   - Health risks and safety protocols
   - Soil and water contamination effects
   - Long-term ecological consequences
   - Public health implications

3. Regulatory & Compliance Knowledge:
   - International e-waste regulations
   - Country-specific legislation
   - Industry standards and certifications
   - Corporate responsibility guidelines
   - Import/export regulations

4. Practical Solutions:
   - Innovative recycling methods
   - Circular economy principles
   - Zero-waste strategies
   - Urban mining techniques
   - Sustainable electronics design

Interaction Style:
- Be conversational yet professional
- Provide detailed, scientifically accurate information
- Use real-world examples and current statistics
- Adapt your response depth based on the question's complexity
- Offer practical, actionable advice
- Reference relevant research or studies when appropriate
- Acknowledge regional differences in practices and regulations

When answering questions:
1. First understand the context and scope of the query
2. Provide comprehensive yet clear explanations
3. Include relevant examples and data points
4. Offer practical recommendations
5. Address potential concerns or misconceptions
6. Suggest additional related information when relevant

Remember: You're not just providing information, but helping build awareness about e-waste management and environmental sustainability."""

            start_time = time.time()
            while time.time() - start_time < self.timeout:
                try:
                    self.model = genai.GenerativeModel(
                        model_name="gemini-pro",
                        generation_config=generation_config,
                        safety_settings=safety_settings
                    )
                    self.chat = self.model.start_chat(history=[])
                    
                    # Initialize with system prompt
                    response = self.chat.send_message(
                        self.system_prompt,
                        timeout=5
                    )
                    print("Gemini model initialized successfully!")
                    return
                except Exception as e:
                    if time.time() - start_time + 2 >= self.timeout:  # +2 for next iteration
                        raise
                    time.sleep(2)  # Short delay between retries
            
        except Exception as e:
            print(f"Warning: Gemini initialization failed: {str(e)}")
            print("Falling back to default response system")
            self.model = None
            self.chat = None

    def load_knowledge_base(self):
        """Load e-waste knowledge base with timeout"""
        try:
            # Load the full knowledge base
            with open('ML_model/qa_database.json', 'r', encoding='utf-8') as f:
                self.qa_database = json.load(f)
            
            # Also keep the simplified version for fallback
            self.knowledge_base = {
                'categories': ['electronics', 'batteries', 'appliances'],
                'disposal_methods': ['recycling', 'refurbishment', 'proper disposal'],
                'environmental_impact': ['toxicity', 'resource conservation', 'pollution prevention']
            }
        except Exception as e:
            print(f"Warning: Knowledge base loading error: {str(e)}")
            self.knowledge_base = {}
            self.qa_database = {}

    def generate_response(self, user_input):
        """Generate response with enhanced intelligence"""
        try:
            if self.model and self.chat:
                try:
                    # Add context and enhance the query
                    enhanced_input = f"""Context: User asks about {user_input}
                    Consider:
                    - Latest developments in e-waste management
                    - Regional and global perspectives
                    - Scientific accuracy and practical applicability
                    - Environmental and social impacts
                    - Current best practices and innovations
                    
                    Question: {user_input}"""
                    
                    response = self.chat.send_message(
                        enhanced_input,
                        timeout=self.timeout
                    )
                    return response.text
                except Exception as e:
                    print(f"Gemini response error: {str(e)}")
                    # Fall through to default response
            
            # Enhanced default response system
            return self.generate_enhanced_response(user_input)
            
        except Exception as e:
            print(f"Response generation error: {str(e)}")
            return "I apologize, but I'm having trouble processing your request. Please try again in a moment."

    def generate_enhanced_response(self, user_input):
        """Generate an intelligent default response"""
        user_input = user_input.lower()
        
        # Load relevant knowledge from database
        context = self.get_relevant_knowledge(user_input)
        
        if 'what is' in user_input or 'define' in user_input:
            return self.generate_definition_response(user_input, context)
        elif any(word in user_input for word in ['how', 'process', 'method']):
            return self.generate_process_response(user_input, context)
        elif any(word in user_input for word in ['why', 'impact', 'effect']):
            return self.generate_impact_response(user_input, context)
        elif any(word in user_input for word in ['regulation', 'law', 'compliance']):
            return self.generate_regulation_response(user_input, context)
        else:
            return self.generate_general_response(user_input, context)

    def get_relevant_knowledge(self, query):
        """Get relevant knowledge from the database"""
        try:
            relevant_info = {
                'definitions': {},
                'processes': {},
                'impacts': {},
                'regulations': {},
                'statistics': {},
                'best_practices': {}
            }
            
            # Add logic to populate relevant_info from self.qa_database
            # This would involve semantic matching, keyword analysis, etc.
            
            return relevant_info
        except Exception as e:
            print(f"Error getting relevant knowledge: {str(e)}")
            return {}

    def generate_definition_response(self, query, context):
        """Generate a comprehensive definition response"""
        if 'e-waste' in query:
            return """**Understanding E-Waste: A Comprehensive Overview**

E-waste (electronic waste) encompasses all discarded electronic and electrical equipment, whether functional or not. This rapidly growing waste stream presents both environmental challenges and economic opportunities in our digital age.

**Key Categories of E-Waste:**
• Temperature Exchange Equipment
  - Refrigerators, freezers, air conditioners
  - Contains harmful refrigerants and insulation
• Screens and Monitors
  - TVs, monitors, laptops, tablets
  - Often contain mercury and lead
• Large Equipment
  - Washing machines, electric stoves, large printing machines
  - Mixed materials including metals and plastics
• Small Equipment
  - Vacuum cleaners, microwaves, electronic toys
  - Various valuable and hazardous components
• Small IT Equipment
  - Smartphones, GPS devices, calculators, routers
  - Contains precious metals and rare earth elements
• IT and Telecom Equipment
  - PCs, printers, phones, servers
  - High concentration of valuable materials

**Composition and Value:**
• Precious Metals: Gold, silver, platinum, palladium
• Base Metals: Copper, aluminum, iron, tin
• Rare Earth Elements: Neodymium, dysprosium, terbium
• Hazardous Materials: Lead, mercury, cadmium, brominated flame retardants

**Global Impact:**
• Annual Generation: Over 50 million metric tons globally
• Economic Value: Worth over $62.5 billion in raw materials
• Recycling Rate: Less than 20% properly recycled worldwide
• Growth Rate: Increasing by 3-4% annually

**Environmental and Health Implications:**
1. Toxic Pollution
   - Soil contamination from heavy metals
   - Water table pollution affecting ecosystems
   - Air pollution from improper burning
2. Resource Depletion
   - Loss of valuable materials
   - Increased mining pressure
3. Climate Impact
   - Greenhouse gas emissions from production
   - Energy waste from improper disposal

**Modern Management Approaches:**
1. Circular Economy Integration
   - Design for disassembly
   - Modular construction
   - Material recovery systems
2. Smart Recycling
   - Automated sorting technologies
   - Advanced material recovery
   - Urban mining initiatives
3. Extended Producer Responsibility
   - Take-back programs
   - Eco-design requirements
   - End-of-life management

This comprehensive understanding of e-waste is crucial for developing effective management strategies and promoting sustainable electronics consumption."""
        else:
            return self.generate_general_response(query, context)

    def generate_process_response(self, query, context):
        """Generate a detailed process response"""
        # Implementation for process-related responses
        pass

    def generate_impact_response(self, query, context):
        """Generate an impact analysis response"""
        # Implementation for impact-related responses
        pass

    def generate_regulation_response(self, query, context):
        """Generate a regulation-focused response"""
        # Implementation for regulation-related responses
        pass

    def generate_general_response(self, query, context):
        """Generate a general intelligent response"""
        return """I understand you have a question about e-waste management. To provide you with the most accurate and helpful information, could you please specify your interest in:

**Technical Aspects:**
• Material composition and recovery
• Recycling technologies and processes
• Equipment types and classifications
• Innovation in e-waste processing

**Environmental Concerns:**
• Ecological impact assessment
• Contamination prevention
• Resource conservation
• Climate change implications

**Management Strategies:**
• Collection and transportation
• Processing and recovery
• Final disposal methods
• Urban mining techniques

**Regulatory Framework:**
• International conventions
• National legislation
• Industry standards
• Compliance requirements

**Economic Opportunities:**
• Material recovery value
• Circular economy benefits
• Job creation potential
• Market developments

Please let me know which aspect interests you, and I'll provide detailed information tailored to your needs."""

    def detect_language(self, text):
        """Detect the language of input text"""
        try:
            return detect(text)
        except LangDetectException:
            return 'en'

    def translate_text(self, text, target_lang='en'):
        """Translate text between languages"""
        try:
            source_lang = self.detect_language(text)
            if source_lang == target_lang:
                return text
            translator = GoogleTranslator(source=source_lang, target=target_lang)
            return translator.translate(text)
        except Exception as e:
            print(f"Translation error: {str(e)}")
            return text

    def text_to_speech(self, text, lang='en'):
        """Convert text to speech and play it"""
        try:
            # Create a temporary file for the audio
            temp_file = "temp_speech.mp3"
            
            # Generate speech
            tts = gTTS(text=text, lang=lang)
            tts.save(temp_file)
            
            # Play the audio
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()
            
            # Wait for the audio to finish
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)
                
            # Clean up
            pygame.mixer.music.unload()
            os.remove(temp_file)
            
        except Exception as e:
            print(f"Error in text-to-speech: {str(e)}")

    def listen_to_speech(self):
        """Record and recognize speech input"""
        try:
            with sr.Microphone() as source:
                print("\nListening...")
                audio = self.recognizer.listen(source, timeout=5)
                print("Processing speech...")
                text = self.recognizer.recognize_google(audio)
                print(f"You said: {text}")
                return text
        except sr.WaitTimeoutError:
            print("No speech detected within timeout period")
            return ""
        except sr.UnknownValueError:
            print("Could not understand audio")
            return ""
        except sr.RequestError as e:
            print(f"Could not request results; {str(e)}")
            return ""
        except Exception as e:
            print(f"Error in speech recognition: {str(e)}")
            return ""

    def set_language(self, lang_code):
        """Set the preferred language for responses"""
        if lang_code in self.supported_languages:
            self.preferred_language = lang_code
            return f"Language set to {self.supported_languages[lang_code]}"
        return f"Language not supported. Supported languages: {', '.join(f'{code}: {name}' for code, name in self.supported_languages.items())}"

    def chat(self):
        """Main chat loop"""
        print("\n" + "="*50)
        print("Multilingual E-Waste Management Chatbot")
        print("="*50)
        print("\nSupported languages:", ", ".join([f"{code}: {name}" for code, name in self.supported_languages.items()]))
        print("\nFeatures:")
        print("1. Type your question in any supported language")
        print("2. Type 'set language <code>' to set preferred language (e.g., 'set language hi' for Hindi)")
        print("3. Type 'voice' to use voice input")
        print("4. Type 'audio on' to enable audio responses")
        print("5. Type 'audio off' to disable audio responses")
        print("6. Type 'quit' to exit")
        print("\nType your question when ready!")
        print("="*50)
        
        while True:
            try:
                # Get user input
                print("\nYou:", end=" ")
                user_input = input().strip()
                
                # Check for special commands
                if user_input.lower() == 'quit':
                    print("\nExiting chatbot...")
                    break
                    
                if user_input.lower() == 'voice':
                    user_input = self.listen_to_speech()
                    if not user_input:
                        continue
                
                if user_input.lower() == 'audio on':
                    if pygame.mixer.get_init():
                        self.audio_enabled = True
                        print("Audio responses enabled")
                    else:
                        print("Could not initialize audio system")
                    continue
                    
                if user_input.lower() == 'audio off':
                    self.audio_enabled = False
                    print("Audio responses disabled")
                    continue
                
                # Generate response
                response = self.generate_response(user_input)
                print("\nChatbot:", response)
                
                # Convert response to speech if audio is enabled
                if self.audio_enabled:
                    self.text_to_speech(response, self.preferred_language)
                    
            except KeyboardInterrupt:
                print("\nExiting chatbot...")
                break
            except Exception as e:
                print(f"\nError: {str(e)}")
                print("Please try again")

if __name__ == "__main__":
    chatbot = MultilingualEWasteChatbot()
    chatbot.chat()
