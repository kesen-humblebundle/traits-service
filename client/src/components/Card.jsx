/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImageContainer from './ImageContainer.jsx';
import Label from './Label.jsx';

const CardWrapper = styled.div`
  text-align: center;
  margin: 0 20px 0 0;
`;

const CardContainer = styled.div`
  background-color: #fff;
  color: #a1a7b2;
  height: 221px;
  width: 270px;
`;

const Card = (props) => {
  const newThumbArray = props.thumbsNlabel.slice();
  return (
    <CardWrapper>
      <CardContainer>
        <ImageContainer thumbnails={props.thumbsNlabel} data-test="ImageContainer" />
        <Label trait={newThumbArray.pop()} data-test="Label" />
      </CardContainer>
    </CardWrapper>
  );
};

Card.propTypes = {
  thumbsNlabel: PropTypes.array
};

export default Card;
