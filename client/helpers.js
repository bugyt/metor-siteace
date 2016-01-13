/////
// template helpers 
/////

Session.set("imageLimit", 8);

// helper function that returns all available websites
Template.website_list.helpers({
    websites:function(){
	var searchValue = Session.get("searchValue");	
	if(searchValue == "" || searchValue == undefined || searchValue == null){
		$(".input-group-btn i").addClass( "glyphicon-search").removeClass("glyphicon-remove" );
	        return Websites.find({}, {sort: {"vote.website_rating":-1 }});
	} else {
		$(".input-group-btn i").addClass( "glyphicon-remove").removeClass("glyphicon-search" );
		return Websites.find({$or: [{"title": {$regex : ".*"+searchValue+".*"}},
                             {"url": {$regex : ".*"+searchValue+".*"}},
                             {"description": {$regex : ".*"+searchValue+".*"}}]},{sort: {"vote.website_rating":-1 }});
	}
    }
});

Template.site.helpers({
    lcomments:function(){
        return Comments.find({website_id:this._id}, {sort:{createdOn:-1}, limit:Session.get("imageLimit")});
    }
});

Template.registerHelper('formatDate', function(d) {
	var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_date + "-" + curr_month + "-" + curr_year;
});


Template.registerHelper('commentsNumber', function(website_id){
	return	Comments.find({website_id:website_id}).count();
});
