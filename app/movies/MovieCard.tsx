'use client'

import { useState } from 'react'

interface Movie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
}

interface MovieCardProps {
    movie: Movie
    onClick?: (movieId: string) => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <div
            onClick={() => onClick?.(movie.imdbID)}
            className={`bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-purple-500/30 ${onClick ? 'cursor-pointer' : ''}`}
        >
            {movie.Poster && movie.Poster !== 'N/A' && !imageError ? (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 object-cover"
                    onError={handleImageError}
                />
            ) : (
                <div className="w-full h-64 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <div className="text-center">
                        <p className="text-4xl mb-2">🎬</p>
                        <p className="text-sm">Imagen no disponible</p>
                    </div>
                </div>
            )}
            <div className="p-4">
                <h3 className="font-bold text-lg truncate hover:text-purple-400">
                    {movie.Title}
                </h3>
                <p className="text-gray-400 text-sm">
                    {movie.Year} • {movie.Type}
                </p>
                {onClick && (
                    <p className="text-purple-400 text-xs mt-2 font-semibold">
                        Haz clic para ver detalles →
                    </p>
                )}
            </div>
        </div>
    )
}
