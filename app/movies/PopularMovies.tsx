'use client'

import { useState } from 'react'
import MovieCard from './MovieCard'
import MovieModal from './MovieModal'

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

interface PopularMoviesProps {
    movies: Movie[]
}

const OMDb_API_KEY = 'f1def80d'
const OMDb_BASE_URL = 'http://www.omdbapi.com/'

export default function PopularMovies({ movies }: PopularMoviesProps) {
    const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)
    const [showModal, setShowModal] = useState(false)

    const handleMovieClick = async (movieId: string) => {
        try {
            const response = await fetch(OMDb_BASE_URL + `?apikey=${OMDb_API_KEY}&i=${movieId}`)
            const data = await response.json()

            if (data.Response === 'True') {
                const movieData: MovieDetail = {
                    imdbID: data.imdbID || '',
                    Title: data.Title || 'Sin título',
                    Year: data.Year || 'N/A',
                    Poster: data.Poster !== 'N/A' ? data.Poster : '',
                    Type: data.Type || 'N/A',
                    Plot: data.Plot || 'Sin descripción disponible',
                    Director: data.Director || 'N/A',
                    Actors: data.Actors || 'N/A',
                    Runtime: data.Runtime || 'N/A',
                    imdbRating: data.imdbRating || 'N/A',
                    Genre: data.Genre || 'N/A',
                    Language: data.Language || 'N/A',
                    Awards: data.Awards || 'N/A'
                }
                setSelectedMovie(movieData)
                setShowModal(true)
            }
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.imdbID} 
                        movie={movie}
                        onClick={handleMovieClick}
                    />
                ))}
            </div>

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
