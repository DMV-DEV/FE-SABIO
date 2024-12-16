/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Card } from "antd";
import cardImg from "../../assets/images/cardsImg.png";
import '../cards/StyleCard.css'

const CardComponent = ({ id, instructor, subject, section }) => {
  const { Meta } = Card;
  return (
    <>
    <Card
      hoverable
      className="card"
      cover={<img alt="card image" src={cardImg} />}
    >
         <div className="card__meta">
        <div className="card__meta-title">
          <h3>Clase : {id}</h3>
          <p className="card__meta-additional">Section {section}</p>
        </div>
        <Meta
          description={[<p>
            Instructor: {instructor}
            <br key="br" />
            Subject: {subject}
            </p>
          ]}
          />
          </div>
    </Card>
          </>
  );
};

export default CardComponent;
