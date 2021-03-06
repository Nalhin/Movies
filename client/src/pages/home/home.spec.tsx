import { renderWithNavigation } from '../../../test/render/render-with-providers';
import React from 'react';
import Home from './home';
import { fireEvent } from '@testing-library/react-native';
import { ROOT_ROUTES } from '../root.routes';
import { authenticatedUserFactory } from '../../../test/factory/user/user.factory';
import { AnonymousUser } from '../../shared/models/user/user';

describe('Home Page', () => {
  it('should allow to visit main page when authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithNavigation(<Home />, {
      user: authenticatedUserFactory.buildOne(),
      screens: [ROOT_ROUTES.MAIN],
    });

    fireEvent.press(getByA11yLabel(/continue/i));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.MAIN);
  });

  it('should allow logging out when authenticated', () => {
    const { getByA11yLabel, logoutUser } = renderWithNavigation(<Home />, {
      user: authenticatedUserFactory.buildOne(),
    });

    fireEvent.press(getByA11yLabel(/logout/i));

    expect(logoutUser).toBeCalledTimes(1);
  });

  it('should hide login, skip login, and sign up buttons when authenticated', () => {
    const { queryByA11yLabel } = renderWithNavigation(<Home />, {
      user: authenticatedUserFactory.buildOne(),
      screens: [ROOT_ROUTES.HOME],
    });

    expect(queryByA11yLabel(/login/i)).toBeNull();
    expect(queryByA11yLabel(/skip login/i)).toBeNull();
    expect(queryByA11yLabel(/sign up/i)).toBeNull();
  });

  it('should allow to visit main page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithNavigation(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.MAIN],
    });

    fireEvent.press(getByA11yLabel(/skip logging/i));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.MAIN);
  });

  it('should allow to visit login page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithNavigation(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.LOGIN],
    });

    fireEvent.press(getByA11yLabel(/login/i));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.LOGIN);
  });

  it('should allow to visit sign up page when not authenticated', () => {
    const { getByA11yLabel, navigation } = renderWithNavigation(<Home />, {
      user: new AnonymousUser(),
      screens: [ROOT_ROUTES.SIGN_UP],
    });

    fireEvent.press(getByA11yLabel(/sign up/i));

    expect(navigation.getCurrentRoute()?.name).toEqual(ROOT_ROUTES.SIGN_UP);
  });

  it('should hide continue and logout button when not authenticated', () => {
    const { queryByA11yLabel } = renderWithNavigation(<Home />, {
      user: new AnonymousUser(),
    });

    expect(queryByA11yLabel(/continue/i)).toBeNull();
    expect(queryByA11yLabel(/logout/i)).toBeNull();
  });
});
