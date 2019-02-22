(function($){

	function setButtonEnableDisable(s) {
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
	function create_UUID(){
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	setButtonEnableDisable(false);
	$('input[name="choice"]:checked').prop('checked', false);

	window.addEventListener('load', function() {
		var cookie = false;
		var okToSubmit = false;
		var submitted = true;

		if(window.google_tag_manager) {
			okToSubmit = true;

			Cookies.set('cookie', 'yes');
			if(Cookies.get('cookie') === 'yes') {
				cookie = true;
			} else {
				setButtonEnableDisable(false);
				setButtonError();
				window.dataLayer.push({
					'event': 'nocookie'
				});
			}

			var token = Cookies.get('token');
			if(typeof token == 'undefined') {
				if(cookie == true) {
					submitted = false;
				}
			} else {
				setButtonSubmit();
				window.dataLayer.push({
					'event': 'alreadydone',
					'value': token
				});
			}

			$('input[name="choice"]').on("click",function(){
				var radioValue = $("input[name='choice']:checked").val();
				if (cookie && okToSubmit && !submitted) {
					setButtonEnableDisable(true);
				}
			});

			$('#submit').on('click', function(event) {
				event.preventDefault(); // To prevent following the link (optional)
				var radioValue = $("input[name='choice']:checked").val();
				var timeInterval = 1500;

				submitted = true;
				setButtonEnableDisable(false);

				setButtonWait();
				setInterval(function () {
					setButtonSubmit();
				}, timeInterval);

				window.dataLayer.push({
					'event': 'survey',
					'value': radioValue
				});
				var id = create_UUID();
				Cookies.set('token', id);
			});
		}
	}, false);

})(jQuery);
