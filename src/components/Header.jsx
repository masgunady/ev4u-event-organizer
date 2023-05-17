import logo from '../assets/img/icon-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiPlusSquare, FiList, FiHeart, FiUnlock, FiSettings, FiLogOut, FiAlignJustify } from 'react-icons/fi'

import http from '../helpers/http'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction, setWarningMessage } from '../redux/reducers/auth'
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profile, setProfile] = React.useState({})
    const [menuMobile, setMenuMobile] = React.useState(false)

    const token = useSelector((state) => state.auth.token)
    React.useEffect(() => {
        async function getProfileData() {
            const fallback = (message) => {
                dispatch(logoutAction())
                dispatch(setWarningMessage(message))
                navigate('/auth/login')
            }
            const { data } = await http(token, fallback).get('/profile')
            // console.log(data.results.picture)
            setProfile(data.results)
        }
        if (token) {
            getProfileData()
        }
    }, [token, dispatch, navigate])

    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile)
    }

    const doLogout = () => {
        dispatch(logoutAction())
        navigate('/auth/login')
    }
    return (
        <>
            <nav className='flex justify-between items-center w-[100%] h-24 px-9 lg:px-14 bg-white'>
                <div className='flex justify-start items-center gap-2 lg:gap-3.5'>
                    <div>
                        <img src={logo} alt='' />
                    </div>
                    <div>
                        <Link to='/'>
                            <p className='text-2xl font-semibold text-[#3366FF] tracking-[1px]'>
                                We<span className='text-[#FF3D71]'>tick</span>
                            </p>
                        </Link>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <ul className='flex gap-5 lg:gap-12 text-sm text-[#373a42] font-semibold tracking-[1px]'>
                        <li className='cursor-pointer hover:border-b-2 border-[#4c3f91]'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='cursor-pointer hover:border-b-2 border-[#4c3f91]'>
                            <Link to='/user/manage-event'>Create Event</Link>
                        </li>
                        <li className='cursor-pointer hover:border-b-2 border-[#4c3f91]'>
                            <Link to='/'>Location</Link>
                        </li>
                    </ul>
                </div>

                {token ? (
                    <>
                        <div className='hidden md:block'>
                            <div className='flex justify-start items-center gap-[10px] lg:gap-[15px]'>
                                <div className='inline-block rounded-full p-[2px] bg-gradient-to-tr from-[#3366FF] to-[#884DFF]'>
                                    {profile?.picture && (
                                        <img
                                            className='w-12 h-12 border-4 border-white rounded-full'
                                            src={profile?.picture.startsWith('https') ? profile?.picture : `${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`}
                                            alt={profile?.fullName}
                                        />
                                    )}
                                </div>
                                <div className='text-sm text-[#373a42] font-semibold tracking-[1px] object-cover capitalize'>
                                    <Link to='/user/edit-profile'>{profile?.fullName}</Link>
                                </div>
                                <div>
                                    <button onClick={doLogout} className='btn btn-primary text-white capitalize'>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='hidden md:block basis-1/4'>
                            <div className='flex justify-end items-center gap-[1px] lg:gap-[15px]'>
                                <div className='md:w-[90px] lg:w-[169px] h-[40px] flex items-center justify-center text-sm text-[#373a42] font-semibold cursor-pointer'>
                                    <Link to='/auth/login'>Sign In</Link>
                                </div>
                                <div className='shadow-for-all-button md:w-[90px] lg:w-[169px] h-[40px] flex items-center justify-center text-sm text-[#fff] font-semibold cursor-pointer bg-[#4c3f91] rounded-lg'>
                                    <Link to='/auth/register'>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className='block md:hidden'>
                    <div>
                        <button onClick={handleMenuMobile} id='btnShowNavMobile'>
                            <i className=''>
                                <FiAlignJustify size={25} />
                            </i>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`${menuMobile ? 'flex' : 'md: hidden'}  justify-between items-center w-full px-7 md:px-9 lg:px-14 relative`}>
                <div className='absolute flex flex-col items-center gap-7 z-40 bg-white w-full overflow-scroll left-0 top-0 py-7 rounded-b-2xl shadow-xl'>
                    <div className='w-[85%] border-b-2 py-3'>
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='rounded-full object-cover overflow-hidden'>
                                <img src='https://i.pravatar.cc/90' alt='' />
                            </div>
                            <div className='text-base text-[#373a42] font-semibold tracking-[1px]'>
                                <Link to='./edit-profile.html'>John Tompson</Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-7'>
                        <div className='flex justify-start items-center gap-[1px]'>
                            <ul className='flex flex-col justify-center items-start gap-7 w-full text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiHome />
                                    </i>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiPlusSquare />
                                    </i>
                                    <Link to='/user/manage-event'>Create Event</Link>
                                </li>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiList />
                                    </i>
                                    <Link to='/user/reservation'>my booking</Link>
                                </li>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiHeart />
                                    </i>
                                    <Link to='/user/wishlist'>my wishlist</Link>
                                </li>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiUnlock />
                                    </i>
                                    <Link to='/user/change-password'>Change Password</Link>
                                </li>
                                <li className='flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiSettings />
                                    </i>
                                    <Link to='#'>setting</Link>
                                </li>
                                <li className='self-center text-[#F03800] my-7 flex items-center justify-start gap-3.5'>
                                    <i className=''>
                                        <FiLogOut />
                                    </i>
                                    <Link to='./auth-login.html'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
