Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

// set up security on Images collection
Websites.allow({
	insert:function(userId, doc){
		if (Meteor.user()){
			return (doc.createdBy == userId);
		} 
	},
        update:function(userId, doc){
                if (Meteor.user()){
                        return true;
                }
        }
});
// set up security on comments collection
Comments.allow({
        insert:function(userId, doc){
                  return true;
        }
});
