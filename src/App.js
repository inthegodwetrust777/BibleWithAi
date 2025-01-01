import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.results);
      } else {
        setSearchResults("No results found.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults("Error fetching results. Please try again.");
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/news");
      const data = await response.json();
      if (data.success) {
        setNews(data.articles);
      } else {
        setError("Failed to fetch news.");
      }
    } catch (error) {
      console.error("Error fetching news:", error.message);
      setError("Error fetching news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRedirect = (url) => {
    window.location.href = `/ad-page?redirect=${encodeURIComponent(url)}`;
  };

  return (
    <div className="App">
      <h1>Bible Search and News</h1>

      <section>
        <h2>Search Bible Verses</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a keyword (e.g., love, faith)"
        />
        <button onClick={handleSearch}>Search</button>
        <div className="results">{searchResults}</div>
      </section>

      <section>
        <h2>News Related to God Around the Globe</h2>
        {loading ? (
          <p>Loading news...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <div className="news-card" key={index} onClick={() => handleRedirect(article.url)}>
                <img src={article.urlToImage || "placeholder.jpg"} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span>Source: {article.source}</span>
                <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
