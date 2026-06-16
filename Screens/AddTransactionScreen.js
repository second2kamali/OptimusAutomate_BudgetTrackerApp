import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert,
  KeyboardAvoidingView, Platform, ScrollView
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
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={22} color={THEME.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Transaction</Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Type Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Type</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveIncome]}
                onPress={() => { setType('income'); setCategory(''); }}
                activeOpacity={0.85}
              >
                <MaterialIcons
                  name="trending-up"
                  size={18}
                  color={type === 'income' ? '#fff' : THEME.grey}
                />
                <Text style={[styles.typeBtnText, type === 'income' && styles.typeBtnTextActive]}>
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'expense' && styles.typeBtnActiveExpense]}
                onPress={() => { setType('expense'); setCategory(''); }}
                activeOpacity={0.85}
              >
                <MaterialIcons
                  name="trending-down"
                  size={18}
                  color={type === 'expense' ? '#fff' : THEME.grey}
                />
                <Text style={[styles.typeBtnText, type === 'expense' && styles.typeBtnTextActive]}>
                  Expense
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
              placeholderTextColor={THEME.muted}
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
              placeholderTextColor={THEME.muted}
            />
          </View>

          {/* Category Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES[type].map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryBtn,
                    category === cat && {
                      backgroundColor: type === 'income' ? THEME.income : THEME.expense,
                      borderColor: type === 'income' ? THEME.income : THEME.expense,
                    }
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.85}
                >
                  <Text style={[
                    styles.categoryBtnText,
                    category === cat && { color: '#fff', fontWeight: '700' }
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
              backgroundColor: type === 'income' ? THEME.income : THEME.expense
            }]}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <MaterialIcons name="check" size={20} color="#fff" />
            <Text style={styles.saveBtnText}>Save Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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

  // --- Scroll ---
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // --- Section ---
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.grey,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // --- Type Buttons ---
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  typeBtnActiveIncome: {
    backgroundColor: THEME.income,
    borderColor: THEME.income,
  },
  typeBtnActiveExpense: {
    backgroundColor: THEME.expense,
    borderColor: THEME.expense,
  },
  typeBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.grey,
  },
  typeBtnTextActive: {
    color: '#fff',
  },

  // --- Inputs ---
  input: {
    backgroundColor: THEME.surface,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: THEME.white,
    borderWidth: 1,
    borderColor: THEME.border,
  },

  // --- Category Grid ---
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  categoryBtnText: {
    fontSize: 14,
    color: THEME.white,
    fontWeight: '500',
  },

  // --- Save Button ---
  saveBtn: {
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});