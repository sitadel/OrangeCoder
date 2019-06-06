<template>
  <div id="app">
    <img
      width="80%"
      alt="Orange Coder"
      src="https://github.com/sitadel/OrangeCoder/blob/master/assets/OrangeCoder.jpg?raw=true"
    >
    <div>Orange coder is a coding interest group. Let's start with a session to go through a few free online resources to learn coding.  You may add topic of interest here...</div>
    <div>
      <h3>Topics</h3>
    </div>
    <div>
      <input type="text" placeholder="Topic" v-model="newReptile" @keyup.enter="addTopic">
      <input type="password" placeholder="*Pass Code" v-model="passCode" @keyup.enter="addTopic">
      <button @click="addTopic">Add Topic</button>
    </div>
    <div class="errorMessageStyle" v-if="errorMessage.length > 0">{{errorMessage}}</div>
    <p>*Pass Code is for you to remove Topic added by you</p>This topic list is refreshed automatically by Google Firestore.
    <ul class="reptileList">
      <li v-for="reptile in reptiles">
        {{ reptile.name }}
        <button @click="likeReptile(reptile)">{{ reptile.like }} Like</button>
        <button @click="deleteReptile(reptile)">Remove</button>
      </li>
    </ul>
    <br>
    <carousel
      :per-page="1"
      :autoplay="true"
      :autoplayTimeout="3000"
      :mouse-drag="false"
      :loop="true"
    >
      <slide>
        <img
          width="80%"
          src="https://github.com/sitadel/OrangeCoder/blob/master/assets/TechBooksStartCoding.jpg?raw=true"
        >
      </slide>
      <slide>
        <img
          width="80%"
          src="https://www.timbersmart.co.nz/wp-content/uploads/2019/05/pwa_native_hybride.jpg"
        >
      </slide>
      <slide>
        <img
          width="80%"
          src="https://developers.google.com/web/progressive-web-apps/images/pwa-reliable.png"
        >
      </slide>
    </carousel>
  </div>
</template>

<script>
import { db } from "./firebase";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "app",
  data() {
    return {
      reptiles: [],
      newReptile: "",
      passCode: "",
      errorMessage: ""
    };
  },
  components: {
    Carousel,
    Slide
  },
  firestore() {
    return {
      reptiles: db.collection("reptiles")
    };
  },
  methods: {
    addTopic: function() {
      if (this.newReptile.length > 30) {
        this.errorMessage = "Topic must be less than 30 characters.";
        return;
      }

      this.$firestore.reptiles.add({
        name: this.newReptile,
        passCode: this.passCode,
        like: 0,
        timestamp: new Date()
      });
      this.resetStatus();
    },
    resetStatus: function() {
      this.newReptile = "";
      this.passCode = "";
      this.errorMessage = "";
    },
    likeReptile: function(reptile) {
      reptile.like++;
      this.resetStatus();
    },
    deleteReptile: function(reptile) {
      //console.log(this.passCode);
      //console.log(reptile.passCode);
      if (this.passCode === reptile.passCode) {
        this.$firestore.reptiles.doc(reptile[".key"]).delete();
        this.resetStatus();
      } else {
        this.errorMessage = "Enter the your pass code to remove topic.";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.reptileList {
  list-style: none;
}
.errorMessageStyle {
  color: red;
}
</style>