'use strict';

angular.module('app')
	.controller('schooldeptController', [ '$rootScope', '$scope', '$timeout','$http', '$state','toaster',
	                                function($rootScope, $scope, $timeout,$http, $state,toaster) {
		$scope.loading = false;
       

        //上级部门列表 （不带分页）
        $scope.get_all_dept = function(){

            var callback = function(result){
                console.log(result);
                if(result.httpCode ==200){//成功
                       $scope.schooldept = result.data;                   
                       $scope.$apply();                    
                    }else{
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }
                
            };

            $.ajax({
                url : '/schoolDept/read/school',
                data: {"schoolId":$scope.school_id}
            }).then(callback);

        }

        

        //编辑页初始化数据	
		$scope.init = function(id){
			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.record = result.data;	                  
	                   $scope.$apply();


                        $scope.get_all_dept(); 



	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/schoolDept/read/detail',
                data: {"id":$state.params.dept_id}
			}).then(callback);
		};

        $scope.school_id = $state.params.school_id;   
        $scope.name = $state.params.name;          

        if($state.params.dept_id){
            $scope.title = $scope.name + " > 编辑学校部门";

            $scope.init($state.params.id);
        }else{
            $scope.title = $scope.name + " > 添加学校部门";

            $scope.record = {

                    "school":{
                         "id":$scope.school_id
                    }
                }
            $scope.get_all_dept();     
        }


        $scope.no_include_currname = function(item){
            return !(item.deptName==$scope.record.deptName);
        }




       
		



        $scope.submit = function(){
        	console.log('提交');	
        	console.log($scope.record);

        	var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

						toaster.clear('*');
	                    toaster.pop('success', '', "保存成功");
	                    $timeout(function(){
	                        $state.go('main.edu.school.schooldept',{"school_id":$scope.school_id,"name":$scope.name});
	                    },2000);

	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			delete $scope.record.updateTime;
			delete $scope.record.createTime;

			$.ajax({
				url : $state.params.dept_id?'/schoolDept/update':'/schoolDept/add',
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
                    deptName: {
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
                    deptName: {
                        required: '请选择上级部门'
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