import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'

import React from 'react'
import { useSelector } from 'react-redux'
import http from '../helpers/http'
// import { Link } from 'react-router-dom'
import moment from 'moment'

import { FiHeart } from 'react-icons/fi'

const MyWishlist = () => {
    const [myWishlist, setMyWishlist] = React.useState([])
    const token = useSelector((state) => state.auth.token)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState('')

    // async function getMyWishlist() {
    //     const { data } = await http(token).get('/wishlist?page=1&limit=4&sort=id&sortBy=desc')
    //     setMyWishlist(data.results)
    // }

    // React.useEffect(() => {
    //     if (token) {
    //         getMyWishlist()
    //     }
    // }, [])

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
                                                <a href='#'>Detail</a>
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
