import { AppButton, ErrorState, InputField, LoadingState } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { regex } from '../regex.ts';
import { SignupInputFieldFormKeys } from '../types.ts';
import styles from './styles.ts';

export const Signup = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation<StackScreenProps<RouteKeys.SIGNUP>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<SignupInputFieldFormKeys>({
    mode: 'onSubmit',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = false;

  const onSubmit = () => Alert.alert('Login', 'Register User');

  return (
    <SafeAreaView style={styles.background} testID={`${RouteKeys.SIGNUP}: background`}>
      <KeyboardAwareScrollView
        testID={`${RouteKeys.SIGNUP}: wrapper`}
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
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
      </KeyboardAwareScrollView>
      <LoadingState visible={isLoading} testID={`${RouteKeys.SIGNUP}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.SIGNUP}: errorState`}
        visible={errorMessage?.length > 0}
        title={t('signup.error.title')}
        message={errorMessage}
        actionButtonText={t('signup.error.button')}
        actionButtonOnPress={() => setErrorMessage('')}
      />
    </SafeAreaView>
  );
};
