function overlayActivate(){
	
	if(~$(".overlay").hasClass("open")){
		$(".overlay").addClass("open");
	}
	
}

function overlayDismiss(){
	
	if($(".overlay").hasClass("open")){
		$(".overlay").removeClass("open");
	}
	
}

function generatePlot(pie_data) {
    $('#calories').highcharts({
        chart: {
			backgroundColor:"rgba(104,204,232,0)",
            plotBackgroundColor: "rgba(104,204,232,0)",
            plotBorderWidth: null,
            plotShadow: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
		title:{
		        text:''
		},
		subTitle:{
		        text:''
		},
        plotOptions: {
			pie: {
			    allowPointSelect: true,
			    cursor: 'pointer',
			    dataLabels: {
			         enabled: false
			    },
			    showInLegend: true
			}
        },
        series: [{
            type: 'pie',
            name: 'Calories Distribution',
            data: pie_data
        }]
    });
}

function generatePlot_bar(cater, calor) {
    $('#calories_d').highcharts({
        chart: {
            type: 'bar',
			backgroundColor:"rgba(104,204,232,0)",
            plotBackgroundColor: "rgba(104,204,232,0)"
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: cater,
            title: {
                text: null
            },
			gridLineColor: "#fff",
			lineColor: "#fff",
			tickColor: "#fff"
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cal',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
			gridLineColor: "#fff",
			lineColor: "#fff",
			tickColor: "#fff"
        },
        tooltip: {
            valueSuffix: ' Cal'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
				color: "#2CF270"
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Food Calories',
            data: calor
        }]
    });
}

function generatePlot_bar_exercise(cater, exercise) {
    $('#calories_e').highcharts({
        chart: {
            type: 'bar',
			backgroundColor: "rgba(104,204,232,0)",
            plotBackgroundColor: "rgba(104,204,232,0)"
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: cater,
            title: {
                text: null
            },
			gridLineColor: "#fff",
			lineColor: "#fff",
			tickColor: "#fff"
        },
        yAxis: {
            min: 0,
            title: {
                text: 'miles',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
			gridLineColor: "#fff",
			lineColor: "#fff",
			tickColor: "#fff"
        },
        tooltip: {
            valueSuffix: ' miles'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
				color: "#ED9D13"
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Equivalent Running distance',
            data: exercise
        }]
    });
}