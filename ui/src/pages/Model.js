import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import { BsInfoCircle } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { api_get, api_get_with_params } from '../utils/api.js';
import './Model.css';

export const Model = () => {
    const [model, setModel] = useState();
    const [formValues, setFormValues] = useState();

    useEffect(() => {
        api_get('/model_vars').then((res) => {
            console.log(res);
            setModel(res);
        });
    }, []);

    useEffect(() => {
        model && Object.keys(model).forEach(function (key) {
            setFormValues(f => ({ ...f, [model[key].variable]: model[key].value }))
        });

    }, [model]);

    console.log(formValues);
    const runModel = async () => {
        // set loading 

        let params = '?';
        Object.keys(formValues).forEach(function (key) {
            params += key + "=" + formValues[key] + '&'
        });
        console.log(params);

        api_get_with_params('/xgb', params).then((res) => {
            console.log(res);

        });
    }

    const setFormValue = (key, value) => {
        setFormValues({ ...formValues, [key]: value })
    }

    // create the model form elements
    let modelForm = [];
    model && Object.keys(model).forEach(function (key) {
        switch (model[key].type) {
            case 'continuous_range':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <Form.Range className="range-slider" onChange={e => setFormValue(model[key].variable, e.target.value)} />
                        <Form.Text className="text-prompt">
                            {model[key].help}
                        </Form.Text>
                    </Form.Group>
                )
                break;
            case 'discrete_range':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <Form.Select onChange={e => setFormValue(model[key].variable, e.target.value)}>
                            {
                                Array(model[key].max).fill(0).map((_, i) => <option value={i}>{i}</option>)
                            }
                        </Form.Select>
                        <Form.Text className="text-prompt">
                            {model[key].help}
                        </Form.Text>
                    </Form.Group>
                )
                break;
            case 'percentage':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <InputGroup >
                            <Form.Control onChange={e => setFormValue(model[key].variable, e.target.value)} placeholder={model[key].value} type="number" />
                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                        </InputGroup>
                        <Form.Text className="text-prompt">
                            {model[key].help}
                        </Form.Text>
                    </Form.Group>
                )
                break;
            case 'free_number_entry':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <InputGroup >
                            <Form.Control onChange={e => setFormValue(model[key].variable, e.target.value)} placeholder={model[key].value} type="number" />
                        </InputGroup>
                        <Form.Text className="text-prompt">
                            {model[key].help}
                        </Form.Text>
                    </Form.Group>
                )
                break;
            default:
            case 'free_currency_entry':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            <Form.Control onChange={e => setFormValue(model[key].variable, e.target.value)} placeholder={model[key].value} type="number" />
                        </InputGroup>
                        <Form.Text className="text-prompt">
                            {model[key].help}
                        </Form.Text>
                    </Form.Group>
                )
        }
    });

    // if the model has an uneven number of variables, add an empty placeholder to the end
    modelForm.length % 2 !== 0 && modelForm.push(<></>)

    // arrange the model variable form elements into rows
    let modelFormRows = []
    for (let i = 0; i < modelForm.length; i += 2) {
        modelFormRows.push(
            <Row className="mb-3">
                {modelForm[i]}
                <div className="dummy-col"></div>
                {modelForm[i + 1]}
            </Row>
        )
    }

    return (
        <DefaultLayout scroll>
            <h2>Bank Client Churn Model</h2>
            <Form onSubmit={runModel} className="modelForm">
                {modelFormRows}
            </Form>
            <button onClick={() => runModel()} class="submit-button">Run Model</button>
        </DefaultLayout>
    );
}
