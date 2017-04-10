'use strict';

angular.module('app')
    .controller('scoreClassInputController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API', 'recordFormat',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API, recordFormat) {

            $scope.app_name = "学生成绩";
            $scope.param = {};
            $scope.loading = false;
            $scope.classId = $state.params.id;
            $scope.ids = $state.params.ids;

            $scope.scoresubject = $scope.ids.split(",");
            $scope.practiseId = $state.params.practiseId;

            //获取科目字典
            $scope.dict = function () {
                var success = function (result) {
                    console.log(result.data);
                    $scope.sDict = result.data;
                    $scope.dict = [];
                    for(var i in $scope.sDict){
                        $scope.dict.push($scope.sDict[i].code);
                    }

                    $scope.$apply();

                    $scope.search();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/subject/read/dict', {}, success, error);
            }
            $scope.dict();

            //获取班级学生
            $scope.search = function () {
                var success = function (result) {
                    console.log(result);
                    $scope.pageInfo = result.data;

                   //各科成绩如果是-1 改成空
                     var s = $scope.dict.join(',');
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        for(var t in $scope.pageInfo.list[i]){
                            if(s.indexOf(t) >-1 && $scope.pageInfo.list[i][t]==-1){
                                $scope.pageInfo.list[i][t]="";
                            }
                        }
                    }

                    //给每一课添加编辑标记
                    var temp = {};
                    for (var i = 0; i < $scope.dict.length; i++) {
                        temp[$scope.dict[i]] = '0';
                    }
                    
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].editSign = JSON.parse(JSON.stringify(temp));
                    }




                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.param["classId"] = $state.params.id;
                $scope.param["practiseId"] = $state.params.practiseId;
                API.post('/res/practise/score/read/list', $scope.param, success, error);
            }
            

            //  获取录入成绩的科目

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            //翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };
            //
            $scope.edit = function (index) {
                $scope.pageInfo.list[index].edit = true;

                $timeout(function(){

                   $('input[class^=input'+index+']').focus(); 

                });
            }
            $scope.edit1 = function (index,m) {
                $scope.pageInfo.list[index].editSign[$scope.sDict[m].code] = 1;

                $timeout(function(){
                   
                   $('.input'+index+'_'+m).focus(); 
                });
            }


            $scope.update = function (index,m) {

                // if(m){
                //     if($scope.pageInfo.list[index][$scope.sDict[m].code] ==""){
                //         $scope.pageInfo.list[index][$scope.sDict[m].code] = -1;
                //     }
                // }

                $scope.pageInfo.list[index].editSign[$scope.sDict[m].code] = 0;
                //$scope.pageInfo.list[index].edit = false;
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                       //$scope.search();
                    }, 500);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record = $scope.pageInfo.list[index];
                //recordFormat.format($scope.record, ".");
                API.jsonpost("/res/practise/score/update", $scope.record, success, error);
            }


            var upload_type1 = [
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ]; 
            //导入信息
            $scope.onFileSelect = function(files){
                angular.forEach(files,function(file){


                    if(upload_type1.join(",").indexOf(file.type)<0){
                        toaster.clear('*');
                        toaster.pop('error', '', "只允许上传xls,xlsx类型文件");
                        return false;
                    }
                    toaster.clear("*");
                    toaster.pop(
                            {
                                "type":"wait",
                                "title":"",
                                "body":"正在导入..."
                            }
                        );

                    file.upload = Upload.upload({
                        "url":"/res/practise/score/importTemplate?practiseId="+$scope.practiseId,
                        headers: {'Content-Type': 'multipart/form-data'},
                        "data":{file:file},
                    }).progress(function (evt) {
                        //进度条
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total) + '%';
                        console.log('progess:' +  $scope.progress + '%');

                        if($scope.progress=='100%'){
                            $scope.progress = '【上传完成】';
                            $timeout(function(){
                                 $scope.progress = '';
                            },2000)

                            $timeout(function(){
                                
                            })
                        }


                    });

                    file.upload.then(function(response){
                        console.log(response);

                        if(response.data.httpCode==200){
                            $timeout(function(){
                                toaster.clear('*');
                                $scope.search();
                                toaster.pop('success', '', response.data.msg);
                            })
                            

                        }else{
                            $timeout(function(){
                                toaster.clear('*');
                                toaster.pop('error', '', response.data.msg);
                            })
                            
                        }

                    })

                })
            };

        }]);