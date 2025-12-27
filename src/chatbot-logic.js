
import { knowledgeBase } from './knowledge-base';

// Out-of-scope keywords
const outOfScopeKeywords = [
  'medical', 'health', 'doctor',
  'politics', 'government', 'election',
  'finance', 'money', 'stock',
  'entertainment', 'movie', 'music', 'celebrity',
  'personal', 'legal', 'weather'
];

// Function to check for out-of-scope questions
function isOutOfScope(query) {
  const lowerCaseQuery = query.toLowerCase();
  return outOfScopeKeywords.some(keyword => lowerCaseQuery.includes(keyword));
}

// Function to find the best match from the knowledge base
function findBestMatch(userQuery) {
  // Handle single-word queries for core concepts
  if (userQuery.toLowerCase() === 'book') {
    return {
        question: 'What is this book about?',
        answer: 'This book focuses on Physical AI and Human Robotics, covering how intelligent systems are embodied in physical machines, how robots perceive, learn, and interact with humans in the real world.'
    };
  }
    
  const userKeywords = userQuery.toLowerCase().split(' ').filter(word => word.length > 1);
  let bestMatch = { score: 0, question: null };

  knowledgeBase.forEach(item => {
    const questionKeywords = item.question.toLowerCase().split(' ');
    const score = userKeywords.filter(word => questionKeywords.includes(word)).length;

    if (score > bestMatch.score) {
      bestMatch = { score: score, question: item };
    }
  });

  // New Threshold: A single keyword match is now considered valid.
  if (bestMatch.score < 1) {
    return null;
  }

  return bestMatch.question;
}

// Main function to get the chatbot response
export function getChatbotResponse(userQuery) {
  const lowerCaseQuery = userQuery.toLowerCase().trim();

  // Handle greetings
  if (['hi', 'hello', 'hey'].includes(lowerCaseQuery)) {
    return "Hello! How can I assist you with Physical AI and Human Robotics today?";
  }

  if (isOutOfScope(lowerCaseQuery)) {
    return "This question is outside the scope of Physical AI and Human Robotics. Please ask a question related to this topic.";
  }

  const bestMatch = findBestMatch(lowerCaseQuery);

  if (bestMatch) {
    return bestMatch.answer;
  } else {
    return "I'm not sure I understand. Could you please rephrase your question in the context of Physical AI or Human Robotics?";
  }
}
