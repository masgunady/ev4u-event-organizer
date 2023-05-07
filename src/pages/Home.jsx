import Header from '../components/Header';
import Footer from '../components/Footer';

import male from '../assets/img/male.png';
import female from '../assets/img/female.png';
// import event from '../assets/img/event-1.png';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { FiSearch, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

import React from 'react';
import axios from 'axios';

const Home = () => {
	const [events, setEvent] = React.useState([]);
	React.useEffect(() => {
		async function getData() {
			const { data } = await axios.get('http://localhost:8888/event');
			setEvent(data.results);
		}
		getData();
	}, []);
	return (
		<>
			<div className="bg-white md:bg-[#F4F7FF]">
				<div className="headers">
					<Header />
				</div>
				<div className="prt-main">
					<div className="flex flex-col-reverse lg:flex-row justify-between w-full h-[750px] bg-[#4c3f91] bg-head-pattern bg-no-repeat bg-cover  items-center gap-2.5 overflow-hidden pt-[140px] pb-[50px] px-[30px] md:px-[50px]">
						<div className="w-[90%] h-[55%] absolute z-10 sm:static md:w-full lg:w-[45%] lg:max-w-[650px]">
							<div className="w-full h-full relative sm:static flex flex-col gap-[30px]">
								<div className="font-semibold text-[36px] sm:text-[64px] absolute top-0 sm:static text-center sm:text-start leading-[54px] lg:leading-[96px] tracking-[2px] text-white">Find events you love with our</div>
								<div className="absolute bottom-0 sm:static w-full h-[75px] bg-white shadow-[0px_4px_10px_rgba(255,255,255,0.1)] flex flex-row items-center justify-between px-[15px] py-0 rounded-[20px]">
									<form action="" className="w-full flex items-center justify-between gap-[3px]">
										<i className="">
											<FiSearch size={20} />
										</i>
										<input type="text" placeholder="Search event..." className="w-[45%] h-[45px] px-2.5 py-0 border-0 outline-none" />
										<i className="">
											<FiMapPin size={20} />
										</i>
										<input type="text" placeholder="Where?" className="w-[45%] h-[45px] px-2.5 py-0 border-0 outline-none" />
										<button className="w-[45px] h-[45px] shadow-[0px_8px_10px_rgba(51,102,255,0.15)] cursor-pointer flex items-center justify-center rounded-[10px] border-[none] bg-[#ff3d71]">
											<i className="text-white">
												<FiArrowRight size={25} />
											</i>
										</button>
									</form>
								</div>
							</div>
						</div>
						<div className="">
							<div className="relative min-w-[530px] h-[470px] overflow-hidden ">
								<img src={male} alt="" className="absolute object-cover right-0 top-[130px]" />
								<img src={female} alt="" className="absolute z-[1] object-cover left-0" />
								<div className="w-full left-0 h-[200px] absolute z-[2] bottom-0 bg-gradient-to-t from-[#4c3f91] from-35%"></div>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center gap-[25px] w-full mt-[100px]">
						<div className="">
							<button className="flex justify-center items-center gap-3 w-[150px] h-[30px] font-semibold text-xs leading-[18px] tracking-[3px] uppercase text-[#ff3d71] rounded-[30px] border-[none] outline-none bg-[#FF3D7140]">
								<i className="">
									<HiArrowLongLeft size={20} />
								</i>
								Event
							</button>
						</div>
						<div className="font-semibold text-4xl leading-[54px] text-[#333333] pb-10">Event For You</div>
						<div className="flex items-start justify-center gap-[30px] md:gap-[60px]">
							<button className="hidden sm:flex items-center justify-center w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] cursor-pointer rounded-[10px] border-[none] bg-white">
								<i className="">
									<HiArrowLongLeft size={20} />
								</i>
							</button>
							<div className="flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]">
								<p>15</p>
								<p>Wed</p>
							</div>
							<div className="flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]">
								<p>15</p>
								<p>Wed</p>
							</div>
							<div className="flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] w-[50px] h-[75px] border text-[#ff8900] rounded-2xl border-solid border-[#ff8900]">
								<p>15</p>
								<p>Wed</p>
								<p>&bull;</p>
							</div>
							<div className="flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]">
								<p>1 5</p>
								<p>Wed</p>
							</div>
							<div className="flex flex-col justify-center items-center font-medium text-xs leading-[18px] tracking-[0.0003375px] text-[#c1c5d0]">
								<p>15</p>
								<p>Wed</p>
							</div>
							<button className="hidden sm:flex items-center justify-center w-[45px] h-[45px] shadow-[0px_2px_15px_rgba(26,60,68,0.08)] cursor-pointer rounded-[10px] border-[none] bg-[#4c3f91]">
								<i className="text-white">
									<HiArrowLongRight size={20} />
								</i>
							</button>
						</div>

						<div className="w-full flex items-center justify-end">
							<div className="w-[90%] flex justify-start items-center gap-[30px] object-cover overflow-scroll overflow-y-hidden px-0 py-[50px]">
								{events.map((event) => {
									return (
										<React.Fragment key={event.id}>
											<div className="w-[260px] min-w-[260px] h-[376px] overflow-hidden relative rounded-[35px]">
												<img src={`http://localhost:8888/uploads/${event.picture}`} alt="" className="w-full h-full object-cover" />
												<div className="absolute w-full z-20 px-5 py-[0pc] bottom-[25px]">
													<div className="font-medium text-sm leading-[27px] flex items-center tracking-[1px] text-white">{moment(event.date).format('LLLL')}</div>
													<div className="font-semibold capitalize text-[22px] leading-[30px] flex items-center tracking-[2px] text-white pb-5">
														<Link to="">{event.title}</Link>
													</div>
													<div className="flex justify-start items-center ml-2.5">
														<div className="w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white">
															<img src="https://i.pravatar.cc/28" alt="" />
														</div>
														<div className="w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white">
															<img src="https://i.pravatar.cc/28" alt="" />
														</div>
														<div className="w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white">
															<img src="https://i.pravatar.cc/28" alt="" />
														</div>
														<div className="w-7 h-7 overflow-hidden border -ml-2.5 rounded-[50%] border-solid border-white">
															<img src="https://i.pravatar.cc/28" alt="" />
														</div>
													</div>
												</div>
												<div className="w-full h-[350px] absolute z-10 bottom-0 bg-gradient-to-t from-[#000000] from-5%"></div>
											</div>
										</React.Fragment>
									);
								})}
							</div>
						</div>
						<div className="btn-see-event">
							<button>See All</button>
						</div>
					</div>
				</div>
				<footer className="md:bg-[#F4F7FF] w-[100%] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-80">
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Home;
