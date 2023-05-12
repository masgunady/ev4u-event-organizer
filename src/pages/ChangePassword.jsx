import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'
const ChangePassword = () => {
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
                            <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>
                                Change Password
                            </div>
                            <div className='mt-14'>
                                <form
                                    className='flex flex-col gap-8'
                                    action=''
                                    method='post'
                                >
                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label
                                            className='w-40'
                                            htmlFor='old-password'
                                        >
                                            Old Password
                                        </label>
                                        <input
                                            className='flex-1 w-full h-14 bg-white outline-[#C1C5D0] border rounded-2xl px-7'
                                            type='password'
                                            name='old-password'
                                            id='old-password'
                                            placeholder='Input Old Password ...'
                                        />
                                    </div>
                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label
                                            className='w-40'
                                            htmlFor='new-password'
                                        >
                                            New Password
                                        </label>
                                        <input
                                            className='flex-1 w-full h-14 bg-white outline-[#C1C5D0] border rounded-2xl px-7'
                                            type='password'
                                            name='new-password'
                                            id='new-password'
                                            placeholder='Input New Password ...'
                                        />
                                    </div>
                                    <div className='flex flex-col items-start md:flex-row md:items-center h-24 md:h-auto gap-4 text-sm text-[#373A42] tracking-[1px]'>
                                        <label
                                            className='w-40'
                                            htmlFor='confirm-password'
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            className='flex-1 w-full h-14 bg-white outline-[#C1C5D0] border rounded-2xl px-7'
                                            type='password'
                                            name='confirm-password'
                                            id='confirm-password'
                                            placeholder='Input Confirm Password ...'
                                        />
                                    </div>
                                    <div className='flex items-center justify-center mt-3'>
                                        <button
                                            className='shadow-for-all-button w-[100%] h-14 rounded-2xl bg-[#4c3f91] text-white text-base font-semibold tracking-[1px]'
                                            type='submit'
                                        >
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
