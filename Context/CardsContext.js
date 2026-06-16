import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardsContext = createContext();

const initialCards = [
  { id: '1', question: 'What is React Native?', answer: 'A framework for building mobile apps using React.' },
  { id: '2', question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML.' },
  { id: '3', question: 'What is a Component?', answer: 'A reusable piece of UI in React.' },
  { id: '4', question: 'What is State?', answer: 'A dynamic data storage in React components.' },
  { id: '5', question: 'What is Props?', answer: 'Properties passed from parent to child component.' },
];

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  // Load cards from AsyncStorage on app start
  useEffect(() => {
    loadCards();
  }, []);

  // Save cards to AsyncStorage whenever cards change
  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  const loadCards = async () => {
    try {
      const stored = await AsyncStorage.getItem('flashcards');
      if (stored !== null) {
        setCards(JSON.parse(stored));
      } else {
        setCards(initialCards);
      }
    } catch (error) {
      console.log('Error loading cards:', error);
      setCards(initialCards);
    }
  };

  const saveCards = async (cardsData) => {
    try {
      await AsyncStorage.setItem('flashcards', JSON.stringify(cardsData));
    } catch (error) {
      console.log('Error saving cards:', error);
    }
  };

  const addCard = (question, answer) => {
    const newCard = {
      id: Date.now().toString(),
      question,
      answer,
    };
    setCards(prev => [...prev, newCard]);
  };

  const editCard = (id, question, answer) => {
    setCards(prev => prev.map(card =>
      card.id === id ? { ...card, question, answer } : card
    ));
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  return (
    <CardsContext.Provider value={{ cards, addCard, editCard, deleteCard }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => useContext(CardsContext);