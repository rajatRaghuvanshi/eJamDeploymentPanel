import ACTIONS from '../constants/templateAction';

const initialState = {};
/*
  template: {
    isFetching,
    isInvalidated,
    templates: [
        {

        }
    ]
  }
  
*/
const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TEMPLATE_FETCH_INIT:
      return {
        ...state,
        isFetching: true,
        isInvalidated: false
      };
    case ACTIONS.TEMPLATE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        templates: action.data
      };
    case ACTIONS.TEMPLATE_FETCH_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case ACTIONS.TEMPLATE_INVALIDATE:
      return {
        ...state,
        isInvalidated: true
      };
    default:
      return state;
  }
};

export default templateReducer;