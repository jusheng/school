'use strict';

angular.module('app')
	.controller('roleconfigController', [ '$rootScope', '$scope', '$http', '$state','toaster','API','$timeout',
	                                function($rootScope, $scope, $http, $state,toaster,API,$timeout) {
	//$scope.title = "教务人员角色分配";


	 //编辑页初始化数据	
    $scope.init = function(id) {

        var success = function(result) {
            $scope.record = result.data;
            $scope.$apply();
        };
        var error = function(result) {
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        };

        API.post('/eduteacher/read/detail', {
            "id": $state.params.user_id
        }, success, error);

    };

    if ($state.params.user_id) {
        $scope.title = $state.params.name + " > 教务人员角色分配";
        $scope.init($state.params.user_id);

    }

    $scope.school_id = $state.params.school_id


    //取得角色
    $scope.get_role = function(){

    	var success = function(result){
            console.log(result);
    		$scope.role = result.data;
    		$scope.$apply();
    	}

    	var error = function(result){
    		toaster.clear('*');
	        toaster.pop('error', '', result.msg);
    	}

    	API.post("/edu/userrole/read/list",{"teacherId":$state.params.user_id},success,error);

    }	
    $scope.get_role();



    $scope.isSelected = function(id){
        //return $scope.selected.indexOf(id)>=0;
    }

    $scope.submit = function(){
    	var temp = [];
    	
		for(var i in $scope.role){
			
			$scope.role[i].checked && $scope.role[i].checked==true && temp.push($scope.role[i].role.id);
		}

    	console.log(temp);

    	if(temp.length==0 ){

    		return false;
    	}




        console.log('fdfd');


    	var success = function(result){
    		toaster.clear('*');
    		toaster.pop('success', '', "保存成功");
    		$timeout(function() {
    		    $state.go('main.edu.user.userlist', {
    		        "school_id": $scope.school_id,
    		        "name": $scope.name
    		    });
    		}, 2000);
    	}
    	var error = function(result){
    		toaster.clear('*');
            toaster.pop('error', '', result.msg);
    	}

		API.post("/edu/userrole/update",{"teacherId":$state.params.user_id,"roles":temp.join(","),"isDefault":$scope.record.isDefault},success,error);

    }


      function validate(){

            jQuery('#roleconfig_form').validate({
                rules: {
                    role_name: {
                        required: true
                    },
                    isDefault: {
                        required: true
                    }
                },
                messages: {
                    role_name: {
                        required: '请选择角色名称'
                    },
                    isDefault: {
                        required: '请选择默认角色'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();




}])