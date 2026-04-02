# GFDI Troubleshooting Guide (JSON Version)

This module provides a structured troubleshooting workflow for GFDI Protection Fault.

It is designed to support:
- Future UI tools
- Interactive troubleshooting assistants
- Decision-tree-based diagnostics

## 📁 File
- `gfdi-troubleshooting.json`

## 📌 Description
The JSON file defines a step-by-step diagnostic process.

Each step contains:
- id
- title
- description
- question
- next step logic (yes / no)

## 🔧 Use Cases

### 1. UI Tool
Can be used to build a step-by-step troubleshooting interface.

### 2. Chatbot Assistant
Can be integrated into an AI assistant for guided diagnostics.

### 3. Training Tool
Helps new engineers follow a standardized troubleshooting procedure.

## 🧠 Structure Example

```json
{
  "id": 1,
  "title": "...",
  "question": "...",
  "yes": 2,
  "no": "..."
}
