<template>
  <div class="container py-4">
    <SearchBar />

    <Spinner v-if="isLoading" />

    <div v-else class="row">
      <template v-if="movies.length">
        <div
          v-for="movie in movies.slice(0, 5)"
          :key="movie.imdbID"
          class="col-12 col-md-3"
        >
          <Movie :movie="movie" />
        </div>
      </template>
      <div v-else-if="searchQuery">No movies found.</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "@/stores/store-movies.js";
import Spinner from "@/components/Spinner.vue";
import Movie from "@/components/Movie.vue";
import SearchBar from "@/components/SearchBar.vue";

const moviesStore = useMoviesStore();
const { isLoading, movies, searchQuery } = storeToRefs(moviesStore);
</script>
