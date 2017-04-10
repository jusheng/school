// config
window.APP = { version : 'v=20160509' };

angular.module('app')
  .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
	        // lazy controller, directive and service
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
	        app.constant   = $provide.constant;
	        app.value      = $provide.value;
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
              name: "ui.checkbox",
              files: [
                  "template/js/angular-bootstrap-checkbox.js",
                  // "template/js/bootstrap.js",
                  // "template/style/bootstrap.css"
              ]
          },
          {
            name:"ng.ueditor",
            files:[
                "template/js/angular-ueditor.js"
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
            name:"Dtree",
            files:[
              "template/js/dtree/dtree.js",
              "template/js/dtree/dtreeck.css"
            ]
          },
          {
            name:"ngDialog",
            files:[]
          }
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
    }])
    .config(function(ivhTreeviewOptionsProvider) {
       ivhTreeviewOptionsProvider.set({
         defaultSelectedState: false,
         validate: true,
         expandToDepth: -1,
         twistieCollapsedTpl: '+',
         twistieExpandedTpl: '- ',
         twistieLeafTpl:"|-"
       });
      })
    .factory('API', function(){
        this.post = function(url,data,success,error){
           $.ajax({
              url : url,
              data: data
            }).then(function(result){
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
}).directive('datePicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
//          scope: {
//              minDate: '@',
//          },
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
                    dateFmt: (attr.datefmt || 'yyyy-MM-dd HH:mm:ss')
                    //minDate: (scope.minDate || '%y-%M-%d'),
                })
            });
        }
    };
}).directive('editorJs', function () {  //编辑器js加载指令
    return {
        controller: function ($scope, $element, $attrs, $transclude, toaster, API,$compile) {
            

            $scope.$watch('editor_jsfinished',function(){
                if($scope.editor_jsfinished==117){
                    $('.include_editor').addClass('ueditor');

                    for (var i = 0; i < $('.include_editor').length; i++) {
                        var scope = angular.element($('.include_editor')[i]).scope();
                        var link = $compile($('.include_editor')[i]);

                        link(scope);
                    }
                }
            })



        },
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl:'template/module/tpl/editorjs.html'
    }
}).directive('editorKityformulaJs', function () {  //编辑器js加载指令 （带公式编辑器）
    return {
        controller: function ($scope, $element, $attrs, $transclude, toaster, API,$compile) {
            

            $scope.$watch('editor_jsfinished',function(){
                if($scope.editor_jsfinished==120){
                    $('.include_editor').addClass('ueditor');

                    for (var i = 0; i < $('.include_editor').length; i++) {
                        var scope = angular.element($('.include_editor')[i]).scope();
                        var link = $compile($('.include_editor')[i]);

                        link(scope);
                    }
                }
            })
        },
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl:'template/module/tpl/editorKityformulaJs.html'
    }
});