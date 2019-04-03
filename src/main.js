import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import vueRouter from 'vue-router'
import Vuex from 'vuex';

Vue.use(vueRouter);
Vue.use(Vuex)

Vue.config.productionTip = false
import router from '@/router/index';
import {store} from '@/store/index';
import  firebase from 'firebase';
import Alert from './Share/Alert'

Vue.component("app-alert", Alert);

new Vue({
  router,
  store,

  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyDCYVxCU8yZGfl01mX2z_1onE0Xry2q170",
      authDomain: "mon-meetup.firebaseapp.com",
      databaseURL: "https://mon-meetup.firebaseio.com",
      projectId: "mon-meetup",
      storageBucket: "mon-meetup.appspot.com",
      messagingSenderId: "935396803514"

    })
    this.$store.dispatch("getMeetups");
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            this.$store.dispatch("reLogin", user);
        }
    })
  }
}).$mount('#app')
