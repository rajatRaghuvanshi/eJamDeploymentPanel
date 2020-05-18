import axios from 'axios';

import ACTIONS from '../constants/deployAction';
import utils from '../utils/utils';

const fetchDeployInit = () => {
  return {
    type: ACTIONS.DEPLOY_FETCH_INIT
  };
};

const fetchDeployFail = () => {
  return {
    type: ACTIONS.DEPLOY_FETCH_FAIL
  };
};

const fetchDeploySuccess = (data) => {
    console.log("got result 33", data)

  return {
    type: ACTIONS.DEPLOY_FETCH_SUCCESS,
    data: data
  };
};

const invalidateDeploy = () => {
  return {
    type: ACTIONS.DEPLOY_INVALIDATE
  };
};

const fetchDeploy = () => {
  return function(dispatch, getState) {
    const currentState = getState().deploy;
    if (
      !utils.isDataEmpty(currentState) &&
      !currentState.isInvalidated
    ) return null;

    dispatch(fetchDeployInit());
    axios.get(`https://rajat-ejam-deploy-tool.herokuapp.com/deployments`)
      .then(result => {
        let sorted = utils.sortDataByDate(result.data.result, "deployedAt")
        dispatch(fetchDeploySuccess(sorted));
      })
      .catch(err => {
        console.log("got err", err)

        dispatch(fetchDeployFail());
      });
  };
};

export default {
  fetchDeploy,
  invalidateDeploy
};