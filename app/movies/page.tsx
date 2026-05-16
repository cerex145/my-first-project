import axios from 'axios'
import SearchMovies from './SearchMovies'
import PopularMovies from './PopularMovies'

const OMDb_API_KEY = 'f1def80d'
const OMDb_BASE_URL = 'http://www.omdbapi.com/'

interface Movie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
}

interface OMDbResponse {
    Search: Movie[]
    totalResults: string
    Response: string
}

async function getPopularMovies(): Promise<Movie[]> {
    try {
        // Búsquedas de películas populares
        const searches = ['Marvel', 'Batman', 'Avengers']
        const allMovies: Movie[] = []

        for (const search of searches) {
            const response = await axios.get<OMDbResponse>(OMDb_BASE_URL, {
                params: {
                    apikey: OMDb_API_KEY,
                    s: search,
                    type: 'movie'
                }
            })

            if (response.data.Response === 'True') {
                allMovies.push(...response.data.Search.slice(0, 3))
            }
        }

        return allMovies
    } catch (error) {
        console.error('Error fetching popular movies:', error)
        return []
    }
}

export default async function MoviesGallery() {
    const popularMovies = await getPopularMovies()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        🎬 Galería de Películas y Series
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Descubre y explora películas usando la API de OMDb
                    </p>
                </div>

                {/* Search Component (CSR) */}
                <div className="mb-12">
                    <SearchMovies />
                </div>

                {/* Popular Movies (SSR) */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-yellow-400">⭐</span>
                        Películas Populares (SSR)
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        Estas películas fueron cargadas en el servidor. Mejor para SEO y carga inicial.
                    </p>

                    {popularMovies.length > 0 ? (
                        <PopularMovies movies={popularMovies} />
                    ) : (
                        <div className="bg-slate-800 rounded-lg p-8 text-center">
                            <p className="text-gray-400">No se pudieron cargar películas populares</p>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-2">ℹ️ Sobre esta aplicación</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✅ <strong>SSR:</strong> Las películas populares se cargan en el servidor (mejor SEO)</li>
                        <li>✅ <strong>CSR:</strong> La búsqueda es interactiva en el cliente (sin recargar página)</li>
                        <li>✅ <strong>API:</strong> Usando OMDb API con limite de 1000 requests/día</li>
                        <li>✅ <strong>UI:</strong> Construida con Tailwind CSS</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
