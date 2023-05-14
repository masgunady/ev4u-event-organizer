import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import DetailEvent from './pages/DetailEvent'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import Reservation from './pages/Reservation'
import Payment from './pages/Payment'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'
import MyReservation from './pages/MyReservation'
import MyWishlist from './pages/MyWishlist'
import ManageEvent from './pages/ManageEvent'

import { store, persistor } from './redux/store'
import PrivateRoute from './components/PrivateRoute'
import { PersistGate } from 'redux-persist/lib/integration/react'
import SearchResults from './pages/SearchResults'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/auth/login' element={<SignIn />} />
                        <Route path='/auth/register' element={<SignUp />} />
                        <Route
                            path='/auth/forgot-password'
                            element={<ForgotPassword />}
                        />
                        <Route
                            path='/event/detail/:id'
                            element={<DetailEvent />}
                        />
                        <Route
                            path='/event/search'
                            element={<SearchResults />}
                        />
                        <Route
                            path='/event/reservation'
                            element={
                                <PrivateRoute>
                                    <Reservation />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/event/reservation/payment'
                            element={
                                <PrivateRoute>
                                    <Payment />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/edit-profile'
                            element={
                                <PrivateRoute>
                                    <EditProfile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/change-password'
                            element={
                                <PrivateRoute>
                                    <ChangePassword />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/manage-event'
                            element={
                                <PrivateRoute>
                                    <ManageEvent />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/reservation'
                            element={
                                <PrivateRoute>
                                    <MyReservation />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/wishlist'
                            element={
                                <PrivateRoute>
                                    <MyWishlist />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
