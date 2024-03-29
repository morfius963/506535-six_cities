import ActionTypes from "../../actions/action-types.js";

const initialAppState = {
  offers: [],
  favoriteOffers: [],
  comments: [],
  offersRefs: [],
  isOffersLoading: true
};

const appData = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_HOTELS: return Object.assign({}, state, {
      offers: action.payload.hotels,
      isOffersLoading: action.payload.isOffersLoading
    });

    case ActionTypes.GET_FAVORITE_OFFERS: return Object.assign({}, state, {
      favoriteOffers: action.payload
    });

    case ActionTypes.SET_FAVORITE_OFFER: return Object.assign({}, state, {
      offers: action.payload.cities,
      favoriteOffers: action.payload.favorites
    });

    case ActionTypes.GET_COMMENTS: return Object.assign({}, state, {
      comments: action.payload
    });

    case ActionTypes.SET_OFFER_REF: return Object.assign({}, state, {
      offersRefs: [...state.offersRefs, action.payload]
    });

    case ActionTypes.DELETE_OFFER_REF:
      const newOffersRefs = state.offersRefs.filter(({id}) => id !== action.payload.id);

      return Object.assign({}, state, {
        offersRefs: newOffersRefs
      });
  }

  return state;
};

export default appData;
