Headlines = new Mongo.Collection("headlines");
Comments = new Mongo.Collection("comments");

Router.map(function () {
  this.route('headlines', {
    path: '/'
  });

  this.route('comments', {
    path: '/headlines/:_id',
    data: function () {return this.params}
  });
});

