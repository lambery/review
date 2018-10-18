$(function () {

    barCharts();
    pieCharts();

});

//echarts引用模板
//柱状图
var barCharts=function () {

    var data=[
        {name:'一月',value:100},
        {name:'二月',value:400},
        {name:'三月',value:300},
        {name:'四月',value:250},
        {name:'五月',value:350}

    ];
    var xdata=[], sdata=[];
    data.forEach(function (item,i) {
        xdata.push(item.name);
        sdata.push(item.value);
    });

    var box=document.querySelector('.picTable:first-child');
    var myChart=echarts.init(box);

    var options={
        title:{
            text:'2017年注册人数'
        },
        legend:{
            data:['注册人数']
        },
        color: ['#FF4500'],
        tooltip : {

        },
        xAxis : [
            {
                type : 'category',
                data : xdata
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'注册人数',
                type:'bar',
                barWidth: '60%',
                data: sdata
            }
        ]
    };

    myChart.setOption(options);
};


//饼状图
var pieCharts=function () {

    var box=document.querySelector('.picTable:last-child');
    var myChart=echarts.init(box);

    var options={
        title : {
            text: '热门销售品牌',
            subtext: '2017年10月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            //series.name=a  data.name=b  data.value=b
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','阿迪','安踏','回力']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'回力'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(options);
};
