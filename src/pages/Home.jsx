import Header from '../components/Header'
import Footer from '../components/Footer'

import male from '../assets/img/male.png'
import female from '../assets/img/female.png'

import { Link } from 'react-router-dom'
import moment from 'moment'

import { FiSearch, FiMapPin, FiArrowRight, FiMinus } from 'react-icons/fi'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

import React from 'react'

import { useNavigate } from 'react-router-dom'
import http from '../helpers/http'

import { Formik } from 'formik'

const Home = () => {
    const [events, setEvent] = React.useState([])
    const [eventCategories, setEventCategory] = React.useState([])
    const [locations, setLocation] = React.useState([])
    const [partners, setPartner] = React.useState([])
    const [categories, setCategory] = React.useState([])
    const [tabEvent, setTabEvent] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState()
    const [activeTabCategory, setActiveTabCategory] = React.useState('music')

    const navigate = useNavigate()

    React.useEffect(() => {
        async function getData() {
            const { data } = await http().get('/event')
            setEvent(data.results)
        }
        getData()
    }, [])

    React.useEffect(() => {
        async function getLocation() {
            const { data } = await http().get('/city')
            setLocation(data.results)
        }
        getLocation()
    }, [])

    React.useEffect(() => {
        async function getPartner() {
            const { data } = await http().get('/partner')
            setPartner(data.results)
        }
        getPartner()
    }, [])

    React.useEffect(() => {
        async function getCategory() {
            const { data } = await http().get('/category')
            setCategory(data.results)
        }
        getCategory()
    }, [])

    React.useEffect(() => {
        async function getEventCategory() {
            const { data } = await http().get(
                `/event?searchCategory=${activeTabCategory}&page=1&limit=3`
            )
            setTotalPage(data.totalPage)
            setEventCategory(data.results)
        }
        getEventCategory()
    }, [activeTabCategory])

    React.useEffect(() => {
        async function getEventCategoryNext() {
            const { data } = await http().get(
                `/event?searchCategory=${activeTabCategory}&page=${tabEvent}&limit=3`
            )

            setEventCategory(data.results)
        }
        getEventCategoryNext()
    }, [tabEvent, activeTabCategory])

    const handleTabClicked = (category) => {
        setTabEvent(1)
        setActiveTabCategory(category)
    }

    const handlePrev = () => {
        if (tabEvent > 1) {
            setTabEvent(tabEvent - 1)
        }
    }

    const handleNext = () => {
        if (tabEvent + 1 <= totalPage) {
            setTabEvent(tabEvent + 1)
        }
    }

    const onSearch = (values) => {
        const qStrings = new URLSearchParams(values).toString()
        navigate(`/event/search?${qStrings}`)

        // setSearchParams(values, '/event/search')
    }

    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <div className='prt-main'>
                    <div className='flex flex-col-reverse lg:flex-row justify-between w-full h-[750px] bg-[#4c3f91] bg-head-pattern bg-no-repeat bg-cover  items-center gap-2.5 overflow-hidden pt-[140px] pb-[50px] px-[30px] md:px-[50px]'>
                        <div className='w-[90%] h-[500px] absolute z-10 sm:static md:w-full lg:w-[45%] lg:max-w-[650px]'>
                            <div className='w-full h-full relative sm:static flex flex-col gap-[50px]'>
                                <div className='font-semibold text-[36px] md:text-[64px] absolute top-0 sm:static text-center sm:text-start leading-[54px] lg:leading-[95px] tracking-[2px] text-white'>
                                    Find events you love with our
                                </div>
                                <div className='absolute bottom-0 sm:static w-full h-[75px] bg-white shadow-[0px_4px_10px_rgba(255,255,255,0.1)] flex flex-row items-center justify-between px-[15px] py-0 rounded-[20px]'>
                                    <Formik
                                        initialValues={{
                                            searchName: '',
                                            searchLocation: '',
                                        }}
                                        onSubmit={onSearch}
                                    >
                                        {({
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                        }) => (
                                            <form
                                                onSubmit={handleSubmit}
                                                className='w-full flex items-center justify-between gap-[3px]'
                                            >
                                                <i className=''>
                                                    <FiSearch size={20} />
                                                </i>
                                                <div className='form-control w-[45%] h-[45px]'>
                                                    <input
                                                        type='text'
                                                        name='searchName'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='Search event...'
                                                        className='w-full h-full px-2.5 py-0 border-0 outline-none'
                                                    />
                                                </div>
                                                <i className=''>
                                                    <FiMapPin size={20} />
                                                </i>
                                                <div className='form-control w-[45%] h-[45px]'>
                                                    <select
                                                        name='searchLocation'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        className='select  w-full h-full text-secondary capitalize px-2.5 py-0 border-0 outline-none'
                                                        id=''
                                                    >
                                                        <option value=''>
                                                            Select Location
                                                        </option>
                                                        {locations.map(
                                                            (location) => {
                                                                return (
                                                                    <option
                                                                        key={`location-select-${location.id}`}
                                                                        value={
                                                                            location.name
                                                                        }
                                                                    >
                                                                        {
                                                                            location.name
                                                                        }
                                                                    </option>
                                                                )
                                                            }
                                                        )}
                                                    </select>
                                                </div>

                                                <button
                                                    type='submit'
                                                    className='w-[45px] h-[45px] shadow-[0px_8px_10px_rgba(51,102,255,0.15)] cursor-pointer flex items-center justify-center rounded-[10px] border-[none] bg-[#ff3d71]'
                                                >
                                                    <i className='text-white'>
                                                        <FiArrowRight
                                                            size={25}
                                                        />
                                                    </i>
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='relative min-w-[530px] h-[470px] overflow-hidden '>
                                <img
                                    src={male}
                                    alt=''
                                    className='absolute object-cover right-0 top-[130px]'
                                />
                                <img
                                    src={female}
                                    alt=''
                                    className='absolute z-[1] object-cover left-0'
                                />
                                <div className='w-full left-0 h-[200px] absolute z-[2] bottom-0 bg-gradient-to-t from-[#4c3f91] from-35%'></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-[25px] w-full mt-[100px]'>
                        <div className=''>
                            <button className='flex justify-center items-center gap-3 w-[150px] h-[30px] font-semibold text-xs leading-[18px] tracking-[3px] uppercase text-[#ff3d71] rounded-[30px] border-[none] outline-none bg-[#FF3D7140]'>
                                <i className=''>
                                    <HiArrowLongLeft size={20} />
                                </i>
                                Event
                            </button>
                        </div>
                        <div className='font-semibold text-4xl leading-[54px] text-[#333333] pb-10'>
                            Event For You
                        </div>
                        <div className='flex items-start justify-center gap-[30px] md:gap-[60px]'>
                            <button className='hidden sm:flex items-center justify-center w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] cursor-pointer rounded-[10px] border-[none] bg-white'>
                                <i className=''>
                                    <HiArrowLongLeft size={20} />
                                </i>
                            </button>
                            <div className='flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]'>
                                <p>13</p>
                                <p>Wed</p>
                            </div>
                            <div className='flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]'>
                                <p>14</p>
                                <p>Wed</p>
                            </div>
                            <div className='flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] w-[50px] h-[75px] border text-[#ff8900] rounded-2xl border-solid border-[#ff8900]'>
                                <p>15</p>
                                <p>Wed</p>
                                <p>&bull;</p>
                            </div>
                            <div className='flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]'>
                                <p>16</p>
                                <p>Wed</p>
                            </div>
                            <div className='flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]'>
                                <p>17</p>
                                <p>Wed</p>
                            </div>
                            <button className='hidden sm:flex items-center justify-center w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] cursor-pointer rounded-[10px] border-[none] bg-[#4c3f91]'>
                                <i className='text-white'>
                                    <HiArrowLongRight size={20} />
                                </i>
                            </button>
                        </div>

                        <div className='w-full flex items-center justify-end'>
                            <div className='w-[90%] flex justify-start items-center gap-[30px] object-cover scrollbar-hide overflow-scroll overflow-y-hidden px-0 py-[50px]'>
                                {events.map((event) => {
                                    return (
                                        <Link
                                            to={`/event/detail/${event.id}`}
                                            key={`event-${event.id}`}
                                        >
                                            <div className='w-[260px] min-w-[260px] h-[376px] overflow-hidden relative rounded-[35px]'>
                                                {event?.picture && (
                                                    <img
                                                        className='w-full h-full object-cover'
                                                        src={
                                                            event.picture.startsWith(
                                                                'https'
                                                            )
                                                                ? event.picture
                                                                : `${
                                                                      import.meta
                                                                          .env
                                                                          .VITE_BACKEND_URL
                                                                  }/uploads/${
                                                                      event.picture
                                                                  }`
                                                        }
                                                        alt=''
                                                    />
                                                )}
                                                <div className='absolute w-full z-20 px-5 py-[0pc] bottom-[25px]'>
                                                    <div className='font-medium text-sm leading-[27px] flex items-center tracking-[1px] text-white'>
                                                        {moment(
                                                            event.date
                                                        ).format('LLLL')}
                                                    </div>
                                                    <div className='font-semibold capitalize text-[22px] leading-[30px] flex items-center tracking-[2px] text-white pb-5'>
                                                        <div>{event.title}</div>
                                                    </div>
                                                    <div className='flex justify-start items-center ml-2.5'>
                                                        <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                            <img
                                                                src='https://i.pravatar.cc/28'
                                                                alt=''
                                                            />
                                                        </div>
                                                        <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                            <img
                                                                src='https://i.pravatar.cc/28'
                                                                alt=''
                                                            />
                                                        </div>
                                                        <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                            <img
                                                                src='https://i.pravatar.cc/28'
                                                                alt=''
                                                            />
                                                        </div>
                                                        <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                            <img
                                                                src='https://i.pravatar.cc/28'
                                                                alt=''
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full h-[400px] absolute z-10 bottom-0 bg-gradient-to-t from-[#000000] from-5%'></div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-[255px] h-10 border font-semibold text-sm leading-[21px] text-center tracking-[1px] bg-white text-[#4c3f91] cursor-pointer rounded-[10px] border-solid border-[#4c3f91]'>
                            <Link to='/event/search' className=''>
                                See All
                            </Link>
                        </div>
                    </div>
                    <div className='dsp-locaion w-full flex flex-col items-center justify-center px-0 py-[70px]'>
                        <div className='dsp-locaion-cont w-[90%] max-w-[1340px] flex flex-col items-center overflow-hidden bg-[#4c3f91] bg-location-pattern bg-no-repeat bg-cover px-11 md:px-20 py-[70px] rounded-[50px]'>
                            <div className='h-[70px] self-start'>
                                <div className='w-40 h-[30px] flex justify-center items-center cursor-pointer bg-[#FFFFFF40] font-semibold text-xs leading-[18px] tracking-[3px] text-white rounded-[30px] border-[none] uppercase'>
                                    <i className=''>
                                        <FiMinus />
                                    </i>
                                    location
                                </div>
                            </div>
                            <div className='h-[600px] lg:h-auto overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-12 xl:gap-16 '>
                                <div className=''>
                                    <div className='w-[200px] h-[180px] text-[36px] trackong-[1px] text-white font-semibold'>
                                        <div>Discover Events Near You</div>
                                    </div>
                                </div>
                                {locations.map((location) => {
                                    return (
                                        <React.Fragment
                                            key={`location-${location.id}`}
                                        >
                                            <div className='flex flex-col items-center gap-[15px] font-medium text-base leading-6 tracking-[1px] text-white'>
                                                {location?.picture && (
                                                    <img
                                                        className='rounded-2xl overflow-hidden'
                                                        src={
                                                            location.picture.startsWith(
                                                                'https'
                                                            )
                                                                ? location.picture
                                                                : `http://localhost:8888/uploads/${location.picture}`
                                                        }
                                                        alt=''
                                                    />
                                                )}
                                                <div className='capitalize'>
                                                    {location.name}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='self-center pt-[50px]'>
                                <button className='w-[255px] h-10 border font-semibold text-sm leading-[21px] text-center tracking-[1px] text-[#4c3f91] cursor-pointer rounded-[10px] border-solid border-[#4c3f91] bg-white'>
                                    See All
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='dsp-category flex flex-col items-center justify-center'>
                        <div className='w-[150px] h-[30px] flex justify-center items-center font-semibold text-xs leading-[18px] tracking-[3px] uppercase text-[#ff3d71] rounded-[30px] border-[none] left-[609px] top-[925px] outline-none bg-[#FF3D7140]'>
                            <i>
                                <FiMinus />
                            </i>
                            categories
                        </div>
                        <div className='font-semibold text-4xl leading-[177.78%] tracking-[1px] text-[#373a42] flex items-center text-center mt-[25px]'>
                            Browse Event By Category
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <div className='w-[85%] md:max-w-[900px] flex justify-between items-center gap-20 object-cover scrollbar-hide overflow-scroll overflow-y-hidden px-0 py-[50px]'>
                                {categories.map((category) => {
                                    return (
                                        <React.Fragment
                                            key={`category-${category.id}`}
                                        >
                                            <div className='font-medium text-base leading-6 text-secondary  cursor-pointer capitalize list-none hover:text-[#373a42]'>
                                                <button
                                                    onClick={() =>
                                                        handleTabClicked(
                                                            category.name
                                                        )
                                                    }
                                                    className={`capitalize hover:border-b-2 hover:font-semibold hover:border-primary hover:opacity-100 ${
                                                        activeTabCategory ===
                                                        category.name
                                                            ? 'border-b-2 font-semibold border-primary'
                                                            : 'opacity-60'
                                                    }`}
                                                >
                                                    {category.name}
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <div className='w-[90%] md:max-w-[85%] flex justify-between items-center gap-11 object-cover scrollbar-hide overflow-scroll overflow-y-hidden px-0 py-[50px]'>
                                <div>
                                    <button
                                        onClick={handlePrev}
                                        className='hidden btn btn-neutral w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] md:flex items-center justify-center cursor-pointer mr-[50px] rounded-[10px] border-[none]'
                                    >
                                        <i className='text-secondary'>
                                            <HiArrowLongLeft size={25} />
                                        </i>
                                    </button>
                                </div>

                                {eventCategories.map((eventCategory) => {
                                    return (
                                        <Link
                                            to={`/event/detail/${eventCategory.id}`}
                                            key={`eventCategory-${eventCategory.id}`}
                                        >
                                            <div className='relative overflow-hidden min-w-[300px] h-[350px] rounded-[40px]'>
                                                {eventCategory?.picture && (
                                                    <img
                                                        src={
                                                            eventCategory.picture.startsWith(
                                                                'https'
                                                            )
                                                                ? eventCategory.picture
                                                                : `http://localhost:8888/uploads/${eventCategory.picture}`
                                                        }
                                                        alt=''
                                                        className='absolute bottom-24 w-full'
                                                    />
                                                )}
                                                <div className='w-full h-[45%] absolute bottom-0 bg-[#4c3f91]'>
                                                    <div className='px-11'>
                                                        <div className='absolute flex z-[1] ml-2.5 mb-5 bottom-[125px]'>
                                                            <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                                <img
                                                                    src='https://i.pravatar.cc/28'
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                                <img
                                                                    src='https://i.pravatar.cc/28'
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                                <img
                                                                    src='https://i.pravatar.cc/28'
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white'>
                                                                <img
                                                                    src='https://i.pravatar.cc/28'
                                                                    alt=''
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='font-medium text-sm leading-[27px] w-[70%] tracking-[1px] text-white absolute z-10 mb-[5px] bottom-20'>
                                                            {moment(
                                                                eventCategory.date
                                                            ).format('LLLL')}
                                                        </div>
                                                        <div className='capitalize font-semibold text-[22px] leading-[30px] tracking-[2px] text-white absolute z-10 pr-[30px] bottom-[25px]'>
                                                            {
                                                                eventCategory.title
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                                <div>
                                    <button
                                        onClick={handleNext}
                                        className='hidden btn btn-primary w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] md:flex items-center justify-center cursor-pointer mr-[50px] rounded-[10px] border-[none]'
                                    >
                                        <i className='text-white'>
                                            <HiArrowLongRight size={25} />
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full  flex flex-col items-center justify-center'>
                        <div className='flex  justify-between items-between gap-16'>
                            <button
                                onClick={handlePrev}
                                className='btn btn-neutral w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] flex flex-row md:hidden items-center justify-center cursor-pointer rounded-[10px] border-[none]'
                            >
                                <i className='text-secondary'>
                                    <HiArrowLongLeft size={25} />
                                </i>
                            </button>
                            <button
                                onClick={handleNext}
                                className='btn btn-primary w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] flex md:hidden items-center justify-center cursor-pointer rounded-[10px] border-[none]'
                            >
                                <i className='text-white'>
                                    <HiArrowLongRight size={25} />
                                </i>
                            </button>
                        </div>
                    </div>
                    <div className='dsp-partner flex flex-col justify-center items-center bg-partner-pattern bg-no-repeat bg-cover mt-[120px] px-[30px] py-[90px] bg-[#373a42]'>
                        <div className='btns-partner'>
                            <div className='flex justify-center items-center font-semibold text-xs leading-[18px] tracking-[3px] text-white w-[150px] h-[30px] cursor-pointer bg-[#FFFFFF40] mb-[25px] rounded-[30px] border-[none] uppercase'>
                                <i className=''>
                                    <FiMinus />
                                </i>
                                partner
                            </div>
                        </div>
                        <div className='font-semibold text-4xl leading-[54px] tracking-[1px] text-white text-center mb-[15px]'>
                            Our Trusted Partners
                        </div>
                        <div className='font-normal text-xs leading-[233.33%] tracking-[0.5px] text-[#c1c5d0] text-center mb-[50px]'>
                            By companies like :
                        </div>
                        <div className='w-full flex flex-wrap justify-center items-center gap-14'>
                            {partners.map((partner) => {
                                return (
                                    <div key={partner.id}>
                                        {partner?.picture && (
                                            <img
                                                src={
                                                    partner.picture.startsWith(
                                                        'https'
                                                    )
                                                        ? partner.picture
                                                        : `http://localhost:8888/uploads/${partner.picture}`
                                                }
                                                alt=''
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <footer className='md:bg-[#F4F7FF] w-[100%] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-80'>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default Home
