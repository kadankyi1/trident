
/*
// Dom7
var $ = Dom7;
var CONFIG = "..";

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
   view: {
    pushState: true,
  }
});


$(function(){
  var $refreshButton = $('#refresh');
  var $results = $('#css_result');
  
  function refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  refresh();
  $refreshButton.click(refresh);
  
  // Select all the contents when clicked
  $results.click(function(){
    $(this).select();
  });
});
*/



// Dom7
var $ = Dom7;
var CONFIG = "http://abaafo.com";

var isCordova = !!window.cordova;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
 view: {
    pushState: true,
  }
});


$(function(){
  var $refreshButton = $('#refresh');
  var $results = $('#css_result');
  
  function refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  refresh();
  $refreshButton.click(refresh);
  
  // Select all the contents when clicked
  $results.click(function(){
    $(this).select();
  });
});


// Init Framework7 App
if (isCordova) {

    $(document).on('deviceready', app.init);
    console.log("here 1");

} else {
    console.log("here 2");
    app.init();
}

var my_user_sys_id =localStorage.getItem("user_sys_id");
var my_e_password = localStorage.getItem("e_pass");
var my_full_name =localStorage.getItem("c_name");
var c_phone = localStorage.getItem("c_phone");
var my_subsribers = localStorage.getItem("my_subsribers");
var my_subscriptions = localStorage.getItem("my_subscriptions");
var my_profile_pic = localStorage.getItem("profile_pic");
var last_book_sku_category = "";
var last_book_sku_search = "";
var last_blog_sku_search = "";
var addProfilePicToggle = 0;
var current_book_price = "";

if(my_profile_pic == null || my_profile_pic == "" || my_profile_pic == undefined){
  my_profile_pic = "img/avatar.png"
}




function signMeOut(){

      my_user_sys_id = "";
      my_e_password = "";
      my_full_name = "";
      my_phone = "";

      localStorage.removeItem('user_sys_id');
      localStorage.removeItem('e_pass');
      localStorage.removeItem('c_name');
      localStorage.removeItem('c_phone');
}

function checkIfSignedIn(){

    var my_user_sys_id =localStorage.getItem("user_sys_id");
    var my_e_password =localStorage.getItem("e_pass");
    var my_full_name =localStorage.getItem("c_name");
    var my_phone =localStorage.getItem("c_phone");

    if(my_user_sys_id == null  || my_e_password == null  || my_full_name == null  || my_phone == null){

          // AUTO SIGN-OUT
          signMeOut();

    } else {

      if(my_user_sys_id.trim() != "" && my_e_password.trim() != "" && 
        my_phone.trim() != "" && my_full_name.trim() != "" ){

          $('#bodymain').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
          app.preloader.hide();
          current_page = "main_logged_in_page";
          $('#success_signup').click();

          setTimeout(function () {
          if(document.getElementById("profile_pic_main") != null){
          document.getElementById("profile_pic_main").src = my_profile_pic;
          document.getElementById("profile_name_main").innerHTML = my_full_name;
          }

          }, 2000);

      }

    }

}

