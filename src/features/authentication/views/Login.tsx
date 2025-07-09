import { AppButton, ErrorState, InputField, LoadingState, ScreenWrapper } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { regex } from '../regex.ts';
import { LoginInputFieldFormKeys } from '../types.ts';

export const Login = () => {
  const { t } = useTranslation();
  const { navigate, reset } = useNavigation<StackScreenProps<RouteKeys.LOGIN>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<LoginInputFieldFormKeys>({
    mode: 'onSubmit',
    defaultValues: { email: 'rajausman127@gmail.com', password: 'Qwerty@123' },
  });
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = false;

  const onSubmit = () => reset({ index: 0, routes: [{ name: RouteKeys.HOME }] });

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
        visible={errorMessage?.length > 0}
        title={t('login.error.title')}
        message={errorMessage}
        actionButtonText={t('login.error.button')}
        actionButtonOnPress={() => setErrorMessage('')}
      />
    </>
  );
};
