if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //Headlines.remove({});
    Meteor.call("updateHeadlines");
    Meteor.call("updateComments");

    Headlines.find({}).forEach(function(obj){
      var count = Comments.find({url: obj.href}).count();
      if (count==0){
        Headlines.remove({_id: obj._id});
      } else {
        Headlines.update({_id : obj._id},{$set: {countComment: count}});
      }
    });

  });
}

Meteor.methods({
  
  updateHeadlines: function(){  
    var headlines = Meteor.call("getHeadlines");
    var parsed = JSON.parse(headlines.content);

    for (i=0; i<parsed.results.collection1.length; i++) {
        Meteor.call("storeHeadline", parsed.results.collection1[i]);
    }
  }, 

  getHeadlines: function () {
    return Meteor.http.call("GET", "https://www.kimonolabs.com/api/7gl7yta6?apikey=xeDwWhL8rpKTXnGWB3cbKxymjjX2WdUV");
  },

  storeHeadline: function (headline) {
    var href = headline.headlines.href;;
    var date = new Date();
    if (Headlines.find({href : href}).count() == 0) {
        Headlines.insert({
            index : headline.index,
            url : headline.url,                           
            href : headline.headlines.href,
            text : headline.headlines.text,
            date : date
        }); 
    }         
  },

  updateComments: function(){  
    var comments = Meteor.call("getComments");
    //Comments.insert({test:comments});
    var parsed = JSON.parse(comments.content);

    for (i=0; i<parsed.results.collection1.length; i++) {
        Meteor.call("storeComment", parsed.results.collection1[i]);
    }
  }, 

  getComments: function () {
    return Meteor.http.call("GET", "https://www.kimonolabs.com/api/2s8153qw?apikey=xeDwWhL8rpKTXnGWB3cbKxymjjX2WdUV");
  },

  storeComment: function (comment) {
    if (Comments.find({url : comment.url, user : comment.user, comment : comment.comment}).count() == 0) {
        Comments.insert({
            user : comment.user,
            comment : comment.comment,                           
            upvote : parseInt(comment.upvote.text),
            downvote : parseInt(comment.downvote.text),
            index: comment.index,
            url: comment.url 
        }); 
    } else {
        Comments.update({url : comment.url, user : comment.user, comment : comment.comment},{
              user : comment.user,
              comment : comment.comment,                           
              upvote : parseInt(comment.upvote.text),
              downvote : parseInt(comment.downvote.text),
              index: comment.index,
              url: comment.url 
            });
    }         
  },
})