'use strict';

angular.module('app')
	.controller('planaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout,$compile) {
		
		$scope.zq = 1;
		$scope.set_zq = function(n){
			$scope.zq = n;
		}

         
      	$scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false
          }

         // 周期
       var zq = {
            "85":1, //日计划
            "86":2, //周计划
            "87":3, //月计划
            "88":4, //季计划
            "89":5, //年计划
            "90":6 //自定义计划
       }
       $scope.get_type = function(key){
        
            var success = function(result){
                // console.log(result);
                 $scope.periodType = result.data.list.reverse();

                 
                 if (!$state.params.id) {
                    $scope.record.periodType.id = $scope.periodType[0].id + ""; //添加时默认选择第一项
                 }else{
                    $scope.zq = zq[$scope.record.periodType.id]; //相应的周期选择div显示

                    
                    $scope.select_checked();  //选中select选项

                 }
                 


                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":key},success,error);
       }  



       //重新编译endTime input
       $scope.compile_endTime = function(){
            angular.element('.endTime_lay').html("<input id=\"cycle-day-date\" type=\"text\" class=\"form-control endTime\" placeholder=\"截止日期\"  value=\"\" date-picker datefmt='yyyy-MM-dd' min-date=\""+$scope.record.beginTimeStr+"\" ng-model=\"record.endTimeStr\">");
            
            var scope = angular.element($('.endTime_lay')[0]).scope();
            var link = $compile($('.endTime_lay')[0]);

            link(scope);
       }


		$scope.init=function(id){
            var success = function(result){
                $scope.record = result.data;
                $scope.record.beginTimeStr = $scope.record.beginTime.split(" ")[0];
                $scope.record.endTimeStr = $scope.record.endTime.split(" ")[0];    

                delete $scope.record.beginTime;
                delete $scope.record.endTime;        

                var temp = $scope.record.beginTimeStr;
                $scope.$watch("record.beginTimeStr",function(){
           
                        if($scope.record.beginTimeStr==""){
                            return false;
                        }

                        (temp != $scope.record.beginTimeStr) && ($scope.record.endTimeStr = "");

                        $scope.compile_endTime();    
                       
               })

        //选择时段
                $scope.get_type("plan_period");

                $scope.$apply();  
            }
            var error = function(result){
            	 toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


            API.post("/oa/plan/read/detail",{"id":id},success,error);

        }

        if($state.params.id){
            $scope.title = "修改计划";
            $scope.init($state.params.id);

            


        }else{
            $scope.title = "添加计划";
            $scope.get_type("plan_period");
            $scope.record={
                "periodType":{},
                "oaPlanType":{},
                "beginTimeStr":"",
                "endTimeStr":"",
                "reviewUser":{},
                // "status":{
                //     "id":''
                // }
            }

             $scope.$watch("record.beginTimeStr",function(){
           
                    if($scope.record.beginTimeStr==""){
                        return false;
                    }

                    $scope.record.endTimeStr = "";

                    $scope.compile_endTime();
           })

            
        }





         // 状态判断
        $scope.set_status = function(){
            $scope.record.status.id='91';

            if($scope.record.reviewUser){
                if ($scope.record.reviewUser.id!=undefined){
                    $scope.record.status.id='92';
                }   
            }
        }

        function toDate(str) {
            if(str.length==10&&str.indexOf("-")>0){
                var yy = str.substring(0,4);
                var mm = str.substring(5,7);
                var dd = str.substring(8,10);
                var date = new Date("2000-0-1");
                date.setFullYear(yy);
                date.setMonth(mm-1);
                date.setDate(dd);
                date.setHours(1);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            }
            return false;
        }

        $scope.submit1 = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.plan.planlist');
                },1000);	
	   		}
	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}


            delete $scope.record.createTime;
            delete $scope.record.updateTime;


            console.log($scope.record);

            if($scope.record.endTimeStr!="" &&　$scope.record.beginTimeStr==""){
                $scope.record.beginTimeStr = $scope.record.endTimeStr;
            }



            // var b = toDate($scope.record.beginTime);
            // var e = toDate($scope.record.endTime);
            // var b = new Date($scope.record.beginTime);
            // var e = new Date($scope.record.endTime);



            // $scope.record.beginTime = b;
            // $scope.record.endTime = e;

            ($scope.record.presideUser　!= null) && ($scope.record.presideUser.school = null);
            ($scope.record.reviewUser != null) && ($scope.record.reviewUser.school = null);

            recordFormat.format($scope.record,".");
            



            for (var i in $scope.record) {
                if($scope.record[i]==null){
                    delete $scope.record[i];
                }
            }

            console.log($scope.record);
            



            if($state.params.id){
                API.post('/oa/plan/update',$scope.record,success,error);

            }else{


               API.post('/oa/plan/add',$scope.record,success,error);
             

            }

	   }



       $scope.select_g = function(t){

            var f = function(obj){
                var t = "";
                for (var i = 0; i < obj.length; i++) {
                    if($scope.record.beginTimeStr==obj[i][2] && $scope.record.endTimeStr == obj[i][3]){
                        t =i;
                        break;
                    }
                }

                return t + "";
            }

            switch(t){
                case "week":
                    var obj = JSON.parse(JSON.stringify($scope.week));
                    $scope.s_week = f(obj);
                    break;
                break;
                case "month":
                    var obj = JSON.parse(JSON.stringify($scope.month));
                    $scope.s_month = f(obj);
                    break;
                break;
                case "quarter":
                    var obj = JSON.parse(JSON.stringify($scope.quarter));
                    $scope.s_quarter = f(obj);
                    break;
                break;
                case "year":
                    var obj = JSON.parse(JSON.stringify($scope.year));
                    $scope.s_year = f(obj);
                    break;
                break;

            }

       }



       $scope.select_checked = function(){
            console.log($scope.record.periodType.id);
            switch ($scope.record.periodType.id){
                        case 86:
                            $scope.select_g("week");
                        break;
                        case 87:
                            $scope.select_g("month");
                        break;
                        case 88:
                            $scope.select_g("quarter");
                        break;
                        case 89:
                            $scope.select_g('year');
                        break;
            } 
       }

      

       $scope.create_week = function(){

            var w= moment().format('d');
            var s = 1-w;
            var e = 7-w;
            var s_week = moment().add(s,'days').format('YYYY-MM-DD');  //当前周的周一
            var e_week = moment().add(e,'days').format('YYYY-MM-DD');  //当前周的周末
            var week = moment().weeks();
            var year = moment().year();
            
            var temp = [
                    [year,week,s_week,e_week]
            ];

            for (var i = 0; i < 5; i++) {
                
                var l = temp.length;
                var week = temp[i][1]+1;
                var s_week = moment().add(7+7*i+s,'days').format('YYYY-MM-DD');
                //alert(s_week);
                var e_week = moment().add(7+7+7*i+s-1,'days').format('YYYY-MM-DD');
                var year = moment().year();
                temp[l] = [year,week,s_week,e_week];

            };
            
            console.log(temp);
            $scope.week = temp;
        };
        $scope.create_week();

     


       $scope.create_month = function(){
            var year = moment().year();
            var month = moment().format("MM");

            var startDay = moment().startOf('month').format("YYYY-MM-DD");
            var endDay = moment().endOf('month').format("YYYY-MM-DD");
            

            var months= [
                    [year,month,startDay,endDay]
            ];


            
            for (var i = 0; i < 5; i++) {

                var l = months.length;

                var year = moment(months[i][3]).add(1,'months').format("Y");
                var month = moment(months[i][3]).add(1,'months').format("MM");

                var startDay = moment(months[i][3]).add(1,'months').startOf('month').format("YYYY-MM-DD");
                var endDay = moment(months[i][3]).add(1,'months').endOf('month').format("YYYY-MM-DD");
                months[l] = [year,month,startDay,endDay];
           
            }


              
        $scope.month=months;
       
       }
       $scope.create_month();

       $scope.create_quarter = function(){
            var year = moment().year();
            var quarter = moment().quarter();

            var startDay = moment().startOf('quarter').format("YYYY-MM-DD");
            var endDay = moment().endOf('quarter').format("YYYY-MM-DD");

            var quarters= [
                    [year,quarter,startDay,endDay]
            ];
            
            
            
            
            

            for (var i = 0; i < 4; i++) {

                var l = quarters.length;

                var year = moment(quarters[i][3]).add(1,'quarter').format("Y");
                var quarter = moment(quarters[i][3]).add(1,'quarter').format("Q");

                var startDay = moment(quarters[i][3]).add(1,'quarter').startOf('quarter').format("YYYY-MM-DD");
                var endDay = moment(quarters[i][3]).add(1,'quarter').endOf('quarter').format("YYYY-MM-DD");
           
                    quarters[l] = [year,quarter,startDay,endDay];
                
                
                
                

             }
             $scope.quarter = quarters;
             // console.log(quarters);
       }
        $scope.create_quarter();

        $scope.create_year = function(){
            var startDay = moment().startOf('year').format("YYYY-MM-DD");
            var endDay = moment().endOf('year').format("YYYY-MM-DD");       
            var year = moment().year();
            var years=[
            [year,0,startDay,endDay]
            ];
            
           
            for (var i = 0; i < 4; i++) {
                var l = years.length;
                var year = moment(years[i][2]).add(1,'year').format("Y");
                var startDay = moment(years[i][2]).add(1,'year').startOf('year').format("YYYY-MM-DD");
                var endDay = moment(years[i][2]).add(1,'year').endOf('year').format("YYYY-MM-DD");
                years[l] = [year,0,startDay,endDay];

            }

            // console.log(endDay);
            
            $scope.year = years;
            console.log($scope.year)
       }
        $scope.create_year();


        $scope.s_week = "";
        $scope.$watch('s_week',function(){
            if($scope.s_week==""){
                return;
            }

            $scope.record.beginTimeStr = $scope.week[$scope.s_week][2];
            $scope.record.endTimeStr = $scope.week[$scope.s_week][3];
        });

        $scope.s_month = "";
        $scope.$watch('s_month',function(){
            if($scope.s_month==""){
                return;
            }

            $scope.record.beginTimeStr = $scope.month[$scope.s_month][2];
            $scope.record.endTimeStr = $scope.month[$scope.s_month][3];
        });

        $scope.s_quarter = "";
        $scope.$watch('s_quarter',function(){
            if($scope.s_quarter==""){
                return;
            }

            $scope.record.beginTimeStr = $scope.quarter[$scope.s_quarter][2];
            $scope.record.endTimeStr = $scope.quarter[$scope.s_quarter][3];
        });

        $scope.s_year = "";
        $scope.$watch('s_year',function(){
            if($scope.s_year==""){
                return;
            }

            $scope.record.beginTimeStr = $scope.year[$scope.s_year][1];
            $scope.record.endTimeStr = $scope.year[$scope.s_year][2];
        });

        $scope.getTypeList = function(){
            var success = function(result){
                console.log(result);
                $scope.types = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/oa/plan/read/PlanTypeList',{},success,error);
        }
       $scope.getTypeList();

       $scope.creat_admins = function(){
              var admins = [  
                {name:'管理员1',id:'15'},
                {name:'管理员2',id:'16'}, 
                {name:'管理员3',id:'17'}
                ]
                $scope.admin=admins;
       }
       $scope.creat_admins();


       /*可见人*/
       $scope.get_visibleType = function(key){
        
            var success = function(result){
                console.log(result);
                 $scope.visibleType = result.data.list.reverse();
                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":key},success,error);
       }

       setTimeout(function(){
            $scope.get_visibleType("plan_user_look");
       },2000);



       
       


        function validate(){
            jQuery('#planadd').validate({
                rules: {
                    title: {
                        required: true
                    },
                    zq: {
                        required: true
                    }
                },
                messages: {
                    planType: {
                        required: '请填写标题'
                    },
                    zq: {
                        required: '请选择周期'
                    }
                },
                submitHandler: function() {
                    $scope.submit1();
                }
            });
        }

        validate();   

        // 编辑的默认选项
      //  $scope.

} ]);