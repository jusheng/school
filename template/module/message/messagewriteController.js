'use strict';

angular.module('app')
	.controller('messagewriteController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,toaster,$timeout) {
		
	        $scope.title = "留言";

          	//内容编辑框的样式
		   $scope._simpleConfig = {
		            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
		            toolbars:[['Source','undo','redo','bold','italic','underline','fontsize','fontfamily', 'justifyleft', 
		    'justifyright', 
		    'justifycenter', 
		    'justifyjustify', 'insertimage']],
		            //focus时自动清空初始化时的内容
		            //autoClearinitialContent:true,
		            //关闭字数统计
		            wordCount:false,
		            //关闭elementPath
		            elementPathEnabled:false,
		            "imageActionName": "uploadimage", /* 执行上传图片的action名称 */  
		            "imageFieldName": "upfile", /* 提交的图片表单名称 */  
		            "imageMaxSize": 2048000, /* 上传大小限制，单位B */  
		            "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */  
		            "imageCompressEnable": true, /* 是否压缩图片,默认是true */  
		            "imageCompressBorder": 1600, /* 图片压缩最长边限制 */  
		            "imageInsertAlign": "none", /* 插入的图片浮动方式 */  
		            //"initialFrameHeight":300
		      }

	        // 附件上传
	        $scope.onFileSelect = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){
	        		file.upload = Upload.upload({
	        			"url":"/upload.php",
	        			"data":{file:file}
	        		});

	        		/*file.upload.then(function(response){

	        		})*/

	        	})
	        	
	        };


	  

	        if($state.params.eid){  //从草稿箱点击过来的
	        	//$scope.init($state.params.eid);	
	        }else{
	        	$scope.record = { };
	        }


	        $scope.submit = function(){

	        	var success = function(result){
	        		console.log(result);
	        		toaster.clear('*');
		            toaster.pop('success', "", "操作成功");

		            $timeout(function(){
		            	
		            		$state.go('main.message.sended');
		            	
		            },500);

	        	};

	        	var error = function(result){

	        	};

	        	var name_temp= [];
	        	var ids_temp = [];

	        	for (var i = 0; i < $scope.recipientobj.length; i++) {
	        		name_temp.push($scope.recipientobj[i].name);
	        		ids_temp.push($scope.recipientobj[i].id);
	        	}

	        	$scope.record.recipientNames = name_temp.join(",");
	        	$scope.record.recipientIds = ids_temp.join(",");




	        	console.log('发送私信对象：');
	        	console.log($scope.record);

	        	API.post("/edu/message/add",$scope.record,success,error);	
	        }

	 


	        //从子作用域接到学校通讯录数据
	        $scope.$on('schoolmailList',function(ev,msg){
	        	console.log('消息');
	        	console.log(msg);
	        	if($scope.schoolMailList){
	        		$scope.schoolMailList = $scope.schoolMailList.concat(msg);	
	        	}else{
	        		$scope.schoolMailList = msg;
	        	}
	        	
	        	$scope.$apply();
	        })

			//input光标所在位置 1:收件人 2:抄送人 3：密送人
	        $scope.active = '0';  
	        $scope.change_active = function(v){
	        	$scope.active = v;
	        }

	        $scope.s_name = function(v){
	        	v.selected = true;
	        	$scope.key1 = "";
	        	$scope.set_empName(v);
	        }

	        //设置收件人
	        $scope.set_empName = function(v){

	        	if(v.selected){  //添加


	        		//收信人对象中是否已存在  （老师和学生Id号可能重复）（id号 is_teacher类型）
	        		if($scope.recipientobj){
	        			for (var i = 0; i < $scope.recipientobj.length; i++) {
	        				if(($scope.recipientobj[i].id==v.id) && ($scope.recipientobj[i].is_teacher == v.is_teacher)){
	        					return false;
	        					break;
	        				}
	        			}
		        	}

		        	if($scope.recipientobj){
		        		$scope.recipientobj.push(v);	
		        	}else{
		        		$scope.recipientobj=[];
	        			$scope.recipientobj.push(v);
		        	}


	        	}else{ //删除

	        		if($scope.recipientobj){
		        		if($scope.recipientobj.length==0){
		        			return false;
		        		}
		        	}


	        		var t;
	        		for (var i = 0; i < $scope.recipientobj.length; i++) {
	        			if(($scope.recipientobj[i].id == v.id) && ($scope.recipientobj[i].is_teacher == v.is_teacher)){
	        				t = i;
	        				break;
	        			}
	        		}
	        		if(t!=undefined){
						$scope.recipientobj.splice(t,1);
	        		}
	        		
	        	}

	        	$scope.key1 = "";
	        	
	        }


	        //动态搜索通讯录 (下拉联想菜单)
	        $scope.key1 = "";
	        $scope.myFilter1 = function(item){

	        	return item.name.indexOf($scope.key1) >-1? true:false;
	        }


	        $scope.del = function(index,obj){
	        		

	        		$scope.recipientobj.splice(index,1);

	        		for (var i = 0; i < $scope.schoolMailList.length; i++) {
		        		if($scope.schoolMailList[i].id == obj.id && $scope.schoolMailList[i].is_teacher == obj.is_teacher){
		        			$scope.schoolMailList[i].selected = false;
		        			break;
		        		}
		        	}
	        }



	        function validate(){

			        jQuery('#emailwrite').validate({
			            rules: {
			            	recipientNames_temp: {
			                    required: true
			                },
			                sendContent: {
			                    required: true
			                }
			            },
			            messages: {
			            	recipientNames_temp: {
			                    required: '请填写收信人'
			                }
			            },
			            submitHandler: function() {
			                $scope.submit();
			            }
			        });
		    }

		    validate();



	       

} ]);