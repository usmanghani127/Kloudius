import { AppTheme } from '@theme';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

type AppButtonType = Omit<ButtonProps, 'children'> & {
  type?: 'primary' | 'secondary';
  label: string;
};

export const AppButton = (props: AppButtonType) => {
  const { label, style, type = 'primary', ...buttonProps } = props;
  return (
    <Button
      mode={type === 'primary' ? 'contained' : 'text'}
      style={[styles.button, type === 'primary' ? styles.primaryButton : {}, style]}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    width: '75%',
  },
  primaryButton: {
    borderRadius: 20,
  },
  label: {
    color: AppTheme.white,
  },
});
