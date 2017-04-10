'use strict';

angular.module('app')
	.controller('userController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
			$scope.$parent.myScrollOptions = {
		        snap: false,
		        hScrollbar:true,
		        scrollbars:true,
		        fadeScrollbars:true,
		       /* onScrollEnd: function ()
		        {
		            alert('finshed scrolling');
		        }*/
		    };
	              		
		    $scope.title1 = "选择人员";
		    		
		    if($scope.curr == 4 && !$scope.record.attendeePlanList1){
		    				$scope.title1 = "已经没有可选受邀人员";
		    }else if($scope.curr == 5 && !$scope.record.attendeePlanList1){
		    				$scope.title1 = "已经没有可选受邀人员";
		    }
	         // 学校通讯录
		     $scope.school_mail_list = function(){

		     	var success = function(result){
		     		$scope.schoolMailList = [];
		     		for (var i = 0; i < result.data.length; i++) {
		     			$scope.schoolMailList.push(
		     					{
		     						"id":result.data[i].id - 0,
		     						"name":result.data[i].name
		     					}
		     				)
		     		}

		     		//$scope.schoolMailList = result.data;



		     		$scope.$apply();

		     		$scope.$emit("schoolmailList",result.data);

		     	};

		     	var error = function(){

		     	};

		     	API.post("/edu/teacher/read/all",{},success,error);

		     }
		     $scope.school_mail_list();



		     $scope.s_zbr = function(_this,obj){
		     	$scope.record.presideUser = obj;

                $scope.record.teacherId = $scope.record.presideUser.id;
                $scope.record.teacherName = $scope.record.presideUser.name;
               	
		     }
		     $scope.s_xbr = function(_this,obj){
		     	$scope.record.recorderList = obj;
		     	$scope.record.recorderId = $scope.record.recorderList.id;
                $scope.record.recorderName = $scope.record.recorderList.name; 
		    
		     }


		   
                // $scope.record.attendeePlanList1 = JSON.parse(JSON.stringify($scope.record.attendeePlanList));

   			//click出席人员
   			if ($scope.record.attendeePlanList1) {
		   				if ($scope.record.defaulterList || $scope.record.attendeeList) {
		   					
            				
		
									if ($scope.record.defaulterList) {
                		            	for (var j = 0; j < $scope.record.defaulterList.length; j++) {

                		            		for (var i = 0; i < $scope.record.attendeePlanList1.length; i++) {
												// alert("1总的循环");
                		                		if ($scope.record.attendeePlanList1[i].id==$scope.record.defaulterList[j].id) {
                		                			$scope.record.attendeePlanList1.splice(i,1);
                		                			console.log($scope.record.attendeePlanList1);
                		                			// alert("删除与第二个重复的");

                		        	        	} 
			
                		        	    	}
                		        		}
                		        	}
                		            if ($scope.record.attendeeList) {
                		            	for (var j = 0; j < $scope.record.attendeeList.length; j++) {

                		            		for (var i = 0; i < $scope.record.attendeePlanList1.length; i++) {
                		            			// alert("2总的循环");
		
                		                		if ($scope.record.attendeePlanList1[i].id==$scope.record.attendeeList[j].id) {
                		                			$scope.record.attendeePlanList1.splice(i,1);
                		                			console.log($scope.record.attendeePlanList1);
                		                			// alert("删除与第一个重复的");

                		                		} 
		
                		            		}
                		        		}
		
                		    		}
                		  
                		}
		
            			// if ($scope.record.attendeeList) {
            				
            			// 	for (var i = 0; i < $scope.record.attendeePlanList1.length; i++) {
		
		
               //  		            for (var j = 0; j < $scope.record.attendeeList.length; j++) {
		
               //  		                if ($scope.record.attendeePlanList1[i].id==$scope.record.attendeeList[j].id) {
               //  		                	$scope.record.attendeePlanList1.splice(i,1);
               //  		                } 
		
               //  		            }
		
               //  		    }
		
            			// }
		
            			
		    }
			validate();

	   		function validate(){
                jQuery('#newsadd_form').validate({
                    rules: {
                		title: {
                    	    required: true
                    	},
                    	sortsId: {
                    	    required: true
                    	},
                    	remark: {
                    	    required: true
                    	},
                    	author: {
                    	    required: true
                    	},
                    	num: {
                    	    required: true
                    	},
                 
                	},
                	messages: {
                		title: {
                	        required: '请填写标题'
                	    },
                	    author: {
                	        required: '请填写作者姓名'
                	    },
                	    num: {
                	        required: '请填写作品序号'
                	    },
                	    prize: {
                	        required: '请填写奖项'
                	    },
                	   
                	    remark: {
                	        required: '请填写简介'
                	    }
                	},
                	submitHandler: function() {
                	    $scope.submit();
                	}
            	});
        	}


         }])