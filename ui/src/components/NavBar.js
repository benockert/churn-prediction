import './NavBar.css';
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="navbar">
            <div>
                <Link to="/"><img className="logo nav-title" src="/images/logo.png" width="40" height="40" alt="bank-client-churn-logo" /></Link>
                <div className="title nav-title">Bank Client Churn Predictor</div>
            </div>
            <div className="nav-options">
                <Link className="nav-option" to="/model">Model</Link>
                <span className="vertical-line"></span>
                <Link className="nav-option" to="/presentation">Presentation</Link>
            </div>
        </div>
    )
}