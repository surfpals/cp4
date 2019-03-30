var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    description: "",
    file: null,
    addPost: null,
    items: [],
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
        this.addPost = r2.data;
        this.getPosts();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created: function() {
    this.getPosts();
  },
});
