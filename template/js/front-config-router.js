'use strict';
// 

var app = angular.module('app');

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof(current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
});
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // 默认地址
    $urlRouterProvider.otherwise('/main/desk');
    //$urlRouterProvider.otherwise('/login');
    // 状态配置
    $stateProvider
        .state('pp', {
            url: '/pp',
            templateUrl: 'template/module/oa/email/pp.html',
            controller: 'ppController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/oa/email/ppController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'checklist-model',
                            'ng.ueditor',
                            'angular-echarts',
                            // 'template/ueditor-1.4.3.3/kityformula-plugin/addKityFormulaDialog.js',
                            // 'template/ueditor-1.4.3.3/kityformula-plugin/getKfContent.js',
                            // 'template/ueditor-1.4.3.3/kityformula-plugin/defaultFilterFix.js'
                            /*
                             '//cdn.bootcss.com/ng-grid/2.0.11/ng-grid.min.js',
                             '//cdn.bootcss.com/ng-grid/2.0.11/ng-grid.min.css',
                             '//cdn.bootcss.com/jqueryui/1.12.0/jquery-ui.js',
                             '//cdn.bootcss.com/jqueryui/1.12.0/jquery-ui.css',
                             'lib/angular/ivh-treeview.css',
                             'lib/angular/ivh-treeview-theme-basic.css',
                             'lib/jquery/jquery.validate.min.js',
                             'lib/jquery/additional-methods.min.js'*/
                        ]);
                    });
                }]
            }
        }).state('login', {
        url: '/login',
        templateUrl: 'template/module/login/login.html',
        controller: 'loginController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/login/loginController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/login/login.css'
                    ]);
                });
            }]
        }
    }).state('main', {
        url: '/main',
        templateUrl: 'template/module/main/main.html',
        controller: 'mainController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/main/mainController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng-iscroll',
                        'template/style/app.css'
                    ]);
                });
            }]
        }
    }).state('main.uidesk', {
        url: '/uidesk',
        templateUrl: 'template/module/uidesk/uidesk.html',
        controller: 'uideskController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/uidesk/uideskController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        /*'template/module/desk/ui-css/main.css',
                         'template/module/desk/ui-css/jquery-fallr-1.3.css',
                         'template/module/desk/ui-js/jquery-1.7.1.min.js',
                         'template/module/desk/ui-js/ui/ui.core.min.js',
                         'template/module/desk/ui-js/ui/ui.sortable.min.js',
                         'template/module/desk/ui-js/jquery-fallr-1.3.pack.js',
                         'template/module/desk/ui-js/jquery.easing.1.3.js',
                         'template/module/desk/ui-js/Jh.js'*/
                    ]);
                });
            }]
        }
    })
        .state('main.desk', {
            url: '/desk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'deskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/desk/deskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css',
                            /*'template/module/desk/desk/idangerous.swiper.css',
                            'template/module/desk/desk/idangerous.swiper.min.js'*/
                            /*/*'template/module/desk/calendar.css',
                             'template/module/desk/calendarController.js',
                             'template/module/myclock/Calendar.js'*/
                        ]);
                    });
                }]
            }
        }).state('main.online', {
        url: '/online/:p',
        templateUrl: 'template/module/online/online.html',
        controller: 'onlineController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/online/onlineController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    })
        .state('main.message', {
            url: '/message',
            templateUrl: 'template/module/message/message.html',
            controller: 'messageController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messageController.js').then(function () {
                        return $ocLazyLoad.load(['toaster', 'template/module/message/message.css']);
                    });
                }]
            }
        })
        .state('main.message.list', {
            url: '/list',
            templateUrl: 'template/module/message/messagelist.html',
            controller: 'messagelistController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messagelistController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.message.sended', {
            url: '/sended',
            templateUrl: 'template/module/message/messagesendedlist.html',
            controller: 'messagesendedlistController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messagesendedlistController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.message.detail', {
            url: '/detail/{id}',
            templateUrl: 'template/module/message/messagedetail.html',
            controller: 'messagedetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messagedetailController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.message.sendeddetail', {
            url: '/sendeddetail/{id}',
            templateUrl: 'template/module/message/messagesendeddetail.html',
            controller: 'messagesendeddetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messagesendeddetailController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.message.write', {
            url: '/write',
            templateUrl: 'template/module/message/messagewrite.html',
            controller: 'messagewriteController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/messagewriteController.js').then(function () {
                        return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                    });
                }]
            }
        })
        .state('main.message.write.userlist', {
            url: '/userlist',
            templateUrl: 'template/module/message/userlist.html',
            controller: 'userlistController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/message/userlistController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.oadesk', {
            url: '/oadesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'oadeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/oadesk/oadeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.edudesk', {
            url: '/edudesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'edudeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/edudesk/edudeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.resdesk', {
            url: '/resdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'resdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/resdesk/resdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.sysdesk', {
            url: '/sysdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'sysdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/sysdesk/sysdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.classmanagedesk', {
            url: '/classmanagedesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'classmanagedeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/classmanagedesk/classmanagedeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.myclassdesk', {
            url: '/myclassdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'myclassdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/myclassdesk/myclassdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.centredesk', {

            url: '/centredesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'centredeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/centredesk/centredeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.teacherexamdesk', {
            url: '/teacherexamdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'teacherexamdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/teacherexamdesk/teacherexamdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.studentexamdesk', {
            url: '/studentexamdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'studentexamdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/studentexamdesk/studentexamdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.teacherhomeworkdesk', {
            url: '/teacherhomeworkdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'teacherhomeworkdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/teacherhomeworkdesk/teacherhomeworkdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.studenthomeworkdesk', {
            url: '/studenthomeworkdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'studenthomeworkdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/studenthomeworkdesk/studenthomeworkdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.centreforteacherdesk', {
            url: '/centreforteacherdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'centreforteacherdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/centreforteacherdesk/centreforteacherdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.studentresdesk', {
            url: '/studentresdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'studentresdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/studentresdesk/studentresdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.librarydesk', {
            url: '/librarydesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'librarydeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/librarydesk/librarydeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.studentborrowdesk', {
            url: '/studentborrowdesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'studentborrowdeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/studentborrowdesk/studentborrowdeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.coursedesk', {
            url: '/coursedesk',
            templateUrl: 'template/module/desk/desk/desk.html',
            controller: 'coursedeskController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/desk/coursedesk/coursedeskController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster',
                            'ng-iscroll',
                            'angular-echarts',
                            'template/module/desk/desk/desk.css'
                        ]);
                    });
                }]
            }
        })
        .state('main.teacherSubjectList', {
            url: '/teacherSubjectList',
            templateUrl: 'template/module/teachermanage/teacherSubjectList.html',
            controller: 'teacherSubjectListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/teachermanage/teacherSubjectListController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.gradeManage', {
            url: '/gradeManage',
            templateUrl: 'template/module/edu/grade/gradeManage.html',
            controller: 'gradeManageController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/grade/gradeManageController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.gradeManage.gradeList', {
            url: '/gradeList',
            templateUrl: 'template/module/edu/grade/gradeList.html',
            controller: 'gradeListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/grade/gradeListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.gradeManage.gradeAdd', {
            url: '/gradeDetail',
            templateUrl: 'template/module/edu/grade/gradeDetail.html',
            controller: 'gradeDetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/grade/gradeDetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.gradeManage.gradeUpdate', {
            url: '/gradeDetail/{id}',
            templateUrl: 'template/module/edu/grade/gradeDetail.html',
            controller: 'gradeDetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/grade/gradeDetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.class', {
            url: '/class',
            templateUrl: 'template/module/edu/class/class.html',
            controller: 'classController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.class.classList', {
            url: '/classList/{grade_id}',
            templateUrl: 'template/module/edu/class/classList.html',
            controller: 'classListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage', {
            url: '/classManage',
            templateUrl: 'template/module/edu/class/classManage.html',
            controller: 'classManageController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classManageController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.classList', {
            url: '/classList/{grade_id}',
            templateUrl: 'template/module/edu/class/classList.html',
            controller: 'classListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.classStudentList', {
            url: '/classStudentList/{gradeId}/{classId}/{teacherId}',
            templateUrl: 'template/module/edu/classStudent/classStudentList.html',
            controller: 'classStudentListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/classStudent/classStudentListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.editStudent', {
            url: '/editStudent/{gradeId}/{classId}/{id}/{teacherId}',
            templateUrl: 'template/module/edu/classStudent/studentadd.html',
            controller: 'studentaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/classStudent/studentaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.scheduleList', {
            url: '/scheduleList/{gradeId}/{classId}',
            templateUrl: 'template/module/edu/schedule/scheduleList.html',
            controller: 'scheduleListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/schedule/scheduleListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.classAdd', {
            url: '/classDetail/{gradeId}',
            templateUrl: 'template/module/edu/class/classDetail.html',
            controller: 'classDetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classDetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.classUpdate', {
            url: '/classDetail/{gradeId}/{id}',
            templateUrl: 'template/module/edu/class/classDetail.html',
            controller: 'classDetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/class/classDetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.classManage.classTeacherList', {
            url: '/classTeacherList/{gradeId}/{classId}/{subjectId}',
            templateUrl: 'template/module/edu/classTeacher/classTeacherList.html',
            controller: 'classTeacherListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/classTeacher/classTeacherListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.schedule', {
            url: '/schedule',
            templateUrl: 'template/module/edu/schedule/schedulelist.html',
            controller: 'schedulelistController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/schedule/schedulelistController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.schedule.schedulelist', {
            url: '/schedulelist/{classId}',
            templateUrl: 'template/module/edu/schedule/schedulelist.html',
            controller: 'schedulelistController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/schedule/schedulelistController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.subjectGroupManage', {
            url: '/subjectGroupManage',
            templateUrl: 'template/module/edu/subjectGroup/subjectGroupManage.html',
            controller: 'subjectGroupManageController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/subjectGroup/subjectGroupManageController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.subjectGroupManage.subjectGroupList', {
            url: '/subjectGroupList',
            templateUrl: 'template/module/edu/subjectGroup/subjectGroupList.html',
            controller: 'subjectGroupListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/subjectGroup/subjectGroupListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.subjectGroupManage.subjectList', {
            url: '/subjectList/{subjectGroup_id}',
            templateUrl: 'template/module/edu/subjectGroup/subjectList.html',
            controller: 'subjectListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/subjectGroup/subjectListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.teachermanage', {
            url: '/teachermanage',
            templateUrl: 'template/module/teachermanage/teachermanage.html',
            controller: 'teachermanageController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/teachermanage/teachermanageController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        }).state('main.teachermanage.teacherlist', {
        url: '/teacherlist',
        templateUrl: 'template/module/teachermanage/teacherlist.html',
        controller: 'teacherlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/teachermanage/teacherlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.teachermanage.teacheradd', {
        url: '/teacheradd',
        templateUrl: 'template/module/teachermanage/teacheradd.html',
        controller: 'teacheraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/teachermanage/teacheraddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'lib/angular/ng-img-crop.css']);
                });
            }]
        }
    }).state('main.teachermanage.teacheredit', {
        url: '/teacheredit/{id}',
        templateUrl: 'template/module/teachermanage/teacheradd.html',
        controller: 'teacheraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/teachermanage/teacheraddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'lib/angular/ng-img-crop.css']);
                });
            }]
        }
    }).state('main.studentmanage', {
        url: '/studentmanage',
        templateUrl: 'template/module/studentmanage/studentmanage.html',
        controller: 'studentmanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/studentmanage/studentmanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.studentmanage.studentlist', {
        url: '/studentlist',
        templateUrl: 'template/module/studentmanage/studentlist.html',
        controller: 'studentlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/studentmanage/studentlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.studentmanage.studentadd', {
        url: '/studentadd',
        templateUrl: 'template/module/studentmanage/studentadd.html',
        controller: 'studentaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/studentmanage/studentaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.studentmanage.studentedit', {
        url: '/studentedit/{id}',
        templateUrl: 'template/module/studentmanage/studentadd.html',
        controller: 'studentaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/studentmanage/studentaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'lib/angular/ng-img-crop.css']);
                });
            }]
        }
    }).state('main.schoolDetail', {
        url: '/schoolDetail',
        templateUrl: 'template/module/edu/school/schoolDetail.html',
        controller: 'schoolDetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/school/schoolDetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.schoolSilv', {
        url: '/schoolSilv',
        templateUrl: 'template/module/edu/schoolSilv/schoolSilv.html',
        controller: 'schoolSilvController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolSilv/schoolSilvController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.schoolSubject', {
        url: '/schoolSubject',
        templateUrl: 'template/module/schoolSubject/schoolSubject.html',
        controller: 'schoolSubjectController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/schoolSubject/schoolSubjectController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.schoolSubject.schoolSubjectlist', {
        url: '/schoolSubjectlist',
        templateUrl: 'template/module/schoolSubject/schoolSubjectlist.html',
        controller: 'schoolSubjectlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/schoolSubject/schoolSubjectlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.resource', {
        url: '/resource',
        templateUrl: 'template/module/resource/resource.html',
        controller: 'resourceController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/resource/resourceController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.system', {
        url: '/system',
        templateUrl: 'template/module/system/system.html',
        controller: 'systemController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/system/systemController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.deptmanage', {
        url: '/deptmanage',
        templateUrl: 'template/module/deptmanage/deptmanage.html',
        controller: 'deptmanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/deptmanage/deptmanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.deptmanage.deptmanage', {
        url: '/deptmanage',
        templateUrl: 'template/module/deptmanage/deptmanage.html',
        controller: 'deptmanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/deptmanage/deptmanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.deptmanage.deptlist', {
        url: '/deptlist',
        templateUrl: 'template/module/deptmanage/deptlist.html',
        controller: 'deptlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/deptmanage/deptlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.deptmanage.deptadd', {
        url: '/deptadd',
        templateUrl: 'template/module/deptmanage/deptadd.html',
        controller: 'deptaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/deptmanage/deptaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.deptmanage.deptedit', {
        url: '/deptedit/{id}',
        templateUrl: 'template/module/deptmanage/deptadd.html',
        controller: 'deptaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/deptmanage/deptaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage', {
        url: '/rolemanage',
        templateUrl: 'template/module/rolemanage/rolemanage.html',
        controller: 'rolemanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/rolemanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage.rolemanage', {
        url: '/rolemanage',
        templateUrl: 'template/module/rolemanage/rolemanage.html',
        controller: 'rolemanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/rolemanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage.rolelist', {
        url: '/rolelist',
        templateUrl: 'template/module/rolemanage/rolelist.html',
        controller: 'rolelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/rolelistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage.roleadd', {
        url: '/roleadd',
        templateUrl: 'template/module/rolemanage/roleadd.html',
        controller: 'roleaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/roleaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage.roleedit', {
        url: '/roleedit/{id}',
        templateUrl: 'template/module/rolemanage/roleadd.html',
        controller: 'roleaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/roleaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.rolemanage.roleapp', {
        url: '/roleapp/{role_id}/{role_type}',
        templateUrl: 'template/module/rolemanage/roleapp.html',
        controller: 'roleappController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/rolemanage/roleappController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'lib/angular/ivh-treeview.css',
                        'lib/angular/ivh-treeview-theme-basic.css'
                    ]);
                });
            }]
        }
    }).state('main.usermanage', {
        url: '/usermanage',
        templateUrl: 'template/module/usermanage/usermanage.html',
        controller: 'usermanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usermanage/usermanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.usermanage.usermanage', {
        url: '/usermanage',
        templateUrl: 'template/module/usermanage/usermanage.html',
        controller: 'usermanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usermanage/usermanageController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.usermanage.userlist', {
        url: '/userlist',
        templateUrl: 'template/module/usermanage/userlist.html',
        controller: 'userlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usermanage/userlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.usermanage.useradd', {
        url: '/useradd',
        templateUrl: 'template/module/usermanage/useradd.html',
        controller: 'useraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usermanage/useraddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.usermanage.useredit', {
        url: '/useredit/{id}',
        templateUrl: 'template/module/usermanage/useradd.html',
        controller: 'useraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usermanage/useraddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.notice', {
        url: '/notice',
        templateUrl: 'template/module/edu/notice/notice.html',
        controller: 'noticeController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/notice/noticeController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.notice.noticelist', {
        url: '/noticelist',
        templateUrl: 'template/module/edu/notice/noticelist.html',
        controller: 'noticelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/notice/noticelistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.notice.noticeadd', {
        url: '/noticeadd',
        templateUrl: 'template/module/edu/notice/noticeadd.html',
        controller: 'noticeaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/notice/noticeaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.notice.noticeedit', {
        url: '/noticeedit/{id}',
        templateUrl: 'template/module/edu/notice/noticeadd.html',
        controller: 'noticeaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/notice/noticeaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bjgl', {
        url: '/bjgl',
        templateUrl: 'template/module/bjgl/bjgl.html',
        controller: 'bjglController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bjgl/bjglController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.appcenter', {
        url: '/appcenter/{desk_name}',
        templateUrl: 'template/module/appcenter/appcenter.html',
        controller: 'appcenterController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/appcenter/appcenterController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'template/style/appcenter.css'
                    ]);
                });
            }]
        }
    }).state('main.email', {
        url: '/email',
        templateUrl: 'template/module/oa/email/email.html',
        controller: 'emailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.email.write', {  //子视图 (写邮件)
        url: '/write/{eid}', //从草稿箱来的带参数
        templateUrl: 'template/module/oa/email/emailwrite.html',
        controller: 'emailwriteController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailwriteController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.email.write.emailbook', {  //子视图 (通讯录)
        url: '/emailbook',
        templateUrl: 'template/module/oa/email/emailbook.html',
        controller: 'emailbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.list', {  //子视图 (邮件列表)
        url: '/list',
        templateUrl: 'template/module/oa/email/emaillist.html',
        controller: 'emaillistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emaillistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.edit', {  //子视图 (草稿箱列表)
        url: '/edit',
        templateUrl: 'template/module/oa/email/emailedit.html',
        controller: 'emaileditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emaileditController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.sended', {  //子视图 (已发送列表)
        url: '/sended',
        templateUrl: 'template/module/oa/email/emailsended.html',
        controller: 'emailsendedController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailsendedController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.star', {  //子视图 (星标邮件列表)
        url: '/star',
        templateUrl: 'template/module/oa/email/emailstar.html',
        controller: 'emailstarController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailstarController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/oa/email/emailliststarController.js',
                        'template/module/oa/email/emailsendedstarController.js'
                    ]);
                });
            }]
        }
    }).state('main.email.trash', {  //子视图 (垃圾箱列表)
        url: '/trash',
        templateUrl: 'template/module/oa/email/emailtrash.html',
        controller: 'emailtrashController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailtrashController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.detail', {  //子视图 (邮件详情)
        url: '/detail/{eid}/{id}',
        templateUrl: 'template/module/oa/email/emaildetail.html',
        controller: 'emaildetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emaildetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.sendeddetail', {  //子视图 (发件箱邮件详情)
        url: '/sendeddetail/{eid}',
        templateUrl: 'template/module/oa/email/sendedemaildetail.html',
        controller: 'sendedemaildetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/sendedemaildetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.editdetail', {  //子视图 (草稿箱邮件详情)
        url: '/editdetail/{eid}',
        templateUrl: 'template/module/oa/email/editdetail.html',
        controller: 'editdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/editdetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.reply', {  //子视图 (回复邮件)
        url: '/reply/{eid}/{sendName}/{sendId}',
        templateUrl: 'template/module/oa/email/emailreply.html',
        controller: 'emailreplyController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailreplyController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.reply.emailbook', {  //子视图 (回复邮件 通讯录)
        url: '/emailbook',
        templateUrl: 'template/module/oa/email/emailbook.html',
        controller: 'emailbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.forward', {  //子视图 (转发邮件)
        url: '/forward/{eid}',
        templateUrl: 'template/module/oa/email/emailforward.html',
        controller: 'emailforwardController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailforwardController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.email.forward.emailbook', {  //子视图 (转发邮件 通讯录)
        url: '/emailbook',
        templateUrl: 'template/module/oa/email/emailbook.html',
        controller: 'emailbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/email/emailbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.news', {
        url: '/news',
        templateUrl: 'template/module/edu/news/news.html',
        controller: 'newsController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/news/news.css']);
                });
            }]
        }
    }).state('main.news.newslist', {
        url: '/newslist/{sorts_id}',
        templateUrl: 'template/module/edu/news/newslist.html',
        controller: 'newslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newslistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.news.newsadd', {
        url: '/newsadd',
        templateUrl: 'template/module/edu/news/newsadd.html',
        controller: 'newsaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'
                    ]);
                });
            }]
        }
    }).state('main.news.newsedit', {
        url: '/newsedit/{id}',
        templateUrl: 'template/module/edu/news/newsadd.html',
        controller: 'newsaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'
                    ]);
                });
            }]
        }
    }).state('main.news.detail', {
        url: '/detail/:id',
        templateUrl: 'template/module/edu/news/newsdetail.html',
        controller: 'newsdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsdetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.news.newsclass', {
        url: '/newsclass',
        templateUrl: 'template/module/edu/news/newsclass.html',
        controller: 'newsclassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsclassController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.news.newsclassadd', {
        url: '/newsclassadd/',
        templateUrl: 'template/module/edu/news/newsclassadd.html',
        controller: 'newsclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsclassaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.news.newsaddedit', {
        url: '/newsaddedit/{id}',
        templateUrl: 'template/module/edu/news/newsclassadd.html',
        controller: 'newsclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/news/newsclassaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'http://www.my97.net/dp/My97DatePicker/WdatePicker.js'

                    ]);
                });
            }]
        }
    }).state('main.note', {
        url: '/note',
        templateUrl: 'template/module/oa/note/note.html',
        controller: 'noteController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/note/noteController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'

                    ]);
                });
            }]
        }
    }).state('main.note.notelist', {
        url: '/notelist',
        templateUrl: 'template/module/oa/note/notelist.html',
        controller: 'notelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/note/notelistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.note.noteadd', {
        url: '/noteadd',
        templateUrl: 'template/module/oa/note/noteadd.html',
        controller: 'noteaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/note/noteaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'
                    ]);
                });
            }]
        }
    })
        .state('main.note.noteedit', {
            url: '/noteedit/{id}',
            templateUrl: 'template/module/oa/note/noteadd.html',
            controller: 'noteaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/oa/note/noteaddController.js').then(function () {
                        return $ocLazyLoad.load([
                            'toaster'
                        ]);
                    });
                }]
            }
        })
        .state('main.note.notedetail', {
            url: '/notedetail/:id',
            templateUrl: 'template/module/oa/note/notedetail.html',
            controller: 'notedetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/oa/note/notedetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        }).state('main.addressbook', {
        url: '/addressbook',
        templateUrl: 'template/module/addressbook/addressbook.html',
        controller: 'addressbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/addressbook/addressbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.addressbook.teacherbook', {
        url: '/teacherbook',
        templateUrl: 'template/module/addressbook/teacherbook.html',
        controller: 'teacherbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/addressbook/teacherbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.addressbook.studentbook', {
        url: '/studentbook/{id}',
        templateUrl: 'template/module/addressbook/studentbook.html',
        controller: 'studentbookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/addressbook/studentbookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.coursebook', {
        url: '/coursebook',
        templateUrl: 'template/module/coursebook/coursebook.html',
        controller: 'coursebookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/coursebook/coursebookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.coursebook.teacherbooklist', {
        url: '/teacherbooklist',
        templateUrl: 'template/module/coursebook/teacherbooklist.html',
        controller: 'teacherbooklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/coursebook/teacherbooklistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.coursebook.studentbooklist', {
        url: '/studentbooklist/{id}',
        templateUrl: 'template/module/coursebook/studentbooklist.html',
        controller: 'studentbooklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/coursebook/studentbooklistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.coursebookstudent', {
        url: '/coursebookstudent',
        templateUrl: 'template/module/coursebookstudent/coursebookstudent.html',
        controller: 'coursebookstudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/coursebookstudent/coursebookstudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.coursebookstudent.studentbooklist', {
        url: '/studentbooklist',
        templateUrl: 'template/module/coursebookstudent/studentbooklist.html',
        controller: 'studentbooklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/coursebookstudent/studentbooklistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorerank', {
        url: '/scorerank',
        templateUrl: 'template/module/exammanage/scorerank/scorerank.html',
        controller: 'scorerankController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exammanage/scorerank/scorerankController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorerank.scoreranklist', {
        url: '/scoreranklist/{id}',
        templateUrl: 'template/module/exammanage/scorerank/scoreranklist.html',
        controller: 'scoreranklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exammanage/scorerank/scoreranklistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorerank.radarChart', {
        url: '/radarChart/{classId}/{examId}/{studentId}',
        templateUrl: 'template/module/exammanage/scorerank/radarChart.html',
        controller: 'radarChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exammanage/scorerank/radarChartController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'angular-echarts']);
                });
            }]
        }
    }).state('main.scorerankstudent', {
        url: '/scorerankstudent',
        templateUrl: 'template/module/exammanage/scorerankstudent/scorerankstudent.html',
        controller: 'scorerankstudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exammanage/scorerankstudent/scorerankstudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorerankstudent.scorerankstudentlist', {
        url: '/scorerankstudentlist/{id}',
        templateUrl: 'template/module/exammanage/scorerankstudent/scorerankstudentlist.html',
        controller: 'scorerankstudentlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exammanage/scorerankstudent/scorerankstudentlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.practiserank', {
        url: '/practiserank',
        templateUrl: 'template/module/practisemanage/practiserank/practiserank.html',
        controller: 'practiserankController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisemanage/practiserank/practiserankController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.practiserank.practiseranklist', {
        url: '/practiseranklist/{id}',
        templateUrl: 'template/module/practisemanage/practiserank/practiseranklist.html',
        controller: 'practiseranklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisemanage/practiserank/practiseranklistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.exam', {
        url: '/exam',
        templateUrl: 'template/module/exam/exam.html',
        controller: 'examController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exam/examController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.exam.examlist', {
        url: '/examlist/{id}',
        templateUrl: 'template/module/exam/examlist.html',
        controller: 'examlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exam/examlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.exam.examadd', {
        url: '/examadd/{gradeId}',
        templateUrl: 'template/module/exam/examadd.html',
        controller: 'examaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exam/examaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.exam.examedit', {
        url: '/examedit/{id}/{gradeId}',
        //params: {gradeId: null},
        templateUrl: 'template/module/exam/examadd.html',
        controller: 'examaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exam/examaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.exam.examdetail', {
        url: '/examdetail/{id}/{gradeId}',
        //params: {gradeId: null},
        templateUrl: 'template/module/exam/examdetail.html',
        controller: 'examdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/exam/examdetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examTeacher', {
        url: '/examTeacher',
        templateUrl: 'template/module/examTeacher/examTeacher.html',
        controller: 'examTeacherController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examTeacher/examTeacherController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examTeacher.examTeacherlist', {
        url: '/examTeacherlist/{id}',
        templateUrl: 'template/module/examTeacher/examTeacherlist.html',
        controller: 'examTeacherlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examTeacher/examTeacherlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examTeacher.examTeacheradd', {
        url: '/examTeacheradd/{id}',
        templateUrl: 'template/module/examTeacher/examTeacheradd.html',
        controller: 'examTeacheraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examTeacher/examTeacheraddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examTeacher.examTeacheredit', {
        url: '/examTeacheredit/{id}/{practiseId}',
        templateUrl: 'template/module/examTeacher/examTeacheradd.html',
        controller: 'examTeacheraddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examTeacher/examTeacheraddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examTeacher.examTeacherdetail', {
        url: '/examTeacherdetail/{id}/{practiseId}',
        templateUrl: 'template/module/examTeacher/examTeacherdetail.html',
        controller: 'examTeacherdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examTeacher/examTeacherdetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examscore', {
        url: '/examscore',
        templateUrl: 'template/module/examscore/examscore.html',
        controller: 'examscoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examscore/examscoreController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examScoreChart', {
        url: '/examScoreChart',
        templateUrl: 'template/module/examScoreChart/examScoreChart.html',
        controller: 'examScoreChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreChartController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examGradeScoreChart', {
        url: '/examGradeScoreChart',
        templateUrl: 'template/module/res/examGradeScoreChart/examGradeScoreChart.html',
        controller: 'examGradeScoreChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/examGradeScoreChart/examGradeScoreChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScoreChartList', {
        url: '/examScoreChartList/{id}',
        templateUrl: 'template/module/examScoreChart/examScoreChartList.html',
        controller: 'examScoreChartListController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreChartListController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examScoreChart.examScoreAvgChart', {
        url: '/examScoreAvgChart/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreAvgChart.html',
        controller: 'examScoreAvgChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreAvgChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScorePieChart', {
        url: '/examScorePieChart/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScorePieChart.html',
        controller: 'examScorePieChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScorePieChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examStudent.examScoreLineChart', {
        url: '/examScoreLineChart/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreLineChart.html',
        controller: 'examScoreLineChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreLineChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScoreSilvChart', {
        url: '/examScoreSilvChart/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreSilvChart.html',
        controller: 'examScoreSilvChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreSilvChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScoreAnalysisChart', {
        url: '/examScoreAnalysisChart/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreAnalysisChart.html',
        controller: 'examScoreAnalysisChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreAnalysisChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScoreCountChart', {
        url: '/examScoreCountChart/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreCountChart.html',
        controller: 'examScoreCountChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreCountChartController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.examScoreChart.examScoreCountTable', {
        url: '/examScoreCountTable/{classId}/{examId}',
        templateUrl: 'template/module/examScoreChart/examScoreCountTable.html',
        controller: 'examScoreCountTableController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examScoreChart/examScoreCountTableController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.examscore.examscorelist', {
        url: '/examscorelist/{id}',
        templateUrl: 'template/module/examscore/examscorelist.html',
        controller: 'examscorelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examscore/examscorelistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examscore.examdetail', {
        url: '/examdetail/{id}/{groupId}/{classId}',
        //params: {gradeId: null},
        templateUrl: 'template/module/examscore/examdetail.html',
        controller: 'examdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examscore/examdetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.schoolscore', {
        url: '/schoolscore',
        templateUrl: 'template/module/edu/schoolscore/schoolscore.html',
        controller: 'schoolscoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolscore/schoolscoreController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.schoolscore.schoolscorelist', {
        url: '/schoolscorelist/{id}',
        templateUrl: 'template/module/edu/schoolscore/schoolscorelist.html',
        controller: 'schoolscorelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolscore/schoolscorelistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.score', {
        url: '/score',
        templateUrl: 'template/module/score/score.html',
        controller: 'scoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/score/scoreController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.score.scoreInput', {
        url: '/scoreInput/{id}/{ids}/{examId}',
        templateUrl: 'template/module/score/scoreInput.html',
        controller: 'scoreInputController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/score/scoreInputController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorestudent', {
        url: '/scorestudent',
        templateUrl: 'template/module/scorestudent/scorestudent.html',
        controller: 'scorestudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scorestudent/scorestudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scorestudent.scorelook', {
        url: '/scorelook/{id}/{ids}/{examId}',
        templateUrl: 'template/module/scorestudent/scorelook.html',
        controller: 'scorelookController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scorestudent/scorelookController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.practisescore', {
        url: '/practisescore',
        templateUrl: 'template/module/practisescore/practisescore.html',
        controller: 'practisescoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisescore/practisescoreController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    })
        // .state('main.practisescore.practisescorelist', {
        // url: '/practisescorelist/{id}',
        // templateUrl: 'template/module/practisescore/practisescorelist.html',
        // controller: 'practisescorelistController',
        // resolve: {
        //     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
        //         return uiLoad.load('template/module/practisescore/practisescorelistController.js').then(function () {
        //             return $ocLazyLoad.load('toaster');
        //         });
        //     }]
        // }
    // })
    .state('main.practisescoreStudent', {
        url: '/practisescoreStudent',
        templateUrl: 'template/module/practisescoreStudent/practisescoreStudent.html',
        controller: 'practisescoreStudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisescoreStudent/practisescoreStudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.practisescoreStudent.practiseScoreLineChart', {
        url: '/practiseScoreLineChart',
        templateUrl: 'template/module/practisescoreStudent/practiseScoreLineChart.html',
        controller: 'practiseScoreLineChartController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisescoreStudent/practiseScoreLineChartController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'angular-echarts']);
                });
            }]
        }
    }).state('main.practisescoreStudent.practisescoreStudentlist', {
        url: '/practisescoreStudentlist/{id}',
        templateUrl: 'template/module/practisescoreStudent/practisescoreStudentlist.html',
        controller: 'practisescoreStudentlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisescoreStudent/practisescoreStudentlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.practisescoreStudent.practisescoreStudentDetail', {
        url: '/practisescoreStudentDetail/{id}',
        templateUrl: 'template/module/practisescoreStudent/practisescoreStudentDetail.html',
        controller: 'practisescoreStudentDetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/practisescoreStudent/practisescoreStudentDetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examStudent', {
        url: '/examStudent',
        templateUrl: 'template/module/examStudent/examStudent.html',
        controller: 'examStudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examStudent/examStudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examStudent.examscoreStudentlist', {
        url: '/examscoreStudentlist/{id}',
        templateUrl: 'template/module/examStudent/examscoreStudentlist.html',
        controller: 'examscoreStudentlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examStudent/examscoreStudentlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.examStudent.examscoreStudentDetail', {
        url: '/examscoreStudentDetail/{id}',
        templateUrl: 'template/module/examStudent/examscoreStudentDetail.html',
        controller: 'examscoreStudentDetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/examStudent/examscoreStudentDetailController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scoreClass', {
        url: '/scoreClass',
        templateUrl: 'template/module/scoreClass/scoreClass.html',
        controller: 'scoreClassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scoreClass/scoreClassController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scoreClass.scoreClassInput', {
        url: '/scoreClassInput/{id}/{ids}/{practiseId}',
        templateUrl: 'template/module/scoreClass/scoreClassInput.html',
        controller: 'scoreClassInputController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scoreClass/scoreClassInputController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.scoreClass.scoreStudent', {
        url: '/scoreStudent',
        templateUrl: 'template/module/scoreClass/scoreStudent.html',
        controller: 'scoreStudentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scoreClass/scoreStudentController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.plan', {
        url: '/plan',
        templateUrl: 'template/module/oa/plan/plan.html',
        controller: 'planController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'angular-echarts']
                    );
                });
            }]
        }
    }).state('main.plan.planlist', {
        url: '/planlist/:id',
        templateUrl: 'template/module/oa/plan/planlist.html',
        controller: 'planlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planlistController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.plan.planadd', {
        url: '/planadd',
        templateUrl: 'template/module/oa/plan/planadd.html',
        controller: 'planaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.plan.planedit', {
        url: '/planedit/{id}',
        templateUrl: 'template/module/oa/plan/planadd.html',
        controller: 'planaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'http://www.my97.net/dp/My97DatePicker/skin/WdatePicker.css',
                        'http://www.my97.net/dp/My97DatePicker/WdatePicker.js',
                    ]);
                });
            }]
        }
    }).state('main.plan.planclass', {
        url: '/planclass',
        templateUrl: 'template/module/oa/plan/planclass.html',
        controller: 'planclassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planclassController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.plan.planclassadd', {
        url: '/planclassadd',
        templateUrl: 'template/module/oa/plan/planclassadd.html',
        controller: 'planclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planclassaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.plan.planclassedit', {
        url: '/planclassedit/{id}',
        templateUrl: 'template/module/oa/plan/planclassadd.html',
        controller: 'planclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planclassaddController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    })
        .state('main.plan.detail', {
            url: '/detail/:id',
            templateUrl: 'template/module/oa/plan/plandetail.html',
            controller: 'plandetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/oa/plan/plandetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        }).state('main.plan.planreview', {
        url: '/planreview/:id',
        templateUrl: 'template/module/oa/plan/planreview.html',
        controller: 'planreviewController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/plan/planreviewController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }
    }).state('main.task', {
        url: '/task',
        templateUrl: 'template/module/oa/task/task.html',
        controller: 'taskController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa//task/taskController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'checklist-model',
                        'ng-iscroll'
                    ]);
                });
            }]
        }
    }).state('main.task.mytask', {
        url: '/mytask',
        templateUrl: 'template/module/oa/task/mytask.html',
        controller: 'mytaskController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/task/mytaskController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                });
            }]
        }

    }).state('main.task.taskadd', {
        url: '/taskadd',
        templateUrl: 'template/module/oa/task/taskadd.html',
        controller: 'taskaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/oa/task/taskaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'checklist-model'
                    ]);
                });
            }]
        }
    }).state('main.schoolnews', {
        url: '/schoolnews',
        templateUrl: 'template/module/edu/schoolnews/schoolnews.html',
        controller: 'schoolnewsController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolnews/schoolnewsController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                            'toaster',
                            'template/module/edu/schoolnews/schoolnews.css'
                        ]
                    );
                });
            }]
        }
    }).state('main.schoolnews.list', {
        url: '/list/{sorts_id}',
        templateUrl: 'template/module/edu/schoolnews/schoolnewslist.html',
        controller: 'schoolnewslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolnews/schoolnewslistController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                            'toaster'
                        ]
                    );
                });
            }]
        }
    }).state('main.schoolnews.detail', {
        url: '/detail/{id}',
        templateUrl: 'template/module/edu/schoolnews/schoolnewsdetail.html',
        controller: 'schoolnewsdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolnews/schoolnewsdetailController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.schoolnotice', {
        url: '/schoolnotice',
        templateUrl: 'template/module/edu/schoolnotice/schoolnotice.html',
        controller: 'schoolnoticeController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolnotice/schoolnoticeController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                            'toaster',
                            'template/module/edu/schoolnotice/schoolnotice.css'
                        ]
                    );
                });
            }]
        }
    }).state('main.schoolnotice.detail', {
        url: '/detail/{id}',
        templateUrl: 'template/module/edu/schoolnotice/schoolnoticedetail.html',
        controller: 'schoolnoticedetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/schoolnotice/schoolnoticedetailController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.teachers', {
        url: '/teachers',
        templateUrl: 'template/module/classmanage/teachers/index.html',
        controller: 'indexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/teachers/indexController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.teachers.list', {
        url: '/list/{classId}',
        templateUrl: 'template/module/classmanage/teachers/list.html',
        controller: 'teacherslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/teachers/listController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.myteachers', {
        url: '/myteachers',
        templateUrl: 'template/module/myclass/list.html',
        controller: 'myteacherslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/myclass/myteacherslistController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.mycommittee', {
        url: '/mycommittee',
        templateUrl: 'template/module/myclass/committee/list.html',
        controller: 'mycommitteelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/myclass/committee/mycommitteelistController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.committee', {
        url: '/committee',
        templateUrl: 'template/module/classmanage/committee/index.html',
        controller: 'indexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/committee/indexController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.committee.list', {
        url: '/list/{classId}',
        templateUrl: 'template/module/classmanage/committee/list.html',
        controller: 'listController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/committee/listController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster'
                    ]);
                });
            }]
        }
    }).state('main.teachercenter', {
        url: '/teachercenter',
        templateUrl: 'template/module/usercenter/teachercenter/teachercenter.html',
        controller: 'teachercenterController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/teachercenter/teachercenterController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster',
                            'template/module/usercenter/teachercenter/info.css',
                            'timeago'
                        ]
                    );
                });
            }]
        }

    }).state('main.teachercenter.index', {
        url: '/index',
        templateUrl: 'template/module/usercenter/teachercenter/index.html',
        controller: 'indexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/teachercenter/indexController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.teachercenter.info', {
        url: '/info',
        templateUrl: 'template/module/usercenter/teachercenter/info.html',
        controller: 'infoController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/teachercenter/infoController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'lib/angular/ng-img-crop.css']
                    );
                });
            }]
        }
    }).state('main.teachercenter.pwd', {
        url: '/pwd',
        templateUrl: 'template/module/usercenter/teachercenter/pwd.html',
        controller: 'pwdController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/teachercenter/pwdController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.studentcenter', {
        url: '/studentcenter',
        templateUrl: 'template/module/usercenter/studentcenter/studentcenter.html',
        controller: 'studentcenterController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/studentcenter/studentcenterController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                            'toaster',
                            'template/module/usercenter/studentcenter/info.css',
                            'timeago'
                        ]
                    );
                });
            }]
        }

    }).state('main.studentcenter.index', {
        url: '/index',
        templateUrl: 'template/module/usercenter/studentcenter/index.html',
        controller: 'indexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/studentcenter/indexController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.studentcenter.info', {
        url: '/info',
        templateUrl: 'template/module/usercenter/studentcenter/info.html',
        controller: 'infoController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/studentcenter/infoController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'lib/angular/ng-img-crop.css']
                    );
                });
            }]
        }
    }).state('main.studentcenter.pwd', {
        url: '/pwd',
        templateUrl: 'template/module/usercenter/studentcenter/pwd.html',
        controller: 'pwdController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/usercenter/studentcenter/pwdController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster']
                    );
                });
            }]
        }
    }).state('main.teacherclass', {
        url: '/teacherclass',
        templateUrl: 'template/module/classmanage/teacherclass/index.html',
        controller: 'teacherclassindexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/teacherclass/teacherclassindexController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'template/module/classmanage/teacherclass/teacherclass.css']
                    );
                });
            }]
        }
    }).state('main.teacherclass.list', {
        url: '/list/{id}',
        templateUrl: 'template/module/classmanage/teacherclass/list.html',
        controller: 'teacherclasslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/teacherclass/listController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                            'toaster',
                            'template/module/classmanage/teacherclass/studentgridController.js'
                        ]
                    );
                });
            }]
        }
    }).state('main.teacherclass.edit', {
        url: '/edit/{id}/{classId}',
        templateUrl: 'template/module/classmanage/teacherclass/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/teacherclass/detailController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'lib/angular/ng-img-crop.css']
                    );
                });
            }]
        }
    }).state('main.studentclass', {
        url: '/studentclass',
        template: '<div ui-view></div>'
    }).state('main.studentclass.list', {
        url: '/list',
        templateUrl: 'template/module/classmanage/studentclass/list.html',
        controller: 'listController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/studentclass/listcontroller.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster',
                            'template/module/classmanage/studentclass/teacherclass.css',
                            'template/module/classmanage/studentclass/studentgridController.js'
                        ]
                    );
                });
            }]
        }
    }).state('main.studentclass.detail', {
        url: '/detail/{id}',
        templateUrl: 'template/module/classmanage/studentclass/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/studentclass/detailController.js').then(function () {
                    return $ocLazyLoad.load(
                        ['toaster', 'template/module/classmanage/studentclass/teacherclass.css']
                    );
                });
            }]
        }
    }).state('main.activity', {
        url: '/activity',
        templateUrl: 'template/module/edu/activity/activity.html',
        controller: 'activityController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/activity/activity.css']);
                });
            }]
        }
    }).state('main.activity.activityclass', {
        url: '/activityclass',
        templateUrl: 'template/module/edu/activity/activityclass.html',
        controller: 'activityclassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityclassController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.activityclassadd', {
        url: '/activityclassadd',
        templateUrl: 'template/module/edu/activity/activityclassadd.html',
        controller: 'activityclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityclassaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.activityclassedit', {
        url: '/activityclassedit/{id}',
        templateUrl: 'template/module/edu/activity/activityclassadd.html',
        controller: 'activityclassaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityclassaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.activity.activitylist', {
        url: '/activitylist/{sorts_id}',
        templateUrl: 'template/module/edu/activity/activitylist.html',
        controller: 'activitylistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activitylistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.activityadd', {
        url: '/activityadd',
        templateUrl: 'template/module/edu/activity/activityadd.html',
        controller: 'activityaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.activityedit', {
        url: '/activityedit/{id}',
        templateUrl: 'template/module/edu/activity/activityadd.html',
        controller: 'activityaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activityaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.activity.activitydetail', {
        url: '/activitydetail/{id}',
        templateUrl: 'template/module/edu/activity/activitydetail.html',
        controller: 'activitydetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/activitydetailController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.activity.works', {
        url: '/works/{id}',
        templateUrl: 'template/module/edu/activity/works.html',
        controller: 'worksController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/worksController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.worksadd', {
        url: '/worksadd/{activityId}',
        templateUrl: 'template/module/edu/activity/worksadd.html',
        controller: 'worksaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/worksaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activity.worksedit', {
        url: '/worksedit/{id}',
        templateUrl: 'template/module/edu/activity/worksadd.html',
        controller: 'worksaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activity/worksaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }

    }).state('main.activityteacher', {
        url: '/activityteacher',
        templateUrl: 'template/module/edu/activityteacher/activityteacher.html',
        controller: 'activityteacherController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activityteacher/activityteacherController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/activityteacher/activity.css']);
                });
            }]
        }
    }).state('main.activityteacher.activityteacherlist', {
        url: '/activityteacherlist/{sorts_id}',
        templateUrl: 'template/module/edu/activityteacher/activityteacherlist.html',
        controller: 'activityteacherlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activityteacher/activityteacherlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.activityteacher.activityteacherdetail', {
        url: '/activityteacherdetail/{id}',
        templateUrl: 'template/module/edu/activityteacher/activityteacherdetail.html',
        controller: 'activityteacherdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/activityteacher/activityteacherdetailController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.teacherhomework', {
        url: '/teacherhomework',
        templateUrl: 'template/module/homework/teacherhomework/teacherhomework.html',
        controller: 'teacherhomeworkController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/teacherhomeworkController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/homework/teacherhomework/homework.css']);
                });
            }]
        }
    }).state('main.teacherhomework.list', {
        url: '/list',
        templateUrl: 'template/module/homework/teacherhomework/list.html',
        controller: 'teachrehomeworklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/teachrehomeworklistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor', 'checklist-model']);
                });
            }]
        }
    }).state('main.teacherhomework.list1', {
        url: '/list1',
        templateUrl: 'template/module/homework/teacherhomework/list1.html',
        controller: 'teachrehomeworklistController1',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/teachrehomeworklistController1.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor', 'checklist-model']);
                });
            }]
        }
    }).state('main.teacherhomework.statelist', {
        url: '/statelist/{classId}/{id}',
        templateUrl: 'template/module/homework/teacherhomework/statelist.html',
        controller: 'teachrehomeworkstatelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/teachrehomeworkstatelistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor', 'checklist-model']);
                });
            }]
        }
    }).state('main.teacherhomework.stateshow', {
        url: '/stateshow/{id}/{classId}',
        templateUrl: 'template/module/homework/teacherhomework/stateshow.html',
        controller: 'teachrehomeworkstateshowController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/teachrehomeworkstateshowController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor', 'checklist-model']);
                });
            }]
        }
    }).state('main.teacherhomework.homeworkadd', {
        url: '/homeworkadd',
        templateUrl: 'template/module/homework/teacherhomework/homeworkadd.html',
        controller: 'homeworkaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/homeworkaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.teacherhomework.homeworkedit', {
        url: '/homeworkedit/{id}',
        templateUrl: 'template/module/homework/teacherhomework/homeworkadd.html',
        controller: 'homeworkaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/homeworkaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.teacherhomework.questionadd', {
        url: '/questionadd',
        templateUrl: 'template/module/homework/teacherhomework/questionadd.html',
        controller: 'questionaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/teacherhomework/questionaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/homework/teacherhomework/answertemp/singletempController.js',
                        'template/module/homework/teacherhomework/answertemp/multipletempController.js',
                        'template/module/homework/teacherhomework/answertemp/qatempController.js',
                        'template/module/homework/teacherhomework/answertemp/judgetempController.js',
                        'template/module/homework/teacherhomework/answertemp/completempController.js',
                        'template/module/homework/teacherhomework/answertemp/aqtempController.js',
                        'template/ueditor-1.4.3.3/kityformula-plugin/addKityFormulaDialog.js',
                        'template/ueditor-1.4.3.3/kityformula-plugin/getKfContent.js',
                        'template/ueditor-1.4.3.3/kityformula-plugin/defaultFilterFix.js'
                    ]);
                });
            }]
        }
    }).state('main.studenthomework', {
        url: '/studenthomework',
        template: '<div ui-view></div>',

    }).state('main.studenthomework.list', {
        url: '/list',
        templateUrl: 'template/module/homework/studenthomework/list.html',
        controller: 'studenthomeworklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/studenthomework/studenthomeworklistController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/homework/teacherhomework/homework.css'
                    ]);
                });
            }]
        }
    }).state('main.studenthomework.detail', {
        url: '/detail/{id}/{hid}',
        templateUrl: 'template/module/homework/studenthomework/detail.html',
        controller: 'studenthomeworkdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/homework/studenthomework/studenthomeworkdetailController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/homework/teacherhomework/homework.css'
                    ]);
                });
            }]
        }
    }).state('main.scl_bbs', {
        url: '/scl_bbs',
        templateUrl: 'template/module/scl_bbs/thread.html',
        controller: 'threadController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threadController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/scl_bbs/thread.css']);
                });
            }]
        }
    }).state('main.scl_bbs.section', {
        url: '/section',
        templateUrl: 'template/module/scl_bbs/section.html',
        controller: 'sectionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/sectionController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.sectionadd', {
        url: '/sectionadd',
        templateUrl: 'template/module/scl_bbs/sectionadd.html',
        controller: 'sectionaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/sectionaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'checklist-model'
                    ]);
                });
            }]
        }
    }).state('main.scl_bbs.sectionedit', {
        url: '/sectionedit/{id}',
        templateUrl: 'template/module/scl_bbs/sectionadd.html',
        controller: 'sectionaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/sectionaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.scl_bbs.threadlist', {
        url: '/threadlist/{id}',
        templateUrl: 'template/module/scl_bbs/threadlist.html',
        controller: 'threadlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threadlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.mythreadlist', {
        url: '/mythreadlist/{id}',
        templateUrl: 'template/module/scl_bbs/mythreadlist.html',
        controller: 'mythreadlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/mythreadlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.draftlist', {
        url: '/draftlist/{id}',
        templateUrl: 'template/module/scl_bbs/draftlist.html',
        controller: 'draftlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/draftlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.draftdetail', {
        url: '/draftdetail/{id}',
        templateUrl: 'template/module/scl_bbs/draftdetail.html',
        controller: 'draftdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/draftdetailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.commentDetail', {
        url: '/commentDetail/{id}',
        templateUrl: 'template/module/scl_bbs/commentDetail.html',
        controller: 'commentDetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/commentDetailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.myComment', {
        url: '/myComment',
        templateUrl: 'template/module/scl_bbs/myComment.html',
        controller: 'myCommentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/myCommentController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.threadadd', {
        url: '/threadadd/{id}',
        templateUrl: 'template/module/scl_bbs/threadadd.html',
        controller: 'threadaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threadaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.threadaddbysection', {
        url: '/threadaddbysection/{id}',
        templateUrl: 'template/module/scl_bbs/threadaddbysection.html',
        controller: 'threadaddbysectionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threadaddbysectionController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.threadaddbysection', {
        url: '/threadaddbysection/{id}',
        templateUrl: 'template/module/bbs/threadaddbysection.html',
        controller: 'threadaddbysectionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threadaddbysectionController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.scl_bbs.threadedit', {
        url: '/threadedit/{id}',
        templateUrl: 'template/module/scl_bbs/threadedit.html',
        controller: 'threadeditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threadeditController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.scl_bbs.draftedit', {
        url: '/draftedit/{id}',
        templateUrl: 'template/module/scl_bbs/draftedit.html',
        controller: 'drafteditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/drafteditController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.scl_bbs.threaddetail', {
        url: '/threaddetail/{id}',
        templateUrl: 'template/module/scl_bbs/threaddetail.html',
        controller: 'threaddetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/scl_bbs/threaddetailController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.bbs', {
        url: '/bbs',
        templateUrl: 'template/module/bbs/thread.html',
        controller: 'threadController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threadController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/bbs/thread.css']);
                });
            }]
        }
    }).state('main.bbs.section', {
        url: '/section',
        templateUrl: 'template/module/bbs/section.html',
        controller: 'sectionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/sectionController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.threadlist', {
        url: '/threadlist/{id}',
        templateUrl: 'template/module/bbs/threadlist.html',
        controller: 'threadlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threadlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.mythreadlist', {
        url: '/mythreadlist/{id}',
        templateUrl: 'template/module/bbs/mythreadlist.html',
        controller: 'mythreadlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/mythreadlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.draftlist', {
        url: '/draftlist/{id}',
        templateUrl: 'template/module/bbs/draftlist.html',
        controller: 'draftlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/draftlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.draftdetail', {
        url: '/draftdetail/{id}',
        templateUrl: 'template/module/bbs/draftdetail.html',
        controller: 'draftdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/draftdetailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.commentDetail', {
        url: '/commentDetail/{id}',
        templateUrl: 'template/module/bbs/commentDetail.html',
        controller: 'commentDetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/commentDetailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.myComment', {
        url: '/myComment',
        templateUrl: 'template/module/bbs/myComment.html',
        controller: 'myCommentController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/myCommentController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.threadadd', {
        url: '/threadadd/{id}',
        templateUrl: 'template/module/bbs/threadadd.html',
        controller: 'threadaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threadaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.bbs.threadedit', {
        url: '/threadedit/{id}',
        templateUrl: 'template/module/bbs/threadedit.html',
        controller: 'threadeditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threadeditController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.bbs.draftedit', {
        url: '/draftedit/{id}',
        templateUrl: 'template/module/bbs/draftedit.html',
        controller: 'drafteditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/drafteditController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);
                });
            }]
        }
    }).state('main.bbs.threaddetail', {
        url: '/threaddetail/{id}',
        templateUrl: 'template/module/bbs/threaddetail.html',
        controller: 'threaddetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/bbs/threaddetailController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.teachingmanage', {
        url: '/teachingmanage',
        templateUrl: 'template/module/edu/teachingmanage/teaching.html',
        controller: 'teachingController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/teachingmanage/teachingController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/edu/teachingmanage/teaching.css'
                    ]);
                });
            }]
        }
    }).state('main.teachingmanage.teachinglist', {
        url: '/teachinglist/{id}',
        templateUrl: 'template/module/edu/teachingmanage/teachinglist.html',
        controller: 'teachinglistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/teachingmanage/teachinglistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.teachingmanage.teachingadd', {
        url: '/teachingadd/{id}',
        templateUrl: 'template/module/edu/teachingmanage/teachingadd.html',
        controller: 'teachingaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/teachingmanage/teachingaddController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'checklist-model',
                        'ng-iscroll'
                    ]);
                });
            }]
        }
    }).state('main.teachingmanage.teachingedit', {
        url: '/teachingedit/{id}',
        templateUrl: 'template/module/edu/teachingmanage/teachingedit.html',
        controller: 'teachingeditController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/teachingmanage/teachingeditController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'checklist-model',
                        'ng-iscroll'

                    ]);
                });
            }]
        }
    }).state('main.teachingmanage.teachingdetail', {
        url: '/teachingdetail/{id}',
        templateUrl: 'template/module/edu/teachingmanage/teachingdetail.html',
        controller: 'teachingdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/teachingmanage/teachingdetailController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.myteaching', {
        url: '/myteaching',
        templateUrl: 'template/module/edu/myteaching/myteachings.html',
        controller: 'myteachingsController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/myteaching/myteachingsController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/myteaching/teaching.css']);
                });
            }]
        }
    }).state('main.myteaching.teachinglist', {
        url: '/teachinglist/{id}',
        templateUrl: 'template/module/edu/myteaching/teachinglist.html',
        controller: 'teachinglistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/myteaching/teachinglistController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.myteaching.teachingvisit', {
        url: '/teachingvisit/{id}',
        templateUrl: 'template/module/edu/myteaching/teachingvisit.html',
        controller: 'teachingvisitController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/myteaching/teachingvisitController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.myteaching.teachingjoin', {
        url: '/teachingjoin/{id}',
        templateUrl: 'template/module/edu/myteaching/teachingjoin.html',
        controller: 'teachingjoinController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/myteaching/teachingjoinController.js').then(function () {

                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);

                });
            }]
        }
    }).state('main.res', {
        url: '/res',
        template: '<div ui-view></div>'
    }).state('main.res.teacherresindex', {
        url: '/teacherresindex',
        templateUrl: 'template/module/res/res/teacher/teacherresindex.html',
        controller: 'teacherresindexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/res/teacher/teacherresindexController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/res/teacher/teacherres.css'
                    ]);

                });
            }]
        }
    }).state('main.res.teacherrestree', {
        url: '/teacherrestree/{textbookId}',
        templateUrl: 'template/module/res/res/teacher/teacherrestree.html',
        controller: 'teacherrestreeController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/res/teacher/teacherrestreeController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/res/teacher/teacherres.css',
                        //'template/module/res/teacher/teacherresgroupController.js',
                        'Dtree',
                        '/template/js/FileSaver.js',
                    ]);

                });
            }]
        }
    }).state('main.res.teacherrestree.list', {
        url: '/list/{textbookId}',
        templateUrl: 'template/module/res/res/teacher/teacherreslist.html',
        controller: 'teacherreslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/res/teacher/teacherreslistController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        // 'template/module/res/teacher/teacherres.css',
                        // 'template/module/res/teacher/teacherresgroupController.js',
                        // 'Dtree'
                    ]);

                });
            }]
        }
    }).state('main.res.teacherrestree.detail', {
        url: '/detail/{textbookId}/{id}/{type}',
        templateUrl: 'template/module/res/res/teacher/teacherresdetail.html',
        controller: 'teacherresdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/res/teacher/teacherresdetailController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        '/res/flexpaper/js/flexpaper.js',
                        '/res/flexpaper/js/flexpaper_handlers.js',
                        '/res/jwplayer/jwplayer.js',
                    ]);

                });
            }]
        }
    })
    .state('main.res.teacherfile', {
        url: '/teacherfile',
        templateUrl: 'template/module/res/teacherfile/teacherfile.html',
        controller: 'teacherfileController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/teacherfile/teacherfileController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'Dtree',
                        'template/module/res/teacherfile/filemanage.css'
                    ]);

                });
            }]
        }
    })
    .state('main.res.teacherfile.filemanage', {
        url: '/filemanage/{parentId}',
        templateUrl: 'template/module/res/teacherfile/filemanage.html',
        controller: 'filemanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/teacherfile/filemanageController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng-context-menu',
                        '/template/js/FileSaver.js',
                    ]);

                });
            }]
        }
    })
    .state('main.res.teacherfile.mysharefilemanage', {
        url: '/mysharefilemanage',
        templateUrl: 'template/module/res/teacherfile/mysharefilemanage.html',
        controller: 'mysharefilemanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/teacherfile/mysharefilemanageController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng-context-menu'
                    ]);

                });
            }]
        }
    })
    .state('main.res.teacherfile.sharefilemanage', {
        url: '/sharefilemanage',
        templateUrl: 'template/module/res/teacherfile/sharefilemanage.html',
        controller: 'sharefilemanageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/teacherfile/sharefilemanageController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng-context-menu'
                    ]);

                });
            }]
        }

    }).state('main.res.teacherfile.sharefileshow', {
        url: '/sharefileshow/{id}',
        templateUrl: 'template/module/res/teacherfile/sharefileshow.html',
        controller: 'sharefileshowController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/teacherfile/sharefileshowController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng-context-menu',
                        '/template/js/FileSaver.js',
                    ]);

                });
            }]
        }
    }).state('main.extrares', {
            url: '/extrares',
            template: '<div ui-view></div>'
        }).state('main.extrares.reslist', {
        url: '/reslist',
        templateUrl: 'template/module/res/extrares/teacher/extrareslist.html',
        controller: 'extrareslistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/extrares/teacher/extrareslistController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/extrares/teacher/extrares.css'
                    ]);

                });
            }]
        }
    }).state('main.extrares.detailindex', {
        url: '/detailindex',
        templateUrl: 'template/module/res/extrares/teacher/extraresdetailindex.html',
        controller: 'extraresdetailindexController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/extrares/teacher/extraresdetailindexController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/extrares/teacher/extrares.css',
                        '/res/jwplayer/jwplayer.js',
                    ]);

                });
            }]
        }
    }).state('main.extrares.detailindex.detail', {
        url: '/detail/{id}/{title}/{resType}',
        templateUrl: 'template/module/res/extrares/teacher/extraresdetail.html',
        controller: 'extraresdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/extrares/teacher/extraresdetailController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/extrares/teacher/extrares.css',
                        '/res/jwplayer/jwplayer.js',
                    ]);

                });
            }]
        }
    }).state('main.extrares.detailindex.detail2', {
        url: '/detail2/{mainId}/{id}/{resType}',
        templateUrl: 'template/module/res/extrares/teacher/extraresdetail2.html',
        controller: 'extraresdetail2Controller',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/res/extrares/teacher/extraresdetail2Controller.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/res/extrares/teacher/extrares.css',
                        '/res/jwplayer/jwplayer.js',
                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework', {
        url: '/teacheronlinehomework',
        templateUrl: 'template/module/onlinehomework/teacher/onlinehomework.html',
        controller: 'onlinehomeworkController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworkController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/homework/teacherhomework/homework.css',

                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.list', {
        url: '/list',
        templateUrl: 'template/module/onlinehomework/teacher/list.html',
        controller: 'teacheronlinehomeworklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/teacheronlinehomeworklistController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'checklist-model'
                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.onlinehomeworkadd', {
        url: '/onlinehomeworkadd',
        templateUrl: 'template/module/onlinehomework/teacher/onlinehomeworkadd.html',
        controller: 'onlinehomeworkaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworkaddController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.homeworkedit', {
        url: '/homeworkedit/{id}',
        templateUrl: 'template/module/onlinehomework/teacher/onlinehomeworkadd.html',
        controller: 'onlinehomeworkaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworkaddController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.choice', {
        url: '/choice/{id}/{gradeId}/{subjectId}/{chapterId}/{knowledgePointId}',
        templateUrl: 'template/module/onlinehomework/teacher/choicequestion.html',
        controller: 'choicequestionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/choicequestionController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/onlinehomework/teacher/question.css',
                        'template/module/onlinehomework/teacher/platformquestion.js',
                        'template/module/onlinehomework/teacher/mycollectquestion.js',
                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.show', {
        url: '/show/{id}',
        templateUrl: 'template/module/onlinehomework/teacher/showquestion.html',
        controller: 'showquestionController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/showquestionController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/onlinehomework/teacher/question.css'
                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.list1', {
        url: '/list1',
        templateUrl: 'template/module/onlinehomework/teacher/list1.html',
        controller: 'onlinehomeworklist1Controller',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworklist1Controller.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.statelist', {
        url: '/statelist/{classId}/{id}',
        templateUrl: 'template/module/onlinehomework/teacher/statelist.html',
        controller: 'onlinehomeworkstatelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworkstatelistController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor'

                    ]);

                });
            }]
        }
    }).state('main.teacheronlinehomework.stateshow', {
        url: '/stateshow/{id}/{hid}',
        templateUrl: 'template/module/onlinehomework/teacher/stateshow.html',
        controller: 'onlinehomeworkstateshowController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/teacher/onlinehomeworkstateshowController.js').then(function () {

                    return $ocLazyLoad.load([
                        'toaster',
                        'ng.ueditor',
                        'template/module/onlinehomework/teacher/question.css'

                    ]);

                });
            }]
        }
    }).state('main.studentonlinehomework', {
        url: '/studentonlinehomework',
        template: '<div ui-view></div>'
        
    }).state('main.studentonlinehomework.list', {
        url: '/list',
        templateUrl: 'template/module/onlinehomework/student/list.html',
        controller: 'studentonlinehomeworklistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/student/studentonlinehomeworklistController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                        'toaster',
                        'template/module/homework/teacherhomework/homework.css'
                        ]
                        );
                });
            }]
        }
    }).state('main.studentonlinehomework.detail', {
        url: '/detail/{id}/{hid}/{status}/{endDate}',
        templateUrl: 'template/module/onlinehomework/student/detail.html',
        controller: 'studentonlinehomeworkdetailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/onlinehomework/student/studentonlinehomeworkdetailController.js').then(function () {
                    return $ocLazyLoad.load(
                        [
                        'toaster',
                        'template/module/homework/teacherhomework/homework.css',
                        'template/module/onlinehomework/teacher/question.css',
                        'ng.ueditor'
                        
                        ]
                        );
                });
            }]
        }
    }).state('main.rules', {
        url: '/rules',
        templateUrl: 'template/module/edu/rules/rules.html',
        controller: 'rulesController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/rules/rulesController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/rules/rules.css']);
                });
            }]
        }
    }).state('main.rules.list', {
        url: '/list',
        templateUrl: 'template/module/edu/rules/list.html',
        controller: 'listController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/rules/listController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.rules.dormlist', {
        url: '/dormlist',
        templateUrl: 'template/module/edu/rules/dormlist.html',
        controller: 'dormlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/rules/dormlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.rules.rulesadd', {
        url: '/rulesadd',
        templateUrl: 'template/module/edu/rules/rulesadd.html',
        controller: 'rulesaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/rules/rulesaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.rules.dormrulesadd', {
        url: '/dormrulesadd',
        templateUrl: 'template/module/edu/rules/dormrulesadd.html',
        controller: 'dormrulesaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/rules/dormrulesaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.userules', {
        url: '/userules',
        templateUrl: 'template/module/classmanage/userules/userules.html',
        controller: 'userulesController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/userules/userulesController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/classmanage/userules/rules.css']);
                });
            }]
        }
    }).state('main.userules.list', {
        url: '/list/{id}',
        templateUrl: 'template/module/classmanage/userules/list.html',
        controller: 'listController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/userules/listController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.userules.detail', {
        url: '/detail/{id}',
        templateUrl: 'template/module/classmanage/userules/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/userules/detailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.userules.addscore', {
        url: '/addscore',
        templateUrl: 'template/module/classmanage/userules/addscore.html',
        controller: 'addscoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/userules/addscoreController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.myscore', {
        url: '/myscore',
        templateUrl: 'template/module/myclass/myscore/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/myclass/myscore/detailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitory', {
        url: '/dormitory',
        templateUrl: 'template/module/edu/dormitory/rules.html',
        controller: 'rulesController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/dormitory/rulesController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/dormitory/rules.css']);
                });
            }]
        }
    }).state('main.dormitory.rulesadd', {
        url: '/rulesadd',
        templateUrl: 'template/module/edu/dormitory/rulesadd.html',
        controller: 'rulesaddController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/dormitory/rulesaddController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitory.list', {
        url: '/list',
        templateUrl: 'template/module/edu/dormitory/list.html',
        controller: 'listController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/dormitory/listController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitory.manage', {
        url: '/manage',
        templateUrl: 'template/module/edu/dormitory/manage.html',
        controller: 'manageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/dormitory/manageController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitories', {
        url: '/dormitories',
        templateUrl: 'template/module/classmanage/dormitories/myclass.html',
        controller: 'myclassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/dormitories/myclassController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/classmanage/dormitories/rules.css']);
                });
            }]
        }
    }).state('main.dormitories.alllist', {
        url: '/alllist/{id}/{ids}',
        templateUrl: 'template/module/classmanage/dormitories/alllist.html',
        controller: 'alllistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/dormitories/alllistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitories.ourdormlist', {
        url: '/ourdormlist/{id}',
        templateUrl: 'template/module/classmanage/dormitories/ourdormlist.html',
        controller: 'ourdormlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/dormitories/ourdormlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitories.detail', {
        url: '/detail/{id}',
        templateUrl: 'template/module/classmanage/dormitories/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/dormitories/detailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.dormitories.manage', {
        url: '/manage/{id}/{classId}/{dorm}/{sex}',
        templateUrl: 'template/module/classmanage/dormitories/manage.html',
        controller: 'manageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/dormitories/manageController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.checkdormscore', {
        url: '/checkdormscore',
        templateUrl: 'template/module/classmanage/checkdormscore/myclass.html',
        controller: 'myclassController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/checkdormscore/myclassController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/classmanage/checkdormscore/rules.css']);
                });
            }]
        }
    }).state('main.checkdormscore.ourdormlist', {
        url: '/ourdormlist/{id}',
        templateUrl: 'template/module/classmanage/checkdormscore/ourdormlist.html',
        controller: 'ourdormlistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/checkdormscore/ourdormlistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.adddormscore', {
        url: '/adddormscore',
        templateUrl: 'template/module/edu/adddormscore/rules.html',
        controller: 'rulesController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/adddormscore/rulesController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'template/module/edu/adddormscore/rules.css']);
                });
            }]
        }
    }).state('main.adddormscore.scorelist', {
        url: '/scorelist',
        templateUrl: 'template/module/edu/adddormscore/scorelist.html',
        controller: 'scorelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/adddormscore/scorelistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.adddormscore.manage', {
        url: '/manage/{id}/{classId}/{dorm}/{sex}',
        templateUrl: 'template/module/classmanage/adddormscore/manage.html',
        controller: 'manageController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/adddormscore/manageController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'checklist-model',
                        'ng-iscroll'
                        ]);
                });
            }]
        }
    }).state('main.adddormscore.historyscorelist', {
        url: '/historyscorelist/{dormId}/{dorm}/{id}',
        templateUrl: 'template/module/edu/adddormscore/historyscorelist.html',
        controller: 'historyscorelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/adddormscore/historyscorelistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.checkdormscore.historyscorelist', {
        url: '/historyscorelist/{classId}/{dormId}/{dorm}/{id}',
        templateUrl: 'template/module/classmanage/checkdormscore/historyscorelist.html',
        controller: 'historyscorelistController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/checkdormscore/historyscorelistController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.checkdormscore.detail', {
        url: '/detail/{classId}/{dormId}/{dorm}/{id}',
        templateUrl: 'template/module/classmanage/checkdormscore/detail.html',
        controller: 'detailController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/classmanage/checkdormscore/detailController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.mydormitory', {
        url: '/mydormitory',
        templateUrl: 'template/module/myclass/mydormitory/mydormitory.html',
        controller: 'mydormitoryController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/myclass/mydormitory/mydormitoryController.js').then(function () {
                    return $ocLazyLoad.load([
                        'toaster',
                        'template/module/classmanage/dormitories/rules.css'
                        ]);
                });
            }]
        }
    }).state('main.adddormscore.addscore', {
        url: '/addscore/{dormId}/{dorm}/{id}',
        templateUrl: 'template/module/edu/adddormscore/addscore.html',
        controller: 'addscoreController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/adddormscore/addscoreController.js').then(function () {
                    return $ocLazyLoad.load(['toaster', 'ng.ueditor']);
                });
            }]
        }
    }).state('main.library', {
            url: '/library',
            templateUrl: 'template/module/librarymanage/library/library.html',
            controller: 'libraryController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/library/libraryController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.library.libraryList', {
            url: '/libraryList',
            templateUrl: 'template/module/librarymanage/library/libraryList.html',
            controller: 'libraryListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/library/libraryListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.library.libraryedit', {
            url: '/libraryedit/{id}',
            templateUrl: 'template/module/librarymanage/library/libraryadd.html',
            controller: 'libraryListaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/library/libraryaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.shelf', {
            url: '/shelf',
            templateUrl: 'template/module/librarymanage/shelf/shelf.html',
            controller: 'shelfController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/shelf/shelfController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.shelf.shelfList', {
            url: '/shelfList/{library}',
            templateUrl: 'template/module/librarymanage/shelf/shelfList.html',
            controller: 'shelfListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/shelf/shelfListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.shelf.shelfadd', {
            url: '/shelfadd/{roomId}',
            templateUrl: 'template/module/librarymanage/shelf/shelfadd.html',
            controller: 'shelfaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/shelf/shelfaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.shelf.shelfedit', {
            url: '/shelfedit/{roomId}/{id}',
            templateUrl: 'template/module/librarymanage/shelf/shelfadd.html',
            controller: 'shelfaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/shelf/shelfaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.book', {
            url: '/book',
            templateUrl: 'template/module/librarymanage/book/book.html',
            controller: 'bookController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookController.js').then(function () {
                        return $ocLazyLoad.load(['toaster','Dtree']);
                    });
                }]
            }
        })
        .state('main.book.bookList', {
            url: '/bookList/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookList.html',
            controller: 'bookListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.book.bookadd', {
            url: '/bookadd/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookadd.html',
            controller: 'bookaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.book.bookedit', {
            url: '/bookedit/{id}/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookadd.html',
            controller: 'bookaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
         .state('main.book.bookdetail', {
            url: '/bookdetail/{id}/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookdetail.html',
            controller: 'bookdetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookdetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.book.bookclassList', {
            url: '/bookclassList/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookclassList.html',
            controller: 'bookclassListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookclassListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
         .state('main.book.bookclassadd', {
            url: '/bookclassadd/{sorts_id}/{code}/{name}',
            templateUrl: 'template/module/librarymanage/book/bookclassadd.html',
            controller: 'bookclassaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookclassaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
          .state('main.book.bookclassedit', {
            url: '/bookclassedit/{id}',
            templateUrl: 'template/module/librarymanage/book/bookclassadd.html',
            controller: 'bookclassaddController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/book/bookclassaddController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.borrow', {
            url: '/borrow',
            templateUrl: 'template/module/librarymanage/borrow/borrow.html',
            controller: 'borrowController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/borrowController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.borrow.borrowList', {
            url: '/borrowList',
            templateUrl: 'template/module/librarymanage/borrow/borrowList.html',
            controller: 'borrowListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/borrowListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.borrow.borrowBook', {
            url: '/borrowBook',
            templateUrl: 'template/module/librarymanage/borrow/borrowBook.html',
            controller: 'borrowBookController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/borrowBookController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.borrow.borrowOperate', {
            url: '/borrowOperate',
            templateUrl: 'template/module/librarymanage/borrow/borrowOperate.html',
            controller: 'borrowOperateController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/borrowOperateController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.teacherborrow', {
            url: '/teacherborrow',
            templateUrl: 'template/module/librarymanage/borrow/teacherborrow.html',
            controller: 'teacherborrowController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/teacherborrowController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
         .state('main.teacherborrow.teacherborrowList', {
            url: '/teacherborrowList',
            templateUrl: 'template/module/librarymanage/borrow/teacherborrowList.html',
            controller: 'teacherborrowListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/teacherborrowListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
         .state('main.studentborrow', {
            url: '/studentborrow',
            templateUrl: 'template/module/librarymanage/borrow/studentborrow.html',
            controller: 'studentborrowController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/studentborrowController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.studentborrow.studentborrowList', {
            url: '/studentborrowList',
            templateUrl: 'template/module/librarymanage/borrow/studentborrowList.html',
            controller: 'studentborrowListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/borrow/studentborrowListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
          .state('main.instock', {
            url: '/instock',
            templateUrl: 'template/module/librarymanage/instock/instock.html',
            controller: 'instockController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/instock/instockController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.instock.instockList', {
            url: '/instockList',
            templateUrl: 'template/module/librarymanage/instock/instockList.html',
            controller: 'instockListController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/instock/instockListController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.instock.instockBook', {
            url: '/instockBook',
            templateUrl: 'template/module/librarymanage/instock/instockBook.html',
            controller: 'instockBookController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/instock/instockBookController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.instock.instockBookedit', {
            url: '/instockBookedit/{id}',
            templateUrl: 'template/module/librarymanage/instock/instockBook.html',
            controller: 'instockBookController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/instock/instockBookController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.instock.instockdetail', {
            url: '/instockdetail/{id}',
            templateUrl: 'template/module/librarymanage/instock/instockdetail.html',
            controller: 'instockdetailController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/librarymanage/instock/instockdetailController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
        .state('main.course', {
            url: '/course',
            templateUrl: 'template/module/edu/course/course.html',
            controller: 'courseController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/course/courseController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.course.subject', {
            url: '/subject',
            templateUrl: 'template/module/edu/course/courseSubject.html',
            controller: 'courseSubjectController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/course/courseSubjectController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.course.teacher', {
            url: '/teacher',
            templateUrl: 'template/module/edu/course/courseTeacher.html',
            controller: 'courseTeacherController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('template/module/edu/course/courseTeacherController.js').then(function () {
                        return $ocLazyLoad.load(['toaster']);
                    });
                }]
            }
        })
        .state('main.course.schedule', {
        url: '/schedule',
        templateUrl: 'template/module/edu/course/courseSchedule.html',
        controller: 'courseScheduleController',
        resolve: {
            deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                return uiLoad.load('template/module/edu/course/courseScheduleController.js').then(function () {
                    return $ocLazyLoad.load(['toaster','Dtree']);
                });
            }]
        }
    });
}]);