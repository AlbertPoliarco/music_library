// STYLE
import './App.css';
// HOOKS
import { useState, useRef } from 'react'
// COMPONENTS
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
// CONTEXT
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
// ROUTER
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
    let [data, setData] = useState([])
    let [message, setMessage] = useState('Search for Music!')
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='
    
    const handleSearch = (e, term) => {
        e.preventDefault()
        // Fetch Data
        const fetchData = async () => {
            const response = await fetch(API_URL + term)
            const resData = await response.json()
            if (resData.results.length > 0) {
                // Set State and Context valuer
                return setData(resData.results)
            } else {
                return setMessage('Not Found!')
            }
        }
        fetchData()
    }
    
    return (
      <div className="App">
        {message}
        <Router>
          <Routes>
            <Route path="/" element={
              <div>
                <SearchBar handleSearch={handleSearch} />
                <Gallery data={data} />
              </div>
            } />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} /> 
          </Routes>
        </Router>
      </div>
    );
}

export default App;
