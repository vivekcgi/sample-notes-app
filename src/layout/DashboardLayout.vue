<template>
  <span>
    <nav-bar />
    <div class="container is-fluid body-content">
      <router-view :key="$router.path" />
    </div>
  </span>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>

<style scoped></style>
