import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CreateStudent, Home, PageNotFound, Map, Dashboard } from './pages'
import { AppLayout } from './layouts'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path={'map'} element={<Map />} />
                    <Route path={'dashboard'} element={<Dashboard />} />
                    <Route path={'students'}>
                        <Route path={'create'} element={<CreateStudent />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
