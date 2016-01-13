/// infiniscroll

Session.set("imageLimit", 8);
lastScrollTop = 0; 
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("imageLimit", Session.get("imageLimit") + 4);
  }

  lastScrollTop = scrollTop;
}
    
});


/// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});
