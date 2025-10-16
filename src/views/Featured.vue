<template>
  <div class="container py-4">
    <Spinner v-if="isLoading" />

    <div v-else class="row featured mx-auto">
      <template v-if="featuredMovies.length">
        <div
          v-for="movie in featuredMovies"
          :key="movie.imdbID"
          class="col-12 col-md-6"
        >
          <Movie :movie="movie" :is-featured="true" />
        </div>
      </template>
      <div v-else>No movies found..</div>
    </div>
  </div>

  <Nav />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMoviesStore } from "@/stores/store-movies.js";
import Spinner from "@/components/Spinner.vue";
import Movie from "@/components/Movie.vue";
import Nav from "@/components/Nav.vue";

const moviesStore = useMoviesStore();
const { isLoading, featuredMovies } = storeToRefs(moviesStore);

moviesStore.getFeaturedMovies(["Big Fish", "Amélie"]);
</script>

<style scoped>
.featured {
  position: relative;
  z-index: 10;
  width: 800px;
}
</style>
