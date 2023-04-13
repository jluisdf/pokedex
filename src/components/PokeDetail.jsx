import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

import EmptyResults from './EmptyResults'

const PokeDetail = () => {

    const [ pokemon, setPokemon ] = useState([]);
    const { pokemon_id } = useParams()
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = () => {
        setIsLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
            .then(response => response.json())
            .catch(error => setPokemon([]))
            .then(detail => setPokemon(detail))
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            { isLoading && 
                <div className='row mt-4 d-flex align-items-center'>
                    <div className='col-3 offset-2 text-center'>
                        <div className='rounded-circle bg-secondary' style={{height:'180px', width: '180px'}}></div>
                    </div>
                    <div className='col-4'>
                        <p className="placeholder-glow">
                        <span className="placeholder col-8"></span>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-8"></span>
                            <span className="placeholder col-6"></span>
                        </p>
                    </div>
                </div>
                
            }

            { Object.keys(pokemon).length === 0 
                ?
                    <EmptyResults />
                :
                <>  
                    <div className='row mt-4'>
                        <div className='col-md-3 col-12 offset-2'>
                            <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                                className="border rounded-circle" 
                                width="200"
                            />
                            <h3 className="card-title mt-3">{pokemon.name}</h3>
                            ID: {pokemon.id}
                        </div>
                        <div className='col-md-4 offset-md-0 col-8 offset-2 text-start mt-2'>
                            <b>Stats:</b>
                            { pokemon.stats.map((stat, i) => 
                                <div className='row mt-2' key={i}>
                                    <div className='col-6'>{stat.stat.name}:</div>
                                    <div className='col-6'>{stat.base_stat}</div>
                                </div>
                            )}
                            
                            <div className='mt-3 mb-2 fw-bolder'>Tipos:</div>

                            { pokemon.types.map((type, i) => 
                            
                                <Link 
                                    to={`/type/${type.type.name}`}
                                    className={`badge rounded-pill me-1 px-4 py-2 badge-${type.type.name} text-decoration-none`} 
                                    key={i}
                                >
                                    {type.type.name}
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default PokeDetail