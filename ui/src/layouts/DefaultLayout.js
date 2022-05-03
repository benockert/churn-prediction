import Stack from 'react-bootstrap/Stack';
import { NavBar } from '../components/NavBar';
import './DefaultLayout.css';

export const DefaultLayout = ({ children }) => {

    return (
        <Stack>
            <NavBar />
            <Stack className="default-layout">
                <div className="background-image"></div>
                <div className="content">
                    {children}
                </div>
            </Stack>
        </Stack>

    )

}