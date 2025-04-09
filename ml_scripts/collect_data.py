import os
import json
import requests
from bs4 import BeautifulSoup
import pandas as pd
from typing import List, Dict
import arxiv
from tqdm import tqdm
from scholarly import scholarly
import wikipedia
from newspaper import Article
from datetime import datetime, timedelta

def scrape_epa_data() -> List[Dict[str, str]]:
    """Scrape e-waste related data from EPA website"""
    data = []
    urls = [
        "https://www.epa.gov/recycle/electronics-donation-and-recycling",
        "https://www.epa.gov/smm-electronics",
        "https://www.epa.gov/international-cooperation/cleaning-electronic-waste-e-waste",
        "https://www.epa.gov/hw/universal-waste",
        "https://www.epa.gov/sites/default/files/2016-11/documents/electronic_waste_management.pdf",
    ]
    
    for url in urls:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract QA pairs from the content
            questions = soup.find_all(['h2', 'h3', 'h4'])
            for q in questions:
                answer = ""
                next_elem = q.find_next_sibling()
                while next_elem and next_elem.name in ['p', 'ul', 'ol', 'div', 'table']:
                    answer += next_elem.get_text().strip() + "\n"
                    next_elem = next_elem.find_next_sibling()
                
                if answer and len(answer.split()) >= 20:  # Ensure substantial answers
                    data.append({
                        "question": q.get_text().strip(),
                        "answer": answer.strip(),
                        "source": "EPA",
                        "confidence": 0.9
                    })
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
    
    return data

def fetch_arxiv_papers() -> List[Dict[str, str]]:
    """Fetch relevant papers from arXiv"""
    data = []
    search_queries = [
        "e-waste management",
        "electronic waste recycling",
        "e-waste environmental impact",
        "electronic waste circular economy",
        "e-waste toxicity",
        "electronic waste recovery methods"
    ]
    
    for query in search_queries:
        search = arxiv.Search(
            query=query,
            max_results=30,
            sort_by=arxiv.SortCriterion.SubmittedDate
        )
        
        for paper in tqdm(search.results()):
            # Create multiple QA pairs from each paper
            questions = [
                f"What are the key findings of the research paper: {paper.title}?",
                f"What methods were used in the study: {paper.title}?",
                f"What are the main conclusions from {paper.title}?",
                f"What are the practical implications of the research in {paper.title}?",
                f"What are the environmental considerations discussed in {paper.title}?"
            ]
            
            for question in questions:
                data.append({
                    "question": question,
                    "answer": paper.summary,
                    "source": "arXiv",
                    "confidence": 0.85,
                    "date": paper.published
                })
    
    return data

def fetch_google_scholar() -> List[Dict[str, str]]:
    """Fetch recent papers from Google Scholar"""
    data = []
    search_queries = ["e-waste management", "electronic waste recycling"]
    
    for query in search_queries:
        try:
            search_query = scholarly.search_pubs(query)
            papers = []
            for _ in range(20):  # Get 20 papers per query
                try:
                    paper = next(search_query)
                    papers.append(paper)
                except StopIteration:
                    break
            
            for paper in papers:
                if paper.get('abstract'):
                    data.append({
                        "question": f"What are the key findings about e-waste from the research: {paper.get('title')}?",
                        "answer": paper.get('abstract'),
                        "source": "Google Scholar",
                        "confidence": 0.8,
                        "year": paper.get('year')
                    })
        except Exception as e:
            print(f"Error fetching Google Scholar data: {str(e)}")
    
    return data

def fetch_wikipedia_data() -> List[Dict[str, str]]:
    """Fetch and process Wikipedia articles"""
    data = []
    topics = [
        "Electronic_waste",
        "Electronic_waste_in_India",
        "Electronic_waste_in_China",
        "Computer_recycling",
        "Mobile_phone_recycling",
        "Waste_Electrical_and_Electronic_Equipment_Directive"
    ]
    
    for topic in topics:
        try:
            page = wikipedia.page(topic)
            sections = page.sections
            
            # Create QA pairs from each section
            for section in sections:
                if len(section) > 100:  # Skip very short sections
                    data.append({
                        "question": f"What does Wikipedia say about {section} in relation to {topic.replace('_', ' ')}?",
                        "answer": wikipedia.summary(topic, sentences=5),
                        "source": "Wikipedia",
                        "confidence": 0.75
                    })
        except Exception as e:
            print(f"Error fetching Wikipedia data for {topic}: {str(e)}")
    
    return data

