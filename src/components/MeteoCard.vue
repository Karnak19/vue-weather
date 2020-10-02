<template>
  <div v-if="weather.temp" class="card flex col">
    <h1 class="title">Météo {{ city }}</h1>
    <div class="flex row space-between">
      <div class="flex">
        <p class="temp">{{ Math.floor(weather.temp) }} &deg;</p>
      </div>
      <div class="flex">
        <img v-if="icon" :src="icon" alt="" />
      </div>
    </div>
    <div class="flex row space-between">
      <p>
        {{ weather.desc }}
      </p>
      <p style="margin-right:50px;">
        {{ Math.floor(weather.temp_min) }} &deg; / {{ Math.floor(weather.temp_max) }} &deg;
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
    city: String,
    icon: String,
  },
};
</script>

<style>
.card {
  background: linear-gradient(#153131, #2f885b);
  border-radius: 8px;
  color: #fed766;
  max-width: 90vw;
  min-width: 700px;
  padding: 20px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
}

.card .title {
  font-size: 26px;
  align-self: flex-start;
  margin: auto 0;
}

.card .temp {
  font-size: 90px;
  margin: auto;
}

@media screen and (max-width: 758px) {
  .card {
    max-width: 95vw;
    min-width: 90vw;
  }
}
</style>
