<template>
  <div class="p-5 mb-4 bg-body-tertiary rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Search a movie</h1>

      <div class="d-flex align-items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a movie..."
          class="border rounded p-2 flex-grow-1"
        />
        <button
          type="button"
          @click="clearQuery"
          class="btn btn-secondary ms-2"
          v-if="searchQuery"
        >
          Reset search
        </button>
      </div>
      <div class="mt-3">
        <label class="me-2 fw-semibold">Plot:</label>
        <select v-model="plotType" class="border rounded p-1">
          <option value="short">Short</option>
          <option value="full">Full</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMoviesStore } from "@/stores/store-movies.js";
import { useRouter, useRoute } from "vue-router";

const moviesStore = useMoviesStore();
const router = useRouter();
const route = useRoute();

const searchQuery = ref(moviesStore.searchQuery || route.query.q || "");
const plotType = ref("short");

function debounce(fn, delay = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  if (query.trim() !== "") {
    moviesStore.searchQuery = query;
    moviesStore.getAllMoviesBySearch(query, plotType.value);
  } else {
    moviesStore.searchQuery = "";
    moviesStore.movies = [];
  }
  router.replace({ name: "movies", query: query ? { q: query } : {} });
});

watch(searchQuery, (newVal) => {
  debouncedSearch(newVal);
});

watch(plotType, () => {
  if (searchQuery.value.trim()) {
    moviesStore.getAllMoviesBySearch(searchQuery.value, plotType.value);
  }
});

function clearQuery() {
  searchQuery.value = "";
}
</script>
