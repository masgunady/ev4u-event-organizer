import logo from "../assets/img/icon-logo.svg";
import { Link } from "react-router-dom";
import {
    AiFillInstagram,
    AiFillFacebook,
    AiOutlineTwitter,
} from "react-icons/ai";
import { FaWhatsappSquare } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <div className="w-[100%] flex flex-col md:flex-row justify-center md:justify-between gap-8 lg:gap-32 pt-11 mb-7">
                <div>
                    <div className="flex justify-start items-center w-auto md:w-48 gap-3.5">
                        <div className="block">
                            <img src={logo} alt="" />
                        </div>
                        <div>
                            <Link to="/">
                                <p className="text-2xl font-semibold text-[#3366FF] tracking-[1px]">
                                    We
                                    <span className="text-[#FF3D71]">tick</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-7 text-sm text-[#373a42] font-semibold tracking-[1px]">
                        Find events you love with our!
                    </div>
                    <div className="flex items-center gap-5 md:gap-0.5 lg:gap-5 mt-4">
                        <div>
                            <Link to="">
                                <i className="text-neutral">
                                    <AiFillFacebook size={30} />
                                </i>
                            </Link>
                        </div>
                        <div>
                            <Link to="">
                                <i className="text-neutral">
                                    <FaWhatsappSquare size={30} />
                                </i>
                            </Link>
                        </div>
                        <div>
                            <Link to="">
                                <i className="text-neutral">
                                    <AiFillInstagram size={30} />
                                </i>
                            </Link>
                        </div>
                        <div>
                            <Link to="">
                                <i className="text-neutral">
                                    <AiOutlineTwitter size={30} />
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-2">
                    <div className="text-base text-[#373a42] font-semibold tracking-[1px]">
                        Wetick
                    </div>
                    <div>
                        <ul className="flex flex-col gap-4 text-sm text-[#c1c5d0] font-medium tracking-[1px]">
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Payment
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Mobile App
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-2">
                    <div className="text-base text-[#373a42] font-semibold tracking-[1px]">
                        Features
                    </div>
                    <div>
                        <ul className="flex flex-col gap-4 text-sm text-[#c1c5d0] font-medium tracking-[1px]">
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Booking
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Create Event
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Discover
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-2">
                    <div className="text-base text-[#373a42] font-semibold tracking-[1px]">
                        Company
                    </div>
                    <div>
                        <ul className="flex flex-col gap-4 text-sm text-[#c1c5d0] font-medium tracking-[1px]">
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Partnership
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Help
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#373a42]" href="#">
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="md:self-start flex-1 my-7 text-base text-[#5a7184] font-semibold tracking-[1px]">
                &copy; 2020 Wetick All Rights Reserved
            </div>
        </>
    );
};

export default Footer;
