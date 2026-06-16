import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBudget } from '../Context/BudgetContext';

// --- NEW DARK THEME (Simple & High Contrast) ---
const THEME = {
  primary: '#6366F1',      // Indigo
  primaryLight: '#818CF8',
  background: '#0F172A',   // Slate 900
  surface: '#1E293B',      // Slate 800
  surfaceLight: '#334155', // Slate 700
  border: '#334155',
  white: '#F8FAFC',
  black: '#F1F5F9',
  grey: '#94A3B8',
  muted: '#64748B',
  income: '#34D399',       // Emerald
  expense: '#F87171',      // Red
  accent: '#FBBF24',       // Amber
};

export default function HomeScreen({ navigation }) {
  const { balance, totalIncome, totalExpense } = useBudget();

  const isPositive = balance >= 0;

  const quickActions = [
    {
      icon: 'add',
      title: 'Add',
      subtitle: 'Transaction',
      screen: 'AddTransaction',
      primary: true,
    },
    {
      icon: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Analytics',
      screen: 'Dashboard',
      primary: false,
    },
    {
      icon: 'receipt-long',
      title: 'History',
      subtitle: 'Records',
      screen: 'TransactionList',
      primary: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.background} barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <MaterialIcons name="account-balance-wallet" size={24} color={THEME.white} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Budget Tracker</Text>
              <Text style={styles.headerSubtitle}>Track your money smartly</Text>
            </View>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={[
              styles.trendBadge,
              { backgroundColor: isPositive ? THEME.income + '20' : THEME.expense + '20' }
            ]}>
              <MaterialIcons
                name={isPositive ? 'trending-up' : 'trending-down'}
                size={18}
                color={isPositive ? THEME.income : THEME.expense}
              />
            </View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
          </View>

          <Text style={[
            styles.balanceAmount,
            { color: isPositive ? THEME.income : THEME.expense }
          ]}>
            Rs. {balance.toLocaleString()}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBg, { backgroundColor: THEME.income + '18' }]}>
                <MaterialIcons name="arrow-downward" size={16} color={THEME.income} />
              </View>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statAmount, { color: THEME.income }]}>
                Rs. {totalIncome.toLocaleString()}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBg, { backgroundColor: THEME.expense + '18' }]}>
                <MaterialIcons name="arrow-upward" size={16} color={THEME.expense} />
              </View>
              <Text style={styles.statLabel}>Expense</Text>
              <Text style={[styles.statAmount, { color: THEME.expense }]}>
                Rs. {totalExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionCard,
                action.primary ? styles.actionCardPrimary : styles.actionCardSecondary,
              ]}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.actionIconWrap,
                action.primary
                  ? { backgroundColor: 'rgba(255,255,255,0.2)' }
                  : { backgroundColor: THEME.primary + '15' },
              ]}>
                <MaterialIcons
                  name={action.icon}
                  size={action.primary ? 26 : 22}
                  color={action.primary ? '#fff' : THEME.primaryLight}
                />
              </View>
              <Text style={[
                styles.actionCardTitle,
                action.primary ? { color: '#fff' } : { color: THEME.white },
              ]}>
                {action.title}
              </Text>
              <Text style={styles.actionCardSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity Placeholder */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconBg, { backgroundColor: THEME.surfaceLight }]}>
            <MaterialIcons name="receipt" size={32} color={THEME.muted} />
          </View>
          <Text style={styles.emptyStateText}>No recent transactions</Text>
          <Text style={styles.emptyStateSubtext}>Tap "Add" to create your first one</Text>
        </View>

        {/* Footer */}
        <View style={styles.footerWrap}>
          <MaterialIcons name="auto-awesome" size={14} color={THEME.muted} />
          <Text style={styles.footer}>Optimus Automate Internship</Text>
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
  scrollContent: {
    paddingBottom: 32,
  },

  // --- Header ---
  header: {
    backgroundColor: THEME.background,
    paddingTop: 24,
    paddingBottom: 56,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: THEME.white,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    color: THEME.grey,
    fontSize: 13,
    fontWeight: '400',
    marginTop: 3,
  },

  // --- Balance Card ---
  balanceCard: {
    backgroundColor: THEME.surface,
    marginHorizontal: 16,
    marginTop: -36,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  trendBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 13,
    color: THEME.grey,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    width: 1,
    backgroundColor: THEME.border,
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.grey,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // --- Section Title ---
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: THEME.white,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // --- Actions Grid ---
  actionsGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    padding: 18,
    minHeight: 130,
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionCardPrimary: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
    flex: 1.3,
  },
  actionCardSecondary: {
    backgroundColor: THEME.surface,
    borderColor: THEME.border,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: THEME.grey,
    fontWeight: '400',
    lineHeight: 16,
  },

  // --- Empty State ---
  emptyState: {
    backgroundColor: THEME.surface,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
    borderStyle: 'dashed',
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.grey,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: THEME.muted,
    marginTop: 6,
    fontWeight: '400',
  },

  // --- Footer ---
  footerWrap: {
    marginTop: 36,
    alignItems: 'center',
    gap: 6,
  },
  footer: {
    color: THEME.muted,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});