function checkLogin() {

    var disUsername = document.getElementById("dis_username").value;
    var disPassword = document.getElementById("dis_password").value;

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastnot = app.toast.create({
  text: 'Account Not Found',
  closeTimeout: 2000,
})


    if(disUsername.trim() == "" || disPassword.trim() == "" ){

        toastBottom.open();

    } else if (disUsername.trim() != "" && disPassword.trim() != ""){

       //alert("Validating...");
       var url_real = CONFIG + "/inc/login.php";
       var loginData = {
          curr_username : disUsername,
          curr_password : disPassword
      };

      app.preloader.show();
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
          
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){

                localStorage.setItem("user_sys_id", loginResponse["system_id"]);
                localStorage.setItem("e_pass", loginResponse["key"]);
                localStorage.setItem("c_name", loginResponse["signup_name"]);
                localStorage.setItem("c_phone", loginResponse["signup_phone"]);
                localStorage.setItem("my_subsribers", loginResponse["my_subsribers"]);
                localStorage.setItem("my_subscriptions", loginResponse["my_subscriptions"]);

                localStorage.setItem("profile_pic", loginResponse["profile_pic"]);

                $('#lgr').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
                my_user_sys_id = loginResponse["system_id"];
                my_e_password = loginResponse["key"];

                app.preloader.hide();
                current_page = "main_logged_in_page";
                $('#success_signup').click();

                  setTimeout(function () {
                    
                  document.getElementById("profile_name_main").innerHTML = loginResponse["signup_name"];
                  document.getElementById("profile_pic_main").src = loginResponse["profile_pic"];
                  document.getElementById("my_subscribers_main").innerHTML = loginResponse["my_subsribers"];
                  document.getElementById("my_subscriptions_main").innerHTML = loginResponse["my_subscriptions"];

                  }, 2000);


              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {

      alert("Something went awry");

    }


}


function checkSignup() {

    var disSignupName = document.getElementById("signup_name").value;
    var disSignupEmail = document.getElementById("signup_email").value;
    var disSignupPassword = document.getElementById("signup_password").value;
    var disSignupPasswordRepeat = document.getElementById("signup_password_repeat").value;

    var toastBottom = app.toast.create({
      text: 'All Fields Must Be Completed',
      closeTimeout: 2000,
    });

    var toastPasswordsDontMatch = app.toast.create({
      text: 'Passwords do not match',
      closeTimeout: 2000,
    });

    var toastConnectionError = app.toast.create({
      text: 'Something went awry',
      closeTimeout: 2000,
    });


    if(disSignupName.trim() == "" || disSignupEmail.trim() == "" || disSignupPassword.trim() != disSignupPasswordRepeat ){

      if(disSignupPassword.trim() != disSignupPasswordRepeat.trim()){
        
        // PASSWORDS DON'T MATCH
        toastPasswordsDontMatch.open();

      } else {

        toastBottom.open();

      }

    

    } else if (disSignupName.trim() != ""
     && disSignupEmail.trim() != "" && disSignupPassword.trim() != "" 
     && disSignupPasswordRepeat.trim() != "" && disSignupPassword.trim() == disSignupPasswordRepeat.trim()){

       var url_real = CONFIG + "/inc/signup.php";

       var loginData = {
          signup_name : disSignupName,
          signup_email : disSignupEmail,
          signup_password : disSignupPassword,
      };

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
          
              var loginResponse = JSON.parse(response);

              if(loginResponse["status"] == "yes"){

                localStorage.setItem("user_sys_id", loginResponse["system_id"]);
                localStorage.setItem("e_pass", loginResponse["key"]);
                localStorage.setItem("c_name", loginResponse["signup_name"]);
                localStorage.setItem("c_phone", loginResponse["signup_phone"]);
                localStorage.setItem("my_subsribers", loginResponse["my_subsribers"]);
                localStorage.setItem("my_subscriptions", loginResponse["my_subscriptions"]);
                localStorage.setItem("profile_pic", loginResponse["profile_pic"]);

                $('#next_step').append('<a id="success_signup" style="display : none;" href="/main/">success</a>');
                my_user_sys_id = loginResponse["system_id"];
                my_e_password = loginResponse["key"];

                app.preloader.hide();
                current_page = "main_logged_in_page";
                $('#success_signup').click();
                  setTimeout(function () {

                    
                  document.getElementById("profile_name_main").innerHTML = loginResponse["signup_name"];
                  document.getElementById("profile_pic_main").src = loginResponse["profile_pic"];
                  document.getElementById("my_subscribers_main").innerHTML = loginResponse["my_subsribers"];
                  document.getElementById("my_subscriptions_main").innerHTML = loginResponse["my_subscriptions"];

                  }, 2000);

              } else {

                var this_message = loginResponse["error"];
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();

              }
              app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });

    } else {

      alert("Something went awry");

    }


}

 function readURL(input, imageholderID) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('#'+imageholderID).attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
      }
  }


