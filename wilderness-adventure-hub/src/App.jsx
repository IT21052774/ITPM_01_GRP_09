import React, { useEffect, useState } from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

import './App.css';
import axios from 'axios';
import config from './config';
import Loading from './components/Loading/Loading';
import CustomPackage from './components/pacakges/CustomPackage';
import Chat from './components/chat/Chat';

const App = () => {
  const [rooms, setRooms] = useState([])
  const [foods, setFoods] = useState([])
  const [activities, setActivities] = useState([])
  const [safaris, setSafaris] = useState([])
  const [shouldLoad, setSouldLoad] = useState(false)

  const fetchSafaris = async () => {
    setSouldLoad(true)
    await axios.get(`${config.baseUrl}/safari-controller`).then((value) => {
      setSafaris(value.data)
    }).catch(err => {
      console.log("get safaris failed")
    })
  }
  const fetchRooms = async () => {
    await axios.get(`${config.baseUrl}/room-controller`).then((value) => {
      setRooms(value.data)
    }).catch(err => {
      console.log("get safaris failed")
    })
  }
  const fetchActivities = async () => {
    await axios.get(`${config.baseUrl}/activity-controller`).then((value) => {
      setActivities(value.data)
    }).catch(err => {
      console.log("get safaris failed")
    })
  }
  const fetchFoods = async () => {
    await axios.get(`${config.baseUrl}/food-controller`).then((value) => {
      setFoods(value.data)
    }).catch(err => {
      console.log("get safaris failed")
    })
    setSouldLoad(false)
  }


  useEffect(() => {
    fetchSafaris()
    fetchActivities();
    fetchRooms();
    fetchFoods();
 
  }, [])



  if (shouldLoad) {
    return <Loading />
  }

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
   
      <WhatGPT3 />
     
      <Possibility />
    
      <Blog data={safaris} title1={"Explore Majestic "} title2={"Safaris"} id={"safaris"}/>
      <Blog data={rooms} title1={"Discover Serene "} title2={"Accommodations"} id={"rooms"}/>
      <Blog data={activities} title1={"Embark on Thrilling"} title2={"Adventures"}id={"activities"} />
      <Blog data={foods} title1={"Savor Culinary "} title2={"Delights"} id={"foods"}/>
      <Chat />
      <CustomPackage />
      <Footer />
    </div>
  )
}

export default App;
