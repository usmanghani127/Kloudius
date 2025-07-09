import { AppButton, ErrorState, InputField, LoadingState, ScreenWrapper } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/authContext.tsx';
import { regex } from '../regex.ts';
import { LoginInputFieldFormKeys } from '../types.ts';

export const Login = () => {
  const { t } = useTranslation();
  const { login, authError, clearAuthError } = useAuth();
  const { navigate } = useNavigation<StackScreenProps<RouteKeys.LOGIN>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<LoginInputFieldFormKeys>({
    mode: 'onSubmit',
    defaultValues: { email: 'test@example.com', password: 'Qwerty@123' },
  });

  const isLoading = false;

  const onSubmit = () => login(watch('email'), watch('password'));

  return (
    <>
      <ScreenWrapper screen={RouteKeys.LOGIN}>
        <InputField
          testID={`${RouteKeys.LOGIN}: emailInputField`}
          name={'email'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.email}
          requiredMessage={t('login.email.required')}
          errorMessage={t('login.email.invalid')}
          placeholder={t('login.email.placeholder')}
          onSubmitEditing={() => setFocus('password')}
          returnKeyType={'next'}
        />
        <InputField
          testID={`${RouteKeys.LOGIN}: passwordInputField`}
          name={'password'}
          control={control}
          errors={errors}
          required
          secureTextEntry
          requiredMessage={t('login.password.required')}
          placeholder={t('login.password.placeholder')}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType={'done'}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.LOGIN}: forgotPasswordButton`}
          onPress={() => navigate(RouteKeys.FORGOT_PASSWORD)}
          label={t('login.forgotPasswordLabel')}
        />
        <AppButton
          testID={`${RouteKeys.LOGIN}: loginButton`}
          onPress={handleSubmit(onSubmit)}
          label={t('login.loginButton')}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.LOGIN}: forgotPasswordButton`}
          onPress={() => navigate(RouteKeys.SIGNUP)}
          label={t('login.signupButton')}
        />
      </ScreenWrapper>
      <LoadingState visible={isLoading} testID={`${RouteKeys.LOGIN}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.LOGIN}: errorState`}
        visible={!!authError}
        title={t('login.error.title')}
        message={authError ?? ''}
        actionButtonText={t('login.error.button')}
        actionButtonOnPress={clearAuthError}
      />
    </>
  );
};
