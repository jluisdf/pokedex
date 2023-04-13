
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Navbar from './components/Navbar'
import PokeList from './components/PokeList'
import PokeDetail from './components/PokeDetail'
import Home from './components/Home'

const NoMatch = () => {
	return ( <h2>NoMatch</h2> )
}


function App() {
	return (
		<div className="App">
  			<Navbar />
			<div className='container'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:pokemon_id" element={<PokeDetail />} />
					<Route path="/type/:type_name" element={<Home />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</div>
  		</div>
  	)
}

export default App
