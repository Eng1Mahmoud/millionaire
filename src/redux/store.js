import {configureStore} from  '@reduxjs/toolkit'
import ActiveUserSlice from './acticeUser'
const store = configureStore({
    reducer:{
        ActiveUserSlice,
    }
})

export default store