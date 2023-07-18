import logo from '../assets/img/icon-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiPlusSquare, FiList, FiHeart, FiUnlock, FiSettings, FiLogOut, FiAlignJustify } from 'react-icons/fi'
import http from '../helpers/http'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction, setWarningMessage } from '../redux/reducers/auth'
import Image from '../components/Image'
import defaultImage from '../assets/img/default.png'
import { setDataProfile } from '../redux/reducers/profile'
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuMobile, setMenuMobile] = React.useState(false)
    const token = useSelector((state) => state.auth.token)
    const profile = useSelector((state) => state.profile.dataProfile)

    React.useEffect(() => {
        async function getProfileData() {
            const fallback = (message) => {
                dispatch(logoutAction())
                dispatch(setWarningMessage(message))
                navigate('/auth/login')
            }
            const { data } = await http(token, fallback).get('/profile')
            dispatch(setDataProfile(data.results))
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
                        <img src={logo} className='w-16' alt='' />
                    </div>
                    <div>
                        <Link to='/'>
                            <p className='text-2xl font-semibold text-[#3366FF] tracking-[1px]'>
                                EV
                                <span className='text-[#FF3D71]'>4U</span>
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
                                    {<Image className='w-12 h-12 border-4 border-white rounded-full' src={profile?.picture || null} defaultImg={defaultImage} />}
                                </div>

                                <div className='dropdown dropdown-end drop-shadow-xl '>
                                    <label tabIndex={0} className='cursor-pointer text-sm h-full text-[#373a42] font-semibold tracking-[1px] object-cover capitalize'>
                                        {profile?.fullName}
                                    </label>
                                    <ul tabIndex={0} className='dropdown-content menu p-4 mt-5 shadow bg-base-100 rounded-box w-52'>
                                        <li>
                                            <i>
                                                <FiHome className='text-secondary' />
                                                <Link className='capitalize text-secondary not-italic w-full' to='/user/edit-profile'>
                                                    My Profile
                                                </Link>
                                            </i>
                                        </li>
                                        <li>
                                            <i>
                                                <FiLogOut className='text-red-500' />
                                                <button onClick={doLogout} className=' bg-transparent w-full text-left text-red-500 capitalize'>
                                                    Logout
                                                </button>
                                            </i>
                                        </li>
                                    </ul>
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
                        {token ? (
                            <div className='flex flex-col justify-center items-center gap-3'>
                                <div className='rounded-full w-[90px] h-[90px] object-cover overflow-hidden'>
                                    {profile?.picture && <img src={profile?.picture.startsWith('https') ? profile?.picture : `${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`} alt={profile?.fullName} />}
                                </div>
                                <div className='text-base text-[#373a42] font-semibold tracking-[1px]'>
                                    <Link to='/user/edit-profile'>{profile?.fullName}</Link>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <Link to='/auth/login' className='btn btn-primary w-full max-w-[280px] text-base text-white capitalize font-semibold tracking-[1px]'>
                                    sign in
                                </Link>
                                <Link to='/auth/register' className='btn btn-primary w-full  max-w-[280px] text-base text-white capitalize font-semibold tracking-[1px]'>
                                    sign up
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='w-full px-7'>
                        <div className='flex justify-start items-center gap-[1px]'>
                            <ul className='flex flex-col justify-center items-start gap-7 w-full text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                                {token ? (
                                    <>
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
                                            <button onClick={doLogout}>Logout</button>
                                        </li>
                                    </>
                                ) : (
                                    <li className='self-center text-secondary my-7 flex items-center justify-start gap-3.5'>
                                        <i className=''>
                                            <FiHome size={20} />
                                        </i>
                                        <Link to='/'>
                                            <button onClick={handleMenuMobile}>Home</button>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
