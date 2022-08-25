import React from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../../components'

const AppLayout = () => {
    return (
        <>
            <Header />
            <div className="container py-5 my-5">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default AppLayout
