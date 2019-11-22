import React from "react";

const FavoritesOfferList = ({city, renderOffers}) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {renderOffers()}
    </div>
  </li>
);

export default FavoritesOfferList;
