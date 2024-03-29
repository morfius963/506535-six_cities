import * as React from 'react';
import {mount} from 'enzyme';
import withSingIn from "./with-sing-in";
import SingIn from "../../components/sing-in/sing-in";
import MainHeader from "../../components/main-header/main-header";

jest.mock(`../../components/main-header/main-header`, () => jest.fn().mockReturnValue(null));
jest.mock(`react-router-dom`, () => ({
  Redirect: () => null,
  Link: () => null
}));

describe(`end to end test`, () => {
  it(`Component should correctly change state after input`, () => {
    const onUserDataPost = jest.fn();
    const evt = {
      preventDefalut: jest.fn()
    };
    const evt1 = {
      target: {
        name: `email`,
        value: `morf@gmail.com`
      }
    };
    const evt2 = {
      target: {
        name: `password`,
        value: `1234567890`
      }
    };
    const props = {
      onUserDataPost,
      city: `Amsterdam`,
      onUserInput: jest.fn(),
      onFormSubmit: jest.fn(),
      isAuthorizationRequired: true,
      history: {
        push: jest.fn()
      }
    };
    const MockComponentWrapped = withSingIn(SingIn);

    const authorizationScreen = mount(<MockComponentWrapped {...props} />);

    const emailField = authorizationScreen.find(`input[type="email"]`);
    const passwordField = authorizationScreen.find(`input[type="password"]`);
    const form = authorizationScreen.find(`.login__form`);

    emailField.simulate(`change`, evt1);
    expect(authorizationScreen.state()).toEqual({
      email: `morf@gmail.com`,
      password: ``
    });

    form.simulate(`submit`, evt);
    expect(onUserDataPost).toHaveBeenCalledWith(
        {
          email: `morf@gmail.com`,
          password: ``
        },
        expect.any(Function)
    );

    passwordField.simulate(`change`, evt2);
    expect(authorizationScreen.state()).toEqual({
      email: `morf@gmail.com`,
      password: `1234567890`
    });

    form.simulate(`submit`, evt);
    expect(onUserDataPost).toHaveBeenCalledWith(
        {
          email: `morf@gmail.com`,
          password: `1234567890`
        },
        expect.any(Function)
    );

    expect(MainHeader).toHaveBeenCalled();
  });
});
