import { createApp } from "vue";
import { createPinia } from "pinia";
import { BootstrapIcon } from "@dvuckovic/vue3-bootstrap-icons";
import { injectBootstrapIcons } from "@dvuckovic/vue3-bootstrap-icons/utils";
import BootstrapIcons from "bootstrap-icons/bootstrap-icons.svg?raw";
import "@dvuckovic/vue3-bootstrap-icons/dist/style.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";

injectBootstrapIcons(BootstrapIcons);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("BootstrapIcon", BootstrapIcon);

app.provide("bootstrap", bootstrap);

app.mount("#app");
