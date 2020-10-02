<template>
  <div>
    <input type="text" v-model="input" placeholder="city" />
  </div>
  <MeteoCard :weather="weather" :city="city" :icon="icon" />
  <div v-if="error">
    {{ error.response.data.message }}
  </div>
  <div class="spacer"></div>
  <Footer />
</template>

<script>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Footer from "./components/Footer";
import MeteoCard from "./components/MeteoCard";
import { apiKey } from "./main";

export default {
  name: "App",
  components: {
    Footer,
    MeteoCard,
  },
  setup() {
    const input = ref("");
    const city = ref("");
    const icon = ref("");
    const error = ref(null);
    const weather = ref({});
    const wind = ref({});

    let debounceTimeout;

    onMounted(() => {
      async function getWeather() {
        if (input.value.length >= 3) {
          error.value = null;
          try {
            const { data } = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
            );
            weather.value = { ...data.main, desc: data.weather[0].description };
            wind.value = data.wind;
            icon.value = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            city.value = data.name;
          } catch (err) {
            error.value = err;
          }
        } else {
          weather.value = {};
          wind.value = {};
          icon.value = "";
        }
      }

      watch(
        () => input.value,
        () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            getWeather();
          }, 500);
        }
      );
    });

    return { input, city, icon, weather, error };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

#app {
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272727;
  margin-top: 60px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

body {
  background: linear-gradient(#204d4d, #71f0ae);
  height: 93vh;
}

img {
  -webkit-filter: drop-shadow(5px 5px 5px rgb(216, 216, 216));
  filter: drop-shadow(5px 5px 5px rgb(216, 216, 216));
}

input {
  background-color: transparent;
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  border: 0;
  color: #fed766;
  border-bottom: #fed766 2px solid;
  max-width: 10em;
  min-width: 7em;
  font-size: 70px;
}

input::placeholder {
  color: #fed8666b;
}

input:focus {
  outline: 0;
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

.space-between {
  justify-content: space-between;
}

@media screen and (max-width: 758px) {
  input {
    max-width: 5em;
    min-width: 4em;
  }

  #app {
    max-height: 92vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
