$(function() {
    // Do bootstrap validation for the registration field
    $("#registrationForm input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            
            var name =     $("#registrationForm input#name").val();
            var school =   $("#registrationForm input#school").val();
            var email =    $("#registrationForm input#email").val();
            var phone =    $("#registrationForm input#phone").val();
            var teamname = $("#registrationForm input#teamname").val();
            var message =  $("#registrationForm textarea#message").val();

            var input = { name: name,
                          school: school,
                          email: email,
                          phone: phone,
                          teamname: teamname,
                          message: message }

            for (field in input) {
              // Filter out empty, non-required fields
              if (input.hasOwnProperty(field) &&
                  !input[field]) {
                delete input[field];
              }
            }

            console.log("Registering...");
            console.log(input);
            if (true) {
              return;
            }

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

                  // Clear all fields
                  $('#contactForm').trigger("reset");
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

    $("#contactForm input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name =     $("#contactForm input#name").val();
            var email =    $("#contactForm input#email").val();
            var message =  $("#contactForm textarea#message").val();

            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            console.log("Sending email..." + message);
            return;

            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#contact-status').html("<div class='alert alert-success'>");
                    $('#contact-status > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-status > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#contact-status > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#contact-status').html("<div class='alert alert-danger'>");
                    $('#contact-status > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-status > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our mail server is not responding. Please try again later!");
                    $('#contact-status > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
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
