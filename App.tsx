import { NavigationContainer } from '@react-navigation/native';
import { PaperTheme } from '@theme';
import { AuthProvider } from 'features/authentication/contexts/authContext';
import { UserProfileProvider } from 'features/userProfile/contexts/userProfileContext';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProfileProvider>
          <PaperProvider theme={PaperTheme}>
            <StackNavigator />
          </PaperProvider>
        </UserProfileProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
