import Vue from 'vue'
import * as AXIOS from '~/axios/axios.js'

Vue.prototype.$axios = AXIOS
Vue.use(AXIOS)