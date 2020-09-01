import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import defaultState from '../client/src/defaultState.js';
import Card from '../client/src/components/Card.jsx';
import ImageContainer from '../client/src/components/ImageContainer.jsx';
import Label from '../client/src/components/Label.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('<Card />', () => {
  const wrapper = shallow(<Card thumbsNlabel={defaultState.product_data[0]} />);

  it('renders one ImageContainer component', () => {
    expect(wrapper.find(ImageContainer)).toHaveLength(1);
  });

  it('renders one Label component', () => {
    expect(wrapper.find(Label)).toHaveLength(1);
  });
});
