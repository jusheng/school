'use strict';

angular.module('app')
	.controller('knowledgeController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog','$compile','Dtree',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload,ngDialog,$compile,Dtree) {

	 console.log($scope.record);  

	 

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




	 $scope.create_dtree_grid = function(){

	 		$("body").append('<iframe id="temp_frame" style="height:0;width:0;"></iframe>');  
	 		document.getElementById("temp_frame").contentWindow.document.write($scope.onlinehomework_knowledge);
	 		$scope.dtree_grid = $(document.getElementById("temp_frame").contentWindow.document.body).html();
	 		$scope.$apply();

	 		$('.onlinehomework_knowledge').html($scope.dtree_grid);
	 		$("#temp_frame").remove();

	 }



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
	 	
	 	console.log(result);

	 	var temp = [];
	 	var inner = function(obj){
	 		for (var i = 0; i < obj.length; i++) {
	 			temp.push(obj[i]);
	 			if(obj[i].children && obj[i].children.length>0){
	 				inner(obj[i].children);
	 			}
	 		}
	 	}
	 	
	 	if(result.data && result.data.length>0){

	 		//先添加根节点
	 		$scope.onlinehomework_knowledge.add(
	 				  result.data[0].id, 
					  -1,
					  result.data[0].label,
					  "setvalue('0','"+result.data[0].label+"')",
					  
					  result.data[0].label,
					  "_self",
					  false);

	 		if(result.data[0].children && result.data[0].children.length>0){  //有子项
	 			inner(result.data[0].children);  //把所有节点数据都转成平行的
	 			console.log(temp);

	 			for (var i = 0; i < temp.length; i++) {
	 				$scope.onlinehomework_knowledge.add(
		 				  temp[i].id, 
						  temp[i].pid,
						  temp[i].label,
						  "setvalue('"+temp[i].id+"','"+temp[i].label+"')",
						  temp[i].label,
						  "_self",
						  false);
	 			}
	 		}
	 	}

	 	// $scope.mydtree.add(0,
			// 		  -1,
			// 		  "根目录",
			// 		  "javascript:setvalue('0','根目录')",
			// 		  "根目录",
			// 		  "_self",
			// 		  false);
	 }

   //知识点树
	$scope.get_tree = function(textbookId,textbookName){
		// $scope.record.textbookId = textbookId;
		// $scope.record.textbookName = textbookName;
		var success = function(result){

			$scope.treedata = result.data;
			$scope.append_item(result);
			$scope.create_dtree_grid();

			var scope = angular.element($('.onlinehomework_knowledge')[0]).scope();
			var link = $compile($('.onlinehomework_knowledge')[0]);

			link(scope);
			$scope.$parent.myScrollOptions.myScroll && 
			$scope.$parent.myScrollOptions.myScroll.refresh &&
			$scope.$parent.myScrollOptions.myScroll.refresh();

			$scope.$apply();
			
		}
		var error = function(){

		}

		var obj = {
			// "gradeId":$scope.record.grade.base_id,
			// "textbookId":textbookId,
			"subjectId":$scope.record.subject.id
		};
	
		API.post('/res/knowledge/treelist',obj,success,error);
	}
	$scope.get_tree();


	$scope.setvalue = function(id,name){
		$scope.curr = id;
		if(id==0){
			return false;
		}
		$scope.record.knowledgePoint = {
			"name":name,
			"Id":id
		}
	}

	

}])