function addProfilePic() {

  if(addProfilePicToggle == 0){

    addProfilePicToggle = 1;

    var disEmpPic = document.getElementById("imgInp").value;


    if(disEmpPic.trim() == "" ){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'You must select an image',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if (disEmpPic.trim() != ""){


      readURL(document.getElementById("imgInp"), "profile_pic_main");

      app.preloader.show();
      var formData = new FormData();
      formData.append('myid', my_user_sys_id);
      formData.append('mypass', my_e_password);
      formData.append('image', $('#imgInp')[0].files[0]); 

       var url_real = CONFIG + "/inc/change_profile_pic.php";

      app.request({
          url: url_real,
          type: "POST",
          data: formData,
          mimeTypes:"multipart/form-data",
          contentType: false,
          cache: false,
          processData: false,
          success: function(response){

              app.preloader.hide();
              addProfilePicToggle = 0;
              var addResponse = JSON.parse(response);

              if(addResponse["datareturned"][0]["status"] == "yes"){

                my_profile_pic = addResponse["datareturned"][0]["picture"];

                localStorage.setItem("profile_pic", addResponse["datareturned"][0]["picture"]);

                // ALERT EMPLOYEE ADDED
                toastalert = addResponse["datareturned"][0]["message"];
                var toastBottom = app.toast.create({
                  text: toastalert,
                  closeTimeout: 2000,
                });

                toastBottom.open();

              } else {


                toastalert = addResponse["datareturned"][0]["error"];
                var toastBottom = app.toast.create({
                  text: toastalert,
                  closeTimeout: 2000,
                });

                toastBottom.open();

              }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
    
    
    
    document.getElementById("profile_pic_main").src = loginResponse["profile_pic"];

              addProfilePicToggle = 0;
              toastalert = "Network Error";
              var toastBottom = app.toast.create({
                text: toastalert,
                closeTimeout: 2000,
              });

              toastBottom.open();

              app.preloader.hide();

          }
        });

    } else {

      app.preloader.hide();
      addProfilePicToggle = 0;
      toastalert = "Something went awry";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

    }

  } else {

      toastalert = "Profile picture is still updating";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

  }

}


function sendMessage() {

    var disMessageText = document.getElementById("thismessage").value;

var toastBottom = app.toast.create({
  text: 'You message cannot be empty',
  closeTimeout: 2000,
});


    if(disMessageText.trim() == ""){

        toastBottom.open();

    } else if (disMessageText.trim() != ""){

      //alert("Validating...");
       var url_real = CONFIG + "/inc/contact_trident.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            info : disMessageText
        };  

      app.preloader.show();
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
                var toastResponse = app.toast.create({
                  text: response,
                  closeTimeout: 2000,
                });
              toastResponse.open();
                document.getElementById("thismessage").value = "";
                app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {

      alert("Something went awry");

    }


}


function getBooksForStoreFront() {
      console.log("getBooksForStoreFront started");
        var url_real = CONFIG + "/inc/get_books_store_front.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            //console.log(response);
            setTimeout(function () {

            var booksResponse = JSON.parse(response);
            var total_highly_rated_books_num = Object.keys(booksResponse["highly_rated"]).length;
            var total_best_selling_books_num = Object.keys(booksResponse["best_selling"]).length;
            var total_new_books_num = Object.keys(booksResponse["new"]).length;

            if(total_highly_rated_books_num > 0){

              for(i = 0; i < total_highly_rated_books_num; i++){
                  var book_category = booksResponse["highly_rated"][i]["book_category"];
                  var book_name = booksResponse["highly_rated"][i]["book_name"];
                  var book_cover_art= booksResponse["highly_rated"][i]["book_cover_art"];
                  var author_publisher_name= booksResponse["highly_rated"][i]["author_publisher_name"];
                  var book_price= booksResponse["highly_rated"][i]["book_price"];
                  var ui_book_price= booksResponse["highly_rated"][i]["ui_book_price"];

                $('#highlyrated_books_holder_store_front').append($('<div class="swiper-slide" style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;"><img src="' + book_cover_art + '" height="100%" style="float: right;" class="popup-open" data-popup=".book-popup"> <div style="font-size: 14px; overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-left: 5px;" class="popup-open" data-popup=".book-popup"><div style="overflow: hidden; font-weight: 600;">' + book_name + '</div><div style="overflow: hidden;">' + author_publisher_name + '</div><div style="overflow: hidden;">' + book_category + '</div><div  style="overflow: hidden; font-weight: 600; color: #583082;">' + ui_book_price + '</div></div></div>')); 
              
              }

            } else {

                document.getElementById("highlyrated_title_store_front").style.display = "none";
                
            }

            if(total_best_selling_books_num > 0){

              for(i = 0; i < total_best_selling_books_num; i++){
                  var book_category = booksResponse["best_selling"][i]["book_category"];
                  var book_name = booksResponse["best_selling"][i]["book_name"];
                  var book_cover_art= booksResponse["best_selling"][i]["book_cover_art"];
                  var author_publisher_name= booksResponse["best_selling"][i]["author_publisher_name"];
                  var book_price= booksResponse["best_selling"][i]["book_price"];
                  var ui_book_price= booksResponse["best_selling"][i]["ui_book_price"];

                $('#bestselling_books_holder_store_front').append($('<div class="swiper-slide" style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;"><img src="' + book_cover_art + '" height="100%" style="float: right;" class="popup-open" data-popup=".book-popup"> <div style="font-size: 14px; overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-left: 5px;" class="popup-open" data-popup=".book-popup"><div style="overflow: hidden; font-weight: 600;">' + book_name + '</div><div style="overflow: hidden;">' + author_publisher_name + '</div><div style="overflow: hidden;">' + book_category + '</div><div  style="overflow: hidden; font-weight: 600; color: #583082;">' + ui_book_price + '</div></div></div>')); 
              
              }

            } else {

                document.getElementById("bestselling_title_store_front").style.display = "none";
                
            }

            if(total_new_books_num > 0){

              for(i = 0; i < total_new_books_num; i++){
                  var book_category = booksResponse["new"][i]["book_category"];
                  var book_name = booksResponse["new"][i]["book_name"];
                  var book_cover_art= booksResponse["new"][i]["book_cover_art"];
                  var author_publisher_name= booksResponse["new"][i]["author_publisher_name"];
                  var book_price= booksResponse["new"][i]["book_price"];
                  var ui_book_price= booksResponse["new"][i]["ui_book_price"];

                $('#new_books_holder_store_front').append($('<div class="swiper-slide" style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;"><img src="' + book_cover_art + '" height="100%" style="float: right;" class="popup-open" data-popup=".book-popup"> <div style="font-size: 14px; overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-left: 5px;" class="popup-open" data-popup=".book-popup"><div style="overflow: hidden; font-weight: 600;">' + book_name + '</div><div style="overflow: hidden;">' + author_publisher_name + '</div><div style="overflow: hidden;">' + book_category + '</div><div  style="overflow: hidden; font-weight: 600; color: #583082;">' + ui_book_price + '</div></div></div>')); 
              
              }


            } else {

                document.getElementById("new_title_store_front").style.display = "none";
                
            }

            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });


}

function getCategoryBooks(selected_category) {
      current_page = 'booklist_in_page';
      console.log("getCategoryBooks started");
        var url_real = CONFIG + "/inc/get_books_for_category.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            category : selected_category,
            last_sku : last_book_sku_category
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No books matched your search", "Hey");

             } else {

                  var booksResponse = JSON.parse(response);
                  var total_books_num = Object.keys(booksResponse["books"]).length;


                  if(total_books_num > 0){

                  document.getElementById("books_holder_booklist").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){
                        var sku = booksResponse["books"][i]["sku"];
                        var book_id = booksResponse["books"][i]["book_id"];
                        var book_category = booksResponse["books"][i]["book_category"];
                        var book_name = booksResponse["books"][i]["book_name"];
                        var book_description = booksResponse["books"][i]["book_description"];
                        var book_cover_art = booksResponse["books"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["books"][i]["author_publisher_name"];
                        var book_price = booksResponse["books"][i]["book_price"];
                        var ui_book_price = booksResponse["books"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["books"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["books"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["books"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["books"][i]["book_rating"];
                        var ui_book_rating = booksResponse["books"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["books"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["books"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["books"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["books"][i]["ui_book_comments_num_display"];

                        total_ui_ratings_comments = "none";

                      $('#books_holder_booklist').append($('<li onclick="showBookDetailInfo(this);" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content popup-open" data-popup=".book-popup"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                    
                    }


                  } else {

                      app.dialog.alert("No books matched your search", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });


}

// create searchbar
var searchbarBooks1 = app.searchbar.create({
  el: 'searchbar-demo',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      //console.log(query, previousQuery);
      getBooksFromSearch('categories_in_page');
    }
  }
});

var searchbarBooks2 = app.searchbar.create({
  el: 'searchbar-demo2',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      //console.log(query, previousQuery);
      getBooksFromSearch('booklist_in_page');
    }
  }
});

function getBooksFromSearch(page_name) {

  current_page = 'booklist_in_page';
  searchtext = '';
  if(page_name == "categories_in_page"){

    searchtext = document.getElementById('search_input_categories').value;

  } else if(page_name == "booklist_in_page"){

    searchtext = document.getElementById('search_input_booklist').value;

  }

      console.log("searchtext : " + searchtext);
      console.log("page_name : " + page_name);
     if(page_name == null || page_name == ""){

        app.dialog.alert("Something went awry. Try restarting app and try again", "Error");

     } else if(searchtext != ""){


      console.log("getBooksFromSearch started");
      document.getElementById('link_holder').href = "/book_list/";
      $('#link_holder').click();

        var url_real = CONFIG + "/inc/get_books_from_search.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            searchtxt : searchtext,
            last_sku : last_book_sku_category
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No books matched your search", "Hey");

             } else {

                  var booksResponse = JSON.parse(response);
                  var total_books_num = Object.keys(booksResponse["books"]).length;


                  if(total_books_num > 0){

                  document.getElementById("books_holder_booklist").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){
                        var sku = booksResponse["books"][i]["sku"];
                        var book_id = booksResponse["books"][i]["book_id"];
                        var book_category = booksResponse["books"][i]["book_category"];
                        var book_name = booksResponse["books"][i]["book_name"];
                        var book_description = booksResponse["books"][i]["book_description"];
                        var book_cover_art = booksResponse["books"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["books"][i]["author_publisher_name"];
                        var book_price = booksResponse["books"][i]["book_price"];
                        var ui_book_price = booksResponse["books"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["books"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["books"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["books"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["books"][i]["book_rating"];
                        var ui_book_rating = booksResponse["books"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["books"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["books"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["books"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["books"][i]["ui_book_comments_num_display"];

                        total_ui_ratings_comments = "none";
                      $('#books_holder_booklist').append($('<li onclick="showBookDetailInfo(this);" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content popup-open" data-popup=".book-popup"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                    
                    }


                  } else {

                      app.dialog.alert("No books matched your search", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });



  } else {
                var this_message = "Please type your search";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
  }

}
function showBookDetailInfo(x){

  var sku = x.getAttribute("data-sku");
  var book_id = x.getAttribute("data-book_id");
  var book_category = x.getAttribute("data-book_category");
  var book_name = x.getAttribute("data-book_name");
  var book_description = x.getAttribute("data-book_description");
  var book_cover_art = x.getAttribute("data-book_cover_art");
  var author_publisher_name = x.getAttribute("data-author_publisher_name");
  var book_price = x.getAttribute("data-book_price");
  var ui_book_price = x.getAttribute("data-ui_book_price");
  var quantity_sold = x.getAttribute("data-quantity_sold");
  var book_pdf_pages_num = x.getAttribute("data-book_pdf_pages_num");
  var book_pdf_size_mb = x.getAttribute("data-book_pdf_size_mb");
  var book_rating = x.getAttribute("data-book_rating");
  var ui_book_rating = x.getAttribute("data-ui_book_rating");
  var ui_book_rating_display = x.getAttribute("data-ui_book_rating_display");
  var book_comments_num = x.getAttribute("data-book_comments_num");
  var ui_book_comments_num = x.getAttribute("data-ui_book_comments_num");
  var ui_book_comments_num_display = x.getAttribute("data-ui_book_comments_num_display");

  document.getElementById('book_coverart_popup_booklist').src = book_cover_art;
  document.getElementById('book_title_popup_booklist').innerHTML = book_name;
  document.getElementById('book_author_popup_booklist').innerHTML = author_publisher_name;
  document.getElementById('book_category_popup_booklist').innerHTML = book_category;
  document.getElementById('book_commentsnum_popup_booklist').innerHTML = book_comments_num;
  document.getElementById('book_price_popup_booklist').innerHTML = ui_book_price;
  document.getElementById('book_pagesnum_popup_booklist').innerHTML = book_pdf_pages_num + " pages";
  document.getElementById('book_size_popup_booklist').innerHTML = book_pdf_size_mb + " MB";
  document.getElementById('book_description_popup_booklist').innerHTML = book_description;
  buyttn = document.getElementById('book_buybtn_popup_booklist');

  buyttn.setAttribute("data-book_id", book_id);
  current_book_price = ui_book_price;
  if(ui_book_price == "FREE"){
    buyttn.innerHTML = "READ";
  } else {
    buyttn.innerHTML = "BUY";
  }

}

function startReadingBook(x){

  book_id = x.getAttribute("data-book_id");

  console.log("GOING TO OPEN PDF");
  console.log("startReadingBook book_id : " + book_id);
}

function buyBook(x){

  var book_id = x.getAttribute("data-book_id");

  if(current_book_price == "FREE"){
    startReadingBook(x);
  } else {

    console.log("GOING TO BUY PDF");

  }
  console.log("buyBook book_id : " + book_id);
}




function toastText(this_message){
  var toastError = app.toast.create({
    text: this_message,
    closeTimeout: 2000,
  });
  toastError.open();
}

function addArticle() {
  console.log("addArticle started");
  console.log("addProfilePicToggle : " + addProfilePicToggle);
  if(addProfilePicToggle == 0){

    addProfilePicToggle = 1;

    var disArticlePic = document.getElementById("article_over_art").value;
    var disArticleTitle = document.getElementById("article_title").value;
    var disArticleTags = document.getElementById("article_tags").value;
    var disArticleBody = document.getElementById("article_body").value;


    if(disArticlePic.trim() == ""){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'You must select a picture for the article',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if(disArticleTags.trim() == "" || disArticleTags.trim() == "" || disArticleBody.trim() == ""){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'Complete all fields',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if (disArticlePic.trim() != "" && disArticleTags.trim() != "" && disArticleBody.trim() != ""){


      app.preloader.show();
      var formData = new FormData();
      formData.append('myid', my_user_sys_id);
      formData.append('mypass', my_e_password);
      formData.append('article_title', disArticleTitle);
      formData.append('article_tags', disArticleTags);
      formData.append('article_body', disArticleBody);
      formData.append('image', $('#article_over_art')[0].files[0]); 

       var url_real = CONFIG + "/inc/add_article.php";
       console.log("my_user_sys_id : " + my_user_sys_id);
       console.log("my_e_password : " + my_e_password);
       console.log("disArticleTitle : " + disArticleTitle);
       console.log("disArticleTags : " + disArticleTags);
       console.log("disArticleBody : " + disArticleBody);
       console.log("article_over_art : " + $('#article_over_art')[0].files[0]);
      app.request({
          url: url_real,
          type: "POST",
          data: formData,
          mimeTypes:"multipart/form-data",
          contentType: false,
          cache: false,
          processData: false,
          success: function(response){
  console.log(response);
              app.preloader.hide();
              addProfilePicToggle = 0;

              if(response.trim() != ""){
              var addResponse = JSON.parse(response);

              if(addResponse["datareturned"][0]["status"] == "yes"){

                document.getElementById("article_over_art").value = "";
                document.getElementById("article_title").value = "";
                document.getElementById("article_tags").value = "";
                document.getElementById("article_body").value = "";

                // ALERT EMPLOYEE ADDED
                toastalert = addResponse["datareturned"][0]["message"];
                app.dialog.alert(toastalert, "Upload");
                $('#back_upload_blog_in').click();

              } else {


                toastalert = addResponse["datareturned"][0]["error"];
                var toastBottom = app.toast.create({
                  text: toastalert,
                  closeTimeout: 2000,
                });

                toastBottom.open();

              }
            } else {
                var toastBottom = app.toast.create({
                  text: "Something went awry. Complete all fields",
                  closeTimeout: 2000,
                });

                toastBottom.open();

            }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
    
              addProfilePicToggle = 0;
              toastalert = "Network Error";
              var toastBottom = app.toast.create({
                text: toastalert,
                closeTimeout: 2000,
              });

              toastBottom.open();

              app.preloader.hide();

          }
        });

    } else {

      app.preloader.hide();
      addProfilePicToggle = 0;
      toastalert = "Something went awry";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

    }

  } else {

      toastalert = "Article is still updating";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

  }

}
function setPriceOrNot(x){

  if(x.value == "Free"){
    document.getElementById("price_column").style.display = "none";
    document.getElementById("book_price").value = "0";
    document.getElementById("currency_column").style.display = "none";
    toastText("Price set to 0");
  } else {
    document.getElementById("price_column").style.display = "";
    document.getElementById("currency_column").style.display = "";
  }

}
function addBook() {
  console.log("addArticle started");
  console.log("addProfilePicToggle : " + addProfilePicToggle);
  if(addProfilePicToggle == 0){

    addProfilePicToggle = 1;


    var book_title = document.getElementById("book_title").value;
    var book_author = document.getElementById("book_author").value;
    var book_category = document.getElementById("book_category").value;
    var book_free_or_not = document.getElementById("book_free_or_not").value;
    var book_price = document.getElementById("book_price").value;
    var book_currency = document.getElementById("book_currency").value;
    var book_description = document.getElementById("book_description").value;
    var book_picture = document.getElementById("book_cover_art").value;
    var book_pdf = document.getElementById("book_pdf").value;


    if(book_picture.trim() == ""){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'You must select the cover image of the book',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if(book_pdf.trim() == ""){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'You must select a pdf of the book',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if(book_title.trim() == "" || book_author.trim() == "" 
      || book_category.trim() == "" || book_free_or_not.trim() == ""
      || book_price.trim() == "" || book_currency.trim() == ""
      || book_description.trim() == "" || book_picture.trim() == "" || book_pdf.trim() == ""){

            addProfilePicToggle = 0;
            var toastBottom = app.toast.create({
            text: 'Complete all fields',
            closeTimeout: 2000,
            });
            toastBottom.open();

    } else if(book_title.trim() != "" && book_author.trim()  != ""
      &&  book_category.trim()  != "" &&  book_free_or_not.trim() != "" 
      &&  book_price.trim()  != "" &&  book_currency.trim()  != "" 
      &&  book_description.trim()  != "" &&  book_picture.trim()  != ""
      &&  book_pdf.trim()  != "" && $('#rightstosell').is(":checked")){


      app.preloader.show();
      var formData = new FormData();
      formData.append('myid', my_user_sys_id);
      formData.append('mypass', my_e_password);
      formData.append('book_title', book_title);
      formData.append('book_author', book_author);
      formData.append('book_category', book_category);
      formData.append('book_free_or_not', book_free_or_not);
      formData.append('book_price', book_price);
      formData.append('book_currency', book_currency);
      formData.append('book_description', book_description);
      formData.append('image', $('#book_cover_art')[0].files[0]); 
      formData.append('pdf', $('#book_pdf')[0].files[0]); 

       var url_real = CONFIG + "/inc/add_book.php";

      app.request({
          url: url_real,
          type: "POST",
          data: formData,
          mimeTypes:"multipart/form-data",
          contentType: false,
          cache: false,
          processData: false,
          success: function(response){
          console.log(response);
              app.preloader.hide();
              addProfilePicToggle = 0;

              if(response.trim() != ""){
              var addResponse = JSON.parse(response);

              if(addResponse["datareturned"][0]["status"] == "yes"){

                document.getElementById("book_title").value = "";
                document.getElementById("book_author").value = "";
                document.getElementById("book_category").value = "";
                document.getElementById("book_free_or_not").value = "";
                document.getElementById("book_price").value = "";
                document.getElementById("book_currency").value = "";
                document.getElementById("book_description").value = "";
                document.getElementById("book_cover_art").value = "";
                document.getElementById("book_pdf").value = "";

                // ALERT EMPLOYEE ADDED
                toastalert = addResponse["datareturned"][0]["message"];
                app.dialog.alert(toastalert, "Upload");
                $('#back_upload_book').click();

              } else {


                toastalert = addResponse["datareturned"][0]["error"];
                var toastBottom = app.toast.create({
                  text: toastalert,
                  closeTimeout: 2000,
                });

                toastBottom.open();

              }
            } else {
                var toastBottom = app.toast.create({
                  text: "Something went awry. Complete all fields and try again",
                  closeTimeout: 2000,
                });

                toastBottom.open();

            }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
    
              addProfilePicToggle = 0;
              toastalert = "Network Error";
              var toastBottom = app.toast.create({
                text: toastalert,
                closeTimeout: 2000,
              });

              toastBottom.open();

              app.preloader.hide();

          }
        });

    } else {

      app.preloader.hide();
      addProfilePicToggle = 0;
      toastalert = "Complete all fields.";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

    }

  } else {

      toastalert = "Book is still updating";
      var toastBottom = app.toast.create({
        text: toastalert,
        closeTimeout: 2000,
      });

      toastBottom.open();

  }

}

function setAccount() {

    var acc_country = document.getElementById("acc_country").value;
    var acc_type = document.getElementById("acc_type").value;
    var acc_name = document.getElementById("acc_name").value;
    var acc_swift = document.getElementById("acc_swift").value;
    var acc_number = document.getElementById("acc_number").value;
    var my_password = document.getElementById("my_password").value;


var toastnot = app.toast.create({
  text: 'Account Not Found',
  closeTimeout: 2000,
})


    if(acc_country.trim() == "" || acc_type.trim() == "" || acc_name.trim() == "" 
        || acc_number.trim() == "" || my_password.trim() == ""){

        var toastBottom = app.toast.create({
          text: 'Incomplete Form',
          closeTimeout: 2000,
        });

        toastBottom.open();

    } else if (acc_country.trim() != "" && acc_type.trim() != "" && acc_name.trim() != "" 
     && acc_number.trim() != "" && my_password.trim() != ""){

       //alert("Validating...");
       var url_real = CONFIG + "/inc/set_account.php";
         var loginData = {
            "myid" : my_user_sys_id,
            "mypass" : my_e_password,
            "raw_pass" : my_password,
            "acc_type" : acc_type,
            "acc_country" : acc_country,
            "bank_routing_number" : acc_swift,
            "bank_name_or_mobilenetwork_name" : acc_name,
            "bank_acc_or_mobilemoney_number" : acc_number
        };  

      app.preloader.show();
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
              console.log(response);
              if(response.trim() == ""){
                app.dialog.alert("Something went awry. Complete all fields and try again", "Error");
              } else {
                app.dialog.alert(response, "Alert");
              }
              app.preloader.hide();
          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {

      alert("Something went awry");

    }


}

// create searchbar
var searchbarBlog = app.searchbar.create({
  el: '.searchbar-demo3',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      //console.log(query, previousQuery);
      getBlogsFromSearch('bloglist_in_page');
    }
  }
});

function getBlogsFromSearch(searchtext) {

  current_page = 'bloglist_in_page';
  if(searchtext != "?????" && searchtext != "?????-?????"){

    searchtext = document.getElementById('search_input_bloglist').value;

  } 

      console.log("searchtext : " + searchtext);

     if(searchtext != ""){


      console.log("getBlogsFromSearch started");

        var url_real = CONFIG + "/inc/get_blogs_from_search.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            searchtxt : searchtext,
            last_sku : last_blog_sku_search
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No blogs matched your search", "Hey");

             } else {

                  var blogsResponse = JSON.parse(response);
                  var total_books_num = Object.keys(blogsResponse["blogs"]).length;


                  if(total_books_num > 0){

                  document.getElementById("blogs_holder_booklist").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){

                        var sku = blogsResponse["blogs"][i]["sku"];
                        var full_name = blogsResponse["blogs"][i]["full_name"];
                        var writer_id = blogsResponse["blogs"][i]["writer_id"];
                        var tags = blogsResponse["blogs"][i]["tags"];
                        var title = blogsResponse["blogs"][i]["title"];
                        var blog_story = blogsResponse["blogs"][i]["blog_story"];
                        var blog_cover_art = blogsResponse["blogs"][i]["blog_cover_art"];

                        $('#blogs_holder_booklist').append($('<li onclick="getBlogInfo(' + sku + ');"><a href="/blog/" class="item-link item-content"><div class="item-media"><img src="' + blog_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + title + '</div></div><div class="item-subtitle">' + full_name + '</div><div class="item-text">' + blog_story + '</div><div class=""></div></div></a></li>'));
                    }


                  } else {

                      app.dialog.alert("No blogs found", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });



  } else {
                var this_message = "Please type your search";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
  }

}

function getBlogInfo(sku) {

     if(sku == null || sku == ""){

        app.dialog.alert("Something went awry. Try restarting app and try again", "Error");

     } else if(sku != ""){

        var url_real = CONFIG + "/inc/get_blog_info.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            blog_sku : sku
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("Article was not found", "Hey");

             } else {

                  var blogsResponse = JSON.parse(response);
                  var total_blogs_num = Object.keys(blogsResponse["blogs"]).length;


                  if(total_blogs_num > 0){

                        var sku = blogsResponse["blogs"][0]["sku"];
                        var full_name = blogsResponse["blogs"][0]["full_name"];
                        var writer_id = blogsResponse["blogs"][0]["writer_id"];
                        var tags = blogsResponse["blogs"][0]["tags"];
                        var title = blogsResponse["blogs"][0]["title"];
                        var blog_story = blogsResponse["blogs"][0]["blog_story"];
                        var blog_cover_art = blogsResponse["blogs"][0]["blog_cover_art"];

                        if(writer_id == my_user_sys_id){

    document.getElementById('id_holder').style.display = "none";

                        } else {

    document.getElementById('id_holder').style.display = "";

                        }
    document.getElementById('writer_name_blog').innerHTML = full_name;
    x = document.getElementById('id_holder');
    x.setAttribute("data-id", writer_id);
    document.getElementById('title_blog').innerHTML = title;
    document.getElementById('story_blog').innerHTML = blog_story;
    //document.getElementById('book_commentsnum_popup_booklist').innerHTML = blog_cover_art;


                  } else {

                      app.dialog.alert("No article was found", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });



  } else {
                var this_message = "Try restarting app and try again";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
  }

}

function subscribe(x){


  var id = x.getAttribute("data-id");

    if(id.trim() == ""){


        var toastBottom = app.toast.create({
          text: 'Something went awry. Please restart app and try again',
          closeTimeout: 2000,
        });

        toastBottom.open();
        
    } else if (id.trim() != ""){

      //alert("Validating...");
       var url_real = CONFIG + "/inc/subscribe.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            this_id : id
        };  

      app.preloader.show();
      
        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
                var toastResponse = app.toast.create({
                  text: response,
                  closeTimeout: 2000,
                });
              toastResponse.open();
                app.preloader.hide();

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {

                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              app.preloader.hide();
          }
        });
    } else {

      alert("Something went awry");

    }


}

function getBooksMyLibrary(type) {
      current_page = 'lib_in_page';
      console.log("getCategoryBooks started");

      if(type == "1"){
        var url_real = CONFIG + "/inc/get_mybooks_mylib.php";
      } else {
        var url_real = CONFIG + "/inc/get_mypurchased_books.php";
      }
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            last_sku : last_book_sku_category
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No books matched your search", "Hey");

             } else {

                  var booksResponse = JSON.parse(response);
                  var total_books_num = Object.keys(booksResponse["books"]).length;


                  if(total_books_num > 0){

                  if(type == "1"){
                   document.getElementById("mybooklist_holder_lib").innerHTML = "";
                  } else {
                   document.getElementById("purchasedbooklist_holder_lib").innerHTML = "";
                  }


                    for(i = 0; i < total_books_num; i++){
                        var sku = booksResponse["books"][i]["sku"];
                        var book_id = booksResponse["books"][i]["book_id"];
                        var book_category = booksResponse["books"][i]["book_category"];
                        var book_name = booksResponse["books"][i]["book_name"];
                        var book_description = booksResponse["books"][i]["book_description"];
                        var book_cover_art = booksResponse["books"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["books"][i]["author_publisher_name"];
                        var book_price = booksResponse["books"][i]["book_price"];
                        var ui_book_price = booksResponse["books"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["books"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["books"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["books"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["books"][i]["book_rating"];
                        var ui_book_rating = booksResponse["books"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["books"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["books"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["books"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["books"][i]["ui_book_comments_num_display"];

                        total_ui_ratings_comments = "none";
                        fake_book_id = "no_id";

                  if(type == "1"){
                      $('#mybooklist_holder_lib').append($('<li onclick="startReadingBook(this);" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold; display : none;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                  } else {
                      $('#purchasedbooklist_holder_lib').append($('<li onclick="startReadingBook(this);" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold; display : none;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                  }


                    
                    }


                  } else {

                      app.dialog.alert("No books matched your search", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });


}

function getBlogsMyLibrary() {

  current_page = 'lib_in_page';

      console.log("getBlogsFromSearch started");

        var url_real = CONFIG + "/inc/get_blogs_mylib.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            searchtxt : 'a',
            last_sku : last_blog_sku_search
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No blogs matched your search", "Hey");

             } else {

                  var blogsResponse = JSON.parse(response);
                  var total_books_num = Object.keys(blogsResponse["blogs"]).length;


                  if(total_books_num > 0){

                  document.getElementById("bloglist_holder_lib").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){

                        var sku = blogsResponse["blogs"][i]["sku"];
                        var full_name = blogsResponse["blogs"][i]["full_name"];
                        var writer_id = blogsResponse["blogs"][i]["writer_id"];
                        var tags = blogsResponse["blogs"][i]["tags"];
                        var title = blogsResponse["blogs"][i]["title"];
                        var blog_story = blogsResponse["blogs"][i]["blog_story"];
                        var blog_cover_art = blogsResponse["blogs"][i]["blog_cover_art"];

                        $('#bloglist_holder_lib').append($('<li onclick="getBlogInfo(' + sku + ');"><a href="/blog/" class="item-link item-content"><div class="item-media"><img src="' + blog_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + title + '</div></div><div class="item-subtitle">' + full_name + '</div><div class="item-text">' + blog_story + '</div><div class=""></div></div></a></li>'));
                    }


                  } else {

                      app.dialog.alert("No blogs found", "Hey");
                      
                  }

             }
            app.preloader.hide();

            }, 2000);

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
              /*
                var this_message = "Poor network connection. Try again later";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
              */
              app.dialog.alert("Something went awry. Try the a search", "Network Error");

          }
        });

}

/*********************************************************************************************************************************

                                                                  FUNCTIONS END 

 /******************************************************************************************************************************/

checkIfSignedIn();
//signMeOut();


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       alert("bottom!");
   }
});


/*
setInterval(function () {
  
  console.log("current_page : " + current_page);

}, 2000);
*/