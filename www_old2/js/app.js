
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
var theme = 'ios';
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
var globalCheckerId = "";
var globalBookIdOrScoopSku = "";
var globalCurrentReadingBook = localStorage.getItem("globalCurrentReadingBook");

var slydepay_order_id = "";
var slydepay_token = "";
var slydepay_redirect_url = "";

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
      localStorage.removeItem('globalCurrentReadingBook');

}

function checkIfSignedIn(){

    var my_user_sys_id =localStorage.getItem("user_sys_id");
    var my_e_password =localStorage.getItem("e_pass");
    var my_full_name =localStorage.getItem("c_name");
    var my_phone =localStorage.getItem("c_phone");
    var my_profile_pic =localStorage.getItem("profile_pic");
    var my_subsribers =localStorage.getItem("my_subsribers");
    var my_subscriptions =localStorage.getItem("my_subscriptions");
    var globalCurrentReadingBook = localStorage.getItem("globalCurrentReadingBook");

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

function setProfileInfo(profile_name, profile_pic, subsribers, subscriptions){

  if(profile_name == "" && profile_pic == ""){
      profile_name = my_full_name;
      profile_pic = my_profile_pic;
      subsribers = my_subsribers;
      subscriptions = my_subscriptions;
  }
  console.log("profile_name : " + profile_name);
  console.log("profile_pic : " + profile_pic);
  console.log("my_subsribers : " + subsribers);
  console.log("my_subscriptions : " + subscriptions);
  setTimeout(function () {

      if(document.getElementById("profile_name_main") != null && document.getElementById("profile_name_main") != undefined){
      
      document.getElementById("profile_name_main").innerHTML = profile_name;
      document.getElementById("profile_pic_main").src = profile_pic;
      document.getElementById("my_subscribers_main").innerHTML = subsribers;
      document.getElementById("my_subscriptions_main").innerHTML = subscriptions;
      current_page = 'main_logged_in_page';
      }

  }, 1000);

}

function updateprofileInfo(){

  var url_real = CONFIG + "/inc/get_profile_info.php";
  var loginData = {
    myid : my_user_sys_id,
    mypass : my_e_password,
    system_id : my_user_sys_id,
    fetch_others : "no"
  };  

  console.log(loginData);

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
          
              var loginResponse = JSON.parse(response);
            console.log(loginResponse);

              if(loginResponse["hits"][0]["status"] == "yes"){

                localStorage.setItem("my_subsribers", loginResponse["hits"][0]["my_subsribers"]);
                localStorage.setItem("my_subscriptions", loginResponse["hits"][0]["my_subscriptions"]);
                localStorage.setItem("profile_pic", loginResponse["hits"][0]["profile_pic"]);

                  setTimeout(function () {
                    
                    setProfileInfo(loginResponse["hits"][0]["signup_name"], loginResponse["hits"][0]["profile_pic"], loginResponse["hits"][0]["my_subsribers"], loginResponse["hits"][0]["my_subscriptions"]);

                  }, 2000);


              }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
          }
        });

}

