<template>
  <div >
   <span>Tell us your idea:</span>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
 <button v-on:click="saveIdea()">Add</button>

<div v-on:mousedown="getID(idea.id)" v-on:mousemove="update" v-on:mouseup="unID" v-for="idea in ideas" class="idea" :style="calcPosition(idea)">
   <p>{{idea.text}}</p>
   <button  v-on:click="like(idea)">LIKE {{idea.likes}}</button>
   <button  v-on:click="dislike(idea)">DISLIKE {{idea.dislikes}}</button>
  </div>
   </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://104.236.215.111:3010';
export default {
  name: "AppHeader",
  data() {
    return {
      message: "",
      isMoving: false,
      movingID: 0,
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
    unID: function() {
      console.log("UN ID CALLED");

      this.isMoving = false;
      console.log(this.isMoving);
      let ideasMap = this.ideas.map(idea => {
        return idea.id;
      });
      let index = ideasMap.indexOf(this.movingID);
      let idea = this.ideas[index];

      axios
        .put("/api/idea/location/" + idea.id, {
          x: idea.x,
          y: idea.y
        })
        .then(response => {
          this.getIdeas();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getID: function(id) {
      this.isMoving = true;
      this.movingID = id;
      console.log(id);
    },
    update: function(event) {
      console.log("Update was called");
      if (this.isMoving) {
        console.log(event);

        let ideasMap = this.ideas.map(idea => {
          return idea.id;
        });
        let index = ideasMap.indexOf(this.movingID);
        let idea = this.ideas[index];

        // idea.x =
        // idea.x = event.y;
        // idea.y = event.x;
        idea.y = event.pageY - 30;
        idea.x = event.pageX - 40;
        console.log(idea);
        // this.movingID
      }

      // console.log(screenY);
    },
    saveIdea: function() {
      console.log("Someone wants to save an idea");
      if (this.message === "") {
        console.log("No can do");
        return;
      }
      // call post to save/create item
      if (this.ideas.length > 14) {
        this.deleteSurplus();
      }

      axios
        .post("/api/idea", {
          text: this.message,
          likes: 0,
          dislikes: 0,
          x: this.random(50, 1000),
          y: this.random(150, 500)
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
        .then(response => {
          this.getIdeas();
        })
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
          this.getIdeas();
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
        top: item.y + "px",
        left: item.x + "px"
      };
    },
    deleteSurplus: function() {
      console.log("DELETE CALLED");
      let wssf = 10000;
      let wssfIndex = -1;
      for (let i = 0; i < this.ideas.length; i++) {
        let idea = this.ideas[i];
        let diff = idea.likes - idea.dislikes;

        if (diff < wssf) {
          wssf = diff;
          wssfIndex = i;
        }
      }

      //delete worst
      axios
        .delete("/api/idea/" + this.ideas[wssfIndex].id)
        .then(response => {
          this.getIdeas();
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
.idea {
  position: absolute;
  padding: 10px;
  border: #42b983 2px solid;
  background-color: #7cd4ac;
  box-shadow: 5px 5px 5px grey;
}
</style>
