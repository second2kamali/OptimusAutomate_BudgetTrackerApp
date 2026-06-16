import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, FlatList, Alert
} from 'react-native';
import { COLORS } from '../Constants/colors';
import { useBudget } from '../Context/BudgetContext';

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
        backgroundColor: item.type === 'income' ? '#E8F8F0' : '#FEE8E8'
      }]}>
        <Text style={styles.icon}>
          {item.type === 'income' ? '📈' : '📉'}
        </Text>
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionCategory}>{item.category} • {item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[styles.transactionAmount, {
          color: item.type === 'income' ? COLORS.income : COLORS.expense
        }]}>
          {item.type === 'income' ? '+' : '-'} Rs. {item.amount.toLocaleString()}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteBtn}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📋 Transactions</Text>
        <Text style={styles.countText}>{filteredTransactions.length}</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {['all', 'income', 'expense'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.filterBtn, filter === type && styles.filterBtnActive]}
            onPress={() => setFilter(type)}
          >
            <Text style={[styles.filterBtnText, filter === type && styles.filterBtnTextActive]}>
              {type === 'all' ? 'All' : type === 'income' ? '📈 Income' : '📉 Expense'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found!</Text>
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
      >
        <Text style={styles.addBtnText}>+ Add Transaction</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  countText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    margin: 16,
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterBtnText: {
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  transactionItem: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  transactionCategory: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  deleteBtn: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.grey,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});