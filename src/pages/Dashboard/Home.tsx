import React from 'react'
import Navbar from "../../components/Navbar"
import Banner from '../../components/Banner'
import { Box } from '@mui/material'
import CardList from '../../components/layouts/CardList'
import SearchFilter from '../../components/layouts/SearchFilter'
import Footer from '../../components/Footer'
const Home = () => {
  return (
    <div>
        <Box>
        <Navbar />
        <Banner />
        <SearchFilter />
        <CardList />
        <Footer />
        </Box>
    </div>
  )
}

export default Home