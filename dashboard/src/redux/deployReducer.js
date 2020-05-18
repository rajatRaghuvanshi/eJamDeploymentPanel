import ACTIONS from '../constants/deployAction';

const initialState = {};
/*
  deploy: {
    isFetching,
    isInvalidated,
    deploys: [
        {

        }
    ]
  }
  
*/
const deployReducer = (state = initialState, action) => {
  console.log("state--------", state)
  switch (action.type) {
    case ACTIONS.DEPLOY_FETCH_INIT:
      return {
        ...state,
        isFetching: true,
        isInvalidated: false
      };
    case ACTIONS.DEPLOY_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        deploys: action.data
      };
    case ACTIONS.DEPLOY_FETCH_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case ACTIONS.DEPLOY_INVALIDATE:
      return {
        ...state,
        isInvalidated: true
      };
    default:
      return state;
  }
};

export default deployReducer;