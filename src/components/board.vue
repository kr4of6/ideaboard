<template>
  <div >
   <span>Tell us your idea:</span>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
 <button v-on:click="saveIdea()">Add</button>

<label v-for="idea in ideas"> <p>{{idea.text}} Likes:{{idea.likes}} Dislikes:{{idea.dislikes}}</p></label>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppHeader",
  data() {
    return {
      message: "",
      ideas: []
    };
  },
  computed: {},
  methods: {
    saveIdea: function() {
      console.log("Someone wants to save an idea");
      if (this.message === "") {
        console.log("No can do");
        return;
      }
      // call post to save/create item
      axios
        .post("/api/idea", {
          text: this.message,
          likes: 0,
          dislikes: 0
        })
        .then(response => {
          this.message = "";
          this.getIdeas();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getIdeas: function() {
      axios
        .get("/api/idea")
        .then(response => {
          this.ideas = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
