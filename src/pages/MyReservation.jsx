import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'

import { FiCalendar } from 'react-icons/fi'

import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import moment from 'moment'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Image from '../components/Image'
import defaultImage from '../assets/img/event-1.png'
const MyReservation = () => {
    const [reservationByMe, setReservationByMe] = React.useState([])
    const token = useSelector((state) => state.auth.token)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState('')
    const [detailReservation, setDetailReservation] = React.useState({})
    const [modalAction, setModalAction] = React.useState('')
    const [openModalEvent, setOpenModalEvent] = React.useState(false)

    React.useEffect(() => {
        async function getEventByMe() {
            const { data } = await http(token).get(`/history?page=${currentPage}&limit=4&sort=id&sortBy=DESC`)
            setTotalPage(data.totalPage)
            setReservationByMe(data.results)
        }
        if (token) {
            getEventByMe()
        }
    }, [token, setReservationByMe, currentPage])

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage + 1 <= totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleModalEvent = async (paramId, action) => {
        setOpenModalEvent(true)
        setModalAction(action)
        if (action === 'detail') {
            const { data } = await http(token).get(`/history/${paramId}`)
            console.log(data)
            setDetailReservation(data.results)
        }
    }

    const handleCloseModalEvent = () => {
        setModalAction('')
        setOpenModalEvent(false)
        setDetailReservation({})
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
                        <div className='bg-white px-9 lg:px-12 py-9 lg:py-11 rounded-2xl min-h-[980px]  md:min-h-[920px] relative'>
                            <div className='flex flex-col gap-6 md:gap-0 md:flex-row md:items-center md:justify-between mb-7'>
                                <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>My Booking</div>
                                <div className='w-32 h-14 rounded-2xl bg-[#EAF1FF] flex justify-center items-center'>
                                    <button className='w-full h-full flex justify-center items-center gap-4 text-xs font-medium tracking-1px text-[#3366FF]'>
                                        <i className=''>
                                            <FiCalendar size={25} />
                                        </i>
                                        March
                                    </button>
                                </div>
                            </div>
                            <div className='mb-24 md:mb-20'>
                                {reservationByMe.map((reservation) => {
                                    return (
                                        <div className='flex items-center justify-start gap-6 border-b-2 py-7' key={`reservation-${reservation.id}`}>
                                            <div className='flex flex-col items-center justify-center gap-3'>
                                                <div className='w-[50px] h-[75px] flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg'>
                                                    <div className='text-sm font-semibold text-[#FF8900]'>{moment(reservation?.date).format('DD')}</div>
                                                    <div className='text-xs font-medium text-[#C1C5D0]'>{moment(reservation?.date).format('LLLL').slice(0, 3)}</div>
                                                </div>
                                                <div>
                                                    {reservation?.paymentMethod === 'Not Defined' ? (
                                                        <div className='bg-[#ffdcb3] text-[#FF8900] text-xs font-bold p-1 rounded-md capitalize'>pending</div>
                                                    ) : (
                                                        <div className='bg-[#b6e5a8] text-[#49be25] text-xs font-bold p-1 rounded-md capitalize'>Success</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-start justify-start text-[#373A42] gap-[5px]'>
                                                <div className='text-2xl font-semibold tracking-[2px] mb-3.5 capitalize'>{reservation?.title}</div>
                                                <div className='text-xs tracking-[0.5px] capitalize'>{reservation?.location}, Indonesia</div>
                                                <div className='text-xs tracking-[0.5px]'>{moment(reservation?.date).format('LLLL')}</div>
                                                <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                    <button onClick={() => handleModalEvent(reservation.id, 'detail')}>Detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {reservationByMe.length < 1 && (
                                <div>
                                    <div className=' h-full flex flex-col items-center justify-center gap-7 '>
                                        <div className='font-semibold text-2xl text-secondary'>No Reservation Found</div>
                                        <div className='font-medium text base max-w-[300px] text-center'>It seems that you haven&apos;t added any Reservations yet. Maybe try looking for this?</div>
                                    </div>
                                </div>
                            )}
                            {reservationByMe.length >= 1 && (
                                <div className='flex justify-end items-center gap-4 absolute right-12 bottom-12'>
                                    <div className='text-secondary'>
                                        Page {currentPage} of {totalPage}
                                    </div>
                                    <button onClick={handlePrev} className='btn btn-secondary text-white capitalize'>
                                        Prev
                                    </button>
                                    <button onClick={handleNext} className='btn btn-primary text-white capitalize'>
                                        Next
                                    </button>
                                </div>
                            )}

                            <input type='checkbox' id='my_modal_6' className='modal-toggle' checked={openModalEvent} />
                            <div className='modal'>
                                <div className={`modal-box mx-4 w-full md:w-[90%] ${modalAction !== 'delete' ? 'lg:max-w-[900px]' : 'lg:max-w-[600px]'}  bg-white`}>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px]'>{modalAction === 'detail' && 'Detail Event'}</div>
                                        <div>
                                            <button className='' onClick={handleCloseModalEvent}>
                                                <i className='text-red-400'>
                                                    <AiOutlineCloseCircle size={30} />
                                                </i>
                                            </button>
                                        </div>
                                    </div>

                                    {modalAction === 'detail' && (
                                        <div>
                                            <div className='flex flex-col-reverse md:flex-row justify-center items-center gap-9'>
                                                <div className='flex items-start w-full flex-1'>
                                                    <div className='flex flex-col gap-3.5 w-full'>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Transaction ID</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailReservation?.reservationId}</div>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Payment Date</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{moment(detailReservation?.paymentDate).format('DD/MM/YY')}</div>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Name</div>
                                                            <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailReservation?.title}</div>
                                                        </div>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Location</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailReservation?.location}</div>
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm  tracking-[1px] text-secondary capitalize'>Date Time Show</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{moment(detailReservation?.date).format('LLLL')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-start w-full flex-1'>
                                                    <div className='flex flex-col gap-3.5 w-full justify-center items-center'>
                                                        {detailReservation && (
                                                            <div className='w-[291px] h-[352px] relative overflow-hidden rounded-xl'>
                                                                {<Image className='w-full h-full border-4 border-white rounded-xl object-cover' src={detailReservation?.picture || null} defaultImg={defaultImage} />}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px] mt-11 flex flex-col gap-3'>
                                                <div className='text-sm text-[#373a42] tracking-[1px]'>Detail Transaction</div>
                                                <div className='flex items-center'>
                                                    <div className='w-full '>
                                                        <div className='text-sm font-bold'>Section</div>
                                                        <div className='w-full text-base font-bold text-secondary capitalize'>{detailReservation?.ticketSection}</div>
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='text-sm font-bold'>Ticket Price</div>
                                                        <div className='w-full text-base font-bold text-secondary capitalize'>IDR {detailReservation?.ticketPrice}</div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <div className='w-full '>
                                                        <div className='text-sm font-bold'>Quantity</div>
                                                        <div className='w-full text-base font-bold text-secondary capitalize'>{detailReservation?.quantity}</div>
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='text-sm font-bold'>Payment Method</div>
                                                        <div className='w-full text-base font-bold text-secondary capitalize'>{detailReservation?.paymentMethod}</div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <div className='w-full '>
                                                        <div className='text-sm font-bold'>Grand Todal</div>
                                                        <div className='w-full text-base font-bold text-secondary capitalize'>IDR {detailReservation?.totalPrice}</div>
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='text-sm font-bold'>Status</div>
                                                        {detailReservation?.paymentStatus === 'paid' ? (
                                                            <div className='w-24 text-center rounded-lg text-base font-bold bg-[#b6e5a8] text-[#49be25] capitalize'>{detailReservation?.paymentStatus}</div>
                                                        ) : (
                                                            <div className='w-24 text-center rounded-lg text-base font-bold bg-[#ffdcb3] text-[#FF8900] capitaliz'>{detailReservation?.paymentStatus}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full flex items-center justify-center md:justify-end mt-11'>
                                                <button onClick={handleCloseModalEvent} className='shadow-for-all-button w-[315px] h-[55px] rounded-xl bg-[#4c3f91] text-white text-sm font-semibold tracking-[1px]' type='button'>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
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

export default MyReservation
