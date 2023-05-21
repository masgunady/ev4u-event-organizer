import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { FiPlusCircle } from 'react-icons/fi'
import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
// import { Link } from 'react-router-dom'
import moment from 'moment'
import { Formik } from 'formik'

const ManageEvent = () => {
    const [eventByMe, setEventByMe] = React.useState([])
    const [locations, setLocations] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const token = useSelector((state) => state.auth.token)
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [openModal, setOpenModoal] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')

    React.useEffect(() => {
        async function getEventByMe() {
            const { data } = await http(token).get('/event/manage')
            setEventByMe(data.results)
        }
        if (token) {
            getEventByMe()
        }
    }, [token, setEventByMe])

    React.useEffect(() => {
        async function getLocations() {
            const { data } = await http(token).get('/city')
            setLocations(data.results)
        }
        if (token) {
            getLocations()
        }
    }, [token, setLocations])

    React.useEffect(() => {
        async function getCategories() {
            const { data } = await http(token).get('/category')
            setCategories(data.results)
        }
        if (token) {
            getCategories()
        }
    }, [token, setCategories])

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

        const { data } = await http(token).patch('/event/manage', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        setOpenModoal(false)
        console.log(data)
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
                                <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>Create Event</div>
                                <div className='w-32 h-14 rounded-2xl bg-[#EAF1FF] flex justify-center items-center'>
                                    <label htmlFor='my-modal-4' className='w-full h-full flex justify-center items-center gap-4 text-xs font-medium tracking-1px text-[#3366FF]'>
                                        <i className=''>
                                            <FiPlusCircle size={25} />
                                        </i>
                                        Create
                                    </label>

                                    {/* Put this part before </body> tag */}
                                    <input type='checkbox' id='my-modal-4' className='modal-toggle' />
                                    <label htmlFor='my-modal-4' className='modal cursor-pointer'>
                                        <label className='modal-box relative container-event-modal container w-full md:w-[90%] lg:max-w-[900px] bg-white' htmlFor=''>
                                            <div>
                                                <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px] mb-11'>Create Event</div>
                                                <Formik
                                                    initialValues={{
                                                        title: '',
                                                        cityId: '',
                                                        categoryId: '',
                                                        date: '',
                                                        descriptions: '',
                                                    }}
                                                    onSubmit={editProfile}
                                                    enableReinitialize={true}
                                                >
                                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                                        <form onSubmit={handleSubmit}>
                                                            <div className='flex flex-col md:flex-row justify-center items-center gap-9'>
                                                                <div className='flex items-start w-full flex-1'>
                                                                    <div className='flex flex-col gap-3.5 w-full'>
                                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Name</div>
                                                                            <div className='w-full'>
                                                                                <input
                                                                                    name='title'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.title}
                                                                                    type='text'
                                                                                    className='input input-bordered w-full px-3 h-[55px] border-secondary text-secondary capitalize'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Location</div>
                                                                            <div className='w-full'>
                                                                                <select
                                                                                    name='cityId'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    className='select select-bordered w-full px-3 h-[55px] border-secondary text-secondary capitalize'
                                                                                >
                                                                                    <option className='hidden'>Select Location</option>
                                                                                    {locations.map((item) => {
                                                                                        return (
                                                                                            <React.Fragment key={`location-${item.id}`}>
                                                                                                <option className='text-secondary capitalize' value={item.id}>
                                                                                                    {item.name}
                                                                                                </option>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Category</div>
                                                                            <div className='w-full'>
                                                                                <select
                                                                                    name='categoryId'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    className='select select-bordered w-full px-3 h-[55px] border-secondary text-secondary capitalize'
                                                                                >
                                                                                    <option className='hidden'>Select Category</option>
                                                                                    {categories.map((item) => {
                                                                                        return (
                                                                                            <React.Fragment key={`location-${item.id}`}>
                                                                                                <option className='text-secondary capitalize' value={item.id}>
                                                                                                    {item.name}
                                                                                                </option>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                            <div className='text-sm  tracking-[1px] text-secondary capitalize'>Date Time Show</div>
                                                                            <div className='w-full'>
                                                                                <input
                                                                                    name='date'
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.date}
                                                                                    type='date'
                                                                                    className='input input-bordered w-full px-3 h-[55px] border-secondary'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='flex items-start w-full flex-1'>
                                                                    <div className='flex flex-col gap-3.5 w-full'>
                                                                        {/* <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                    <div className='text-sm text-[#373a42] tracking-[1px]'>Image</div>
                                                                    <div className='w-full'>
                                                                        <input className='border-2 px-3.5 rounded-xl w-full h-[55px] text-sm tracking-[1px]' type='text' placeholder='Chose File ...' />
                                                                    </div>
                                                                </div> */}
                                                                        {selectedPicture && (
                                                                            <div className='w-[291px] h-[332px] relative'>
                                                                                <img className='w-[291px] h-[323px] object-cover border-4 border-white' src={pictureURI} alt='profile' />
                                                                                <div className='absolute bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div>
                                                                            </div>
                                                                        )}
                                                                        <div>
                                                                            <label className='btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>
                                                                                <span>Choose photo</span>
                                                                                <input name='picture' onChange={changePicture} className='hidden' type='file' />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px] mt-11'>
                                                                <div className='text-sm text-[#373a42] tracking-[1px] mb-3'>Detail</div>
                                                                <div className='w-full'>
                                                                    <textarea
                                                                        name='descriptions'
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.descriptions}
                                                                        className='border-2 w-full rounded-xl text-sm tracking-[1px] px-3.5 py-3.5'
                                                                        cols='30'
                                                                        rows='3'
                                                                        placeholder='Input Detail'
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                            <div className='w-full flex items-center justify-end mt-11'>
                                                                <button className='shadow-for-all-button w-[315px] h-[55px] rounded-xl bg-[#4c3f91] text-white text-sm font-semibold tracking-[1px]' type='submit'>
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </label>
                                    </label>
                                </div>
                            </div>
                            {eventByMe.map((eventMe) => {
                                return (
                                    <div className='flex items-center justify-start gap-6 border-b-2 py-7' key={`eventMe-${eventMe.id}`}>
                                        <div>
                                            <div className='w-[50px] h-[75px] flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg'>
                                                <div className='text-sm font-semibold text-[#FF8900]'>{moment(eventMe?.date).format('DD')}</div>
                                                <div className='text-xs font-medium text-[#C1C5D0]'>{moment(eventMe?.date).format('LLLL').slice(0, 3)}</div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start justify-start text-[#373A42] gap-[5px]'>
                                            <div className='text-2xl font-semibold tracking-[2px] mb-3.5 capitalize'>{eventMe?.title}</div>
                                            <div className='text-xs tracking-[0.5px] capitalize'>{`${eventMe?.location}, Indonesia`}</div>
                                            <div className='text-xs tracking-[0.5px]'>{moment(eventMe?.date).format('LLLL')}</div>
                                            <div className='flex items-center gap-5'>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <a href='./detail-events-modal.html'>Detail</a>
                                                </div>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <a href='./update-events-modal.html'>Update</a>
                                                </div>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <a href='#'>Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div>
                                {eventByMe.length < 1 && (
                                    <div className=' h-full flex flex-col items-center justify-center gap-7 '>
                                        <div className='font-semibold text-2xl text-secondary'>No Event Found</div>
                                        <div className='font-medium text base max-w-[300px] text-center'>It seems that you haven&apos;t added any Events yet. Maybe try looking for this?</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                <footer className='md:bg-[#F4F7FF] w-[100%] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-80'>
                    <Footer />
                </footer>
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
            </div>
        </>
    )
}

export default ManageEvent
