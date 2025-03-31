# E-Waste Analytics ML Scripts

This directory contains the machine learning and data visualization scripts used to generate plots for the E-Waste Management dashboard.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Scripts

To generate all plots:

```bash
python create_recovery_plot.py
```

The plots will be generated in the `public/plots` directory of the main project.

## Plot Descriptions

### Recovery Trends
- Shows the improvement in e-waste recovery efficiency over time
- Compares traditional vs advanced processing methods
- Demonstrates the 300% improvement in recovery rates

## Vercel Deployment Note
The plots are pre-generated and stored in the `public/plots` directory. This ensures they are available during the Vercel build process without requiring Python runtime. 