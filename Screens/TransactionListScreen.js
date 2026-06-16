import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, FlatList, Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBudget } from '../Context/BudgetContext';

// --- SAME DARK THEME (No backend changes) ---
const THEME = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceLight: '#334155',
  border: '#334155',
  white: '#F8FAFC',
  black: '#F1F5F9',
  grey: '#94A3B8',
  muted: '#64748B',
  income: '#34D399',
  expense: '#F87171',
  danger: '#EF4444',
};

export default function TransactionListScreen({ navigation }) {
  const { transactions, deleteTransaction } = useBudget();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(id) },
      ]
    );
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.iconBox, {
        backgroundColor: item.type === 'income' ? THEME.income + '18' : THEME.expense + '18'
      }]}>
        <MaterialIcons
          name={item.type === 'income' ? 'arrow-downward' : 'arrow-upward'}
          size={20}
          color={item.type === 'income' ? THEME.income : THEME.expense}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionCategory}>{item.category} • {item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[styles.transactionAmount, {
          color: item.type === 'income' ? THEME.income : THEME.expense
        }]}>
          {item.type === 'income' ? '+' : '-'} Rs. {item.amount.toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}
        >
          <MaterialIcons name="delete-outline" size={18} color={THEME.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={22} color={THEME.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredTransactions.length}</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {['all', 'income', 'expense'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.filterBtn, filter === type && styles.filterBtnActive]}
            onPress={() => setFilter(type)}
            activeOpacity={0.85}
          >
            <MaterialIcons
              name={type === 'all' ? 'list' : type === 'income' ? 'trending-up' : 'trending-down'}
              size={16}
              color={filter === type ? '#fff' : THEME.grey}
            />
            <Text style={[styles.filterBtnText, filter === type && styles.filterBtnTextActive]}>
              {type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expense'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconBg, { backgroundColor: THEME.surfaceLight }]}>
            <MaterialIcons name="receipt-long" size={32} color={THEME.muted} />
          </View>
          <Text style={styles.emptyTitle}>No transactions found</Text>
          <Text style={styles.emptySubText}>Add your first transaction to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddTransaction')}
        activeOpacity={0.85}
      >
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.addBtnText}>Add Transaction</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },

  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: THEME.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.white,
    letterSpacing: -0.3,
  },
  countBadge: {
    minWidth: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: THEME.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.primaryLight,
  },

  // --- Filter Row ---
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  filterBtnActive: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  filterBtnText: {
    fontSize: 13,
    color: THEME.grey,
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: '#fff',
  },

  // --- List ---
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  // --- Transaction Item ---
  transactionItem: {
    backgroundColor: THEME.surface,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.white,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: THEME.grey,
    fontWeight: '400',
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: THEME.danger + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- Empty State ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -40,
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.white,
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: THEME.grey,
    textAlign: 'center',
    lineHeight: 20,
  },

  // --- Add Button ---
  addBtn: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: THEME.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});