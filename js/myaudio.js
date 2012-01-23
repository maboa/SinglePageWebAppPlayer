$(document).ready(function(){    
	
    // TODO - search for TODO in this page
	          
	// Preload images
	var imgstopreload = ["skin/jplayer.blue.monday.jpg","skin/jplayer.blue.monday.extra.jpg"];
	
	// Add album covers ?
	
	for (x in imgstopreload){ (new Image).src = imgstopreload[x]; }
 
	var playItem = 0;  

	var inlinePlaying = false;
	var mainPlaying = false;   
    
	var playListSize = 0;    
	
	var hideButtons = true;   
	var hoverSupport = false;
	                             
	// TODO 
	// make this an object not an associative array?

	
	var myTrackList = [];       
	
	// Make sure all tabbed content ('pages') are loaded before doing the following
	
	$('body').bind('pagesloaded', function() 
	{   
		// Load Track Info  
		
		$('.track').each(function()
		{
			var self = $(this);  

			// some convention over configuration here. Your conventions may vary  
			var trackUrlMp3 = self.find('.play').attr('href');  
			var trackUrlOgg = trackUrlMp3.replace('/mp3/','/ogg/').replace('.mp3','.ogg'); 
			myTrackList[self.attr('id')] = {name: self.find('.title').text(), mp3: trackUrlMp3, ogg: trackUrlOgg};     
		});     
		
		// hide buttons if mouseover supported          

		$('body').live("mouseover mouseout", function(event)
		{
			if (hideButtons)
			{
				// mouseover gets triggered by click on iOS - check that event target it is not an href
				if (event.target.toString().indexOf('http://') < 0)     
				{			
					$(".actions").hide();
					$(this).removeClass("default").addClass("hover");
					hoverSupport = true; 
				} 
				hideButtons = false;
			}    
		}); 

		// display buttons on hover  

		$(".track").live("mouseover mouseout", function(event) {
			var self = $(this);  
			if (hoverSupport) 
			{
				if (event.type == 'mouseover') {
					self.find(".actions").show();
				} else {
					self.find(".actions").hide();
				}  
			}
		});		
	});
	                
 
	var mainVol = 80; // Default volume and global reference 

	// Local copy of jQuery selectors, for performance.
	var jpPlayTime = $("#jplayer_play_time");
	var jpTotalTime = $("#jplayer_total_time");
	
	var mainPlayer = $("#jquery_jplayer");
	var inlinePlayer = $("#jquery_jplayer_inline");
 
	mainPlayer.jPlayer({
		oggSupport: true
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
		jpPlayTime.text($.jPlayer.convertTime(playedTime));
		jpTotalTime.text($.jPlayer.convertTime(totalTime));
	})
	.jPlayer("onSoundComplete", function() {
		playListNext();
	});
	
	// Second instance of jPlayer for 'in page listening'
	
	inlinePlayer.jPlayer({
		oggSupport: true,
		customCssIds: true
	})
	.jPlayer("onSoundComplete", function() {
		mainPlayer.jPlayer("play");
		// Change stop to play  
		$(".stop").hide();
		$(".play").show();
		$(".track").removeClass("selected"); 
		inlinePlaying = false;  
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) { 
	 	$(".current").find(".played").text($.jPlayer.convertTime(playedTime));
	});
 

	function updatePlayList( trackId ) {    
		var artist = $('#'+trackId).parents('.tabPage').find('.artist').text();
		$("#jplayer_playlist ul").append('<li><a class="playlist-item" href="#">'+ artist + ' - ' + myTrackList[trackId].name +'</a></li>');
		$("#jplayer_playlist ul li:last").hide().slideDown();
		$("#jplayer_playlist ul li:last a").attr("href",trackId);  
	}  
	
	
	$("#jplayer_playlist ul li a").live("click", function(){
		var index = $(this).parent().index();   
		if (playItem != index) {
			playListChange( index );
		} else {
			$("#jquery_jplayer").jPlayer("play");
		}
		return false;
	});

 
	function playListInit( autoplay ) {
		if(autoplay) {
			playListChange( playItem );
		} else {
			playListConfig( playItem );
		}
	}
 
	function playListConfig( index ) {
		$(".jplayer_playlist_current").removeClass("jplayer_playlist_current");
		$("#jplayer_playlist ul li:nth-child("+(index+1)+")").addClass("jplayer_playlist_current").children().addClass("jplayer_playlist_current");
		
		// We want to set the track only when the forward / back audio control is clicked  
		// or when the first track is added to the play list.   
		
		if ((playListSize > 0 && playItem != index) || (playListSize ==  1))
		{
			playItem = index;
			var trackId = $(".jplayer_playlist_current a").attr("href"); 
			mainPlayer.jPlayer("setFile", myTrackList[trackId].mp3, myTrackList[trackId].ogg);
			mainVol = mainPlayer.jPlayer("getData", "volume"); 
		}
	}  
	
	function stopInlinePlayVisuals() {
		$(".track").removeClass("current");
		$(".played").text(""); 
		$(".stop").hide();
		$(".play").show();
		if (inlinePlaying && playListSize > 0)
		{
			inlinePlayer.jPlayer("pause");
			inlinePlaying = false;          
		}  
		$(".track").removeClass("selected");       
	}
 
	function playListChange( index ) {
		playListConfig( index );
		stopInlinePlayVisuals();
		mainPlayer.jPlayer("play");
	}
 
	function playListNext() {
		var index = (playItem+1 < playListSize) ? playItem+1 : 0;
		stopInlinePlayVisuals();
		playListChange( index );
		return false;
	}
 
	function playListPrev() {
		var index = (playItem-1 >= 0) ? playItem-1 : playListSize-1;
		stopInlinePlayVisuals()
		playListChange( index );
		return false;
	}    
 
	$("#jplayer_play").click( function()
	{
		mainPlaying = true;
		stopInlinePlayVisuals();
	});
	
	$("#jplayer_stop, #jplayer_pause").click( mainPlaying = false );
	
	$("#jplayer_load_bar, #jplayer_play_bar").click( stopInlinePlayVisuals );

	$("#jplayer_previous").click( playListPrev );
 	$("#jplayer_next").click( playListNext );

	function shuffle(array) {
		return array.sort(function(){ 
			return .5 - Math.random(); 
		});
	}
	
	$("#shufflePlayList").click(function() { 

		$("#jplayer_playlist ul").slideUp(function()
		{
			$(this).html(shuffle($("#jplayer_playlist ul li"))).slideDown(function()
			{
				playItem = $('.jplayer_playlist_current').index();
			}); 
		});    
		
		return false;   
	});	
          
	function addTrackToPlayList( trackId ) {

		if (playListSize == 0)
		{
			$("#jplayer_playlist").html("<ul></ul>");
		}
		  
		$("#noTracks").fadeOut(function()
		{
  			$("#clearPlayList").fadeIn();
  			$("#shufflePlayList").fadeIn();  
		});
		      
		playListSize++;
		updatePlayList( trackId );
		playListConfig(playItem);        
	}
	 
	// Inline player
	
	$(".play").live("click", function() {   
		var self = $(this);  
		
		// TODO change this
		var holder = self.parents("li");
		var trackId = holder.attr("id");
		
		stopInlinePlayVisuals();
		
		$(".track").removeClass("current");
		holder.addClass("current"); 
		
		if (inlinePlaying)
		{
			inlinePlayer.jPlayer("pause");       
		}
		else
		{
			mainVol = mainPlayer.jPlayer("getData","volume"); 
			mainPlayer.jPlayer("pause");
		}   
		       
		inlinePlayer.jPlayer("setFile", myTrackList[trackId].mp3, myTrackList[trackId].ogg).jPlayer("play");
		 
		$(".track").removeClass("selected");   

		self.hide();
		$("#"+trackId).find(".stop").show();      
		$("#"+trackId).addClass("selected");     
		inlinePlaying = true;
		return false;
	});
	
	$(".stop").live("click", function() { 
        var self = $(this);    
		
		inlinePlayer.jPlayer("pause");
		 
		if (mainPlaying)
		{  
			mainPlayer.jPlayer("play"); 
		}
		  
		stopInlinePlayVisuals();

		inlinePlaying = false;
		return false;
	});
	
	$(".add").live("click", function() { 
		addTrackToPlayList($(this).parents('li').attr("id"));  
		return false;
	}); 
	
	function clearPlayList() {
		$("#jplayer_playlist ul").slideUp(function()
		{ 
			$(this).empty().show();
		});                
		
		mainPlayer.jPlayer("pause").jPlayer("clearFile");		
	}
	
	$("#clearPlayList").click(function() { 
		clearPlayList();
		$("#shufflePlayList").fadeOut(); 
		$("#clearPlayList").fadeOut(function()
		{
  			$("#noTracks").fadeIn();  
		});    
		return false;
	});
	          
});