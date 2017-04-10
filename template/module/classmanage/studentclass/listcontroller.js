'use strict';

angular.module('app')
	.controller('listController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {
    $scope.app_name = "班级信息";
    $scope.param = {};  
	


	$scope.get_list = function(){

		var success = function(result){
			$scope.pageInfo = result.data;
            console.log($scope.pageInfo);
			$scope.$apply();
		}
		var error = function(){

		}

		API.post("/classes/student/read/classStudent/page/current",$scope.param,success,error);
	}

    $scope.get_list();
	   
    $scope.type = 1;
    $scope.change = function(s){
           $scope.type = s;
    
    }


	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.get_list();
    };



    // 民族
    $scope.get_nation = function(key){
        
            var success = function(result){
                 $scope.nation = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"NATIONAL"},success,error);
     }  
     $scope.get_nation();

     $scope.re_nationName = function(code){

     	if($scope.nation){
     		for (var i = 0; i < $scope.nation.length; i++) {
     				if($scope.nation[i].code==code){
     					return $scope.nation[i].codeText;
     					break;
     				}
     			}	
     	}
     }


     // 政治面貌
    $scope.get_politics = function(key){
        
            var success = function(result){
                 $scope.politics = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"POLITICS_STATUS"},success,error);
     }  
     $scope.get_politics();

     $scope.re_politicsName = function(code){

     	if($scope.politics){
     		for (var i = 0; i < $scope.politics.length; i++) {
     				if($scope.politics[i].code==code){
     					return $scope.politics[i].codeText;
     					break;
     				}
     			}	
     	}
     }



      //删除操作
    $scope.del = function(id) {

        var success = function(result) {
            toaster.clear('*');
            toaster.pop('success', "", "删除成功");
            $timeout(function() {
                $scope.search();
            }, 1000);
        }
        var error = function(result) {
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        if (id) { //单个删除

            API.post("/classes/student/delete", {
                "id": id
            }, success, error);

        } else { //批量删除

            var temp = [];
            for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
            }


            temp.length > 0 && API.post("/classes/student/delete", {
                "id": temp.join(",")
            }, success, error);
        }
    }


    $scope.s_all = 0; //全选标记
    $scope.select_all = function() {
        $scope.s_all = !$scope.s_all;

        for (var i = 0; i < $scope.pageInfo.list.length; i++) {
            $scope.pageInfo.list[i].selected = $scope.s_all;
        }
    };


    $scope.select_per = function(index) {
        $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }







}])
