import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    isLoading: false,
    movies: [],
    featuredMovies: [],
    searchQuery: "",
    selectedMovie: null,
    hasMovies: false,
    baseUrl: import.meta.env.VITE_API_BASE,
    apiKey: import.meta.env.VITE_API_KEY,
  }),

  actions: {
    async getAllMoviesBySearch(query, plot = "short") {
      this.isLoading = true;
      this.searchQuery = query;

      try {
        const res = await fetch(
          `${this.baseUrl}?s=${encodeURIComponent(query)}&apikey=${this.apiKey}`,
        );
        const data = await res.json();

        if (!data.Search || data.Response === "False") {
          this.movies = [];
          this.hasMovies = false
          return;
        }

        const topFive = data.Search.slice(0, 5);

        const detailedResults = await Promise.all(
          topFive.map(async (movie) => {
            const detailRes = await fetch(
              `${this.baseUrl}?i=${movie.imdbID}&apikey=${this.apiKey}&plot=${plot}`,
            );
            return await detailRes.json();
          }),
        );

        this.movies = detailedResults.filter(
          (m) => m && m.Response !== "False",
        )
        this.hasMovies = true;
      } catch (error) {
        console.error("Error fetching movies:", error);
        this.movies = [];
      } finally {
        this.isLoading = false;
      }
    },

    async getFeaturedMovies(titles = []) {
      this.isLoading = true;
      try {
        const results = await Promise.all(
          titles.map(async (title) => {
            const res = await fetch(
              `${this.baseUrl}?t=${encodeURIComponent(title)}&apikey=${this.apiKey}&plot=full`,
            );
            return await res.json();
          }),
        );

        this.featuredMovies = results.filter(
          (movie) => movie && movie.Response !== "False",
        );

        return this.featuredMovies;
      } catch (error) {
        console.error("Error fetching featured movies:", error);
        this.featuredMovies = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});
