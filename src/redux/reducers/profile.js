import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataProfile: {}
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDataProfile: (state, action) => {
            state.dataProfile = action.payload
        }
    }
})

export const {setDataProfile} = profileSlice.actions
export default profileSlice.reducer
