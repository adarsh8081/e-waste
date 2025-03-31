import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Temporary placeholder images from a public source
const heroImage = 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=1920&q=80';
const actionImage = 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=1920&q=80';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%);
  color: #ffffff;
  overflow: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  background: url(${heroImage}) center/cover;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 42, 58, 0.85);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #4CACBC;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #A0D995;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: #1a2a3a;
  padding: 4rem 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(76, 172, 188, 0.1);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(76, 172, 188, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(76, 172, 188, 0.15);
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #4CACBC;
  }

  p {
    color: #A0D995;
    font-size: 1.1rem;
  }
`;

const ImpactSection = styled.div`
  background: #2c3e50;
  padding: 4rem 2rem;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImpactCard = styled(motion.div)`
  background: rgba(160, 217, 149, 0.1);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(160, 217, 149, 0.2);
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #A0D995;
  }

  p {
    color: #ffffff;
    line-height: 1.6;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  li {
    color: #ffffff;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    &:before {
      content: '•';
      color: #A0D995;
      margin-right: 0.5rem;
    }
  }
`;

const ActionSection = styled.div`
  background: url(${actionImage}) center/cover;
  padding: 6rem 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 42, 58, 0.9);
  }
`;

const ActionContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #4CACBC;
  margin-bottom: 2rem;
  text-align: center;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #4CACBC, #A0D995);
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  margin: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tackling the E-Waste Crisis Together
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join our mission to revolutionize electronic waste management and create a sustainable future for generations to come.
          </Subtitle>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StyledLink to="/solution">
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Solutions
              </ActionButton>
            </StyledLink>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <SectionTitle>The Growing Crisis</SectionTitle>
        <StatsGrid>
          {[
            {
              number: "62M",
              description: "Tonnes of e-waste generated globally in 2022, equivalent to 107,000 large aircraft"
            },
            {
              number: "$91B",
              description: "Value of metals embedded in e-waste, including precious materials like gold and copper"
            },
            {
              number: "22.3%",
              description: "Only this much of global e-waste was properly collected and recycled in 2022"
            },
            {
              number: "82M",
              description: "Projected tonnes of e-waste by 2030, showing an alarming 33% increase"
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
      </StatsSection>

      <ImpactSection>
        <SectionTitle>Environmental Impact & Solutions</SectionTitle>
        <ImpactGrid>
          <ImpactCard
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>Environmental Hazards</h3>
            <ul>
              <li>Toxic materials leaching into soil and water</li>
              <li>Air pollution from improper disposal</li>
              <li>Greenhouse gas emissions from landfills</li>
              <li>Depletion of rare earth elements</li>
            </ul>
          </ImpactCard>

          <ImpactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Our Solutions</h3>
            <ul>
              <li>Advanced recycling technologies</li>
              <li>Proper hazardous material handling</li>
              <li>Resource recovery programs</li>
              <li>Community collection initiatives</li>
            </ul>
          </ImpactCard>

          <ImpactCard
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Take Action</h3>
            <ul>
              <li>Responsibly dispose of electronics</li>
              <li>Support right-to-repair initiatives</li>
              <li>Choose eco-friendly electronics</li>
              <li>Spread awareness in your community</li>
            </ul>
          </ImpactCard>
        </ImpactGrid>
      </ImpactSection>

      <ActionSection>
        <ActionContent>
          <SectionTitle>Make a Difference Today</SectionTitle>
          <Subtitle>
            Every small action counts. Join us in our mission to create a cleaner, more sustainable future through proper e-waste management.
          </Subtitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <StyledLink to="/contact">
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Recycling
              </ActionButton>
            </StyledLink>
            <StyledLink to="/about">
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </ActionButton>
            </StyledLink>
          </motion.div>
        </ActionContent>
      </ActionSection>
    </HomeContainer>
  );
};

export default Home;