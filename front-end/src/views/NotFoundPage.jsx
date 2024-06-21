import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import error from "../assets/img/not-found.svg";
const NotFoundPage = () => {
    return (
        <div>

            <div class="container">

                <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>The page you are looking for doesn't exist.</h2>
                    <Link class="btn" to="/">Back to home</Link>
                    <img src={error} class="img-fluid py-5" alt="Page Not Found" />

                </section>

            </div>

            <Footer />
        </div>
    )
}

export default NotFoundPage
