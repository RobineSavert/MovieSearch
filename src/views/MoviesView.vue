<template>
  <Video />
  <Masthead @search="handleSearch" />
      <div v-if="hasMovies" class="scroll-arrow">
      <BootstrapIcon icon="chevron-double-down" size="3x" animation="throb" />
  </div>
  <Nav />
  <Results v-if="movies.length" :movies="movies" :search-query="searchQuery" />
</template>
<script setup>
import { useMoviesStore } from "@/stores/store-movies.js";
import { storeToRefs } from "pinia";
import Nav from "@/components/Nav.vue";
import Video from "@/components/Video.vue";
import Masthead from "@/components/Masthead.vue";
import Results from "@/components/Results.vue";

const moviesStore = useMoviesStore();
const { movies, searchQuery, hasMovies } = storeToRefs(moviesStore);

const handleSearch = async (query) => {
  if (!query) return;
  await moviesStore.getAllMoviesBySearch(query);
};

</script>

<style scoped>
.scroll-arrow {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 5;
  transition: opacity 0.3s;
}

.scroll-arrow:hover {
  opacity: 1;
}
</style>
