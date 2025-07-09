import { AppButton, LoadingState, ScreenWrapper } from '@components';
import { RouteKeys } from '@navigation/types';
import { AppTheme } from '@theme';
import { InfoMessage } from 'common/components/ErrorState';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../authentication/contexts/authContext';
import { useUserProfile } from '../contexts/userProfileContext';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { logout, authError, clearAuthError, authLoading } = useAuth();
  const { user, getUser, userLoading, userError } = useUserProfile();

  const { email, firstName, lastName } = user || {};

  useEffect(
    () => {
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
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
        <AppButton testID={`${RouteKeys.HOME}: logoutButton`} onPress={logout} label={t('home.logout')} />
      </ScreenWrapper>
      <LoadingState visible={authLoading || userLoading} testID={`${RouteKeys.HOME}: loadingState`} />
      <InfoMessage
        type="error"
        testID={`${RouteKeys.SIGNUP}: errorState`}
        visible={!!authError || !!userError}
        title={t('signup.error.title')}
        message={authError || userError || ''}
        actionButtonText={t('signup.error.button')}
        actionButtonOnPress={clearAuthError}
      />
    </>
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
