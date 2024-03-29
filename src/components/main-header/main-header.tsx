import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ActionCreator from "../../store/actions/action-creator";
import {Props} from "./interface";

const MainHeader = ({userData, isAuthorizationRequired, resetCityFilters}: Props) => {
  const defaultLinkValue = `Sing In`;
  const {email, avatar} = userData;

  const userAvatarPath = isAuthorizationRequired
    ? `./img/avatar.svg`
    : `https://htmlacademy-react-2.appspot.com/six-cities${avatar}`;
  const linkValue = {
    text: isAuthorizationRequired ? defaultLinkValue : email,
    path: isAuthorizationRequired ? `/login` : `/favorites`
  };

  const handleCityFiltersReset = () => {
    const hash = window.location.href.split(`/`).reverse()[0];

    if (hash === ``) {
      return;
    }
    resetCityFilters();
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" onClick={handleCityFiltersReset} className="header__logo-link header__logo-link--active" >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">

                <Link className="header__nav-link header__nav-link--profile" to={{pathname: linkValue.path}}>
                  <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${userAvatarPath})`}}>
                  </div>
                  <span className="header__user-name user__name">
                    {linkValue.text}
                  </span>
                </Link>

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: state.user.isAuthorizationRequired,
  userData: {
    email: state.user.email,
    avatar: state.user.avatar,
  }
});

const mapDispatchToProps = {
  resetCityFilters: () => ActionCreator.resetCityFilters()
};

export {MainHeader};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
