
interface Response {
  keywords: string[];
  response: string;
}

const predefinedResponses: Response[] = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello! How can I help you today?"
  },
  {
    keywords: ["how are you"],
    response: "I'm doing well, thank you for asking! How can I assist you?"
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    response: "Goodbye! Have a great day!"
  },
  {
    keywords: ["help", "support"],
    response: "I can help you with general questions. Feel free to ask!"
  },
  {
    keywords: ["weather"],
    response: "I'm sorry, I don't have access to real-time weather information."
  },
  {
    keywords: ["name"],
    response: "I'm a simple chatbot here to help you!"
  }
];

export const getBotResponse = (userInput: string): string => {
  const lowercaseInput = userInput.toLowerCase();
  
  for (const item of predefinedResponses) {
    if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return item.response;
    }
  }
  
  return "I'm not sure how to respond to that. Could you please rephrase your question?";
};
