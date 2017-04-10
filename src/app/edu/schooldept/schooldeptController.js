'use strict';

angular.module('app')
    .controller('schooldeptController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster', 'API',
        function($rootScope, $scope, $timeout, $http, $state, toaster, API) {
            $scope.loading = false;


            $scope.create_select = function(obj) {
                var list = [];
                
                var inner = function(obj,curr_id,s,pre){
                       
                     var ico = s?s + "--":"|--"; 
                        

                    for (var i = 0; i < obj.length; i++) {


                            //当前部门以及下属部门不允许选择
                            //var select = pre ? (($scope.record.id==obj[i].id || $scope.record.parentId==obj[i].pid || (pre.disabled && pre.id==obj[i].pid))?true:false):false;
                            
                            if ($state.params.dept_id) {
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
                    toaster.pop('error', '', result.msg);
                }

                API.post('/schoolDept/read/tree', {
                    "schoolId": $scope.school_id
                }, success, error);

            }



            //编辑页初始化数据	
            $scope.init = function(id) {

                var success = function(result) {
                    $scope.record = result.data;
                    $scope.record["school.id"] = $scope.school_id;
                    $scope.$apply();

                    $scope.get_all_dept();
                };

                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/schoolDept/read/detail', {
                    "id": $state.params.dept_id
                }, success, error);

            };

            $scope.school_id = $state.params.school_id;
            $scope.name = $state.params.name;

            if ($state.params.dept_id) {
                $scope.title = $scope.name + " > 编辑学校部门";

                $scope.init($state.params.id);


            } else {
                $scope.title = $scope.name + " > 添加学校部门";

                $scope.record = {
                    "school.id": $scope.school_id
                }
                $scope.get_all_dept();
            }


            $scope.submit = function() {
                  
                delete $scope.record.updateTime;
                delete $scope.record.createTime;
                delete $scope.record.school;

                var success = function(result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function() {
                        $state.go('main.edu.schoolDept.deptlist', {
                            "school_id": $scope.school_id,
                            "name": $scope.name
                        });
                    }, 2000);
                };

                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };

                var url = ($state.params.dept_id ? '/schoolDept/update' : '/schoolDept/add');
                API.post(url, $scope.record, success, error);


            }//负责人
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
    
        API.post('/edu/read/list',$scope.param,success,error);

    }
    $scope.search();

                //表单验证
            function validate() {
                jQuery('form').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        sortNo: {
                            required: true
                        },
                        remark: {
                            required: true
                        }
                    },
                    messages: {
                        name: {
                            required: '请填写部门名称'
                        },
                        sortNo: {
                            required: '请添写排序号'
                        },
                        remark: {
                            required: '请添写简介'
                        }

                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();

        }
    ])