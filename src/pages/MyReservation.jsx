import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'

import { FiCalendar } from 'react-icons/fi'

import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import moment from 'moment'
const MyReservation = () => {
    const [reservationByMe, setReservationByMe] = React.useState([])
    const token = useSelector((state) => state.auth.token)

    React.useEffect(() => {
        async function getEventByMe() {
            const { data } = await http(token).get('/history')
            setReservationByMe(data.results)
        }
        if (token) {
            getEventByMe()
        }
    }, [token, setReservationByMe])
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
                            {reservationByMe.map((reservation) => {
                                return (
                                    <div className='flex items-center justify-start gap-6 border-b-2 py-7' key={`reservation-${reservation.id}`}>
                                        <div>
                                            <div className='w-[50px] h-[75px] flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg'>
                                                <div className='text-sm font-semibold text-[#FF8900]'>{moment(reservation?.date).format('DD')}</div>
                                                <div className='text-xs font-medium text-[#C1C5D0]'>{moment(reservation?.date).format('LLLL').slice(0, 3)}</div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start justify-start text-[#373A42] gap-[5px]'>
                                            <div className='text-2xl font-semibold tracking-[2px] mb-3.5 capitalize'>{reservation?.title}</div>
                                            <div className='text-xs tracking-[0.5px] capitalize'>{reservation?.location}, Indonesia</div>
                                            <div className='text-xs tracking-[0.5px]'>{moment(reservation?.date).format('LLLL')}</div>
                                            <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                <a href='#'>Detail</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div>
                                {reservationByMe.length < 1 && (
                                    <div className=' h-full flex flex-col items-center justify-center gap-7 '>
                                        <div className='font-semibold text-2xl text-secondary'>No Reservation Found</div>
                                        <div className='font-medium text base max-w-[300px] text-center'>It seems that you haven&apos;t added any Reservations yet. Maybe try looking for this?</div>
                                    </div>
                                )}
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
