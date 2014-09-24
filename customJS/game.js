	var img_1, img_2;
	var category = 1;
	
	function update_pair(data, status){
	  var JSONobj = JSON.parse(data);
	  
	  if(JSONobj.userid){
		  $("#userid").html(JSONobj.userid);
		  
		  if(JSONobj.temp == 1){
			 $(".dropdown").hide();
			 $("#tryagainbtn").hide();
		  	 $("#registerbtn").show();
			 $("#registerbtn2").show();
		  } else {
 			 $(".dropdown").show();
 			 $("#tryagainbtn").show();
		  	 $("#registerbtn").hide();
			 $("#registerbtn2").hide();
		  }
	  }
	  
	  if(JSONobj.previous_image_index){
		  if(JSONobj.previous_image_number == "9999"){
		  	  $("#progress" + JSONobj.previous_image_index).attr("src", "webImage/yuck.jpg");
		  } else{
		  	  $("#progress" + JSONobj.previous_image_index).attr("src", "FoodPicDatabase/"+JSONobj.previous_image_number+".jpg");
		  }
	  }
	  
	  if(JSONobj.first){
		  $("#picture_1").attr("src", "FoodPicDatabase/"+JSONobj.first+".jpg");
		  $("#picture_2").attr("src", "FoodPicDatabase/"+JSONobj.second+".jpg");
		  
		  $("#name_1").css("color", "#000000");
		  $("#name_1").css("font-weight", "normal");
		  $("#name_2").css("color", "#000000");
		  $("#name_2").css("font-weight", "normal");
		  
		  $("#name_1").text(JSONobj.description_1);
		  $("#name_2").text(JSONobj.description_2);
		  img_1 = JSONobj.first;
		  img_2 = JSONobj.second;
	  }
	  
	  if(JSONobj.calories_percentage){
			generatePlot(JSONobj.calories_percentage);
			generatePlot_bar(JSONobj.food_name, JSONobj.calories.map(Number));
			generatePlot_bar_exercise(JSONobj.food_name, JSONobj.calories_exercise);
			overlayActivate();
			$("#totalCaloriesValue").html(JSONobj.total_calories);
	  }
	}
	
	function clear_progress(){
		
		var i;
		for(i = 1; i <= 10; i ++){
			$("#progress" + i).attr("src", "webImage/empty.jpg");
		}
	}
	
	function get_datetime(){
		var dayObject = new Date();
		
		return dayObject.getFullYear() + "-" +
		dayObject.getMonth() + "-" +
		dayObject.getDate() + " " +
		dayObject.getHours() + ":" +
		dayObject.getMinutes() + ":" +
		dayObject.getSeconds();
	}
	
	function clear_nav(){
		$("#breakfast").attr("class", "");
		$("#lunch").attr("class", "");
		$("#snack").attr("class", "");
	}
	
	function check_logout(data, status){
		if(data == "success"){
			window.location.href = "index.html";
		}
	}
	
	$(document).ready(function(){
			$.post("img_query.php", update_pair);
			
			$("#logout").click(function(){
				$.post("logout.php", check_logout);
			});
			
			$("#picture_1").mousedown(function(){
				$("#name_1").css("color", "#6ADE2F");
  				$("#name_1").css("font-weight", "bold");
				$("#name_1").text("Yum!");
			});
			
			$("#picture_1").click(function(){
				$.post("img_query.php", {
					"choice":"1",
					"img_1":img_1,
					"img_2":img_2,
					"category": category,
					"time":get_datetime()
				}, update_pair);
				
			});
			
			$("#picture_2").mousedown(function(){
				$("#name_2").css("color", "#6ADE2F");
				$("#name_2").css("font-weight", "bold");
				$("#name_2").text("Yum!");
			});
			
			$("#picture_2").click(function(){
				$("#name_2").css("color", "#6ADE2F");
				$("#name_2").text("Yum!");
				$.post("img_query.php", {
					"choice":"2",
					"img_1":img_1,
					"img_2":img_2,
					"category": category,
					"time":get_datetime()
				}, update_pair);
			});
			
			$(".yuck").click(function(){
				$.post("img_query.php", {
					"choice":"3",
					"img_1":img_1,
					"img_2":img_2,
					"category": category,
					"time":get_datetime()
				}, update_pair);
			});
			
			$("#breakfast").click(function(){
				clear_nav();
				clear_progress();
				$("#breakfast").attr("class", "active");
				if(category != 1){
					category = 1;
					$.post("img_query.php", {
						"category": category
					},update_pair);
				}
			});
			
			$("#lunch").click(function(){
				clear_nav();
				clear_progress();
				$("#lunch").attr("class", "active");
				
				if(category != 2){
					category = 2;
					$.post("img_query.php", {
					"category": category
				},update_pair);}
				
			});
			
			$("#snack").click(function(){
				clear_nav();
				clear_progress();
				$("#snack").attr("class", "active");
				
				if(category != 3){
					category = 3;
					$.post("img_query.php", {
						"category": category
					},update_pair);
				}
				
			});
	});