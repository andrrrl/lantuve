<template>
<div class="row">
<!-- <h5>Videos.vue</h5> -->
    <div class="col">
        <!-- {{ counter }}
        <span v-text="counter"></span> -->
        <!-- <p>{{ counter }} - count is {{ evenOrOdd }}</p> -->
        <!-- <button @click="increment">+</button>
        <button @click="decrement">-</button> -->
        <!-- <p>{{ connected }}</p> -->
        <!-- <p>
            Ask a yes/no question:
            <input v-model="question">
        </p> -->
        <!-- <p>{{ answer }}</p> -->
        <p>Signal: {{ signal }}</p>
        <ul class="list-group" v-if="videos && videos.length">
            <li class="list-group-item" v-for="(video, key, index) in videos" v-bind:key="video.id" v-bind:title="video.title">
                <button v-if="video._id === currentVideoID && signal === 'playing'" class="btn btn-sm btn-danger" v-on:click="stop()">⏹</button>
                <button v-if="video._id !== currentVideoID" class="btn btn-sm btn-info" v-on:click="play(video._id)">⯈</button>
                {{ key + 1 }} {{ index }} ~ {{ video.title }}
                <!--  {{ video._id }}  -->
                <!-- <a class="hover" href="#" v-on:click="play(video._id)">{{ video.title }}</a>  -->
            </li>
        </ul>
    </div>
</div>
</template>
<script>
// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { debounce } from "lodash";

export default {
  data() {
    return {
      videos: [],
      errors: [],
      status: "",
      lastUpdated: "",
      currentVideoID: "",
      question: "",
      answer: "I cannot give you an answer until you ask a question!"
    };
  },
  computed: {
    counter() {
      return this.$store.state.count;
    },
    connected() {
      return this.$store.state.isConnected + " " + this.$store.state.messages;
    },
    signal() {
      return this.$store.state.signal;
    },
    ...mapGetters(["evenOrOdd"])
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/videos");
      this.videos = response.data;
      this.$store.commit("SOCKET_CONNECT");
    } catch (e) {
      this.errors.push(e);
    }
  },
  watch: {
    // whenever question changes, this function will run
    // question(newQuestion, oldQuestion) {
    //   this.answer = "Waiting for you to stop typing...";
    //   this.getAnswer();
    // },
    signal() {
      if (this.$store.state.signal === "stopped") {
        this.currentVideoID = null;
      }
    }
  },
  methods: {
    async play(videoID) {
      try {
        this.currentVideoID = videoID;
        const playing = await axios.get(
          "http://localhost:3000/api/player/" + videoID + "/play"
        );
        this.$store.commit("increment");
        this.$store.commit("SOCKET_USER_MESSAGE");

        console.log(store.state.count); // -> 1
      } catch (e) {
        this.errors.push(e);
      }
    },
    async stop() {
      try {
        this.currentVideoID = null;
        const stop = await axios.get("http://localhost:3000/api/player/stop");
        this.$store.commit("SOCKET_USER_MESSAGE");
      } catch (e) {
        this.errors.push(e);
      }
    },
    // getAnswer: _.debounce(
    //   async function() {
    //     try {
    //       if (this.question.indexOf("?") === -1) {
    //         this.answer = "Questions usually contain a question mark. ;-)";
    //         return;
    //       }
    //       this.answer = "Thinking...";
    //       let vm = this;
    //       const response = await axios.get(
    //         "http://localhost:3000/api/status?type=player"
    //       );
    //       //   const response = await axios.get("https://yesno.wtf/api");
    //       vm.answer = _.capitalize(response.data.video_id);
    //     } catch (e) {
    //       vm.answer = "Error! Could not reach the API. " + error;
    //     }
    //   },
    //   // This is the number of milliseconds we wait for the
    //   // user to stop typing.
    //   500
    // ),
    ...mapActions(["increment", "decrement"])
  }
};

// Otra sintaxis
//   created() {
//     axios
//       .get("http://localhost:3000/api/videos")
//       .then(response => {
//         this.videos = response.data;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   },
</script>
