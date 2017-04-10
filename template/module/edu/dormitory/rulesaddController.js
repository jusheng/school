'use strict';

angular.module('app')
	.controller('rulesaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {

        $scope.title = "添加宿舍";
        $scope.param={

        }
        var data = {
            
        };
        //获取楼层
        $scope.getfloors=function(){
            var success = function(result){
                $scope.floors = result.data;
                console.log($scope.floors);
                // $scope.search();
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            API.post('/edu/house/floor/list',{"houseId":$scope.houseId},success,error);
        }
        // 宿舍性别
        $scope.dormType = 1;
        $scope.sex = function(i){
            $scope.dormType = i
        }



        // 设置对勾
        if ($scope.param != 0) {
            //$scope.selected = 4;
            // alert(1);
            $scope.set_curr(1);

        }
        // 提交
         $scope.submit = function(){
            if ($scope.floors.length<=1) {
                $scope.floor = 1
            }
            data = {
                "houseId":$scope.houseId,
                "roomName":$scope.roomName,
                "roomNum":$scope.roomNum,
                "floor":$scope.floor,
                "dormType":$scope.dormType
            }
            console.log(data);
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.dormitory.list');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            API.post('/edu/dorm/create',data,success,error);


	   }
       //获取宿舍楼列表
       $scope.get_class = function(){

        var success = function(result){
            $scope.record = result.data;
            $scope.$apply();
            console.log($scope.newsclass);
        }
        var error = function(result){

        }

        API.post('/edu/house/read/list',{},success,error);
       }
       $scope.get_class();


	   validate();

	   function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    num: {
                        required: true
                    },
                    remark: {
                        required: true
                    },
                    floor: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请选择宿舍楼'
                    },
                    num: {
                        required: '请设置宿舍床位数'
                    },
                    remark: {
                        required: '请填写宿舍名称'
                    },
                    floor: {
                        required: '请选择楼层'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

} ]);