'use strict';

angular.module('app')
	.controller('qatempController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,record_tempFormat,API,Upload) {

	if(!$state.params.id){
		$scope.record_temp.qa_temp = {
			"c":"",
			"img":[]
		}     		
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
    			// $scope.record_temp.imgUrl = response.data.data[0].imgUrl;
    			$scope.record_temp.qa_temp.img.push(response.data.data[0].imgUrl);
    		})
    	})
    };

    $scope.del_content_img = function(index){
        $scope.record_temp.qa_temp.img.splice(index,1);
    }


}])
	                                	