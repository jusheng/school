'use strict';

angular.module('app')
	.controller('multipletempController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','$compile',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,record_tempFormat,API,Upload,$compile) {

     var create_select = function(l){
    	var char =['A:','B:','C:','D:','E:','F:','G:'];

    	return char[l];
    }

    //单选题答案模板
    if(!$state.params.id){
         $scope.record_temp.multi_answer_temp = [
            {
                "select":"A:",
                "text":"",
                "img":[],
                "is_correct":0
            }
        ];
    }
   


    //勾选正确答案
    $scope.select = function(index){
    	if($scope.record_temp.multi_answer_temp[index].is_correct=='1'){
    		for (var i = 0; i < $scope.record_temp.multi_answer_temp.length; i++) {
    			i!=index && ($scope.record_temp.multi_answer_temp[i].is_correct="0");
    		}
    	}
    }

    //删除一行选项
    $scope.del = function(index){
    	$scope.record_temp.multi_answer_temp.splice(index,1);
    }

    //增加一行
    $scope.add = function(){
        if($scope.record_temp.multi_answer_temp.length>=7){
            return false;
        }
    	$scope.record_temp.multi_answer_temp.push(
    			{
    				"select":create_select($scope.record_temp.multi_answer_temp.length),
		    		"text":"",
		    		"img":[],
		    		"is_correct":0
    			}
    		)

         //渲染一个新的编辑器
        $timeout(function(){
             for (var i = 0; i < $('.include_editor').length; i++) {
                if(!$($('.include_editor')[i]).hasClass("ueditor")){
                   var obj = $($('.include_editor')[i]);   
                }
            }

            obj && obj.addClass('ueditor');

            var scope = angular.element(obj[0]).scope();
            var link = $compile(obj[0]);

            link(scope);
        });
    }


    //答案选项为图片
    $scope.onContentSelect = function(files,index){
        console.log(files.length);

        angular.forEach(files,function(file){
            file.upload = Upload.upload({
                "url":"/upload/file",
                "data":{file:file},
                "headers":{'Content-Type':'multipart/form-data'}
            });

            file.upload.then(function(response){
                console.log(response);

                //$scope.record.pic = response.data.data[0].id;
                $scope.record_temp.multi_answer_temp[index].img.push(response.data.data[0].imgUrl);

            })
        })
    };

     $scope.del_img = function(pindex,index){
        $scope.record_temp.multi_answer_temp[pindex].img.splice(index,1);
    }
                               	
}])	                                	