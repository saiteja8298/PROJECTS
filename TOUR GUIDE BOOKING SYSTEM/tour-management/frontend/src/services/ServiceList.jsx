import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from "reactstrap";
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
      imgUrl: weatherImg,
      title:"Calculate weather",
      desc:"Pain itself, but it is important to sit with love, is the essence of life with proper preparation."
    },

    {
        imgUrl: guideImg,
        title:"Best Tour Guide",
        desc:"Pain itself, but it is important to sit with love, is the essence of life with proper preparation."
      },
      {
        imgUrl: customizationImg,
        title:"Customization",
        desc:"Pain itself, but it is important to sit with love, is the essence of life with proper preparation."
      },

]



const ServiceList = () => {
  return (
  <>

    {servicesData.map((item,index) => (
        <Col lg='3' key={index}>
        <ServiceCard item={item}/>
        </Col> 
        ))} 
    
    </>
  );
};

export default ServiceList
