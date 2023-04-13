import { Link } from "react-router-dom";
import pokeball from '../assets/pokeball.png'

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={pokeball} alt="" width="30" height="30" className="d-inline-block align-text-top me-2" />
                    Pokedex
                </Link>
            </div>
        </nav>
    )
}

export default Navbar