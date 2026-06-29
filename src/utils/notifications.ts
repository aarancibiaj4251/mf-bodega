import {notification} from 'antd';

export const showErrorNotification = (status: number): void => {
  if (status === 403) {
    notification.error({
      message: 'Error',
      description:
        'You account does not have authorization for this action. Please contact the administrator',
      placement: 'top',
    });
  }
}
