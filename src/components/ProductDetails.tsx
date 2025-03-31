import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../styles/ProductDetails.css';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  if (!product) return null;

  const getDetailedDescription = (category: string) => {
    const details = {
      Electronics: "Electronic devices contain numerous hazardous materials including lead, mercury, and flame retardants. Circuit boards, components, and connectors often contain valuable metals like gold, silver, and copper that can be recovered through proper recycling.",
      Audio: "Modern audio devices, especially wireless ones, contain lithium batteries, complex circuit boards, and rare earth magnets. Their small size often leads to casual disposal, but they require proper e-waste handling.",
      Wearables: "Smart watches and fitness trackers pack sophisticated electronics into tiny packages. They contain lithium batteries, display components, and sensors that require special recycling processes.",
      Batteries: "Batteries contain various toxic materials including lead, mercury, cadmium, and lithium. When improperly disposed, these chemicals can leach into soil and groundwater, causing severe environmental damage.",
      Lighting: "Fluorescent and LED lighting products contain mercury, lead, and other toxic materials. These components require specialized handling to prevent environmental contamination.",
      Appliances: "Large household electronics contain significant amounts of metals, plastics, and hazardous materials. Their size and composition make them particularly problematic when sent to landfills.",
      Industrial: "Industrial electronic equipment often contains larger quantities of hazardous materials and requires specialized disposal methods due to their complexity and size."
    };
    return details[category as keyof typeof details] || "";
  };

  const getEnvironmentalImpact = (category: string) => {
    const impacts = {
      Electronics: "When electronics end up in landfills, toxic materials can leach into soil and water systems. Proper recycling can recover valuable metals and prevent environmental contamination while conserving natural resources.",
      Audio: "Small audio devices are frequently replaced and often improperly disposed of in regular trash. Their batteries can cause fires in waste facilities, and their components contain materials that never biodegrade.",
      Wearables: "The rapid pace of wearable technology advancement leads to frequent device replacement. Their compact size and integrated batteries make recycling challenging but crucial for environmental protection.",
      Batteries: "Battery disposal is a critical environmental concern. Improper disposal can lead to soil and water contamination, while proper recycling can recover valuable metals and prevent toxic leakage.",
      Lighting: "Mercury from fluorescent bulbs can contaminate large areas if broken. Proper disposal is essential to prevent mercury vapor release and other toxic contamination.",
      Appliances: "Large appliances in landfills take up significant space and can release harmful substances. Their metals and components can be recycled to conserve resources and prevent environmental damage.",
      Industrial: "Industrial e-waste has a larger environmental footprint due to its size and quantity of hazardous materials. Proper handling is crucial to prevent large-scale environmental contamination."
    };
    return impacts[category as keyof typeof impacts] || "";
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        onClick={e => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ProductImage>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ProductImage>
        <ContentContainer>
          <CategoryTag>{product.category}</CategoryTag>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>
          
          <h3>Environmental Hazards</h3>
          <p>{getDetailedDescription(product.category)}</p>
          
          <h3>Proper Disposal Importance</h3>
          <p>{getEnvironmentalImpact(product.category)}</p>
          
          <div className="eco-features">
            <h3>Common Harmful Components</h3>
            <ul>
              {product.category === "Batteries" && (
                <>
                  <li>Lead and acid electrolytes</li>
                  <li>Cadmium and nickel</li>
                  <li>Lithium compounds</li>
                  <li>Corrosive materials</li>
                  <li>Heavy metals</li>
                </>
              )}
              {product.category === "Lighting" && (
                <>
                  <li>Mercury vapor</li>
                  <li>Lead in glass components</li>
                  <li>Phosphor coating</li>
                  <li>Electronic ballasts</li>
                  <li>Metal end caps</li>
                </>
              )}
              {product.category === "Industrial" && (
                <>
                  <li>Industrial-grade capacitors</li>
                  <li>Heavy-duty transformers</li>
                  <li>Industrial coolants</li>
                  <li>High-voltage components</li>
                  <li>Industrial-grade plastics</li>
                </>
              )}
              {(product.category === "Electronics" || product.category === "Audio" || product.category === "Wearables" || product.category === "Appliances") && (
                <>
                  <li>Toxic metals (lead, mercury, cadmium)</li>
                  <li>Non-biodegradable plastics</li>
                  <li>Hazardous circuit boards</li>
                  <li>Chemical flame retardants</li>
                  <li>Lithium batteries</li>
                </>
              )}
            </ul>
          </div>
        </ContentContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2D3748;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #4A5568;
  line-height: 1.6;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background: #915EFF;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: white;
  }
`;

export default ProductDetails; 