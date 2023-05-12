// import event from '../assets/img/event-1.png';
import maps from '../assets/img/map.png'
import { FiHeart, FiMapPin, FiClock } from 'react-icons/fi'
import Footer from '../components/Footer'
import Header from '../components/Header'
import React from 'react'
import { useParams } from 'react-router-dom'
import http from '../helpers/http'
import moment from 'moment'
const DetailEvent = () => {
    const { id } = useParams()
    const [eventDetail, setEventDetail] = React.useState({})
    React.useEffect(() => {
        const getEventData = async (id) => {
            const { data } = await http().get(`/event/${id}`)
            console.log(data)
            setEventDetail(data.results)
        }
        if (id) {
            getEventData(id)
        }
    }, [id])

    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <main className='flex justify-center lg:mt-12'>
                    <div className='container flex flex-col md:flex-row justify-between items-center md:items-start bg-white px-7 lg:px-24 py-24 lg:rounded-3xl'>
                        <div className='flex flex-col items-center gap-11 flex-1'>
                            <div className='md:w-[260px] lg:w-[320px] object-cover rounded-3xl overflow-hidden relative'>
                                {eventDetail?.picture && (
                                    <img
                                        className='w-full h-[450px] object-cover'
                                        src={`http://localhost:8888/uploads/${eventDetail?.picture}`}
                                        alt=''
                                    />
                                )}
                                <div className='block md:hidden'>
                                    <div className='flex flex-col items-center justify-center w-full h-full absolute z-20 bottom-0'>
                                        <div className='flex flex-col gap-3 px-5'>
                                            <div className='flex items-start justify-between text-white text-[24px] font-semibold tracking-[2px] capitalize'>
                                                <div>{eventDetail?.title} </div>
                                                <div>
                                                    <i className=''>
                                                        <FiHeart size={25} />
                                                    </i>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-start gap-2.5 text-sm font-medium tracking-[1px]'>
                                                <div className='text-[red]'>
                                                    <i className=''>
                                                        <FiMapPin size={20} />
                                                    </i>
                                                </div>
                                                <div className='text-white capitalize'>
                                                    {eventDetail?.location}
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-start gap-2.5 text-sm font-medium tracking-[1px]'>
                                                <div className='text-[red]'>
                                                    <i className=''>
                                                        <FiClock size={20} />
                                                    </i>
                                                </div>
                                                <div className='text-white'>
                                                    {moment(
                                                        eventDetail.date
                                                    ).format('LLLL')}
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-white mt-4'>
                                                    Attendees
                                                </div>
                                            </div>
                                            <div className='flex ml-[20px]'>
                                                <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                    <img
                                                        src='https://i.pravatar.cc/48'
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                    <img
                                                        src='https://i.pravatar.cc/48'
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                    <img
                                                        src='https://i.pravatar.cc/48'
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                    <img
                                                        src='https://i.pravatar.cc/48'
                                                        alt=''
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gradient-to-t from-[#000000] from-5% w-full h-full absolute z-10 bottom-0'></div>
                            </div>
                            <div className='hidden md:block'>
                                <div className='flex items-center gap-3 justify-center text-[#373a42] text-[20px] font-semibold tracking-[1px]'>
                                    <div>
                                        <i className=''>
                                            <FiHeart size={27} />
                                        </i>
                                    </div>
                                    <div>Add To Wishlist</div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-11 md:mt-0 flex flex-col flex-1 gap-7'>
                            <div className='hidden md:block'>
                                <div className='flex flex-col gap-9 border-b-[1px]'>
                                    <div className='text-2xl text-[#373a42] font-semibold tracking-[2px] w-[50%] capitalize'>
                                        {eventDetail?.title}
                                    </div>
                                    <div className='flex items-center justify-start gap-4'>
                                        <div className='flex-1 flex items-center gap-3 text-sm text-[#373a42] font-medium tracking-[1px] capitalize'>
                                            <div className='text-[red]'>
                                                <i className=''>
                                                    <FiMapPin size={20} />
                                                </i>
                                            </div>
                                            <div>{eventDetail.location}</div>
                                        </div>
                                        <div className='flex-1 flex items-center gap-3 text-sm text-[#373a42] font-medium tracking-[1px]'>
                                            <div className='text-[red]'>
                                                <i className=''>
                                                    <FiClock size={20} />
                                                </i>
                                            </div>
                                            <div>
                                                {moment(
                                                    eventDetail.date
                                                ).format('LLLL')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 text-sm text-[#373a42] font-medium tracking-[0.5px] mb-7'>
                                        <div>Attendees</div>
                                        <div className='flex ml-[20px]'>
                                            <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                <img
                                                    src='https://i.pravatar.cc/48'
                                                    alt=''
                                                />
                                            </div>
                                            <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                <img
                                                    src='https://i.pravatar.cc/48'
                                                    alt=''
                                                />
                                            </div>
                                            <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                <img
                                                    src='https://i.pravatar.cc/48'
                                                    alt=''
                                                />
                                            </div>
                                            <div className='flex items-center justify-center ml-[-20px] border-[2px] border-white w-[48px] rounded-full object-cover overflow-hidden'>
                                                <img
                                                    src='https://i.pravatar.cc/48'
                                                    alt=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3.5'>
                                <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px]'>
                                    Event Detail
                                </div>
                                <div className='text-xs text-[#373a42] tracking-[1px]'>
                                    <p>{eventDetail?.descriptions}</p>
                                </div>
                                <div className='text-xs text-[#3366ff] font-medium tracking-[0.5px]'>
                                    <a href='#'>Read Mode</a>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3.5'>
                                <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px]'>
                                    Location
                                </div>
                                <div className='w-full flex justify-center md:justify-start'>
                                    <img src={maps} alt='' />
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='shadow-for-all-button flex items-center justify-center bg-[#4c3f91] w-full md:w-[315px] h-[55px] rounded-2xl text-white text-base font-semibold tracking-[1px]'>
                                    <a
                                        className='w-full h-full flex items-center justify-center'
                                        href='./booking.html'
                                    >
                                        Buy Tickets
                                    </a>
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

export default DetailEvent
