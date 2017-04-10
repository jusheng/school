'use strict';

    angular.module('app')
        .controller('selectController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster','API','recordFormat','ngDialog','Dtree','$compile',
                                             function($scope, $rootScope, $state, $timeout, toaster,API,recordFormat,ngDialog,Dtree,$compile) {
	

	if($scope.record.parentId){
		$scope.curr = $scope.record.parentId;
	}else{
		$scope.curr = '-1';
	}	

	$scope.$parent.myScrollOptions = {
            snap: false,
            hScrollbar:true,
            vScrollbar:true,
            scrollbars:true,
            fadeScrollbars:true,
            click: !0,
           /* onScrollEnd: function ()
            {
                alert('finshed scrolling');
            }*/
    };    

     $scope.onlinehomework_knowledge = Dtree.dtreeFactory('onlinehomework_knowledge','template/js/dtree/img/','no','no');


	$scope.append_item = function(result){

	   		$scope.onlinehomework_knowledge.add(
	 				  0, 
					  -1,
					  '所有部门',
					  "setvalue('0','所有部门','-1',false)",
					  '全部图书',
					  "_self",
					  false);  

		   	for (var i = 0; i < result.data.length; i++) {
		   		

		   		$scope.onlinehomework_knowledge.add(
	 				  result.data[i].id, 
					  result.data[i].pid, 
					  result.data[i].text+'<i class="glyphicon glyphicon-ok" ng-show="curr==\''+result.data[i].id+'\'"></i>',
					  "setvalue('"+result.data[i].id+"','"+result.data[i].text+"','"+result.data[i].pid+"',"+result.data[i].disabled+")",
					  result.data[i].text,
					  "_self",
					  false
					  );  	
		   	}


		   	$('.onlinehomework_knowledge').html($scope.onlinehomework_knowledge.toString());
		  	
	  }

	

	var init = function(){
		console.log('init');
		$scope.append_item($scope.all_dept);


		var scope = angular.element($('.onlinehomework_knowledge')[0]).scope();
		var link = $compile($('.onlinehomework_knowledge')[0]);

		link(scope);

		$scope.$apply();


	}

	var callback = function(){
		if($('.onlinehomework_knowledge').length==0){
			setTimeout(function(){
				callback();
			},200)

			return false;
		}

		init();
	}

	callback();
	
	 	
    
    $scope.setvalue = function(id,text,pid,disabled){

    	if(!disabled){
    		if(pid!="-1"){
				$scope.curr = id;
    			$scope.setParentId(id,text);
    		}
    	}else{
    		$timeout(function(){
    			toaster.clear("*");
    			toaster.pop("error","","不允许选择当前部门或它的子部门");
    		})
    	}

    	
    }                         	


}])