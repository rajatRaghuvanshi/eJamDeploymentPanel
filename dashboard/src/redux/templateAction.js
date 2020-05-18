import axios from 'axios';

import ACTIONS from '../constants/templateAction';
import utils from '../utils/utils';

const fetchTemplatesInit = () => {
  return {
    type: ACTIONS.TEMPLATE_FETCH_INIT
  };
};

const fetchTemplatesFail = () => {
  return {
    type: ACTIONS.TEMPLATE_FETCH_FAIL
  };
};

const fetchTemplatesSuccess = (data) => {
    console.log("got result 33", data)

  return {
    type: ACTIONS.TEMPLATE_FETCH_SUCCESS,
    data: data
  };
};

const invalidateTemplates = () => {
  return {
    type: ACTIONS.TEMPLATE_INVALIDATE
  };
};

const fetchTemplates = () => {
  return function(dispatch, getState) {
    const currentState = getState().template;
    if (
      !utils.isDataEmpty(currentState) &&
      !currentState.isInvalidated
    ) return null;

    dispatch(fetchTemplatesInit());
    axios.get(`https://rajat-ejam-deploy-tool.herokuapp.com/templates`)
      .then(result => {
        dispatch(fetchTemplatesSuccess(result.data.result || []));
      })
      .catch(err => {
        console.log("got err", err)

        dispatch(fetchTemplatesFail());
      });
  };
};

export default {
  fetchTemplates,
  invalidateTemplates
};