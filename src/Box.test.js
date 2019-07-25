import React from 'react';
import ReactDOM from 'react-dom';
import toJson from "enzyme-to-json";
import { mount, shallow } from 'enzyme';
import Box from './Box';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Box />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", function () {
  let wrapper = mount(<Box />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("removes a box when button is clicked", function () {
  const removeFn = jest.fn();
  let wrapper = shallow(<Box remove={removeFn} />);
  wrapper.find("button").simulate("click");

  expect(removeFn).toHaveBeenCalled();
});