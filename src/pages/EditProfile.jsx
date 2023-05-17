import Footer from '../components/Footer'
import Header from '../components/Header'
import UserSidebar from '../components/UserSidebar'
import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import { Link } from 'react-router-dom'

const Reservation = () => {
    const token = useSelector((state) => state.auth.token)

    // const [userProfile, setUserProfile] = React.useState({})
    const [profileName, setProfileName] = React.useState('')
    const [profilePicture, setProfilePicture] = React.useState('')

    const getDataProfile = async () => {
        const { data } = await http(token).get('/profile')
        setProfileName(data.results.fullName)
        setProfilePicture(data.results)
    }
    React.useEffect(() => {
        getDataProfile()
    })

    const storeUpdate = async (event) => {
        event.preventDefault()

        try {
            const { value: fullName } = event.target.fullName
            const body = new URLSearchParams({ fullName })
            const { data } = await http(token).post('profile', body)

            if (data) {
                console.log(data)
                getDataProfile()
            }
        } catch (error) {
            console.log(error)
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
                            <div className='flex flex-col gap-6 md:gap-0 md:flex-row md:items-center md:justify-between mb-7'>
                                <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>Profile</div>
                            </div>
                            <form onSubmit={storeUpdate}>
                                <div className='flex flex-col-reverse lg:flex-row'>
                                    <div className='basis-3/5 flex flex-col gap-8'>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12 justify-start'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='name'>
                                                Name
                                            </label>
                                            <input className='w-full px-3 h-[55px] border rounded-xl' type='text' name='fullName' placeholder='Username' value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12 justify-start'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='name'>
                                                Username
                                            </label>
                                            <div className='flex items-center gap-7 w-full'>
                                                <div className='text-sm text-[#777777] tracking-[1px]'>@jhont0</div>
                                                <div>
                                                    <Link to='' className='text-sm text-[#3366FF] underline '>
                                                        Edit
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12 justify-start'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='email'>
                                                Email
                                            </label>
                                            <div className='flex items-center gap-7 w-full'>
                                                <div className='text-sm text-[#777777] tracking-[1px]'>jhont0@mail.com</div>
                                                <div>
                                                    <Link to='' className='text-sm text-[#3366FF] underline '>
                                                        Edit
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='phone-number'>
                                                Phone Number
                                            </label>
                                            <div className='flex items-center gap-7 w-full'>
                                                <div className='text-sm text-[#777777] tracking-[1px]'>081234567890</div>
                                                <div>
                                                    <Link to='' className='text-sm text-[#3366FF]  underline'>
                                                        Edit
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='phone-number'>
                                                Gender
                                            </label>
                                            <div className='flex items-center gap-7 w-full text-sm text-[#777777] tracking-[1px]'>
                                                <div className='flex items-center gap-3'>
                                                    <input type='radio' name='gender' />
                                                    <label htmlFor='male'>Male</label>
                                                </div>
                                                <div className='flex items-center gap-3'>
                                                    <input type='radio' name='gender' />
                                                    <label htmlFor='female'>Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12 justify-start'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='profesiion'>
                                                Profession
                                            </label>
                                            <select className='w-full px-3 outline-0 h-[55px] border rounded-xl text-sm text-[#777777] tracking-[1px]' name='profession' id='profession'>
                                                <option value='enterpreneur'>Enterpreneur</option>
                                                <option value='programmer'>programmer</option>
                                                <option value='ceo'>CEO</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12 justify-start'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='nationality'>
                                                Nationality
                                            </label>
                                            <select className='w-full px-3 outline-0 h-[55px] border rounded-xl text-sm text-[#777777] tracking-[1px]' name='nationality' id='nationality'>
                                                <option value='indonesia'>Indonesia</option>
                                                <option value='singapore'>Singapore</option>
                                                <option value='australia'>Australia</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col items-start lg:flex-row lg-items-center gap-5 xl:gap-12'>
                                            <label className='lg:w-32 text-sm text-[#373A42] tracking-[1px]' htmlFor='birthday-date'>
                                                Birthday Date
                                            </label>
                                            <div className='flex items-center gap-7 w-full'>
                                                <div className='text-sm text-[#777777] tracking-[1px]'>29/09/2013</div>
                                                <div>
                                                    <Link to='' className='text-sm text-[#3366FF] underline '>
                                                        Edit
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-14 lg:mb-0 basis-2/5 px-12 flex flex-col gap-12 items-center'>
                                        <div className='w-[153px] h-[153px]  flex items-center justify-center  rounded-full p-[3px] bg-gradient-to-tr from-[#3366ff] to-[#884dff]'>
                                            {profilePicture?.picture && (
                                                <img
                                                    className='w-36 h-36 inline-block rounded-full'
                                                    src={profilePicture.picture.startsWith('https') ? profilePicture.picture : `${import.meta.env.VITE_BACKEND_URL}/uploads/${profilePicture.picture}`}
                                                    alt=''
                                                />
                                            )}
                                        </div>
                                        <div className='hidden lg:block w-full md:flex flex-col gap-3'>
                                            <div>
                                                <button className='w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>Choose Photo</button>

                                                {/* <label className=''>File</label>
                                                <input
                                                    type='file'
                                                    className='w-full px-4 py-2'
                                                    label='File'
                                                    name='picture'
                                                    onChange={(e) =>
                                                        setProfilePicture(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                /> */}
                                            </div>
                                            <div className='text-sm text-[#373A42BF] tracking-[0.5px]'>Image size: max, 2 MB</div>
                                            <div className='text-sm text-[#373A42BF] tracking-[0.5px]'>Image formats: .JPG, .JPEG, .PNG</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type='submit' className='shadow-for-all-button w-full lg:w-[75%] xl:w-[50%] mt-5 text-white text-sm font-semibold tracking-[1px] h-10 rounded-xl bg-[#4c3f91] mb-4'>
                                        Update
                                    </button>
                                </div>
                            </form>
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

export default Reservation
