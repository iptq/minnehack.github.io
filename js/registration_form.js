$(function() {
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
                  $("#success").html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#success > .alert-success')
                    .append("<strong>Registration successful! </strong>");
                  $('#success > .alert-success')
                    .append('</div>');

                  // Clear all fields
                  $('#contactForm').trigger("reset");
                } else {
                  // Fail message
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#success > .alert-danger').append("<strong>Registration failed. Try again in a minute, contact us if error persists.");
                  $('#success > .alert-danger').append('</div>');
                }
              }

            var registrationDB = new Firebase("https://minnehack-register.firebaseio.com");


            registrationDB.push(input, firebase_callback);
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
$('#name').focus(function() {
    $('#success').html('');
});
