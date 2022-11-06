import React from 'react'
import Navbar from "../../components/Navbar"
import Banner from '../../components/Banner'
import { Box } from '@mui/material'
import CardList from '../../components/layouts/CardList'
import SearchFilter from '../../components/layouts/SearchFilter'
import Footer from '../../components/Footer'
import Header from '../../components/layouts/Header'
const Home = () => {
  return (
    <div>
        <Box>
        <Navbar />
        {/* <Banner /> */}
        <Header title="Search Cards" subtitle="Owl Store > Search Cards" />
        <SearchFilter />
        <CardList />
        <Footer />
        </Box>
    </div>
  )
}

export default Home