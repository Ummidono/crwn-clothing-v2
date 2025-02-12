import { useState } from "react";
import { signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () =>
    {
        await signInWithGooglePopup();
    }

    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => 
    {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }
        catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':alert('incorrect password for email'); break;
                case 'auth/user-not-found':alert('no user found with that email'); break;
                default: console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields,[name]: value});
    };

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Email'} type='email' required onChange={handleChange} name='email' value={email}></FormInput>
                <FormInput label={'Password'} type='password' required onChange={handleChange} name='password' value={password}></FormInput>
                <div className='buttons-container'>
                    <Button buttonType='' type='submit'>Sign in</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
    
};

export default SignInForm;