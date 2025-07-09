import { AppButton, ErrorState, InputField, LoadingState, ScreenWrapper } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/authContext.tsx';
import { regex } from '../regex.ts';
import { SignupInputFieldFormKeys } from '../types.ts';

export const Signup = () => {
  const { t } = useTranslation();
  const { logout, authError, clearAuthError } = useAuth();
  const { goBack } = useNavigation<StackScreenProps<RouteKeys.SIGNUP>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<SignupInputFieldFormKeys>({
    mode: 'onSubmit',
  });

  const isLoading = false;

  const onSubmit = logout;

  return (
    <>
      <ScreenWrapper screen={RouteKeys.SIGNUP}>
        <InputField
          testID={`${RouteKeys.SIGNUP}: firstNameInputField`}
          name={'firstName'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.firstName}
          requiredMessage={t('signup.firstName.required')}
          errorMessage={t('signup.firstName.invalid')}
          placeholder={t('signup.firstName.placeholder')}
          onSubmitEditing={() => setFocus('lastName')}
          returnKeyType={'next'}
        />
        <InputField
          testID={`${RouteKeys.SIGNUP}: lastNameInputField`}
          name={'lastName'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.lastName}
          requiredMessage={t('signup.lastName.required')}
          errorMessage={t('signup.lastName.invalid')}
          placeholder={t('signup.lastName.placeholder')}
          onSubmitEditing={() => setFocus('email')}
          returnKeyType={'next'}
        />
        <InputField
          testID={`${RouteKeys.SIGNUP}: emailInputField`}
          name={'email'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.email}
          requiredMessage={t('signup.email.required')}
          errorMessage={t('signup.email.invalid')}
          placeholder={t('signup.email.placeholder')}
          onSubmitEditing={() => setFocus('password')}
          returnKeyType={'next'}
        />
        <InputField
          testID={`${RouteKeys.SIGNUP}: passwordInputField`}
          name={'password'}
          control={control}
          errors={errors}
          required
          secureTextEntry
          pattern={regex.password}
          requiredMessage={t('signup.password.required')}
          placeholder={t('signup.password.placeholder')}
          errorMessage={t('signup.password.invalid')}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType={'done'}
        />
        <AppButton
          testID={`${RouteKeys.SIGNUP}: signupButton`}
          onPress={handleSubmit(onSubmit)}
          label={t('signup.signupButton')}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.SIGNUP}: backToLoginButton`}
          onPress={goBack}
          label={t('signup.backToLoginButton')}
        />
      </ScreenWrapper>
      <LoadingState visible={isLoading} testID={`${RouteKeys.SIGNUP}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.SIGNUP}: errorState`}
        visible={!!authError}
        title={t('signup.error.title')}
        message={authError ?? ''}
        actionButtonText={t('signup.error.button')}
        actionButtonOnPress={clearAuthError}
      />
    </>
  );
};
