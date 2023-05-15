import {
    FiUser,
    FiCreditCard,
    FiEdit3,
    FiUnlock,
    FiPlusCircle,
    FiList,
    FiHeart,
    FiSettings,
    FiLogOut,
} from 'react-icons/fi'

import {
    logout as logoutAction,
    setWarningMessage,
} from '../redux/reducers/auth'
import { Link, useNavigate } from 'react-router-dom'
import http from '../helpers/http'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profile, setProfile] = React.useState({})
    const token = useSelector((state) => state.auth.token)
    React.useEffect(() => {
        async function getProfileData() {
            const fallback = (message) => {
                dispatch(logoutAction())
                dispatch(setWarningMessage(message))
                navigate('/auth/login')
            }
            const { data } = await http(token, fallback).get('/profile')
            setProfile(data.results)
        }
        if (token) {
            getProfileData()
        }
    }, [token, dispatch, navigate])

    const doLogout = () => {
        dispatch(logoutAction())
        navigate('/auth/login')
    }
    return (
        <>
            <aside className='hidden md:block my-12 md:w-64 xl:w-80'>
                <div className='flex gap-3.5 mb-14'>
                    <div>
                        <div className='inline-block rounded-full p-[2px] bg-gradient-to-tr from-[#3366FF] to-[#884DFF]'>
                            {profile?.picture && (
                                <img
                                    className='w-12 h-12  border-4 border-white rounded-full'
                                    src={
                                        profile?.picture.startsWith('https')
                                            ? profile?.picture
                                            : `${
                                                  import.meta.env
                                                      .VITE_BACKEND_URL
                                              }/uploads/${profile?.picture}`
                                    }
                                    alt='nav-img-profile'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <div className='text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                            {profile?.fullName}
                        </div>
                        <div className='text-xs text-[#373a42] tracking-[0.5px]'>
                            {profile?.profession}
                        </div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li className='mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]'>
                            <a className='flex items-center gap-6' href='#'>
                                <i className=''>
                                    <FiUser size={22} />
                                </i>
                                Profile
                            </a>
                        </li>
                        <li>
                            <ul className='ml-7'>
                                <li className='mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]'>
                                    <a
                                        className='flex items-center gap-6'
                                        href='#'
                                    >
                                        <i className=''>
                                            <FiCreditCard size={22} />
                                        </i>
                                        Card
                                    </a>
                                </li>
                                <li className='mb-8 text-sm text-[#3366FF] font-semibold tracking-[1px]'>
                                    <Link
                                        to='/user/edit-profile'
                                        className='flex items-center gap-6'
                                    >
                                        <i className=''>
                                            <FiEdit3 size={22} />
                                        </i>
                                        Edit Profile
                                    </Link>
                                </li>
                                <li className='mb-8 text-sm font-semibold text-[#373a42] tracking-[1px]'>
                                    <Link
                                        to='/user/change-password'
                                        className='flex items-center gap-6'
                                    >
                                        <i className=''>
                                            <FiUnlock size={22} />
                                        </i>
                                        Change Password
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='mb-8 text-sm font-semibold tracking-[1px] text-[#373a42]'>
                            <Link
                                to='/user/manage-event'
                                className='flex items-center gap-6'
                            >
                                <i className=''>
                                    <FiPlusCircle size={22} />
                                </i>
                                Create Event
                            </Link>
                        </li>
                        <li className='mb-8 text-sm font-semibold tracking-[1px] text-[#373a42]'>
                            <Link
                                to='/user/reservation'
                                className='flex items-center gap-6'
                            >
                                <i className=''>
                                    <FiList size={22} />
                                </i>
                                My Booking
                            </Link>
                        </li>
                        <li className='mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]'>
                            <Link
                                to='/user/wishlist'
                                className='flex items-center gap-6'
                            >
                                <i className=''>
                                    <FiHeart size={22} />
                                </i>
                                My Wishlist
                            </Link>
                        </li>
                        <li className='mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]'>
                            <Link
                                to='/user/edit-profile'
                                className='flex items-center gap-6'
                                href='#'
                            >
                                <i className=''>
                                    <FiSettings size={22} />
                                </i>
                                Setting
                            </Link>
                        </li>
                        <li className='mb-8 text-sm text-[#F03800] font-semibold tracking-[1px]'>
                            <button
                                onClick={doLogout}
                                className='flex items-center gap-6'
                            >
                                <i className=''>
                                    <FiLogOut size={22} />
                                </i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default UserSidebar
