import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import HomepageCards from '../HomepageCards'

const Homepage = () => {
    return (
        <div className='layout'>
            <Header />
            <HomepageCards />
            <Footer />
        </div>
    )
}

export default Homepage
