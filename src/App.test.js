import React from 'react';
import ReactDOM from 'react-dom';
import toJson from "enzyme-to-json";
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", function () {
  let wrapper = mount(<App />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});