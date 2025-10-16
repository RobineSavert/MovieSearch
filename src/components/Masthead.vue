<template>
  <div class="masthead">
    <div class="masthead-content text-white">
      <div class="container-fluid px-4 px-lg-0">
        <h1 class="fst-italic lh-1 mb-4">Search our movie database</h1>
        <p class="mb-5">
          Welcome to the Sogeti Movie App! Find your next favorite movie here.
        </p>
        <SearchForm @search="emit('search')" />
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchForm from "@/components/SearchForm.vue";

const emit = defineEmits(["search"]);
</script>

<style scoped>
.masthead {
  position: relative;
  overflow: hidden;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .masthead-content {
    position: relative;
    max-width: 40rem;
    padding-top: 5rem;
    padding-bottom: 5rem;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.2rem;

      strong {
        font-weight: 700;
      }
    }
  }
}

@media (min-width: 992px) {
  .masthead {
    height: 100vh;
    width: 75vw;
    min-height: 0;
    padding-bottom: 0;

    &:before {
      transform: skewX(-9deg);
      transform-origin: top right;
    }

    .masthead-content {
      padding: 0 9rem 0 2rem;

      h1 {
        font-size: 3.5rem;
      }

      p {
        font-size: 1.3rem;
      }
    }
  }
}

@media (min-width: 1200px) {
  .masthead {
    width: 65vw;
  }
}
</style>
