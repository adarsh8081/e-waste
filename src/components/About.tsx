import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '../styles/About.css';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2A4858;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.2rem;
    color: #4A6670;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #4CACBC;
  }

  p {
    color: #4A6670;
    font-size: 1.1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2A4858;
    text-align: center;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #4CACBC;
  }

  p {
    color: #4A6670;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Understanding the E-Waste Crisis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Electronic waste is one of the fastest-growing waste streams globally, posing significant environmental and health challenges. Join us in our mission to tackle this crisis through innovative solutions and sustainable practices.
        </motion.p>
      </HeroSection>

      <Section>
        <h2>The Scale of the Problem</h2>
        <StatsGrid>
          {[
            {
              number: "62M",
              description: "Tonnes of e-waste generated globally in 2022, equivalent to the weight of 107,000 large passenger aircraft"
            },
            {
              number: "$91B",
              description: "Value of metals embedded in 2022 e-waste, including copper, gold, and iron"
            },
            {
              number: "22.3%",
              description: "Only this much of global e-waste was documented as properly collected and recycled in 2022"
            },
            {
              number: "82M",
              description: "Projected tonnes of e-waste by 2030, showing a concerning 33% increase from 2022"
            }
          ].map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.description}</p>
            </StatCard>
          ))}
        </StatsGrid>
      </Section>

      <Section>
        <h2>Environmental Impact</h2>
        <CardGrid>
          {[
            {
              title: "Toxic Materials",
              description: "E-waste contains hazardous substances like mercury, lead, and cadmium that can contaminate soil, water, and air when improperly disposed of, leading to severe environmental damage."
            },
            {
              title: "Resource Depletion",
              description: "Mining new materials for electronics contributes to environmental degradation. Recycling e-waste is 2-10 times more energy-efficient than extracting metals from virgin ore."
            },
            {
              title: "Climate Impact",
              description: "Proper e-waste management helped avoid 93 million tonnes of CO2-equivalent emissions through recaptured refrigerants and avoided metals mining."
            }
          ].map((card, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <h2>Our Solutions</h2>
        <CardGrid>
          {[
            {
              title: "Sustainable Recycling",
              description: "We employ advanced recycling processes that maximize material recovery while minimizing environmental impact, ensuring proper handling of toxic substances."
            },
            {
              title: "Urban Mining",
              description: "Through our innovative 'urban mining' approach, we recovered $28 billion worth of secondary raw materials from e-waste in 2022, reducing the need for virgin resource extraction."
            },
            {
              title: "Community Education",
              description: "We actively engage with communities to raise awareness about proper e-waste disposal and the importance of recycling, offering convenient collection points and recycling programs."
            }
          ].map((card, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <h2>Take Action</h2>
        <CardGrid>
          {[
            {
              title: "Responsible Disposal",
              description: "Use certified e-waste recyclers and collection points to ensure your electronic devices are properly recycled and valuable materials are recovered."
            },
            {
              title: "Extend Device Life",
              description: "Consider repairing or upgrading your devices instead of replacing them. Support the Right to Repair movement for longer device lifespans."
            },
            {
              title: "Spread Awareness",
              description: "Share knowledge about e-waste management with your community and encourage others to make sustainable choices in electronic consumption."
            }
          ].map((card, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>
    </AboutContainer>
  );
};

export default About; 