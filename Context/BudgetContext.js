import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BudgetContext = createContext();

const initialTransactions = [
  { id: '1', title: 'Salary', amount: 50000, type: 'income', category: 'Salary', date: '2026-06-01' },
  { id: '2', title: 'Rent', amount: 15000, type: 'expense', category: 'Housing', date: '2026-06-02' },
  { id: '3', title: 'Groceries', amount: 3000, type: 'expense', category: 'Food', date: '2026-06-03' },
  { id: '4', title: 'Freelance', amount: 20000, type: 'income', category: 'Business', date: '2026-06-04' },
  { id: '5', title: 'Electricity Bill', amount: 2500, type: 'expense', category: 'Utilities', date: '2026-06-05' },
];

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(30000);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      saveData();
    }
  }, [transactions, budgetLimit]);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('transactions');
      const storedLimit = await AsyncStorage.getItem('budgetLimit');
      if (stored !== null) {
        setTransactions(JSON.parse(stored));
      } else {
        setTransactions(initialTransactions);
      }
      if (storedLimit !== null) {
        setBudgetLimit(JSON.parse(storedLimit));
      }
    } catch (error) {
      console.log('Error loading data:', error);
      setTransactions(initialTransactions);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      await AsyncStorage.setItem('budgetLimit', JSON.stringify(budgetLimit));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const addTransaction = (title, amount, type, category) => {
    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudgetLimit = (limit) => {
    setBudgetLimit(parseFloat(limit));
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <BudgetContext.Provider value={{
      transactions,
      budgetLimit,
      totalIncome,
      totalExpense,
      balance,
      addTransaction,
      deleteTransaction,
      updateBudgetLimit,
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);