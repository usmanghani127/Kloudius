import { AppButton, ErrorState, InputField, LoadingState, ScreenWrapper } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { regex } from '../regex.ts';
import { ForgotPasswordInputFieldFormKeys } from '../types';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation<StackScreenProps<RouteKeys.FORGOT_PASSWORD>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordInputFieldFormKeys>({
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = false;

  const onSubmit = () => {
    Alert.alert('Forgot Password', 'Password reset link sent!');
    goBack();
  };

  return (
    <>
      <ScreenWrapper screen={RouteKeys.FORGOT_PASSWORD}>
        <InputField
          testID={`${RouteKeys.FORGOT_PASSWORD}: emailInputField`}
          name={'email'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.email}
          requiredMessage={t('forgotPassword.email.required')}
          errorMessage={t('forgotPassword.email.invalid')}
          placeholder={t('forgotPassword.email.placeholder')}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType={'done'}
        />
        <AppButton
          testID={`${RouteKeys.FORGOT_PASSWORD}: submitButton`}
          onPress={handleSubmit(onSubmit)}
          label={t('forgotPassword.submitButton')}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.FORGOT_PASSWORD}: backToLoginButton`}
          onPress={goBack}
          label={t('forgotPassword.backToLoginButton')}
        />
      </ScreenWrapper>
      <LoadingState visible={isLoading} testID={`${RouteKeys.FORGOT_PASSWORD}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.FORGOT_PASSWORD}: errorState`}
        visible={errorMessage?.length > 0}
        title={t('forgotPassword.error.title')}
        message={errorMessage}
        actionButtonText={t('forgotPassword.error.button')}
        actionButtonOnPress={() => setErrorMessage('')}
      />
    </>
  );
};
