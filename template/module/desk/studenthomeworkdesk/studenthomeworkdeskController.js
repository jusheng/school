'use strict';

angular.module('app')
	.controller('studenthomeworkdeskController', ['$rootScope', '$scope', '$http', '$state','$compile','$timeout','ngDialog','API','toaster','recordFormat',
		function($rootScope, $scope, $http, $state,$compile,$timeout,ngDialog,API,toaster,recordFormat) {

			$scope.app_name = "作业管理桌面";
			$scope.desk_name = "studenthomeworkdesk";
			$scope.desk_bj = "studenthomeworkdesk_bj"; //布局管理器class
			$scope.desk_lay_grid = "studenthomeworkdesk_lay_grid"; //桌面容器class

			$scope.loading = true;

			$scope.exis_desk = true;
			$scope.exis_app = true;

			var desk_sign = 12; //桌面的标识 （解决多个桌面之间数据干扰）
			var iconapp_obj = {
							"identify":"my-iconappcontainer",
							"url":"",
							"icon":"icon-th-large",
							"name":"图标应用"
						}
	

			$scope.ico_app_status = false;
			$scope.ico_app_op = function(){
				$scope.ico_app_status = !$scope.ico_app_status;

			}


			//切换布局比例
			$scope.change_setting = function(a){
				if(a!=$scope.settings){
					$scope.save_btn = true;
				}
				$scope.settings = a;

				$scope.save_config();

				//$scope.save_lay();
			}




			//动态编译指令 (对应放在桌面上的app展示) （非常重要）
			$scope.compile_directive = function(){

				/*$scope.my_desk_app = $scope.DATA[0].appL.concat($scope.DATA[0].appM,$scope.DATA[0].appR); //桌面型app
				$scope.my_ico_app = $scope.DATA[1]; //图标型app

				$scope.my_all_desk = $scope.my_desk_app.concat($scope.my_ico_app); //在桌面上的所有app*/
				console.log('需要编译的app(桌面型app)');
				console.log($scope.my_desk_app);

				if($scope.my_desk_app.length>0){
					for (var i = 0; i < $scope.my_desk_app.length; i++) {
						

						var scope = angular.element($('.'+$scope.my_desk_app[i].identify)[0]).scope();
						var link = $compile($('.'+$scope.my_desk_app[i].identify)[0]);

						link(scope);
					}	
				}

				
			}



			// 拖动完成后回调
			$scope.sort_callback = function(){
				$scope.save_config();
				$scope.$apply();
			}


			//添加图标应用容器 （桌面应用）
			var append_icoapp_container = function(){
				console.log('添加图标应用容器');
				$scope.DATA[0].appL.push(iconapp_obj);
				console.log($scope.DATA);

				Jh.Portal.init($scope.DATA[0],$scope.settings,$scope.sort_callback,desk_sign);
				$scope.my_desk_app = $scope.DATA[0].appL.concat($scope.DATA[0].appM,$scope.DATA[0].appR); //桌面型app

				$timeout(function(){
						$scope.compile_directive();
					})

				var data = {
					"module":$scope.desk_name,
					"settings":$scope.settings,
					"desktop":JSON.stringify($scope.DATA)
					//"desktop":''
				}


				API.post('/user/saveDesktop',data,function(){},function(){});


			}


			//根据桌面布局数据初始化桌面
			$scope.init_desk = function(obj){
				$scope.DATA = JSON.parse(obj.desktop);

				$scope.my_desk_app = $scope.DATA[0].appL.concat($scope.DATA[0].appM,$scope.DATA[0].appR); //桌面型app
				$scope.my_ico_app = $scope.DATA[1]; //图标型app

				$scope.my_all_desk = $scope.my_desk_app.concat($scope.my_ico_app); //在桌面上的所有app

				/*桌面应用*/
				$scope.settings = obj.settings;
				Jh.fn.init($scope.DATA[0],desk_sign); 

				if($scope.my_all_desk.length>0){
					Jh.Portal.init($scope.DATA[0],$scope.settings,$scope.sort_callback,desk_sign);

					$timeout(function(){
						$scope.compile_directive();
					})


					//如果只有一个 只能是图标app的容器
					if($scope.my_all_desk.length==1){
						$scope.loading = false;
						$scope.exis_desk = false;
					}


				}else{

					append_icoapp_container();  //首次访问自动添加 图标应用容器 

					$scope.loading = false;
					$scope.exis_desk = false;
				}

				


				var scope = angular.element($('#header')[0]).scope();
				var link = $compile($('#header')[0]);
				link(scope);
				

			}



			//取得页面应用布局
			$scope.get_lay = function(){

				var success = function(result){
					console.log('桌面布局');
					console.log(result);

					if(!result.data){ 

						$scope.my_desk_app = []; //桌面型app
						$scope.my_ico_app = []; //图标型app

						$scope.my_all_desk = []; //在桌面上的所有app



						$scope.DATA = [
								{
									"appL":[iconapp_obj],
									"appM":[],
									"appR":[]
								},
								[]
						];

						/*桌面应用*/
						$scope.settings =  "1:1:1";
						Jh.fn.init($scope.DATA[0],desk_sign); 
						Jh.Portal.init($scope.DATA[0],$scope.settings,$scope.sort_callback,desk_sign);
						
						var data = {
							"module":$scope.desk_name,
							"settings":$scope.settings,
							"desktop":JSON.stringify($scope.DATA)
							//"desktop":''
						}

						
						API.post('/user/saveDesktop',data,function(){},function(){});

						//$scope.add_module();

						$scope.exis_desk = false;


						
						$scope.my_desk_app = $scope.DATA[0].appL.concat($scope.DATA[0].appM,$scope.DATA[0].appR); //桌面型app
						$timeout(function(){
							$scope.compile_directive();
						})


						var scope = angular.element($('#header')[0]).scope();
						var link = $compile($('#header')[0]);
						link(scope);

				
					}else{
						$scope.init_desk(result.data);
						$scope.$apply();
					}

					$scope.loading = false;
					
				}
				var error = function(result){

				}

				API.post('/user/getDesktop',{'module':$scope.desk_name},success,error);

			}


			




			//我的所有应用
			$scope.get_my_app = function(){


			  var success = function(result){
			  	  if(!result.data){
			  	  	$scope.exis_app = false;
			  	  }else{
			  	  	$scope.myapp = result.data;

			  	  	//动态添加一个图标容器 应用
			  	  	$scope.myapp.push(iconapp_obj);



			  	  	$scope.get_lay();  //请求布局    
			  	  }
			  	  $scope.$apply();
			  }

			  var error = function(){

			  }

			  API.post('/user/getUserRoleApp',{},success,error);

			} 

			$scope.get_my_app();
			   

			console.log('我的桌面');                           

			

			function isObjectValueEqual(a, b) {

			    if(a.id != b.id){
			    	return false;
			    }
			 
			    return true;
			}


		
			//删除应用 传递给指令调用
			$scope.del_app = function(name){
			
				console.log($scope.myapp);
				var t = "";	
				var o = null;


				//根据name从所有应用（myapp）中挑出应用对象
				for (var i = 0; i < $scope.myapp.length; i++) {
					if($scope.myapp[i].identify==name){
						t=i;
						o = $scope.myapp[i];
						break;
					}
				}

				//删除图标型
				console.log(o);
				for(var i in $scope.DATA[1]){
					if(isObjectValueEqual(o,$scope.DATA[1][i])){
						
						$scope.DATA[1].splice(i,1);

						//删除图标型应用 桌面肯定是变了
						$scope.save_btn = true;
						break;

					}
				}		


				angular.element('.'+name).remove();




				$scope.save_config();

				//$scope.save_lay();

			}




			//保存布局
			$scope.save_lay = function(){

				var success = function(result){
					console.log(result);
					toaster.clear("*");
					toaster.pop('success', "", "桌面保存成功！");
					$scope.save_btn = false;
					$scope.$apply();
				};

				var error = function(){

				}	

				//$scope.save_config();
				

				var data = {
					"module":$scope.desk_name,
					"settings":$scope.settings,
					"desktop":JSON.stringify($scope.DATA)
					//"desktop":''
				}

				console.log(JSON.stringify($scope.DATA));

				API.post('/user/saveDesktop',data,success,error);

			}


			$scope.add_app_callback = function(obj){

				var add = function(t){

					console.log(t);
					

					if(t.attrs_type){ //桌面型应用
						
						$scope.DATA[0].appL.unshift(obj);

						$('#portal_l').prepend('<div id="'+t.attrs_identify+'" class="groupItem '+ t.attrs_identify  +' box-danger" del-app="del_app" app-identify="'+t.attrs_identify+'" app-url="'+t.attrs_url+'" app-icon="'+t.attrs_icon+'" app-name="'+t.attrs_name+'"></div>');

						//编译该应用
						var scope = angular.element($('.'+t.attrs_identify)[0]).scope();
						var link = $compile($('.'+t.attrs_identify)[0]);
						link(scope);


					}else{  //图标应用
						
						$scope.ico_app_status = true;
						$scope.DATA[1].unshift(t);

						$scope.save_btn = true;

					}

				}

				//批量添加
				if(Object.prototype.toString.call(obj)=='[object Array]'){
					
					for (var i = 0; i < obj.length; i++) {
							add(obj[i]);
					}

				}else{
					add(obj);
					
				}



				console.log('添加后my_desk_app');
				console.log($scope.my_desk_app);
				console.log('添加后$scope.DATA');
				console.log($scope.DATA);


				$scope.save_config();
				//$scope.save_lay();



			}

			$scope.add_module = function(){
			
				/* ngDialog.open({
                    template: 'templateId',
                    className: 'ngdialog-theme-default',
                    width: 650,
                    plain: true
                });*/

				ngDialog.open({
					template: 'template/module/desk/add_app.html',
					controller: 'addappController',
					className: 'ngdialog-theme-green',
					scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/desk/addappController.js').then(function(){
                        		return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                        	});
                        }]}
				});

			}


			$scope.save_config = function(){

				//保存桌面原数据对象
				var old = JSON.stringify($scope.DATA);

				
				console.log($scope.my_desk_app);
				console.log($("#" + Jh.Layout.location.left).sortable("toArray"));
				console.log('中:'+$("#" + Jh.Layout.location.center).sortable("toArray"));
				console.log('右:'+$("#" + Jh.Layout.location.right).sortable("toArray"));

				//根据指令名 重新生成$scope.DATA 中的appL appM appR内容 用于保存
				var direcL= $("#" + Jh.Layout.location.left).sortable("toArray");
				var direcM= $("#" + Jh.Layout.location.center).sortable("toArray");
				var direcR= $("#" + Jh.Layout.location.right).sortable("toArray");
				console.log(direcL);


				//从会员所拥有的app中挑出加到桌面上的 并把对象加到appL中

				$scope.DATA[0].appL = [];
				for (var i = 0; i < direcL.length; i++) {
					for (var j = 0; j < $scope.myapp.length; j++) {
						(direcL[i]==$scope.myapp[j].identify) && ($scope.DATA[0].appL.push($scope.myapp[j]));
					}
				}

				$scope.DATA[0].appM = [];
				for (var i = 0; i < direcM.length; i++) {
					for (var j = 0; j < $scope.myapp.length; j++) {
						(direcM[i]==$scope.myapp[j].identify) && ($scope.DATA[0].appM.push($scope.myapp[j]));
					}
				}

				$scope.DATA[0].appR = [];
				for (var i = 0; i < direcR.length; i++) {
					for (var j = 0; j < $scope.myapp.length; j++) {
						(direcR[i]==$scope.myapp[j].identify) && ($scope.DATA[0].appR.push($scope.myapp[j]));
					}
				}


				$scope.my_desk_app = $scope.DATA[0].appL.concat($scope.DATA[0].appM,$scope.DATA[0].appR); //桌面型app
				$scope.my_ico_app = $scope.DATA[1]; //图标型app

				$scope.my_all_desk = $scope.my_desk_app.concat($scope.my_ico_app); //在桌面上的所有app*/



				// console.log(old);
				// console.log('-------------')
				// console.log(JSON.stringify($scope.DATA));

				if(old != JSON.stringify($scope.DATA)){
					console.log('桌面有修改 需要保存');	
					$scope.save_btn = true;
				}else{
					console.log('桌面没有修改 不需要保存');
				}

			}


}]);




