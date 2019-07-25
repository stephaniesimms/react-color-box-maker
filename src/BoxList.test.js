import React from 'react';
import ReactDOM from 'react-dom';
import toJson from "enzyme-to-json";
import { mount } from 'enzyme';
import BoxList from './BoxList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoxList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", function () {
  let wrapper = mount(<BoxList />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

// integration test:
// adding a box using the create function we defined in the parent component
it("adds a new box", function () {
  const boxes = [{ id: 1, backgroundColor: 'teal', height: 20, width: 25 }];
  const wrapper = mount(<BoxList />);

  wrapper.setState({ boxes: boxes });

  expect(wrapper.state().boxes).toEqual([
    { id: 1, backgroundColor: 'teal', height: 20, width: 25 }
  ]);

  // here we use the "instance" method 
  // to get access to all instance methods defined on the component
  wrapper
    .instance()
    .addBox({ id: 2, backgroundColor: 'yellow', height: 8, width: 8 });

  expect(wrapper.state().boxes).toEqual([
    { id: 1, backgroundColor: 'teal', height: 20, width: 25 },
    { id: 2, backgroundColor: 'yellow', height: 8, width: 8 }
  ]);

  expect(wrapper.state().boxes).toHaveLength(2);
});

// integration test, we are testing:
// that a form is rendered when the BoxList is rendered
// when we add values to the inputs and submit the form a new box is added
// when the new box is added, we expect the style property to be updated on that box
it("finds a form and successfully creates a box", function () {
  const wrapper = mount(<BoxList />);

  const backColorInput = wrapper.find("#backgroundColor")
  backColorInput.instance().value = "magenta"
  backColorInput.simulate("change")

  const widthInput = wrapper.find("#width");
  widthInput.instance().value = '20';
  widthInput.simulate("change");

  const heightInput = wrapper.find("#height");
  heightInput.instance().value = '25';
  heightInput.simulate("change");

  const form = wrapper.find("form");
  form.simulate("submit");

  expect(wrapper.state().boxes.length).toEqual(1);

  let div_elem = wrapper.find("div").last().props();
  expect(div_elem.style).toEqual({ height: "25em", width: "20em", backgroundColor: "magenta" });

  // this works too but maybe accessing elem obj is better? 
  // let div_elem = wrapper.find('div').last().html();
  // expect(div_elem).toEqual("<div style=\"background-color: magenta; height: 25em; width: 20em;\"></div>")
});

it("removes boxes", function () {
  const boxes = [
    {
      id: 1,
      height: 20,
      width: 20,
      backgroundColor: "goldenrod"
    }
  ];
  const wrapper = mount(<BoxList />);

  wrapper.setState({ boxes: boxes });
  expect(wrapper.state().boxes).toHaveLength(1);

  // here we use the "instance" method to get access to all instance methods defined on the component
  wrapper.instance().remove(1);

  expect(wrapper.state().boxes).toEqual([]);
  expect(wrapper.state().boxes).toHaveLength(0);
});