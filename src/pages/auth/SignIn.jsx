import imgFemale from '../../assets/img/female.png';
import imgMale from '../../assets/img/male.png';
import logo from '../../assets/img/icon-logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import http from '../../helpers/http';
import React from 'react';

import { FiEye } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
const SignIn = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = React.useState('');
	const [warningMessage, setWarningMessage] = React.useState(location.state?.warningMessage);
	const [token, setToken] = React.useState('');
	const doLogin = async (event) => {
		event.preventDefault();
		setErrorMessage('');
		setWarningMessage('');
		try {
			const { value: email } = event.target.email;
			const { value: password } = event.target.password;
			const body = new URLSearchParams({ email, password }).toString();
			const { data } = await http().post('http://localhost:8888/auth/login', body);
			window.localStorage.setItem('token', data.results.token);
			setToken(data.results.token);
		} catch (error) {
			const message = error?.response?.data?.message;
			setErrorMessage(message);
		}
	};

	const removeMessage = () => {
		setErrorMessage('');
		setWarningMessage('');
	};

	React.useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token, navigate]);
	return (
		<>
			<main>
				<div className="flex">
					<section className="basis-3/5 hidden lg:block">
						<div className="h-[100vh] flex items-center justify-center bg-[#4c3f91]">
							<div className="w-[549px] h-[478px] relative">
								<img className="absolute z-10" src={imgFemale} alt="" />
								<img className="absolute right-[0px] top-[100px]" src={imgMale} alt="" />
								<div className="absolute bottom-0 z-10 h-[230px] w-full bg-gradient-to-t from-[#4c3f91] from-35%"></div>
							</div>
						</div>
					</section>
					<section className="w-full lg:basis-2/5 mt-24 px-11 xl:px-24 2xl:px-36">
						<div className="w-full flex flex-col gap-3.5">
							<div className="flex justify-start items-center gap-3.5 mb-12">
								<div>
									<img src={logo} alt="" />
								</div>
								<div>
									<Link to="/">
										<p className="text-2xl font-semibold text-[#3366FF] tracking-[1px]">
											We<span className="text-[#FF3D71]">tick</span>
										</p>
									</Link>
								</div>
							</div>
							<div className="text-2xl font-semibold tracking-[1px] text-[#373A42]">Sign In</div>
							<div className="text-sm font-semibold tracking-[0.5px] text-[#373A42] mb-8">Hi, Welcome back to Urticket!</div>
							{errorMessage && <div className="alert alert-error">{errorMessage}</div>}
							{warningMessage && <div className="alert alert-warning">{warningMessage}</div>}
							<form onSubmit={doLogin} className="flex flex-col gap-3.5">
								<div className="text-sm tracking[0.5]">
									<input onFocus={removeMessage} className="w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl" type="text" name="email" placeholder="Email" />
								</div>
								<div className="hidden items-center justify-start text-sm text-red-500 font-medium tracking[0.5]"></div>
								<div className="text-sm tracking[0.5] relative">
									<input onFocus={removeMessage} className="w-full h-14 px-3 outline-[#C1C5D0] border-2 rounded-xl" type="password" name="password" placeholder="Password" />
									<div className="absolute top-[18px] right-4 text-[#4c3f91]">
										<i className="">
											<FiEye size={20} />
										</i>
									</div>
								</div>
								<div className="hidden items-center justify-start text-sm text-red-500 font-medium tracking[0.5]"></div>
								<div className="hidden items-center justify-center text-sm text-red-500 font-medium tracking[0.5]"></div>
								<div className="self-end text-sm text-[#4c3f91] font-semibold tracking[0.5] my-3">
									<Link to="/auth/forgot-password">Forgot Password ?</Link>
								</div>
								<div>
									<button type="submit" className="shadow-for-all-button w-full h-14 rounded-xl bg-[#4c3f91] text-base font-semibold tracking-[1px] text-white">
										Sign In
									</button>
								</div>
							</form>
							<div className="flex flex-col items-center justify-center gap-4 mt-12">
								<div className="text-sm tracking[0.5] text-[#373A42]">or sign in with</div>
								<div className="flex items-center justify-center gap-4">
									<div className="w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer">
										<i className="">
											<FcGoogle size={25} />
										</i>
									</div>
									<div className="w-24 h-14 flex items-center justify-center rounded-md border-2 border-[#4c3f91] cursor-pointer">
										<i className="">
											<FaFacebook size={25} />
										</i>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default SignIn;
