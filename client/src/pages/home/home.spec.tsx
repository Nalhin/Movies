import { renderWithProviders } from '../../../test/render/render-with-providers';
import React from 'react';
import Home from './home';
import { fireEvent } from '@testing-library/react-native';
import { ROOT_ROUTES } from '../root.routes';
import { authenticatedUserFactory } from '../../../test/factory/user/user';
import { AnonymousUser } from '../../shared/models/user/user';

describe('Home Page', () => {
  it('should allow to visit main page when authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithProviders(<Home />, {
      user: authenticatedUserFactory.buildOne(),
      screens: [ROOT_ROUTES.MAIN],
    });

    fireEvent.press(getByA11yLabel(/Continue/));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.MAIN);
  });

  it('should allow logging out when authenticated', () => {
    const { getByA11yLabel, logoutUser } = renderWithProviders(<Home />, {
      user: authenticatedUserFactory.buildOne(),
    });

    fireEvent.press(getByA11yLabel(/Logout/));

    expect(logoutUser).toBeCalledTimes(1);
  });

  it('should hide login, skip login, and sign up buttons when authenticated', () => {
    const { queryByA11yLabel } = renderWithProviders(<Home />, {
      user: authenticatedUserFactory.buildOne(),
      screens: [ROOT_ROUTES.HOME],
    });

    expect(queryByA11yLabel(/Login/)).toBeNull();
    expect(queryByA11yLabel(/Skip login/)).toBeNull();
    expect(queryByA11yLabel(/Sign up/)).toBeNull();
  });

  it('should allow to visit main page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithProviders(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.MAIN],
    });

    fireEvent.press(getByA11yLabel(/Skip logging/));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.MAIN);
  });

  it('should allow to visit login page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithProviders(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.LOGIN],
    });

    fireEvent.press(getByA11yLabel(/Login/));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.LOGIN);
  });

  it('should allow to visit sign up page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithProviders(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.SIGN_UP],
    });

    fireEvent.press(getByA11yLabel(/Sign up/));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.SIGN_UP);
  });

  it('should hide continue and logout button when not authenticated', () => {
    const { queryByA11yLabel } = renderWithProviders(<Home />, {
      user: new AnonymousUser(),
    });

    expect(queryByA11yLabel(/Continue/)).toBeNull();
    expect(queryByA11yLabel(/Logout/)).toBeNull();
  });
});
