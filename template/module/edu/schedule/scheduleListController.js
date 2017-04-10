'use strict';

angular.module('app')
	.controller('scheduleListController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {

    $scope.weekday = ['mon','tue','wed','thu','fri','sta','sun'];
	$scope.param={};
	$scope.loading=false;
    $scope.param["classId"]=$state.params.classId;
    $scope.param["gradeId"]=$state.params.gradeId;
    $scope.classId=$state.params.classId;
    $scope.gradeId = $state.params.gradeId;
    $scope.jType=[1,2,3,4,5,6,7,8];
    $scope.jType2=[0,1,2,3,4,5,6,7];

		
    
    //获取科目字典
            $scope.dict = function () {
                var success = function (result) {
                    $scope.sDict = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key:"SCHEDULE_TIME_ZONE"}, success, error);
            }
    $scope.dict();
    
    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;

		var success = function(result){
			$scope.pageInfo = result.data;
            $scope.getSubject();
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
        $scope.gradeId = $scope.param.gradeId;
        $scope.classId = $scope.param.classId;
		API.post('/edu/schedule/read/all',{gradeId:$scope.param.gradeId,classId:$scope.param.classId},success,error);

	}

	$scope.search();
    //
    $scope.gradelist = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    $scope.gradelist = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/grade/read/list', $scope.param, success, error);

            }
    $scope.gradelist();

    $scope.getclasslist2 = function () {
                var success = function (result) {
                    $scope.classlist = result.data;
                    if($scope.classlist.list.length!=0){
                        $scope.param.classId=$scope.classlist.list[0].id+"";
                    }else{
                        $scope.classlist.list=[];
                    }
                    console.log($scope.classlist);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/class/read/list',{gradeId:$scope.param.gradeId}, success, error);

            }

    $scope.getclasslist = function () {
                var success = function (result) {
                    $scope.classlist = result.data;
                    console.log($scope.param.classId);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/class/read/list',{gradeId:$scope.param.gradeId}, success, error);

            }

    $scope.getclasslist();


	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
    //获取班级所有科目
    $scope.getSubject = function(){
            var success = function(result){
                $scope.sType = result.data;
             
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/subjectGroup/read/class',{gradeId:$scope.param.gradeId,classId:$scope.param.classId},success,error);
        }

    $scope.getSubject();
   

    //添加课程表
    $scope.add = function(){
    	$scope.param["edit"] = true;
        $scope.param.lesson=$scope.pageInfo.length+1;
    }
    //编辑
    $scope.edit = function(index){
    	$scope.pageInfo[index].edit = true;
        // var success = function(result){
        //         $scope.pageInfo[index]=$scope.record= result.data;
        //         $scope.$apply();  
        //     }
        //     var error = function(result){
        //         toaster.clear('*');
        //         toaster.pop('error', '', result.msg);
        //     }
        //     API.post("/edu/schedule/read/detail",{"id":$scope.pageInfo[index].id},success,error);
    }
    //添加提交保存

    $scope.save = function(){
       $scope.param["edit"] = false;
        var success = function(result){
            
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");

              
                $timeout(function(){
                    
                    $scope.search();
                    //location.reload();
                },500);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            $scope.param["eduClass.id"]=$scope.param.classId;

            recordFormat.format($scope.param,'.');

            API.post('/edu/schedule/add',$scope.param,success,error);
    }
    //编辑提交保存

    $scope.update = function(index){
       $scope.pageInfo[index].edit = false;
        var success = function(result){
            console.log(result);
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $scope.search();
                },100);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            $scope.param["eduClass.id"]=$state.params.classId;
            $scope.record=$scope.pageInfo[index];
            console.log($scope.pageInfo[index]);
            recordFormat.format($scope.record,".");
            API.post('/edu/schedule/update',$scope.record,success,error);
    }

    $scope.do_del = function(id){

        var success = function(result){
                toaster.clear('*');
                toaster.pop('success', "", "删除成功");
                $timeout(function(){
                    $scope.search();
                },1000);
            }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/edu/schedule/delete",{"id":id},success,error);


    }
    //删除操作
    $scope.del = function(id){

        // var success = function(result){
        //         toaster.clear('*');
        //         toaster.pop('success', "", "删除成功");
        //         $timeout(function(){
        //             $scope.search();
        //         },1000);
        //     }
        // var error = function(result){
        //     toaster.clear('*');
        //     toaster.pop('error', '', result.msg);
        // }

        // API.post("/edu/schedule/delete",{"id":id},success,error);

        
        if(id){
            var id = id;
        }else{
            var temp = [];
            for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
            }
            var id = temp.join(",");
        }

        if(id.length==0){
            return false;
        }


        ngDialog.open({
            template:'template/module/tpl/confirm.html',
            controller: 'confirmController',
            className: 'ngdialog-theme-green',
            data:{
                "id":id,
                "callback":$scope.do_del
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })



    }  

                                	
} ]);