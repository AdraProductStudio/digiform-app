import React from 'react'
import Header from './Header'
import Footer from './Footer'
import CardComponent from './CardComponent'

const Homepage = () => {
    return (
        <div className='layout'>
            <Header />
            <CardComponent />
            <Footer />
        </div>
    )
}

export default Homepage
