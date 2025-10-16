<template>
  <div class="container py-4">
    <button
      @click="goBack"
      class="mb-4 px-4 py-2 bg-gray-700 text-white rounded btn btn-secondary"
    >
      ← Back to results
    </button>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="movie">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="movie.Poster"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title">{{ movie.Title }} - {{ movie.Year }}</h5>
                <span>{{ movie.Rated }}</span>
              </div>
              <p class="card-text">
                <small class="text-body-secondary">
                  Genre: {{ movie.Genre }} | Type: {{ movie.Type }}
                </small>
              </p>
              <p class="card-text">{{ movie.Plot }}</p>
              <hr />
              <p class="card-text">Director: {{ movie.Director }}</p>
              <p class="card-text">Actors: {{ movie.Actors }}</p>
              <p class="card-text">Awards: {{ movie.Awards }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/store-movies.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const moviesStore = useMoviesStore();
const { isLoading, selectedMovie: movie } = storeToRefs(moviesStore);

onMounted(() => {
  moviesStore.getMovieById(route.params.id);
});

function goBack() {
  const query = route.query.q || "";
  if (query) {
    router.push({ name: "movies", query: { q: query } });
  } else {
    router.push({ name: "movies" });
  }
}
</script>
