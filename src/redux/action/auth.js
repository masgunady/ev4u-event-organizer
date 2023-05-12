import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../helpers/http";

export const asyncLoginAction = createAsyncThunk(
    'auth/login',
    async (payload, {rejectWithValue}) => {
        try {
            const body = new URLSearchParams(payload).toString()
            const {data} = await http().post('auth/login', body)
            return data.results.token
        } catch (err) {
            const resultsError = err?.response?.data?.results
            const messageError = err?.response?.data?.message
            if(resultsError){
                return rejectWithValue(resultsError)
            }
            if(err.code === 'ERR_NETWORK'){
                
                return rejectWithValue('Error: Connection to backend failed!')
            }
            return rejectWithValue(messageError)
        }
    }
)