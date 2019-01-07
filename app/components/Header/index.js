import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <A href="/">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/player">
            <FormattedMessage {...messages.player} />
          </HeaderLink>
          <HeaderLink to="/pick">
            <FormattedMessage {...messages.pick} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
