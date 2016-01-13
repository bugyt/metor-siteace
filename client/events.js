   	/////
	// template events 
	/////
Template.navbar.events({
                "keyup #srch-term":function(event){
			Session.set("searchValue", event.target.value);
},
"click button":function(event){
		var searchValue = Session.get("searchValue");
			if(searchValue == "" || searchValue == undefined || searchValue == null){
			} else
			{
				Session.set("searchValue", undefined);
//				$(".input-group-btn i").addClass( "glyphicon-remove").removeClass("glyphicon-search" );
				$("#srch-term").val("");
				
			}
		return false;
}
});
	Template.vote.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var routeName = Router.current().route.getName();
			var website_id = this._id;
			var website_up;
			var website_down;
			if (!Meteor.user()){return false};
			if (this.vote==undefined){
				website_up = 1;
				website_down = 0;
			} else{
				website_up=this.vote.website_up +1 ;
				website_down = this.vote.website_down;
			}
			var website_rating = website_up - website_down;
			// put the code in here to add a vote to a website!
			  Websites.update({_id:website_id}, 
	                {$set: {vote : {
				website_up:website_up,
				website_down:website_down,
                                website_rating:website_rating
				}
				}


			});
			                        $("h3 span").not(".glyphicon-link").text('');
                        $("#"+website_id+" h3 span").not(".glyphicon-link").text('  +1');
                        $('html, body').animate({
                                scrollTop: $("#"+website_id).offset().top - 60
                              }, 600);
			$("#"+website_id+" .js-upvote").css("background-color", "green");
			$("#"+website_id+" .js-downvote").css("background-color", "white");

			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){
			if (!Meteor.user()){return false};
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			var website_up;
                        var website_down;
                        if (!Meteor.user()){return false};
                        if (this.vote==undefined){
                                website_up = 0;
                                website_down = 1;
                        } else{
                                website_up=this.vote.website_up ;
                                website_down = this.vote.website_down + 1;
                        }
			var website_rating = website_up - website_down;
                        // put the code in here to add a vote to a website!
                          Websites.update({_id:website_id},
                        {$set: { vote : {
				website_up:website_up,
                                website_down:website_down,
				website_rating:website_rating}
				}

                        });
			$("h3 span").not(".glyphicon-link").text('');
                        $("#"+website_id+" h3 span").not(".glyphicon-link").text('  -1').removeClass("label-success").addClass("label-danger");
                        $('html, body').animate({
                                scrollTop: $("#"+website_id).offset().top - 60
                              }, 600);
                        $("#"+website_id+" .js-downvote").css("background-color", "red");
                        $("#"+website_id+" .js-upvote").css("background-color", "white");
			return false;// prevent the button from reloading the page
		}
	});



