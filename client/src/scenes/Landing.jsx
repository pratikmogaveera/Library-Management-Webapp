import React from 'react'
import styles from '../styles'
import Navbar from '../components/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className={`${styles.fullScreen}`}>
            <Navbar options={false} />
            <div className={`${styles.flexCenter} h-full bg-gradient-to-b from-[#5F50a9] to-[#2f1c7c]`}>
                <div className="flex flex-col gap-8">
                    <h1 className="text-[#ededed] text-[4rem] leading-10 font-bold">
                        Welcome
                    </h1>
                    <div className="flex flex-row gap-4 w-full justify-center">
                        <button className="text-[#5F50a9] text-[1.2rem] font-semibold w-fit h-fit px-4 py-2 rounded-lg bg-[#ededed]" onClick={() => navigate('/login')}>Login</button>
                        <button className="text-[#5F50a9] text-[1.2rem] font-semibold w-fit h-fit px-4 py-2 rounded-lg bg-[#ededed]" onClick={() => navigate('/sign-up')}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing