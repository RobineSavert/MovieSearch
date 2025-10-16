<template>
  <form id="movieForm" @submit.prevent="onSubmit">
    <div class="row input-group-movie">
      <div class="col">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a movie..."
          class="form-control"
        />
        <select
          id="plotType"
          v-model="plotType"
          class="form-select form-select-sm my-3"
          aria-label="Large select example"
        >
          <option selected>Plot</option>
          <option value="short">Short</option>
          <option value="full">Full</option>
        </select>
      </div>
      <div class="col-auto">
        <button
          type="button"
          @click="clearQuery"
          class="btn btn-secondary ms-2"
          v-if="searchQuery"
        >
          Reset search
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "@/stores/store-movies.js";

const moviesStore = useMoviesStore();
const route = useRoute();
const searchQuery = ref(moviesStore.searchQuery || route.query.q || "");
const plotType = ref("short");
const emit = defineEmits(["search"]);

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
    emit("search", query);
  } else {
    moviesStore.searchQuery = "";
    moviesStore.movies = [];
  }
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

function onSubmit() {
  if (searchQuery.value.trim()) {
    moviesStore.searchQuery = searchQuery.value
    moviesStore.getAllMoviesBySearch(searchQuery.value, plotType.value)
    emit("search", searchQuery.value)
  }
}

</script>

<style scoped>
input {
  height: auto;
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
}

.input-group-movie button {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: calc(1rem + 2px);
}
</style>
