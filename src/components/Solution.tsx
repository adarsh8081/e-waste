import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Ewaste from '../assets/Ewaste.jpg';
import Ewaste2 from '../assets/Ewaste2.jpg';
import Ewaste3 from '../assets/Ewaste3.jpg';

const Container = styled.div`
  background: #FFFFFF;
  min-height: 100vh;
  color: #2D3436;
`;

const Hero = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 100%);
  position: relative;
  padding: 3rem 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1E88E5;
  margin: 0;
  line-height: 1.2;

  span {
    color: #1565C0;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #546E7A;
  margin: 1rem 0 0 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProblemSection = styled.section`
  padding: 4rem 2rem;
  background: #FFFFFF;
  position: relative;
`;

const GlobalDistributionCard = styled(motion.div)`
  background: #FFFFFF;
  border: 1px solid #E3F2FD;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const GlobalDistributionHeader = styled.div`
  padding: 1.5rem;
  background: #1E88E5;
  position: relative;
`;

const GlobalDistributionTitle = styled.h2`
  font-size: 1.4rem;
  color: #FFFFFF;
  margin: 0;
  font-weight: 600;
  text-align: center;
`;

const GlobalDistributionDescription = styled.p`
  color:hsl(0, 0.00%, 100.00%);
  font-size: 1rem;
  margin: 1rem 1.5rem;
  line-height: 1.5;
  text-align: center;
`;

const GlobalDistributionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InsightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GlobalInsightBox = styled(motion.div)`
  background: #F8F9FA;
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  border-left: 3px solid #1E88E5;

  strong {
    color: #1565C0;
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  p {
    color: #2D3436;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const MapContainer = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E3F2FD;
  height: 100%;

  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
`;

const SectionTitle = styled.h2`
  color: #333333;
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  transform: translateZ(20px);
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 1rem;
  }
`;

const Card = styled(motion.div)`
  background: #FBF7F0;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 1.25rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
    border-radius: 1rem;
    gap: 0.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }
`;

const SolutionSection = styled.section`
  padding: 4rem 2rem;
  background: #F8F9FA;
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const SolutionCard = styled(motion.div)`
  background: #FFFFFF;
  border: 1px solid #E3F2FD;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const SolutionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SolutionContent = styled.div`
  padding: 1.5rem;
`;

const SolutionTitle = styled.h3`
  font-size: 1.4rem;
  color: #1E88E5;
  margin: 0;
  font-weight: 600;
`;

const SolutionDescription = styled.p`
  color: #546E7A;
  margin: 0.75rem 0 0 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ImpactMetric = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 8px;
  border-left: 3px solid #1E88E5;
  
  h4 {
    color: #1565C0;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    color: #546E7A;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: #FBF7F0;
  padding: 2rem;
  border-radius: 1rem;
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  background: #333333;
  color: #FBF7F0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  transform: translateZ(15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0 auto 1rem;
  }

  @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.9rem;
    margin: 0 auto 0.75rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
  transform: translateZ(10px);

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StepTitle = styled.h3`
  color: #333333;
  font-size: 1.8rem;
  transform: translateZ(15px);
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.4rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    padding: 0.3rem 0;
  }
`;

const StepDescription = styled.p`
  color: #444444;
  line-height: 1.8;
  transform: translateZ(10px);
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const InteractiveCounter = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const CounterValue = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 1rem 0;
  background: linear-gradient(45deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CounterLabel = styled.div`
  font-size: 1.2rem;
  color: #888;
`;

const InteractiveCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &:hover {
    transform: translateY(-10px) rotateX(10deg) rotateY(10deg);
    
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const MapCard = styled(motion.div)`
  background: #151C2C;
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 20px;
  overflow: hidden;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.1);
