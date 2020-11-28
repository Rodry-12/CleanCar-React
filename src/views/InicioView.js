import React from "react";
import { Carousel } from "react-bootstrap";
import car from "../img/car.png";
import car1Carousel from "../img/car2.png";
import car2Carousel from "../img/car3.png";
import car3Carousel from "../img/car4.PNG";

const Inicio = () => {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={car}
          slide="false"
          alt="First slide"
          width="100px"
          height="550px"
          opacity="0.8"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={car1Carousel}
          alt="Third slide"
          width="100px"
          height="550px"
          opacity="0.5"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={car2Carousel}
          alt="Third slide"
          width="100px"
          height="550px"
          opacity="0.5"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={car3Carousel}
          alt="Third slide"
          width="100px"
          height="550px"
          opacity="0.5"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Inicio;
