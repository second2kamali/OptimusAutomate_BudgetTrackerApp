import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BudgetProvider } from './Context/BudgetContext';

import HomeScreen from './Screens/HomeScreen';
import DashboardScreen from './Screens/DashboardScreen';
import TransactionListScreen from './Screens/TransactionListScreen';
import AddTransactionScreen from './Screens/AddTransactionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <BudgetProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TransactionList" component={TransactionListScreen} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}