import { useState } from 'react'
import axios from 'axios'
import styles from '../styles'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSignUpMutation } from '../features/auth/authApiSlice'


const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        fullname: '',
        username: '',
        password: ''
    })
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }


    const [signUp] = useSignUpMutation()
    const handleSubmit = async () => {
        try {
            const result = await signUp({ ...userInfo }).unwrap()
            navigate('/login')
        } catch (err) {
            if (!err?.status) {
                setErrMsg('No Server Response')
            } else if (err.status == 409) {
                setErrMsg('Username Already Exists')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Check credentials.')
            } else {
                setErrMsg('Login Failed')
            }
        }
    }

    return (
        <div className={`${styles.fullScreen}`}>
            <Navbar />
            <div className={`${styles.flexCenter} h-full bg-gradient-to-b from-[#5F50a9] to-[#2f1c7c]`}>

                <div className="w-[300px] h-fit bg-[#ededed] rounded-lg p-4 flex flex-col justify-center gap-4 drop-shadow-2xl">
                    {errMsg && <p className="errmsg">{errMsg}</p>}
                    <h1 className="text-[#5F50a9] font-bold text-[40px] mb-2">Sign Up:</h1>
                    <div className="w-full">
                        <label htmlFor="fullNameField" className="font-semibold text-[#5F50a9]">Full Name:</label>
                        <input
                            id="fullNameField"
                            name="fullname"
                            value={userInfo.fullname}
                            className="form-input"
                            placeholder='Full Name'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div className="w-full">
                        <label htmlFor="usernameField" className="font-semibold text-[#5F50a9]">Username:</label>
                        <input
                            id="usernameField"
                            name="username"
                            value={userInfo.username}
                            className="form-input"
                            placeholder='Username'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div className="w-full">
                        <label htmlFor="passwordField" className="font-semibold text-[#5F50a9]">Password:</label>
                        <input
                            id="passwordField"
                            name="password"
                            value={userInfo.password}
                            className="form-input"
                            placeholder='Password'
                            type="password"
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>

                    <button
                        className="form-button w-full"
                        onClick={handleSubmit}
                    >Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp