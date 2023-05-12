import {
    FiUser,
    FiCreditCard,
    FiEdit3,
    FiUnlock,
    FiPlusCircle,
    FiList,
    FiHeart,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
const UserSidebar = () => {
    return (
        <>
            <aside className="hidden md:block my-12 md:w-64 xl:w-80">
                <div className="flex gap-3.5 mb-14">
                    <div>
                        <div className="inline-block rounded-full p-[2px] bg-gradient-to-tr from-[#3366FF] to-[#884DFF]">
                            <img
                                className="border-4 border-white rounded-full"
                                src="https://i.pravatar.cc/48"
                                alt="nav-img-profile"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-sm text-[#373a42] font-semibold tracking-[1px]">
                            John Tompson
                        </div>
                        <div className="text-xs text-[#373a42] tracking-[0.5px]">
                            Entrepreneur, ID
                        </div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li className="mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]">
                            <a className="flex items-center gap-6" href="#">
                                <i className="">
                                    <FiUser size={22} />
                                </i>
                                Profile
                            </a>
                        </li>
                        <li>
                            <ul className="ml-7">
                                <li className="mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]">
                                    <a
                                        className="flex items-center gap-6"
                                        href="#"
                                    >
                                        <i className="">
                                            <FiCreditCard size={22} />
                                        </i>
                                        Card
                                    </a>
                                </li>
                                <li className="mb-8 text-sm text-[#3366FF] font-semibold tracking-[1px]">
                                    <a
                                        className="flex items-center gap-6"
                                        href="./edit-profile.html"
                                    >
                                        <i className="">
                                            <FiEdit3 size={22} />
                                        </i>
                                        Edit Profile
                                    </a>
                                </li>
                                <li className="mb-8 text-sm font-semibold text-[#373a42] tracking-[1px]">
                                    <a
                                        className="flex items-center gap-6"
                                        href="./change-pass.html"
                                    >
                                        <i className="">
                                            <FiUnlock size={22} />
                                        </i>
                                        Change Password
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-8 text-sm font-semibold tracking-[1px] text-[#373a42]">
                            <a
                                className="flex items-center gap-6"
                                href="./create-events.html"
                            >
                                <i className="">
                                    <FiPlusCircle size={22} />
                                </i>
                                Create Event
                            </a>
                        </li>
                        <li className="mb-8 text-sm font-semibold tracking-[1px] text-[#373a42]">
                            <a
                                className="flex items-center gap-6"
                                href="./my-booking.html"
                            >
                                <i className="">
                                    <FiList size={22} />
                                </i>
                                My Booking
                            </a>
                        </li>
                        <li className="mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]">
                            <a
                                className="flex items-center gap-6"
                                href="./my-wishlists.html"
                            >
                                <i className="">
                                    <FiHeart size={22} />
                                </i>
                                My Wishlist
                            </a>
                        </li>
                        <li className="mb-8 text-sm text-[#373a42] font-semibold tracking-[1px]">
                            <a className="flex items-center gap-6" href="#">
                                <i className="">
                                    <FiSettings size={22} />
                                </i>
                                Setting
                            </a>
                        </li>
                        <li className="mb-8 text-sm text-[#F03800] font-semibold tracking-[1px]">
                            <a
                                className="flex items-center gap-6"
                                href="./auth-login.html"
                            >
                                <i className="">
                                    <FiLogOut size={22} />
                                </i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default UserSidebar;
