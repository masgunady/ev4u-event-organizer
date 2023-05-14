import Footer from '../components/Footer'
import Header from '../components/Header'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import http from '../helpers/http'
import moment from 'moment'
import { Formik } from 'formik'
import axios from 'axios'

import { FiSearch, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { IoHome } from 'react-icons/io5'

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchResults, setSearchResults] = React.useState([])
    const [locations, setLocation] = React.useState([])

    React.useEffect(() => {
        const getEventBySearch = async () => {
            const { data } = await http().get('/event', {
                params: searchParams,
            })

            setSearchResults(data.results)
        }
        getEventBySearch()
    }, [searchParams])

    React.useEffect(() => {
        async function getLocation() {
            const { data } = await axios.get('http://localhost:8888/city')
            setLocation(data.results)
        }
        getLocation()
    }, [])

    const onSearch = (values) => {
        setSearchParams(values, '/event/search')
    }
    return (
        <>
            <div className='bg-white md:bg-[#F4F7FF]'>
                <div className='headers'>
                    <Header />
                </div>
                <div className='flex justify-center lg:mt-11'>
                    <div className='container flex flex-col gap-24 bg-white px-7 lg:px-24 py-24 lg:rounded-3xl'>
                        <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-start gap-7'>
                            <div className='w-[55px] h-[55px] hidden md:flex items-center justify-center'>
                                <Link to='/'>
                                    <i className='w-full h-full text-primary'>
                                        <IoHome size={55} />
                                    </i>
                                </Link>
                            </div>
                            <div className='w-full lg:max-w-[700px]'>
                                <div className='h-[80px] border-4  shadow-[0px_4px_10px_rgba(255,255,255,0.1)] flex flex-row items-center justify-between px-[15px] py-0 rounded-[20px]'>
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
                                                        className='w-full h-full text-secondary px-2.5 py-0 border-0 outline-none'
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
                                                        className=' w-full h-full text-secondary capitalize px-2.5 py-0 border-0 outline-none'
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
                        <div className='flex flex-wrap justify-center items-center gap-20'>
                            {searchResults.map((event) => {
                                return (
                                    <Link
                                        to={`/event/detail/${event.id}`}
                                        key={`event-${event.id}`}
                                    >
                                        <div className='w-[260px] min-w-[260px] h-[376px] overflow-hidden relative rounded-[25px]'>
                                            {event?.picture && (
                                                <img
                                                    className='w-full h-full object-cover'
                                                    src={
                                                        event.picture.startsWith(
                                                            'https'
                                                        )
                                                            ? event.picture
                                                            : `http://localhost:8888/uploads/${event.picture}`
                                                    }
                                                    alt=''
                                                />
                                            )}
                                            <div className='absolute w-full z-20 px-5 py-[0pc] bottom-[25px]'>
                                                <div className='font-medium text-sm leading-[27px] flex items-center tracking-[1px] text-white'>
                                                    {moment(event.date).format(
                                                        'LLLL'
                                                    )}
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
                        <div>
                            {searchResults.length < 1 && (
                                <div className='flex items-center justify-center font-semibold text-2xl '>
                                    Event &quot;{searchParams.get('searchName')}{' '}
                                    {` - ${searchParams.get('searchLocation')}`}
                                    &quot; Not found ...
                                </div>
                            )}
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

export default SearchResults
