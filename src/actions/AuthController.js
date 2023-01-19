import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../firebase/index'

export const signinGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
}

export const signOutUser = () => {
    return signOut(auth);
}

export const getUser = () => {
    return onAuthStateChanged(auth);
}