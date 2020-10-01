<template>
  <main>
    <input type="text" v-model="city" />
    <div>
      <img :src="icon" alt="" />
    </div>
    <div v-if="weather.temp_min">Temperature : {{ weather.temp_min }}</div>
  </main>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
export default {
  name: "App",
  components: {},
  setup() {
    const city = ref("");
    const icon = ref("");
    const weather = ref({});
    const wind = ref({});

    let debounceTimeout;

    // TODO: Debounce this
    onMounted(() => {
      async function getWeather() {
        if (city.value.lenght > 3) {
          const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=193d8888942aa297b564bd41376583ce&units=metric`
          );
          weather.value = data.main;
          wind.value = data.wind;
          icon.value = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        } else {
          weather.value = {};
          wind.value = {};
          icon.value = "";
        }
      }

      watch(
        () => city.value,
        () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            getWeather();
          }, 500);
        }
      );
    });
    return { city, icon, weather };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #121619;
  margin-top: 60px;
}

body {
  background-color: #09814a;
}

input {
  background-color: #09814a;
  border: 0;
  border-bottom: #121619 2px solid;
  max-width: 700px;
  font-size: 70px;
}

.flex {
  display: flex;
}

.row {
  flex-direction: row;
}

.col {
  flex-direction: column;
}
</style>
