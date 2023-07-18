import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth'
import profile from './profile'

const authConfig = {
    key: 'auth',
    storage: storage

}

const reducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    profile
})

export default reducer
