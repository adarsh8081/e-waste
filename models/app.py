from flask import Flask, request, jsonify
from flask_cors import CORS
from simple_chatbot import get_response
import json
import os

app = Flask(__name__)
CORS(app)

# Comprehensive E-Waste QA Database
qa_database = [
    {
        "category": "Basic Concepts",
        "questions": [
            "what is e-waste",
            "define e-waste",
            "what does e-waste mean",
            "electronic waste definition",
            "what counts as e-waste",
            "examples of e-waste"
        ],
        "answer": "E-waste (electronic waste) refers to discarded electronic and electrical devices. This includes:\n\n1. Common Devices:\n- Computers and laptops\n- Smartphones and tablets\n- TVs and monitors\n- Printers and scanners\n- Gaming consoles\n\n2. Household Appliances:\n- Refrigerators\n- Washing machines\n- Microwave ovens\n- Air conditioners\n\n3. Small Electronics:\n- Cameras\n- Music players\n- Electronic toys\n- Battery-operated devices"
    },
    {
        "category": "Disposal Methods",
        "questions": [
            "how to dispose e-waste",
            "how can i dispose electronic waste",
            "where to throw electronic devices",
            "proper disposal methods",
            "how to get rid of old electronics",
            "e-waste disposal guidelines",
            "recycling centers near me"
        ],
        "answer": "Here's a comprehensive guide to proper e-waste disposal:\n\n1. Professional Recycling:\n- Find certified e-waste recyclers in your area\n- Use manufacturer take-back programs (Apple, Samsung, Dell)\n- Visit authorized collection centers\n\n2. Preparation Steps:\n- Back up your data\n- Perform factory reset\n- Remove batteries\n- Gather all cables and accessories\n\n3. Alternative Options:\n- Donate working devices to charities/schools\n- Trade-in for store credit\n- Sell on second-hand markets\n\n4. Important Don'ts:\n- Never throw in regular trash\n- Avoid unauthorized recyclers\n- Don't store indefinitely\n\nTip: Many retailers like Best Buy and Office Depot offer free recycling services."
    },
    {
        "category": "Environmental Impact",
        "questions": [
            "why is e-waste dangerous",
            "what are the hazards of e-waste",
            "is electronic waste harmful",
            "e-waste environmental impact",
            "health risks of e-waste",
            "environmental effects",
            "toxic materials in electronics"
        ],
        "answer": "E-waste poses significant environmental and health risks:\n\n1. Toxic Components:\n- Lead: Affects nervous system\n- Mercury: Damages brain and kidneys\n- Cadmium: Causes lung damage\n- Brominated flame retardants: Endocrine disruptors\n\n2. Environmental Impacts:\n- Soil contamination\n- Water pollution\n- Air pollution when burned\n- Greenhouse gas emissions\n\n3. Health Risks:\n- Respiratory problems\n- Neurological damage\n- Reproductive issues\n- Cancer risks\n\n4. Long-term Effects:\n- Bioaccumulation in food chains\n- Groundwater contamination\n- Persistent organic pollutants\n- Ecosystem damage"
    },
    {
        "category": "Recycling Process",
        "questions": [
            "how is e-waste recycled",
            "recycling process",
            "what happens to recycled electronics",
            "e-waste recycling steps",
            "electronic waste processing",
            "recycling methods",
            "how do they recycle electronics"
        ],
        "answer": "The e-waste recycling process involves several sophisticated steps:\n\n1. Collection & Transportation:\n- Gathering from collection points\n- Secure transportation\n- Initial sorting\n\n2. Primary Processing:\n- Manual disassembly\n- Component separation\n- Hazardous material removal\n- Data destruction\n\n3. Material Recovery:\n- Mechanical shredding\n- Magnetic separation\n- Density separation\n- Chemical processing\n\n4. Recoverable Materials:\n- Precious metals (gold, silver)\n- Base metals (copper, aluminum)\n- Plastics\n- Glass\n\n5. Final Processing:\n- Refining of materials\n- Quality control\n- Distribution to manufacturers"
    },
    {
        "category": "Statistics & Trends",
        "questions": [
            "e-waste statistics",
            "how much e-waste is produced",
            "global e-waste data",
            "electronic waste numbers",
            "e-waste generation rates",
            "recycling statistics",
            "future predictions"
        ],
        "answer": "Current global e-waste statistics and trends:\n\n1. Annual Generation:\n- Over 50 million metric tons globally\n- Increasing by 2 million tons yearly\n- Equivalent to 6kg per person\n\n2. Recycling Rates:\n- Only 17.4% properly recycled\n- 82.6% undocumented/improperly handled\n- $57 billion worth of materials lost\n\n3. Regional Impact:\n- Asia: Largest generator (18.2 Mt)\n- Americas: 13.1 Mt annually\n- Europe: Highest per capita\n\n4. Future Projections:\n- 74 Mt by 2030\n- 120 Mt by 2050\n- Fastest growing waste stream"
    },
    {
        "category": "Regulations & Compliance",
        "questions": [
            "e-waste regulations",
            "electronic waste laws",
            "compliance requirements",
            "legal requirements",
            "government policies",
            "regulatory framework",
            "international standards"
        ],
        "answer": "E-waste regulations and compliance requirements:\n\n1. International Frameworks:\n- Basel Convention\n- EU WEEE Directive\n- RoHS Regulations\n\n2. Common Requirements:\n- Producer responsibility\n- Collection targets\n- Recycling standards\n- Reporting obligations\n\n3. Business Compliance:\n- Registration with authorities\n- Regular reporting\n- Proper documentation\n- Licensed recyclers\n\n4. Consumer Rights:\n- Free take-back services\n- Information access\n- Safe disposal options\n\n5. Penalties:\n- Fines for non-compliance\n- Criminal prosecution\n- Import/export restrictions"
    }
]

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        user_message = data.get('message', '')
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Get response from the chatbot
        response = get_response(user_message, qa_database)
        if not response:
            return jsonify({'error': 'Could not generate response'}), 500
        
        return jsonify({
            'response': response
        })

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': f"Server error: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'database_size': len(qa_database),
        'categories': [qa['category'] for qa in qa_database],
        'total_questions': sum(len(qa['questions']) for qa in qa_database)
    }), 200

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5000) 