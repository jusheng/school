'use strict';

    angular.module('app')
        .controller('deptUpdateController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster','API','recordFormat','ngDialog',
                                             function($scope, $rootScope, $state, $timeout, toaster,API,recordFormat,ngDialog) {
        var title = ""; 


        //把部门数据都转为平行的数组
        $scope.create_select = function(obj) {
                var list = [];
                
                var inner = function(obj,curr_id,s,pre){
                       
                     var ico = s?s + "--":"|--"; 
                        

                    for (var i = 0; i < obj.length; i++) {


                            //当前部门以及下属部门不允许选择
                            //var select = pre ? (($scope.record.id==obj[i].id || $scope.record.parentId==obj[i].pid || (pre.disabled && pre.id==obj[i].pid))?true:false):false;
                            
                            if ($state.params.id) {
                                var pre_id  = curr_id || $scope.record.id;
                                var select = pre ? ((pre_id ==obj[i].pid || pre_id ==obj[i].id)?true:false):false;
                              
                            }else{
                                var select = false;
                            }

                            list.push({
                                "id": obj[i].id,
                                "text": obj[i].label,
                                "pid":obj[i].pid,
                                "ico":ico,
                                "disabled":select
                            });

                            if(select){
                                var t = obj[i].id;
                            }else{
                                var t = "";
                            }

                        obj[i].children && inner(obj[i].children,t,ico,obj[i]);    
                    }
                }
                inner(obj);
               // console.log(list);
                return list;
            }



        //取得部门
        $scope.get_dept = function(){
            var success = function(result){
                    
                if(result.data && result.data.length>0){
                        $scope.all_dept = {
                            data:$scope.create_select(result.data)
                        }
                }else{
                   $scope.record.parentId = "0";  
                }


               $scope.$apply();
            }

            var error = function(){

            }

            API.post("dept/read/tree",{},success,error);
        }
        $scope.get_dept();



       

        if($state.includes('**.dept.update')){
            title="编辑部门";
            activate($state.params.id);
           // validate(id);
        }else if($state.includes('**.dept.create')){
            title="添加部门";
            $scope.record = {};
        }  
        $scope.title = $rootScope.title = title;
        $scope.loading = true;



        //初始化验证
        //validate($scope);
        $scope.submit= function(){
            var m = $scope.record;

            //recordFormat.format($scope.record,'.');
            delete $scope.record.createTime;
            delete $scope.record.createName;
            // if(!$scope.record.id){
            //     delete $scope.record.parentDept.deptName;
            // }

            if(m){
                $.ajax({
    				url : $scope.record.id ? '/dept/update' : 'dept/add',
    				data: $scope.record
    			}).then(callback);
            }
            function callback(result) {
                if(result.httpCode ==200){//成功
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.sys.dept.list');
                    },2000);
                }else{
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
            }
        }


        // 初始化页面
        function activate(id) {
	        $scope.loading = true;
        	$.ajax({
				url : '/dept/read/detail',
				data: {'id': id}
			}).then(function(result) {
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.record = result.data;
                    $scope.record.parentName = $scope.record.parentDept.deptName;


                
                    $scope.$apply();

				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
        }

          

        //表单验证
        function validate(){

            jQuery('.user_form').validate({
                rules: {
                	account: {
                        required: true,
                        //maxLengthB:[20]
                    },
                    sortNo: {
                        required: true
                    },
                    parentId:{
                        required: true
                    }
                },
                messages: {
                	account: {
                        required: '请填写部门名称',
                        //maxLengthB:"部门名称不得超过{0}个字符"
                    },
                    sortNo: {
                        required: '请填写排序'
                    },
                    parentId:{
                        required: "请选择上级部门"
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }
        validate(); 

        $scope.select_dept = function(){

            ngDialog.open({
                    template: 'src/app/sys/dept/select.html',
                    controller: 'selectController',
                    className: 'ngdialog-theme-green',
                    scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dept/selectController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    ]);
                            });
                        }]}
                });
        }   


        $scope.setParentId = function(id,name){
            
            $scope.record.parentId=id;
            $scope.record.parentName=name;

            /*if($scope.record.parentDept){
                $scope.record.parentDept.id=id;
                $scope.record.parentDept.deptName=name;
            }else{
                $scope.record.parentDept = {
                    "id":id,
                    "deptName":name
                }
            }*/
        }


    }]);