import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import utils from '../utils/utils';


import './Template.css'

function Template(props) {
    const template = useSelector(state => {
        console.log("template", state.template)
        return state.template;
    });
    const [name, updateName] = useState(null);
    const [version, updateVersion] = useState(null);
    const [url, updateURL] = useState("");
    const [showError, updateShowError] = useState(false);

    const isFetching = () => {
        if (utils.isDataEmpty(template) || utils.isNull(template.isFetching)) return false;
        else return template.isFetching;
    }

    const onChangeTemplate = event => {
        const value = event.target.value;
        updateName(value);
        const versions = getVersions(value);
        updateVersion(versions[0]);
    }
    const onChangeVersion = event => {
        const value = event.target.value;
        updateVersion(value);
    }

    const onUrlChange = event => {
        const value = event.target.value;
        updateURL(value);
    }

    const startDeployment = () => {
        const _name = utils.isNull(name) ? template.templates[0].name : name;
        const _version = utils.isNull(version) ? template.templates[0].versions[0] : version;
        if (
            utils.isDataEmpty(_name) ||
            utils.isDataEmpty(_version) ||
            utils.isDataEmpty(url)
        ) {
            updateShowError(true);
        } else {
            updateShowError(false);
            props.deploy(_name, _version, url);
        }
    }

    const getVersions = name => {
        let newVersions = [];
        for (let i = 0; i < template.templates.length; i++) {
            if(template.templates[i].name === name) {
                newVersions = template.templates[i].versions;
                break;
            }
        }
        return newVersions;
    }

    const renderVersions = name => {
        let versions = utils.isDataEmpty(name) ? template.templates[0].versions : getVersions(name);
        return (
            <Form>
                <Form.Group controlId="versionControlSelect">
                    <Form.Label>Select Version</Form.Label>
                    <Form.Control 
                        as="select"
                        onChange={onChangeVersion}
                        placeholder="Select version name"
                    >
                        {versions.map(item => {
                            return <option key={`${name}_${item}`}>{item}</option>
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        )
    }

    return (
        <div>
            {isFetching()
                ?  <div className="spinner-wrapper"><Spinner animation="border" /></div>
                : <div>
                    <h2 className="mainHeading">Add Deployment</h2>
                    {!utils.isDataEmpty(template) && !utils.isDataEmpty(template.templates) && 
                    <div>
                        <Form>
                            <Form.Group controlId="nameControlSelect">
                                <Form.Label>Select Template</Form.Label>
                                <Form.Control 
                                    as="select"
                                    onChange={onChangeTemplate}
                                    placeholder="Select template name"
                                    defaultValue={name}
                                >
                                    {template.templates.map(item => {
                                       return <option key={item._id}>{item.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        {renderVersions(name)}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="email" placeholder="Enter url" onChange={onUrlChange} />
                        </Form.Group>
                        <Button onClick={startDeployment} variant="primary">Deploy</Button>
                        {showError && <sub className="error">*Please fill all the details</sub>}
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default Template
