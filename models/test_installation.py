import sys
import nltk
import torch
import transformers
import pygame
import speech_recognition as sr
from gtts import gTTS
from googletrans import Translator
from langdetect import detect

def test_dependencies():
    print("Testing dependencies...")
    
    try:
        print("\nTesting NLTK...")
        nltk.download('punkt', quiet=True)
        print("✓ NLTK working")
        
        print("\nTesting PyTorch...")
        print(f"PyTorch version: {torch.__version__}")
        print(f"CUDA available: {torch.cuda.is_available()}")
        print("✓ PyTorch working")
        
        print("\nTesting Transformers...")
        print(f"Transformers version: {transformers.__version__}")
        print("✓ Transformers working")
        
        print("\nTesting PyGame...")
        pygame.init()
        pygame.quit()
        print("✓ PyGame working")
        
        print("\nTesting Speech Recognition...")
        recognizer = sr.Recognizer()
        print("✓ Speech Recognition working")
        
        print("\nTesting gTTS...")
        tts = gTTS(text="Test", lang='en')
        print("✓ gTTS working")
        
        print("\nTesting Translator...")
        translator = Translator()
        print("✓ Translator working")
        
        print("\nTesting Language Detection...")
        detected = detect("Hello")
        print("✓ Language Detection working")
        
        print("\nAll dependencies are working correctly!")
        return True
        
    except Exception as e:
        print(f"\nError testing dependencies: {str(e)}")
        return False

if __name__ == "__main__":
    if test_dependencies():
        print("\nYou can now run the chatbot!")
    else:
        print("\nPlease fix the dependencies before running the chatbot.") 