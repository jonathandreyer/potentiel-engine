(function($){

	$(document).ready(function() {

		$('#submit').on('click', function(event) {
		  event.preventDefault(); // To prevent following the link (optional)
			var radioValue = $("input[name='choice']:checked").val();
			ga('send', {
			  hitType: 'event',
			  eventCategory: 'Submit'
			});
		});

	});

})(jQuery);
