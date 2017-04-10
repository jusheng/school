'use strict';

angular.module('app')
	.controller('userlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','toaster',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,toaster) {
		
	        $scope.title = "通讯录";
	      



		     $scope.showSelected = function(sel) {
		     	 console.log(sel);
		         $scope.selectedNode = sel;
		     };

		     // 学校通讯录 (取得全校老师或是学生的任课老师)
		     $scope.school_mail_list = function(){

		     	var success = function(result){

		     		if($scope.user_data.userType==2){  //老师（取得所有老师）
			     		//$scope.schoolMailList = result.data;
			     		
			     		

			     	}else if ($scope.user_data.userType==1){
			     		result.data.splice(0,1);  //把第一项的班级信息删除
			     		//$scope.schoolMailList = result.data;
			     		
			     		
			     	}


					for (var i = 0; i < result.data.length; i++) {
			     			result.data[i].is_teacher = true;
			     		}


			     	$scope.get_bj_list();

		     		$scope.$apply();

		     		$scope.$emit("schoolmailList",result.data);

		     	};

		     	var error = function(){

		     	};

		     	if($scope.user_data.userType==2){  //老师（取得所有老师）
					API.post("/edu/teacher/read/all",{},success,error);
		   		}else if ($scope.user_data.userType==1){ //学生 （取得任课老师）
		   			API.post("/edu/teacher/getTeachersByStudent",{},success,error);
		   		}

		     }
		     //$scope.school_mail_list();	


		     $scope.select = function(v){
		     	
		     	$scope.set_empName(v); //调用父作用域方法
		     }

		     //全选任课老师 (学生身份)
		     $scope.is_s_all_teacher = 0;
		     $scope.select_all_teacher = function(){
		     	
		     	$scope.is_s_all_teacher = !$scope.is_s_all_teacher;

		     	if($scope.is_s_all_teacher){   //全选中
		     		for (var i = 0; i < $scope.schoolMailList.length; i++) {
		     			if($scope.schoolMailList[i].is_teacher==true){
		     				$scope.schoolMailList[i].selected = true;

		     				$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

		     			}
		     		}
		     	}else{  //全取消

		     		for (var i = 0; i < $scope.schoolMailList.length; i++) {
		     			if($scope.schoolMailList[i].is_teacher==true){
		     				$scope.schoolMailList[i].selected = false;

		     				$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

		     			}
		     		}	

		     	}
		     }


		     /*全选本班同学（学生身份）*/
		     $scope.is_all_myclass_students = 0;
		     $scope.select_myclass_students = function(){
		     	$scope.is_all_myclass_students = !$scope.is_all_myclass_students;

		     	if($scope.is_all_myclass_students){   //全选中
		     		
		     		for (var i = 0; i < $scope.schoolMailList.length; i++) {
		     			if($scope.schoolMailList[i].is_teacher==false){
		     				$scope.schoolMailList[i].selected = true;

		     				$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

		     			}
		     		}
		     	}else{  //全取消

		     		for (var i = 0; i < $scope.schoolMailList.length; i++) {
		     			if($scope.schoolMailList[i].is_teacher==false){
		     				$scope.schoolMailList[i].selected = false;

		     				$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

		     			}
		     		}	

		     	}

		     }






		     $scope.is_teacher = function(item){
		     	return (item.is_teacher==true);
		     }

		     $scope.is_student = function(item){
		     	return (item.is_teacher==false);
		     }


		   $scope.get_bj_list = function(){
		   		
		   		var success = function(result){
		   			console.log(result);

		   			if ($scope.user_data.userType==2) {  //老师

		   				for (var i = 0; i < result.data.length; i++) {
		   					result.data[i].selected = false;
		   				}


						$scope.teacherclass = result.data; //班级

		   			}else if($scope.user_data.userType==1){  //学生
		   				$scope.studentclass = result.data;

		   				//把学生数据对象合并到$scope.schoolMailList
		   				
		   				for (var i = 0; i < $scope.studentclass.length; i++) {
		   					$scope.studentclass[i].is_teacher = false;
		   				}

		   				//$scope.schoolMailList = $scope.schoolMailList.concat($scope.studentclass);

		   				//console.log($scope.studentclass);

		   				$scope.$emit("schoolmailList",$scope.studentclass);
		   			}
		   			

		   			$scope.$apply();
		   		}
		   		var error = function(){

		   		}

		   		if($scope.user_data.userType==2){  //老师（取得所有班级及学生）
					API.post("/oa/addressbook/read/list/class",{},success,error);
		   		}else{  							//学生 （取得所在班级所有学生）
		   			API.post("/edu/student/read/classStudent/current",{},success,error);
		   		}
		   		
		   }

		   
		   //监听个人信息接口是否返回了数据 
		   $scope.$watch("user_data",function(){
		   		if(!$scope.user_data){
		   			return false;
		   		}

		   		//$scope.get_bj_list();
		   		$scope.school_mail_list();
		   })

		

		
		//判断是否在这个班级下（过滤掉老师数据）   
		$scope.is_student_in_class = function(index,item){

			if($scope.teacherclass[index].student){
				for (var i = 0; i < $scope.teacherclass[index].student.length; i++) {
					if($scope.teacherclass[index].student[i].id == item.id){
						return true;
						break;
					}
				}
				return false;
			}
			
			return false;
		}


		//取班级下的所有学生   
		$scope.select_class = function(classId,index){

			if($scope.teacherclass[index].student){
				return false;	
			}

			var success = function(result){
				console.log(result);

				$scope.teacherclass[index].student = result.data;

				for (var i = 0; i < $scope.teacherclass[index].student.length; i++) {
		   			$scope.teacherclass[index].student[i].is_teacher = false;
		   		}

				//班级下的学生合并到$scope.schoolMailList
				//$scope.schoolMailList = $scope.schoolMailList.concat(result.data);

				$scope.$emit("schoolmailList",$scope.teacherclass[index].student);

				$scope.$apply();
			}
			var error = function(){

			}

			API.post("/edu/student/read/classStudent",{"classId":classId},success,error);
		}	   



		// 通过选择班级 全选学生
		$scope.select_student_byclass = function(index){


			//全选中该班学生
			if($scope.teacherclass[index].selected){  

				for (var i = 0; i < $scope.schoolMailList.length; i++) {
	     			if($scope.schoolMailList[i].is_teacher==false){

	     				for (var j = 0; j < $scope.teacherclass[index].student.length; j++) {
	     					if($scope.schoolMailList[i].id == $scope.teacherclass[index].student[j].id){
	     						$scope.schoolMailList[i].selected = true;

	     						$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

	     						break;
	     					}
	     				}

	     			}
			   }	

			}else{  //取消


				for (var i = 0; i < $scope.schoolMailList.length; i++) {
	     			if($scope.schoolMailList[i].is_teacher==false){

	     				for (var j = 0; j < $scope.teacherclass[index].student.length; j++) {
	     					if($scope.schoolMailList[i].id == $scope.teacherclass[index].student[j].id){
	     						$scope.schoolMailList[i].selected = false;

	     						$scope.set_empName($scope.schoolMailList[i]); //调用父作用域方法

	     						break;
	     					}
	     				}

	     			}
			   }	

			}

			
		}





} ]);