import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardsProvider } from './Context/CardsContext';

import HomeScreen from './Screens/HomeScreen';
import QuizScreen from './Screens/QuizScreen';
import ManageCardsScreen from './Screens/ManageCardsScreen';
import AddEditScreen from './Screens/AddEditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CardsProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="ManageCards" component={ManageCardsScreen} />
          <Stack.Screen name="AddEditCard" component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CardsProvider>
  );
}