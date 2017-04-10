'use strict';

angular.module('app')
	.controller('extraresdetailindexController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
    $scope.app_name = "课外资源";  

    console.log('id:'+$state.params.id);
   	$scope.param = {
   		'id':$state.params.id,
   		'pageNum':1
   	};

   	$scope.relate_list = [];
   	$scope.pages = "";
    $scope.get_detail = function(){
    	var success = function(result){
    		console.log(result);
    		$scope.pages = result.data.pages;
    		// $scope.relate_list = $scope.relate_list.concat(result.data.list);
        $scope.relate_list = result.data.list;
        
        console.log($scope.pages);
        console.log($scope.param.pageNum);
        console.log( result.data);
    		$scope.$apply();
    	}

    	var error = function(){

    	}

    	API.post("/res/extraResource/read/detail/list",$scope.param,success,error);
    }
	$scope.get_detail();

    $scope.search2 = function(id){

        var success = function(result) {
          console.log(result);
          $scope.pageInfo = result.data;

                $scope.$apply();
        }

        var error = function() {
          // body...
        }

        API.post("/res/extraResourceDetail/read/list",{"mainId":id},success,error);
      
    }
    // 判断左边显示什么
    var i = 1;
    $scope.show = 1;
    $scope.get_detail();
    $scope.which = function(i,id){
      if(i==2){
        $scope.show = 2;
        $scope.search2(id)

      }else{
        $scope.show = 1;
        $scope.get_detail()
      }
    }
	 $scope.more = function(){
		$scope.param.pageNum++;

		if($scope.param.pageNum <= $scope.pages){
			$scope.get_detail();
		}

		
	}


}])