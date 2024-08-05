import React, { useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyB5BViYfCGt6xXkYGE2jhi-6GebVvfFlDM');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(query);
      const response = await result.response;
      const text = response.text();
      console.log("Response \n",response);

      setResponse(text);
    } catch (error) {
      console.log('Error generating content:', error);
      setResponse('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Chatbot- Gemini API Query</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query here..."
          rows="6"
          cols="50"
        /><br></br>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Ask Gemini'}
        </button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;
