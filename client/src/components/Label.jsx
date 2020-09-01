/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const LabelStyled = styled.div`
  height: 53px;
  padding: 10px;
  color: #494f5c;
  box-sizing: border-box;
  display: flex;
`;

const TraitStyled = styled.span`
  margin: 0;
  font-size: 13.5px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Label = (props) => {
  return (
    <LabelStyled>
      <TraitStyled>{props.trait}</TraitStyled>
    </LabelStyled>
  );
};

export default Label;
