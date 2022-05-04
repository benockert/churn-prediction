import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import { api_get } from '../utils/api.js';
import { Loading } from '../components/Loading';

export const Home = () => {
    const [title, setTitle] = useState();
    const [names, setNames] = useState();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        setLoading(!title || !names);
    }, [title, names])

    return (
        <DefaultLayout>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <h1>{title}</h1>
                        <h3>{names}</h3>
                    </>
            }
        </DefaultLayout>
    );
}
