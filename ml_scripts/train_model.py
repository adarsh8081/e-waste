import os
import json
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    Trainer,
    TrainingArguments,
    DataCollatorForLanguageModeling,
    EarlyStoppingCallback,
    TensorBoardCallback
)
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset as HFDataset
import wandb
import numpy as np
from typing import Dict, List, Optional

class EWasteDataset(Dataset):
    def __init__(self, data: List[Dict[str, str]], tokenizer, max_length: int = 512):
        self.data = data
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]
        # Format the conversation in a chat-like format
        conversation = f"User: {item['question']}\nAssistant: {item['answer']}"
        
        # Tokenize the text
        encoding = self.tokenizer(
            conversation,
            max_length=self.max_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )

        return {
            'input_ids': encoding['input_ids'].squeeze(),
            'attention_mask': encoding['attention_mask'].squeeze(),
            'labels': encoding['input_ids'].squeeze()
        }

def load_training_data() -> List[Dict[str, str]]:
    """Load and prepare training data"""
    # Example e-waste domain specific QA pairs
    data = [
        {
            "question": "What is e-waste?",
            "answer": "E-waste refers to electronic waste, including discarded electronic devices and equipment such as computers, smartphones, TVs, and household appliances. These items often contain hazardous materials that require proper disposal."
        },
        {
            "question": "What are the environmental impacts of e-waste?",
            "answer": "E-waste has several environmental impacts: 1) Toxic materials can contaminate soil and water, 2) Improper disposal releases harmful chemicals, 3) Mining for new materials increases environmental damage, 4) Landfills become overwhelmed with non-biodegradable waste."
        },
        {
            "question": "How should e-waste be properly disposed of?",
            "answer": "E-waste should be disposed of through certified recycling centers that can properly handle hazardous materials. Many retailers and manufacturers also offer take-back programs. Never throw e-waste in regular trash bins."
        },
        # Add more domain-specific QA pairs here
    ]
    
    # TODO: Load additional data from external sources
    # You can add more data from:
    # 1. Environmental protection agency documents
    # 2. E-waste management guidelines
    # 3. Academic papers on e-waste
    # 4. Industry reports and statistics
    
    return data

def prepare_model_and_tokenizer(model_name: str = "microsoft/phi-2"):
    """Initialize the model and tokenizer"""
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    
    # Add special tokens for chat format
    special_tokens = {
        "pad_token": "<pad>",
        "sep_token": "<sep>",
        "bos_token": "<bos>",
        "eos_token": "<eos>",
    }
    tokenizer.add_special_tokens(special_tokens)
    model.resize_token_embeddings(len(tokenizer))
    
    return model, tokenizer

def train_model(
    model,
    tokenizer,
    train_dataset,
    val_dataset,
    output_dir: str = "ewaste_model",
    num_epochs: int = 5,
    batch_size: int = 4,
    learning_rate: float = 1e-5,
):
    """Train the model with enhanced configuration"""
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=num_epochs,
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=batch_size,
        warmup_ratio=0.1,
        weight_decay=0.01,
        logging_dir="./logs",
        logging_steps=10,
        evaluation_strategy="steps",
        eval_steps=100,
        save_steps=100,
        save_total_limit=3,
        learning_rate=learning_rate,
        fp16=True,
        gradient_accumulation_steps=8,
        report_to="wandb",
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,
        remove_unused_columns=True,
        label_smoothing_factor=0.1,
        group_by_length=True,
        lr_scheduler_type="cosine",
        warmup_steps=1000,
        logging_first_step=True,
        dataloader_num_workers=4,
        gradient_checkpointing=True,
    )

    # Initialize the trainer with additional callbacks
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        data_collator=DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False),
        callbacks=[
            EarlyStoppingCallback(early_stopping_patience=3),
            TensorBoardCallback(),
        ]
    )

    # Train the model
    trainer.train()
    
    # Evaluate the model
    eval_results = trainer.evaluate()
    print(f"Final evaluation results: {eval_results}")
    
    # Save the model and tokenizer
    trainer.save_model(output_dir)
    tokenizer.save_pretrained(output_dir)
    
    # Save evaluation results
    with open(os.path.join(output_dir, "eval_results.json"), "w") as f:
        json.dump(eval_results, f)

def main():
    # Initialize wandb for experiment tracking
    wandb.init(project="ewaste-assistant", name="finetune-v1")
    
    # Load training data
    data = load_training_data()
    
    # Split data into train and validation sets
    train_data, val_data = train_test_split(data, test_size=0.1, random_state=42)
    
    # Initialize model and tokenizer
    model, tokenizer = prepare_model_and_tokenizer()
    
    # Create datasets
    train_dataset = EWasteDataset(train_data, tokenizer)
    val_dataset = EWasteDataset(val_data, tokenizer)
    
    # Train the model
    train_model(model, tokenizer, train_dataset, val_dataset)
    
    # Close wandb run
    wandb.finish()

if __name__ == "__main__":
    main() 