import { useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from '../../context/Modal'
import * as sessionActions from '../../store/session';
import Logo from '../Logo'
import './login.css'

export default function LoginFormModal() {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors)
                }
                if (data.message === 'Invalid Credentials') {
                    setErrors({ credentials: 'Invalid Credentials' })
                }
            }
        );
    };


    return (
        <div className="login-form-container">
            <form className='login-form' onSubmit={handleSubmit}>
                <Logo />
                <div className="login-form-input-container">
                    <div>
                        <input placeholder='Email or username' onChange={e => setCredential(e.target.value)} value={credential}></input>
                        {errors?.credential && <div className='error-div'>{errors.credential}</div>}
                    </div>
                    <div>
                        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}></input>
                        {errors?.password && <div className='error-div'>{errors.password}</div>}
                    </div>
                         {errors?.credentials && <div className='error-div' style={{textAlign:'center'}}>{errors.credentials}</div>}
                    <button type='submit'>Log In</button>
                </div>
            </form>
        </div>
    )
}
