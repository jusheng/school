'use strict';

angular.module('app')
	.controller('schoolSubjectlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "学校科目管理";
		$scope.param={ };
		$scope.loading=false;

		$scope.init = function () {
                var success = function (result) {
                    $scope.school = result.data;
                   
        //             var temp = [];
			    	// var obj = $scope.school;
			    	// for (var i = 0; i < obj.length; i++) {
			    	// 	temp.push(obj[i].id);
			    	// };

			    	// for (var i = 0; i < $scope.subjectList.length; i++) {
			    	// 	if(temp.indexOf($scope.subjectList[i].id)>-1){
			    	// 		$scope.subjectList[i].checked = true;
			    	// 	}else{
			    	// 		$scope.subjectList[i].checked = false;
			    	// 	}
			    	// };
			    	
 					$scope.$apply();

                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/school/getSchoolSubject",{}, success, error);
            }
        $scope.init();

	// $scope.search=function(){
	// 	var success = function(result){
	// 		console.log("sss"+result);
	// 		$scope.subjectList = result.data;
	// 		$scope.$apply();
	// 		$scope.init();
	// 	}

	// 	var error = function(result){
	// 		toaster.clear('*');
 //            toaster.pop('error', '', result.msg);
	// 	}
	
	// 	API.post('/subject/read/all',$scope.param,success,error);

	// }

	// $scope.search();


//提交
	// $scope.submit = function(){
 //        var temp = [];
 //        for(var i in $scope.subjectList){
 //            $scope.subjectList[i].checked && $scope.subjectList[i].checked==true && temp.push($scope.subjectList[i].id);
 //        }
 //        if(temp.length==0 ){

 //            return false;
 //        }

 //        var success = function(result){
 //            toaster.clear('*');
 //            toaster.pop('success', '', "保存成功");
 //            $timeout(function() {
 //                $state.go('main.schoolSubject.schoolSubjectlist');
 //            }, 2000);
 //        }
 //        var error = function(result){
 //            toaster.clear('*');
 //            toaster.pop('error', '', result.msg);
 //        }

 //        API.post("/school/updateSchoolSubject",{"ids":temp.join(",")},success,error);

 //    }





} ]);