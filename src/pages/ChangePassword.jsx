import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'
import React from 'react'
import http from '../helpers/http'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useSelector } from 'react-redux'
const ChangePassword = () => {
    const token = useSelector((state) => state.auth.token)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')
    const [iconEye, setIconEye] = React.useState(false)
    const [typeOldPassword, setTypeOldPassword] = React.useState(false)
    const [iconEyeNp, setIconEyeNp] = React.useState(false)
    const [typeNewPassword, setTypeNewPassword] = React.useState(false)
    const [iconEyeCp, setIconEyeCp] = React.useState(false)
    const [typeConfirmPassword, setTypeConfirmPassword] = React.useState(false)

    const handleInputOldPassword = () => {
        setIconEye(!typeOldPassword)
        setTypeOldPassword(!iconEye)
    }

    const handleInputNewPassword = () => {
        setIconEyeNp(!typeNewPassword)
        setTypeNewPassword(!iconEyeNp)
    }
    const handleInputConfirmPassword = () => {
        setIconEyeCp(!typeConfirmPassword)
        setTypeConfirmPassword(!iconEyeCp)
    }

    const doChangePass = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        try {
            const { value: oldPassword } = event.target.oldPassword
            const { value: newPassword } = event.target.newPassword
            const { value: confirmPassword } = event.target.confirmPassword
            const body = new URLSearchParams({ oldPassword, newPassword, confirmPassword }).toString()
            console.log(body)
            const { data } = await http(token).post('/change-password', body)

            setSuccessMessage(data.message)
            if (data.message) {
                setIconEye(!typeOldPassword)
                setTypeOldPassword(!iconEye)
                setIconEyeNp(!typeNewPassword)
                setTypeNewPassword(!iconEyeNp)
                setIconEyeCp(!typeConfirmPassword)
                setTypeConfirmPassword(!iconEyeCp)
                setTimeout(() => {
                    setSuccessMessage('')
                }, 2000)
            }
        } catch (error) {
            const message = error?.response?.data?.message
            setErrorMessage(message)
        }
    }
    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <main className='bg-[#F4F7FF] md:px-9 lg:px-16 xl:px-24 2xl:px-52 flex md:gap-3'>
                    <UserSidebar />
                    <div className='md:my-12 flex-1'>
                        <div className='bg-white px-9 lg:px-12 py-9 lg:py-11 rounded-2xl md:min-h-[650px]'>
                            <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>Change Password</div>
                            <div className='mt-14'>
                                <form onSubmit={doChangePass} className='flex flex-col gap-8'>
                                    {errorMessage && <div className='alert alert-error'>{errorMessage}</div>}
                                    {successMessage && <div className='alert alert-success'>{successMessage}</div>}

                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label className='w-48'>Old Password</label>
                                        <div className='w-full form-control text-sm tracking[0.5] relative'>
                                            <input
                                                className={'input input-bordered w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary'}
                                                type={typeOldPassword ? 'text' : 'password'}
                                                name='oldPassword'
                                                placeholder='Old Password'
                                            />

                                            <button type='button' onClick={handleInputOldPassword} className='absolute top-[18px] right-4 text-[#4c3f91]'>
                                                {iconEye ? (
                                                    <i className=''>
                                                        <FiEyeOff size={20} />
                                                    </i>
                                                ) : (
                                                    <i className=''>
                                                        <FiEye size={20} />
                                                    </i>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label className='w-48'>New Password</label>
                                        <div className='w-full form-control text-sm tracking[0.5] relative'>
                                            <input
                                                className={'input input-bordered w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary'}
                                                type={typeNewPassword ? 'text' : 'password'}
                                                name='newPassword'
                                                placeholder='Old Password'
                                            />

                                            <button type='button' onClick={handleInputNewPassword} className='absolute top-[18px] right-4 text-[#4c3f91]'>
                                                {iconEyeNp ? (
                                                    <i className=''>
                                                        <FiEyeOff size={20} />
                                                    </i>
                                                ) : (
                                                    <i className=''>
                                                        <FiEye size={20} />
                                                    </i>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label className='w-48'>Confirm Password</label>
                                        <div className='w-full form-control text-sm tracking[0.5] relative'>
                                            <input
                                                className={'input input-bordered w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl text-secondary'}
                                                type={typeConfirmPassword ? 'text' : 'password'}
                                                name='confirmPassword'
                                                placeholder='Confirm Password'
                                            />

                                            <button type='button' onClick={handleInputConfirmPassword} className='absolute top-[18px] right-4 text-[#4c3f91]'>
                                                {iconEyeCp ? (
                                                    <i className=''>
                                                        <FiEyeOff size={20} />
                                                    </i>
                                                ) : (
                                                    <i className=''>
                                                        <FiEye size={20} />
                                                    </i>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center mt-3'>
                                        <button type='submit' className='shadow-for-all-button w-[100%] h-14 rounded-2xl bg-[#4c3f91] text-white text-base font-semibold tracking-[1px]'>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className='md:bg-[#F4F7FF] w-[100%] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-80'>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default ChangePassword
