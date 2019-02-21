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

		Cookies.set('test', 'yes');
		if(Cookies.get('test') === 'yes') {
			enable = true;
		} else {
			setTransmit(false);
		}

		var val = Cookies.get('submit');
		if(typeof val == 'undefined') {
			if(enable == true) {
				submit = false;
			}
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
			Cookies.set('submit', 'yes');
		});

	});

})(jQuery);
