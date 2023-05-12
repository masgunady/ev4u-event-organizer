import imgFemale from '../../assets/img/female.png'
import imgMale from '../../assets/img/male.png'
import logo from '../../assets/img/icon-logo.svg'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <>
            <main>
                <div className='flex'>
                    <section className='basis-3/5 hidden lg:block'>
                        <div className='h-[100vh] flex items-center justify-center bg-[#4c3f91]'>
                            <div className='w-[549px] h-[478px] relative'>
                                <img
                                    className='absolute z-10'
                                    src={imgFemale}
                                    alt=''
                                />
                                <img
                                    className='absolute right-[0px] top-[100px]'
                                    src={imgMale}
                                    alt=''
                                />
                                <div className='absolute bottom-0 z-10 h-[230px] w-full bg-gradient-to-t from-[#4c3f91] from-35%'></div>
                            </div>
                        </div>
                    </section>
                    <section className='w-full lg:basis-2/5 mt-24 px-11 xl:px-24 2xl:px-36'>
                        <div className='w-full flex flex-col gap-3.5'>
                            <div className='flex justify-start items-center gap-3.5 mb-12'>
                                <div>
                                    <img src={logo} alt='' />
                                </div>
                                <div>
                                    <Link to='/'>
                                        <p className='text-2xl font-semibold text-[#3366FF] tracking-[1px]'>
                                            We
                                            <span className='text-[#FF3D71]'>
                                                tick
                                            </span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className='text-2xl font-semibold tracking-[1px] text-[#373A42]'>
                                Forgot Password
                            </div>
                            <div className='text-sm font-semibold tracking-[0.5px] text-[#373A42] mb-8'>
                                You’ll get mail soon on your email
                            </div>
                            <form className='flex flex-col gap-3.5'>
                                <div className='text-sm tracking[0.5]'>
                                    <input
                                        className='w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl'
                                        type='text'
                                        name='email'
                                        placeholder='Email'
                                    />
                                </div>
                                <div className='hidden items-center justify-start text-sm text-red-500 font-medium tracking[0.5]'></div>
                                <div className='hidden items-center justify-center text-sm text-red-500 font-medium tracking[0.5]'></div>
                                <div>
                                    <button
                                        type='submit'
                                        className='shadow-for-all-button w-full h-14 rounded-xl bg-[#4c3f91] text-base font-semibold tracking-[1px] text-white'
                                    >
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
