'use strict';

angular.module('app')
  .controller('mainController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','recordFormat','$compile',
                                  function($rootScope, $scope, $http, $state,Upload,ngDialog,API,recordFormat,$compile) {
     $scope.module = {};


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

    

    

    $scope.slide_status = "";
    $scope.open = function(){
        $scope.slide_status = $scope.slide_status==""?"open":"";

        //打开菜单时 重新渲染
        if($scope.slide_status=="open"){
          
           setTimeout(function(){
                $scope.$parent.myScrollOptions.myScroll.refresh();
           },50);
           

        }

    }          

    $scope.to_url = function(url){
       location.href=url;
       $scope.slide_status = "";
    }

     $scope.get_my_app = function(){
        var temp = [];

        for (var i = 0; i < $scope.module.data.length; i++) {
                temp = temp.concat($scope.module.data[i].children);
            }

        for (var i = 0; i < temp.length; i++) {
                    recordFormat.format(temp[i],'_');
                }
        $scope.myapp = temp;  

     }                                   

     //应用树
     $scope.get_app_tree = function(){
     	var success = function(result){
     		// console.log(result);
            
            if(result.data){
               for (var i = 0; i < result.data.length; i++) {
                    recordFormat.format(result.data[i],'_');
                }
                // console.log(result);
                $scope.module = result;
                $scope.get_my_app(); 
            }
            
            $scope.$apply();

            //$scope.$broadcast("treedataFromParrent", "123");//给所有子controller广播        

     	};
     	var error = function(result){
     		
     	}

     	API.post('/app/read/roletreelist',{},success,error);
     }

      $scope.get_app_tree();




     $scope.logout = function(){

        var success = function(result){
            $state.go('login');
        };

        var error = function(result){

        }

        API.post("/logout",{},success,error);
     }




     $scope.get_user_info = function(){
        var success = function(result){
            // console.log(result);
            $scope.user_data = result.data;
        };

        var error = function(){

        };

        API.post("/read/user/info",{},success,error);
     }   
     $scope.get_user_info();


     //切换角色
     $scope.change_role = function(roleId){
        var success = function(result){
            $state.go("main.desk",{}, {reload: true}); 
        };
        var error = function(){

        }

        API.post("/switch/user",{"roleId":roleId},success,error);
     }
     
     //弹出框
        $scope.feedback = function(){
            ngDialog.open({
                template:'template/module/main/feedback.html',
                controller: 'feedbackController',
                className: 'ngdialog-theme-yellow',
                data:{
                    // "id":$state.params.id,
                    // "activityId":$scope.param.classId,
                    // "callback":$scope.works_list
                },
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/main/feedbackController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    "lib/jquery/jquery.validate.min.js",
                                    "lib/jquery/additional-methods.min.js"
                                    ]);
                            });
                     }]}
            })
        }
         //弹出框
        $scope.check = function(){
            ngDialog.open({
                template:'template/module/main/check.html',
                controller: 'checkController',
                className: 'ngdialog-theme-yellow',
                data:{
                    // "id":$state.params.id,
                    // "activityId":$scope.param.classId,
                    // "callback":$scope.works_list
                },
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/main/checkController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    "lib/jquery/jquery.validate.min.js",
                                    "lib/jquery/additional-methods.min.js"
                                    ]);
                            });
                     }]}
            })
        }
} ]);