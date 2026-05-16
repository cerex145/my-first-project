# 🎬 Galería de Películas y Series - Actividad Integradora

## 📋 Descripción
Aplicación full-stack usando Next.js que combina SSR y CSR para crear una experiencia de usuario óptima al explorar películas y series usando la API de OMDb.

---

## 🏗️ Arquitectura y Decisiones Técnicas

### 1️⃣ Página Principal (SSR)

**Archivo:** `page.tsx`

```tsx
export default async function MoviesGallery() {
    const popularMovies = await getPopularMovies()
    // ...
}
```

**¿Por qué SSR?**
- ✅ **Mejor SEO**: Los datos se renderizan en HTML desde el servidor, perfectos para buscadores
- ✅ **Carga Inicial Rápida**: El usuario ve contenido inmediatamente, no hay "loading state"
- ✅ **Datos Estáticos**: Las películas populares no cambian frecuentemente
- ✅ **Seguridad**: La API key se usa solo en el servidor, nunca se expone al cliente

**Características:**
- Busca 3 términos populares (Marvel, Batman, Avengers)
- Muestra 3 películas de cada búsqueda (9 total)
- Rendered como HTML en el servidor
- Sin JavaScript interactivo necesario

---

### 2️⃣ Búsqueda Interactiva (CSR)

**Archivo:** `SearchMovies.tsx`

```tsx
'use client'

export default function SearchMovies() {
    const [searchQuery, setSearchQuery] = useState('')
    // ...
}
```

**¿Por qué CSR?**
- ✅ **Interactividad**: El usuario escribe y ve resultados sin recargar
- ✅ **Responsividad**: Debounce de 500ms para no sobrecargar la API
- ✅ **Experiencia UX**: Los resultados se muestran en tiempo real
- ✅ **Flexibilidad**: Búsqueda dinámica por cualquier término

**Características:**
- Input con debounce automático (espera 500ms después de escribir)
- Mínimo 3 caracteres para hacer fetch
- Manejo de estados (loading, error, resultados)
- Click en película para ver detalles

---

### 3️⃣ Detalles de la Película (CSR Modal)

**Archivo:** `MovieModal.tsx`

```tsx
'use client'

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
    // Modal interactivo
}
```

**¿Por qué CSR Modal?**
- ✅ **Interactividad**: Abrir/cerrar sin recargar página
- ✅ **UX Fluido**: El usuario ve detalles sin navegar a otra página
- ✅ **Funcionalidad Modal**: Cerrar con ESC, click fuera, o botón
- ✅ **Responsive**: Ajusta el tamaño según la pantalla

**Características:**
- Grid responsive (1 columna móvil, 2+ en desktop)
- Información completa de la película
- Link directo a IMDb
- Cerrar modal: ESC key, click en backdrop, botón X

---

## 📊 Flujo de Datos

```
Usuario abre /movies
    ↓
[SSR] page.tsx → getPopularMovies() → Películas renderizadas en HTML
    ↓
Usuario ve películas populares + barra de búsqueda
    ↓
Usuario escribe en barra [CSR]
    ↓
[CSR] Debounce 500ms → SearchMovies hace fetch a OMDb
    ↓
Resultados en tiempo real
    ↓
Usuario hace click en película
    ↓
[CSR] Fetch detalles → Modal abre con info completa
```

---

## 🔧 Stack Técnico

| Tecnología | Propósito |
|-----------|----------|
| **Next.js 16** | Framework full-stack |
| **React 19** | UI components |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP requests |
| **OMDb API** | Datos de películas |

---

## 📝 Requisitos Cumplidos

- ✅ `'use client'` directive usado correctamente en componentes CSR
- ✅ `async/await` en funciones SSR (`getPopularMovies`)
- ✅ `useState` y `useEffect` en SearchMovies y MovieModal
- ✅ UI atractiva con Tailwind CSS
- ✅ Justificación clara de SSR vs CSR
- ✅ Manejo de errores (try/catch)
- ✅ TypeScript interfaces para type safety
- ✅ Debounce en búsqueda para optimizar API calls

---

## 🎨 Características de UI

### Gradientes
- Fondo principal: `from-slate-900 via-purple-900 to-slate-900`
- Títulos: Gradient text `from-purple-400 to-pink-600`

### Interactividad
- Hover effects con scale y shadow
- Animaciones de loading (spinner)
- Transiciones suaves en todos los elementos
- Modal responsive con backdrop blur

### Accesibilidad
- ESC key cierra modal
- Click fuera cierra modal
- Botón X explícito
- Focus states en inputs
- Placeholder descriptivo

---

## 🚀 Mejoras Futuras

1. **Paginación**: Agregar scroll infinito o botón "Cargar más"
2. **Favoritos**: Guardar películas en localStorage
3. **Historial**: Mostrar búsquedas recientes
4. **Filtros**: Por año, género, rating
5. **Caché**: Implementar React Query o SWR
6. **Social**: Compartir película en redes
7. **Rating Local**: Que usuarios califiquen películas

---

## 🔐 Notas de Seguridad

- API key está limitada a 1000 requests/día
- Nunca exponer API key en código del cliente
- En producción, usar variables de entorno
- Validar inputs en el servidor antes de hacer requests

---

## 📚 Referencias

- [OMDb API Documentation](https://www.omdbapi.com/)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
