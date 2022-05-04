import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import { BsInfoCircleFill } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { api_get, api_get_with_params } from '../utils/api.js';
import { Loading } from '../components/Loading';
import './Model.css';

export const Model = () => {
    const [model, setModel] = useState();
    const [formValues, setFormValues] = useState();
    const [loading, setLoading] = useState(true);
    const [prediction, setPrediction] = useState();

    useEffect(() => {
        api_get('/model_vars').then((res) => {
            setModel(res);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        model && !prediction && Object.keys(model).forEach(function (key) {
            setFormValues(f => ({ ...f, [model[key].variable]: model[key].value }))
        });
    }, [model, prediction]);

    useEffect(() => {
        prediction && setLoading(false);
    }, [prediction]);

    const runModel = async () => {
        // form params string
        let params = '?';
        Object.keys(formValues).forEach(function (key) {
            params += key + "=" + formValues[key] + '&'
        });

        console.log(params)

        // send request
        api_get_with_params('/xgb', params).then((res) => {
            console.log(res)
            setPrediction(res);
        });
    }

    const setFormValue = (key, value) => {
        setFormValues({ ...formValues, [key]: value })
    }

    const resetPredictor = () => {
        setPrediction()
    }

    // create the model form elements
    let modelForm = [];
    model && Object.keys(model).forEach(function (key) {
        switch (model[key].type) {
            case 'continuous_range':
                modelForm.push(
                    <Form.Group as={Col}>
                        <Form.Label>{model[key].name}</Form.Label>
                        <Form.Group as={Row} className="range-slider-row">
                            <Col lg="9" xs="8">
                                <Form.Range className="range-slider" onChange={e => setFormValue(model[key].variable, e.target.value)} />
                            </Col>
                            <Col lg="3" xs="4">
                                <InputGroup>
                                    <Form.Control disabled value={formValues && formValues[model[key].variable]} />
                                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
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
        <DefaultLayout scroll={!prediction}>
            <h2>Bank Client Churn Model</h2>
            {loading ?
                <Loading />
                :
                prediction ?
                    <>
                        <p className="prediction-text"><BsInfoCircleFill className="info-icon" />{prediction.text}</p>
                        <Button onClick={() => resetPredictor()} className="submit-button" variant="primary" type="submit">
                            Reset Form
                        </Button>
                    </>
                    :
                    <>
                        <Form className="modelForm">
                            {modelFormRows}
                        </Form>
                        <Button onClick={() => runModel()} className="submit-button" variant="primary" type="submit">
                            Run Model
                        </Button>
                    </>
            }
        </DefaultLayout>
    );
}
