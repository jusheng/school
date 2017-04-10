'use strict';
// 

var app = angular.module('app');

app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
});
	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
            // 默认地址
            $urlRouterProvider.otherwise('/access/login');
            // 状态配置
            $stateProvider
                .state('main', {
                    abstract: true,
                    url: '',
                    templateUrl: 'src/tpl/app.html'
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.login',{
                    url: '/login',
                    templateUrl: 'src/app/sys/login/login.html',
                    controller: 'loginController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/login/loginController.js');
                        }]
                      }
                })
                .state('main.sys', {
                    url: '/sys',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                }) // 用户
                .state('main.sys.user', {
                    url: '/user',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.user.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/user/user.html',
                    controller: 'userController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/user/userController.js');
                        }]
                      }
                })
                .state('main.sys.user.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/user/update.html',
                    controller: 'userUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/user/updateController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.user.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/user/update.html',
                    controller: 'userUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/user/updateController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.region', {//区域管理  
                    url: '/region',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.region.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/region/region.html',
                    controller: 'regionController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/region/regionController.js');
                        }]
                      }
                })
                .state('main.sys.region.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/region/update.html',
                    controller: 'createController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/region/createController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.region.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/region/update.html',
                    controller: 'updateController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/region/updateController.js');
                        }]
                      }
                })
                .state('main.sys.basegrade', {// 基础班级管理
                    url: '/basegrade',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.basegrade.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/basegrade/basegrade.html',
                    controller: 'basegradeController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/basegrade/basegradeController.js');
                        }]
                      }
                })
                .state('main.sys.basegrade.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/basegrade/update.html',
                    controller: 'updateController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/basegrade/updateController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.basegrade.update', {
                    url: '/update/{id}',
                    templateUrl: 'src/app/sys/basegrade/update.html',
                    controller: 'updateController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/basegrade/updateController.js').then(function(){
                                return $ocLazyLoad.load(['toaster']);
                            });
                        }]
                      }
                })
                .state('main.sys.subject', {// 科目管理
                    url: '/subject',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.subject.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/subject/subject.html',
                    controller: 'subjectController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/subject/subjectController.js');
                        }]
                      }
                })
                .state('main.sys.subject.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/subject/update.html',
                    controller: 'updateController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/subject/updateController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.subject.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/subject/update.html',
                    controller: 'updateController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/subject/updateController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.dept', {// 部门
                    url: '/dept',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.dept.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/dept/dept.html',
                    controller: 'deptController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dept/deptController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.sys.dept.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/dept/update.html',
                    controller: 'deptUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dept/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.dept.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/dept/update.html',
                    controller: 'deptUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dept/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }) 
                .state('main.sys.menu', {// 菜单
                    url: '/menu',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.menu.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/menu/menu.html',
                    controller: 'menuController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/menu/menuController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.menu.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/menu/update.html',
                    controller: 'menuUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/menu/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.menu.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/menu/update.html',
                    controller: 'menuUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/menu/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }) // 角色
                .state('main.sys.role', {
                    url: '/role',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.role.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/role/role.html',
                    controller: 'roleController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                    		return uiLoad.load('src/app/sys/role/roleController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.role.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/role/update.html',
                    controller: 'roleUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/role/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.role.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/role/update.html',
                    controller: 'roleUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/role/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }) // 会话
                .state('main.sys.session', {
                    url: '/session',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.session.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/session/session.html',
                    controller: 'sessionController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/session/sessionController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }) // 字典
                .state('main.sys.dic', {
                    url: '/dic',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.dic.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/dic/dic.html',
                    controller: 'dicController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/dicController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.dic.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/dic/update.html',
                    controller: 'dicUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.dic.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/dic/update.html',
                    controller: 'dicUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }).state('main.sys.dic.manage', {
                    url: '/manage/{key}/{id}?params',
                    templateUrl: 'src/app/sys/dic/manage.html',
                    controller: 'manageController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/manageController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }).state('main.sys.dic.manageadd', {
                    url: '/manageadd/{key}/{id}?params',
                    templateUrl: 'src/app/sys/dic/manageadd.html',
                    controller: 'manageaddController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/manageaddController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }).state('main.sys.dic.edit', {
                    url: '/edit/{key}/{id}/{cid}?params',
                    templateUrl: 'src/app/sys/dic/manageadd.html',
                    controller: 'editController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/dic/editController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                }) // 参数
                .state('main.sys.param', {
                    url: '/param',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.sys.param.list', {
                    url: '/list',
                    templateUrl: 'src/app/sys/param/param.html',
                    controller: 'paramController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/param/paramController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.param.create', {
                    url: '/create',
                    templateUrl: 'src/app/sys/param/update.html',
                    controller: 'paramUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/param/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.sys.param.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/sys/param/update.html',
                    controller: 'paramUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/param/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.app', {
                    url: '/app',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.app.appmanage', {
                    url: '/appmanage',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.app.appmanage.list', {
                    url: '/list',
                    templateUrl: 'src/app/app/appmanage/modulelist.html',
                    controller: 'modulelistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/modulelistController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.moduleedit', {
                    url: '/moduleedit/{id}',
                    templateUrl: 'src/app/app/appmanage/moduleedit.html',
                    controller: 'moduleController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/moduleController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.moduledesk', {
                    url: '/moduledesk/{id}/{name}/{roleType}/{moduleIdentify}',
                    templateUrl: 'src/app/app/appmanage/moduledesk.html',
                    controller: 'moduledeskController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/moduledeskController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css',
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.moduleadd', {
                    url: '/moduleadd',
                    templateUrl: 'src/app/app/appmanage/moduleedit.html',
                    controller: 'moduleController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/moduleController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.applist', {
                    url: '/applist/{id}/{name}/{appType}',
                    templateUrl: 'src/app/app/appmanage/applist.html',
                    controller: 'applistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/applistController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.appedit', {
                    url: '/appedit/{id}/{name}',
                    templateUrl: 'src/app/app/appmanage/appedit.html',
                    controller: 'appController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/appController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.app.appmanage.appadd', {
                    url: '/appadd/{name}/{pid}/{appType}',
                    templateUrl: 'src/app/app/appmanage/appedit.html',
                    controller: 'appController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/app/appmanage/appController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })   // 调度
                .state('main.task', {
                    url: '/task',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.task.group', {
                    url: '/group',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.task.group.list', {
                    url: '/list',
                    templateUrl: 'src/app/task/group/group.html',
                    controller: 'taskGroupController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/group/groupController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.group.create', {
                    url: '/create',
                    templateUrl: 'src/app/task/group/update.html',
                    controller: 'groupUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/group/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.group.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/task/group/update.html',
                    controller: 'groupUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/group/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.scheduler', {
                    url: '/scheduler',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.task.scheduler.list', {
                    url: '/list',
                    templateUrl: 'src/app/task/scheduler/scheduler.html',
                    controller: 'taskSchedulerController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/scheduler/schedulerController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.scheduler.create', {
                    url: '/create',
                    templateUrl: 'src/app/task/scheduler/update.html',
                    controller: 'schedulerUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/scheduler/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.scheduler.update', {
                    url: '/update/{id}?params',
                    templateUrl: 'src/app/task/scheduler/update.html',
                    controller: 'schedulerUpdateController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/scheduler/updateController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.scheduled', {
                    url: '/scheduled',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.task.scheduled.list', {
                    url: '/list',
                    templateUrl: 'src/app/task/scheduled/scheduled.html',
                    controller: 'taskScheduledController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/scheduled/scheduledController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.task.log', {
                    url: '/log',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.task.log.list', {
                    url: '/list',
                    templateUrl: 'src/app/task/scheduled/log.html',
                    controller: 'scheduledLogController',
                    resolve: {
                    	deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/task/scheduled/logController.js').then(function() {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                      }
                })
                .state('main.edu', {
                    url: '/edu',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.school', {
                    url: '/school',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.school.list', {
                    url: '/list',
                    templateUrl: 'src/app/edu/school/schoollist.html',
                    controller: 'schoollistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schoollistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'src/app/edu/school/tree-control.css',
                                    'src/app/edu/school/tree-control-attribute.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.add', {
                    url: '/add',
                    templateUrl: 'src/app/edu/school/schooladd.html',
                    controller: 'schoolController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schoolController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'src/app/edu/school/schooladd.html',
                    controller: 'schoolController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schoolController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.schoolapp', {
                    url: '/schoolapp/{id}',
                    templateUrl: 'src/app/edu/school/app.html',
                    controller: 'appController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/appController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css',
                                    'src/app/edu/school/teacherappController.js',
                                    'src/app/edu/school/studentappController.js',
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.authorize', {
                    url: '/authorize/{id}/{name}',
                    templateUrl: 'src/app/edu/school/authorize.html',
                    controller: 'authorizeController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/authorizeController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'

                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.schooldept', {
                    url: '/schooldept/{school_id}/{name}/',
                    templateUrl: 'src/app/edu/school/schooldeptlist.html',
                    controller: 'schooldeptlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schooldeptlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.schooldeptadd', {
                    url: '/schooldeptadd/{school_id}/{name}/',
                    templateUrl: 'src/app/edu/school/schooldept.html',
                    controller: 'schooldeptController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schooldeptController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.school.schooldeptedit', {
                    url: '/schooldeptedit/{school_id}/{name}/{dept_id}/',
                    templateUrl: 'src/app/edu/school/schooldept.html',
                    controller: 'schooldeptController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/school/schooldeptController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })

                //学年
                .state('main.edu.schoolYear', {
                    url: '/schoolYear',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.schoolYear.list', {
                    url: '/list',
                    templateUrl: 'src/app/edu/schoolYear/list.html',
                    controller: 'schoolYearListController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schoolYear/schoolYearListController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'http://www.my97.net/dp/My97DatePicker/WdatePicker.js'
                                ]);
                            });
                        }]
                    }
                })
                .state('main.edu.schoolYear.add', {
                    url: '/add',
                    templateUrl: 'src/app/edu/schoolYear/update.html',
                    controller: 'schoolYearController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schoolYear/schoolYearController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'http://www.my97.net/dp/My97DatePicker/WdatePicker.js'
                                ]);
                            });
                        }]
                    }
                })
                .state('main.edu.schoolYear.update', {
                    url: '/edit/{id}',
                    templateUrl: 'src/app/edu/schoolYear/update.html',
                    controller: 'schoolYearController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schoolYear/schoolYearController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                })

                //部门
                .state('main.edu.schoolDept', {
                    url: '/schoolDept',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.schoolDept.list', {
                    url: '/list',
                    templateUrl: 'src/app/edu/schooldept/schoollist.html',
                    controller: 'schoollistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schooldept/schoollistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.schoolDept.deptlist', {
                    url: '/deptlist/{school_id}/{name}',
                    templateUrl: 'src/app/edu/schooldept/schooldeptlist.html',
                    controller: 'schooldeptlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schooldept/schooldeptlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.schoolDept.deptadd', {
                    url: '/deptadd/{school_id}/{name}',
                    templateUrl: 'src/app/edu/schooldept/schooldept.html',
                    controller: 'schooldeptController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schooldept/schooldeptController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.schoolDept.deptedit', {
                    url: '/deptadd/{school_id}/{name}/{dept_id}',
                    templateUrl: 'src/app/edu/schooldept/schooldept.html',
                    controller: 'schooldeptController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/schooldept/schooldeptController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.user', {
                    url: '/user',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.user.list', {
                    url: '/list',
                    templateUrl: 'src/app/edu/user/schoollist.html',
                    controller: 'schoollistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/user/schoollistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.user.userlist', {
                    url: '/userlist/{school_id}/{name}',
                    templateUrl: 'src/app/edu/user/userlist.html',
                    controller: 'userlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/user/userlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.user.useradd', {
                    url: '/useradd/{school_id}/{name}',
                    templateUrl: 'src/app/edu/user/user.html',
                    controller: 'userController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/user/userController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.user.useredit', {
                    url: '/useredit/{school_id}/{name}/{user_id}',
                    templateUrl: 'src/app/edu/user/user.html',
                    controller: 'userController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/user/userController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css',
                                    'lib/angular/ng-img-crop.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.user.roleconfig', {
                    url: '/roleconfig/{school_id}/{name}/{user_id}',
                    templateUrl: 'src/app/edu/user/roleconfig.html',
                    controller: 'roleconfigController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/user/roleconfigController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.role', {
                    url: '/role',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.role.list', {
                    url: '/list',
                    templateUrl: 'src/app/edu/role/schoollist.html',
                    controller: 'schoollistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/role/schoollistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.role.rolelist', {
                    url: '/rolelist/{school_id}/{name}',
                    templateUrl: 'src/app/edu/role/rolelist.html',
                    controller: 'rolelistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/role/rolelistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.role.roleadd', {
                    url: '/roleadd/{school_id}/{name}',
                    templateUrl: 'src/app/edu/role/role.html',
                    controller: 'roleController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/role/roleController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.role.roleedit', {
                    url: '/roleedit/{school_id}/{name}/{role_id}',
                    templateUrl: 'src/app/edu/role/role.html',
                    controller: 'roleController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/role/roleController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.edu.subject', {
                    url: '/subject',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.edu.subject.edit', {
                    url: '/list/{school_id}/{name}',
                    templateUrl: 'src/app/edu/subject/subject.html',
                    controller: 'eduSubjectController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/subject/subjectController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster','ui.checkbox',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                ]);
                            });
                        }]
                    }
                })
                .state('main.edu.role.roleapp', {
                    url: '/roleapp/{school_id}/{name}/{role_id}/{role_name}/{role_type}',
                    templateUrl: 'src/app/edu/role/app.html',
                    controller: 'appController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/edu/role/appController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res', {
                    url: '/res',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.resource', {
                    url: '/resource',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.resource.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/resource/resourcelist.html',
                    controller: 'resourcelistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/resource/resourcelistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.resource.add', {
                    url: '/add',
                    templateUrl: 'src/app/res/resource/resourceadd.html',
                    controller: 'resourceController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/resource/resourceController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.resource.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'src/app/res/resource/resourceadd.html',
                    controller: 'resourceController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/resource/resourceController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })

                .state('main.res.question', {
                    url: '/question',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.question.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/question/kmlist.html',
                    controller: 'kmlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/question/kmlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.question.questionlist', {
                    url: '/list/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/question/questionlist.html',
                    controller: 'questionlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/question/questionlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.question.add', {
                    url: '/add/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/question/questionadd.html',
                    controller: 'questionController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/question/questionController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog',
                                    'src/app/res/question/question.css',
                                    'src/app/res/question/answertemp/singletempController.js',
                                    'src/app/res/question/answertemp/multipletempController.js',
                                    'src/app/res/question/answertemp/qatempController.js',
                                    'src/app/res/question/answertemp/judgetempController.js',
                                    'src/app/res/question/answertemp/completempController.js',
                                    'src/app/res/question/answertemp/aqtempController.js'/*,
                                    'template/ueditor-1.4.3.3/kityformula-plugin/addKityFormulaDialog.js',
                                    'template/ueditor-1.4.3.3/kityformula-plugin/getKfContent.js',
                                    'template/ueditor-1.4.3.3/kityformula-plugin/defaultFilterFix.js'*/
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.question.edit', {
                    url: '/edit/{id}/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/question/questionadd.html',
                    controller: 'questionController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/question/questionController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog',
                                    'src/app/res/question/question.css',
                                    'src/app/res/question/answertemp/singletempController.js',
                                    'src/app/res/question/answertemp/multipletempController.js',
                                    'src/app/res/question/answertemp/qatempController.js',
                                    'src/app/res/question/answertemp/judgetempController.js',
                                    'src/app/res/question/answertemp/completempController.js',
                                    'src/app/res/question/answertemp/aqtempController.js'/*,
                                    'template/ueditor-1.4.3.3/kityformula-plugin/addKityFormulaDialog.js',
                                    'template/ueditor-1.4.3.3/kityformula-plugin/getKfContent.js',
                                    'template/ueditor-1.4.3.3/kityformula-plugin/defaultFilterFix.js'*/
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.textbook', {
                    url: '/textbook',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.textbook.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/textbook/textbooklist.html',
                    controller: 'textbooklistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/textbook/textbooklistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.textbook.add', {
                    url: '/add',
                    templateUrl: 'src/app/res/textbook/textbookadd.html',
                    controller: 'textbookController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/textbook/textbookController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.textbook.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'src/app/res/textbook/textbookadd.html',
                    controller: 'textbookController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/textbook/textbookController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.knowledge', {
                    url: '/knowledge',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.knowledge.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/knowledge/knowledgelist.html',
                    controller: 'knowledgelistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/knowledge/knowledgelistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.knowledge.show', {
                    url: '/show/{subject_id}/{school_type}/{km}',
                    templateUrl: 'src/app/res/knowledge/knowledgeshow.html',
                    controller: 'knowledgeshowController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/knowledge/knowledgeshowController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css',
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.chapter', {
                    url: '/chapter',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.chapter.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/chapter/chapterlist.html',
                    controller: 'chapterlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/chapter/chapterlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.chapter.show', {
                    url: '/show/{subject_id}/{basegrade_id}/{textbook_id}/{km}/{textbook_name}',
                    templateUrl: 'src/app/res/chapter/chaptershow.html',
                    controller: 'chaptershowController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/chapter/chaptershowController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css',
                                    ]);
                            });
                        }]
                      }
                }).state('main.res.library', {
                    url: '/library',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.library.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/library/kmlist.html',
                    controller: 'kmlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/library/kmlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.library.librarylist', {
                    url: '/librarylist/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/library/librarylist.html',
                    controller: 'librarylistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/library/librarylistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.library.add', {
                    url: '/add/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/library/libraryadd.html',
                    controller: 'libraryController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/library/libraryController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog',
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.library.edit', {
                    url: '/edit/{id}/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/library/libraryadd.html',
                    controller: 'libraryController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/library/libraryController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog',
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.library.view', {
                    url: '/view/{id}/{subject_id}/{grade_id}/{subject_name}/{grade_name}',
                    templateUrl: 'src/app/res/library/libraryview.html',
                    controller: 'libraryviewController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/library/libraryviewController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog',
                                    '/res/flexpaper/js/flexpaper.js',
                                    '/res/flexpaper/js/flexpaper_handlers.js',
                                    '/res/jwplayer/jwplayer.js',
                                    ]);
                            });
                        }]
                      }
                }).state('main.res.extraclass', {
                    url: '/extraclass',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.extraclass.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/extraclass/extraclass.html',
                    controller: 'extraclassController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extraclass/extraclassController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.extraclass.classlist', {
                    url: '/classlist/{subject_id}/{school_type}/{km}/{school_name}',
                    templateUrl: 'src/app/res/extraclass/extraclasslist.html',
                    controller: 'extraclasslistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extraclass/extraclasslistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.extraclass.add', {
                    url: '/add/{subject_id}/{school_type}/{km}/{school_name}/{id}',
                    templateUrl: 'src/app/res/extraclass/extraclassadd.html',
                    controller: 'extraclassaddController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extraclass/extraclassaddController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.extra', {
                    url: '/extra',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('main.res.extra.list', {
                    url: '/list',
                    templateUrl: 'src/app/res/extra/extra.html',
                    controller: 'extraController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extra/extraController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.extra.reslist', {
                    url: '/reslist/{subject_id}/{km}',
                    templateUrl: 'src/app/res/extra/extrareslist.html',
                    controller: 'extrareslistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extra/extrareslistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ngDialog'
                                    ]);
                            });
                        }]
                      }
                })
                .state('main.res.extra.add', {
                    url: '/add/{subject_id}/{km}/{id}',
                    templateUrl: 'src/app/res/extra/extraresadd.html',
                    controller: 'extraresaddController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extra/extraresaddController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog'
                                    // 'template/ueditor-1.4.3.3/kityformula-plugin/addKityFormulaDialog.js',
                                    // 'template/ueditor-1.4.3.3/kityformula-plugin/getKfContent.js',
                                    // 'template/ueditor-1.4.3.3/kityformula-plugin/defaultFilterFix.js'
                                    ]);
                            });
                        }]
                      }
                }).state('main.res.extra.chapteradd', {
                    url: '/chapteradd/{subject_id}/{km}/{mainId}/{id}/{resType}',
                    templateUrl: 'src/app/res/extra/chapteradd.html',
                    controller: 'chapteraddController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extra/chapteraddController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog'
                                   
                                    ]);
                            });
                        }]
                      }
                }).state('main.res.extra.chapterlist', {
                    url: '/chapterlist/{subject_id}/{km}/{id}/{resType}',
                    templateUrl: 'src/app/res/extra/chapterlist.html',
                    controller: 'chapterlistController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/res/extra/chapterlistController.js').then(function() {
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng.ueditor',
                                    'ngDialog'
                                    
                                    ]);
                            });
                        }]
                      }
                });
    }])
    .controller("navCtrl",function($rootScope,$state) {
    	$.ajax({
			url : '/user/read/current',
			success : function(result) {
				if (result.httpCode == 200) {
					$rootScope.userInfo = result.user;
					$rootScope.menuList = result.menus;
					$rootScope.$apply();
				}
			}
		});
  	})
    .run(['$rootScope', '$state', '$stateParams','$timeout', '$templateCache',
          function ($rootScope,$state,$stateParams,$timeout, $templateCache) {
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  var from =  fromState.name, to = toState.name;
                  if(from && to){ // 解决 相应模块从列表进入编辑后 状态丢失问题
                      var s1= from.substring(0,from.lastIndexOf(".")),
                          g1 = from.substring(from.lastIndexOf(".")+1),
                          s2 = to.substring(0,to.lastIndexOf(".")),
                          g2 = to.substring(to.lastIndexOf(".")+1);
                      if(s1 == s2){
                          if(g1 =='list' && (g2=='update'||g2=='view')) { //进行编辑
                              toParams['params'] = window.location.hash;
                          }
                          //返回列表
                          if((g1 == "update"||g1 =='view') && g2=='list') {
                              var h = fromParams['params'];
                              if(h){
                                  $timeout(function(){
                                      window.location.hash = h;
                                  });
                              }
                          }
                      }
                  }
              });
          }
      ]);