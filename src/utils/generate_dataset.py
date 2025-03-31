import pandas as pd
import numpy as np
from datetime import datetime
import random

# Constants and configurations
COUNTRIES = ['USA', 'India', 'Germany', 'China', 'Japan', 'UK', 'Canada', 'Australia', 'France', 'Brazil']
STATES = {
    'USA': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'],
    'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'Hesse', 'North Rhine-Westphalia'],
    'China': ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan', 'Zhejiang'],
    'Japan': ['Tokyo', 'Osaka', 'Aichi', 'Fukuoka', 'Hokkaido'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Occitanie', 'Nouvelle-Aquitaine'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná']
}

CITIES = {
    'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
    'Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba']
}

DEVICE_TYPES = [
    'Mobile Phone', 'Laptop', 'Desktop Computer', 'Tablet', 'Smartwatch',
    'Television', 'Monitor', 'Printer', 'Scanner', 'Router',
    'Keyboard', 'Mouse', 'Headphones', 'Speakers', 'Camera',
    'Game Console', 'Smart Home Device', 'Power Bank', 'Charger',
    'External Hard Drive', 'USB Drive', 'CD/DVD Player', 'Fax Machine',
    'Projector', 'Calculator', 'Digital Clock', 'Radio', 'MP3 Player',
    'GPS Device', 'E-reader', 'Smart Thermostat', 'Security Camera',
    'Drone', 'VR Headset', 'Smart Doorbell', 'Smart Lock',
    'Smart Light Bulb', 'Smart Plug', 'Smart Scale', 'Smart Mirror',
    'Smart Door Sensor', 'Smart Smoke Detector', 'Smart Water Leak Detector',
    'Smart Garage Door Opener', 'Smart Sprinkler Controller', 'Smart Window Blinds',
    'Smart Coffee Maker', 'Smart Refrigerator', 'Smart Oven', 'Smart Dishwasher'
]

BRANDS = [
    'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI',
    'Sony', 'LG', 'Panasonic', 'Toshiba', 'Fujitsu', 'Gateway', 'Razer',
    'Google', 'Microsoft', 'Amazon', 'Huawei', 'Xiaomi', 'OnePlus',
    'Nokia', 'Motorola', 'BlackBerry', 'HTC', 'ZTE', 'Vivo', 'Oppo'
]

CONDITIONS = ['Working', 'Non-working', 'Repairable', 'Damaged', 'Obsolete']
MATERIAL_TYPES = ['Plastic', 'Metal', 'Glass', 'Mixed', 'Ceramic', 'Rubber']
HAZARDOUS_COMPONENTS = ['Lead', 'Mercury', 'Cadmium', 'Brominated Flame Retardants', 'None']
COLLECTION_METHODS = ['Drop-off center', 'Pick-up service', 'Retail take-back', 'Municipal collection']
RECYCLING_FACILITIES = [
    'GreenTech Recycle', 'EcoRecyclers Inc.', 'Sustainable Electronics',
    'Global Recycling Solutions', 'Eco-Friendly Disposal', 'Green Earth Recycling',
    'Sustainable Materials Recovery', 'EcoTech Recycling', 'Green Future Recycling',
    'Sustainable Waste Management'
]
RECYCLING_STATUS = ['Pending', 'In Progress', 'Recycled', 'Disposed']
RECYCLING_METHODS = ['Mechanical', 'Chemical', 'Thermal', 'Hydrometallurgical', 'Pyrometallurgical']

def generate_device_age():
    return random.randint(1, 10)

def generate_weight(device_type):
    weights = {
        'Mobile Phone': (0.1, 0.3),
        'Laptop': (1.5, 3.0),
        'Desktop Computer': (5.0, 10.0),
        'Tablet': (0.4, 0.8),
        'Smartwatch': (0.05, 0.15),
        'Television': (10.0, 30.0),
        'Monitor': (2.0, 5.0),
        'Printer': (3.0, 8.0),
        'Scanner': (2.0, 5.0),
        'Router': (0.3, 0.8),
        'Keyboard': (0.5, 1.0),
        'Mouse': (0.1, 0.3),
        'Headphones': (0.2, 0.5),
        'Speakers': (1.0, 3.0),
        'Camera': (0.5, 1.5),
        'Game Console': (1.0, 3.0),
        'Smart Home Device': (0.1, 0.5),
        'Power Bank': (0.2, 0.5),
        'Charger': (0.1, 0.3),
        'External Hard Drive': (0.3, 0.8),
        'USB Drive': (0.05, 0.15),
        'CD/DVD Player': (1.0, 2.0),
        'Fax Machine': (3.0, 6.0),
        'Projector': (2.0, 4.0),
        'Calculator': (0.1, 0.3),
        'Digital Clock': (0.1, 0.3),
        'Radio': (0.5, 1.0),
        'MP3 Player': (0.1, 0.3),
        'GPS Device': (0.2, 0.5),
        'E-reader': (0.2, 0.5),
        'Smart Thermostat': (0.2, 0.5),
        'Security Camera': (0.3, 0.8),
        'Drone': (0.5, 2.0),
        'VR Headset': (0.5, 1.0),
        'Smart Doorbell': (0.2, 0.5),
        'Smart Lock': (0.3, 0.8),
        'Smart Light Bulb': (0.1, 0.3),
        'Smart Plug': (0.1, 0.3),
        'Smart Scale': (0.2, 0.5),
        'Smart Mirror': (1.0, 3.0),
        'Smart Door Sensor': (0.1, 0.3),
        'Smart Smoke Detector': (0.2, 0.5),
        'Smart Water Leak Detector': (0.1, 0.3),
        'Smart Garage Door Opener': (0.5, 1.0),
        'Smart Sprinkler Controller': (0.3, 0.8),
        'Smart Window Blinds': (0.5, 1.5),
        'Smart Coffee Maker': (1.0, 2.0),
        'Smart Refrigerator': (50.0, 100.0),
        'Smart Oven': (20.0, 40.0),
        'Smart Dishwasher': (30.0, 50.0)
    }
    min_weight, max_weight = weights.get(device_type, (0.5, 2.0))
    return round(random.uniform(min_weight, max_weight), 2)

