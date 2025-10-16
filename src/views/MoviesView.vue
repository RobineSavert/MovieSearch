<template>
  <Video />
  <Masthead @search="handleSearch" />
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
const { movies, searchQuery } = storeToRefs(moviesStore);

const handleSearch = async (query) => {
  if (!query) return;
  await moviesStore.getAllMoviesBySearch(query);
};
</script>
