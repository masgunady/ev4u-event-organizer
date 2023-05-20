import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserSidebar from '../components/UserSidebar'
import { Formik, Field } from 'formik'
import http from '../helpers/http'
import defaultPicture from '../assets/img/default.png'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Reservation = () => {
    const token = useSelector((state) => state.auth.token)
    const [profile, setProfile] = React.useState({})

    // const [editUsername, setEditUsername] = React.useState(false)
    const [editEmail, setEditEmail] = React.useState(false)
    const [editPhoneNumber, setEditPhoneNumber] = React.useState(false)
    const [editBirthdate, setEditBirthdate] = React.useState(false)
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [openModal, setOpenModoal] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')

    React.useEffect(() => {
        const getProfile = async () => {
            const { data } = await http(token).get('/profile')
            setProfile(data.results)
        }
        getProfile()
    }, [token])

    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }

    const changePicture = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

    const editProfile = async (values) => {
        setOpenModoal(true)
        const form = new FormData()
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                if (key === 'birthDate') {
                    form.append(key, moment(values[key]).format('YYYY-MM-DD'))
                } else {
                    form.append(key, values[key])
                }
            }
        })
        if (selectedPicture) {
            form.append('picture', selectedPicture)
        }

        const { data } = await http(token).patch('/profile', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        setProfile(data.results)
        setEditEmail(false)
        setEditPhoneNumber(false)
        setEditBirthdate(false)
        setSelectedPicture(false)
        setOpenModoal(false)
    }
    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <main className='bg-[#F4F7FF] md:px-9 lg:px-16 xl:px-24 2xl:px-52 flex md:gap-3'>
                    <UserSidebar />
                    <Formik
                        initialValues={{
                            fullName: profile?.fullName,
                            email: profile?.email,
                            phoneNumber: profile?.phoneNumber,
                            gender: profile?.gender === 1 ? '1' : '2',
                            profession: profile?.profession,
                            nationality: profile?.nationality,
                            birthDate: profile?.birthDate,
                        }}
                        onSubmit={editProfile}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <form onSubmit={handleSubmit} className='flex justify-between w-full mt-11 p-11 bg-white rounded-xl text-secondary'>
                                <div className='flex flex-col gap-5'>
                                    <div className='text-2xl font-semibold'>Profile</div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>Name</div>
                                        <div>
                                            <input name='fullName' onChange={handleChange} onBlur={handleBlur} value={values.fullName} type='text' className='input input-bordered w-full' />
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>Email</div>
                                        <div className='flex gap-3 items-center'>
                                            {!editEmail && <span>{profile?.email === null ? <span className='text-red-400'>Not set</span> : profile?.email}</span>}
                                            {editEmail && <input name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' className='input input-bordered w-full' />}

                                            {!editEmail && (
                                                <div>
                                                    <button onClick={() => setEditEmail(true)} className='text-primary font-semibold text-sm'>
                                                        edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>phone number</div>
                                        <div className='flex gap-3 items-center'>
                                            {!editPhoneNumber && <span>{profile?.phoneNumber === null ? <span className='text-red-400'>Not set</span> : profile?.phoneNumber}</span>}
                                            {editPhoneNumber && <input name='phoneNumber' onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} type='text' className='input input-bordered w-full' />}
                                            {!editPhoneNumber && (
                                                <div>
                                                    <button onClick={() => setEditPhoneNumber(true)} className='text-primary font-semibold text-sm'>
                                                        edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>gender</div>
                                        <div className='flex gap-5'>
                                            <div className='flex items-center gap-5'>
                                                <label className='flex gap-3'>
                                                    <Field name='gender' value='1' type='radio' className='radio radio-primary' />
                                                    <span>Male</span>
                                                </label>
                                            </div>
                                            <div className='flex items-center gap-5'>
                                                <label className='flex gap-3'>
                                                    <Field name='gender' value='2' type='radio' className='radio radio-primary' />
                                                    <span>Female</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>Profession</div>
                                        <div>
                                            <select name='profession' value={values.profession} onChange={handleChange} onBlur={handleBlur} className='select select-bordered w-full'>
                                                <option className='hidden'>Select profession</option>
                                                <option>Enterpreneur</option>
                                                <option>Programmer</option>
                                                <option>Gamers</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>Nationality</div>
                                        <div>
                                            <select name='nationality' value={values.nationality} onChange={handleChange} onBlur={handleBlur} className='select select-bordered w-full'>
                                                <option className='hidden'>Select nationality</option>
                                                <option>Indonesia</option>
                                                <option>Malaysia</option>
                                                <option>Singapore</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[200px]'>Birth Date</div>
                                        <div className='flex gap-3 items-center'>
                                            {!editBirthdate && <span>{profile?.birthDate === null ? <span className='text-red-400'>Not set</span> : moment(profile?.birthDate).format('DD/MM/YYYY')}</span>}
                                            {editBirthdate && <input name='birthDate' onChange={handleChange} onBlur={handleBlur} value={values.birthDate} type='date' className='input input-bordered w-full' />}

                                            {!editBirthdate && (
                                                <div>
                                                    <button onClick={() => setEditBirthdate(true)} className='text-primary font-semibold text-sm'>
                                                        edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit' className='btn btn-primary w-full max-w-[315px]'>
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <div className='mb-14 lg:mb-0 basis-2/5 px-12 flex flex-col gap-12 items-center'>
                                    <div className='w-[153px] h-[153px]  flex items-center justify-center  rounded-full p-[3px] bg-gradient-to-tr from-[#3366ff] to-[#884dff]'>
                                        {!selectedPicture && profile?.picture && (
                                            <img
                                                className='w-36 h-36 border-4 border-white rounded-full'
                                                src={profile?.picture?.startsWith('https') ? profile?.picture : profile?.picture === null ? defaultPicture : `${import.meta.env.VITE_BACKEND_URL}/uploads/${profile?.picture}`}
                                                alt={profile?.fullName}
                                            />
                                        )}
                                        {selectedPicture && (
                                            <div className='w-full h-full relative'>
                                                <img className='w-36 h-36 border-4 border-white rounded-full' src={pictureURI} alt='profile' />
                                                <div className='absolute rounded-full bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='hidden lg:block w-full md:flex flex-col gap-3'>
                                        <div>
                                            <label className='btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>
                                                <span>Choose photo</span>
                                                <input name='picture' onChange={changePicture} className='hidden' type='file' />
                                            </label>
                                        </div>
                                        <div className='text-sm text-[#373A42BF] tracking-[0.5px]'>Image size: max, 2 MB</div>
                                        <div className='text-sm text-[#373A42BF] tracking-[0.5px]'>Image formats: .JPG, .JPEG, .PNG</div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </main>

                <footer className='md:bg-[#F4F7FF] w-[100%] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-80'>
                    <Footer />
                </footer>
            </div>
            <div>
                <input type='checkbox' id='loading' className='modal-toggle' checked={openModal} />
                <div className='modal'>
                    <div className='modal-box bg-transparent h-40 shadow-none overflow-hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <AiOutlineLoading3Quarters className='animate-spin' size={70} color='white' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservation
