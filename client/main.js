Template.time.helpers({
    lastUpdated: function() {
    	return Headlines.findOne({}, {sort: {date: 1}}).date
    }
})