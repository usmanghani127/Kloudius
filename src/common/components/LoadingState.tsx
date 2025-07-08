import { AppTheme } from '@theme';
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native-paper';

type LoadingStateType = {
  visible: boolean;
  testID: string;
};

export const LoadingState = (props: LoadingStateType) => {
  const { visible = false, testID } = props;

  return (
    <Modal testID={testID} visible={visible} dismissable={false}>
      <ActivityIndicator color={AppTheme.primary} size={'large'} />
    </Modal>
  );
};
