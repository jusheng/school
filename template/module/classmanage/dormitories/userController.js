'use strict';

angular.module('app')
	.controller('userController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
			$scope.$parent.myScrollOptions = {
		        snap: false,
		        hScrollbar:true,
		        scrollbars:true,
		        fadeScrollbars:true,
		        onScrollEnd: function ()
		        {
		            alert('finshed scrolling');
		        }
		    };
	              		
            $scope.title1 = "选择男生";
		    $scope.title2 = "选择女生";
            $scope.selectArray = [];

            // $scope.ids = $scope.ngDialogData.ids;
            // $scope.callback = $scope.ngDialogData.callback;
            // $scope.classId = $scope.ngDialogData.classId;
            // console.log($scope.ids);
        
		    // console.log($scope.idArray);	

            
	         // 学生列表

		     $scope.stu_list = function(){
                var classData = {
                    "classId":$scope.classId,
                };
		     	var success = function(result){
                    console.log(result.data);
                    $scope.boyslist = [];
		     		$scope.girlslist = [];
		     		for (var i = 0; i < result.data.length; i++) {
                        
                        if (result.data[i].sex==1) {
                            $scope.boyslist.push(
                                {
                                    "id":result.data[i].id - 0,
                                    "name":result.data[i].name

                                }
                            )
                        }else{
                            $scope.girlslist.push(
                                {
                                    "id":result.data[i].id - 0,
                                    "name":result.data[i].name

                                }
                            )
                        }
		     			    
                        
		     		}
                    console.log($scope.boyslist);
                    console.log($scope.girlslist);
		     		$scope.$apply();

                    $scope.$emit("boyslist",result.data);
		     		$scope.$emit("girlslist",result.data);


		     	};

		     	var error = function(){

		     	};

		     	API.post("classes/student/read/classStudent",classData,success,error);

		     }
		     $scope.stu_list()
            
            //  $scope.idArray = [];
            // for (var i = 0; i < $scope.selectArray.length; i++) {
            //     $scope.idArray.push(
            //             {
            //                 "id":$scope.selectArray[i].id - 0,
            //                 "name":$scope.selectArray[i].name
            //             }
            //         )
            //  }  

            //  console.log($scope.idArray);
            console.log($scope.selectArray);
            
            console.log($state.params.id);
              // 提交
            $scope.submit = function(){
                var ids = {};
                if ($scope.selectArray.length > 0) {
                    var tempId = [];
                    for (var i = 0; i < $scope.selectArray.length; i++) {           

                        tempId.push($scope.selectArray[i].id);

                    }

                    ids = tempId.join(',');
                }else if($scope.selectArray.length == 1){
                    
                    ids = $scope.selectArray[0].id;
                }
                console.log(ids);
                var data={
                    "ids":ids,
                    "dormId":$state.params.id
                    // "dormId":$state.id
                };
                console.log(data);
                // if($scope.data.length== 0){
                //     toaster.pop('error', "", "您未选择任何学生");                
                //     setTimeout(function(){toaster.clear("*");},1000);
                //     return false;
                // }
                var success = function(result){
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    console.log(data);
                    $timeout(function(){
                        $scope.closeThisDialog();
                        $scope.ngDialogData.callback();
                    },200);    
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/dorm/add',data,success,error);

        
            }

}])