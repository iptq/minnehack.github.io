$(function() {
    $("#contactForm").find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var email = $("#contactForm").find("#contact-email").val();
            var subject = $("#contactForm").find("#contact-subject").val();
            if(subject.length === 0) {
                subject = "[MinneHack] " + email;
            } else {
                subject = "[MinneHack] " + subject;
            }
            var message = $("#contactForm").find("#contact-text").val();

            console.log("Sending email...");

            $('#contact-status').html('<div class="progress-anim"></div>');

            $.ajax({
                url: "https://formspree.io/acm@umn.edu",
                method: "POST",
                crossDomain: true,
                dataType: "json",
                data: {
                    'body': message,
                    '_replyto': email,
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
                    // clear form fields
                    $('#contactForm').trigger("reset");
                },
                error: function(xhr, error, exception) {
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

$(function() {
    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    
    // Submit and validate registration form.
    $("#registration-form").find("input,textarea,select")
                           .not("[type=submit]")
                           .jqBootstrapValidation({
        submitSuccess: function($form, event) {
            event.preventDefault();

            console.log("Attempting to register for MinneHack.");

            $("#registration-status").html(`
              <div class="progress-anim"></div>
            `);

            var name = $("#registration-name").val();
            var pname = $("#registration-pname").val();
            var email = $("#registration-email").val();
            var resumeFiles = $("#registration-resume").prop("files");
            var school = $("#registration-school").val();
            if(school === "Other") {
                school = $("#registration-school-other").val();
            }

            var data = {
                'name': name,
                'pname': pname,
                'email': email,
                'school': school
            };

            function submit(data) {
                console.log("Registering...");
                
                $.ajax({
                    // This URL is to a Google Script-deployed application
                    // owned by the ACM UMN Google account.
                    url: "https://script.google.com/macros/s/AKfycbxZcAtkxTtsrb6zEzajUTydK2szeexlS35cLemj4bSPNx0JPTM/exec",
                    method: "POST",
                    data: data,
                    dataType: "json",
                    success: function() {
                        $('#registration-status').html(`
                          <div class="alert alert-success">
                            <strong>
                              You're registered for MinneHack!
                              We'll send you a reminder when the event gets closer.
                            </strong>
                            <button type="button" class="close" data-dismiss="alert"
                                    aria-hidden="true">
                              &times;
                            </button>
                          </div>
                        `);
                    // clear form fields
                    $('#registration-form').trigger("reset");
                    },
                    error: function() {
                       $('#registration-status').html(`
                         <div class="alert alert-danger">
                           <strong>
                             Sorry, your registration failed.
                             Please try again later.
                           </strong>
                           <button type="button" class="close" data-dismiss="alert"
                                   aria-hidden="true">
                             &times;
                           </button>
                         </div>
                       `);
                    }
                });
            }

            if(resumeFiles.length > 0) {
                console.log("Trying to submit with resume...");
                var file = resumeFiles[0];
                var dot = file.name.lastIndexOf('.');
                var extension = "";
                if(dot !== -1) {
                    extension = file.name.substring(dot);
                }

                data["resume-extension"] = extension;

                console.log(data);
                
                var filereader = new FileReader();
                filereader.onload = function() {
                    console.log("Finished reading file.");
                    data.resume = _arrayBufferToBase64(filereader.result);
                    submit(data);
                }

                filereader.readAsArrayBuffer(file);
            } else {
                submit(data);
            }
        },
        
        filter: function() {
            return $(this).is(":visible");
        },
    });
});

function resumeValidation($input, value, callback) {
    callback({
        value: value,
        valid: $input.prop("files")[0].size < 2 * 1024 * 1024,
        message: "File must be less than 2MB.",
    });
}

$(function() {
    // Hide/show the School (Other) field based on School selection.
    var school = $("#registration-school");
    var schoolOther = $("#registration-school-other");

    schoolOther.parent().hide();

    school.change(function(event) {
        if(school.val() === "Other") {
            schoolOther.parent().show();
            schoolOther.prop("required", true);
        } else {
            schoolOther.parent().hide();
            schoolOther.prop("required", false);
        }
    });
});

/*When clicking on Full hide fail/success boxes */
$('#registrationForm input#name').focus(function() {
    $('#registration-status').html('');
});

$('#contactForm input#name').focus(function() {
    $('#contact-status').html('');
});
