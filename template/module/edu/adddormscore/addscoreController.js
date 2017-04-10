'use strict';

angular.module('app')
    .controller('addscoreController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','toaster','API','recordFormat','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,$timeout,toaster,API,recordFormat,$compile) {


     // $scope.param = {};  
    $scope.s_all = 0;  
    $scope.third = [];
    var temp = [];
    var temp1 = [];
    var ids = {};
    var names = {};
    //全选标记
    $scope.select_all = function(){
        $scope.s_all = !$scope.s_all;

        for (var i = 0; i < $scope.pageInfo.studentInfo.length; i++) {
            $scope.pageInfo.studentInfo[i].selected = $scope.s_all;
        }

    };  
    //单选标记
    $scope.select_per = function(index){
        $scope.pageInfo.studentInfo[index].selected = !$scope.pageInfo.studentInfo[index].selected;
    }
    console.log($state.params);
    $scope.dorm = $state.params.dorm;
    $scope.dormId = $state.params.dormId;
    $scope.id = $state.params.id;
    $scope.sex = $state.params.sex;

    console.log($state.params);

    // 查询详情
    $scope.init = function(id){
            var success = function(result){
                $scope.rec = result.data.dormCheck;
                console.log($scope.rec); 
                $scope.third = $scope.rec.sidStr.split(",");
                console.log($scope.third); 
               
                $scope.$apply(); 
                // alert("1");
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


        API.post("/edu/dorm/check/read/detail",{"id":id},success,error);

    }  
    $scope.init();  
    if($state.params.id){
            $scope.title = "修改分数";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加分数";
            $scope.record = {};
        } 
     // 查询宿舍制度
    $scope.ask = function(i){
            var success = function(result){
                $scope.record = result.data;
                console.log($scope.record); 
                $scope.$apply();  
                // alert("1");
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


        API.post("/classes/rewardOrPunish/read/list",{"flag":i},success,error);

    }  
    $scope.ask(1);

    // 查询宿舍人员
    $scope.search = function(){

        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            var temp3 = [];
            for (var i = 0; i < $scope.pageInfo.studentInfo.length; i++) {
                   temp3.push($scope.pageInfo.studentInfo[i].id);  
            };
            console.log(temp3);
            console.log($scope.pageInfo);
            for (var i = 0; i < $scope.third.length; i++) {
                    
                    console.log(parseInt($scope.third[i]));
                    var rightone = temp3.indexOf(parseInt($scope.third[i]));
                    console.log(rightone);
                    $scope.select_per(rightone)
            }
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("edu/dorm/read/detail",{"id":$scope.dormId},success,error);
    }
    $scope.search();

    // 提交
    $scope.submit = function(){


            
            for (var i = 0; i < $scope.pageInfo.studentInfo.length; i++) {
                    $scope.pageInfo.studentInfo[i].selected && temp.push($scope.pageInfo.studentInfo[i].id);
                    $scope.pageInfo.studentInfo[i].selected && temp1.push($scope.pageInfo.studentInfo[i].name);
            };

            ids = temp.join(",");
            names = temp1.join(",");
            console.log($scope.object);
            var data={
                "sidStr":ids,
                "dormId":$scope.dormId,
                "note":$scope.rec.note,
                "sidName":names
            };
            if ($scope.object) {
                data.rpId=$scope.object.id
            }
            console.log(data);
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.adddormscore.scorelist');
                },2000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            
            // if($state.params.id){
            //     API.post('/edu/dorm/check/update',data,success,error);

            // }else{
                API.post('/edu/dorm/check/add',data,success,error);
            // }

    }



    // 提交验证
    validate();

    function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                    score: {
                        required: true
                    },
                    if: {
                        required: true
                    }
                },
                messages: {
                    score: {
                        required: '请选择宿舍楼'
                    },
                    if: {
                        required: '请选择是否违纪'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
    }


} ]);

