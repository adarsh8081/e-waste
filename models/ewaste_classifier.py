import os
import torch
import torchvision
from torchvision import transforms
from PIL import Image
import torch.nn as nn
from pathlib import Path
import torch.optim as optim
from torchvision import datasets
import numpy as np

class EWasteClassifier:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.classes = [
            'Battery', 'Keyboard', 'Microwave', 'Mobile', 'Mouse',
            'PCB', 'Player', 'Printer', 'Television', 'Washing Machine'
        ]
        
        # Define the model architecture
        self.model = self._create_model()
        
        # Define image transformations
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        # Load the dataset paths
        self.dataset_path = Path("E-waste-dataset")
        self.train_path = self.dataset_path / "train"
        self.val_path = self.dataset_path / "val"
        self.test_path = self.dataset_path / "test"

        # Train the model if no saved weights exist
        if not os.path.exists('ML_model/ewaste_model.pth'):
            print("Training new model...")
            self.train_model()
        else:
            print("Loading pre-trained model...")
            self.model.load_state_dict(torch.load('ML_model/ewaste_model.pth', map_location=self.device))
        
        self.model.eval()

    def _create_model(self):
        # Use ResNet50 as base model
        model = torchvision.models.resnet50(pretrained=True)
        
        # Modify the final layer for our classes
        num_features = model.fc.in_features
        model.fc = nn.Sequential(
            nn.Linear(num_features, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, len(self.classes))
        )
        
        model = model.to(self.device)
        return model

    def train_model(self, epochs=10, batch_size=32):
        # Data augmentation for training
        train_transform = transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        # Load datasets
        train_dataset = datasets.ImageFolder(self.train_path, transform=train_transform)
        val_dataset = datasets.ImageFolder(self.val_path, transform=self.transform)
        
        train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
        val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=batch_size)

        # Loss function and optimizer
        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(self.model.parameters(), lr=0.001)
        scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=2)

        best_val_loss = float('inf')
        
        print("Starting training...")
        for epoch in range(epochs):
            # Training phase
            self.model.train()
            train_loss = 0
            correct = 0
            total = 0
            
            for inputs, labels in train_loader:
                inputs, labels = inputs.to(self.device), labels.to(self.device)
                
                optimizer.zero_grad()
                outputs = self.model(inputs)
                loss = criterion(outputs, labels)
                loss.backward()
                optimizer.step()
                
                train_loss += loss.item()
                _, predicted = outputs.max(1)
                total += labels.size(0)
                correct += predicted.eq(labels).sum().item()
            
            train_accuracy = 100. * correct / total
            
            # Validation phase
            self.model.eval()
            val_loss = 0
            correct = 0
            total = 0
            
            with torch.no_grad():
                for inputs, labels in val_loader:
                    inputs, labels = inputs.to(self.device), labels.to(self.device)
                    outputs = self.model(inputs)
                    loss = criterion(outputs, labels)
                    
                    val_loss += loss.item()
                    _, predicted = outputs.max(1)
                    total += labels.size(0)
                    correct += predicted.eq(labels).sum().item()
            
            val_accuracy = 100. * correct / total
            
            print(f'Epoch {epoch+1}/{epochs}:')
            print(f'Train Loss: {train_loss/len(train_loader):.3f} | Train Acc: {train_accuracy:.2f}%')
            print(f'Val Loss: {val_loss/len(val_loader):.3f} | Val Acc: {val_accuracy:.2f}%')
            
            # Save best model
            if val_loss < best_val_loss:
                best_val_loss = val_loss
                torch.save(self.model.state_dict(), 'ML_model/ewaste_model.pth')
                print("Saved best model checkpoint")
            
            scheduler.step(val_loss)

    def get_disposal_guidelines(self, e_waste_type):
        """Return disposal and recycling guidelines for specific e-waste types."""
        guidelines = {
            'Battery': """
                Proper disposal of batteries is crucial:
                1. Never throw batteries in regular trash
                2. Use designated battery recycling bins
                3. Remove from devices before recycling
                4. Keep different battery types separate
                5. Tape terminal ends of lithium batteries
                Benefits: Prevents hazardous materials from entering landfills and recovers valuable metals.
            """,
            'Keyboard': """
                Keyboard recycling guidelines:
                1. Remove batteries if wireless
                2. Separate plastic and circuit boards
                3. Take to electronics recycling center
                4. Consider donating if still functional
                5. Check with manufacturer for recycling programs
                Benefits: Recovers plastics and precious metals from circuit boards.
            """,
            'Microwave': """
                Microwave disposal instructions:
                1. Never put in regular trash
                2. Take to certified e-waste recycler
                3. Remove glass plate for separate recycling
                4. Don't attempt to dismantle
                5. Check local appliance recycling programs
                Benefits: Proper handling of capacitors and electrical components.
            """,
            'Mobile': """
                Mobile phone recycling steps:
                1. Backup and wipe personal data
                2. Remove SIM and memory cards
                3. Remove battery if possible
                4. Use manufacturer's recycling program
                5. Consider trade-in programs
                Benefits: Recovers gold, silver, and rare earth elements.
            """,
            'Mouse': """
                Computer mouse disposal:
                1. Remove batteries from wireless mice
                2. Separate into plastic/electronic components
                3. Recycle with other computer peripherals
                4. Check manufacturer take-back programs
                5. Consider donation if working
                Benefits: Reduces electronic waste in landfills.
            """,
            'PCB': """
                PCB (Printed Circuit Board) recycling:
                1. Handle with care - may contain hazardous materials
                2. Never burn or dispose in regular trash
                3. Send to specialized PCB recyclers
                4. Keep separate from other electronics
                5. Follow local hazardous waste guidelines
                Benefits: Recovers precious metals and prevents toxic contamination.
            """,
            'Player': """
                Media player recycling guidelines:
                1. Remove batteries if applicable
                2. Separate plastic casing if possible
                3. Recycle with other electronics
                4. Consider donation if working
                5. Check manufacturer recycling programs
                Benefits: Reduces electronic waste and recovers materials.
            """,
            'Printer': """
                Printer disposal guidelines:
                1. Remove ink/toner cartridges
                2. Recycle cartridges separately
                3. Take to electronics recycler
                4. Consider manufacturer take-back
                5. Remove paper and packaging
                Benefits: Proper handling of ink and electronic components.
            """,
            'Television': """
                TV recycling instructions:
                1. Never break the screen
                2. Keep intact for recycling
                3. Use certified e-waste recyclers
                4. Consider donation if working
                5. Check for local recycling events
                Benefits: Proper handling of hazardous materials in screens.
            """,
            'Washing Machine': """
                Washing machine disposal:
                1. Disconnect water and power
                2. Drain all water
                3. Use appliance recycling service
                4. Consider trade-in programs
                5. Remove non-metal parts if required
                Benefits: Recovers metal and reduces landfill waste.
            """
        }
        return guidelines.get(e_waste_type, "Guidelines not available for this type of e-waste.")

    def classify_image(self, image_path):
        """Classify an e-waste image and return the predicted class and guidelines."""
        try:
            # Load and preprocess the image
            image = Image.open(image_path).convert('RGB')
            image_tensor = self.transform(image).unsqueeze(0).to(self.device)

            # Get prediction
            with torch.no_grad():
                outputs = self.model(image_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                confidence, predicted = torch.max(probabilities, 1)
                
            predicted_class = self.classes[predicted.item()]
            confidence_score = confidence.item() * 100

            # Get disposal guidelines
            guidelines = self.get_disposal_guidelines(predicted_class)

            return {
                'success': True,
                'class': predicted_class,
                'confidence': f'{confidence_score:.2f}%',
                'guidelines': guidelines
            }
        except Exception as e:
            print(f"Error in classify_image: {str(e)}")
            return {
                'success': False,
                'error': 'Failed to analyze image'
            }

    def get_dataset_info(self):
        """Return information about the available e-waste categories and dataset."""
        info = {
            'categories': self.classes,
            'description': """
            This e-waste classification system can identify 10 different types of electronic waste:
            - Batteries: Various types of electronic batteries
            - Keyboards: Computer and electronic device keyboards
            - Microwaves: Microwave ovens
            - Mobile Phones: Smartphones and mobile devices
            - Computer Mice: Wired and wireless mouse devices
            - PCBs: Printed Circuit Boards
            - Players: Media players and related devices
            - Printers: Computer printers and related equipment
            - Televisions: TV sets and monitors
            - Washing Machines: Home washing appliances
            
            Each category has specific disposal and recycling guidelines to ensure proper e-waste management.
            """,
            'usage': 'Upload an image of e-waste to get classification and disposal guidelines.'
        }
        return info 