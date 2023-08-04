import React from 'react';
import { Card } from 'react-bootstrap';
import prod from "./Card.module.css"

export const Card1  = (props) => {
  const { title, image, text } = props;

  return (
    <Card>
      <Card.Img variant="top" src={image} width="100%" />
      <Card.Body className={prod.catscenter}>
        <Card.Title>{title}</Card.Title>
        <Card.Text><button className='btn btn-primary'>{text}</button></Card.Text>
      </Card.Body>
    </Card>
  );
};
