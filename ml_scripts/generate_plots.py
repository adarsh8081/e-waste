import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import numpy as np
from datetime import datetime, timedelta

def create_time_series():
    # Generate time series data
    years = pd.date_range(start='2018', end='2024', freq='Y')
    ewaste_volume = [53.6, 57.4, 59.1, 63.3, 65.8, 68.2, 74.7]
    
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=years,
            y=ewaste_volume,
            name="E-Waste Volume",
            line=dict(color="#1E88E5", width=3),
            mode="lines+markers"
        )
    )
    
    fig.update_layout(
        title="Global E-Waste Generation Trend",
        xaxis_title="Year",
        yaxis_title="Million Metric Tons",
        template="plotly_white",
        height=400
    )
    
    fig.write_html("public/plots/time_series.html")

def create_choropleth():
    # Sample data for countries
    countries = {
        'USA': 6.9,
        'China': 10.1,
        'India': 3.2,
        'Japan': 2.6,
        'Germany': 1.6,
        'UK': 1.6,
        'France': 1.4,
        'Russia': 1.7,
        'Brazil': 2.1,
        'Australia': 0.5
    }
    
    fig = go.Figure(data=go.Choropleth(
        locations=list(countries.keys()),
        locationmode='country names',
        z=list(countries.values()),
        colorscale='Viridis',
        colorbar_title="Million Tons"
    ))
    
    fig.update_layout(
        title="Global E-Waste Distribution",
        height=400,
        geo=dict(showframe=False, showcoastlines=True)
    )
    
    fig.write_html("public/plots/choropleth.html")

def create_top_countries():
    countries = ['China', 'USA', 'India', 'Japan', 'Germany', 'UK', 'France', 'Russia', 'Brazil', 'Indonesia']
    values = [10.1, 6.9, 3.2, 2.6, 1.6, 1.6, 1.4, 1.7, 2.1, 1.9]
    
    fig = go.Figure(data=[
        go.Bar(
            x=countries,
            y=values,
            marker_color="#1E88E5"
        )
    ])
    
    fig.update_layout(
        title="Top 10 E-Waste Generating Countries",
        xaxis_title="Country",
        yaxis_title="Million Metric Tons",
        template="plotly_white",
        height=400
    )
    
    fig.write_html("public/plots/top_countries.html")

def create_composition():
    materials = ['Plastics', 'Iron', 'Copper', 'Aluminum', 'Silver', 'Gold', 'Rare Earth', 'Other']
    percentages = [30, 25, 15, 10, 5, 2, 3, 10]
    
    fig = go.Figure(data=[go.Pie(
        labels=materials,
        values=percentages,
        hole=.3,
        marker_colors=px.colors.qualitative.Set3
    )])
    
    fig.update_layout(
        title="E-Waste Material Composition",
        height=400
    )
    
    fig.write_html("public/plots/composition.html")

def create_regional_trends():
    regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
    formal = [75, 70, 45, 35, 15, 60]
    informal = [25, 30, 55, 65, 85, 40]
    
    fig = go.Figure(data=[
        go.Bar(name='Formal Processing', x=regions, y=formal, marker_color="#1E88E5"),
        go.Bar(name='Informal Processing', x=regions, y=informal, marker_color="#F44336")
    ])
    
    fig.update_layout(
        barmode='stack',
        title="Regional Processing Methods Distribution",
        xaxis_title="Region",
        yaxis_title="Percentage",
        template="plotly_white",
        height=400
    )
    
    fig.write_html("public/plots/regional_trends.html")

def create_recovery_trends():
    years = list(range(2018, 2024))
    traditional = [30, 32, 35, 38, 40, 42]
    advanced = [45, 65, 85, 95, 98, 99]
    
    fig = make_subplots(specs=[[{"secondary_y": True}]])
    
    fig.add_trace(
        go.Scatter(
            x=years,
            y=traditional,
            name="Traditional Methods",
            line=dict(color="#1E88E5", width=3),
            mode="lines+markers"
        )
    )
    
    fig.add_trace(
        go.Scatter(
            x=years,
            y=advanced,
            name="Advanced Methods",
            line=dict(color="#00C853", width=3),
            mode="lines+markers"
        )
    )
    
    fig.update_layout(
        title="Recovery Efficiency Trends",
        xaxis_title="Year",
        yaxis_title="Recovery Rate (%)",
        template="plotly_white",
        height=400,
        showlegend=True,
        hovermode="x unified"
    )
    
    fig.write_html("public/plots/recovery_trends.html")

def main():
    # Create all plots
    create_time_series()
    create_choropleth()
    create_top_countries()
    create_composition()
    create_regional_trends()
    create_recovery_trends()

if __name__ == "__main__":
    main() 