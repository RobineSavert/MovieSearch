<template>
  <Spinner v-if="isLoading" />
  <div v-else class="results-section bg-dark text-white py-5">
    <div class="container">
      <h2 class="mb-4">Search results for "{{ searchQuery }}"</h2>
      <div class="row">
        <div
          v-for="movie in movies"
          :key="movie.imdbID"
          class="col-md-4 col-12 mb-4"
        >
          <Movie :movie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Movie from "@/components/Movie.vue";
import Spinner from "@/components/Spinner.vue";
import { storeToRefs } from "pinia";
import { useMoviesStore } from "@/stores/store-movies.js";

const moviesStore = useMoviesStore();
const { isLoading, movies, searchQuery } = storeToRefs(moviesStore);

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.results-section {
  background-color: #111;
  min-height: 50vh;
  animation: fadeIn 0.8s ease forwards;
  position: relative;
  z-index: 10;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
