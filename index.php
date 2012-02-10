<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title>jPlayer - Single Page Web App - Demo</title>
		<link type="text/css" rel="stylesheet" href="skin/jplayer.blue.monday.css" />
		<link type="text/css" rel="stylesheet" href="general.css" />

		<meta name="apple-mobile-web-app-capable" content="yes">
		<link rel="stylesheet" media="only screen and (max-device-width: 1024px)" href="ipad.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="add2home.css">

		<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />


 
		<!--[if lte IE 7]>
		<link type="text/css" rel="stylesheet" href="ie-lte7.css" />
		<![endif]--> 
		
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js" ></script>  
		<script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
		<script type="text/javascript" src="js/jquery.ba-hashchange.js"></script>
		<script type="text/javascript" src="js/myaudio.js"></script>
		<script type="text/javascript" src="js/add2home.js"></script>		
		
		
        <script type="text/javascript"> 
		$(function() 
		{			  
			// Inspired by @rem's jQuery Tabs http://jqueryfordesigners.com/jquery-tabs/ 
			
			$("#player-panel").show();
			
			if (location.hash.length == 0) location.hash = '#first';  
			
			// Making the tabPage ID different to the hash to prevent jumping to those elements
			// Name your tabPage's xxxxTab
			
			var tabPostFix = 'Tab';
			
			$(window).bind('hashchange', function(){ 
				var hash = location.hash;
				if (hash.length > 0)
				{
					var idx = $('.tabPage').index($(".tabPage:"+hash+tabPostFix));
					var thisTab = $('.tab:eq('+idx+')');   
					$('.tabPage').hide().filter(':eq('+idx+')').show();
					$('.tab').removeClass('selected');   
					thisTab.addClass('selected');
				}  
			}); 
			
			// Load Tabbed Navigation

			$('#secondTab').load('second.htm',function()
			{
				$('#thirdTab').load('third.htm',function()
				{
				   // trigger pagesloaded event  
				   $('body').trigger('pagesloaded'); 
				});  
			}); 
				
 
		    $(window).trigger('hashchange');
				
			$('.tab').bind('click',function(){  
				var idx = $('.tab').index(this);
				location.hash = $('.tabPage:eq('+idx+')').attr('id').replace(tabPostFix,'');   
				return false;
			});         

		}); 
        </script>
</head>
<body class="default">

<div id="page">
<div id="header">
<a href="http://happyworm.com/jquery/jplayer"><img src="graphics/jplayer_logo.gif" alt="jplayer" /></a><h1>Single Page Web App Demo</h1>
</div>
<?$tab=1; include 'body.php' ?>

<div id="player-panel" style="display:none">
	<h2>...and create a playlist			
		<div id="clearPlayList" style="display:none"><a href="#">clear</a></div>
		<div id="shufflePlayList" style="display:none"><a href="#">shuffle</a></div>
	</h2>	

	<div id="jquery_jplayer"></div> 
	
	<!-- inline player for sampling and adding tracks --> 
	<div id="jquery_jplayer_inline"></div>

	<div class="jp-playlist-player">
		<div class="jp-interface">
			<ul class="jp-controls">
				<li><a href="#" id="jplayer_play" class="jp-play" tabindex="1">play</a></li>
				<li><a href="#" id="jplayer_pause" class="jp-pause" tabindex="1">pause</a></li>
				<li><a href="#" id="jplayer_stop" class="jp-stop" tabindex="1">stop</a></li>
				<li><a href="#" id="jplayer_volume_min" class="jp-volume-min" tabindex="1">min volume</a></li>
				<li><a href="#" id="jplayer_volume_max" class="jp-volume-max" tabindex="1">max volume</a></li>
				<li><a href="#" id="jplayer_previous" class="jp-previous" tabindex="1">previous</a></li>
				<li><a href="#" id="jplayer_next" class="jp-next" tabindex="1">next</a></li>
			</ul>
			<div class="jp-progress">
				<div id="jplayer_load_bar" class="jp-load-bar">
					<div id="jplayer_play_bar" class="jp-play-bar"></div>
				</div>
			</div>
			<div id="jplayer_volume_bar" class="jp-volume-bar">
				<div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
			</div>
			<div id="jplayer_play_time" class="jp-play-time"></div>
			<div id="jplayer_total_time" class="jp-total-time"></div>
		</div>
		<div id="jplayer_playlist" class="jp-playlist">
		</div>
		<div id="noTracks">No Tracks Selected</div>
	</div>
</div>	
</div>

<div id="footer">
<p>
This demo and <a href="http://www.happyworm.com/jquery/jplayer/" title="jPlayer">jPlayer</a> are projects by <a href="http://www.happyworm.com" title="happyworm">happyworm</a>
concept by <a href="http://www.twitter.com/maboa" title="Mark Boas">Mark Boas</a>
built by <a href="http://www.twitter.com/thepag" title="Mark Panaghiston">Mark Panaghiston</a> and <a href="http://www.twitter.com/maboa" title="Mark Boas">Mark Boas</a>
design by <a href="http://www.twitter.com/aulentina" title="Silvia Benvenuti">Silvia Benvenuti</a></p>

</div>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-3557377-3");
pageTracker._trackPageview();
} catch(err) {}</script>

</body>
</html>