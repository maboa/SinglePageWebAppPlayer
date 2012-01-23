<?
// $tab is set in the file that includes this
if ($tab == null) $tab = 0;
$tabSelect = array(1=>"",2=>"",3=>"");                 
$tabSelect[$tab] = "selected";

?>

<div class="tabs">

    <ul class="tabNavigation">
<h2>choose songs</h2>
        <li><a class="tab <?=$tabSelect["1"]?>" id ="tab1" href=".">Miaow</a></li>
        <li><a class="tab <?=$tabSelect["2"]?>" id ="tab2" href="second.php">Rio Mezzanino</a></li>
        <li><a class="tab <?=$tabSelect["3"]?>" id ="tab3" href="third.php">The Stark Palace</a></li>
    </ul> 
	
    <div class ="tabPage" id="firstTab" <? if ($tab != 1) : ?>style="display:none"<? endif ?>>
	<? if ($tab == 0 || $tab == 1) : ?> 
    	<? include 'first.htm' ?> 
	<? endif ?>
    </div>
	
    <div class ="tabPage" id="secondTab" <? if ($tab != 2) : ?>style="display:none"<? endif ?>>
	<? if ($tab == 0 || $tab == 2) : ?> 
    	<? include 'second.htm' ?>
	<? endif ?> 
    </div>
	
    <div class ="tabPage" id="thirdTab" <? if ($tab != 3) : ?>style="display:none"<? endif ?>>
	<? if ($tab == 0 || $tab == 3) : ?>
    	<? include 'third.htm' ?>
	<? endif ?>
    </div>  
</div>
