import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import { selectCurrentUser } from '../features/auth/authSlice'
import { logOut } from '../features/auth/authSlice'

// The 'options' prop describes whether to show Home Logo, User Name and Logout/Login options.

const Navbar = ({ options }) => {
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()

    const logoutMethod = async () => {
        await logout()
        dispatch(logOut())
    }

    return (
        <div
            className={`absolute z-10 top-0 ${options 
            ?   "grid grid-cols-4 justify-between" 
            :   "flex flex-row justify-center"} 
            w-full h-14 bg-[#5F50a9] text-white items-center p-0 m-0 px-2 lg:px-8`}
        >
            {options &&
                <div className="flex w-fit lg:w-full items-center">
                    <Link
                        className="text-[20px] lg:text-[25px] p-2 hover:bg-gray-200 hover:bg-opacity-40 rounded-full"
                        to="/home"
                    >
                        <AiFillHome />
                    </Link>
                </div>
            }

            <div className="flex justify-center items-center col-span-2">
                <h1 className="font-semibold text-[1rem] md:text-[1.2rem] lg:text-[2rem]">
                    Library Management
                </h1>
            </div>

            {options && <div className="flex flex-row gap-1 items-center justify-end">
                {user ?
                    <div className="flex flex-row gap-2 items-center">
                        <p className="font-semibold hidden lg:block">
                            {user}
                        </p>
                        <button
                            className="w-fit h-fit py-1 px-2 lg:py-2 lg:px-4 font-semibold bg-[#ededed] text-[#5F50a9] rounded-lg"
                            onClick={logoutMethod}
                        >
                            Logout
                        </button>
                    </div>
                    :
                    <button
                        className="w-fit h-fit py-1 px-2 lg:py-2 lg:px-4 font-semibold bg-[#ededed] text-[#5F50a9] rounded-lg"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                }
            </div>}

        </div >
    )
}

export default Navbar