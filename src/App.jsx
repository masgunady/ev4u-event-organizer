import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DetailEvent from './pages/DetailEvent';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Reservation from './pages/Reservation';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<SignIn />} />
				<Route path="/auth/register" element={<SignUp />} />
				<Route path="/auth/forgot-password" element={<ForgotPassword />} />
				<Route path="/event/detail" element={<DetailEvent />} />
				<Route path="/event/reservation" element={<Reservation />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
