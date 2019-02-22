(function($){

	function setTransmit(s) {
		$('#contact-form button').attr('disabled', !s);
	}

	function setButtonWait() {
		var btn = $('#contact-form button');
		btn.empty();
		btn.append('<i class="fa fa-cog fa-spin"></i> Wait...');
	}

	function setButtonSubmit() {
		var btn = $('#contact-form button');
		btn.empty();
		btn.append('<i class="fa fa-send icon-before"></i> Transmis');
	}

	function setButtonError() {
		var btn = $('#contact-form button');
		btn.empty();
		btn.append('<i class="fa fa-exclamation-triangle icon-before"></i> Error');
	}

	window.addEventListener('load', function()
	{
		if(window.ga && ga.create)
		{
			console.log('Google Analytics is loaded');
		}
		else
		{
			console.log('Google Analytics is not loaded');
		}

		if(window.google_tag_manager)
		{
			console.log('Google Tag Manager is loaded');
		}
		else
		{
			console.log('Google Tag Manager is not loaded');
		}
	}, false);

	$(document).ready(function() {
		var enable = false;
		var submit = true;

		setTransmit(false);

		$('input[name="choice"]:checked').prop('checked', false);
		$('input[name="choice"]').on("click",function(){
			var radioValue = $("input[name='choice']:checked").val();
			console.log("Radio change to : " + radioValue);
			if (enable && !submit) {
				setTransmit(true);
			}
		});

		Cookies.set('cookie', 'yes');
		if(Cookies.get('cookie') === 'yes') {
			enable = true;
		} else {
			setTransmit(false);
			setButtonError();
			window.dataLayer.push({
				'event': 'nocookie'
			});
		}

		var val = Cookies.get('token');
		if(typeof val == 'undefined') {
			if(enable == true) {
				submit = false;
			}
		} else {
			setButtonSubmit();
			window.dataLayer.push({
				'event': 'alreadydone',
				'value': val
			});
		};

		$('#submit').on('click', function(event) {
			event.preventDefault(); // To prevent following the link (optional)
			var radioValue = $("input[name='choice']:checked").val();

			var timeIntervalFadeOut = 1500;

			submit = true;
			setTransmit(false);

			setButtonWait();
			setInterval(function () {
				setButtonSubmit();
			}, timeIntervalFadeOut);

			window.dataLayer.push({
				'event': 'survey',
				'value': radioValue
			});
			Cookies.set('token', 'yes');
		});

	});

})(jQuery);
