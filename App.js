import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [dailyQuote, setDailyQuote] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.results);
      } else {
        setSearchResults('No results found.');
      }
    } catch (error) {
      setSearchResults('Error fetching results. Please try again.');
    }
  };

  const fetchDailyQuote = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/daily-quote');
      const data = await response.json();
      if (data.success) {
        setDailyQuote(data.quote);
      } else {
        setDailyQuote('No quote available for today.');
      }
    } catch (error) {
      setDailyQuote('Error fetching daily quote. Please try again.');
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Start Exploring Below</h1>
        <p className="daily-quote">{dailyQuote}</p>
      </header>

      <section>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your emotions , topic you want to explore , verses you want to know.. (e.g., love, faith)"
        />
        <button onClick={handleSearch}>Search</button>
        <div className="results">{searchResults}</div>
      </section>
    </div>
  );
}

export default App;
