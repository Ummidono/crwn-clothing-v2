import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4kG1F99EsdCJwPm6PYjaLDKAC_EUzHpM",
    authDomain: "crwn-clothing-db-508a0.firebaseapp.com",
    projectId: "crwn-clothing-db-508a0",
    storageBucket: "crwn-clothing-db-508a0.appspot.com",
    messagingSenderId: "1065687284474",
    appId: "1:1065687284474:web:ce7f07f061957489d46743"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();


export const createUserDocFromAuth = async (userAuth, addInfo = {}) =>{
    if (!userAuth) return;
    const userDocRef = doc(db,'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists())
    {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName, email, createdAt,...addInfo});
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>
{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>
{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}