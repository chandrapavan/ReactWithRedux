import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import Header from "./Header";

// Note how with shallow render you search for the React component tag
it("contains 3 NavLinks vida shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Note how ith mount you search for the final rendered HTML since it generates the final DOM.
// we also need to pull in React Router's memory Router for testing since the Header expects to have React Routers's props passes in.

it("contains 3 NavLinks vida mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
});
