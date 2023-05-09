import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DetailEvent from './pages/DetailEvent';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Reservation from './pages/Reservation';
import Payment from './pages/Payment';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import MyReservation from './pages/MyReservation';
import MyWishlist from './pages/MyWishlist';
import ManageEvent from './pages/ManageEvent';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<SignIn />} />
				<Route path="/auth/register" element={<SignUp />} />
				<Route path="/auth/forgot-password" element={<ForgotPassword />} />
				<Route path="/event/detail/:id" element={<DetailEvent />} />
				<Route path="/event/reservation" element={<Reservation />} />
				<Route path="/event/reservation/payment" element={<Payment />} />
				<Route path="/user/edit-profile" element={<EditProfile />} />
				<Route path="/user/change-password" element={<ChangePassword />} />
				<Route path="/user/reservation" element={<MyReservation />} />
				<Route path="/user/wishlist" element={<MyWishlist />} />
				<Route path="/user/manage-event" element={<ManageEvent />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
