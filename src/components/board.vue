<template>
  <div >
   <span>Tell us your idea:</span>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
 <button v-on:click="saveIdea()">Add</button>

<div v-for="idea in updateIdeas" class="idea" :style="calcPosition(idea)">
   <p>{{idea.text}} Likes:{{idea.likes}} Dislikes:{{idea.dislikes}}</p>
   <button  v-on:click="like(idea)">LIKE</button>
   <button v-on:click="dislike(idea)">DISLIKE</button>
  </div>
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
  created: function() {
    this.getIdeas();
  },
  computed: {
    updateIdeas: function() {
      this.getIdeas();
      return this.ideas;
    }
  },
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
          dislikes: 0,
          x: this.random(100, 800),
          y: this.random(200, 500)
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
    },
    like: function(idea) {
      console.log("LIKE");
      //increment like

      // send update put to set new like #
      axios
        .put("/api/idea/" + idea.id, {
          likes: idea.likes + 1,
          dislikes: idea.dislikes
        })
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
    },
    dislike: function(idea) {
      console.log("DISLIKE");
      //increment like

      // send update put to set new like #
      axios
        .put("/api/idea/" + idea.id, {
          likes: idea.likes,
          dislikes: idea.dislikes + 1
        })
        .then(response => {
          idea = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    calcPosition: function(item) {
      return {
        top: item.x + "px",
        left: item.y + "px"
      };
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
.idea {
  position: absolute;
}
</style>
