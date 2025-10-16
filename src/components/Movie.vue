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
        <h5 class="card-title">{{ movie.Title }}</h5>
        <span>{{ movie.Year }}</span>
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Genre</p>
        <ul class="list-group mb-0" v-if="genreList.length">
          <li
            v-for="(genre, i) in genreList"
            :key="`genre-${i}`"
            class="list-group-item"
          >
            {{ genre }}
          </li>
        </ul>
        <span v-else>—</span>
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Type</p>
        {{ movie.Type }}
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Plot</p>
        {{ movie.Plot }}
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Rated</p>
        {{ movie.Rated }}
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Director</p>
        {{ movie.Director }}
      </div>
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Actors</p>
        <ul class="list-group mb-0" v-if="actorsList.length">
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
      <hr />
      <div class="card-text">
        <p class="fw-bolder">Awards</p>
        {{ movie.Awards }}
      </div>
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
