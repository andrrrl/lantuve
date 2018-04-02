<template id="index">
<div class="container">
  <div class="row">
    <div class="col">
      <h1 class="text-center">🎶 <i>Lantuve</i></h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <!-- <span v-text="stats"></span> -->
      <videos v-bind="posts"/>
      <!-- <videos counter="2"/>
      <videos counter="3"/> -->
      <!-- {{ posts }} -->
      
      <!-- <ul class="list-group">
        <li class="list-group-item" v-for="(post, key, index) in idsLessThan3" v-bind:key="post.id" v-bind:title="post.title">
            {{ key }} {{ index }} / {{ post.id }} {{ post.title}}
        </li>
      </ul> -->
    </div>
  </div>
</div>
</template>
<script>
// import IndexVue from "./Index.vue";
import VideosVue from "./Videos.vue";

export default {
  name: "index",
  data() {
    return {
      posts: [
        { id: 1, title: "My journey with Vue" },
        { id: 2, title: "Blogging with Vue" },
        { id: 3, title: "Why Vue is so fun" }
      ],
      stats: "OK"
    };
  },
  computed: {
    idsLessThan3() {
      return this.posts.filter(post => {
        return post.id > 1;
      });
    }
  },
  components: {
    // index: IndexVue,
    videos: VideosVue
  }
};
</script>
