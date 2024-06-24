import React, { useState, useEffect } from 'react';
import { fetchCardsByName, fetchCardTypes } from '../services/APIService';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch card types
  useEffect(() => {
    const getCardTypes = async () => {
      try {
        const data = await fetchCardTypes();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching card types:', error);
        setError('Failed to load card types.');
      }
    };
    getCardTypes();
  }, []);

  // Search for cards
  const handleSearchClick = async () => {
    if (query.trim() === '' && selectedType === '') {
      return;
    }
    setLoading(true);
    setError(null);
    setCards([]);
    try {
      const data = await fetchCardsByName(query, selectedType);
      setCards(data);
      if (data.length === 0) {
        setError('No cards found.');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Failed to fetch cards.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="App-header">
        <h1>Magic: The Gathering Cards</h1>
      </header>
      <section className="main-search">
        <div className="search-input">
          <label for="search-cards">Card</label>
          <input type="text" id="search-cards" name="search-cards" vvalue={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cards by name"></input>
        </div>
        <div className="select-input">
          <label for="cards-type">Type</label>
          <select name="cards-type" id="cards-type" value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="search-btn">
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </section>
      <section className='main-container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-container">
            {error ? (
              <p>{error}</p>
            ) : (cards.map(card => (
              <div key={card.id} className="card">
                <h3>{card.name}</h3>
                {card.imageUrl ? (
                  <img src={card.imageUrl} alt={card.name} />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CardList;
