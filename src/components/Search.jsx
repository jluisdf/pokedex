import { useState, useEffect } from 'react'

const Search = ({ searchPokemon, clearSearch, types }) => {

    const [ filterByName, setFilterByName ] = useState(true);
    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('');

    const onSubmitForm = (event) => {
        event.preventDefault();
        let data = {
            search: filterByName ? 'name' : 'type',
            value: filterByName ? name : type
        }
        searchPokemon(data);
    }

    const resetForm = () => {
        document.getElementById("search-form").reset();
        setFilterByName(true);
        setName('');
        setType('');
        clearSearch();
    } 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSubmitForm(event);
        }
    }

    return (
        <form onSubmit={ onSubmitForm } id="search-form">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3 my-3">
                    <div className="input-group">
                        <button 
                            className="btn btn-outline-secondary" type="button"
                            onClick={(e) => setFilterByName(!filterByName)}
                        >
                            Buscar por
                        </button>
                        { filterByName 
                            ? 
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del Pokemon" 
                                    required 
                                    onChange={e => setName(e.target.value)}
                                    pattern="[a-zA-Z0-9]+"
                                    onKeyDown={handleKeyDown}
                                    value={name}
                                />
                            :
                                <select 
                                    className="form-select" 
                                    id="inputGroupSelect01" 
                                    required
                                    onChange={e => setType(e.target.value)}
                                    value={type}
                                >
                                    <option value="" defaultValue={null}>Tipo de Pokemon</option>
                                    {
                                        types && types.length && (
                                            types.map((type, i) => 
                                                <option value={type.name} key={i}>{type.name}</option>
                                            )
                                        )
                                    }
                                </select>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-center align-items-center">
                    <button className="btn btn-danger px-5" type="submit">Buscar</button>
                    <button className="btn btn-danger px-5 ms-2" type="button" onClick={resetForm}>Resetear</button>
                </div>
            </div>
        </form>
    )
}

export default Search