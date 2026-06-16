import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar
} from 'react-native';
import { COLORS } from '../Constants/colors';
import { useBudget } from '../Context/BudgetContext';

export default function HomeScreen({ navigation }) {
  const { balance, totalIncome, totalExpense } = useBudget();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Budget Tracker</Text>
        <Text style={styles.headerSubtitle}>Track Your Money Smartly</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>Rs. {balance.toLocaleString()}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>📈 Income</Text>
            <Text style={[styles.statAmount, { color: COLORS.income }]}>
              Rs. {totalIncome.toLocaleString()}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>📉 Expense</Text>
            <Text style={[styles.statAmount, { color: COLORS.expense }]}>
              Rs. {totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.primaryBtnText}>📊 View Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('TransactionList')}
        >
          <Text style={styles.secondaryBtnText}>📋 All Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.addBtnText}>+ Add Transaction</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Optimus Automate Internship</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 8,
    opacity: 0.9,
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: 30,
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.lightGrey,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.grey,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginTop: 30,
    gap: 14,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 2,
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: COLORS.secondary,
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
  footer: {
    textAlign: 'center',
    color: COLORS.grey,
    marginTop: 'auto',
    paddingBottom: 20,
    fontSize: 13,
  },
});