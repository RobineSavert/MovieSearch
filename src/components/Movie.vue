<template>
  <div v-if="isFeatured" class="card text-center mb-4">
    <img :src="movie.Poster" class="card-img-top max-img" :alt="movie.Title" />
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title">{{ movie.Title }} - {{ movie.Year }}</h5>
      </div>
      <p class="card-text">{{ movie.Plot }}</p>
      <hr />
      <p class="card-text">Awards: {{ movie.Awards }}</p>
    </div>
  </div>

  <div class="card mb-4" v-else>
    <img :src="movie.Poster" class="card-img-top max-img" :alt="movie.Title" />
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title">{{ movie.Title }} - {{ movie.Year }}</h5>
        <span>{{ movie.Rated }}</span>
      </div>
      <div class="card-text">
        <span class="bold">Genre:</span>
        <ul class="list-group list-group-flush mb-0" v-if="genreList.length">
          <li
            v-for="(genre, i) in genreList"
            :key="`genre-${i}`"
            class="list-group-item"
          >
            {{ genre }}
          </li>
        </ul>
        <span v-else>—</span>
        | Type: {{ movie.Type }}
      </div>
      <p class="card-text">{{ movie.Plot }}</p>
      <hr />
      <p class="card-text">Director: {{ movie.Director }}</p>
      <div class="card-text">
        <span class="bold">Actors:</span>
        <ul class="list-group list-group-flush mb-0" v-if="actorsList.length">
          <li
            v-for="(actor, i) in actorsList"
            :key="`actor-${i}`"
            class="list-group-item"
          >
            {{ actor }}
          </li>
        </ul>
        <span v-else>—</span>
      </div>
      <p class="card-text">Awards: {{ movie.Awards }}</p>
    </div>

    <div class="card-body">
      <RouterLink
        :to="{ name: 'movie', params: { id: movie.imdbID } }"
        class="btn btn-primary"
        >Details</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const parseList = (value) =>
  (value || "")
    .toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const genreList = computed(() => parseList(props.movie?.Genre));
const actorsList = computed(() => parseList(props.movie?.Actors));
</script>

<style scoped>
.max-img {
  height: 300px;
  object-fit: cover;
}
</style>
