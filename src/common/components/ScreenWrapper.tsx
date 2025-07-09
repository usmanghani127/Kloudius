import { RouteKeys } from '@navigation/types';
import { AppTheme } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

interface ScreenWrapperProps {
  children: React.ReactNode;
  screen: RouteKeys;
  safeAreaProps?: ViewProps;
  keyboardAwareScrollViewProps?: KeyboardAwareScrollViewProps;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  safeAreaProps,
  screen,
  keyboardAwareScrollViewProps,
}) => (
  <SafeAreaView style={styles.background} testID={`${screen}: SafeAreaView`} {...safeAreaProps}>
    <KeyboardAwareScrollView
      testID={`${screen}: KAScrollView`}
      contentContainerStyle={styles.wrapper}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...keyboardAwareScrollViewProps}
    >
      {children}
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: AppTheme.white,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
