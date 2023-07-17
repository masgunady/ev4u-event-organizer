import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters, AiOutlinePicture } from 'react-icons/ai'

import { FiPlusCircle } from 'react-icons/fi'
import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import defaultImage from '../assets/img/event-1.png'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Image from '../components/Image'

const validationSchema = Yup.object({
    title: Yup.string().required('Title is Required!'),
    cityId: Yup.string().required('City is Required!'),
    categoryId: Yup.string().required('Category is Required!'),
    date: Yup.string().required('Date is Required!'),
    descriptions: Yup.string().required('Descriptions is Required!'),
})

const ManageEvent = () => {
    const [eventByMe, setEventByMe] = React.useState([])
    const [detailEventByMe, setDetailEventByMe] = React.useState({})
    const [locations, setLocations] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const token = useSelector((state) => state.auth.token)
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalEvent, setOpenModalEvent] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')
    const [pictureErr, setPictureErr] = React.useState(true)
    const [selectedEventId, setSelectedEventId] = React.useState(null)
    const [modalAction, setModalAction] = React.useState('')

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

    const handleModalEvent = async (paramId, action) => {
        setSelectedEventId(paramId)
        setModalAction(action)
        setOpenModalEvent(true)
        if (action === 'detail' || action === 'update') {
            const { data } = await http(token).get(`/event/manage/${paramId}`)
            setDetailEventByMe(data.results)
        }
    }

    const handleCloseModalEvent = () => {
        setModalAction('')
        setSelectedEventId(null)
        setOpenModalEvent(false)
    }

    console.log(detailEventByMe)

    const createEvent = async (values, { resetForm }) => {
        setOpenModal(true)
        if (!selectedPicture) {
            setOpenModal(false)
            setPictureErr(false)
            return
        } else {
            setPictureErr(true)
        }
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
        setOpenModal(false)
        setOpenModalEvent(false)
        setSelectedPicture('')
        resetForm()
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
                                    <button onClick={() => handleModalEvent('', 'create')} className='w-full h-full flex justify-center items-center gap-4 text-xs font-medium tracking-1px text-[#3366FF]'>
                                        <i className=''>
                                            <FiPlusCircle size={25} />
                                        </i>
                                        Create
                                    </button>

                                    {/* Put this part before </body> tag */}
                                    <input type='checkbox' id='my-modal-4' className='modal-toggle' checked={openModalEvent} />
                                    <label className='modal cursor-pointer'>
                                        <label className='modal-box relative container-event-modal container w-full md:w-[90%] lg:max-w-[900px] bg-white' htmlFor=''>
                                            <div>
                                                <div className='flex justify-between items-center mb-7 mt-2'>
                                                    <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px]'>
                                                        {modalAction === 'create' && 'Create Event'}
                                                        {modalAction === 'detail' && 'Detail Event'}
                                                        {modalAction === 'update' && 'Edit Event'}
                                                        {modalAction === 'delete' && 'Delete Event'}
                                                    </div>
                                                    <button className='mr-4' onClick={handleCloseModalEvent}>
                                                        <i className='text-red-400'>
                                                            <AiOutlineCloseCircle size={30} />
                                                        </i>
                                                    </button>
                                                </div>
                                                {modalAction === 'create' && (
                                                    <Formik
                                                        initialValues={{
                                                            title: '',
                                                            cityId: '',
                                                            categoryId: '',
                                                            date: '',
                                                            descriptions: '',
                                                        }}
                                                        validationSchema={validationSchema}
                                                        onSubmit={createEvent}
                                                        enableReinitialize={true}
                                                    >
                                                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                                                                                        placeholder='Title'
                                                                                    />
                                                                                </div>
                                                                                {errors.title && touched.title && (
                                                                                    <label htmlFor='title' className='label'>
                                                                                        <span className='label-text-alt text-error'>{errors.title}</span>
                                                                                    </label>
                                                                                )}
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
                                                                                {errors.cityId && touched.cityId && (
                                                                                    <label htmlFor='cityId' className='label'>
                                                                                        <span className='label-text-alt text-error'>{errors.cityId}</span>
                                                                                    </label>
                                                                                )}
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
                                                                                {errors.categoryId && touched.categoryId && (
                                                                                    <label htmlFor='categoryId' className='label'>
                                                                                        <span className='label-text-alt text-error'>{errors.categoryId}</span>
                                                                                    </label>
                                                                                )}
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
                                                                                {errors.date && touched.date && (
                                                                                    <label htmlFor='date' className='label'>
                                                                                        <span className='label-text-alt text-error'>{errors.date}</span>
                                                                                    </label>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex items-start w-full flex-1'>
                                                                        <div className='flex flex-col gap-3.5 w-full justify-center items-center'>
                                                                            {!selectedPicture && (
                                                                                <div className='w-[291px] h-[332px] rounded-xl relative flex justify-center items-center'>
                                                                                    <i className=''>
                                                                                        <AiOutlinePicture size={50} />
                                                                                    </i>
                                                                                    <div className='absolute bg-white border-2 rounded-xl border-slate-500 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div>
                                                                                </div>
                                                                            )}
                                                                            {selectedPicture && (
                                                                                <div className='w-[291px] h-[352px] relative overflow-hidden rounded-xl'>
                                                                                    <img className='w-[291px] h-[353px] rounded-xl object-cover border-4 border-white' src={pictureURI} alt='profile' />
                                                                                    <div className='absolute bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div>
                                                                                </div>
                                                                            )}
                                                                            <div className='w-[291px] flex flex-col justify-center'>
                                                                                <label className='btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>
                                                                                    <span>Choose photo</span>
                                                                                    <input name='picture' onChange={changePicture} className='hidden' type='file' />
                                                                                </label>
                                                                                {!pictureErr && (
                                                                                    <label className='label'>
                                                                                        <span className='label-text-alt text-error'>Please insert event picture!</span>
                                                                                    </label>
                                                                                )}
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
                                                                    {errors.descriptions && touched.descriptions && (
                                                                        <label htmlFor='descriptions' className='label'>
                                                                            <span className='label-text-alt text-error'>{errors.descriptions}</span>
                                                                        </label>
                                                                    )}
                                                                </div>
                                                                <div className='w-full flex items-center justify-end mt-11'>
                                                                    <button className='shadow-for-all-button w-[315px] h-[55px] rounded-xl bg-[#4c3f91] text-white text-sm font-semibold tracking-[1px]' type='submit'>
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                )}

                                                {modalAction === 'detail' && (
                                                    <div>
                                                        <div className='flex flex-col-reverse md:flex-row justify-center items-center gap-9'>
                                                            <div className='flex items-start w-full flex-1'>
                                                                <div className='flex flex-col gap-3.5 w-full'>
                                                                    <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                        <div className='text-sm text-[#373a42] tracking-[1px]'>Name</div>
                                                                        <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEventByMe?.title}</div>
                                                                    </div>
                                                                    <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                        <div className='text-sm text-[#373a42] tracking-[1px]'>Location</div>
                                                                        <div className='w-full'>
                                                                            <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEventByMe?.location}</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                        <div className='text-sm text-[#373a42] tracking-[1px]'>Category</div>
                                                                        <div className='w-full'>
                                                                            <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEventByMe?.eventCategory}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                                        <div className='text-sm  tracking-[1px] text-secondary capitalize'>Date Time Show</div>
                                                                        <div className='w-full'>
                                                                            <div className='w-full text-lg font-semibold text-secondary capitalize'>{moment(detailEventByMe?.date).format('LLLL')}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-start w-full flex-1'>
                                                                <div className='flex flex-col gap-3.5 w-full justify-center items-center'>
                                                                    {detailEventByMe && (
                                                                        <div className='w-[291px] h-[352px] relative overflow-hidden rounded-xl'>
                                                                            {<Image className='w-full h-full border-4 border-white rounded-xl object-cover' src={detailEventByMe?.picture || null} defaultImg={defaultImage} />}
                                                                            {/* <div className='absolute bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div> */}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px] mt-11'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px] mb-3'>Detail</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEventByMe?.descriptions}</div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full flex items-center justify-center md:justify-end mt-11'>
                                                            <button onClick={handleCloseModalEvent} className='shadow-for-all-button w-[315px] h-[55px] rounded-xl bg-[#4c3f91] text-white text-sm font-semibold tracking-[1px]' type='button'>
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {modalAction === 'update' && <div>update</div>}
                                                {modalAction === 'delete' && <div>delete</div>}
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
                                                    <button onClick={() => handleModalEvent(eventMe.id, 'detail')}>Detail</button>
                                                </div>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <button onClick={() => handleModalEvent(eventMe.id, 'update')}>Update</button>
                                                </div>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <button onClick={() => handleModalEvent(eventMe.id, 'delete')}>delete</button>
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
