let currentSurveyStep = 0;
function takeSurveyFun(){
	// Reset radio selections
	$('#surveyForm')[0].reset();
	$('.question-step').hide().first().show();
	$("#prevSurveyBtn").css({"visibility":"hidden"})
	currentSurveyStep = 0;
	$("#modalSurvey").modal("show");
}
document.addEventListener("DOMContentLoaded", () => {
  const $form = $("#surveyForm");
  const $steps = $(".question-step");
  const $prevBtn = $("#prevSurveyBtn");
  const $nextBtn = $("#nextSurveyBtn");
  const $submitBtn = $("#submitSurveyBtn");

  
  const totalSurveySteps = $steps.length;

  // Initialize BootstrapValidator only for the final step inputs
  
  function showStep(index) {
	  $steps.hide().eq(index).show();
	  $prevBtn.css('visibility', index > 0 ? 'visible' : 'hidden');

	  // restore active state for radio buttons in this step
	  $steps.eq(index).find('input[type="radio"]').each(function () {
		const $radio = $(this);
		const $label = $radio.closest('label');
		if ($radio.is(':checked')) {
		  $label.addClass('active');
		} else {
		  $label.removeClass('active');
		}
	  });

	  if (index < totalSurveySteps - 1) {
		$nextBtn.show();
		$submitBtn.hide();
		const isChecked = $steps.eq(index).find(`input[name="q_answer[${index+1}]"]:checked`).length > 0;
		$nextBtn.prop('disabled', !isChecked);
	  } else {
		$nextBtn.hide();
		$submitBtn.show();
		const $inputs = $steps.eq(index).find("input[required]");
		const allFilled = Array.from($inputs).every(input => input.value.trim() !== "");
		$submitBtn.prop('disabled', !allFilled);
	  }
	}


  // Radio button change handler for survey steps
  $form.on("change", '.question-step input[type="radio"]', function () {
    if (currentSurveyStep < totalSurveySteps - 1) {
      const isChecked = $steps.eq(currentSurveyStep).find(`input[name="q_answer[${currentSurveyStep+1}]"]:checked`).length > 0;
      $nextBtn.prop('disabled', !isChecked);
    }
  });

  // Final step input handler (name/email)
  $form.on("input", '.question-step:last-child input[required]', function () {
    const $inputs = $steps.eq(currentSurveyStep).find("input[required]");
    const allFilled = Array.from($inputs).every(input => input.value.trim() !== "");
    $submitBtn.prop('disabled', !allFilled);
  });

  $nextBtn.on("click", function () {
    if (currentSurveyStep < totalSurveySteps - 1) {
      currentSurveyStep++;
      showStep(currentSurveyStep);
    }
  });

  $prevBtn.on("click", function () {
    if (currentSurveyStep > 0) {
      currentSurveyStep--;
      showStep(currentSurveyStep);
    }
  });



		$form.bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
			
				name: {
					message: 'Name is not valid',
					validators: {
						notEmpty: {
							message: 'Name is required and cannot be empty'
						},
						stringLength: {
							min: 3,
							max: 30,
							message: 'Name must be more than 3 and less than 30 characters long'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'Email is required and cannot be empty'
						},
						regexp: {
							// Simple regex for basic email validation
							regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Please enter a valid email address'
						}
					}
				},
				 mobile: {
					validators: {
						notEmpty: {
							message: 'Mobile number is required and cannot be empty '
						},
						stringLength: {
							min: 10,
							max: 10,
							message: 'Mobile number must be 10 characters long '
						},
						regexp: {
							regexp: /^[0-9]+$/,
							message: 'Mobile number can only consist of numbers '
						}
					}
				}
			}
		}).on('success.form.bv', function(e) {
	var form = $form;
	form.submit(function(event){
		

    console.log(new FormData(this))
	
	var valuesToSubmit = $(this).serializeArray();  // jQuery array of {name, value}
	var input = {};
	valuesToSubmit.forEach(function(item) {
		input[item.name] = item.value;
	});
	
	page_url=window.location.href;
	pathname = new URL(page_url).pathname;   // "/hippocampus-academy/"
	page_name = pathname.split("/").filter(Boolean).pop(); // "hippocampus-academy"
	if (typeof page_name === "undefined") {
		page_name="index";
	}
	
	desktop_mobile="";
	if (document.body.offsetWidth < 768) {
		desktop_mobile="mobile";
	}
	else{
		desktop_mobile="desktop";
	}
	// Transform logic
	const output = {
	  data: {
		name: input.name,
		email: input.email,
		mobile: input.mobile,
		comments: input.comments,
		page_name: page_name,
		page_url: page_url,
		desktop_mobile: desktop_mobile,
		formname: 'HAD Survey',
		answers: []
	  }
	};
	
	// Collect answers using bracket keys
	let i = 1;
	while (input[`q_question[${i}]`] && input[`q_answer[${i}]`]) {
	  output.data.answers.push({
		question: input[`q_question[${i}]`],
		answer: input[`q_answer[${i}]`]
	  });
	  i++;
	}

	dataObj=output;
	console.log(dataObj); // key–value pairs


	event.preventDefault();
	var valuesToSubmit = $(this).serialize();
	$.ajax({
	//url:"http://localhost/eon-elevator-action/contact-action.php",
	url:"https://axonlabs.ai/hlc-strapi/api/survey-submissions",
	type: "POST",      				// Type of request to be send, called as method
	data:  JSON.stringify(dataObj),	// Data sent to server, a set of key/value pairs representing form fields and values 
	contentType: "application/json",       		// The content type used when sending data to the server. Default is: "application/x-www-form-urlencoded"
	cache: false,					// To unable request pages to be cached
	processData:false,  			// To send DOMDocument or non processed data file it is set to false (i.e. data should not be in the form of string)
	beforeSend:function(){
		document.getElementById("submitSurveyBtn").innerHTML='Processing &nbsp;<i class="spinner-border spinner-border-sm"></i>';
	}
	}).done(function(response){
		
				 document.getElementById("submitSurveyBtn").innerHTML="Submit";
				
				
		//alert(data)
		
				if (response.data && Object.keys(response.data).length > 0) {
					Swal.fire({
					
			title: '',
			html: 'Thanks for submitting the details!',
			icon: 'success',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'OK'
		}).then((result) => {
			location.reload();
		});
				
				}
				else{
					swal({
							title:"Error", 
							text:"An Unexpected Error has occurred, Please try again", 
							type: "error",
							allowOutsideClick: false
						}).then(function () {
							return false;

						});
				}
				
				 
				
			 });
	});
	});


  showStep(currentSurveyStep);
});
