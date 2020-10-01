import { createApp } from "vue";
import App from "./App.vue";

export const apiKey = process.env.VUE_APP_WEATHER_API_KEY;

createApp(App).mount("#app");
