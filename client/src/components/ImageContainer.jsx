/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail.jsx';

const ContainerStyled = styled.div`
  background-color: #a1a7b2;
  height: 168px;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
`;

const ImageContainer = (props) => {
  const thumbnails = props.thumbnails.map((thumb) => {
    return <Thumbnail thumb={thumb.thumbnail} id={thumb.product_id} data-test="Thumbnail" />;
  });
  return <ContainerStyled>{thumbnails.slice(0, 4)}</ContainerStyled>;
};

ImageContainer.propTypes = {
  thumbnails: PropTypes.array
};

export default ImageContainer;
