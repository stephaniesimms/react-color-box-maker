import React from 'react';
import ReactDOM from 'react-dom';
import toJson from "enzyme-to-json";
import { mount } from 'enzyme';
import NewBoxForm from './NewBoxForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewBoxForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", function () {
  let wrapper = mount(<NewBoxForm />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("allows for changes in backgroundColor, width, height", function () {
  let wrapper = mount(<NewBoxForm />);
  
  const backColorInput = wrapper.find("#backgroundColor")
  backColorInput.instance().value = "magenta"
  backColorInput.simulate("change")

  expect(wrapper.state().backgroundColor).toEqual("magenta");

  const widthInput = wrapper.find("#width");
  widthInput.instance().value = '20';
  widthInput.simulate("change");

  expect(wrapper.state().width).toEqual('20');

  const heightInput = wrapper.find("#height");
  heightInput.instance().value = '25';
  heightInput.simulate("change");

  expect(wrapper.state().height).toEqual('25');
});

it("runs a mocked fn on submit", function () {
  const submitFn = jest.fn();
  let wrapper = mount(
    <NewBoxForm makeBox={submitFn} />
  );
  const form = wrapper.find("form")

  form.simulate("submit")

  expect(submitFn).toHaveBeenCalled();
});

// duplicates test above for confirming changes to inputs
it("resets state on submit", function () {
  const submitFn = jest.fn();
  let wrapper = mount(<NewBoxForm makeBox={submitFn} />);
  
  const backColorInput = wrapper.find("#backgroundColor")
  backColorInput.instance().value = "magenta"
  backColorInput.simulate("change")

  expect(wrapper.state().backgroundColor).toEqual("magenta");

  const widthInput = wrapper.find("#width");
  widthInput.instance().value = '20';
  widthInput.simulate("change");

  expect(wrapper.state().width).toEqual('20');

  const heightInput = wrapper.find("#height");
  heightInput.instance().value = '25';
  heightInput.simulate("change");

  expect(wrapper.state().height).toEqual('25');

  const form = wrapper.find("form");
  form.simulate("submit");

  // after submit, we expect the state to reset
  expect(wrapper.state()).toEqual({
    backgroundColor: '',
    height: '',
    width: ''
  })
});

