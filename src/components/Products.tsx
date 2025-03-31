import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductDetails from './ProductDetails';

// Import all product images
import earbuds from '../assets/products_images/Earbuds.jpg';
import smartwatches from '../assets/products_images/Smartwatches.png';
import controllers from '../assets/products_images/jack and controllers.webp';
import oldBatteries from '../assets/products_images/old batteryes.avif';
import cflBulbs from '../assets/products_images/CFL bulbs.webp';
import routers from '../assets/products_images/Routers.webp';
import washingMachines from '../assets/products_images/old washing machines.avif';
import keyboardsMice from '../assets/products_images/keyboards and mouses.jpg';
import phones from '../assets/products_images/cell phones.jpg';
import televisions from '../assets/products_images/old telivisions.jpg';
import printers from '../assets/products_images/printers.jpg';
import circuitBoards from '../assets/products_images/12.jpg';
import storageDevices from '../assets/products_images/storage devices.jpg';
import microwaves from '../assets/products_images/microvave.jpeg';
import fridges from '../assets/products_images/fridges.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Discarded Earbuds",
    description: "Wireless earbuds and their charging cases contain lithium batteries, circuit boards, and plastics that become hazardous e-waste when disposed improperly.",
    image: earbuds,
    category: "Audio"
  },
  {
    id: 2,
    name: "Smart Watches",
    description: "Collection of smart watches with their screens, batteries, and miniature electronics that pose significant environmental risks when discarded.",
    image: smartwatches,
    category: "Wearables"
  },
  {
    id: 3,
    name: "Gaming Controllers",
    description: "Discarded gaming controllers and accessories containing circuit boards, batteries, and non-biodegradable plastics that contribute to e-waste.",
    image: controllers,
    category: "Electronics"
  },
  {
    id: 4,
    name: "Used Batteries",
    description: "Discarded batteries containing lead-acid and other harmful chemicals that can severely impact the environment if not properly recycled.",
    image: oldBatteries,
    category: "Batteries"
  },
  {
    id: 5,
    name: "CFL Bulbs",
    description: "Used CFL light bulbs containing mercury and other toxic materials requiring special handling and disposal procedures.",
    image: cflBulbs,
    category: "Lighting"
  },
  {
    id: 6,
    name: "Old Routers",
    description: "Obsolete networking equipment containing circuit boards and electronic components that require proper recycling.",
    image: routers,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Washing Machines",
    description: "Old washing machines that contain various metals, electronics, and harmful components requiring specialized disposal.",
    image: washingMachines,
    category: "Appliances"
  },
  {
    id: 8,
    name: "Keyboards and Mouse",
    description: "Pile of discarded keyboards and computer mice, representing a significant source of plastic and electronic waste. These peripherals contain circuit boards, rubber components, and non-biodegradable plastics that pollute our environment.",
    image: keyboardsMice,
    category: "Electronics"
  },
  {
    id: 9,
    name: "Mobile Phones",
    description: "Pile of discarded mobile phones containing precious metals, toxic batteries, and non-biodegradable materials requiring proper recycling.",
    image: phones,
    category: "Electronics"
  },
  {
    id: 10,
    name: "Old Televisions",
    description: "Obsolete televisions containing significant amounts of lead and other toxic materials in their components.",
    image: televisions,
    category: "Electronics"
  },
  {
    id: 11,
    name: "Old Printers",
    description: "Discarded printers containing electronic components, toner residue, and plastics that need proper disposal.",
    image: printers,
    category: "Electronics"
  },
  {
    id: 12,
    name: "Circuit Boards",
    description: "Discarded printed circuit boards containing valuable metals like gold and copper, along with toxic materials requiring proper recycling.",
    image: circuitBoards,
    category: "Electronics"
  },
  {
    id: 13,
    name: "Storage Devices",
    description: "Old storage devices containing sensitive data and electronic components that need secure and proper disposal.",
    image: storageDevices,
    category: "Electronics"
  },
  {
    id: 14,
    name: "Microwaves",
    description: "Discarded microwave ovens containing hazardous components and materials requiring specialized recycling.",
    image: microwaves,
    category: "Appliances"
  },
  {
    id: 15,
    name: "Refrigerators",
    description: "Old refrigerators containing harmful coolants, insulation materials, and electronic components requiring proper disposal.",
    image: fridges,
    category: "Appliances"
  }
];

const Container = styled.div`
  padding: 2rem;
  background: #1a2a3a;
  min-height: 100vh;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: #fff;
  background: linear-gradient(135deg, rgba(76, 172, 188, 0.1), rgba(160, 217, 149, 0.1));
  border-radius: 20px;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #4CACBC;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #A0D995;
  max-width: 800px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const Card = styled(motion.div)`
  background: rgba(76, 172, 188, 0.1);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(76, 172, 188, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #4CACBC;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #A0D995;
  font-size: 1rem;
  line-height: 1.6;
`;

const CategoryTag = styled.span`
  background: rgba(160, 217, 149, 0.2);
  color: #A0D995;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const LearnMoreButton = styled(motion.button)`
  background: linear-gradient(45deg, #4CACBC, #A0D995);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Container>
      <HeroSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Common E-Waste Products</Title>
        <Subtitle>
          Learn about the electronic devices that are commonly discarded and
          their environmental impact. These products contain hazardous
          materials that require proper disposal and recycling.
        </Subtitle>
      </HeroSection>

      <Grid>
        {products.map((product) => (
          <Card
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageContainer>
              <img src={product.image} alt={product.name} />
            </ImageContainer>
            <CardContent>
              <CategoryTag>{product.category}</CategoryTag>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <LearnMoreButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLearnMore(product)}
              >
                Learn More
              </LearnMoreButton>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default Products; 