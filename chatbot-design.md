
# AI Chatbot Design for "Physical AI and Human Robotics"

## 1. Internal Logic and Architecture

This document outlines the design and architecture of the AI chatbot. The chatbot is designed to be educational, accurate, and strictly focused on the domain of Physical AI and Human Robotics.

### 1.1. Core Architecture

The chatbot will use a local, JavaScript-based architecture. The knowledge base and the core logic will reside client-side. This approach is simple, fast for a small-to-medium-sized knowledge base, and avoids the need for a server backend, making it easy to integrate into the existing static website.

The architecture consists of three main components:

1.  **Knowledge Base:** A structured array of question-answer pairs stored in `src/knowledge-base.js`.
2.  **Chatbot Engine:** The core logic responsible for processing user queries, performing semantic matching, validating scope, and generating responses. This will be implemented in `src/chatbot-logic.js`.
3.  **Frontend Interface:** The user-facing chat widget, integrated into the website's React components.

### 1.2. Semantic Matching

To understand the user's intent, the chatbot will perform semantic matching against the questions in the knowledge base.

**Method:**

1.  **Vectorization (Conceptual):** While a true implementation would use a pre-trained sentence-transformer model (like `sentence-transformers/all-MiniLM-L6-v2`) to convert both the user's query and all knowledge base questions into high-dimensional vectors, we will simulate this with a keyword-based approach for this implementation.

2.  **Similarity Calculation:** The "similarity" will be calculated by counting the number of overlapping keywords between the user's query and each question in the knowledge base.

3.  **Best Match Selection:** The knowledge base question with the highest keyword overlap is selected as the best match.

**Internal Logic Example (Conceptual):**
```javascript
// Simplified logic for finding the best match
function findBestMatch(userQuery, knowledgeBase) {
  const userKeywords = userQuery.toLowerCase().split(' ');
  let bestMatch = { score: -1, question: null };

  knowledgeBase.forEach(item => {
    const questionKeywords = item.question.toLowerCase().split(' ');
    const score = userKeywords.filter(word => questionKeywords.includes(word)).length;

    if (score > bestMatch.score) {
      bestMatch = { score: score, question: item };
    }
  });

  return bestMatch;
}
```

### 1.3. Scope Validation

It is critical that the chatbot only answers questions within its designated domain.

**Method:**

1.  **Primary Check (Similarity Threshold):** A minimum similarity score (keyword overlap) will be required for a match to be considered valid. If the score of the best match is below a certain threshold (e.g., a minimum of 2 overlapping keywords), the query is flagged as potentially out-of-scope.

2.  **Secondary Check (Blacklist):** A blacklist of keywords related to out-of-scope topics (e.g., "medical", "finance", "politics", "movie", "song") will be used. If the user's query contains any of these keywords, it will be immediately rejected.

**Response for Out-of-Scope Questions:**

If a question is determined to be out of scope, the chatbot will **always** respond with the exact phrase:
`"This question is outside the scope of Physical AI and Human Robotics. Please ask a question related to this topic."`

### 1.4. Answer Generation and Selection

The chatbot's answers are generated directly from the knowledge base to prevent hallucination.

**Method:**

1.  **Direct Retrieval:** Once a valid, in-scope match is found, the chatbot retrieves the corresponding answer from the matched knowledge base entry.

2.  **Clarity and Ambiguity:** If the semantic matching score is low, indicating a potential misunderstanding, or if no match is found, the chatbot will ask the user to rephrase their question. For example: `"I'm not sure I understand. Could you please rephrase your question?"`

3.  **Response Length:** By default, the chatbot provides the standard answer from the knowledge base. The knowledge base is designed with concise answers. Future enhancements could include a "detailed" version of the answer that the user could request.

### 1.5. Scalability

The proposed design can be scaled effectively.

1.  **From Local to API-Based:** For a very large knowledge base (e.g., 10,000+ questions), the local keyword search would become slow. The architecture can be migrated to an API-based model.
2.  **Vector Database:** The knowledge base questions and their corresponding vectors would be stored in a dedicated vector database (e.g., Pinecone, Weaviate).
3.  **Backend Service:** A simple backend service would receive the user's query, convert it to a vector, and perform a highly efficient similarity search against the millions of vectors in the database.

This approach offloads the heavy computation to a server and keeps the client-side application lightweight and fast, regardless of the knowledge base size.
