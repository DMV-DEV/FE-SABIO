/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Card } from "antd";
import cardImg from "../../assets/images/cardsImg.png";
import '../cards/StyleCard.css'

const CardComponent = ({ title, instructor, subject, section }) => {
  const { Meta } = Card;
  return (
    <>
    <Card
      hoverable
      // style={{
      //   width: 240,
      // }}
      className="card"
      cover={<img alt="card image" src={cardImg} />}
    >
         <div className="card__meta">
        <div className="card__meta-title">
          <span>{title}</span>
          <span className="card__meta-additional">Section {section}</span>
        </div>
        <Meta
          description={[
            `Instructor: ${instructor}`,
            <br key="br" />,
            `Subject: ${subject}`,
          ]}
          />
          </div>
    </Card>
          </>
  );
};

export default CardComponent;