function checkLogin() {

    var disUsername = document.getElementById("dis_username").value;
    var disPassword = document.getElementById("dis_password").value;
    var eulaAgreement = document.getElementById("eula_agreement_login");

var toastBottom = app.toast.create({
  text: 'All Fields Must Be Completed',
  closeTimeout: 2000,
});

var toastnot = app.toast.create({
  text: 'Account Not Found',
  closeTimeout: 2000,
})

    if(disUsername.trim() == ""){

        showToast("Complete all fields");
        return;

    } else {

      if(validatePhone(disUsername) && disUsername.length >= 11 && disUsername.length <= 15 && disUsername.charAt(0) == "+"){


      } else if(validateEmail(disUsername)){


      } else {

        showToast("Enter correct email or phone with country code beginning with +");
        return;

      }

    }

    if(!eulaAgreement.checked){

          showToast("You have to agree to the End-User License Agreement");

    } else if(disUsername.trim() == "" || disPassword.trim() == "" ){

        toastBottom.open();

    } else if (disUsername.trim() != "" && disPassword.trim() != "" && eulaAgreement.checked){

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
                my_profile_pic = loginResponse["profile_pic"];
                my_subsribers = loginResponse["my_subsribers"];
                my_subscriptions = loginResponse["my_subscriptions"];


                app.preloader.hide();
                current_page = "main_logged_in_page";
                $('#success_signup').click();

                  setTimeout(function () {
                    
                    setProfileInfo(loginResponse["signup_name"], loginResponse["profile_pic"], loginResponse["my_subsribers"], loginResponse["my_subscriptions"]);

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

function showToast(toast_text){

    if(toast_text.trim() == "1"){
      toastText = "Something went awry. Try again";
    }

    var toastBottom = app.toast.create({
      text: toast_text,
      closeTimeout: 2000,
    });

    toastBottom.open();


}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone){
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

function checkSignup() {

    var disSignupName = document.getElementById("signup_name").value;
    var disSignupEmail = document.getElementById("signup_email").value;
    var disSignupPassword = document.getElementById("signup_password").value;
    var disSignupPasswordRepeat = document.getElementById("signup_password_repeat").value;
    var eulaAgreement = document.getElementById("eula_agreement_signin");

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

    if(disSignupEmail.trim() == ""){

        showToast("Complete all fields");
        return;

    } else {

      if(validatePhone(disSignupEmail) && disSignupEmail.length >= 11 && disSignupEmail.length <= 15 && disSignupEmail.charAt(0) == "+"){


      } else if(validateEmail(disSignupEmail)){


      } else {

        showToast("Enter correct email or phone with country code beginning with +");
        return;

      }

    }

    if(!eulaAgreement.checked){

          showToast("You have to agree to the End-User License Agreement");

    } else if(disSignupName.trim() == "" || disSignupEmail.trim() == "" || disSignupPassword.trim() != disSignupPasswordRepeat ){

      if(disSignupPassword.trim() != disSignupPasswordRepeat.trim()){
        
        // PASSWORDS DON'T MATCH
        toastPasswordsDontMatch.open();

      } else {

        toastBottom.open();

      }

    

    } else if (disSignupName.trim() != "" && eulaAgreement.checked
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
                my_profile_pic = loginResponse["profile_pic"];
                my_subsribers = loginResponse["my_subsribers"];
                my_subscriptions = loginResponse["my_subscriptions"];

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

      showToast("Something went awry. Complete all fields");

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
              console.log("my_user_sys_id : " + my_user_sys_id);
              console.log("my_e_password : " + my_e_password);

      app.request({
          url: url_real,
          type: "POST",
          data: formData,
          mimeTypes:"multipart/form-data",
          success: function(response){
              console.log("response : " + response);
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

            setTimeout(function () {

                document.getElementById("highlyrated_books_holder_store_front").innerHTML = "";
                document.getElementById("highlyrated_card_store_front").style.display = "none";

                document.getElementById("recommended_books_holder_store_front").innerHTML = "";
                document.getElementById("recommended_card_store_front").style.display = "none";
                
                document.getElementById("bestselling_books_holder_store_front").innerHTML = "";
                document.getElementById("bestselling_card_store_front").style.display = "none";
                
                document.getElementById("new_books_holder_store_front").innerHTML = "";
                document.getElementById("new_card_store_front").style.display = "none";

            }, 2000);

      

      console.log("getBooksForStoreFront started");
       current_page = 'store_in_page';
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
            setTimeout(function () {

            var booksResponse = JSON.parse(response);
            console.log(booksResponse);
            var total_highly_rated_books_num = Object.keys(booksResponse["highly_rated"]).length;
            var total_recommended_books_num = Object.keys(booksResponse["recommended"]).length;
            var total_best_selling_books_num = Object.keys(booksResponse["best_selling"]).length;
            var total_new_books_num = Object.keys(booksResponse["new"]).length;

            if(total_highly_rated_books_num > 0){

                document.getElementById("highlyrated_card_store_front").style.display = "";

              for(i = 0; i < total_highly_rated_books_num; i++){

                        var sku = booksResponse["highly_rated"][i]["sku"];
                        var book_id = booksResponse["highly_rated"][i]["book_id"];
                        var book_category = booksResponse["highly_rated"][i]["book_category"];
                        var book_name = booksResponse["highly_rated"][i]["book_name"];
                        var book_description = booksResponse["highly_rated"][i]["book_description"];
                        var book_cover_art = booksResponse["highly_rated"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["highly_rated"][i]["author_publisher_name"];
                        var book_price = booksResponse["highly_rated"][i]["book_price"];
                        var ui_book_price = booksResponse["highly_rated"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["highly_rated"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["highly_rated"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["highly_rated"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["highly_rated"][i]["book_rating"];
                        var ui_book_rating = booksResponse["highly_rated"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["highly_rated"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["highly_rated"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["highly_rated"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["highly_rated"][i]["ui_book_comments_num_display"];
                        var my_rating = booksResponse["highly_rated"][i]["my_rating"];

                        total_ui_ratings_comments = "none";


                $('#highlyrated_books_holder_store_front').append($('<div class="swiper-slide" style="width: 120px; -webkit-align-items: top; align-items: flex-start; position: relative; border: none; margin-left: 5px;"><div onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"  style="height: 120px; width: 120px; background-image: url(' + book_cover_art + '); background-size: cover; border-radius: 5px;"  class="popup-open" data-popup=".book-popup"></div><div style=" position: absolute; bottom: 0; font-size: 12px; text-align: left; float: left; width: 100%;"  class="popup-open" data-popup=".book-popup"><span style="font: bolder; font-weight: 600;overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-bottom: -15px;">' + book_name +'</span><br><span style="font: bolder; font-weight: 600; color: #583082;">' + ui_book_price + ' &nbsp;</span></div></div>'));
              }

            } else {

                document.getElementById("highlyrated_card_store_front").style.display = "none";
                
            }

            if(total_recommended_books_num > 0){

                document.getElementById("recommended_card_store_front").style.display = "";

              for(i = 0; i < total_recommended_books_num; i++){

                        var sku = booksResponse["recommended"][i]["sku"];
                        var book_id = booksResponse["recommended"][i]["book_id"];
                        var book_category = booksResponse["recommended"][i]["book_category"];
                        var book_name = booksResponse["recommended"][i]["book_name"];
                        var book_description = booksResponse["recommended"][i]["book_description"];
                        var book_cover_art = booksResponse["recommended"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["recommended"][i]["author_publisher_name"];
                        var book_price = booksResponse["recommended"][i]["book_price"];
                        var ui_book_price = booksResponse["recommended"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["recommended"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["recommended"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["recommended"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["recommended"][i]["book_rating"];
                        var ui_book_rating = booksResponse["recommended"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["recommended"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["recommended"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["recommended"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["recommended"][i]["ui_book_comments_num_display"];
                        var my_rating = booksResponse["recommended"][i]["my_rating"];

                        total_ui_ratings_comments = "none";

                $('#recommended_books_holder_store_front').append($('<div class="swiper-slide" style="width: 120px; -webkit-align-items: top; align-items: flex-start; position: relative; border: none; margin-left: 5px;"><div onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"  style="height: 120px; width: 120px; background-image: url(' + book_cover_art + '); background-size: cover; border-radius: 5px;"  class="popup-open" data-popup=".book-popup"></div><div style=" position: absolute; bottom: 0; font-size: 12px; text-align: left; float: left; width: 100%;"  class="popup-open" data-popup=".book-popup"><span style="font: bolder; font-weight: 600;overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-bottom: -15px;">' + book_name +'</span><br><span style="font: bolder; font-weight: 600; color: #583082;">' + ui_book_price + ' &nbsp;</span></div></div>'));
              }

            } else {

                document.getElementById("recommended_card_store_front").style.display = "none";
                
            }

            if(total_best_selling_books_num > 0){

                document.getElementById("bestselling_card_store_front").style.display = "";

              for(i = 0; i < total_best_selling_books_num; i++){

                        var sku = booksResponse["best_selling"][i]["sku"];
                        var book_id = booksResponse["best_selling"][i]["book_id"];
                        var book_category = booksResponse["best_selling"][i]["book_category"];
                        var book_name = booksResponse["best_selling"][i]["book_name"];
                        var book_description = booksResponse["best_selling"][i]["book_description"];
                        var book_cover_art = booksResponse["best_selling"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["best_selling"][i]["author_publisher_name"];
                        var book_price = booksResponse["best_selling"][i]["book_price"];
                        var ui_book_price = booksResponse["best_selling"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["best_selling"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["best_selling"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["best_selling"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["best_selling"][i]["book_rating"];
                        var ui_book_rating = booksResponse["best_selling"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["best_selling"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["best_selling"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["best_selling"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["best_selling"][i]["ui_book_comments_num_display"];
                        var my_rating = booksResponse["best_selling"][i]["my_rating"];

                        total_ui_ratings_comments = "none";


                $('#bestselling_books_holder_store_front').append($('<div class="swiper-slide" style="width: 120px; -webkit-align-items: top; align-items: flex-start; position: relative; border: none; margin-left: 5px;"><div onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"  style="height: 120px; width: 120px; background-image: url(' + book_cover_art + '); background-size: cover; border-radius: 5px;"  class="popup-open" data-popup=".book-popup"></div><div style=" position: absolute; bottom: 0; font-size: 12px; text-align: left; float: left; width: 100%;"  class="popup-open" data-popup=".book-popup"><span style="font: bolder; font-weight: 600;overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-bottom: -15px;">' + book_name +'</span><br><span style="font: bolder; font-weight: 600; color: #583082;">' + ui_book_price + ' &nbsp;</span></div></div>'));
              }

            } else {

                document.getElementById("bestselling_card_store_front").style.display = "none";
                
            }

            if(total_new_books_num > 0){

                document.getElementById("new_card_store_front").style.display = "";

              for(i = 0; i < total_new_books_num; i++){

                        var sku = booksResponse["new"][i]["sku"];
                        var book_id = booksResponse["new"][i]["book_id"];
                        var book_category = booksResponse["new"][i]["book_category"];
                        var book_name = booksResponse["new"][i]["book_name"];
                        var book_description = booksResponse["new"][i]["book_description"];
                        var book_cover_art = booksResponse["new"][i]["book_cover_art"];
                        var author_publisher_name = booksResponse["new"][i]["author_publisher_name"];
                        var book_price = booksResponse["new"][i]["book_price"];
                        var ui_book_price = booksResponse["new"][i]["ui_book_price"];
                        var quantity_sold = booksResponse["new"][i]["quantity_sold"];
                        var book_pdf_pages_num = booksResponse["new"][i]["book_pdf_pages_num"];
                        var book_pdf_size_mb = booksResponse["new"][i]["book_pdf_size_mb"];
                        var book_rating = booksResponse["new"][i]["book_rating"];
                        var ui_book_rating = booksResponse["new"][i]["ui_book_rating"];
                        var ui_book_rating_display = booksResponse["new"][i]["ui_book_rating_display"];
                        var book_comments_num = booksResponse["new"][i]["book_comments_num"];
                        var ui_book_comments_num = booksResponse["new"][i]["ui_book_comments_num"];
                        var ui_book_comments_num_display = booksResponse["new"][i]["ui_book_comments_num_display"];

                        total_ui_ratings_comments = "none";


                $('#new_books_holder_store_front').append($('<div class="swiper-slide" style="width: 120px; -webkit-align-items: top; align-items: flex-start; position: relative; border: none; margin-left: 5px;"><div onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"  style="height: 120px; width: 120px; background-image: url(' + book_cover_art + '); background-size: cover; border-radius: 5px;"  class="popup-open" data-popup=".book-popup"></div><div style=" position: absolute; bottom: 0; font-size: 12px; text-align: left; float: left; width: 100%;"  class="popup-open" data-popup=".book-popup"><span style="font: bolder; font-weight: 600;overflow: hidden; text-overflow: hidden; -webkit-line-clamp:1; -webkit-box-orient: vertical; display: -webkit-box; margin-bottom: -15px;">' + book_name +'</span><br><span style="font: bolder; font-weight: 600; color: #583082;">' + ui_book_price + ' &nbsp;</span></div></div>'));
              }


            } else {

                document.getElementById("new_card_store_front").style.display = "none";
                
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
              app.dialog.alert("Something went awry. Try again", "Network Error");

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

                      app.dialog.alert("No books to show", "Hey");

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
                        var my_rating = booksResponse["books"][i]["my_rating"];

                        total_ui_ratings_comments = "none";

                      $('#books_holder_booklist').append($('<li onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content popup-open" data-popup=".book-popup"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                    
                    }


                  } else {

                      app.dialog.alert("No books to show", "Hey");
                      
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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

          }
        });


}

function resetPage(type){
  if(type == "subscribe"){

          document.getElementById("subscribers_holder").innerHTML = "";

  } else if (type == "profile"){
    document.getElementById("pic_profile").src = "img/avatar.png";
    document.getElementById("name_profile").innerHTML = "...";
    document.getElementById("subscribers_profile").innerHTML = "...";
    document.getElementById("subscriptions_profile").innerHTML = "...";
    document.getElementById("books_holder_profile").innerHTML = "...";
    document.getElementById("blogs_holder_profile").innerHTML = "...";

  } else if (type == "comment"){

    document.getElementById("comments_holder").innerHTML = "";

  } else if(type == "blog"){

    document.getElementById('id_holder').style.display = "none";
    document.getElementById('writer_name_blog').innerHTML = "";
    document.getElementById('writer_name_blog').setAttribute("data-systemid", "");
    document.getElementById('title_blog').innerHTML = "";
    document.getElementById('comments_num_holder').innerHTML = "";
    document.getElementById('story_blog').innerHTML = "";
    document.getElementById("cover_art_blog_in_page").style.backgroundImage = "url()";


  }
}

function getSubs(type, id_holder) {

      console.log("type : " + type);
      console.log("id_holder : " + id_holder);
        if(id_holder == "mine"){

          this_checker_id = my_user_sys_id;

        } else {

          this_checker_id = globalCheckerId;

        }
        setTimeout(function () {
          resetPage("subscribe");
        }, 1000);


        current_page = 'subscribed_in_page';

        var url_real = CONFIG + "/inc/get_subscribers_or_subscribed.php";

         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            checker_id : this_checker_id,
            fetch_type : type
        };  

      console.log(loginData);

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("Nothing to show", "Hey");

             } else {

                  var booksResponse = JSON.parse(response);
                  var total_books_num = Object.keys(booksResponse["books"]).length;


                  if(total_books_num > 0){

                  document.getElementById("subscribers_holder").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){

                        var sku = booksResponse["books"][i]["sku"];
                        var system_id = booksResponse["books"][i]["system_id"];
                        var profile_pic = booksResponse["books"][i]["profile_pic"];
                        var full_name = booksResponse["books"][i]["full_name"];

                        $('#subscribers_holder').append($('<li><a href="/profile/" onclick="getProfileInfo(this);" data-systemid="' + system_id + '" class="item-link item-content"><div class="item-media" style="overflow: hidden;"><img src="' + profile_pic + '" width="34" height="34"/ style="border-radius: 50%; overflow: hidden;"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + full_name + '</div></div></div></a></li>'));
                    }


                  } else {

                      app.dialog.alert("Nothing to show", "Hey");
                      
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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry.", "Network Error");

          }
        });


}

function getProfileInfo(x) {

        setTimeout(function () {
          resetPage("profile");
        }, 1000);

        var profile_sys_id = x.getAttribute("data-systemid");
        globalCheckerId = profile_sys_id;
        console.log("profile_sys_id : " + profile_sys_id);

        if(profile_sys_id == undefined || profile_sys_id == ""){

            $('#back_btn_profile').click();
            showToast("Profile Load Error");
            return;
        }



        current_page = 'profile_in_page';

        var url_real = CONFIG + "/inc/get_profile_info.php";

         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            system_id : profile_sys_id,
            fetch_others : "yes"
        };  

      console.log(loginData);

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){

            app.preloader.hide();

            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                $('#back_btn_profile').click();
                showToast("Profile Load Error");
                return;

             } else {

              /******************* PROFILE *******************/

                  var booksResponse = JSON.parse(response);
                  var total_books_num = Object.keys(booksResponse["hits"]).length;
                  console.log(booksResponse);


                  if(booksResponse["hits"][0]["status"] == "yes"){


                    document.getElementById("pic_profile").src = booksResponse["hits"][0]["profile_pic"];
                    document.getElementById("name_profile").innerHTML = booksResponse["hits"][0]["signup_name"];
                    document.getElementById("subscribers_profile").innerHTML = booksResponse["hits"][0]["my_subsribers"];
                    document.getElementById("subscriptions_profile").innerHTML = booksResponse["hits"][0]["my_subscriptions"];
                    document.getElementById("books_holder_profile").innerHTML = "";
                    document.getElementById("blogs_holder_profile").innerHTML = "";
                    document.getElementById("subscribe_btn_profile").setAttribute("data-id", profile_sys_id);

                  } else {

                    $('#back_btn_profile').click();
                    showToast("Profile Load Error");
                    return;
                      
                  }
                  
              /******************* PROFILE *******************/


              /******************* BOOKS *******************/

                  var total_books_num = Object.keys(booksResponse["books"]).length;

                  console.log("1- total_books_num : " + total_books_num);

                  if(total_books_num > 0){


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
                        var my_rating = booksResponse["books"][i]["my_rating"];

                        total_ui_ratings_comments = "none";
                      $('#books_holder_profile').append($('<li onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content popup-open" data-popup=".book-popup"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 

                    }


                  } else {

                    showToast("This profile has no books");

                  }
                  
              /******************* BOOKS *******************/

              /******************* BLOGS *******************/

                  var total_books_num = Object.keys(booksResponse["blogs"]).length;

                  console.log("2- total_books_num : " + total_books_num);

                  if(total_books_num > 0){


                    for(i = 0; i < total_books_num; i++){

                        var sku = booksResponse["blogs"][i]["sku"];
                        var full_name = booksResponse["blogs"][i]["full_name"];
                        var writer_id = booksResponse["blogs"][i]["writer_id"];
                        var tags = booksResponse["blogs"][i]["tags"];
                        var title = booksResponse["blogs"][i]["title"];
                        var blog_story = booksResponse["blogs"][i]["blog_story"];
                        var blog_cover_art = booksResponse["blogs"][i]["blog_cover_art"];

                        $('#blogs_holder_profile').append($('<li onclick="getBlogInfo(' + sku + ');"><a href="/blog/" class="item-link item-content"><div class="item-media"><img src="' + blog_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + title + '</div></div><div class="item-subtitle">' + full_name + '</div><div class="item-text">' + blog_story + '</div><div class="item-text" style=" font-weight:600;">Tags: science, Culture</div><div class=""></div></div></a></li>'));

                    }


                  } else {

                    showToast("This profile has no scoops");
                      
                  }
                  
              /******************* BOOKS *******************/

             }

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
              */
                app.preloader.hide();
            $('#back_btn_profile').click();
            showToast("Network Error");
            return;

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

  } else if(page_name == "store_front_in_page"){

    searchtext = document.getElementById('search_input_store_front').value;

  } else {
    return;
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

                      app.dialog.alert("No books to show", "Hey");

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
                        var my_rating = booksResponse["books"][i]["my_rating"];

                        total_ui_ratings_comments = "none";
                      $('#books_holder_booklist').append($('<li onclick="showBookDetailInfo(this);" data-my_rating = "' + my_rating + '" data-sku="' + sku + '" data-book_id="' + book_id + '" data-book_pdf_size_mb="' + book_pdf_size_mb + '" data-book_pdf_pages_num="' + book_pdf_pages_num + '" data-ui_book_comments_num="' + ui_book_comments_num + '" data-ui_book_comments_num_display="' + ui_book_comments_num_display + '" data-book_comments_num="' + book_comments_num + '" data-book_category="' + book_category + '" data-book_name="' + book_name + '" data-book_description="' + book_description + '" data-book_cover_art="' + book_cover_art + '" data-author_publisher_name="' + author_publisher_name + '" data-ui_book_price="' + ui_book_price + '" data-quantity_sold="' + quantity_sold + '" data-book_rating="' + book_rating + '" data-ui_book_rating="' + ui_book_rating + '" data-ui_book_rating_display="' + ui_book_rating_display + '"><a href="#" class="item-link item-content popup-open" data-popup=".book-popup"><div class="item-media"><img src="' + book_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title" style="font-weight: bolder;">' + book_name + '</div><div class="item-after" style="font-weight: 600; color: #583082; font-style: bold;">' + ui_book_price + '</div></div><div class="item-subtitle">' + author_publisher_name + '</div><div class="item-text">' + book_description + '</div><div class="" style ="display : ' + total_ui_ratings_comments + '"><div class="chip" style="font-size: 10px; font-style: bold;"><div class="chip-label" style="display: ' + ui_book_rating_display + '"> ' + ui_book_rating + '</div></div><div class="chip" style="font-size: 10px; font-style: bold; margin-left : 5px;"><div class="chip-label" style="display: ' + ui_book_comments_num_display + '"> ' + ui_book_comments_num + '</div></div></div></div></a></li>')); 
                    
                    }


                  } else {

                      app.dialog.alert("No books to show", "Hey");
                      
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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

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
  globalBookIdOrScoopSku = book_id;
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
  var my_rating = x.getAttribute("data-my_rating");
  var rate_number = x.getAttribute("data-my_rating");

  document.getElementById('book_coverart_popup_booklist').src = book_cover_art;
  document.getElementById('book_title_popup_booklist').innerHTML = book_name;
  document.getElementById('book_author_popup_booklist').innerHTML = author_publisher_name;
  document.getElementById('book_category_popup_booklist').innerHTML = book_category;
  //document.getElementById('book_commentsnum_popup_booklist').innerHTML = book_comments_num;
  document.getElementById('book_price_popup_booklist').innerHTML = ui_book_price;
  document.getElementById('book_pagesnum_popup_booklist').innerHTML = book_pdf_pages_num + " pages";
  document.getElementById('book_size_popup_booklist').innerHTML = book_pdf_size_mb + " MB";
  document.getElementById('book_description_popup_booklist').innerHTML = book_description;
  document.getElementById('book_ratings').innerHTML = ui_book_rating;
  document.getElementById('book_ratings').style.display = ui_book_rating_display;
  document.getElementById('real_buy_book_btn').style.display = "none";
  document.getElementById('book_buybtn_popup_booklist').style.display = "";

  buyttn = document.getElementById('book_buybtn_popup_booklist');

  buyttn.setAttribute("data-book_id", book_id);
  current_book_price = ui_book_price;
  console.log("rate_number : " + rate_number);
  rateBook(rate_number, "yes");
  /*
  if(ui_book_price == "FREE"){
    buyttn.innerHTML = "READ";
  } else {
    buyttn.innerHTML = "BUY";
  }
  */
    buyttn.innerHTML = "READ";

}


function prepareSlydePay(x){

  item_name = document.getElementById("book_title_popup_booklist").innerHTML;
  final_charge_cedis = x.getAttribute("data-charge_cedis");

  console.log("item_name : " + item_name);
  console.log("final_charge_cedis : " + final_charge_cedis);

      // THIS IS THE SERVER SIDE FILE THAT GENERATES THE TOKEN
      var url_real = "https://fishpott.com/web/in/slydepay_web/prepare_payment_ferry.php";


/****************************************************************************************************
                            
            - IF THE CHARGE WE ARE GOING TO GENERATE THE TOKEN FOR IS ZERO OR LESS,
              ABORT THE PROCESS

****************************************************************************************************/

    if(parseFloat(final_charge_cedis) <= 0 || final_charge_cedis.toString().trim() == ""){

        var this_message = "Something went awry. Restart Process";
        var toastError = app.toast.create({
          text: this_message,
          closeTimeout: 2000,
        });
        toastError.open();
      return;
    }   

      // SETTING THE DATA TO BE SENT TO THE SERVER
       var loginData = {

          "myid" : my_user_sys_id,
          "mypass" : my_e_password,
          "mycountry" : "Ghana",
          "my_app_version" : "1.0",
          "item_name" : item_name,
          "buy_quantity" : 1,
          "total_charge" : final_charge_cedis

        };  

        console.log(loginData);
        console.log("url_real : " + url_real);

/****************************************************************************************************
                            
            - MAKING THE REQUEST TO THE SERVER

****************************************************************************************************/

      app.preloader.show();// SHOW THE LOADER

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){

            app.preloader.hide();//HIDE THE LOADER

            // IF THERE IS NO RESPONSE, INFORM USER
            if(response == null || response == ""){
                var this_message = "Something went awry. Try again";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
                app.preloader.hide();
                return;
            }

            var itemsResponse = JSON.parse(response);

/****************************************************************************************************
                            
            -IF THERE IS A RESPONSE, ALLOW USER TO GO AND MAKE PAYMENT ON SLYDEPAY USING TOKEN

****************************************************************************************************/
        console.log(itemsResponse);

            if(itemsResponse["status"] == 1){

              slydepay_order_id = itemsResponse["slydepay_order_id"];
              slydepay_token = itemsResponse["slydepay_pay_token"];
              slydepay_redirect_url = itemsResponse["slydepay_redirect_url"];

                current_all_tokens = localStorage.getItem("all_slydepay_tokens");
                console.log("current_all_tokens" + current_all_tokens);
                console.log("slydepay_token" + slydepay_token);
                console.log("slydepay_order_id" + slydepay_order_id);

                if(current_all_tokens == null){

                  new_all_tokens = slydepay_token;
                  localStorage.setItem("all_slydepay_tokens", slydepay_token);
                
                } else {

                  new_all_tokens = current_all_tokens + " " + slydepay_token;
                  localStorage.setItem("all_slydepay_tokens", new_all_tokens);

                }

                console.log("new_all_tokens" + new_all_tokens);


              document.getElementById("slydepay_link").href = slydepay_redirect_url;

              app.dialog.alert("Click 'Make Payment On Slydepay', make payment on Slydepay's website, and AFTER YOU FINISH PAYMENT ON SLYDEPAY, click the 'Confirm Payment' Button ", "Hey");
              $('#open_pay_popup_link').click();

            } else {

              var this_message ="Something went awry. Try again";
              app.dialog.alert(this_message, "Alert");

            }

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
}

function checkSlydepayPaymentStatus(type){

    app.preloader.show();
    var url_real = 'https://app.slydepay.com.gh/api/merchant/invoice/checkstatus';
    var checkData = {
    "emailOrMobileNumber": "fishpottcompany@gmail.com",
    "merchantKey": "1492651329147",
    "orderCode": slydepay_order_id,
    "payToken": slydepay_token,
    "confirmTransaction": true
    }

    console.log(checkData);


/****************************************************************************************************
                            
            - MAKING THE REQUEST TO SLYDEPAY'S SERVER

****************************************************************************************************/

    app.request({
        type: "POST",
        url: url_real,
        data: JSON.stringify(checkData),
        contentType: "application/json",
        success: function(response){
            response = JSON.parse(response);
            var paySuccessResponse = response["success"];

/****************************************************************************************************
                            
            - DID WE GET A RESPONSE FROM SLYDEPAY?

****************************************************************************************************/

            if(paySuccessResponse == true){
                var payResult = response["result"];


/****************************************************************************************************
                            
            - IF PAYMENT HAS BEEN MADE, THE STATUS IS EITHER "CONFIRMED or PENDING"

****************************************************************************************************/
                if(payResult == "CONFIRMED" || payResult == "PENDING"){
                //if(payResult == "NEW"){

                      showToast("Saving Book To Account");

                       var url_real = CONFIG + "/inc/save_purchased_book.php";
                         var loginData = {
                            "myid" : my_user_sys_id,
                            "mypass" : my_e_password,
                            "slydepay_token" : slydepay_token,
                            "book_id" : globalBookIdOrScoopSku
                        }; 

                  console.log(loginData);

                        app.request({
                          url: url_real,
                          type: "POST",
                          data: loginData,
                          success: function(response){
                            app.preloader.hide();
                              console.log(response);
                              if(response.trim() == ""){
                                var this_message = "Something went awry. Try again";
                                var toastError = app.toast.create({
                                  text: this_message,
                                  closeTimeout: 2000,
                                });
                                toastError.open();
                              } else {

                              var booksResponse = JSON.parse(response);
                              console.log(booksResponse);
                              status_message = booksResponse["highly_rated"][0]["status_message"];


                              if(booksResponse["highly_rated"][0]["status"] == "success"){

                                  book_pdf_link = booksResponse["highly_rated"][0]["book_pdf_link"];

                                  if(book_pdf_link == ""){

                                    showToast("Book not found. We are not even sure how that happened. Contact Trident with the book name for a review on the issue");
                                  
                                  } else {

                                    //showToast();
                                    if(document.getElementById('close_pay_popup_btn_ios') != null){
                                    
                                      $('#close_pay_popup_btn_ios').click();
                                      $('#close_pay_popup_btn_ios').click();

                                    }

                                    if(document.getElementById('close_pay_popup_btn_android') != null){
                                    
                                      $('#close_pay_popup_btn_android').click();
                                      $('#close_pay_popup_btn_android').click();

                                    }
                                    document.getElementById('real_buy_book_btn').style.display = "none";
                                    document.getElementById('book_buybtn_popup_booklist').style.display = "";
                                    $('#open_book_popup_link').click();
                                    //('#book_buybtn_popup_booklist').click();
                                    app.dialog.alert(status_message, "Hey");

                                  }

                              } else {

                              showToast(status_message);

                              }

                              }

                          },

                          error: function(XMLHttpRequest, textStatus, errorThrown) {
                                app.dialog.close();

                                var this_message = "Something went awry";
                                var toastError = app.toast.create({
                                  text: this_message,
                                  closeTimeout: 2000,
                                });
                                toastError.open();
                          }
                        });


/****************************************************************************************************
                            
            - IF PAYMENT WAS CANCELLED OR DISPUTED

****************************************************************************************************/

                } else if(payResult == "CANCELLED" || payResult == "DISPUTED"){

                    app.preloader.hide();
                    app.dialog.alert("Payment has been cancelled by SlydePay. Please restart the process and pay with a different method", "Alert");


/****************************************************************************************************
                            
            - IF PAYMENT IS NEWS AND WAITING TO BE MADE

****************************************************************************************************/


                } else if(payResult == "NEW"){
                    //savePaymentInfo("1");

                    app.preloader.hide();

                    app.dialog.alert("Payment isn't completed.Finish payment on SlydePay and try again after.", "Alert");

                } else {

                    app.preloader.hide();
                    app.dialog.alert("Something went wrong. Try again later.", "Alert");
                }


            } else {

                    app.preloader.hide();
                    app.dialog.alert("Order was not recognized by SlydePay. You have to restart the entire process.", "Alert");

            }
            
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {

                app.preloader.hide();
                var this_message = "Payment Status Check Failed. Try again";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
        }
    });

}

function success(message){
    console.log("progress = " + message);

    this_book_pdf = '/storage/emulated/0/Download/' + downloadname;
    globalCurrentReadingBook = this_book_pdf;
    localStorage.setItem("globalCurrentReadingBook", globalCurrentReadingBook);
    console.log("OPEN PDF WITH LINK : " + booksResponse["highly_rated"][0]["book_pdf"]);


    var options = {
        title: 'Trident',
        documentView : {
            closeLabel : false
        },
        navigationView : {
            closeLabel : false
        },
        email : {
            enabled : false
        },
        print : {
            enabled : false
        },
        openWith : {
            enabled : false
        },
        bookmarks : {
            enabled : true
        },
        search : {
            enabled : true
        },
        autoClose: {
            onPause : false
        }
    }

    var linkHandlers = [
                {
                    pattern: "www", // string representation of a plain regexp (no flags)
                    close: true, // shall the document be closed, after the link handler was executed?
                    handler: function (link) {} // link handler to be executed when the user clicks on a link matching the pattern
                },
                {
                    pattern: '^\/',
                    close: false,
                    handler: function (link) {
                        console.log('link clicked: ' + link);
                    }
                }
        ];
    cordova.plugins.SitewaertsDocumentViewer.viewDocument(globalCurrentReadingBook, 'application/pdf', options, onShow, onClose, onMissingApp, onError, linkHandlers);


}

function error(message){
    console.log("error: reason is " + message);
}


function startReadingBook(x){

  book_id = x.getAttribute("data-book_id");

  console.log("startReadingBook book_id : " + book_id);

  //var url_real = CONFIG + "/pdfs/rate_book.php";

       var loginData = {
          "myid" : my_user_sys_id,
          "mypass" : my_e_password,
          "book_id" : book_id
      };  

      console.log(loginData);
      app.dialog.preloader('Fetching book...');

      var url_real = CONFIG + "/inc/get_book_pdf_to_read.php";

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
              app.dialog.close();
              console.log(response);
              if(response.trim() == ""){

                    showToast("Something went awry");

              } else {

                  var booksResponse = JSON.parse(response);
                  console.log(booksResponse);

                  showToast(booksResponse["highly_rated"][0]["status_message"]);

                  if(booksResponse["highly_rated"][0]["status"] == "success"){

                      download_link = booksResponse["highly_rated"][0]["book_pdf"];
                      Downloader.download(download_link, success, error);

                      app.dialog.alert("Trident is preparing book. Your book will open when ready. This might take a couple of minutes depending on book size and internet connection speed", "Alert");

                  } else if(booksResponse["highly_rated"][0]["status"] == "error"){

                      if(booksResponse["highly_rated"][0]["type"] == "1"){

                        cedis_price = booksResponse["highly_rated"][0]["slydepay_cedis"];
                        dollars_price = booksResponse["highly_rated"][0]["slydepay_dollars"];

                        document.getElementById("book_buybtn_popup_booklist").style.display = "none";
                        document.getElementById("real_buy_book_btn").style.display = "";
                        document.getElementById("real_buy_book_btn").setAttribute("data-charge_cedis", cedis_price);
                        document.getElementById("real_buy_book_btn").innerHTML = "BUY BOOK - [ GHc " + cedis_price + " ] OR  [ USD " + dollars_price + " ]";
                        document.getElementById("reset_slydepay").setAttribute("data-charge_cedis", cedis_price);

                      }

                  } else {

                    showToast("Something went awry");

                  }


              }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
                app.dialog.close();

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
          }
        });


}


function onPossible(){
  
  showToast('document can be shown');
  //e.g. track document usage
}

function onMissingApp(appId, installer){

  showToast("onMissingApp");

    if(confirm("Do you want to install the free PDF Viewer App "
            + appId + " for Android?")){
        installer();
    }
}

function onImpossible(){

  showToast("document cannot be shown");
  //e.g. track document usage
}

function onError(error){
  
  showToast(error + "Sorry! Cannot show document.");

}

function onShow(){
  
  showToast('document shown');
  //e.g. track document usage
}

function onClose(){
  showToast('document closed');
  //e.g. remove temp files
}


function rateBook(rate_number, just_ui) {

    for (var i = 5; i > 0; i--) {

        this_icon_id_ios = "rate_star_" + i.toString()  +  "_ios";
        this_icon_id_android = "rate_star_" + i.toString()  +  "_android";


        if(document.getElementById(this_icon_id_ios) != null){
          console.log("this_icon_id_android : " + this_icon_id_ios);
          document.getElementById(this_icon_id_ios).innerHTML = "star";
        }

        if(document.getElementById(this_icon_id_android) != null){
          console.log("this_icon_id_ios : " + this_icon_id_android);
          document.getElementById(this_icon_id_android).innerHTML = "star_border";
        }

    }


  if(rate_number !=  "" && parseInt(rate_number) > 0){

    for (var i = parseInt(rate_number); i > 0; i--) {

        this_icon_id_ios = "rate_star_" + i.toString()  +  "_ios";
        this_icon_id_android = "rate_star_" + i.toString()  +  "_android";


        if(document.getElementById(this_icon_id_ios) != null){
          console.log("this_icon_id_android : " + this_icon_id_ios);
          document.getElementById(this_icon_id_ios).innerHTML = "star_fill";
        }

        if(document.getElementById(this_icon_id_android) != null){
          console.log("this_icon_id_ios : " + this_icon_id_android);
          document.getElementById(this_icon_id_android).innerHTML = "star_border_fill";
        }

    }

    document.getElementById("rate_text").innerHTML = "You rated this book with " + rate_number + " stars";


  } else {

    if(just_ui != "yes"){
      showToast("Something went awry. Try again");
    }
    return;

  }

  if(just_ui != "yes"){

       //alert("Validating...");
       var url_real = CONFIG + "/inc/rate_book.php";
         var loginData = {
            "myid" : my_user_sys_id,
            "mypass" : my_e_password,
            "rate" : rate_number,
            "book_id" : globalBookIdOrScoopSku
        };  
  console.log(loginData);
  app.dialog.preloader('Applying rating...');

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
              app.dialog.close();
              console.log(response);
              if(response.trim() == ""){
                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
              } else {

                  var booksResponse = JSON.parse(response);
                  console.log(booksResponse);
                  document.getElementById("book_ratings").innerHTML = "Ratings : " + booksResponse["highly_rated"][0]["new_rate"] + " by " + booksResponse["highly_rated"][0]["raters"] + " users";
                  document.getElementById('book_ratings').style.display = "";

              }

          },

          error: function(XMLHttpRequest, textStatus, errorThrown) {
                app.dialog.close();

                var this_message = "Something went awry";
                var toastError = app.toast.create({
                  text: this_message,
                  closeTimeout: 2000,
                });
                toastError.open();
          }
        });
    }

}


function buyBook(x){

  var book_id = x.getAttribute("data-book_id");
  
  startReadingBook(x);

/*
  if(current_book_price == "FREE"){


  } else {



    console.log("GOING TO BUY PDF");

  }
*/

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
            text: 'You must select a picture for the scoop',
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

      toastalert = "Scoop is still updating";
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
              app.preloader.hide();
              console.log(response);
              if(response.trim() == ""){
                app.dialog.alert("Something went awry. Complete all fields and try again", "Error");
              } else {
                app.dialog.alert(response, "Alert");
              }
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
            app.preloader.hide();
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

                        $('#blogs_holder_booklist').append($('<li onclick="getBlogInfo(' + sku + ');"><a href="/blog/" class="item-link item-content"><div class="item-media"><img src="' + blog_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + title + '</div></div><div class="item-subtitle">' + full_name + '</div><div class="item-text">' + blog_story + '</div><div class="item-text" style=" font-weight:600;">Tags: science, Culture</div><div class=""></div></div></a></li>'));
                    }


                  } else {

                      app.dialog.alert("No blogs found", "Hey");
                      
                  }

             }

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
              */
              app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

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

function copyUrl(type){

    if(type == "scoop"){
      text = "http://tridentglobal.com/ref.php?bid=" + globalBookIdOrScoopSku;
    } else {
      text = "http://tridentglobal.com/ref.php?bsku=" + globalBookIdOrScoopSku;
    }
    var this_message = "Copied";
    showToast("Sharable Link Copied.");
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        this_message = "Copied";
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            this_message = "Copied";
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            //console.warn("Copy to clipboard failed.", ex);
            this_message = "Copy to clipboard failed";
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }

}

function getBlogInfo(sku) {


      setTimeout(function () {
        resetPage("blog");
      }, 2000);

     if(sku == null || sku == ""){

        app.dialog.alert("Something went awry. Try restarting app and try again", "Error");

     } else if(sku != ""){
        globalBookIdOrScoopSku = sku;
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
            app.preloader.hide();
            console.log(response);
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("Scoop was not found", "Hey");

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
                        var comments_num = blogsResponse["blogs"][0]["comments_num"];

                        if(writer_id == my_user_sys_id){

    document.getElementById('id_holder').style.display = "none";

                        } else {

    document.getElementById('id_holder').style.display = "";

                        }
    document.getElementById('writer_name_blog').innerHTML = full_name;
    document.getElementById('writer_name_blog').setAttribute("data-systemid", writer_id);
    x = document.getElementById('id_holder');
    x.setAttribute("data-id", writer_id);
    document.getElementById('title_blog').innerHTML = title;
    document.getElementById('comments_num_holder').innerHTML = comments_num + " comments";
    document.getElementById('story_blog').innerHTML = blog_story;
    document.getElementById('tags_holder').innerHTML = tags;
    document.getElementById("cover_art_blog_in_page").style.backgroundImage = "url('" + blog_cover_art + "')";


                  } else {

                      app.dialog.alert("No scoop was found", "Hey");
                      
                  }

             }

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
              */
              app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

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

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      //.replace(/"/g, "&quot;")
      //.replace(/'/g, "&#039;");
}

function postComment(){

    console.log("POST COMMENT STARTED");

    var this_comment = document.getElementById("comment_input_blog").value;
    var this_newsid = globalBookIdOrScoopSku;

    if(this_comment.trim() != ""){

    document.getElementById("comment_input_blog").value = "";  
    var news_type = this_comment;
    //news_type = escapeHtml(news_type);

    var news_maker_full_name = escapeHtml(my_full_name);
    var news_maker_pro_pic = my_profile_pic;

      $('#comments_holder').append($('<div class="message message-received"><div class="message-avatar" style="background-image:url(' + my_profile_pic + '); opacity: 1;"></div><div class="message-content"><div class="message-name" style="display: block;">' + news_maker_full_name + '</div><div class="message-bubble"><div class="message-text">' + news_type + '</div></div></div></div><br>'));
      
      var url_real = CONFIG + '/inc/post_comment.php';

       var loginData = {
          myid : my_user_sys_id,
          mypass : my_e_password,
          blog_sku : this_newsid,
          comment : this_comment
      };          
          console.log(loginData);

      app.request({
        type: "POST",
        url: url_real,
        data: loginData,
        success: function(response){
          console.log(response);

          },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showToast("Network Error");
        }
      });

    } else {

       showToast('You should at least say something');

    }  



}


function getComments() {
          setTimeout(function () {
          resetPage("comment");
        }, 1000);

  current_page = 'blog_in_page';

      console.log("getComments started");

        var url_real = CONFIG + "/inc/get_comments.php";
         var loginData = {
            myid : my_user_sys_id,
            mypass : my_e_password,
            fetch_id_or_sku : globalBookIdOrScoopSku,
            fetch_type : "blog"
        };  

      app.preloader.show();

        app.request({
          url: url_real,
          type: "POST",
          data: loginData,
          success: function(response){
            console.log(response);
            app.preloader.hide();

            setTimeout(function () {
             if(response.trim() == ""){

                      showToast("Something went awry");

             } else {

                  var blogsResponse = JSON.parse(response);
                  var total_books_num = Object.keys(blogsResponse["highly_rated"]).length;


                  if(total_books_num > 0){

                  document.getElementById("comments_holder").innerHTML = "";

                    for(i = 0; i < total_books_num; i++){

                        var commentor_id = blogsResponse["highly_rated"][i]["commentor_id"];
                        var full_name = blogsResponse["highly_rated"][i]["full_name"];
                        var profile_pic = blogsResponse["highly_rated"][i]["profile_pic"];
                        var comment = blogsResponse["highly_rated"][i]["comment"];

                        $('#comments_holder').append($('<div class="message message-received"><div class="message-avatar" style="background-image:url(' + profile_pic + '); opacity: 1;"></div><div class="message-content"><div class="message-name" style="display: block;">' + full_name + '</div><div class="message-bubble"><div class="message-text">' + comment + '</div></div></div></div><br>'));
                    }


                  } else {

                      showToast("No comments yet");
                      
                  }

             }

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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

          }
        });

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
            app.preloader.hide();
            setTimeout(function () {
             if(response.trim() == ""){

                      app.dialog.alert("No books to show", "Hey");

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

                      app.dialog.alert("No books to show", "Hey");
                      
                  }

             }

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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

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

                        $('#bloglist_holder_lib').append($('<li onclick="getBlogInfo(' + sku + ');"><a href="/blog/" class="item-link item-content"><div class="item-media"><img src="' + blog_cover_art + '" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + title + '</div></div><div class="item-subtitle">' + full_name + '</div><div class="item-text">' + blog_story + '</div><div class="item-text" style=" font-weight:600;">Tag: Science , culture</div></div></a></li>'));
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
              */
                app.preloader.hide();
              app.dialog.alert("Something went awry. Try again", "Network Error");

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



setInterval(function () {
  
  updateprofileInfo();

}, 60000);