def fetch_news_articles() -> List[Dict[str, str]]:
    """Fetch recent news articles about e-waste"""
    data = []
    news_urls = [
        "https://www.reuters.com/sustainability/",
        "https://www.theguardian.com/environment/waste",
        "https://www.bbc.com/news/science-environment",
        # Add more news sources
    ]
    
    for url in news_urls:
        try:
            article = Article(url)
            article.download()
            article.parse()
            article.nlp()
            
            if "waste" in article.text.lower() or "recycling" in article.text.lower():
                data.append({
                    "question": f"What are the recent developments in e-waste management according to {article.title}?",
                    "answer": article.summary,
                    "source": "News",
                    "confidence": 0.7,
                    "date": article.publish_date
                })
        except Exception as e:
            print(f"Error fetching news data from {url}: {str(e)}")
    
    return data

def load_manual_qa_pairs() -> List[Dict[str, str]]:
    """Load manually curated QA pairs with high-quality, structured information"""
    return [
        {
            "question": "What are the main components found in e-waste and their environmental impact?",
            "answer": """E-waste contains several key components with varying environmental impacts:

1. Precious Metals:
   - Gold: Used in circuit boards and connectors
   - Silver: Found in contacts and switches
   - Platinum: Present in hard drives and circuit boards
   Environmental impact: Mining for new metals causes habitat destruction and water pollution

2. Hazardous Materials:
   - Lead: Found in CRT screens and solder
   - Mercury: Present in flat-screen displays and switches
   - Cadmium: Used in rechargeable batteries
   Environmental impact: These can leach into soil and groundwater, causing severe contamination

3. Plastics:
   - ABS and PVC plastics with flame retardants
   - Microplastics that persist in the environment
   Environmental impact: Non-biodegradable and release toxic chemicals when burned

4. Other Materials:
   - Glass from screens and monitors
   - Copper from wiring and printed circuit boards
   - Aluminum from casings and frames
   Environmental impact: Resource-intensive recycling processes required

Each component requires specific handling and recycling methods to minimize environmental impact and maximize recovery.""",
            "source": "Expert Knowledge",
            "confidence": 0.95
        },
        # Add more high-quality QA pairs...
    ]

def combine_and_clean_data(data_sources: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
    """Combine and clean data with advanced filtering and quality checks"""
    combined_data = []
    seen_questions = set()
    
    for source in data_sources:
        for item in source:
            # Clean and normalize text
            question = item["question"].strip()
            answer = item["answer"].strip()
            
            # Advanced filtering criteria
            if (
                question not in seen_questions and
                len(question.split()) >= 5 and  # Ensure substantial questions
                len(answer.split()) >= 30 and  # Ensure detailed answers
                not any(word in question.lower() for word in ['click', 'visit', 'website']) and  # Remove promotional content
                item.get('confidence', 0) >= 0.7  # Only keep high-confidence data
            ):
                seen_questions.add(question)
                
                # Enhance answer format
                if not answer.endswith('.'):
                    answer += '.'
                    
                combined_data.append({
                    "question": question,
                    "answer": answer,
                    "source": item.get('source', 'Unknown'),
                    "confidence": item.get('confidence', 0.7),
                    "date": item.get('date', datetime.now().isoformat())
                })
    
    # Sort by confidence score
    combined_data.sort(key=lambda x: x['confidence'], reverse=True)
    return combined_data

def save_dataset(data: List[Dict[str, str]], output_file: str = "ewaste_dataset.json"):
    """Save the dataset to a JSON file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    # Collect data from different sources
    print("Collecting EPA data...")
    epa_data = scrape_epa_data()
    
    print("Fetching arXiv papers...")
    arxiv_data = fetch_arxiv_papers()
    
    print("Fetching Google Scholar data...")
    google_scholar_data = fetch_google_scholar()
    
    print("Fetching Wikipedia data...")
    wikipedia_data = fetch_wikipedia_data()
    
    print("Fetching news articles...")
    news_data = fetch_news_articles()
    
    print("Loading manual QA pairs...")
    manual_data = load_manual_qa_pairs()
    
    # Combine and clean all data
    print("Combining and cleaning data...")
    all_data = combine_and_clean_data([
        epa_data,
        arxiv_data,
        google_scholar_data,
        wikipedia_data,
        news_data,
        manual_data
    ])
    
    # Save the dataset
    print("Saving dataset...")
    save_dataset(all_data)
    
    print(f"Dataset created with {len(all_data)} QA pairs")

if __name__ == "__main__":
    main() 