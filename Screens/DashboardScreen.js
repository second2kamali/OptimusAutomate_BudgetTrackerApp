import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert
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

export default function DashboardScreen({ navigation }) {
  const { totalIncome, totalExpense, balance, budgetLimit, updateBudgetLimit } = useBudget();

  const expensePercentage = budgetLimit > 0 ? (totalExpense / budgetLimit) * 100 : 0;
  const isOverBudget = totalExpense > budgetLimit;

  const handleSetBudget = () => {
    Alert.prompt(
      'Set Budget Limit',
      'Enter your monthly budget limit:',
      (value) => {
        if (value && !isNaN(value)) {
          updateBudgetLimit(value);
        }
      },
      'plain-text',
      budgetLimit.toString()
    );
  };

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
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={[
            styles.balanceIcon,
            { backgroundColor: balance >= 0 ? THEME.income + '18' : THEME.expense + '18' }
          ]}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={balance >= 0 ? THEME.income : THEME.expense}
            />
          </View>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={[styles.balanceAmount, { color: balance >= 0 ? THEME.income : THEME.expense }]}>
            Rs. {balance.toLocaleString()}
          </Text>
        </View>

        {/* Income & Expense Row */}
        <View style={styles.row}>
          <View style={[styles.statCard, { borderLeftColor: THEME.income }]}>
            <View style={[styles.statIconWrap, { backgroundColor: THEME.income + '18' }]}>
              <MaterialIcons name="trending-up" size={20} color={THEME.income} />
            </View>
            <Text style={styles.statLabel}>Total Income</Text>
            <Text style={[styles.statAmount, { color: THEME.income }]}>
              Rs. {totalIncome.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: THEME.expense }]}>
            <View style={[styles.statIconWrap, { backgroundColor: THEME.expense + '18' }]}>
              <MaterialIcons name="trending-down" size={20} color={THEME.expense} />
            </View>
            <Text style={styles.statLabel}>Total Expense</Text>
            <Text style={[styles.statAmount, { color: THEME.expense }]}>
              Rs. {totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Budget Progress */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <View style={styles.budgetTitleRow}>
              <MaterialIcons name="savings" size={18} color={THEME.white} />
              <Text style={styles.budgetTitle}>Monthly Budget</Text>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={handleSetBudget}
              activeOpacity={0.85}
            >
              <MaterialIcons name="edit" size={16} color={THEME.grey} />
            </TouchableOpacity>
          </View>

          <Text style={styles.budgetLimit}>
            Limit: Rs. {budgetLimit.toLocaleString()}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, {
              width: `${Math.min(expensePercentage, 100)}%`,
              backgroundColor: isOverBudget ? THEME.expense : THEME.primary,
            }]} />
          </View>

          <View style={styles.progressStatusRow}>
            <MaterialIcons
              name={isOverBudget ? 'warning' : 'check-circle'}
              size={16}
              color={isOverBudget ? THEME.expense : THEME.income}
            />
            <Text style={[styles.progressText, { color: isOverBudget ? THEME.expense : THEME.grey }]}>
              {isOverBudget
                ? `Over budget by Rs. ${(totalExpense - budgetLimit).toLocaleString()}`
                : `Rs. ${(budgetLimit - totalExpense).toLocaleString()} remaining`}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: THEME.income }]}
              onPress={() => navigation.navigate('AddTransaction')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="add" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: THEME.expense }]}
              onPress={() => navigation.navigate('AddTransaction')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="remove" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  // --- Balance Card ---
  balanceCard: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 12,
  },
  balanceIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  balanceLabel: {
    fontSize: 13,
    color: THEME.grey,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },

  // --- Stats Row ---
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.surface,
    borderRadius: 20,
    padding: 18,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.grey,
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  statAmount: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // --- Budget Card ---
  budgetCard: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.white,
    letterSpacing: -0.3,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: THEME.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetLimit: {
    fontSize: 14,
    color: THEME.grey,
    marginBottom: 14,
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    backgroundColor: THEME.surfaceLight,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
  },
  progressStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // --- Actions Card ---
  actionsCard: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.white,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});