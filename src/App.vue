<template>
  <div>
    <input type="text" v-model="city" />
  </div>
  <div>
    <img :src="icon" alt="" />
  </div>
  <div class="temp flex col">
    <div v-if="weather.temp_min" class="minmax flex row">
      <div>Temperature :</div>
      <div>{{ weather.temp_min }} &deg;C / {{ weather.temp_max }} &deg;C</div>
    </div>
    <div v-if="weather.feels_like" class="feel flex row">
      <div>Ressentie :</div>
      <div>{{ weather.feels_like }} &deg;C</div>
    </div>
    <div v-if="weather.humidity" class="humid flex row">
      <div>Humidité :</div>
      <div>{{ weather.humidity }}</div>
    </div>
  </div>
  <div v-if="error">
    {{ error.response.data.message }}
  </div>
  <Footer />
</template>

<script>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Footer from "./components/Footer";
import { apiKey } from "./main";

export default {
  name: "App",
  components: {
    Footer,
  },
  setup() {
    const city = ref("");
    const icon = ref("");
    const error = ref(null);
    const weather = ref({});
    const wind = ref({});

    let debounceTimeout;

    onMounted(() => {
      async function getWeather() {
        if (city.value.length >= 3) {
          error.value = null;
          try {
            const { data } = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
            );
            weather.value = data.main;
            wind.value = data.wind;
            icon.value = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
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
        () => city.value,
        () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            getWeather();
          }, 500);
        }
      );
    });

    return { city, icon, weather, error };
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
}

body {
  background-color: #009fb7;
}

input {
  background-color: #009fb7;
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  border: 0;
  color: #fed766;
  border-bottom: #fed766 2px solid;
  max-width: 10em;
  min-width: 7em;
  font-size: 70px;
}

.humid,
.minmax,
.feel {
  justify-content: space-between;
}

.temp {
  font-size: 26px;
  margin: auto;
  width: 50vw;
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

@media screen and (max-width: 758px) {
  input {
    max-width: 5em;
    min-width: 4em;
  }

  .temp {
    width: 80vw;
    font-size: 18px;
  }

  #app {
    max-height: 85vh;
<<<<<<< HEAD
    display: flex;
    flex-direction: column;
  }
}

body {
  background-color: #009fb7;
}

input {
  background-color: #009fb7;
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  border: 0;
  color: #fed766;
  border-bottom: #fed766 2px solid;
  max-width: 10em;
  min-width: 7em;
  font-size: 70px;
}

.humid,
.minmax,
.feel {
  justify-content: space-between;
}

.temp {
  font-size: 26px;
  margin: auto;
  width: 50vw;
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

@media screen and (max-width: 758px) {
  input {
    max-width: 5em;
    min-width: 4em;
  }

  .temp {
    width: 80vw;
    font-size: 18px;
  }

  #app {
    max-height: 85vh;
=======
>>>>>>> a0c3fdf9878bdcf841416b874d076b0a1e2535de
  }
}
</style>
