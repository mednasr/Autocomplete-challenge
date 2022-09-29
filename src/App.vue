<script setup lang="ts">
import BooksAutocomplete from "./components/BooksAutocomplete.vue";
import CitiesAutocomplete from "./components/CitiesAutocomplete.vue";
</script>

<template>
  <main class="containers-wrapper">
    <div class="container">
      <img src="./assets/img/storyteq-logoBooks.png" class="container-img" />
      <BooksAutocomplete />
    </div>
    <div class="container">
      <img src="./assets/img/storyteq-logocities.png" class="container-img" />
      <CitiesAutocomplete />
    </div>
  </main>
</template>

<style scoped>
.container-img {
  max-width: 200px;
  max-height: 165px;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-bottom: 50px;
}
.containers-wrapper {
  position: relative;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: Circular, Arial;
}
@media (max-width: 900px) {
  .containers-wrapper {
    flex-direction: column;
    height: 115vh;
    justify-content: space-between;
    margin-top: 10px;
  }
  .searchIcon {
    width: 20px;
    height: 20px;
  }
  .containers-wrapper .container {
    margin-left: 0px;
    margin-bottom: 20px;
  }
}
.container {
  background: url(./assets/img/blog-bg.png);
  background-size: 560px 420px;
  flex-direction: column;
  background-color: white;

  margin-left: 10px;
  height: 430px;
  border-radius: 10px;
  padding: 50px 30px;
  box-shadow: 0 5px 10px rgb(11 43 64 / 40%);
  min-width: 200px;
}
@media (min-width: 1000px) {
  .containers-wrapper {
    flex-direction: row;
  }
}

.containers-wrapper > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
