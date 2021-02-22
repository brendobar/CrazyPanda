$( document ).ready(function() {

	
	var color, background = false;

	$('#color, #background').click(function () {
	   	if (this.id == 'color') {
	      	background = false;
			color = true;
	   	}
	   	else if (this.id == 'background') {
	      	color = false;
			background = true;
	   	}
	});
	
	function changeColor(shade, ui){
		var obj = (color)?"#text":".textBlock";
		var objStyle = (color)?"color":"background-color";
		var textColor = $(obj).css(objStyle);
	    textColor = textColor.substring(4, textColor.length-1).replace(/ /g, '').split(',');
	    textColor[shade] = ui.value.toString();
		console.log(textColor);
	    var newColor = "rgb(" + textColor[0] + ", " + textColor[1] + ", " + textColor[2] + ")";
	    $(obj).css(objStyle, newColor);		
	}

    var red = $( "#red" ).slider({
	    min: 0,
	    max: 255,
	    value: 0,
	    range: "min",
	    animate: "fast",
	    slide : function(event, ui) {   
	        changeColor(0, ui);
	    }
	});

    var green = $( "#green" ).slider({
	    min: 0,
	    max: 255,
	    value: 0,
	    range: "min",
	    animate: "fast",
	    slide : function(event, ui) {    
	        changeColor(1, ui);
	    }
	});

    var blue = $( "#blue" ).slider({
	    min: 0,
	    max: 255,
	    value: 0,
	    range: "min",
	    animate: "fast",
	    slide : function(event, ui) {    
	         changeColor(2, ui);
	    }
	});


 
});