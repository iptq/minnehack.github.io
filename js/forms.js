$(function() {
    // Do bootstrap validation for the registration field
    $("#registrationForm").find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            
            var name =       $("#registrationForm").find("#name").val();
            var school =     $("#registrationForm").find("#school").val();
            var email =      $("#registrationForm").find("#email").val();
            var phone =      $("#registrationForm").find("#phone").val();
            var teamname =   $("#registrationForm").find("#teamname").val();
            var message =    $("#registrationForm").find("#message").val();
            var requests =   $("#registrationForm").find("#requests").val();
            var tshirt =     $("#registrationForm").find("#tshirt").val();

            var input = { name: name,
                          school: school,
                          email: email,
                          phone: phone,
                          teamname: teamname,
                          message: message,
                          transport: false,
                          requests: requests,
                          tshirt: tshirt}

//            for (field in input) {
//              // Filter out empty, non-required fields
//              if (input.hasOwnProperty(field) &&
//                  !input[field]) {
//                delete input[field];
//              }
//            }

            console.log("Registering...");
            console.log(input);

            var firebase_callback =
              function(arg) {
                if (arg == null) {
                  // Show positive result
                  $("#registration-status").html("<div class='alert alert-success'>");
                  $('#registration-status > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#registration-status > .alert-success')
                    .append("<strong>Registration successful! </strong>");
                  $('#registration-status > .alert-success')
                    .append('</div>');

                  console.log("Clearing it?");

                  // Clear all fields
                  $('#registrationForm').trigger("reset");
                } else {
                  // Fail message
                  $('#registration-status').html("<div class='alert alert-danger'>");
                  $('#registration-status > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#registration-status > .alert-danger').append("<strong>Registration failed. Try again in a minute, contact us if error persists.");
                  $('#registration-status > .alert-danger').append('</div>');
                }
              }

            var registrationDB = new Firebase("https://minnehack-register.firebaseio.com");


            registrationDB.push(input, firebase_callback);
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("#contactForm").find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var email = $("#contactForm").find("#contact-email").val();
            var subject = $("#contactForm").find("#contact-subject").val();
            if(subject.length === 0) {
                subject = "Minnehack (" + email + ")";
            }
            var message = $("#contactForm").find("#contact-text").val();

            console.log("Sending email...");

            $.ajax({
                url: "https://formspree.io/acm@umn.edu",
                type: "POST",
                crossDomain: true,
                dataType: "json",
                data: {
                    'body': message,
                    '_replyTo': email,
                    '_subject': subject,
                },
                cache: false,
                success: function() {
                    $('#contact-status').html(`
                        <div class="alert alert-success">
                          <strong>Thanks, your message has been sent!</strong>
                          <button type="button" class="close" data-dismiss="alert"
                                  aria-hidden="true">
                            &times;
                          </button>
                        </div>
                        `);
                    /*
                    $('#contact-status').html("<div class='alert alert-success'>");
                    $('#contact-status > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-status > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#contact-status > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                    */
                },
                error: function() {
                    // Fail message
                    $('#contact-status').html(`
                        <div class="alert alert-danger">
                          <strong>
                            Sorry, your message failed to send.
                            Please try again later.
                          </strong>
                          <button type="button" class="close" data-dismiss="alert"
                                  aria-hidden="true">
                            &times;
                          </button>
                        </div>
                        `);
                    /*
                    $('#contact-status').html("<div class='alert alert-danger'>");
                    $('#contact-status > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-status > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our mail server is not responding. Please try again later!");
                    $('#contact-status > .alert-danger').append('</div>');
                    */
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#registrationForm input#name').focus(function() {
    $('#registration-status').html('');
});

$('#contactForm input#name').focus(function() {
    $('#contact-status').html('');
});
