/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { checkProps, findByTestAttr } from '../test_utils/utils.js';
import App from '../client/src/components/App.jsx';
import Carousel from '../client/src/components/Carousel.jsx';
import Card from '../client/src/components/Card.jsx';
import ImageContainer from '../client/src/components/ImageContainer.jsx';
import Label from '../client/src/components/Label.jsx';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Carousel {...props} />);
};

describe('App', () => {
  it('renders one Carousel component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Carousel)).toHaveLength(1);
  });
});

describe('Carousel', () => {
  it('renders Card Components without error', () => {
    const props = {
      traitThumbs: [1, 2, 3, 4],
      onDisplay: [5, 6, 7, 8]
    };
    const wrapper = shallow(<Carousel {...props} />);
    const component = findByTestAttr(wrapper, 'Card');

    expect(component.length).toBeGreaterThan(3);
  });

  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        traitThumbs: [{ data: 'data' }, { data: 'data' }, { data: 'data' }],
        onDisplay: [4, 7, 2, 34]
      };
      const propsErr = checkProps(Carousel, expectedProps);

      expect(propsErr).toBe(undefined);
    });
  });
});

describe('Card', () => {
  it('renders an ImageContainer component', () => {
    const props = {
      thumbsNlabel: [1, 2, 3, 4]
    };
    const wrapper = shallow(<Card {...props} />);
    const component = findByTestAttr(wrapper, 'ImageContainer');

    expect(component.length).toBe(1);
  });

  it('renders a Label component', () => {
    const props = {
      thumbsNlabel: [1, 2, 3, 4]
    };
    const wrapper = shallow(<Card {...props} />);
    const component = findByTestAttr(wrapper, 'Label');

    expect(component.length).toBe(1);
  });

  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        thumbsNlabel: ['url', 'url', 'url', 'string']
      };
      const propsErr = checkProps(Card, expectedProps);

      expect(propsErr).toBe(undefined);
    });
  });
});

describe('ImageContainer', () => {
  it('renders 4 Thumbnail components', () => {
    const props = {
      thumbnails: [1, 2, 3, 4]
    };
    const wrapper = shallow(<ImageContainer {...props} />);
    const component = findByTestAttr(wrapper, 'Thumbnail');

    expect(component.length).toBe(4);
  });

  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        thumbnails: ['url', 'url', 'url', 'url']
      };
      const propsErr = checkProps(ImageContainer, expectedProps);

      expect(propsErr).toBe(undefined);
    });
  });
});

// describe('Thumbnail', () => {
//   describe(('Checking PropTypes', () {
//     it('should not throw a warning', () => {
//       const expectedProps = {
//         thumb: 'I am a thumb',
//         id: 5
//       }
//       const propsErr =
//     })
//   }))
// })
