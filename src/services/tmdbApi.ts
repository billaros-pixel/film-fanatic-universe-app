
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWRkNDc0NmVlZTZmMGI5ZWRkNmZkMTFkMTk1ZTliZCIsIm5iZiI6MTc0ODQ1MDc5OS42MTksInN1YiI6IjY4MzczZGVmZDhjYTc0YTlkYWI2YzU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mdtmiXHkuxxSA2XM24ql-_JoDgJw3to198hFJcjxrX8';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  genre_ids: number[];
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const headers = {
  'Authorization': `Bearer ${TMDB_API_KEY}`,
  'Content-Type': 'application/json',
};

export const tmdbApi = {
  // Δημοφιλείς ταινίες
  getPopularMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?page=${page}&language=el-GR`,
      { headers }
    );
    return response.json();
  },

  // Κορυφαίες ταινίες
  getTopRatedMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?page=${page}&language=el-GR`,
      { headers }
    );
    return response.json();
  },

  // Επερχόμενες ταινίες
  getUpcomingMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?page=${page}&language=el-GR`,
      { headers }
    );
    return response.json();
  },

  // Ταινίες που παίζουν τώρα
  getNowPlayingMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?page=${page}&language=el-GR`,
      { headers }
    );
    return response.json();
  },

  // Αναζήτηση ταινιών
  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=el-GR`,
      { headers }
    );
    return response.json();
  },

  // Helper για τη δημιουργία URL εικόνων
  getImageUrl: (path: string | null): string => {
    if (!path) return '/placeholder.svg';
    return `${TMDB_IMAGE_BASE_URL}${path}`;
  },

  // Helper για τη δημιουργία URL backdrop εικόνων
  getBackdropUrl: (path: string | null): string => {
    if (!path) return 'https://images.unsplash.com/photo-1489599188041-d6ba9e166b41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    return `https://image.tmdb.org/t/p/w1280${path}`;
  }
};
