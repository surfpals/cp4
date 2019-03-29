var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    description: "",
    file: null,
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,

  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];

    },
    async upload() {
      try {
        let r2 = await axios.post('/api/items', {
          title: this.title,

          description: this.description,
        });
        this.addItem = r2.data;
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item; //Sets findItem to the item they clicked on in the drop down
    },
    async deleteItem(item) {
      console.log("Front end is going to delete the following item:");
      console.log(item);
      try {
        await axios.delete("/api/items/" + item._id, item); //Tell it what item we want to delete
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created: function() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  }
});
