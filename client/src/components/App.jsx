/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import defaultState from '../defaultState.js';
import Carousel from './Carousel.jsx';
import GlobalStyle from '../GlobalStyle.js';

const AppStyled = styled.div`
  box-sizing: border-box;
  height: 339px;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 35px 0;
  background: #282c34;
  color: #a1a7b2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ArrowStyled = styled.i`
  align-self: center;
  font-size: 45px;
  padding-top: 55px;
  padding-right: 8px;
  padding-left: 8px;
  color: #929599;
  transition: color 0.3s ease-out;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.fetchImages = this.fetchImages.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fetchImages(id) {
    // eslint-disable-next-line react/destructuring-assignment
    if (id === '/') {
      id = '/21/';
    }

    // ********** comment out below url to run service locally */
    const requestURL = `http://ec2-3-129-17-68.us-east-2.compute.amazonaws.com:3005/traits${id}`;

    // ********** uncomment below url to run service locally */
    // const requestURL = `http://127.0.0.1:3005/traits${id}`;

    axios
      .get(requestURL)
      .then((response) => {
        this.setState({ product_data: response.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleClick(e) {
    const direction = e.currentTarget.className.baseVal;
    let indexes = this.state.onDisplayIndexes.slice();
    const last = indexes[indexes.length - 1];
    const first = indexes[0];
    if (direction === 'right' && last < this.state.product_data.length - 1) {
      indexes = indexes.map((index) => {
        return index + 1;
      });
    }
    if (direction === 'left' && first > 0) {
      indexes = indexes.map((index) => {
        return index - 1;
      });
    }
    this.setState({ onDisplayIndexes: indexes });
  }

  componentDidMount() {
    this.fetchImages(window.location.pathname);
  }

  render() {
    return (
      <AppStyled>
        <GlobalStyle />
        <ArrowStyled>
          <FiChevronLeft className="left" onClick={this.handleClick} />
        </ArrowStyled>
        <Carousel traitThumbs={this.state.product_data} onDisplay={this.state.onDisplayIndexes} />
        <ArrowStyled>
          <FiChevronRight className="right" onClick={this.handleClick} />
        </ArrowStyled>
      </AppStyled>
    );
  }
}

export default App;
