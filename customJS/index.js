var stateNum = 0;

$(document).ready(function(){
	$("#controlText").click(function(){
		if (stateNum == 0){
		document.getElementById("controlText").innerHTML = "Register Here";
		stateNum = 1;
		$(".register").slideUp();
		$(".signin").slideDown();
	} else {
		document.getElementById("controlText").innerHTML = "Sign in Here";
		stateNum = 0;
		$(".signin").slideUp();
		$(".register").slideDown();
	}
	});
	
	$("#registerbtn").click(function(){
		$("#controlText").hide();
		$("#loading").show();
	    $.post("register.php", {
	    	"email": $(".register #email").val(),
			"pwd": $(".register #pwd").val(),
			"pwdconfirm": $(".register #pwdconfirm").val()
	    }, function(data, status){
			if(data == "success"){
				window.location.href = "game.html";
			}else{
				$("#loading").hide();
				$("#controlText").show();
				alert(data);
			}
	    });
	});
	
	$("#signinbtn").click(function(){
		$("#controlText").hide();
		$("#loading").show();
	    $.post("login.php", {
	    	"email": $(".signin #email").val(),
			"pwd": $(".signin #pwd").val()
	    }, function(data, status){
			if(data == "success"){
				window.location.href = "game.html";
			}else{
				$("#loading").hide();
				$("#controlText").show();
				alert(data);
			}
	    });
	});
	
});