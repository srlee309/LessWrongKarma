define(["jquery", "highcharts"],function($, highcharts) {
    var that = {};
    var chart = null;
    var defaultSubTitle = "Click the slices to drill down further";
    var drilldownSubTitle = null;
    that.addGraph = function(id, commentsStats, discussionPostStats, mainPostStats, totalsStats) {
        chart = new highcharts.Chart({
            chart: {
                renderTo : id,
                type: 'pie',
                events: {
                    drilldown: function(e) {
                        chart.setTitle(null, { text: drilldownSubTitle });
                    },
                    drillup: function(e) {
                        chart.setTitle(null, { text: defaultSubTitle });
                    }
                }
            },
            title: {
                text: null,
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: defaultSubTitle
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y}%'
                    }
                }
            },
            tooltip: {
                snap: 0,
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '{point.name} Score: {point.score} which is <b>{point.y}%</b> of total<br/>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total Score',
                colorByPoint: true,
                data: [{
                    name: 'Positive',
                    color: "rgb(34, 139, 34)",
                    y: totalsStats.percentPositive,
                    score: totalsStats.positiveScore,
                    drilldown: 'Positive'
                }, {
                    name: 'Negative',
                    color: "rgb(178, 34, 34)",
                    y: totalsStats.percentNegative,
                    score: totalsStats.negativeScore,
                    drilldown: 'Negative'
                }]
            }],
            drilldown: {
                series: [{
                    name: 'Positive',
                    id: 'Positive',
                    data: [
                        {
                            name: 'Comment', 
                            y: totalsStats.commentPercentPositive, 
                            color: 'rgba(64, 64, 64, 0.5)', 
                            score: commentsStats.positiveTotalScore
                        },
                        {
                            name: 'Discussion Post', 
                            y: totalsStats.discussionPostPercentPositive, 
                            color: 'rgba(109, 189, 214, 0.5)' , 
                            score: discussionPostStats.positiveTotalScore},
                        {
                            name: 'Main Post', 
                            y: totalsStats.mainPostPercentPositive, 
                            color: 'rgba(183, 20, 39, 0.5)' , 
                            score: mainPostStats.positiveTotalScore
                        }
                    ]
                }, {
                    name: 'Negative',
                    id: 'Negative',
                    data: [
                        {
                            name: 'Comment', 
                            y: totalsStats.commentPercentNegative, 
                            color: 'rgba(64, 64, 64, 0.5)', 
                            score: commentsStats.negativeTotalScore
                        },
                        {
                            name: 'Discussion Post', 
                            y: totalsStats.discussionPostPercentNegative, 
                            color: 'rgba(109, 189, 214, 0.5)', 
                            score: discussionPostStats.negativeTotalScore
                        },
                        {
                            name: 'Main Post', 
                            y: totalsStats.mainPostPercentNegative, 
                            color: 'rgba(183, 20, 39, 0.5)', 
                            score: mainPostStats.negativeTotalScore
                        }
                    ]
                }]
            }
        });
    };
    return that;
});