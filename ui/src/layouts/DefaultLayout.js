import Stack from 'react-bootstrap/Stack';
import { NavBar } from '../components/NavBar';
import './DefaultLayout.css';

export const DefaultLayout = ({ scroll, children }) => {
    console.log("Scroll", scroll)

    return (
        <Stack >
            <NavBar />
            <Stack className="default-layout">
                <div className="background-image"></div>
                {scroll ?
                    <div className="content scroll">
                        {children}
                    </div>
                    :
                    <div className="content">
                        {children}
                    </div>
                }
            </Stack>
        </Stack >

    )

}