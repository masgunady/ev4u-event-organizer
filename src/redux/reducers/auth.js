import { createSlice } from '@reduxjs/toolkit'
import { asyncLoginAction } from '../action/auth'

const initialState = {
    token: '',
    errorMessage:'',
    warningMessage:'',
    formError: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        setWarningMessage: (state, action) => {
            state.warningMessage = action.payload
        },
        
        clearMessage: (state) => {
            state.errorMessage = '',
            state.warningMessage = ''
        },
        logout: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLoginAction.rejected, (state, action) => {
            // console.log(action)
            if(typeof action.payload === 'string'){
                state.errorMessage = action.payload
            }else{
                state.formError = action.payload
            }
        })

        builder.addCase(asyncLoginAction.fulfilled, (state, action) => {
            state.token = action.payload
        })
    }

})

export const {setErrorMessage, setWarningMessage, clearMessage, logout} = authSlice.actions
export default authSlice.reducer
