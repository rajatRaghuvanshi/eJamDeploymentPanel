import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'

import templateAction from '../redux/templateAction';
import deployAction from '../redux/deployAction';
import Template from './Template';
import Deployments from './Deployments';


function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect");
        dispatch(templateAction.fetchTemplates())
        dispatch(deployAction.fetchDeploy())
    }, [])

    const deploy = (name, version, url) => {
        const body = {
            templateName: name,
            version: version,
            url: url
        }
        axios.post(`https://rajat-ejam-deploy-tool.herokuapp.com/deployments/deploy`, body)
            .then(res => {
                console.log("response", res)
                dispatch(deployAction.invalidateDeploy())
                dispatch(deployAction.fetchDeploy())
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    const onDelete = id => {
        axios.delete(`https://rajat-ejam-deploy-tool.herokuapp.com/deployments/deploy/${id}`)
            .then(res => {
                console.log("response", res)
                dispatch(deployAction.invalidateDeploy())
                dispatch(deployAction.fetchDeploy())
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    return (
        <div>
            <Template deploy={deploy}/>
            <Deployments onDelete={onDelete}/>
        </div>
    )
}

export default Dashboard
