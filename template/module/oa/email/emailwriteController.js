'use strict';

angular.module('app')
	.controller('emailwriteController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,toaster,$timeout) {
		
	        $scope.title = "写信";
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

	        $scope.init = function(id){

	        	var success = function(result){
	        		$scope.record = result.data;

					$scope.record.sendids = $scope.record.sendEmpids.split(',');     //收件人Id
	        		$scope.record.sendnames = $scope.record.sendEmpnames.split(','); //收件人名

	        		delete $scope.record.sendEmpids;
	        		delete $scope.record.sendEmpnames;

	        		if($scope.record.sendEmpcsnames != null){
		        		$scope.record.sendcsnames = $scope.record.sendEmpcsnames.split(','); //抄送人名
		        		$scope.record.sendcsids = $scope.record.sendEmpcsids.split(',');		//抄送人Id


		        		delete $scope.record.sendEmpcsnames;
		        		delete $scope.record.sendEmpcsids;
		        	}


		        	if($scope.record.sendEmpmsnames != null){
		        		 $scope.record.sendmsnames = $scope.record.sendEmpmsnames.split(','); //密送人名
		        		 $scope.record.sendmsids = $scope.record.sendEmpmsids.split(',');		//密送人Id

		        		delete $scope.record.sendEmpmsnames;
		        		delete $scope.record.sendEmpmsids;
		        	}

		        	 $scope.record.sendType = true,   //1:去发送 0：不发送直接保存到草稿箱
		        	 $scope.record.isSaveSendBox = true,  //1：发送后保存到发件箱 0：不保存 
		        	/* $scope.record.receipt = false,  //0 不要求回执 ；1 要求回执 
		        	 $scope.record.sendIsurgent = false //是否紧急0 否；1是*/

		        		

	        		$scope.$apply();
	        	};

	        	var error = function(result){
	        		//alert(result);
	        	};

	        	API.post("/oa/mail/getMailOutboxByPk",{"oaMailSendId":id},success,error);
	        }


	  

	        if($state.params.eid){  //从草稿箱点击过来的
	        	$scope.init($state.params.eid);	
	        }else{
	        	$scope.record = {
		        	 "sendType":true,   //1:去发送 0：不发送直接保存到草稿箱
		        	 "isSaveSendBox":true,  //1：发送后保存到发件箱 0：不保存 
		        	 "receipt":false,  //0 不要求回执 ；1 要求回执 
		        	 "sendIsurgent":false //是否紧急0 否；1是

		        };
	        }






	        $scope.submit = function(){

	        	var success = function(result){
	        		console.log(result);
	        		toaster.clear('*');
		            toaster.pop('success', "", "操作成功");

		            $timeout(function(){
		            	if($scope.record.isSaveSendBox){
		            		$state.go('main.email.sended');
		            	}else{
		            		if($scope.record.sendType){
		            			$state.go('main.email.edit');
		            		}else{
		            			$state.go('main.email.list');
		            		}
		            		
		            	}
		            },500);

	        	};

	        	var error = function(result){

	        	};

	        	recordFormat.format($scope.record,'.');


	        	$scope.record.sendEmpnames = $scope.record.sendnames.join(','); //收件人名
	        	$scope.record.sendEmpids = $scope.record.sendids.join(',');		//收件人Id

	        	delete $scope.record.sendnames;
	        	delete $scope.record.sendids;

	        	if($scope.record.sendcsnames){
	        		$scope.record.sendEmpcsnames = $scope.record.sendcsnames.join(','); //抄送人名
	        		$scope.record.sendEmpcsids = $scope.record.sendcsids.join(',');		//抄送人Id


	        		delete $scope.record.sendcsnames;
	        		delete $scope.record.sendcsids;
	        	}


	        	if($scope.record.sendmsnames){
	        		$scope.record.sendEmpmsnames = $scope.record.sendmsnames.join(','); //密送人名
	        		$scope.record.sendEmpmsids = $scope.record.sendmsids.join(',');		//密送人Id

	        		delete $scope.record.sendmsnames;
	        		delete $scope.record.sendmsids;
	        	}



	        	for(var i in $scope.record){
	        		if($scope.record[i]==true){
	        			$scope.record[i]=1;
	        		}
	        		if($scope.record[i]==false){
	        			$scope.record[i]=0;
	        		}

	        		if($scope.record[i] == null){
	        			delete $scope.record[i];
	        		}

	        	}	

	        	console.log('发送邮件数据对象：');
	        	console.log($scope.record);

	        	API.post("/oa/mail/saveOaMailSend",$scope.record,success,error);	
	        }

	        //保存到草稿箱
	        $scope.save = function(){
	        	$scope.record.sendType = false;	
	        	$scope.record.isSaveSendBox = false;
	        }



	        //从子作用域接到学校通讯录数据
	        $scope.$on('schoolmailList',function(ev,msg){
	        	console.log(msg);
	        	$scope.schoolMailList = msg;
	        	$scope.$apply();
	        })

			//input光标所在位置 1:收件人 2:抄送人 3：密送人
	        $scope.active = '0';  
	        $scope.change_active = function(v){
	        	$scope.active = v;
	        }


	        //设置收件人
	        $scope.set_empName = function(v){
	        	
	        	$scope.key1="";
	        	$scope.key2="";
	        	$scope.key3="";

	        	if($scope.active=="0"){
	        		return false;
	        	}

	        	if($scope.active=="1"){ //设置收件人
	        		var n = $scope.record.sendnames;
	        		var i = $scope.record.sendids;
	        		if(n){
						if(n.indexOf(v.name)>-1 && i.indexOf(v.id)>-1){
		        			return false;
		        		}
	        		}
	        		

	        		if(n){
						$scope.record.sendnames.push(v.name);
	        		}else{
	        			$scope.record.sendnames=[];
	        			$scope.record.sendnames.push(v.name);
	        		}

	        		if(i){
						$scope.record.sendids.push(v.id);
	        		}else{
	        			$scope.record.sendids=[];
	        			$scope.record.sendids.push(v.id);
	        		}

	        	}

	        	if($scope.active=="2"){ //设置抄送人

	        		var n = $scope.record.sendcsnames;
	        		var i = $scope.record.sendcsids;
	        		if(n){
						if(n.indexOf(v.name)>-1 && i.indexOf(v.id)>-1){
		        			return false;
		        		}
	        		}
	        		

	        		if(n){
						$scope.record.sendcsnames.push(v.name);
	        		}else{
	        			$scope.record.sendcsnames=[];
	        			$scope.record.sendcsnames.push(v.name);
	        		}

	        		if(i){
						$scope.record.sendcsids.push(v.id);
	        		}else{
	        			$scope.record.sendcsids=[];
	        			$scope.record.sendcsids.push(v.id);
	        		}


	        	}

	        	if($scope.active=="3"){ //设置密送人

	        		var n = $scope.record.sendmsnames;
	        		var i = $scope.record.sendmsids;
	        		if(n){
						if(n.indexOf(v.name)>-1 && i.indexOf(v.id)>-1){
		        			return false;
		        		}
	        		}
	        		

	        		if(n){
						$scope.record.sendmsnames.push(v.name);
	        		}else{
	        			$scope.record.sendmsnames=[];
	        			$scope.record.sendmsnames.push(v.name);
	        		}

	        		if(i){
						$scope.record.sendmsids.push(v.id);
	        		}else{
	        			$scope.record.sendmsids=[];
	        			$scope.record.sendmsids.push(v.id);
	        		}
	        	}
	        }


	        //动态搜索通讯录 (下拉联想菜单)
	        $scope.key1 = "";
	        $scope.key2 = "";
	        $scope.key3 = "";
	        $scope.myFilter1 = function(item){

	        	var s = (item.name.indexOf($scope.key1) >-1? true:false) || (item.email.indexOf($scope.key1) >-1? true:false);
	        	return s;
	        }
			$scope.myFilter2 = function(item){

	        	var s = (item.name.indexOf($scope.key2) >-1? true:false) || (item.email.indexOf($scope.key2) >-1? true:false);
	        	return s;
	        }
	        $scope.myFilter3 = function(item){

	        	var s = (item.name.indexOf($scope.key3) >-1? true:false) || (item.email.indexOf($scope.key3) >-1? true:false);
	        	return s;
	        }


	        $scope.del = function(index,sign){
	        	console.log(index);
	        	console.log(sign);
	        	if(sign=='1'){  //删除收件人
	        		$scope.record.sendnames.splice(index,1);
	        		$scope.record.sendids.splice(index,1);

	        		if($scope.record.sendnames.length==0){
	        			delete $scope.record.sendnames;
	        			delete $scope.record.sendids;
	        		}

	        	}
	        	if(sign=='2'){  //删除抄送人
	        		$scope.record.sendcsnames.splice(index,1);
	        		$scope.record.sendcsids.splice(index,1);

	        		if($scope.record.sendcsnames.length==0){
	        			delete $scope.record.sendcsnames;
	        			delete $scope.record.sendcsids;
	        		}

	        	}
	        	if(sign=='3'){  //删除密送人
	        		$scope.record.sendmsnames.splice(index,1);
	        		$scope.record.sendmsids.splice(index,1);

	        		if($scope.record.sendmsnames.length==0){
	        			delete $scope.record.sendmsnames;
	        			delete $scope.record.sendmsids;
	        		}
	        		
	        	}

	        }



	        function validate(){

			        jQuery('#emailwrite').validate({
			            rules: {
			            	sendnames: {
			                    required: true
			                },
			                sendTitle: {
			                    required: true
			                },
			                sendContent: {
			                    required: true
			                }
			            },
			            messages: {
			            	sendnames: {
			                    required: '请填写收件人'
			                },
			                sendTitle: {
			                    required: '请填写主题'
			                },
			                sendContent: {
			                    required: '请填写邮件内容'
			                }
			            },
			            submitHandler: function() {
			                $scope.submit();
			            }
			        });
		    }

		    validate();



	       

} ]);