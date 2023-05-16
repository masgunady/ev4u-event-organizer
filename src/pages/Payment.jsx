import Footer from '../components/Footer'
import Header from '../components/Header'

import creditCard from '../assets/img/card-display.png'

import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { BsCreditCardFill, BsBank2 } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { FaDollarSign } from 'react-icons/fa'

const Reservation = () => {
    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <main className='flex justify-center lg:mt-12'>
                    <div className='container flex flex-col md:flex-row justify-between items-center gap-11 md:items-start bg-white px-7 lg:px-24 py-24 lg:rounded-3xl'>
                        <div className='w-full h-full flex-1'>
                            <div className='flex flex-col justify-start gap-12 w-full'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-[20px] text-[373a42] font-semibold tracking-[1px] capitalize'>
                                        Payment method
                                    </div>
                                </div>
                                <div className='pt-4 flex flex-col gap-7'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='w-[10%]'>
                                            <input
                                                type='radio'
                                                name='change-payment'
                                                id=''
                                            />
                                        </div>
                                        <div className='w-[15%]'>
                                            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#884DFF33]'>
                                                <i className='text-[#884DFF]'>
                                                    <BsCreditCardFill
                                                        size={25}
                                                    />
                                                </i>
                                            </div>
                                        </div>
                                        <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px]'>
                                            Card
                                        </div>
                                        <div className='w-[20%]'>
                                            <i className=''>
                                                <FiChevronUp size={20} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='scrollbar-hide w-full flex justify-end items-center overflow-scroll'>
                                        <div className='w-[93%] flex items-center justify-start gap-4'>
                                            <img src={creditCard} alt='' />
                                            <div className='min-w-[60px] w-[60px] h-[60px] border-dashed border-2 border-[#4c3f91] flex items-center justify-center rounded-2xl text-[#4c3f91] text-[36px]'>
                                                <a href='#'>+</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='w-[10%]'>
                                            <input
                                                type='radio'
                                                name='change-payment'
                                                id=''
                                            />
                                        </div>
                                        <div className='w-[15%]'>
                                            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#FC105533]'>
                                                <i className='text-[#FC1055]'>
                                                    <BsBank2 size={25} />
                                                </i>
                                            </div>
                                        </div>
                                        <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                                            bank transfer
                                        </div>
                                        <div className='w-[20%]'>
                                            <i className=''>
                                                <FiChevronDown size={20} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='w-[10%]'>
                                            <input
                                                type='radio'
                                                name='change-payment'
                                                id=''
                                            />
                                        </div>
                                        <div className='w-[15%]'>
                                            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#FF890033]'>
                                                <i className='text-[#FF8900]'>
                                                    <IoStorefront size={25} />
                                                </i>
                                            </div>
                                        </div>
                                        <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                                            retail
                                        </div>
                                        <div className='w-[20%]'>
                                            <i className=''>
                                                <FiChevronDown size={20} />
                                            </i>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='w-[10%]'>
                                            <input
                                                type='radio'
                                                name='change-payment'
                                                id=''
                                            />
                                        </div>
                                        <div className='w-[15%]'>
                                            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-[10px] bg-[#3366FF33]'>
                                                <i className='text-[#3366FF]'>
                                                    <FaDollarSign size={25} />
                                                </i>
                                            </div>
                                        </div>
                                        <div className='w-[100%] text-sm text-[#373a42] font-semibold tracking-[1px] capitalize'>
                                            e-money
                                        </div>
                                        <div className='w-[20%]'>
                                            <i className=''>
                                                <FiChevronDown size={20} />
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-11 md:mt-0 flex flex-col flex-1 gap-7 w-full'>
                            <div className='flex flex-col justify-start gap-12 w-full'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-[20px] text-[373a42] font-semibold tracking-[1px] capitalize'>
                                        ticket details
                                    </div>
                                </div>
                                <div className='pt-4 flex flex-col gap-3.5'>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>
                                            Event
                                        </div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>
                                            Sights & Sounds Exhibition
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>
                                            Ticket Section
                                        </div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>
                                            VIP
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>
                                            Quantity
                                        </div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>
                                            2
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-sm text-[#373a42] font-semibold tracking-[0.5px]'>
                                            Total Payment
                                        </div>
                                        <div className='text-sm text-[#4c3f91] font-semibold tracking-[0.5px]'>
                                            $70
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-11'>
                                <div className='shadow-for-all-button flex items-center justify-center bg-[#4c3f91] w-full md:w-[315px] h-[55px] rounded-2xl text-white text-base font-semibold tracking-[1px]'>
                                    <a
                                        className='h-full w-full flex items-center justify-center'
                                        href='#'>
                                        Payment
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

export default Reservation
