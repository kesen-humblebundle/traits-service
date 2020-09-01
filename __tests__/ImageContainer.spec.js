import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import defaultState from '../client/src/defaultState.js';
import ImageContainer from '../client/src/components/ImageContainer.jsx';
import Thumbnail from '../client/src/components/Thumbnail.jsx';
import Label from '../client/src/components/Label.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('<ImageContainer />', () => {
  it('renders four Thumbnail components', () => {
    const wrapper = shallow(<ImageContainer thumbnails={defaultState.product_data[0]} />);

    expect(wrapper.find(Thumbnail)).toHaveLength(4);
  });
});
