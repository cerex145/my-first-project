'use client'

import { useEffect } from 'react'

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

interface MovieModalProps {
    movie: MovieDetail
    isOpen: boolean
    onClose: () => void
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
    useEffect(() => {
        // Cerrar modal al presionar Escape
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen || !movie) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/50">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition"
                >
                    ✕
                </button>

                <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Poster */}
                    <div className="flex justify-center md:col-span-1">
                        <div className="rounded-lg overflow-hidden shadow-lg max-w-xs bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                            {movie.Poster && movie.Poster !== 'N/A' ? (
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-full h-auto rounded-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop'
                                    }}
                                />
                            ) : (
                                <div className="w-full h-96 bg-slate-700 rounded-lg flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <p className="text-2xl mb-2">🎬</p>
                                        <p>Imagen no disponible</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 text-white">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            {movie.Title}
                        </h1>

                        {/* Basic Info */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {movie.Year}
                            </span>
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {movie.Type}
                            </span>
                            {movie.imdbRating !== 'N/A' && (
                                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    ⭐ {movie.imdbRating}/10
                                </span>
                            )}
                        </div>

                        {/* Genre */}
                        {movie.Genre !== 'N/A' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">Géneros:</h3>
                                <p className="text-gray-300">{movie.Genre}</p>
                            </div>
                        )}

                        {/* Runtime */}
                        {movie.Runtime !== 'N/A' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">⏱️ Duración:</h3>
                                <p className="text-gray-300">{movie.Runtime}</p>
                            </div>
                        )}

                        {/* Director */}
                        {movie.Director !== 'N/A' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">Director:</h3>
                                <p className="text-gray-300">{movie.Director}</p>
                            </div>
                        )}

                        {/* Actors */}
                        {movie.Actors !== 'N/A' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">Actores:</h3>
                                <p className="text-gray-300">{movie.Actors}</p>
                            </div>
                        )}

                        {/* Language */}
                        {movie.Language !== 'N/A' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">Idioma:</h3>
                                <p className="text-gray-300">{movie.Language}</p>
                            </div>
                        )}

                        {/* Awards */}
                        {movie.Awards !== 'N/A' && movie.Awards !== 'No awards information' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-purple-300 mb-1">🏆 Premios:</h3>
                                <p className="text-gray-300">{movie.Awards}</p>
                            </div>
                        )}

                        {/* Plot */}
                        {movie.Plot !== 'N/A' && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-purple-300 mb-2">Trama:</h3>
                                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                            </div>
                        )}

                        {/* IMDb Link */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href={`https://www.imdb.com/title/${movie.imdbID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-4 py-2 rounded-lg transition"
                            >
                                Ver en IMDb
                            </a>
                            <button
                                onClick={onClose}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
