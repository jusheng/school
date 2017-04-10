'use strict';

var app = angular.module('app', [
    'ui.load', 
    'ui.router', 
    'ngStorage', 
    'brantwills.paging', 
    'oc.lazyLoad',
    'ngDialog',
    'ngImgCrop',
    'treeControl',
    'ivh.treeview',
    'ngFileUpload',
    'ngSanitize'
    ]);

/* Controllers */
angular.module('app')
  .controller('AppCtrl', ['$scope', '$localStorage', '$window','$http','$state','$rootScope',
    function($scope,   $localStorage,   $window ,$http,$state,$rootScope) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
		
        // config
        $scope.app = {
            name: '学习云平台',
            version: '0.0.2',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black-only',
                navbarCollapseColor: 'bg-dark-blue-only',
                asideColor: 'bg-black',

                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        }
        $scope.defaultAvatar = $rootScope.defaultAvatar = 'res/img/np.png';
        
        $scope.logout = function(){
            return $http({
                method:'POST',
                url: '/logout'
            }).then(function(result){
                var d = result.data;
                if(d.httpCode==200){//注销成功
                    deleteUserInfo();
                    $state.go('access.login');
                }
            });
            function deleteUserInfo(){
                $.cookie('_ihome_uid',null);
            }
        }

        $localStorage.settings = $scope.app.settings;

        // save settings to local storage  暂不支持自定义布局
        /*if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }*/
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        //$scope.lang = { isopen: false };
        //$scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

		$.ajaxSetup({
			type : "POST",
			error : function(jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status) {
				case (404):
					alert("未找到请求的资源");
					break;
				}
			}
		});
		$(document).ajaxSuccess(function(event, xhr, settings) {
			if(xhr.responseJSON.httpCode == 401) {
				$state.go('access.login');
                return null;
            } else if(xhr.responseJSON.httpCode == 303) {
            } else if(xhr.responseJSON.httpCode != 200) {
                console.log(xhr.responseJSON);
            	//alert(xhr.responseJSON.msg);
            }
			return event;
		});
    }]);