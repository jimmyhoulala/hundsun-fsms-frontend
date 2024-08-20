import hCore, { store } from "@hsui/core";
import "./reset.css";
import Vue from 'vue'
import VueParticles from 'vue-particles'
import hui from "h_ui/dist/h_ui.min.js";
import "h_ui/dist/h_ui.min.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入样式

Vue.use(ElementUI);
const app = hCore({
  extraModelOptions: {
    store,
  },
});

Vue.use(VueParticles).use(hui);
app.start();
