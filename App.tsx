import { NavigationContainer } from '@react-navigation/native';
import { PaperTheme } from '@theme';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={PaperTheme}>
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
