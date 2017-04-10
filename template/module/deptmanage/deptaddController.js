'use strict';

angular.module('app')
	.controller('deptaddController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {



        //上级部门
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


            //上级部门列表 （不带分页）
            $scope.get_all_dept = function() {

                var success = function(msg) {
                    $scope.schooldept = $scope.create_select(msg.data);
                    $scope.$apply();
                };
                var error = function(msg) {
                    toaster.clear('*');
                    toaster.pop('error', '', msg.msg);
                }

                API.post('/schoolDept/read/tree', {
                    "schoolId": 30
                }, success, error);

            }

             $scope.get_all_dept();


                                
        //判断是修改还是添加
	       $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            API.post("/schoolDept/read/detail",{"id":id},success,error);

         }  

        if($state.params.id){
            $scope.app_name = "修改部门";
            $scope.init($state.params.id);
        }else{
            $scope.app_name = "添加部门";


        }
  
	   $scope.submit = function(){

	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.deptmanage.deptlist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            if($scope.record.owner){
                $scope.record["owner.id"] = $scope.record.owner.id;//后台解析的一种方式
            }
            if($scope.record.school){
                $scope.record["school.id"] = $scope.record.school.id;
            }

            if($scope.record.parentId==null){
                $scope.record.parentId="";
            }

            delete $scope.record.school;
            delete $scope.record.owner;
            delete $scope.record.parent;
            delete $scope.record.createBy;
            delete $scope.record.parentDept;
            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            
            if($state.params.id){
                API.post('/schoolDept/update',$scope.record,success,error);

            }else{
                API.post('/schoolDept/add',$scope.record,success,error);
            }

	   }

       //负责人
       $scope.search=function(){

        var success = function(result){
           
            $scope.teacher = result.data;
            $scope.$apply();
             console.log("sssss"+$scope.teacher);
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
    
        API.post('/edu/teacher/read/list',$scope.param,success,error);

    }
    $scope.search();



	validate();
	function validate(){
            jQuery('#teacheradd_form').validate({
                rules: {
                	dedtName: {
                        required: true
                    },
                    leaf: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	dedtName: {
                        required: '请填写部门'
                    },
                    leaf: {
                        required: '请填写排序'
                    },
                    remark: {
                        required: '请填写备注'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }



	}
])
