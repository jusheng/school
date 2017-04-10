'use strict';

angular.module('app')
	.controller('extraresdetailController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
    $scope.app_name = "课外资源";  
    console.log($state.params);
    $scope.wholetitle = $state.params.title;
    $scope.which(1,0);
    $scope.mainId = $state.params.id;
    $scope.resType = $state.params.resType;
    $scope.view_video = function(url,type){

		if(!jwplayer){

			setTimeout(function(){
				$scope.view_video(url);
			},200);

			return false;
		}

		var url_arr = url.split('.');
		var ext = url_arr[url_arr.length-1];


		if(type==2){

			jwplayer("mediaplayer").setup({
				    flashplayer: "res/jwplayer/player.swf",
				    file: url,
				    //image: "jwplayer/preview.png",
				     width: "100%",
				     height: "24px",
				     autostart: false,
				     showeq:true,
				     controlbar:"BOTTOM"
				});


		}else{
			if(ext.toLowerCase()=="mp4"){
				jwplayer("mediaplayer").setup({
				    flashplayer: "res/jwplayer/player.swf",
				    file: url,
				    //image: "jwplayer/preview.png",
				     width: "100%",
				     height: "450px",
				    autostart: false
				});
			}else{
				$('#mediaplayer').html('<object id="movie" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" \
					codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" \
					width="100%" height="450" align="middle">  <param name="allowScriptAccess" value="sameDomain" />  \
					<param name="movie" value="'+url+'" />  <param name="menu" value="false" />  <param name="quality" value="high" /> \
					<param name="bgcolor" value="#000" />   \
					<embed src="'+url+'" menu="false" quality="high" \
					bgcolor="#000" width="100%" height="450" name="movie" \
					align="middle"  allowScriptAccess="sameDomain" type="application/x-shockwave-flash" \
					pluginspage="http://www.macromedia.com/go/getflashplayer" />\
					</object>')
			}
			
		}
		



	}


 //    $scope.get_detail = function(){
 //    	var success = function(result){
 //    		$scope.detail = result.data;
 //    		$scope.$apply();

 //    		if($scope.detail.resType == 2 || $scope.detail.resType == 3){
 //    			$scope.view_video($scope.detail.resUrl,$scope.detail.resType);	
 //    		}
    		
 //    	}

 //    	var error = function(){

 //    	}

 //    	API.post("/res/extraResource/read/detail",{'id':$state.params.id},success,error);
 //    }
	// $scope.get_detail();
	console.log($state.params);
	$scope.search = function(){

	  		var success = function(result) {
	  			console.log(result.data);
	  			$scope.pageInfo = result.data;

                $scope.$apply();
	  		}

	  		var error = function() {
	  			// body...
	  		}

	  		API.post("/res/extraResourceDetail/read/list",{"mainId":$state.params.id},success,error);
	  	
	}

	$scope.search();


}])