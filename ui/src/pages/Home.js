import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import { api_get, api_post } from '../utils/api.js';

export const Home = () => {
    const [title, setTitle] = useState("");
    const [names, setNames] = useState("");

    useEffect(() => {
        api_get('/title').then((res) => {
            setTitle(res.data);
        });
    }, []);

    useEffect(() => {
        api_get('/names').then((res) => {
            setNames(res.data);
        });
    }, []);

    return (
        <DefaultLayout>
            <h1>{title}</h1>
            <h3>{names}</h3>
        </DefaultLayout>
    );
}
