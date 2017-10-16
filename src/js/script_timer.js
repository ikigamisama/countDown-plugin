$(document).ready(function(){
	$('#clockTimer').countDown({
		deadlineTimer:'Decoember 25, 2017 12:00:00',
		daysColorBg:'#ff4444',
		hoursColorBg:'#ffbb33',
		minutesColorBg:'#00C851',
		secondColorBg:'#33b5e5'
	});

	$('#close_modal').click(function(){
		$('.modal').css({'display':'none'})
	})
})
