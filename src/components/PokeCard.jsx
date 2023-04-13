import { Link } from "react-router-dom";

const PokeCard = ({ pokemon }) => {

    const { url, name } =  pokemon.pokemon !== undefined ? pokemon.pokemon :  pokemon
    const id = Number(url.split('/')[6])

    return (
        <Link 
            to={`/${id}`} 
            className="card mb-3 d-flex align-items-center text-decoration-none"
        >
            <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                className="img-fluid rounded-start" 
                width="200"
            />
            <h5 className="card-title mt-3">{name}</h5>
        </Link>
    )
}

export default PokeCard