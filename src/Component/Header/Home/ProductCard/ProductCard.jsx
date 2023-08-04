import React from 'react';
import prod from "./Card.module.css"

import { Container, Row, Col } from 'react-bootstrap';
import {Card1}  from './Card';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { GrFormPrevious } from "react-icons/gr"
import { MdNavigateNext } from "react-icons/md"


 const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={prod['control-btn']}onClick={onClick}>
      <button className={prod.next}>
        <MdNavigateNext className={prod.icon} />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={prod['control-btn']} onClick={onClick}>
      <button className={prod.prev}>
        <GrFormPrevious className={prod.icon} />
      </button>
    </div>
  )
}

const ProductCard = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     arrows: false,
      //     centerMode: true,
      //     centerPadding: '40px',
      //     slidesToShow: 1
      //   },
      // },
    ],
  }
  

  const cards = [
    {
      title: 'Womens',
      image: '../Image/girlFashion.webp',
      text: 'See More'
    },
    {
      title: 'Kids',
      image: '../Image/KidsFashion.jpg',
      text: 'See More'
    },
    {
      title: 'Mens',
      image: '../Image/mensFashion.webp',
      text: 'See More'
    },
    
 
  ];

  return (
    <div className={prod.productCart}>
    <Container>
    <div className={prod.categoriescenter}>
    <h6>CATEGORIES</h6>
    <h2>More Products</h2>
  </div>
      <Row>
      <Slider {...settings}>

        {cards.map((card, index) => (
          <Col key={index} sm={12} md={6} lg={4}>
            <Card1 title={card.title} image={card.image} text={card.text}  />
            
          </Col>
        ))}
        </Slider>
      </Row>
    </Container>
    </div>
  );
};

export default ProductCard;