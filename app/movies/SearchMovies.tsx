'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieModal from './MovieModal'
import MovieCard from './MovieCard'

const OMDb_API_KEY = 'f1def80d'
const OMDb_BASE_URL = 'http://www.omdbapi.com/'

interface Movie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
}

interface MovieDetail {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
    Plot: string
    Director: string
    Actors: string
    Runtime: string
    imdbRating: string
    Genre: string
    Language: string
    Awards: string
}

interface OMDbSearchResponse {
    Search: Movie[]
    totalResults: string
    Response: string
}

interface OMDbDetailResponse {
    Response: string
    [key: string]: string
}

export default function SearchMovies() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim().length > 2) {
                handleSearch()
            } else {
                setSearchResults([])
                setError('')
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const handleSearch = async () => {
        if (searchQuery.trim().length <= 2) return

        setLoading(true)
        setError('')

        try {
            const response = await axios.get<OMDbSearchResponse>(OMDb_BASE_URL, {
                params: {
                    apikey: OMDb_API_KEY,
                    s: searchQuery,
                    type: 'movie'
                }
            })

            if (response.data.Response === 'True') {
                setSearchResults(response.data.Search)
            } else {
                setSearchResults([])
                setError('No se encontraron resultados')
            }
        } catch (err) {
            console.error('Error searching movies:', err)
            setError('Error al buscar. Intenta de nuevo.')
            setSearchResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleMovieClick = async (movieId: string) => {
        try {
            setLoading(true)
            const response = await axios.get(OMDb_BASE_URL, {
                params: {
                    apikey: OMDb_API_KEY,
                    i: movieId
                }
            })

            if (response.data.Response === 'True') {
                // Asegurar que todos los campos tengan valores por defecto
                const movieData: MovieDetail = {
                    imdbID: response.data.imdbID || '',
                    Title: response.data.Title || 'Sin título',
                    Year: response.data.Year || 'N/A',
                    Poster: response.data.Poster !== 'N/A' ? response.data.Poster : '',
                    Type: response.data.Type || 'N/A',
                    Plot: response.data.Plot || 'Sin descripción disponible',
                    Director: response.data.Director || 'N/A',
                    Actors: response.data.Actors || 'N/A',
                    Runtime: response.data.Runtime || 'N/A',
                    imdbRating: response.data.imdbRating || 'N/A',
                    Genre: response.data.Genre || 'N/A',
                    Language: response.data.Language || 'N/A',
                    Awards: response.data.Awards || 'N/A'
                }
                setSelectedMovie(movieData)
                setShowModal(true)
            } else {
                setError('No se encontraron detalles de la película')
            }
            setLoading(false)
        } catch (err) {
            console.error('Error fetching movie details:', err)
            setError('Error al cargar detalles de la película')
            setLoading(false)
        }
    }

    return (
        <>
            {/* Search Bar */}
            <div className="mb-8">
                <div className="bg-slate-800 border-2 border-purple-500/50 rounded-lg p-6 shadow-lg">
                    <label className="block text-sm font-semibold mb-3 text-gray-300">
                        🔍 Buscar Películas (CSR - Resultados en tiempo real)
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ej: Marvel, Avengers, Batman..."
                        className="w-full px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        Escribe al menos 3 caracteres para buscar
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="mt-4 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                        <span className="ml-3 text-gray-300">Buscando...</span>
                    </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && !loading && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-purple-300">
                            Resultados encontrados ({searchResults.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {searchResults.map((movie) => (
                                <MovieCard 
                                    key={movie.imdbID} 
                                    movie={movie}
                                    onClick={handleMovieClick}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery.length > 2 && !loading && searchResults.length === 0 && !error && (
                    <div className="mt-4 text-center text-gray-400 py-8">
                        <p>No se encontraron películas con "{searchQuery}"</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}
