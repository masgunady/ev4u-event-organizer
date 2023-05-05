import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DetailEvent from './pages/DetailEvent';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<SignIn />} />
				<Route path="/auth/register" element={<SignUp />} />
				<Route path="/auth/forgot-password" element={<ForgotPassword />} />
				<Route path="/event/detail" element={<DetailEvent />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
