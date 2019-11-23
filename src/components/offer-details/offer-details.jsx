import React from "react";
import propTypes from "./prop-types.js";

import Map from "../map/map.jsx";
import OfferCard from "../offer-card/offer-card.jsx";
import MainHeader from "../main-header/main-header.jsx";
import CommentList from "../comments-list/comments-list.jsx";
import CommentForm from "../comment-form/comment-form.jsx";

const MAX_NEIGHBOURHOOD_OFFERS = 3;

const OfferDetails = ({offers, isAuthorizationRequired, userData, onFavoriteCardToggle, location}) => {
  const currentOffer = offers.find((offer) => offer.id === location.state.id);
  const similarOffers = offers
    .filter(({id, city}) => (city.name === currentOffer.city.name) && id !== currentOffer.id)
    .slice(0, MAX_NEIGHBOURHOOD_OFFERS);
  const neighbourhoodOffers = [currentOffer, ...similarOffers];

  const {id, isPremium, title, images, rating, maxAdults, bedrooms, price, goods, host, description, isFavorite} = currentOffer;

  const favoriteClickHandler = () => {
    const status = isFavorite ? 0 : 1;
    onFavoriteCardToggle(id, status);
  };

  return (
    <div className="page">

      <MainHeader
        isAuthorizationRequired={isAuthorizationRequired}
        userData={userData}
        isInDetails={true}
      />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image, i) => <div key={image + i} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>)
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium
                  ? <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : null
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={favoriteClickHandler}
                >
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${(rating * 100) / 5}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Entire place
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good, i) => <li key={`${good}-${i}`} className="property__inside-item">
                      {good}
                    </li>)
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={`../${host.avatarUrl}`} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro
                      ? <span className="property__user-status">
                        Pro
                      </span>
                      : null
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>

                <CommentList />

                {
                  isAuthorizationRequired
                    ? null
                    : <CommentForm />
                }

              </section>
            </div>
          </div>
          <section className="property__map map container">

            <Map
              offers={neighbourhoodOffers}
              activeCard={id}
              isInOfferDetails={true}
            />

          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                similarOffers.map((offer) =>
                  <OfferCard
                    key={`${offer.location.coords}-${offer.id}`}
                    offerData={offer}
                    onCardMouseEnter={null}
                    onFavoriteCardToggle={onFavoriteCardToggle}
                    pathSettings={{
                      isInOfferDetails: true
                    }}
                  />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferDetails.propTypes = propTypes;

export default OfferDetails;