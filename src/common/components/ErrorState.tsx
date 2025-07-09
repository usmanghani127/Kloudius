import { AppButton } from '@components';
import { AppTheme } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Text } from 'react-native-paper';

type InfoMessageType = {
  visible: boolean;
  title: string;
  message: string;
  actionButtonOnPress: () => void;
  actionButtonText: string;
  testID: string;
  type: 'error' | 'success';
};

export const InfoMessage = (props: InfoMessageType) => {
  const { testID, visible = false, type, title, message, actionButtonText, actionButtonOnPress = () => {} } = props;

  return (
    <Modal testID={testID} visible={visible} dismissable={false} style={styles.modal}>
      <View style={styles.background}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <AppButton
          onPress={actionButtonOnPress}
          style={styles.button}
          buttonColor={type === 'error' ? AppTheme.red : AppTheme.primary}
          label={actionButtonText}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  button: {
    width: '100%',
  },
  background: {
    backgroundColor: AppTheme.white,
    marginBottom: -50,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: AppTheme.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  message: {
    color: AppTheme.grey,
    marginTop: 20,
  },
});
