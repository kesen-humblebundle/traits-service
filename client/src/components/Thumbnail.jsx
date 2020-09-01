import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ThumbnailStyled = styled.div`
  background-color: lightgreen;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  margin: 5px auto;
  width: 135px;
  margin: 0;
  filter: saturate(20%);
  transition: 0.3s all ease-in;
  &:hover {
    filter: saturate(2);
  }
`;

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    window.location.pathname = `/${this.props.id}/`;
  }

  render() {
    return <ThumbnailStyled onClick={this.handleClick} image={this.props.thumb} />;
  }
}

Thumbnail.propTypes = {
  thumb: PropTypes.string,
  id: PropTypes.number
};

export default Thumbnail;