def calculate_environmental_impact(device_type, condition, weight):
    impact_score = 0
    
    # Base impact based on device type
    if device_type in ['Mobile Phone', 'Laptop', 'Tablet']:
        impact_score += 2
    elif device_type in ['Desktop Computer', 'Television', 'Smart Refrigerator']:
        impact_score += 3
    else:
        impact_score += 1
    
    # Condition impact
    if condition == 'Non-working':
        impact_score += 2
    elif condition == 'Damaged':
        impact_score += 3
    elif condition == 'Obsolete':
        impact_score += 1
    
    # Weight impact
    if weight > 5:
        impact_score += 2
    elif weight > 2:
        impact_score += 1
    
    # Normalize to Low/Medium/High
    if impact_score <= 3:
        return 'Low'
    elif impact_score <= 5:
        return 'Medium'
    else:
        return 'High'

def calculate_co2_emission(device_type, weight, condition):
    base_emission = weight * 2  # Base CO2 emission per kg
    
    # Additional factors
    if condition == 'Non-working':
        base_emission *= 1.2
    elif condition == 'Damaged':
        base_emission *= 1.5
    elif condition == 'Obsolete':
        base_emission *= 1.1
    
    # Device type specific factors
    if device_type in ['Mobile Phone', 'Laptop', 'Tablet']:
        base_emission *= 1.5
    elif device_type in ['Desktop Computer', 'Television', 'Smart Refrigerator']:
        base_emission *= 2.0
    
    return round(base_emission, 2)

def generate_dataset(num_records=100000):
    data = []
    
    for i in range(num_records):
        country = random.choice(COUNTRIES)
        state = random.choice(STATES[country])
        city = random.choice(CITIES[country])
        device_type = random.choice(DEVICE_TYPES)
        brand = random.choice(BRANDS)
        condition = random.choice(CONDITIONS)
        material = random.choice(MATERIAL_TYPES)
        weight = generate_weight(device_type)
        hazardous = random.choice(HAZARDOUS_COMPONENTS)
        collection_method = random.choice(COLLECTION_METHODS)
        facility = random.choice(RECYCLING_FACILITIES)
        status = random.choice(RECYCLING_STATUS)
        method = random.choice(RECYCLING_METHODS)
        reused = random.choice(['Yes', 'No'])
        
        # Calculate derived values
        env_impact = calculate_environmental_impact(device_type, condition, weight)
        co2_emission = calculate_co2_emission(device_type, weight, condition)
        
        record = {
            'ID': f'EW_{str(i+1).zfill(5)}',
            'Country': country,
            'Year': random.randint(2020, 2024),
            'State/Region': state,
            'City': city,
            'Type of E-Waste': device_type,
            'Brand Name': brand,
            'Model Name': f'{brand} {random.randint(1000, 9999)}',
            'Device Age (Years)': generate_device_age(),
            'Condition': condition,
            'Material Type': material,
            'Weight (kg)': weight,
            'Hazardous Components': hazardous,
            'Collection Method': collection_method,
            'Recycling Facility': facility,
            'Recycling Status': status,
            'Recycling Method': method,
            'Reused or Refurbished?': reused,
            'Environmental Impact Score': env_impact,
            'CO2 Emission (kg)': co2_emission
        }
        data.append(record)
    
    return pd.DataFrame(data)

def main():
    print("Generating e-waste management dataset...")
    df = generate_dataset(100000)
    
    # Save to CSV
    output_file = 'e_waste_management_data.csv'
    df.to_csv(output_file, index=False)
    print(f"Dataset generated successfully! Saved to {output_file}")
    print(f"Total records: {len(df)}")
    print("\nDataset Summary:")
    print(df.info())

if __name__ == "__main__":
    main() 