Template.comments.helpers({
    comments: function() {
    	var href;

    	Headlines.find({_id: this._id}, {href:1}).forEach(function(obj){
            href = obj.href;
        });
    	
    	// if (Comments.find({url: href}).count()==0){
    	// 	Headlines.remove({_id: this._id});
    	// } else {
	        return Comments.find({url: href}, { sort: { upvote: -1}});
    	//}
    }
})