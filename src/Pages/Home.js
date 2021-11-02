import React, { useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import BodyImage from '../Components/Body/Body'
import './Home.css'
import Footer from '../Components/Footer/Footer'

function Home() {
    
    return (
        <div className='background'>
            <Navbar/>
            <BodyImage/>
            <Footer/>
        </div>
    )
}

export default Home
