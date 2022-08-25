import React from 'react'
import { Link } from 'react-router-dom'

import { useTitle } from '../../../hooks'

const PageNotFound = () => {
    useTitle('Page Not Found | Brintell Desafio')

    return (
        <div>
            <h2>404</h2>

            <div>
                <h3>Oops! Page not found.</h3>

                <p>
                    We could not find the page you were looking for. Meanwhile, you may <Link to={'/'}>return to home</Link>.
                </p>
            </div>
        </div>
    )
}

export default PageNotFound
