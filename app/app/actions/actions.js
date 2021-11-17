import Toast from 'react-native-simple-toast';

export const showToast = (message, length = Toast.SHORT, gravity = Toast.TOP) => dispatch => {
    Toast.showWithGravity(message, length, gravity);
}