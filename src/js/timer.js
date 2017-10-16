(function($){
	var setupTimer = function(element,options){
		this.element = $(element);
		this.options = $.extend({},setupTimer.defaults,options);
		this.deadline = new Date(options.deadlineTimer);
		this.setUpOptions = options;

		this.init();

	}
	setupTimer.defaults = {
		deadlineTimer:null,
		daysColorBg:'#CC0000',
		hoursColorBg:'#CC0000',
		minutesColorBg:'#CC0000',
		secondColorBg:'#CC0000'
	}
	function updateTimer(deadline){
		var timer = deadline - new Date();
		return {
			'days':Math.floor(timer/(1000*60*60*24)),
			'hours':Math.floor((timer/(100*60*60)) % 24),
			'minutes':Math.floor((timer/1000/60) % 60),
			'seconds':Math.floor((timer/1000) %60),
			'total':timer
		}
	}
	setupTimer.prototype.init = function(){
		$initOverlay = $('<div/>').appendTo(this.element);
		$initOverlay.attr('class','clock-wrapper');
		$initOverlayWrapper = $('<div/>').appendTo(this.element);
		$initOverlayWrapper.attr('class','units-wrapper');
		$initOverlayWrapper.html('<span>Days</span><span>Hours</span><span>Minutes</span><span>Seconds</span>');



		$styleInject = $('<style/>').appendTo('body');
		$styleInject.attr('type','text/css');
		$styleInject.html('.clock-wrapper span{float: left;text-align: center;font-size: 5rem;margin: 0 2.5%;color: white;padding: 50px;width: 20%;border-radius: 25%;box-sizing: border-box;}'
							+ '.units-wrapper span{float: left; width: 25%;text-align: center;margin-top: 50px;color: #ddd;text-transform: uppercase;font-size: 1rem;letter-spacing: 2px;}'
							+ 'span.turn{animation: turn 0.7s ease forwards;}@keyframes turn{ 0%{transform: rotateX(0deg);}100%{transform: rotateX(360deg);}}'
							+ '.timer-layout-days{background-color:'+this.setUpOptions.daysColorBg+' !important;}.timer-layout-hours{background-color:'+this.setUpOptions.hoursColorBg+' !important;}.timer-layout-minute{background-color:'+this.setUpOptions.minutesColorBg+'  !important;}.timer-layout-seconds{background-color:'+this.setUpOptions.secondColorBg+' !important;}');

		this.startTimer();

	}
	setupTimer.prototype.startTimer = function(){
		var deadline = this.deadline;
		var timerInterval = setInterval(function(){
				var clockWrapper = $('.clock-wrapper');
				var timeUpdate = updateTimer(deadline);
				
				clockWrapper.html('<span class="timer-layout-days">' + timeUpdate.days + '</span>'
								+ '<span class="timer-layout-hours">' + timeUpdate.hours + '</span>'
								+ '<span class="timer-layout-minute">' + timeUpdate.minutes + '</span>'
								+ '<span class="timer-layout-seconds">' + timeUpdate.seconds + '</span>')

				animateTimer('.timer-layout-seconds');

				if(timeUpdate.seconds == 59)animateTimer('.timer-layout-minute');
				if(timeUpdate.minutes == 59 && timeUpdate.seconds == 59) animateTimer('.timer-layout-hours')
				if(timeUpdate.hours == 59 && timeUpdate.minute == 59 && timeUpdate.seconds == 59) animateTimer('.timer-layout-seconds');

				if(timeUpdate.total < 1){
					clearInterval(timerInterval);
					clockWrapper.html('<span class="timer-layout-days">0</span><span class="timer-layout-hours">0</span><span class="timer-layout-minute">0</span><span class="timer-layout-seconds">0</span>');
				}

	 	},1000);
	}

	function animateTimer(element){
		$(element).addClass('turn');
		setTimeout(function(){
			$(element).removeClass('turn');	
		},700)
	}

	$.fn.countDown = function(setup){
		return this.each(function(){
			var $this = $(this);
			var wrapper = $this.data('countDown');
			var defaultSetup  = typeof(setup) === 'object' ? setup : {};
			var methodSetup = typeof(setup) === 'string' ? setup : null;
		
			$this.data('countDown',wrapper = new setupTimer(this,setup));
			
		})
	}
}(jQuery))


