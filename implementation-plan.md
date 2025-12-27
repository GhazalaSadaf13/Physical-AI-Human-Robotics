# Chatbot Implementation Plan

This document details the full implementation plan for the Physical AI and Human Robotics chatbot.

## 1. Architecture: Local-First

The chatbot utilizes a **local, client-side architecture**. The entire knowledge base and the chatbot's core logic are contained within JavaScript files that run directly in the user's browser.

-   **Why this approach?**
    -   **Speed:** Responses are instantaneous as there are no network requests to a backend server.
    -   **Simplicity:** It's easy to integrate into the existing static Docusaurus website without needing to set up and maintain a separate server.
    -   **Cost-Effective:** No server costs are incurred.

### Query Flow

1.  **User Input:** The user types a message into the chat interface on the frontend.
2.  **Client-Side Logic:** The query is passed to the `getChatbotResponse` function in `src/chatbot-logic.js`.
3.  **Processing:**
    -   The logic first checks if the query is out-of-scope using a keyword blacklist.
    -   If it's in-scope, it performs semantic matching (keyword-based) against the questions in `src/knowledge-base.js`.
4.  **Response Generation:**
    -   If a strong match is found, the corresponding answer is retrieved.
    -   If the match is weak or non-existent, a polite rephrasing request is returned.
    -   If the query is out-of-scope, the predefined rejection message is returned.
5.  **Display:** The response is sent back to the frontend UI and displayed in the chat history.

## 2. Frontend: Floating Chat Widget

The chatbot will be implemented as a floating widget, persistent across all pages of the website.

-   **Appearance:** A circular chat icon will be fixed to the bottom-right of the screen.
-   **Behavior:**
    -   Clicking the icon will open a chat popup window.
    -   The window will contain the chat history and a text input field for new messages.
    -   A header will title the chatbot "Physical AI Chatbot".

## 3. Backend Logic (Client-Side)

The core logic resides in `src/chatbot-logic.js`.

-   **Question Matching:** A keyword-based scoring system is used. The user's query and each question in the knowledge base are tokenized, and the number of overlapping keywords determines the match score.
-   **Scope Validation:** A blacklist of keywords for topics like medicine, finance, and politics is used. If any of these are detected in the user's query, the chatbot immediately returns the "out of scope" message. A minimum match score is also required.
-   **Response Generation:** Responses are retrieved directly from the `answer` field of the best-matched question object in the knowledge base, ensuring no hallucination.

## 4. Scalability

The local-first architecture is suitable for a knowledge base of up to a few hundred questions.

-   **Scaling Up:** For a significantly larger knowledge base (1,000+ questions), the architecture can evolve:
    -   **API-Based:** The knowledge base can be moved to a backend server.
    -   **Vector Database:** For true semantic search, the questions can be converted into vector embeddings and stored in a vector database (e.g., Pinecone, Weaviate). The backend would then perform a vector similarity search, which is highly efficient and scalable.

## 5. User Experience

The primary goal is to provide a helpful and educational experience.

-   **Tone:** The chatbot will communicate in a professional, educational, and friendly tone.
-   **Performance:** Responses will be instant, creating a fluid conversational experience.
-   **Audience:** The design is suitable for a wide audience, from students and beginners looking for foundational knowledge to researchers seeking quick clarifications.
