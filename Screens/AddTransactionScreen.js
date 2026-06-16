import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { COLORS } from '../Constants/colors';
import { useBudget } from '../Context/BudgetContext';

const CATEGORIES = {
  income: ['Salary', 'Business', 'Freelance', 'Investment', 'Other'],
  expense: ['Food', 'Housing', 'Transport', 'Utilities', 'Shopping', 'Health', 'Other'],
};

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useBudget();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title!');
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount!');
      return;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a category!');
      return;
    }

    addTransaction(title.trim(), amount, type, category);
    Alert.alert('Success', 'Transaction added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>+ Add Transaction</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Type Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Type</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveIncome]}
                onPress={() => { setType('income'); setCategory(''); }}
              >
                <Text style={[styles.typeBtnText, type === 'income' && styles.typeBtnTextActive]}>
                  📈 Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'expense' && styles.typeBtnActiveExpense]}
                onPress={() => { setType('expense'); setCategory(''); }}
              >
                <Text style={[styles.typeBtnText, type === 'expense' && styles.typeBtnTextActive]}>
                  📉 Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Monthly Salary"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={COLORS.grey}
            />
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount (Rs.)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 5000"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholderTextColor={COLORS.grey}
            />
          </View>

          {/* Category Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES[type].map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryBtn,
                    category === cat && {
                      backgroundColor: type === 'income' ? COLORS.income : COLORS.expense
                    }
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.categoryBtnText,
                    category === cat && { color: COLORS.white }
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveBtn, {
              backgroundColor: type === 'income' ? COLORS.income : COLORS.expense
            }]}
            onPress={handleSave}
          >
            <Text style={styles.saveBtnText}>💾 Save Transaction</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
  },
  typeBtnActiveIncome: {
    backgroundColor: COLORS.income,
    borderColor: COLORS.income,
  },
  typeBtnActiveExpense: {
    backgroundColor: COLORS.expense,
    borderColor: COLORS.expense,
  },
  typeBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.grey,
  },
  typeBtnTextActive: {
    color: COLORS.white,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    elevation: 2,
  },
  categoryBtnText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  saveBtn: {
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});