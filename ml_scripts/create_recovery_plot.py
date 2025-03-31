import os
import plotly.graph_objects as go
from plotly.subplots import make_subplots

def create_recovery_trends_plot():
    # Create sample data for recovery trends
    years = list(range(2018, 2024))
    traditional_recovery = [30, 32, 35, 38, 40, 42]
    advanced_recovery = [45, 65, 85, 95, 98, 99]

    # Create the plot
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add traces
    fig.add_trace(
        go.Scatter(
            x=years,
            y=traditional_recovery,
            name="Traditional Methods",
            line=dict(color="#1E88E5", width=3),
            mode="lines+markers"
        )
    )

    fig.add_trace(
        go.Scatter(
            x=years,
            y=advanced_recovery,
            name="Advanced Methods",
            line=dict(color="#00C853", width=3),
            mode="lines+markers"
        )
    )

    # Update layout
    fig.update_layout(
        title="E-Waste Recovery Efficiency Over Time",
        title_x=0.5,
        plot_bgcolor="white",
        paper_bgcolor="white",
        font=dict(size=12, color="#2D3436"),
        xaxis=dict(
            title="Year",
            gridcolor="#E3F2FD",
            showgrid=True,
            showline=True,
            linecolor="#1E88E5",
            linewidth=2,
            ticks="outside",
            tickfont=dict(size=12)
        ),
        yaxis=dict(
            title="Recovery Rate (%)",
            gridcolor="#E3F2FD",
            showgrid=True,
            showline=True,
            linecolor="#1E88E5",
            linewidth=2,
            ticks="outside",
            tickfont=dict(size=12),
            range=[0, 100]
        ),
        legend=dict(
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=0.01,
            bgcolor="rgba(255, 255, 255, 0.8)",
            bordercolor="#1E88E5"
        ),
        margin=dict(t=50, l=50, r=50, b=50),
        showlegend=True,
        hovermode="x unified",
        height=400
    )

    # Add annotations
    fig.add_annotation(
        text="300% Improvement",
        x=2023,
        y=90,
        arrowhead=2,
        showarrow=True,
        font=dict(size=12, color="#1E88E5"),
        arrowcolor="#1E88E5",
        arrowsize=1,
        arrowwidth=2,
        ax=-50,
        ay=30
    )

    return fig

if __name__ == "__main__":
    try:
        # Get the absolute path to the public/plots directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(os.path.dirname(current_dir))
        plots_dir = os.path.join(project_root, "public", "plots")
        
        # Create the plots directory if it doesn't exist
        os.makedirs(plots_dir, exist_ok=True)
        
        # Generate and save the plot
        fig = create_recovery_trends_plot()
        output_path = os.path.join(plots_dir, "recovery_trends.html")
        fig.write_html(output_path)
        print(f"Plot saved successfully to: {output_path}")
    except Exception as e:
        print(f"Error generating plot: {str(e)}") 