import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import AppRoutes from './routes'

function App() {
    return (
        <>
            <AppRoutes />
            <ToastContainer />
        </>
    )
}

export default App
