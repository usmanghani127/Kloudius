import { NavigationContainer } from '@react-navigation/native';
import { PaperTheme } from '@theme';
import { AuthProvider } from 'features/authentication/contexts/authContext';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider theme={PaperTheme}>
          <StackNavigator />
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
