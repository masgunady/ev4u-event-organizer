import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'

import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
import moment from 'moment'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Image from '../components/Image'
import { FiHeart } from 'react-icons/fi'
import defaultImage from '../assets/img/event-1.png'

const MyWishlist = () => {
    const [myWishlist, setMyWishlist] = React.useState([])
    const token = useSelector((state) => state.auth.token)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState('')
    const [detailEvent, setDetailEvent] = React.useState({})
    const [modalAction, setModalAction] = React.useState('')
    const [openModalEvent, setOpenModalEvent] = React.useState(false)

    const getMyWishlist = React.useCallback(async () => {
        const { data } = await http(token).get(`/wishlist?page=${currentPage}&limit=4&sort=id&sortBy=DESC`)
        setTotalPage(data.totalPage)
        setMyWishlist(data.results)
    }, [token, currentPage])

    React.useEffect(() => {
        async function getEventByMe() {
            const { data } = await http(token).get(`/wishlist?page=${currentPage}&limit=4&sort=id&sortBy=DESC`)
            setTotalPage(data.totalPage)
            setMyWishlist(data.results)
        }
        if (token) {
            getEventByMe()
        }
    }, [token, setMyWishlist, currentPage])

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

    const addRemoveWishlist = async (eventId) => {
        try {
            const id = { eventId: eventId }
            const qString = new URLSearchParams(id).toString()
            const { data } = await http(token).post('wishlist', qString)
            if (data.results) {
                console.log(data.results)
                getMyWishlist()
            }
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                console.log(message)
            }
        }
    }

    const handleModalEvent = async (paramId, action) => {
        setOpenModalEvent(true)
        setModalAction(action)
        if (action === 'detail') {
            const { data } = await http(token).get(`/event/${paramId}`)
            setDetailEvent(data.results)
        }
    }

    const handleCloseModalEvent = () => {
        setModalAction('')
        setOpenModalEvent(false)
        setDetailEvent({})
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
                        <div className='bg-white px-9 lg:px-12 py-9 lg:py-11 rounded-2xl md:min-h-[920px] relative'>
                            <div className='flex flex-col gap-6 md:gap-0 md:flex-row md:items-center md:justify-between mb-7'>
                                <div className='text-xl text-[#373a42] font-semibold tracking-[1px]'>My Wishlist</div>
                            </div>
                            {myWishlist.map((wishlist) => {
                                return (
                                    <div className='flex items-center justify-start gap-6 border-b-2 py-7' key={`my-wishlist-${wishlist.wishlistId}`}>
                                        <div className='flex flex-col items-center justify-center gap-[5px]'>
                                            <div className='w-[50px] h-[75px] flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg'>
                                                <div className='text-sm font-semibold text-[#FF8900]'>{moment(wishlist?.date).format('DD')}</div>
                                                <div className='text-xs font-medium text-[#C1C5D0]'>{moment(wishlist?.date).format('LLLL').slice(0, 3)}</div>
                                            </div>
                                            <div className='block md:hidden'>
                                                <div className='flex items-center justify-center h-[50px] w-[50px] text-[#3366ff]'>
                                                    <button onClick={addRemoveWishlist}>
                                                        <i className=''>
                                                            <FiHeart size={25} />
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start justify-start text-[#373A42] gap-[5px] w-full'>
                                            <div className='text-2xl font-semibold tracking-[2px] mb-3.5 capitalize'>{wishlist?.title}</div>
                                            <div className='text-xs tracking-[0.5px] capitalize'>{wishlist?.location}, Indonesia</div>
                                            <div className='text-xs tracking-[0.5px]'>{moment(wishlist?.date).format('LLLL')}</div>
                                            <div className='text-xs traacking-[0.5px] text-[#3366FF]'>
                                                <button onClick={() => handleModalEvent(wishlist.eventId, 'detail')}>Detail</button>
                                            </div>
                                        </div>
                                        <div className='hidden md:block'>
                                            <div className='flex items-start justify-end h-[100px] w-[50px] text-[#3366ff]'>
                                                <button onClick={() => addRemoveWishlist(`${wishlist.eventId}`)}>
                                                    <i className=''>
                                                        <FiHeart size={25} />
                                                    </i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {myWishlist.length < 1 && (
                                <div>
                                    <div className=' h-full flex flex-col items-center justify-center gap-7 '>
                                        <div className='font-semibold text-2xl text-secondary'>No Wishlist Found</div>
                                        <div className='font-medium text base max-w-[300px] text-center'>It seems that you haven&apos;t added any wishlists yet. Maybe try looking for this?</div>
                                    </div>
                                </div>
                            )}
                            {myWishlist.length >= 1 && (
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
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Name</div>
                                                            <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEvent?.title}</div>
                                                        </div>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Location</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEvent?.location}</div>
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm text-[#373a42] tracking-[1px]'>Category</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEvent?.eventCategory}</div>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col align-start justify-start gap-3.5 w-full'>
                                                            <div className='text-sm  tracking-[1px] text-secondary capitalize'>Date Time Show</div>
                                                            <div className='w-full'>
                                                                <div className='w-full text-lg font-semibold text-secondary capitalize'>{moment(detailEvent?.date).format('LLLL')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-start w-full flex-1'>
                                                    <div className='flex flex-col gap-3.5 w-full justify-center items-center'>
                                                        {detailEvent && (
                                                            <div className='w-[291px] h-[352px] relative overflow-hidden rounded-xl'>
                                                                {<Image className='w-full h-full border-4 border-white rounded-xl object-cover' src={detailEvent?.picture || null} defaultImg={defaultImage} />}
                                                                {/* <div className='absolute bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center'></div> */}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-[20px] text-[#373a42] font-semibold tracking-[1px] mt-11'>
                                                <div className='text-sm text-[#373a42] tracking-[1px] mb-3'>Detail</div>
                                                <div className='w-full'>
                                                    <div className='w-full text-lg font-semibold text-secondary capitalize'>{detailEvent?.descriptions}</div>
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

export default MyWishlist
