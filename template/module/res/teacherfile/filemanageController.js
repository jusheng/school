'use strict';

angular.module('app')
	.controller('filemanageController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
	    
	    //创建文件夹
	  $scope.create = function(){

	  		var callback = function(id,name){
	  			console.log(id);
	  			console.log(name);
	  			var success = function(result){
	  				toaster.clear('*');
	  				toaster.pop("success",'',"创建成功！");
	  				$scope.get_directory();

	  				$scope.$emit("folderadd","ok");

	  			}

	  			var error = function(){

	  			}	

	  			API.post("/res/directory/add",{"parentId":id,"name":name},success,error);

	  		}


	  		ngDialog.open({
	            template:'template/module/res/teacherfile/folder.html',
	            controller: 'folderController',
	            className: 'ngdialog-theme-green',
	            data:{
	            	"id":$scope.curr,
	            	"callback":callback
	            },
	            resolve: {
	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
	                        return uiLoad.load('template/module/res/teacherfile/folderController.js').then(function(){
	                            return $ocLazyLoad.load('toaster');
	                        });
	                 }]}
	        })

	  }	


		// 文件上传
        var upload_type1 = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
            "text/plain",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "video/mp4",
            "application/pdf",
            "application/x-zip-compressed"
        ];
        // 附件上传
        $scope.onFileSelect = function(files){
                console.log(files.length);

                angular.forEach(files,function(file){

                    console.log(file);
                    if(upload_type1.join(",").indexOf(file.type)<0){
                        toaster.clear('*');
                        toaster.pop('error', '', "不允许上传该类型文件");
                        return false;
                    }

                    file.upload = Upload.upload({
                        "url":"/res/directory/uploadfile?dirId="+$scope.curr,
                        "data":{file:file},
                        "headers":{'Content-Type':'multipart/form-data'}
                    });

                    file.upload.then(function(response){
                        console.log(response);
                        if(response.status==200){
                        	$timeout(function(){
                        		toaster.clear('*');
                    			toaster.pop('success', '', "上传成功！");
                        	});
                        	
                        	$scope.get_directory();
                        }else{
                        	$timeout(function(){
                        		toaster.clear('*');
                        		toaster.pop('error', '', response.statusText);
                        	});
                        	
                        }
                        
                        // $scope.record.pic = response.data.data[0].id;
                        // $scope.record.cover = response.data.data[0].imgUrl;

                    })

                })
                
          };

      
      //取得当前目录下文件夹和文件    
      $scope.get_directory = function(){
      		var success = function(result){
	   			$scope.file = result.data;
	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/directory/getFiles",{"id":$scope.curr},success,error);
      }
      $scope.get_directory();

      $scope.$on("folderadd",function(){
      	$scope.get_directory();
      })




      //右击标记当前资源项
      $scope.curr_res = null;
      $scope.onShow = function(index){
      	$scope.curr_res = $scope.file[index];
      }

      $scope.onClose = function(index){
      	$scope.curr_res = null;
      }


      var img = {
      	"jpg":"template/img/teacherfile/jpg.png",
      	"png":"template/img/teacherfile/png.png",
      	"gif":"template/img/teacherfile/gif.png",
      	"doc":"template/img/teacherfile/doc.png",
    		"docx":"template/img/teacherfile/doc.png",
    		"ppt":"template/img/teacherfile/ppt.png",
    		"pptx":"template/img/teacherfile/ppt.png",
    		"xls":"template/img/teacherfile/xls.png",
    		"xlsx":"template/img/teacherfile/xls.png",
    		"txt":"template/img/teacherfile/txt.png",
        "pdf":"template/img/teacherfile/pdf.png",
        "mp4":"template/img/teacherfile/mp4.png",
        "zip":"template/img/teacherfile/zip.png",
      }
      $scope.return_url = function(obj){

      		//判断类型
      		var arr = obj.filename.split(".");	
      		var ext = arr[arr.length-1].toLowerCase();


      		return img[ext];
      }


      //分享
      $scope.share = function(){

      		var callback = function(dirId,rangeType,userIds){
      			var success = function(result){
      				toaster.clear('*');
                    toaster.pop('success', '', "分享成功！");

                    $scope.get_directory();

      			}	
      			var error = function(){


      			}
      			if(rangeType == 1){ //分享给全校老师
      				var obj = {
	      				"dirId":dirId,
	      				"rangeType":rangeType,
	      			}
      			}else{   //分享给老师
      				var obj = {
	      				"dirId":dirId,
	      				"rangeType":rangeType,
	      				"userIds":userIds.join(',')
	      			}
      			}
      			

      			console.log(obj);

      			API.post("/res/directory/bindshareDir",obj,success,error);
      		}



      		ngDialog.open({
	            template:'template/module/res/teacherfile/share.html',
	            controller: 'shareController',
	            className: 'ngdialog-theme-green',
	            data:{
	            	"dirId":$scope.curr_res.id,  //要分享的文件夹的ID
	            	"callback":callback
	            },
	            resolve: {
	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
	                        return uiLoad.load('template/module/res/teacherfile/shareController.js').then(function(){
	                            return $ocLazyLoad.load([
	                            	'toaster',
	                            	'ng-iscroll',
	                            	'checklist-model'
	                            	]);
	                        });
	                 }]}
	        })
      }

      //取消分享
      $scope.cancel_share = function(){
      	var success = function(result){
			toaster.clear('*');
        	toaster.pop('success', '', "操作成功！");

        	$scope.get_directory();

		}	
		var error = function(){


		}
		
		API.post("/res/directory/unbindshareDir",{"dirId":$scope.curr_res.id},success,error);	
      }


      //双击文件夹 访问下一级
      $scope.go_next = function(index){
      	  $scope.set_curr(index);
      	  $state.go('main.res.teacherfile.filemanage',{"parentId":index});
      }


      //删除文件
      $scope.del = function(){
		var success = function(result){
			toaster.clear('*');
        	toaster.pop('success', '', "删除成功！");

        	$scope.get_directory();

		}	
		var error = function(){


		}
		
		API.post("/res/directory/delete",{"id":$scope.curr_res.id},success,error);	
      }


      //文件夹 文件移动
      $scope.move = function(){

      		var callback = function(dirId,targetDirId){
      			var success = function(result){
      				toaster.clear('*');
                    toaster.pop('success', '', "操作成功！");

                    $scope.get_directory();

      			}	
      			var error = function(){


      			}
      			
      			console.log(targetDirId);
      			

      			API.post("/res/directory/movefile",{
      				"sourceDirId":$scope.curr,
      				"targetDirId":targetDirId,
      				"sysFileId":dirId
      			},success,error);
      		}

      		ngDialog.open({
	            template:'template/module/res/teacherfile/move.html',
	            controller: 'moveController',
	            className: 'ngdialog-theme-green',
	            data:{
	            	"dirId":$scope.curr_res.id,  //要分享的文件的ID
	            	"callback":callback
	            },
	            resolve: {
	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
	                        return uiLoad.load('template/module/res/teacherfile/moveController.js').then(function(){
	                            return $ocLazyLoad.load([
	                            	'toaster',
	                            	'ng-iscroll'
	                            	]);
	                        });
	                 }]}
	        })
      }


      $scope.return_ext = function(obj){

      		if(obj==null){
      			return false;
      		}
      		//判断类型
      		var arr = obj.filename.split(".");	
      		return arr[arr.length-1].toLowerCase();
      }


      //下载
      $scope.download = function(){
          $('.download_'+$scope.curr_res.id).click();
      }
	  
}])