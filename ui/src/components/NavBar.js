import './NavBar.css';
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="navbar">
            <div>
                <a href="/"><img className="logo nav-title" src="/images/logo.png" width="40" height="40" alt="bank-client-churn-logo" /></a>
                <div className="title nav-title">Bank Client Churn</div>
            </div>
            <div className="nav-options">
                <Link className="nav-option vertical-line" to="/model">Model</Link>
                <Link className="nav-option" to="/presentation">Presentation</Link>
            </div>
        </div>
    )
}