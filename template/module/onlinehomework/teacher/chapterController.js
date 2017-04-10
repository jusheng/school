'use strict';

angular.module('app')
	.controller('chapterController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog','$compile','Dtree',
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


	 //取得教材列表
	 $scope.get_textbook = function(subjectId,gradeId){
        	$scope.textbook = null;
        	var success = function(result){
				$scope.textbook = result.data;

				if($scope.textbook.length > 0){
					$scope.get_tree($scope.textbook[0].id,$scope.textbook[0].name);
				}

				$scope.$apply();

				$scope.$parent.myScrollOptions.myScroll && 
				$scope.$parent.myScrollOptions.myScroll.refresh &&
				$scope.$parent.myScrollOptions.myScroll.refresh();

			}
			var error = function(){

			}

        	API.post("/res/textbook/read/alllist",{"subjectId":$scope.record.subject.id,"gradeId":$scope.record.grade.base_id},success,error);	
    }
    $scope.get_textbook();


	 $scope.create_dtree_grid = function(){

	 		$("body").append('<iframe id="temp_frame" style="height:0;width:0;"></iframe>');  
	 		document.getElementById("temp_frame").contentWindow.document.write($scope.onlinehomework_chapter);
	 		$scope.dtree_grid = $(document.getElementById("temp_frame").contentWindow.document.body).html();
	 		$scope.$apply();

	 		$('.onlinehomework_chapter').html($scope.dtree_grid);
	 		$("#temp_frame").remove();

	 }
	
	 $scope.$watch('onlinehomework_chapter',function(){
	 	if($scope.onlinehomework_chapter){

			//重写展开 关闭函数
			$scope.onlinehomework_chapter.o = function(id){
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

	 	}
	 })	

	 $scope.append_item = function(result){
	 	 $scope.onlinehomework_chapter = Dtree.dtreeFactory('onlinehomework_chapter','template/js/dtree/img/','no','no');
	 	console.log($scope.onlinehomework_chapter);

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
	 		$scope.onlinehomework_chapter.add(
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
	 				$scope.onlinehomework_chapter.add(
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

	 	// $scope.mydtree.add(
	 		// 			0,
			// 		  -1,
			// 		  "根目录",
			// 		  "javascript:setvalue('0','根目录')",
			// 		  "根目录",
			// 		  "_self",
			// 		  false);
	 }
   
   $scope.$watch("onlinehomework_chapter.o",function(){
   		console.log('执行了');

   });



   //知识点树
	$scope.get_tree = function(textbookId,textbookName){
		$scope.record.textbookId = textbookId;
		$scope.record.textbookName = textbookName;
		var success = function(result){

			$scope.treedata = result.data;
			$scope.append_item(result);
			$scope.create_dtree_grid();

			var scope = angular.element($('.onlinehomework_chapter')[0]).scope();
			var link = $compile($('.onlinehomework_chapter')[0]);

			link(scope);
			$scope.$parent.myScrollOptions.myScroll && 
			$scope.$parent.myScrollOptions.myScroll.refresh &&
			$scope.$parent.myScrollOptions.myScroll.refresh();



			$scope.$apply();
			
		}
		var error = function(){

		}

		var obj = {
			"gradeId":$scope.record.grade.base_id,
			"textbookId":textbookId,
			"subjectId":$scope.record.subject.id
		};
	
		API.post('/res/chapter/treelist',obj,success,error);
	}

	$scope.setvalue = function(id,name){
		$scope.curr = id;
		if(id==0){
			return false;
		}
		$scope.record.chapter = {
			"name":name,
			"Id":id
		}
	}

	

}])
