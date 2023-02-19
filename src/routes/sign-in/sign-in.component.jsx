import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

//for Redirect
//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
//import { auth, signInWithGoogleRedirect} from "../../utils/firebase/firebase.utils";

const SignIn = () =>{

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if(response)
    //     {
    //         const userDocRef = await createUserDocFromAuth(response.user);
    //     }
    // },[] );
    const logGoogleUser = async () =>
    {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick = {logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm/>

            {/* <button onClick = {signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </div>
    );
};
export default SignIn;