/// routing

// Default layout is ApplicationLayout (define in html)
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
	this.render('navbar',{
		to:"navbar"
	});
	if(Meteor.user()){
	        this.render('website_form',{
                	to:"add_form"
	        });
	}
	this.render('website_list',{
                to:"main"
        });
	this.render('footer',{
                to:"footer"
        });
});

Router.route('/site/:_id', function () {
        this.render('navbar',{
                to:"navbar"
        });
        this.render('site',{
                to:"main",
		data:function(){
			Session.set("siteId", this.params._id);
			var site = Websites.findOne({_id:this.params._id});
			return site;
		}
        });
	this.render('footer',{
                to:"footer"
        });
});

