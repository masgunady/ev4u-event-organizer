import imgFemale from '../../assets/img/female.png'
import imgMale from '../../assets/img/male.png'
import logo from '../../assets/img/icon-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import http from '../../helpers/http'

const ForgotPassword = () => {
    // const Location = useLocation()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')

    const doForgot = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        try {
            const { value: email } = event.target.email
            const body = new URLSearchParams({ email }).toString()
            const { data } = await http().post('/auth/forgotPassword', body)

            setSuccessMessage(data.message)
            setTimeout(() => {
                setSuccessMessage('')
            }, 1000)
            setTimeout(() => {
                navigate('/auth/reset-password')
            }, 2000)
        } catch (error) {
            const message = error?.response?.data?.message
            setErrorMessage(message)
        }
    }
    return (
        <>
            <main>
                <div className='flex'>
                    <section className='basis-3/5 hidden lg:block'>
                        <div className='h-[100vh] flex items-center justify-center bg-[#4c3f91]'>
                            <div className='w-[549px] h-[478px] relative'>
                                <img className='absolute z-10' src={imgFemale} alt='' />
                                <img className='absolute right-[0px] top-[100px]' src={imgMale} alt='' />
                                <div className='absolute bottom-0 z-10 h-[230px] w-full bg-gradient-to-t from-[#4c3f91] from-35%'></div>
                            </div>
                        </div>
                    </section>
                    <section className='w-full lg:basis-2/5 mt-24 px-11 xl:px-24 2xl:px-36'>
                        <div className='w-full flex flex-col gap-3.5'>
                            <div className='flex justify-start items-center gap-3.5 mb-12'>
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
                            <div className='text-2xl font-semibold tracking-[1px] text-[#373A42]'>Forgot Password</div>
                            <div className='text-sm font-semibold tracking-[0.5px] text-[#373A42] mb-8'>You’ll get mail soon on your email</div>
                            <form onSubmit={doForgot} className='flex flex-col gap-3.5'>
                                {errorMessage && <div className='alert alert-error'>{errorMessage}</div>}
                                {successMessage && <div className='alert alert-success'>{successMessage}</div>}
                                <div className='text-sm tracking[0.5] text-secondary'>
                                    <input className='input input-bordered w-full h-14 px-3 border-2 rounded-xl' type='text' name='email' placeholder='Email' />
                                </div>
                                <div className='hidden items-center justify-start text-sm text-red-500 font-medium tracking[0.5]'></div>
                                <div className='hidden items-center justify-center text-sm text-red-500 font-medium tracking[0.5]'></div>
                                <div>
                                    <button type='submit' className='shadow-for-all-button w-full h-14 rounded-xl bg-[#4c3f91] text-base font-semibold tracking-[1px] text-white'>
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default ForgotPassword
