'use strict';

angular.module('app')
	.controller('emailforwardController', [ '$rootScope', '$scope', '$http', '$state','API','toaster','$timeout','recordFormat',
	                                function($rootScope, $scope, $http, $state,API,toaster,$timeout,recordFormat) {
		
	        $scope.title = "转发邮件"; 
	        $scope.eid = $state.params.eid;

	        
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



          	/*源邮件信息*/
	        $scope.eid = $state.params.eid;  //邮件ID
			$scope.sendName = $state.params.sendName;  //发件人姓名
			$scope.sendId = $state.params.sendId;  //发件人id
	        
	        console.log($scope.eid);  
	        console.log($scope.sendName);  		
			console.log($scope.sendId); 


			//取得邮件内容
			$scope.get_detail = function(id){

				var success = function(result){
					console.log(result);

					var record = {
						"sendTitle":'转发：'+result.data.inboxTitle,
						"sendContent":'<p><br></p><br><p><p><br><p>------------------ 原始邮件 ------------------<br>'+result.data.inboxContent,
						/*"sendEmpids":$scope.sendId,
						"sendEmpnames":$scope.sendName,*/

						 "sendType":true,   //1:去发送 0：不发送直接保存到草稿箱
						 "isSaveSendBox":true,  //1：发送后保存到发件箱 0：不保存 
						 "receipt":false,  //0 不要求回执 ；1 要求回执 
						 "sendIsurgent":false //是否紧急0 否；1是

					}

					$scope.record = record;
					$scope.$apply();


				};
				var error = function(result){
					console.log(result);
				};

				API.post("/oa/mail/getMailInboxByPk",{"oaMailInboxId":id},success,error);

			}
			$scope.get_detail($scope.eid);  


			$scope.submit = function(){

	        	var success = function(result){
	        		console.log(result);
	        		toaster.clear('*');
		            toaster.pop('success', "", "操作成功");

		             $timeout(function(){
		            	if($scope.record.isSaveSendBox){
		            		$state.go('main.email.sended');
		            	}else{
		            		$state.go('main.email.list');
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
	        		$scope.record.sendEmpmsnames = $scope.record.sendmsnames.join(','); //抄送人名
	        		$scope.record.sendEmpmsids = $scope.record.sendmsids.join(',');		//抄送人Id

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

	        	return item.name.indexOf($scope.key1) >-1? true:false;
	        }
			$scope.myFilter2 = function(item){

	        	return item.name.indexOf($scope.key2) >-1? true:false;
	        }
	        $scope.myFilter3 = function(item){

	        	return item.name.indexOf($scope.key3) >-1? true:false;
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
			            	sendEmpnames: {
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
			            	sendEmpnames: {
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