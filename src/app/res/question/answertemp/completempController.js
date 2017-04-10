'use strict';

angular.module('app')
	.controller('completempController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload) {


    if(!$state.params.id){
        $scope.record_temp.comple_temp = {
            "c":"",
            "img":[]
        };
    }                                    


    $scope.onContentSelect = function(files){
    	console.log(files.length);

    	angular.forEach(files,function(file){
    		file.upload = Upload.upload({
    			"url":"/upload/file",
    			"data":{file:file},
    			"headers":{'Content-Type':'multipart/form-data'}
    		});

    		file.upload.then(function(response){
    			console.log(response);

    			// $scope.record_temp.pic = response.data.data[0].id;
    			$scope.record_temp.comple_temp.img.push(response.data.data[0].imgUrl);
    		})
    	})
    };

    $scope.del_content_img = function(index){
        $scope.record_temp.comple_temp.img.splice(index,1);
    }




}])
	                                	