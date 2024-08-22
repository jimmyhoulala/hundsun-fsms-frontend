import hCore, { store } from "@hsui/core";
import "./reset.css";
import Vue from 'vue'
import VueParticles from 'vue-particles'
import hui from "h_ui/dist/h_ui.min.js";
import "h_ui/dist/h_ui.min.css";
import { message } from 'h_ui'; // 这取决于 HUI 的具体用法



const app = hCore({
  extraModelOptions: {
    store,
  },
});

Vue.use(VueParticles).use(hui);
app.start();
