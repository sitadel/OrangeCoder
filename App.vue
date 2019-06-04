<template>
  <div id="app">
    <img
      width="300"
      src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-bg7-ake1889-ake-026-por-l.jpg?auto=format&bg=F4F4F3&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-1.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=2accc7930ae14ed3c1967443ac4c8d85"
    >
    <div>
      <h3>Orange Coder</h3>
    </div>
    <div>
      <input type="text" placeholder="Topic" v-model="newReptile" @keyup.enter="addTopic">
      <input
        type="password"
        placeholder="*Pass Code"
        v-model="passCode
			"
        @keyup.enter="addTopic"
      >
      <button @click="addTopic">Add Topic</button>
    </div>
    <p>*Pass Code is for you to remove Topic added by you</p>
    <div>Orange coder is an coding interest group. Let's start with a lunch session to go through free online resources to learn coding. After that, each participant will craft out their own coding journey depending on their current level of programming skill. Starting with the following topics...</div>
    <ul class="reptileList">
      <li>Google Firestore</li>
      <li>CodeSandBox</li>
      <li>Node JS</li>
      <li>Vue</li>
    </ul>
    <p></p>
    <div>
      <h3>Participants</h3>This list refreshed automatically by Firestore realtime database.
    </div>
    <ul class="reptileList">
      <li v-for="reptile in reptiles">
        {{ reptile.name }} -
        <input
          type="password"
          placeholder="*Pass Code"
          width="200px"
          v-model="passCode"
          @keyup.enter="deleteReptile"
        >
        <button @click="likeReptile(reptile)">{{ reptile.like }} Like</button>
        <button @click="deleteReptile(reptile)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      reptiles: [],
      newReptile: "",
      passCode: ""
    };
  },
  firestore() {
    return {
      reptiles: db.collection("reptiles")
    };
  },
  methods: {
    addTopic: function() {
      this.$firestore.reptiles.add({
        name: this.newReptile,
        passCode: this.passCode,
        like: 0,
        timestamp: new Date()
      });
      this.newReptile = "";
      this.passCode = "";
    },
    likeReptile: function(reptile) {
      reptile.like++;
    },
    deleteReptile: function(reptile) {
      //console.log(this.passCode);
      //console.log(reptile.passCode);
      if (this.passCode === reptile.passCode) {
        this.$firestore.reptiles.doc(reptile[".key"]).delete();
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
</style>