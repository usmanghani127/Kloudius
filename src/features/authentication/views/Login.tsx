import { AppButton, ErrorState, InputField, LoadingState } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import { regex } from '../regex.ts';
import { LoginInputFieldFormKeys } from '../types.ts';
import styles from './styles.ts';

export const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<StackScreenProps<RouteKeys.LOGIN>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<LoginInputFieldFormKeys>({
    mode: 'onSubmit',
    defaultValues: { email: 'rajausman127@gmail.com', password: 'Qwerty@123' },
  });
  const [secureTextInput, setSecureTextInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = false;

  const onSubmit = () => Alert.alert('Login', 'Authenticate User');

  return (
    <SafeAreaView style={styles.background} testID={`${RouteKeys.LOGIN}: background`}>
      <KeyboardAwareScrollView
        testID={`${RouteKeys.LOGIN}: wrapper`}
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
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
          required={true}
          requiredMessage={t('login.password.required')}
          placeholder={t('login.password.placeholder')}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType={'done'}
          secureTextEntry={secureTextInput}
          right={<TextInput.Icon icon={'eye'} onPress={() => setSecureTextInput(!secureTextInput)} />}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.LOGIN}: forgotPasswordButton`}
          onPress={() => Alert.alert('Hang On', 'Navigate to forgot password screen')}
          label={t('login.forgotPasswordLabel')}
        />
        <AppButton
          testID={`${RouteKeys.LOGIN}: loginButton`}
          onPress={handleSubmit(onSubmit)}
          // disabled={!isValid}
          label={t('login.loginButton')}
        />
        <AppButton
          type="secondary"
          testID={`${RouteKeys.LOGIN}: forgotPasswordButton`}
          onPress={() => navigate(RouteKeys.SIGNUP)}
          label={t('login.signupButton')}
        />
      </KeyboardAwareScrollView>
      <LoadingState visible={isLoading} testID={`${RouteKeys.LOGIN}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.LOGIN}: errorState`}
        visible={errorMessage?.length > 0}
        title={t('login.error.title')}
        message={errorMessage}
        actionButtonText={t('login.error.button')}
        actionButtonOnPress={() => setErrorMessage('')}
      />
    </SafeAreaView>
  );
};
