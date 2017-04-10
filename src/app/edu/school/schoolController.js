'use strict';

angular.module('app')
	.controller('schoolController', [ '$rootScope', '$scope', '$timeout','$http', '$state','toaster',
	                                function($rootScope, $scope, $timeout,$http, $state,toaster) {
		$scope.loading = false;
        $scope.region = {};
        $scope.user = {};
        $scope.school = {};

        //编辑页初始化数据	
		$scope.init = function(id){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.record = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/school/read/detail',
				data: {"id":id}
			}).then(callback);
		};

		console.log($state.params.id);

		if($state.params.id){
			$scope.title = "编辑学校";

			$scope.init($state.params.id);
		}else{
			$scope.title = "添加学校";
		}
		

		


	
       
        $scope.get_province = function(){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.region.province = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	//toaster.clear('*');
	                    //toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/region/read/list',
				data: {"parentId":1}
			}).then(callback);
        }

        $scope.get_province();

        $scope.get_city = function(id){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.region.city = result.data;
	                    $scope.region.area = {};
	                   $scope.$apply();
	                }else{
	                  	//toaster.clear('*');
	                    //toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/region/read/list',
				data: {"parentId":id}
			}).then(callback);
        }

        $scope.get_area = function(id){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.region.area = result.data;
	                   $scope.$apply();
	                }else{
	                  	//toaster.clear('*');
	                    //toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/region/read/list',
				data: {"parentId":id}
			}).then(callback);
        }


        $scope.change_province = function(){
        	console.log($scope.record.province_id);
        	$scope.get_city($scope.record.province_id);
        }

        $scope.change_city = function(){
        	console.log($scope.record.city_id);
        	$scope.get_area($scope.record.city_id);
        }


        //管理员列表user/read/list
        $scope.get_user = function(){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

	                   $scope.user.list = result.data.list;
	                   $scope.$apply();
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/user/read/list'
			}).then(callback);
        }

        $scope.get_user();

		//学校规模
        $scope.get_type = function(key){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

	                   $scope.school.scope = result.data.list;
	                   $scope.$apply();
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/dic/read/list',
				data: {"key":key}
			}).then(callback);
        }

        $scope.get_type("SCHOOL_SCOPE");

        //学校类型
        $scope.get_type = function(key){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

	                   $scope.school.type = result.data.list;
	                   $scope.$apply();
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/dic/read/list',
				data: {"key":key}
			}).then(callback);
        }

        $scope.get_type("GRADE_TYPE");


        //学校性质
        $scope.get_nature = function(key){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

	                   $scope.school.nature = result.data.list;
	                   $scope.$apply();
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/dic/read/list',
				data: {"key":key}
			}).then(callback);
        }

        $scope.get_nature("SCHOOL_NATURE");

        $scope.submit = function(){
        	console.log('提交');	
        	console.log($scope.record);

        	var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

						toaster.clear('*');
	                    toaster.pop('success', '', "保存成功");
	                    $timeout(function(){
	                        $state.go('main.edu.school.list');
	                    },2000);

	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};
			$scope.record["school.region.id"] = $scope.record.region.id;
			$scope.record["school.name"] = $scope.record.name;
			$scope.record["school.address"] = $scope.record.address;
			$scope.record["school.scope"] = $scope.record.scope;
			$scope.record["school.type"] = $scope.record.type;
			$scope.record["school.nature"] = $scope.record.nature;
			$scope.record["school.postalcode"] = $scope.record.postalcode;
			$scope.record["user.name"] = $scope.record.user.name;
			$scope.record["user.loginName"] = $scope.record.loginName;
			$scope.record["user.password"] = $scope.record.password;
			$scope.record["school.remark"] = $scope.record.remark;
			$scope.record["user.userType"] = 2;

			delete $scope.record.updateTime;
			delete $scope.record.createTime;
			delete $scope.record.region;
			delete $scope.record.user;
			delete $scope.record.remark;

			$.ajax({
				url : $state.params.id?'/school/update':'/school/add',
				data: $scope.record
			}).then(callback);

        }
        //表单验证
        function validate(){
            jQuery('form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    province: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    region: {
                        required: true
                    },
                    address: {
                        required: true
                    },
                    scope: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    nature: {
                        required: true
                    },
                    postalcode: {
                        required: true
                    },
                    username: {
                        required: true
                    },
                    pwd: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写学校名称'
                    },
                    province: {
                        required: '请选择省份'
                    },
                    city: {
                        required: '请选择城市'
                    },
                    region: {
                        required: '请选择区域'
                    },
                    address: {
                        required: '请添写学校详细地址'
                    },
                    scope: {
                        required: '请选择学校规模'
                    },
                    type: {
                        required: '请选择学校类型'
                    },
                    nature: {
                        required: '请选择学校性质'
                    },
                    postalcode: {
                        required: '请添写学校邮编'
                    },
					username: {
                        required: '请输入管理员'
                    },
                    pwd: {
                        required: '请输入密码'
                    },
                    remark: {
                        required: '请添写学校简介'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();

        

}])