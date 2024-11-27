import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

export default logout;
