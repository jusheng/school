// config
window.APP = { version : 'v=20160509' };

angular.module('app')
  .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','ngDialogProvider',
	    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide,ngDialogProvider) {
	        // lazy controller, directive and service
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
	        app.constant   = $provide.constant;
	        app.value      = $provide.value;


           ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                    console.log(ngDialogProvider);
                }
            });

	    }
	])
	.config(function(){
        jQuery.validator.setDefaults({
            errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
            errorElement: 'div',
            errorPlacement: function(error, e) {
                var eleErrContains = e.parents('.tdgroup');
                if(eleErrContains.length == 0){
                    eleErrContains = e.parents('.form-group > div');
                }
                eleErrContains.append(error);
            },
            highlight: function(e) {
                $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                $(e).closest('.help-block').remove();
            },
            success: function(e) {
                e.closest('.form-group').removeClass('has-success has-error');
                e.closest('.help-block').remove();
            }
        });
        $.extend({'cookie':function(name, value, options) {
                if(cookieIsEnable){
                    if (typeof value != 'undefined') { // name and value given, set cookie
                        options = options || {};
                        if (value === null) {
                            value = '';
                            options.expires = -1;
                        }
                        var expires = '';
                        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                            var date;
                            if (typeof options.expires == 'number') {
                                date = new Date();
                                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                            } else {
                                date = options.expires;
                            }
                            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                        }
                        var path = options.path ? '; path=' + options.path : '';
                        var domain = options.domain ? '; domain=' + options.domain : '';
                        var secure = options.secure ? '; secure' : '';
                        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                    } else { // only name given, get cookie
                        var cookieValue = null;
                        if (document.cookie && document.cookie != '') {
                            var cookies = document.cookie.split(';');
                            for (var i = 0; i < cookies.length; i++) {
                                var cookie = jQuery.trim(cookies[i]);
                                // Does this cookie string begin with the name we want?
                                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    }
                }else{
                    alert('cookie 禁用');
                }
                function cookieIsEnable(){
                    return window.navigator.cookieEnabled;
                }
            }
        });
    })
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:false,
          events: true,
          modules: [{
              name: 'toaster',
              files: [
                  'lib/angular/toaster.js',
                  'lib/angular/toaster.css'
              ]
          },
          {
            name:"checklist-model",
            files:[
                'template/js/checklist-model.js'
            ]
          },
          {
            name:"ng-iscroll",
            files:[
                'template/js/ng-iscroll/iscroll.js',
                'template/js/ng-iscroll/ng-iscroll.min.js',
                'template/js/ng-iscroll/iscroll.css',
            ]
          },
          {
            name:"ng.ueditor",
            files:[
                "template/js/angular-ueditor.js"
            ]
          },
          {
            name:"angular-echarts",
            files:[
              "lib/angular/echarts-all.js",
              "lib/angular/angular-echarts.js"
            ]
          },
          {
            name:"timeago",
            files:[
              "lib/angular/timeago.js"
            ]
          },
          {
            name:"Dtree",
            files:[
              "template/js/dtree/dtree.js",
              "template/js/dtree/dtreeck.css"
            ]
          },
          {
            name:"ng-context-menu",
            files:[
              "template/js/ng-context-menu.min.js"
            ]
          },
          ]
      });
    }])
    .filter('label', function() { // 显示为标签
		  return function(input, s) {
			  var l = input.split(s);
			  var r = '';
			  for(var i=0; i<l.length; i++) {
				  r += '<label class="label label-info">' + l[i] + '</label>\n';
			  }
			  return r;
		  }
    })
    .filter('trustHtml', function ($sce) { // 安全HTML
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    })
    .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window), 
        _mb = 768, 
        wrap = $('.app-aside'), 
        next, 
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }
         
          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
}]).config(function(ivhTreeviewOptionsProvider) {
       ivhTreeviewOptionsProvider.set({
         defaultSelectedState: false,
         validate: true,
         expandToDepth: -1,
         twistieCollapsedTpl: '+',
         twistieExpandedTpl: '- ',
         twistieLeafTpl:" |-"
       });
      })
    .factory('API', function($state,$http){
        this.post = function(url,data,success,error){
       
           $.ajax({
              type:"post",
              url : url,
              data: data
            }).then(function(result){
              // console.log(result);

              if(result.httpCode==401){
                $state.go('login');
              }

              if(result.httpCode==200){
                success(result);
              }else{
                error(result);
              } 
            })
        };
		this.jsonpost = function(url,data,success,error){
       
           $.ajax({
              type:"post",
              url : url,
              data:  JSON.stringify(data),
			  headers : {  
                    'Content-Type' : 'application/json;charset=utf-8'  
                }
            }).then(function(result){
              console.log(result);

              if(result.httpCode==401){
                $state.go('login');
              }

              if(result.httpCode==200){
                success(result);
              }else{
                error(result);
              } 
            })
        };
        this.get = function(url,data,success,error){
           $.ajax({
              type:"get",
              url : url,
              data: data
            }).then(function(result){
              console.log(result);

              if(result.httpCode=401){
                $state.go('login');
              }

              if(result.httpCode==200){
                success(result);
              }else{
                error(result);
              } 
            })
        };

        return this;
}).factory('recordFormat', function(){
  this.format=function(obj,ico){

    for(var i in obj){
       if(Object.prototype.toString.call(obj[i])=='[object Object]'){
           for(var j in obj[i]){
                 j!="createTime" && j!="updateTime" && obj[i][j]!=null && (obj[i+ico+j]=obj[i][j]);
            }
          delete obj[i];
        }

        if(obj[i]==null){
          delete obj[i];
        }
    }

    delete obj.updateTime;
    delete obj.createTime;



  };

  return this;
})
.directive('datePicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
               minDate: '@',
            },
            link: function (scope, element, attr, ngModel) {

                element.val(ngModel.$viewValue);

                function onpicking(dp) {
                    var date = dp.cal.getNewDateStr();
                    scope.$apply(function () {
                        ngModel.$setViewValue(date);
                    });
                }
                //function onpicked(dp){
                    //$(dp.el).validationEngine('validate');
                //}
                function oncleared(){
                    scope.$apply(function () {
                        ngModel.$setViewValue("");
                    });
                }
                
                element.bind('click', function () {
                    WdatePicker({
                        onpicking: onpicking,
                        oncleared: oncleared,
                        //onpicked: onpicked,
                        dateFmt: (attr.datefmt || 'yyyy-MM-dd HH:mm:ss'),
                        minDate: (scope.minDate || '%y-%M-%d'),
                    })
                });
            }
        };
}).directive('downFile', ['$http',function ($http) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attr) {
            var ele = $(element);
            ele.on('click', function (e) {
                //ele.html('正在下载...');
                //ele.prop('disabled', true);
                e.preventDefault();
                $http({
                    url: attr.downFile,
                    //url: "/download/img/ZY/useruserId/ea0e7133-de4e-4a63-ae8f-2af83ef33d60",
                    method: 'post',
                    responseType: 'arraybuffer'
                }).success(function (data, status, headers) {
                  console.log(data);
                    ele.prop('disabled', false);
                    
                    var type;
                    switch (attr.downFileType) {
                        case 'doc':
                            type="application/msword";
                            break;
                        case 'docx':
                            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                            break;
                        case 'xls':
                            type = 'application/vnd.ms-excel';
                            break;
                        case 'xlsx':
                            type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                            break;
                        case 'ppt':
                            type = 'application/vnd.ms-powerpoint';
                            break;   
                        case 'pptx':
                            type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                            break;
                        case 'txt':
                            type = 'text/plain';
                            break;          
                        case 'mp4':
                            type="video/mp4";
                            break;
                        case 'png':
                            type="image/png";
                            break;
                        case 'jpg':
                            type="image/jpg";
                            break;
                        case 'gif':
                            type="image/gif";
                            break;      
                        case 'pdf':
                            type="application/pdf";
                            break;
                        case 'zip':
                            type="application/x-zip-compressed";
                            break;                          
                    }
                    if (!type) throw '无效类型';
                    console.log(headers());

                    //saveAs(new Blob([data], { type: type }), decodeURI(headers()["x-filename"]));  // 中文乱码
                    saveAs(new Blob([data], { type: type }), decodeURI(attr.downFileName));  // 中文乱码

                    //ele.html('下载完成');

                }).error(function (data, status) {
                    alert(data);
                    ele.prop('disabled', false);
                });
            });
        }
    };
}]);