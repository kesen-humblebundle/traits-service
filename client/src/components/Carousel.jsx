/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 269px;
  width: 1140px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  overflow-x: hidden;
  width: ${(props) => `${props.size * 270}px`};
`;

const HeaderStyled = styled.h2`
  margin: 0 0 15px;
  font-size: 15px;
  font-weight: 700;
  height: 21px;
`;

const Carousel = (props) => {
  const cards = props.onDisplay.map((index) => {
    return <Card thumbsNlabel={props.traitThumbs[index]} key={index} data-test="Card" />;
  });

  return (
    <CardWrapper size={props.traitThumbs.length}>
      <HeaderStyled>TRAITS</HeaderStyled>
      <CardContainer>{cards}</CardContainer>
    </CardWrapper>
  );
};

Carousel.propTypes = {
  traitThumbs: PropTypes.array,
  onDisplay: PropTypes.array
};

export default Carousel;
