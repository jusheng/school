'use strict';

angular.module('app')
	.controller('teacherresdetailController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	   $scope.id = $state.params.id;
	   $scope.type = $state.params.type;
	   $scope.textbookId = $state.params.textbookId;   


	   $scope.view_doc = function(url){


	   	if(!$('#documentViewer').FlexPaperViewer){
	   		setTimeout(function(){
	   			$scope.view_doc(url);
	   		},200);
	   		return false;
	   	}


		$('#documentViewer').FlexPaperViewer(
            { config : {

                //SWFFile : "http://jxt.chenharry.com/group1/M00/00/12/wKgCXlgQUSqAWkOlAAAZdCfs1U4520.swf",
                SWFFile : url,

                Scale : 0.6,
                ZoomTransition : 'easeOut',
                ZoomTime : 0.5,
                ZoomInterval : 0.2,
                FitPageOnLoad : true,
                FitWidthOnLoad : true,
                FullScreenAsMaxWindow : true,
                ProgressiveLoading : false,
                MinZoomSize : 0.2,
                MaxZoomSize : 5,
                SearchMatchAll : false,
                InitViewMode : 'Portrait',
                RenderingOrder : 'flash',
                StartAtPage : '',

                ViewModeToolsVisible : true,
                ZoomToolsVisible : true,
                NavToolsVisible : true,
                CursorToolsVisible : true,
                SearchToolsVisible : true,
                WMode : 'window',
                localeChain: 'en_US'
            }}
   		 );
	}	
	
	$scope.view_video = function(url){

		if(!jwplayer){

			setTimeout(function(){
				$scope.view_video(url);
			},200);

			return false;
		}

		jwplayer("mediaplayer").setup({
		    flashplayer: "res/jwplayer/player.swf",
		    file: url,
		    //image: "jwplayer/preview.png",
		     width: "100%",
		     height: "450px",
		    autostart: false
		});
	}



	   $scope.get_detail = function(){

	   		var success = function(result){
	   			console.log(result);
	   			$scope.detail = result.data;
	   			$scope.$apply();


				if($scope.detail.type=="1" || $scope.detail.type=="2"){
					

					$scope.view_doc($scope.detail.fileSwfUrl);

					
				}else{
					

					$scope.view_video($scope.detail.fileUrl);
				}

					var arr = $scope.detail.fileUrl.split(".");
					$scope.download_url = "/download/fileById?id="+$scope.detail.fileId;
					$scope.download_extension = arr[arr.length-1];
					

					$scope.$apply();

	   		}

	   		var error = function(){

	   		}

	   		API.post("/res/library/read/detail",{"id":$scope.id},success,error);

	   }

	   $scope.get_detail();                          	

}])