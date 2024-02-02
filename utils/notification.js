import { Store } from 'react-notifications-component';

export const notify = ({message, type, duration}) => Store.addNotification({
  message,
  type,
  insert: "bottom",
  container: "bottom-right",
  dismiss: {
    duration: duration || 5000,
    onScreen: false,
    pauseOnHover: true
  }
});