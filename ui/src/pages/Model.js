import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Model = () => {

    return (
        <DefaultLayout>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Input 1</Form.Label>
                    <Form.Control type="text" placeholder="Enter value" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Input 2</Form.Label>
                    <Form.Control type="password" placeholder="Enter value" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Checkbox" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </DefaultLayout>
    );
}
