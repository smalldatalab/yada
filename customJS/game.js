	var img_1, img_2;
	var category = 1;
	
	function update_pair(data, status){
	  var JSONobj = JSON.parse(data);
	  $("#picture_1").attr("src", "FoodPicDatabase/"+JSONobj.first+".jpg");
	  $("#picture_2").attr("src", "FoodPicDatabase/"+JSONobj.second+".jpg");
	  $("#name_1").text(JSONobj.description_1);
	  $("#name_2").text(JSONobj.description_2);
	  img_1 = JSONobj.first;
	  img_2 = JSONobj.second;
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
	
	
	$(document).ready(function(){
			$.post("img_query.php", update_pair);
			
			$("#picture_1").click(function(){
				$.post("img_query.php", {
					"choice":"1",
					"img_1":img_1,
					"img_2":img_2,
					"category": category,
					"time":get_datetime()
				}, update_pair);
			});
			
			$("#picture_2").click(function(){
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
				$("#lunch").attr("class", "active");
				
				if(category != 2){
					category = 2;
					$.post("img_query.php", {
					"category": category
				},update_pair);}
				
			});
			
			$("#snack").click(function(){
				clear_nav();
				$("#snack").attr("class", "active");
				
				if(category != 3){
					category = 3;
					$.post("img_query.php", {
						"category": category
					},update_pair);
				}
				
			});
	});