`;

const MapTitle = styled.h2`
  font-size: 3rem;
  color: #1E88E5;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MapDescription = styled.p`
  font-size: 1.2rem;
  color: #2D3436;
  text-align: center;
  margin: 0 auto 40px auto;
  max-width: 800px;
  line-height: 1.6;
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapInsights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MapInsightBox = styled(motion.div)`
  background: #1A2333;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: #00ff88;
    border-radius: 0 4px 4px 0;
  }

  strong {
    color: #00ff88;
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }

  p {
    color: #94A3B8;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const MapVisualization = styled.div`
  iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 12px;
    background: #151C2C;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff87 0%, #60efff 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  color: #1a1a1a;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,255,135,0.3);
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const VisualizationCard = styled(motion.div)`
  background: #FBF7F0;
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  width: 90%;
  max-width: 1200px;
  margin: 2.5rem auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1400px) {
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
`;

const VisualizationTitle = styled.h3`
  color: #333333;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const VisualizationDescription = styled.p`
  color: #444444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InsightBox = styled.div`
  background: linear-gradient(135deg, #D9E4DD 0%, #FBF7F0 100%);
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #00ff87;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const VisualizationFrame = styled.iframe`
  width: 100%;
  height: 70vh;
  min-height: 500px;
  border: none;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background: #1E88E5;
  position: relative;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #FFFFFF;
  margin: 0;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: #546E7A;
  margin: 1rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: 300px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img, iframe {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Solution: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [plotErrors, setPlotErrors] = useState<{[key: string]: boolean}>({});

  const handlePlotError = (plotName: string) => {
    setPlotErrors(prev => ({ ...prev, [plotName]: true }));
    console.error(`Failed to load plot: ${plotName}`);
  };

  const problemInsights = [
    {
      title: "Rising E-Waste Crisis",
      description: "Global e-waste generation trends show an alarming increase, threatening environmental sustainability.",
      insight: "The data reveals a consistent upward trend, with projections showing a 21% increase by 2024.",
      solution: "AI-powered sorting and recycling systems can process this increasing volume efficiently.",
      plot: "./plots/time_series.html",
      isHtml: true
    },
    {
      title: "Global Distribution",
      description: "Mapping the worldwide spread of e-waste processing capabilities.",
      insight: "Only 20% of regions have advanced processing facilities.",
      solution: "Strategic placement of quantum-enhanced recycling centers.",
      plot: "./plots/choropleth.html",
      isHtml: true
    },
    {
      title: "Major Contributing Nations",
      description: "Identifying the largest contributors to help focus international cooperation efforts.",
      insight: "Top 10 nations account for over 65% of global e-waste generation.",
      solution: "Targeted implementation of advanced recycling facilities in high-impact regions.",
      plot: "./plots/top_countries.html",
      isHtml: true
    },
    {
      title: "Material Composition",
      description: "Understanding the complex makeup of e-waste for optimal resource recovery.",
      insight: "Precious metals constitute 15% of e-waste, representing significant economic value.",
      solution: "Plasma-based extraction technology recovers 95% of valuable materials.",
      plot: "./plots/composition.html",
      isHtml: true
    },
    {
      title: "Regional Impact Patterns",
      description: "Analyzing environmental impact variations across different regions.",
      insight: "Developing regions show 40% higher environmental impact due to informal processing.",
      solution: "Implementation of standardized processing methods reduces environmental damage by 80%.",
      plot: "./plots/regional_trends.html",
      isHtml: true
    },
    {
      title: "Processing Efficiency",
      description: "Statistical analysis of current processing methods and their effectiveness.",
      insight: "Traditional methods recover only 30% of valuable materials.",
      solution: "Molecular reconstruction technology achieves 98% recovery rate.",
      plot: "./plots/box_plots.png",
      isImage: true
    },
    {
      title: "Recovery Trends",
      description: "Analysis of material recovery rates and technological improvements over time.",
      insight: "Advanced processing methods show 300% improvement in recovery efficiency.",
      solution: "Integration of AI and molecular reconstruction yields optimal recovery rates.",
      plot: "./plots/recovery_trends.html",
      isHtml: true
    }
  ];

  const solutions = [
    {
      title: "Quantum-Enhanced Sorting",
      description: "AI-powered system with 99.9% accuracy in material identification and sorting",
      image: Ewaste,
      impact: {
        title: "Environmental Impact",
        description: "Reduces sorting errors by 99.9%, preventing hazardous material contamination"
      }
    },
    {
      title: "Plasma Recovery",
      description: "Zero-waste rare earth element extraction using advanced plasma technology",
      image: Ewaste2,
      impact: {
        title: "Resource Recovery",
        description: "Recovers 95% of precious metals, reducing mining demand by 40%"
      }
    },
    {
      title: "Molecular Reconstruction",
      description: "Converting e-waste into high-grade materials through molecular restructuring",
      image: Ewaste3,
      impact: {
        title: "Circular Economy",
        description: "Achieves 98% material reuse rate, creating a true circular economy"
      }
    }
  ];

  const filteredProblemInsights = problemInsights.filter(problem => problem.title !== "Global Distribution");

  return (
    <Container>
      <Hero>
        <div>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            E-Waste Crisis & <span>Solutions</span>
          </Title>
          <Subtitle>
            Transforming Environmental Challenges into Sustainable Opportunities
          </Subtitle>
        </div>
      </Hero>

      <ProblemSection>
        <GlobalDistributionCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlobalDistributionHeader>
            <GlobalDistributionTitle>Global E-Waste Distribution</GlobalDistributionTitle>
            <GlobalDistributionDescription>
              Mapping the worldwide spread of e-waste processing capabilities and identifying areas for strategic facility placement.
            </GlobalDistributionDescription>
          </GlobalDistributionHeader>
          <GlobalDistributionContent>
            <InsightColumn>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <strong>Current Challenge</strong>
                <p>Only 20% of regions have advanced processing facilities, leading to inefficient and environmentally harmful practices in underserved areas.</p>
              </GlobalInsightBox>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <strong>Strategic Solution</strong>
                <p>Implementation of quantum-enhanced recycling centers in key locations to maximize coverage and minimize transportation impact.</p>
              </GlobalInsightBox>
              <GlobalInsightBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <strong>Expected Impact</strong>
                <p>80% increase in processing capacity and 60% reduction in transportation emissions through optimized facility placement.</p>
              </GlobalInsightBox>
            </InsightColumn>
            <MapContainer>
              <iframe src="./plots/choropleth.html" title="Global E-Waste Distribution Map" />
            </MapContainer>
          </GlobalDistributionContent>
        </GlobalDistributionCard>

        <SectionTitle>Global E-Waste Analytics</SectionTitle>
        <Grid>
          {filteredProblemInsights.map((problem, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardHeader>
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardDescription>{problem.description}</CardDescription>
              <InsightBox>
                <strong>Key Problem</strong>
                <p>{problem.insight}</p>
              </InsightBox>
              <InsightBox>
                <strong>Our Solution</strong>
                <p>{problem.solution}</p>
              </InsightBox>
              {problem.plot && !plotErrors[problem.title] && (
                <VisualizationContainer>
                  {problem.isHtml ? (
                    <iframe 
                      src={problem.plot} 
                      title={problem.title} 
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      onError={() => handlePlotError(problem.title)}
                    />
                  ) : (
                    <img 
                      src={problem.plot} 
                      alt={problem.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={() => handlePlotError(problem.title)}
                    />
                  )}
                </VisualizationContainer>
              )}
            </Card>
          ))}
        </Grid>
      </ProblemSection>

      <SolutionSection>
        <SectionTitle>Innovative Solutions</SectionTitle>
        <SolutionGrid>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SolutionImage src={solution.image} alt={solution.title} />
              <SolutionContent>
                <SolutionTitle>{solution.title}</SolutionTitle>
                <SolutionDescription>{solution.description}</SolutionDescription>
                <ImpactMetric>
                  <h4>{solution.impact.title}</h4>
                  <p>{solution.impact.description}</p>
                </ImpactMetric>
              </SolutionContent>
            </SolutionCard>
          ))}
        </SolutionGrid>
      </SolutionSection>
    </Container>
  );
};

export default Solution;