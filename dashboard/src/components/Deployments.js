import React from 'react'
import { useSelector } from 'react-redux'

import utils from '../utils/utils';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import './Deployments.css'


function Deployments(props) {
    const deploy = useSelector(state => state.deploy);

    console.log("deploys",deploy)
    const isFetching = () => {
        if (utils.isDataEmpty(deploy) || utils.isNull(deploy.isFetching)) return false;
        else return deploy.isFetching;
    }

    const card = data => {
        return (
            <Col sm={6} key={data._id}>
                <div className="deploy-card">
                    <div className="deploy-group">
                        <span className="deploy-name">{data.templateName}</span>
                    </div>
                    <div className="deploy-group">
                        <span className="deploy-left">Version: </span>
                        <span className="deploy-right">v{data.version}</span>
                    </div>
                    <div className="deploy-group">
                        <span className="deploy-left">Deployed on: </span>
                        <span className="deploy-right">{new Date(data.deployedAt).toString().slice(0, 24)}</span>
                    </div>
                    <div className="deploy-group">
                        <span className="deploy-left" >Checkout: </span>
                        <span className="deploy-right">{data.url}</span>
                    </div>
                    <div className="deploy-group text-center">
                        <Button className="deploy-button" onClick={() => props.onDelete(data._id)}  variant="primary">Delete</Button>
                    </div>
                </div>

            </Col>
        )
    }

    return (
        <div>
            {isFetching() && <div className="spinner-wrapper"><Spinner animation="border" /></div>}
            <div>
                <h2 className="mainHeading">List of Deployments</h2>
                {!utils.isDataEmpty(deploy) && !utils.isDataEmpty(deploy.deploys) && 
                    <Row >
                        {
                            deploy.deploys.map(item => {
                                return card(item);
                            })
                        }
                    </Row>
                    
                }
            </div>
            {}
        </div>
    )
}

export default Deployments
