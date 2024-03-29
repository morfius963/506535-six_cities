import * as React from "react";
import * as renderer from "react-test-renderer";
import {MainHeader} from "./main-header";

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

describe(`snapshot test`, () => {
  it(`Component correctly renders`, () => {
    const props = {
      userData: {
        email: `morf@gmail.com`,
        avatar: ``
      },
      isAuthorizationRequired: true,
      resetCityFilters: jest.fn()
    };

    const tree = renderer
      .create(<MainHeader {...props} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
