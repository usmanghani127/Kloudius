import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigation/stack';
import { PaperTheme } from './src/theme/colors';

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
