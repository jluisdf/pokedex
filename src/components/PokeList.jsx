import PokeCard from './PokeCard'

const PokeList = ({ pokemons, isLoading }) => {

    return (
       <div className="row">
            {   
                !isLoading 
                    ? 
                        pokemons.map((pokemon, index) => 
                            <div className='col-md-3 col-6' key={index}>
                               <PokeCard pokemon={pokemon} />
                            </div>
                        )
                    :
                        [...Array(12)].map((entry, index) => 
                            <div className="col-md-3 col-6 mb-3" key={index}>
                                <p className="card-text placeholder-glow border p-3">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>
                            </div>
                        )
            }
       </div>
    )
}

export default PokeList