Template.postc.events({
"submit .js-comment-form": function(event) {
	

    var comment = event.target.txtcomment.value;
    var website_id = this._id;

    var username;
    var email;
    var ok=true;

    if (Meteor.user()) {
        username = Meteor.user().username;
        email = Meteor.user().emails[0].address;
    } else {
        username = event.target.name.value;
        email = event.target.email.value;
	if (email == null || email == "") {
        	$('#email').parent('.form-group').addClass('has-error has-feedback');
	        ok = false;
	}else{$('#email').parent('.form-group').removeClass('has-error has-feedback');}
	if (username == null || username == "") {
                $('#name').parent('.form-group').addClass('has-error has-feedback');
                ok = false;
        } else { $('#name').parent('.form-group').removeClass('has-error has-feedback');}
    }


    if (comment == null || comment == "") {
        $('#txtcomment').parent('.form-group').addClass('has-error has-feedback');
        ok = false;
    } else { $('#txtcomment').parent('.form-group').removeClass('has-error has-feedback');}
	if (!ok){
		$("#result").text('  Please Fill All Required Field.').addClass("text-danger");
		return false;
	}else{
		 $("#result").text('');
	}
    //          var title = event.target.title.value;
    //        var desc = event.target.description.value;
    //return false;
    Comments.insert({
        website_id: website_id,
        username: username,
        email: email,
        comment: comment,
        createdOn: new Date()
    });
    $('.js-comment-form')[0].reset();
    return false;
}
});
	Template.website_form.events({
		"click #httpInfo":function(event){
			var url = $('#url').val();
			$('#title').val('');
			$('#description').val('');
			Meteor.call("getResponse", url, function(error, data){
//				console.log("là");
				if (error){
					$("#result").text('   Impossible to retrieve information.').addClass("text-danger");
				} else {
					if (data != undefined){
					var str = data.content;
					var el = document.createElement( 'html' );
					el.innerHTML = data.content;
					var tagTitle = el.getElementsByTagName('title');
					if (tagTitle[0] != undefined){
                                	var title = tagTitle[0].text;
					}
					var tagMeta = el.getElementsByTagName('meta');
					if (tagMeta.description != undefined){
	                                var description = tagMeta.description.content;
					}
					
					if (title == null || title == ""){
						$('#title').parent('.form-group').addClass('has-error has-feedback').removeClass('has-success');
					} else {
						$('#title').val(title);
						$('#title').parent('.form-group').addClass('has-success').removeClass('has-error has-feedback');
						$("#result").text('   Title retrieved.').addClass("text-success").removeClass("text-danger");
					}
					if (description == null || description == ""){
						$('#description').parent('.form-group').addClass('has-error has-feedback').removeClass('has-success');
                                        } else {
                                                $('#description').val(description);
						$('#description').parent('.form-group').addClass('has-success').removeClass('has-error has-feedback');
						$("#result").text($("#result").text() + '   Description retrieved.').addClass("text-success").removeClass("text-danger");
                                        }
					}
				}
			});

			return false;
                },
		"click .js-toggle-website-form":function(event){
			$('#url').parent('.form-group').removeClass('has-success has-error has-feedback');
                        $('#description').parent('.form-group').removeClass('has-success has-error has-feedback');
			$("#myModalform").modal('show');
			$("#result").text('');
		}, 
		"submit .js-save-website-form":function(event){
			$('#url').parent('.form-group').removeClass('has-success has-error has-feedback');
			$('#description').parent('.form-group').removeClass('has-success has-error has-feedback');
                        $("#result").text('');
			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;

			var title = event.target.title.value;
			var desc = event.target.description.value;
			
			//  put your website saving code in here!	
            	 if (url==null || url=="" || desc==null || desc=="")
		      {
			$("#result").text('  Please Fill All Required Field.').addClass("text-danger").removeClass('text-success');
//		      alert("Please Fill All Required Field");
			if (url==null || url==""){
				 $('#url').parentsUntil('.form-group').addClass('has-error has-feedback').removeClass('has-success');
			}
			if (desc==null || desc==""){
                                 $('#description').parent('.form-group').addClass('has-error has-feedback').removeClass('has-success');
                        }

		      return false;
    		  } else {
//				 $('#url').parent('.form-group').addClass('has-success').removeClass('has-error has-feedback');
//				 $('#description').parent('.form-group').addClass('has-success').removeClass('has-error has-feedback');

			}
    
                if (Meteor.user()){
		var id = 
                  Websites.insert({
                    url:url, 
                    title:title, 
                    description:desc,
                    createdOn:new Date(),
                    createdBy:Meteor.user()._id,
			vote : {
                                website_up:0,
                                website_down:0,
                                website_rating:0
                                }
                  });
			$("h3 span").not(".glyphicon-link").text('');
            		$("#"+id+" h3 span").not(".glyphicon-link").addClass("label-success").removeClass("label-danger").text('  Website added');
			$("#myModalform").modal('hide');
			$('html, body').animate({
          			scrollTop: $("#"+id).offset().top - 350
			      }, 600);
			event.target.url.value="";
			event.target.title.value="";
			event.target.description.value="";
                }

			return false;// stop the form submit from reloading the page

		}
	});
