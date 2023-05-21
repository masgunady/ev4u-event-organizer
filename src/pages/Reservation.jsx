import Footer from '../components/Footer'
import Header from '../components/Header'
import sectionImg from '../assets/img/booking-img-art.png'

import { BiSort } from 'react-icons/bi'
import { IoTicket } from 'react-icons/io5'
import { HiPlus, HiMinus } from 'react-icons/hi'
import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import { useNavigate, useParams } from 'react-router-dom'

const Reservation = () => {
    const { id: eventId } = useParams()
    const navigate = useNavigate()
    const [sections, setSections] = React.useState([])
    const [filledSection, setFilledSection] = React.useState({
        id: 0,
        quantity: 0,
    })
    const token = useSelector((state) => state.auth.token)

    const increment = (id) => {
        setFilledSection({ id, quantity: filledSection.quantity + 1 })
    }
    const decrement = (id) => {
        setFilledSection({ id, quantity: filledSection.quantity - 1 })
    }

    React.useEffect(() => {
        const getSections = async () => {
            const { data } = await http(token).get('/section')
            setSections(data.results)
        }
        getSections()
    }, [token])

    const doReservation = async () => {
        const form = new URLSearchParams({
            eventId,
            sectionId: filledSection.id,
            quantity: filledSection.quantity,
        }).toString()
        const { data } = await http(token).post('/reservation', form)

        navigate('/event/reservation/payment', {
            state: {
                eventId,
                eventName: data.results.events.title,
                reservationId: data.results.id,
                sectionName: data.results.sectionName,
                quantity: data.results.quantity,
                totalPayment: data.results.totalPrice,
            },
            replace: true,
        })
    }

    const selectedSection = filledSection && sections.filter((item) => item.id === filledSection.id)[0]
    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <main className='flex justify-center lg:mt-12'>
                    <div className='container flex flex-col md:flex-row justify-between items-center gap-11 md:items-start bg-white px-7 lg:px-24 py-24 lg:rounded-3xl'>
                        <div className='w-full h-full flex-1'>
                            <div className='flex items-center justify-center w-full h-[75%]'>
                                <img className='w-[90%] lg:w-[80%] md:rotate-[-45deg]' src={sectionImg} alt='' />
                            </div>
                        </div>
                        <div className='mt-11 md:mt-0 flex flex-col flex-1 gap-7 w-full'>
                            <div className='flex flex-col justify-start gap-12 w-full'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-[20px] text-[373a42] font-semibold tracking-[1px] capitalize'>tickets</div>
                                    <div className='flex items-center justify-end gap-3'>
                                        <div className='text-xs text-[red] font-semibold tracking-[1px] uppercase'>By Price</div>
                                        <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-[#FFF] shadow-md'>
                                            <i className='text-[#3366FF]'>
                                                <BiSort size={27} />
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                {sections.map((item) => (
                                    <div className='flex item-star justify-between gap-5' key={`section-select-${item.id}`}>
                                        <div className='w-16'>
                                            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-[#F1EAFF] shadow-sm'>
                                                <i className='text-[#884DFF]'>
                                                    <IoTicket size={27} />
                                                </i>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px] uppercase'>Section {item.name}, Row 1</div>
                                            <div className='text-xs text-[#bdc0c4] font-medium capitalize'>12 Seats available</div>
                                            <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>Quantity</div>
                                        </div>
                                        <div className='w-[40%] flex flex-col items-end gap-1'>
                                            <div className='self-center text-base text-[#373a42] font-semibold tracking-[1px]'>IDR{item.price}</div>
                                            <div className='self-center text-xs text-[#bdc0c4] font-medium tracking-[0.5px]'>per person</div>
                                            <div className='w-full flex items-center justify-between gap-2'>
                                                <button onClick={() => decrement(item.id)} className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                    <i className='text-[#C1C5D0]'>
                                                        <HiMinus size={17} />
                                                    </i>
                                                </button>
                                                <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>{item.id === filledSection.id ? filledSection.quantity : 0}</div>
                                                <button onClick={() => increment(item.id)} className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                    <i className='text-[#C1C5D0]'>
                                                        <HiPlus size={17} />
                                                    </i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className='flex item-star justify-between gap-5'>
                                    <div className='w-16'>
                                        <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-[#F1EAFF] shadow-sm'>
                                            <i className='text-[#884DFF]'>
                                                <IoTicket size={27} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px] uppercase'>Section reg, Row 1</div>
                                        <div className='text-xs text-[#bdc0c4] font-medium capitalize'>12 Seats available</div>
                                        <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>Quantity</div>
                                    </div>
                                    <div className='w-[40%] flex flex-col items-end gap-1'>
                                        <div className='self-center text-base text-[#373a42] font-semibold tracking-[1px]'>$15</div>
                                        <div className='self-center text-xs text-[#bdc0c4] font-medium tracking-[0.5px]'>per person</div>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiMinus size={17} />
                                                </i>
                                            </div>
                                            <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>0</div>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiPlus size={17} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className='flex item-star justify-between gap-5'>
                                    <div className='w-16'>
                                        <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-[#FFEAEF] shadow-sm'>
                                            <i className='text-[#FF3D71]'>
                                                <IoTicket size={27} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px] uppercase'>Section reg, Row 1</div>
                                        <div className='text-xs text-[#bdc0c4] font-medium capitalize'>12 Seats available</div>
                                        <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>Quantity</div>
                                    </div>
                                    <div className='w-[40%] flex flex-col items-end gap-1'>
                                        <div className='self-center text-base text-[#373a42] font-semibold tracking-[1px]'>$15</div>
                                        <div className='self-center text-xs text-[#bdc0c4] font-medium tracking-[0.5px]'>per person</div>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiMinus size={17} />
                                                </i>
                                            </div>
                                            <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>0</div>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiPlus size={17} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className='flex item-star justify-between gap-5'>
                                    <div className='w-16'>
                                        <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[5px] bg-[#FFF4E7] shadow-sm'>
                                            <i className='text-[#FF8900]'>
                                                <IoTicket size={27} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px] uppercase'>Section reg, Row 1</div>
                                        <div className='text-xs text-[#bdc0c4] font-medium capitalize'>12 Seats available</div>
                                        <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>Quantity</div>
                                    </div>
                                    <div className='w-[40%] flex flex-col items-end gap-1'>
                                        <div className='self-center text-base text-[#373a42] font-semibold tracking-[1px]'>$15</div>
                                        <div className='self-center text-xs text-[#bdc0c4] font-medium tracking-[0.5px]'>per person</div>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiMinus size={17} />
                                                </i>
                                            </div>
                                            <div className='text-xs text-[#373a42] font-semibold tracking-[1px] capitalize mt-2'>0</div>
                                            <div className='border-2 rounded-md w-[33px] h-[30px] flex items-center justify-center'>
                                                <i className='text-[#C1C5D0]'>
                                                    <HiPlus size={17} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='pt-4 border-t-2 flex flex-col gap-3.5'>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Ticket Section</div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>{selectedSection?.name || '-'}</div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Quantity</div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>{filledSection?.quantity}</div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>Total Payment</div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>IDR {selectedSection?.price * filledSection?.quantity || '0'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-11'>
                                <div className='shadow-for-all-button flex items-center justify-center bg-[#4c3f91] w-full md:w-[315px] h-[55px] rounded-2xl text-white text-base font-semibold tracking-[1px]'>
                                    <button onClick={doReservation} className='h-full w-full flex items-center justify-center'>
                                        Checkout
                                    </button>
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

export default Reservation
