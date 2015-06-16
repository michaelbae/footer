Template.headlines.helpers({
    headlines: function() {
        return Headlines.find({}, { sort: { date: -1}});
    }
})
