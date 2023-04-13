import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Search from './Search'
import EmptyResults from './EmptyResults'
import PokeList from './PokeList'

const Home = () => {

    const BASE_URL = 'https://pokeapi.co/api/v2';
    const [ pokemons, setPokemons ] = useState([])
    const [ types, setTypes ] = useState([])
    const [ nextPage, setNextpage ] = useState(null)
    const [ previousPage, setPreviousPage ] = useState(null)
    const [ showPagination, setShowPagination ] = useState(true)
    const [ isLoading, setIsLoading ] = useState(false)
    const { type_name } = useParams()

    useEffect(() => {
        if(type_name === undefined){
            fetchPokemons(`${BASE_URL}/pokemon?limit=20`)
        }else{
            searchPokemon({search: 'type', value: type_name})
        }
        fetchTypes()
        console.log("type_name", type_name);
    }, [])

    const fetchPokemons = (url) => {
        setIsLoading(true)
        fetch(url)
            .then(response => response.json())
            .catch(error => setPokemons([]))
            .then(pokes => { 
                if(pokes['results'] !== undefined){
                    setPokemons(pokes.results)
                    setNextpage(pokes.next)
                    setPreviousPage(pokes.previous)
                    setShowPagination(true)
                }
                else if(pokes['pokemon'] !== undefined){
                    setPokemons(pokes.pokemon)
                    setShowPagination(false)
                }
                else{
                    setPokemons([{name: pokes.name, url: `${BASE_URL}/pokemon/${pokes.id}/`}])
                    setShowPagination(false)
                }
            })
            .finally(() => setIsLoading(false))
    };

    const fetchTypes = () => {
        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .catch(error => setTypes([]))
            .then(result => setTypes(result.results))
    }

    const searchPokemon = (data) => {
        const { search, value } = data;
        let url = `${BASE_URL}`;
        url += search === 'name' ? `/pokemon/${value}` : `/type/${value}`;
        fetchPokemons(url); 
    }

    const onPrevious = () => {
        fetchPokemons(previousPage)
    }

    const onNext = () => {
        fetchPokemons(nextPage)
    }

    const onPaginate = (number) => {
        let offset = (number * 2) * 10;
        let url = `${BASE_URL}/pokemon?offset=${offset}&limit=20`;
        fetchPokemons(url)
    }

    const clearSearch = () => {
        fetchPokemons(`${BASE_URL}/pokemon?limit=20`)
    }    

    return (
        <>  
            <h1 className="display-5 fw-bold pt-5 text-center">Bienvenido a Pokedex</h1>
            <Search searchPokemon={searchPokemon} clearSearch={clearSearch} types={types}  />
            <div className='my-4' />
            {
                pokemons && pokemons.length > 0 
                ?
                    <>
                        <PokeList pokemons={pokemons} searchPokemon={searchPokemon} isLoading={isLoading} />
                        { showPagination && 
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#!" onClick={onPrevious}>Anterior</a></li>
                                    <li className="page-item"><a className="page-link" href="#!" onClick={() => onPaginate(1)}>1</a></li>
                                    <li className="page-item"><a className="page-link" href="#!" onClick={() => onPaginate(2)}>2</a></li>
                                    <li className="page-item"><a className="page-link" href="#!" onClick={() => onPaginate(3)}>3</a></li>
                                    <li className="page-item"><a className="page-link" href="#!" onClick={onNext}>Siguiente</a></li>
                                </ul>
                            </nav>
                        }
                    </>
                :
                    <EmptyResults />
            }
            
        </>
    )
}

export default Home