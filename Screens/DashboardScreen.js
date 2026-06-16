import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert
} from 'react-native';
import { COLORS } from '../Constants/colors';
import { useBudget } from '../Context/BudgetContext';

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📊 Dashboard</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={[styles.balanceAmount, { color: balance >= 0 ? COLORS.income : COLORS.expense }]}>
            Rs. {balance.toLocaleString()}
          </Text>
        </View>

        {/* Income & Expense Row */}
        <View style={styles.row}>
          <View style={[styles.statCard, { borderLeftColor: COLORS.income }]}>
            <Text style={styles.statIcon}>📈</Text>
            <Text style={styles.statLabel}>Total Income</Text>
            <Text style={[styles.statAmount, { color: COLORS.income }]}>
              Rs. {totalIncome.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: COLORS.expense }]}>
            <Text style={styles.statIcon}>📉</Text>
            <Text style={styles.statLabel}>Total Expense</Text>
            <Text style={[styles.statAmount, { color: COLORS.expense }]}>
              Rs. {totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Budget Progress */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetTitle}>Monthly Budget</Text>
            <TouchableOpacity onPress={handleSetBudget} style={styles.editBtn}>
              <Text style={styles.editBtnText}>✏️ Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.budgetLimit}>
            Limit: Rs. {budgetLimit.toLocaleString()}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, {
              width: `${Math.min(expensePercentage, 100)}%`,
              backgroundColor: isOverBudget ? COLORS.expense : COLORS.primary,
            }]} />
          </View>

          <Text style={[styles.progressText, { color: isOverBudget ? COLORS.expense : COLORS.grey }]}>
            {isOverBudget
              ? `⚠️ Over budget by Rs. ${(totalExpense - budgetLimit).toLocaleString()}!`
              : `✅ Rs. ${(budgetLimit - totalExpense).toLocaleString()} remaining`}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: COLORS.income }]}
              onPress={() => navigation.navigate('AddTransaction')}
            >
              <Text style={styles.actionBtnText}>+ Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: COLORS.expense }]}
              onPress={() => navigation.navigate('AddTransaction')}
            >
              <Text style={styles.actionBtnText}>- Add Expense</Text>
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
  balanceCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.grey,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  budgetCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  editBtn: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editBtnText: {
    fontSize: 13,
    color: COLORS.text,
  },
  budgetLimit: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 12,
  },
  progressContainer: {
    height: 12,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },
  actionsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});