'use strict';

angular.module('app')
	.controller('bookclassppController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog','$compile','Dtree',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload,ngDialog,$compile,Dtree) {

	
	 
	 $scope.curr = -1;

	if($state.includes("main.book.bookclassedit")){  //分类 修改
			
			$scope.curr = $scope.record.parentId;
	}

	if($state.includes("main.book.bookedit")){  //图书 修改
		
			$scope.curr = $scope.record.typeCode
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


	 //重写展开 关闭函数
	$scope.onlinehomework_knowledge.o = function(id){
		var cn = this.aNodes[id];
		this.nodeStatus(!cn._io, id, cn._ls);
		console.log('fff');
		cn._io = !cn._io;
		if (this.config.closeSameLevel) this.closeLevel(cn);
		if (this.config.useCookies) this.updateCookie();


		$scope.$parent.myScrollOptions.myScroll && 
		$scope.$parent.myScrollOptions.myScroll.refresh &&
		$scope.$parent.myScrollOptions.myScroll.refresh();

	}



	$scope.append_item = function(result){

	   		$scope.onlinehomework_knowledge.add(
	 				  0, 
					  -1,
					  '顶级分类',
					  "setvalue('0','顶级分类')",
					  '全部图书',
					  "_self",
					  false);  

		   	for (var i = 0; i < result.data.length; i++) {
		   		
		   		$scope.onlinehomework_knowledge.add(
	 				  result.data[i].id, 
					  result.data[i].parentId, 
					  result.data[i].name,
					  "setvalue('"+result.data[i].id+"','"+result.data[i].name+"')",
					  result.data[i].name,
					  "_self",
					  false);  	
		   	}

		   	$('.onlinehomework_knowledge').html($scope.onlinehomework_knowledge.toString());
		 	  
	   }

  // 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.append_item(result);


	   			var scope = angular.element($('.onlinehomework_knowledge')[0]).scope();
				var link = $compile($('.onlinehomework_knowledge')[0]);

				link(scope);

	   			console.log($scope.sorts);
	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/booksClassify/list",{},success,error);

	   	}
	$scope.get_class();

	if($scope.record.parentId){
		$scope.curr = $scope.record.parentId;
	}

	if($scope.record.typeCode){
		$scope.curr = $scope.record.typeCode;
	}

    //$scope.curr = $state.params.sorts_id;

	$scope.setvalue = function(id,name){
		$scope.curr = id;
		// if(id==0){
		// 	return false;
		// }


		if($state.includes("main.book.bookclassadd") || $state.includes("main.book.bookclassedit")){  //分类添加 修改
			$scope.record.parentId = id;
			$scope.record.parentIdNameref = name;
		}

		if($state.includes("main.book.bookadd") || $state.includes("main.book.bookedit")){  //图书添加 修改
			$scope.record.typeCode = id;
			$scope.record.typeCodeNameref = name;
		}

	}

	

}])
