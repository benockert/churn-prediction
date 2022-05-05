import { useEffect, useState } from 'react';
import { DefaultLayout } from "../layouts/DefaultLayout";
import { api_get } from '../utils/api.js';
import { Loading } from '../components/Loading';
import { BsGithub } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import './Home.css';

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

    const openPage = (link) => {
        window.open(link);
    }

    return (
        <DefaultLayout>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <h1 className="title-text">{title}</h1>
                        <h3>{names}</h3>
                        <span>
                            <Button onClick={() => openPage("https://github.com/benockert/churn-prediction/tree/main/ui")} className="submit-button home-button" variant="primary" type="submit">
                                Source on <BsGithub />
                            </Button>
                            <Button onClick={() => openPage("https://fina-4390.s3.amazonaws.com/Final+Project-+ML+full.pdf")} className="submit-button home-button" variant="primary" type="submit">
                                Full Presentation
                            </Button>
                        </span>
                    </>
            }
        </DefaultLayout>
    );
}
