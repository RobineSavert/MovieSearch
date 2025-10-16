<template>
  <div class="nav-icons">
    <div
      class="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0"
    >
      <RouterLink :to="{ name: 'movies' }" class="btn btn-dark m-3">
        <BootstrapIcon icon="search" size="1x" />
      </RouterLink>
      <RouterLink :to="{ name: 'featured' }" class="btn btn-dark m-3">
        <BootstrapIcon icon="stars" size="1x" />
      </RouterLink>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.nav-icons {
  position: relative;
  z-index: 2;

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 4rem;
    width: 4rem;
    border-radius: 100rem;
  }
}

@media (min-width: 992px) {
  .nav-icons {
    position: absolute;
    height: 100%;
    top: 0;
    right: 2.5rem;
    width: auto;
  }
}
</style>
