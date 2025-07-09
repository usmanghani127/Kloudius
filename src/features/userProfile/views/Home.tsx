import { AppButton, ScreenWrapper } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AppTheme } from '@theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { reset } = useNavigation<StackScreenProps<RouteKeys.HOME>>();

  const firstName = 'Raja';
  const lastName = 'Usman';
  const email = 'rajausman127official@gmail.com';

  return (
    <ScreenWrapper screen={RouteKeys.HOME}>
      <View style={styles.container}>
        <View style={styles.detail}>
          <Text style={styles.label}>{t('home.firstName')}:</Text>
          <Text style={styles.value}>{firstName}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>{t('home.lastName')}:</Text>
          <Text style={styles.value}>{lastName}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>{t('home.email')}:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
      <AppButton
        testID={`${RouteKeys.HOME}: logoutButton`}
        onPress={() => reset({ index: 0, routes: [{ name: RouteKeys.LOGIN }] })}
        label={t('home.logout')}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  detail: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: AppTheme.white,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    color: AppTheme.primary,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
});
