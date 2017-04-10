/*
 桌面应用指令 （用于添加到桌面进行动态编译）
 */

angular.module('myappdirective', []).directive('myClock', function () {  //教师考勤
    // Runs during compile
    return {
        name: 'myClock',  //考勤
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster, $timeout) {


            var success = function (result) {
                toaster.clear('*');
                toaster.pop('success', '', "操作成功");

            }

            var error = function (result) {
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            $scope.work = function (sign, status) {
                API.post('/attendance/add', {'type': sign, 'status': status}, success, error);
            }

            function create_year(y) {
                var c = y ? parseInt(y) : parseInt(new Date().getFullYear());
                var s = "";
                for (var i = c - 10; i <= c + 10; i++) {
                    var d = c == i ? "selected=\"selected\"" : "";
                    s += "<option value=\"" + i + "\" " + d + ">" + i + "</option>";
                }
                ;
                angular.element(".year").html(s);
            }

            function select_month() {
                var m = new Date().getMonth() + 1;
                $('.month').find('option[value="' + m + '"]')[0].selected = true;
            }


            function get_curr_month(obj) {
                var success = function (result) {
                    result.data.reverse();
                    console.log(result.data);

                    for (var i = 0; i < obj.Days.length; i++) {
                        console.log(result.data[i]);
                        if (result.data[i] != undefined) { //有记录
                            if (result.data[i].status) {
                                $(obj.Days[i]).addClass("t");
                            } else {
                                $(obj.Days[i]).addClass("f");
                            }
                        } else {
                            $(obj.Days[i]).addClass("n");
                        }
                    }
                }
                var error = function (result) {
                    console.log(result);

                }

                API.post('/attendance/read/month', {"date": new Date(obj.Year + '-' + obj.Month + '-1')}, success, error);

            }


            function get_num() {

                var callback = function () {
                    var cale = new Calendar("idCalendar",
                        {
                            //SelectDay: new Date().setDate(10),
                            Year: $('.year option:selected').val(),
                            Month: $('.month option:selected').val(),
                            onSelectDay: function (o) {
                                o.className = "onSelect";
                            },
                            onToday: function (o) {
                                o.className = "onToday";
                            },
                            onFinish: function () {
                                console.log('完成');

                                //get_curr_month(this);

                            }
                        })

                    $('#idCalendarPre').off('click').click(function () {
                        cale.PreMonth(create_year);
                    });

                    $('#idCalendarNext').off('click').click(function () {
                        cale.NextMonth(create_year);

                    });

                }
                callback();


            }

            function init() {
                create_year();
                select_month();

                get_num();

                $('.year').change(function () {
                    create_year(parseInt($('.year option:selected').val()));
                    get_num();
                })


                $('.month').change(function () {
                    get_num();
                });
            }

            init();

        },
        //require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '',
        templateUrl: 'template/module/myclock/myclockdesk.html',
        //replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myNote', function () { //备忘录
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            $scope.search = function () {
                var success = function (result) {
                    //console.log(result);
                    $scope.pageInfo = result.data;
                    if ($scope.pageInfo.list.length > 7) {
                        $scope.pageInfo.list.length = 7;
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/reminder/read/list', $scope.param, success, error);

            }

            $scope.search();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/oa/note/notedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myPlan', function () {   //计划
                                       // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            $scope.get_list = function () {

                var success = function (result) {
                    //console.log('计划：');
                    //console.log(result);

                    $scope.pageInfo = result.data;
                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();
                }
                var error = function (result) {
                    console.log(result)
                }

                API.post('/oa/plan/read/list', {}, success, error);
            };
            $scope.get_list();


            //图表
            $scope.get_echarts_data = function(){
                var success = function(result) {

                     var pageload = {
                            name: '周期',
                            datapoints: result.data
                        };

                     var temp = [];
                     for (var i = 0; i < result.data.length; i++) {
                            temp.push(result.data[i].x);
                        }

                     $scope.config = {
                        title: "",
                        subtitle: '',
                        radius : '90%',
                        center: ['55%', '50%'],
                        debug: true,
                        showXAxis: true,
                        showYAxis: true,
                        showLegend: true,
                        stack: false,
                        legend: {
                            //orient: 'horizontal',
                            x: 'left',
                            y:"center",
                            data:temp
                      }
                    };

                    $scope.data = [pageload];

                    $scope.$apply();
                }
                var error = function(result) {
                    // toaster.clear('*');
                    // toaster.pop('error', '', result.msg);
                }

                API.post('/oa/plan/read/statistics', {}, success, error);
            }

            $scope.get_echarts_data();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/oa/plan/plandesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myTask', function () {   //计划
                                       // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            $scope.get_list = function () {

                var success = function (result) {
                    console.log('计划：');
                    console.log(result);

                    $scope.pageInfo = result.data;
                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();
                }
                var error = function (result) {
                    console.log(result)
                }

                API.post('/oa/plan/read/list', {}, success, error);
            };
            $scope.get_list();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/oa/task/taskdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myEmail', function () {   //邮件
                                        // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            //未读邮件数量
            $scope.loading = true;
            $scope.get_num = function () {

                var success = function (result) {
                    console.log(result);
                    $scope.num = result.data;
                    $scope.$apply();
                };
                var error = function () {

                };

                API.post('/oa/mail/getOaMailNoRead', {}, success, error);


            }
            $scope.get_num();

            var sort_byId = function (list_data) {

                var by = function (name, minor) {
                    return function (o, p) {
                        var a, b;
                        if (typeof o === "object" && typeof p === "object" && o && p) {
                            a = o[name];
                            b = p[name];
                            if (a === b) {
                                return typeof minor === 'function' ? minor(o, p) : 0;
                            }
                            if (typeof a === typeof b) {
                                return a < b ? 1 : -1;
                            }
                            return typeof a < typeof b ? -1 : 1;
                        }
                        else {
                            throw ("error");
                        }
                    }
                }


                //list_data.sort(by('select_time',by('id')));
                list_data.sort(by('empIsread'));

            };


            //取得邮件
            $scope.get_mail = function () {
                $scope.loading = true;
                var success = function (result) {
                    console.log(result);
                    $scope.pageInfo = result.data;
                    sort_byId($scope.pageInfo.list);
                    if ($scope.pageInfo.list.length > 6) {
                        $scope.pageInfo.list.length = 6;
                    }
                    $scope.loading = false;
                    $scope.$apply();

                }

                var error = function (result) {
                    /*toaster.clear('*');
                     toaster.pop('error', '', result.msg);*/
                }

                API.post('/oa/mail/listOaMailInbox?empStatus=1', {}, success, error);

            }

            $scope.get_mail();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/oa/email/emaildesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myNews', function () {   //新闻资讯(校园新闻老师端)
                                       // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {


            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo_news = result.data;

                    if ($scope.pageInfo_news.list.length > 5) {
                        $scope.pageInfo_news.list.length = 5;
                    }
                    $scope.$apply();


                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/news/read/list', $scope.param, success, error);

            }

            $scope.search();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/news/newsdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('mySchoolnews', function () {   //新闻(学生端)
                                             // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {


            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo_news = result.data;

                    if ($scope.pageInfo_news.list.length > 5) {
                        $scope.pageInfo_news.list.length = 5;
                    }
                    $scope.$apply();


                    var mySwiper = new Swiper('.swiper1', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true
                        // mousewheelControl:true,
                        // mode: 'vertical'
                    })

                    $('.news-left').on('click', function (e) {
                        e.preventDefault()
                        mySwiper.swipePrev()
                    })
                    $('.news-right').on('click', function (e) {
                        e.preventDefault()
                        mySwiper.swipeNext()
                    })


                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/news/read/list', $scope.param, success, error);

            }

            $scope.search();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/news/newsdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myBbs', function () {   //论坛(访客端)
                                       // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {


            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo = result.data;

                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();


                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/bbs/read/list', {}, success, error);

            }

            $scope.search();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/bbs/bbsdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myDormscore', function () {   //论坛(访客端)
                                       // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {


            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo = result.data;

                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();


                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/bbs/read/list', {}, success, error);

            }

            $scope.search();


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/classmanage/checkdormscore/dormdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myActivityteacher', function () {   //校园活动（老师端）
                                                  // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo_act = result.data;

                    if ($scope.pageInfo_act.list.length > 5) {
                        $scope.pageInfo_act.list.length = 5;
                    }
                    $scope.$apply();

                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/activity/getListByParam', $scope.param, success, error);

            }

            $scope.search();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/activity/activitydesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myActivitystudent', function () {   //校园活动（学生端）
                                                  // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

            $scope.search = function () {
                var success = function (result) {

                    for (var i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].imgUrl == null) {
                            result.data.list[i].imgUrl = "res/img/no.jpg";
                        }
                    }

                    $scope.pageInfo_act = result.data;

                    if ($scope.pageInfo_act.list.length > 5) {
                        $scope.pageInfo_act.list.length = 5;
                    }
                    $scope.$apply();

                    var mySwiper_act = new Swiper('.swiper2', {
                        // pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true
                        // mousewheelControl:true,
                        // mode: 'vertical'
                    })

                    $('.act-left').on('click', function (e) {
                        e.preventDefault()
                        mySwiper_act.swipePrev()
                    })
                    $('.act-right').on('click', function (e) {
                        e.preventDefault()
                        mySwiper_act.swipeNext()
                    })


                }

                $scope.imgfilter = function (item) {
                    if (item.imgUrl == null) {
                        return false;
                    } else {
                        return true;
                    }
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/scl/activity/getListByParam', $scope.param, success, error);

            }

            $scope.search();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/activity/activitydesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myTelbook', function () {  //通讯录
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {
            //请求数据
            $scope.param = {};
            $scope.getClass = function () {
                var success = function (result) {
                    console.log(result.data);
                    $scope.classInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            //$scope.getClass();

            //请求数据
            $scope.appname = "通讯录";

            $scope.search = function () {
                var success = function (result) {
                    $scope.teacher = result.data;
                    if ($scope.teacher.list.length > 6) {
                        $scope.teacher.list.length = 6;
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/teacher', $scope.param, success, error);

            }
            $scope.search();

            $scope.searchStudent = function (id) {
                var success = function (result) {
                    $scope.student = result.data;
                    if ($scope.student.list.length > 5) {
                        $scope.student.list.length = 5;
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.param["classId"] = id;
                API.post('/oa/addressbook/read/list/student', $scope.param, success, error);

            }

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/telbook/telbookdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myTeacherschoolnotice', function () {  //学校公告 (老师)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {
            //请求数据
            $scope.get_list = function () {

                var success = function (result) {
                    $scope.pageInfo = result.data;
                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();
                };

                var error = function () {

                }
                API.post("/scl/affiche/getList",{}, success, error);
            }
            $scope.get_list();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/schoolnotice/noticedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    }
}).directive('myStudentschoolnotice', function () {  //学校公告 (学生)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {
            //请求数据
            $scope.get_list = function () {

                var success = function (result) {
                    $scope.pageInfo = result.data;
                    if ($scope.pageInfo.list.length > 5) {
                        $scope.pageInfo.list.length = 5;
                    }
                    $scope.$apply();
                };

                var error = function () {

                }
                API.post("/scl/affiche/getList", {}, success, error);
            }
            $scope.get_list();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/edu/schoolnotice/noticedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    }
}).directive('teacherdesk', function () {  //老师管理
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {
            //请求数据
            $scope.appname = "老师管理";

            $scope.search = function () {
                var success = function (result) {
                    $scope.teacher = result.data;
                    if ($scope.teacher.list.length > 5) {
                        $scope.teacher.list.length = 5;
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/teacher', $scope.param, success, error);

            }
            $scope.search();

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/teachermanage/teacherdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('studentdesk', function () {  //学生管理
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, API, toaster) {
            //请求数据

            $scope.searchStudent = function (id) {
                var success = function (result) {
                    $scope.student = result.data;
                    if ($scope.student.list.length > 5) {
                        $scope.student.list.length = 5;
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.param["classId"] = id;
                API.post('/oa/addressbook/read/list/student', $scope.param, success, error);

            }

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/studentmanage/studentdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myCourse', function () {  //课程表
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.param = {};
            $scope.getCourse = function () {
                var success = function (result) {
                    $scope.classlistInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getCourse();
            $scope.searchTeacherCourse = function () {
                var success = function (result) {
                    $scope.teachercourse = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/schedule/read/mySchedule', $scope.param, success, error);

            }
            $scope.searchTeacherCourse();

            $scope.searchStudentCourse = function (id) {
                $scope.s_all = 0;
                var success = function(result){
                    var week = ["mon","tue","wed","thu","fri","sat","sun"];
                    $scope.studentcourse = {};
                    for(var i=0;i<result.data.length;i++){
                        $scope.studentcourse[result.data[i].lesson] = result.data[i];
                    }
                    for(var i=1;i<=result.data.length;i++){
                        if(!$scope.studentcourse.hasOwnProperty(i)){
                            $scope.studentcourse[i] = (function(){
                                var tmp = {lesson:i};
                                for(var j in week){
                                    tmp[week[j]]={name:"自习"}
                                }
                                return tmp
                            })()
                        }else{
                            for(var j in week){
                                console.log($scope.studentcourse[i],$scope.studentcourse[i].hasOwnProperty(week[j]))
                                if($scope.studentcourse[i][week[j]]==null){
                                    $scope.studentcourse[i][week[j]] = {name:"自习"};
                                }
                            }
                        }
                    }
                    $scope.$apply();
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.param["classId"] = id;
                API.post('/edu/schedule/read/all',$scope.param,success,error);

            };
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/course/coursedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myStudentcourse', function () {  //课程表(xuesheng)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.searchStudentCourse2 = function (id) {
                $scope.s_all = 0;
                var success = function(result){
                    var week = ["mon","tue","wed","thu","fri","sat","sun"];
                    $scope.studentcourse = {};
                    for(var i=0;i<result.data.length;i++){
                        $scope.studentcourse[result.data[i].lesson] = result.data[i];
                    }
                    for(var i=1;i<=result.data.length;i++){
                        if(!$scope.studentcourse.hasOwnProperty(i)){
                            $scope.studentcourse[i] = (function(){
                                var tmp = {lesson:i};
                                for(var j in week){
                                    tmp[week[j]]={name:"自习"}
                                }
                                return tmp
                            })()
                        }else{
                            for(var j in week){
                                console.log($scope.studentcourse[i],$scope.studentcourse[i].hasOwnProperty(week[j]))
                                if($scope.studentcourse[i][week[j]]==null){
                                    $scope.studentcourse[i][week[j]] = {name:"自习"};
                                }
                            }
                        }
                    }
                    $scope.$apply();
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                //$scope.param["classId"] = id;
                API.post('/edu/schedule/read/all',$scope.param,success,error);

            };
            $scope.searchStudentCourse2();
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/coursestudentdesk/coursestudentdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myNjks', function () {  //年级考试成绩{老师 }
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.param = {};
            $scope.getexamClass2 = function () {
                var success = function (result) {
                    $scope.examclassInfograde = result.data;

                    if ($scope.examclassInfograde.length > 0) {
                        $scope.getexamlist2($scope.examclassInfograde[0].id);
                    }

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getexamClass2();


            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            
            

            //获取年级考试列表()
            $scope.getexamlist2 = function (id) {
                var success = function (result) {
                    $scope.examSubject = result.data;

                    if ($scope.examSubject.length == 0) {

                        //$scope.examSubject = {};
                        //toaster.pop('error', "", "该班暂无考试记录");

                    }
                    $scope.id = id;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // $scope.param["classId"] = id;
                API.post('/res/exam/read/lastDetail',{"classId": id}, success, error);
            }

            $scope.submit2 = function (id) {

                var temp = [];
                temp.push(id);
                if ($scope.examSubject2.details.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = id;
            };

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/examdesk/examdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myBjks', function () {  //班级测试成绩(老师)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            
            $scope.param = {};
            //取得班级
            $scope.getexamClass = function () {
                var success = function (result) {
                    $scope.examclassInfo = result.data;
                    if ($scope.examclassInfo.length > 0) {
                        $scope.getexamlist($scope.examclassInfo[0].id,0);
                    }
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getexamClass();

            
            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            //获取班级考试列表
            $scope.getexamlist = function (id,index) {
                var success = function (result) {
                    $scope.examSubject = result.data;
                    if ($scope.examSubject.length == 0) {
                        //$scope.examSubject = {};
                        //toaster.pop('error', "", "该班暂无考试记录 ");
                    }
                   
                    for(var i=0;i<$scope.examSubject.length;i++){
                        $scope.examSubject[i].beginTime =  new Date($scope.examSubject[i].beginTime);
                        $scope.examSubject[i].endTime =  new Date($scope.examSubject[i].endTime);
                    }
                    $scope.id = id;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/practise/read/detail/list',{"classId":id}, success, error);
                // if(Object.prototype.toString.call($scope.examclassInfo[index].examobj)!='[object Object]'){
                // 	$scope.examclassInfo[index].examobj = {};
                // 	API.post('/res/practise/read/detail/list',{"classId":id}, success, error);
                // }else{
                // 	$scope.examSubject = $scope.examclassInfo[index].examobj;
                // }
            }

            $scope.submit = function (id) {

                var temp = [];
                temp.push(id);
                if ($scope.examSubject.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = id;
            };


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/examdesk/practisedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myStudentnjks', function () {  //年级考试成绩(学生端)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {

            $scope.param = {};
         
            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            
            
            $scope.getexamlist3 = function () {
                var success = function (result) {
                    $scope.examSubject3 = result.data;

                    if ($scope.examSubject3.length == 0) {

                        $scope.examSubject3 = {};
                        toaster.pop('error', "", "暂无考试记录");
                    }
                    // $scope.id = id;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // $scope.param["classId"] = id;
                API.post('/res/exam/read/lastDetail',{}, success, error);
            }
            $scope.getexamlist3();
            $scope.submit3 = function (id) {

                var temp = [];
                temp.push(id);
                if ($scope.examSubject3.details.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = id;
            };

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/examdesk/studentexamdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myStudentbjks', function () {  //班级测试成绩(学生端)
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },  // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {

            $scope.param = {};
            
            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            //获取班级考试列表
            $scope.getexamlist = function () {
                var success = function (result) {
                    $scope.examSubject = result.data;

                    if ($scope.examSubject.length == 0) {
                        $scope.examSubject = {};
                        toaster.pop('error', "", "暂无考试记录");
                    }
                    // $scope.id = id;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // $scope.param["classId"] = id;
                // API.post('/res/practise/read/list', $scope.param, success, error);
                 API.post('/res/practise/read/detail/list',{}, success, error);

            }
            $scope.getexamlist();
            $scope.submit = function (id) {
                var temp = [];
                temp.push(id);
                if ($scope.examSubject.details.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = id;
            };


        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'template/module/examdesk/studentpractisedesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        /*link: function($scope, iElm, iAttrs, controller) {

         }*/
    };
}).directive('myWorktop', function () {  //课程表
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            },  // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

                $scope.select_options = [
                    {
                        "id": 1, "name": '待办 1 (今天 1 )',
                        "list": [
                            {
                                "id": 1,
                                "title": "事件1",
                                "time": "2016-9-2",
                                "from": "lzc"
                            }
                        ]
                    },
                    {
                        "id": 2, "name": '已发 6 (未结4)',
                        "list": [
                            {
                                "id": 1,
                                "title": "事件2",
                                "time": "2016-9-2",
                                "from": "lzc"
                            }
                        ]
                    },
                    {
                        "id": 3, "name": '已办 35',
                        "list": [
                            {
                                "id": 1,
                                "title": "事件3",
                                "time": "2016-9-2",
                                "from": "lzc"
                            }
                        ]
                    }
                ]
                $scope.curr = 1;
                $scope.change = function () {
                    console.log($scope.curr);
                }

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/module/oa/worktop/worktopdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            /*link: function($scope, iElm, iAttrs, controller) {

             }*/
        };
    })
    .directive('myTeacherechart', function () {  //图表(老师应用)
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            },  // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, API, toaster) {

                $scope.buildChartData = function (gradeData, classData) {

                    // if (gradeData.length == 0 || classData.length == 0 || $scope.examSubject.length == 0) {
                    //     setTimeout(function () {
                    //         $scope.buildChartData;
                    //     }, 200);
                    // }

                   	if(!$scope.examSubject){
                   		return false;
                   	}

                    var cData = {
                        name: '班级平均成绩',
                        barWidth: 20,
                        barCategoryGap: '50%',
                        datapoints: function () {
                            var result = [];
                            for (var i = 0; i < $scope.examSubject.length; i++) {
                                result.push({
                                    x: $scope.examSubject[i].name,
                                    y: ($scope.examSubject[i].code && classData[$scope.examSubject[i].code])?classData[$scope.examSubject[i].code]:0
                                });
                            }
                            return result;
                        }()
                    };
                    var gData = {
                        name: '年级平均成绩', barWidth: 20,
                        barCategoryGap: '50%',
                        datapoints: function () {
                            var result = [];
                            for (var i = 0; i < $scope.examSubject.length; i++) {
                                result.push({
                                    x: $scope.examSubject[i].name,
                                    y: {value: ($scope.examSubject[i].code && gradeData[$scope.examSubject[i].code])?gradeData[$scope.examSubject[i].code]:0}
                                });
                            }
                            return result;
                        }()
                    };
                    var data = [cData, gData];
                    return data;
                }

                //请求数据
                $scope.param = {};
                $scope.getexamClass2 = function () {
                    var success = function (result) {
                        $scope.examclassInfograde = result.data;

                        // if ($scope.examclassInfograde.length > 0) {
                        //     $scope.getexamlist2($scope.examclassInfograde[0].id);
                        // }

                        $scope.$apply();
                    }
                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                    API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

                }
                $scope.getexamClass2();

                $scope.$watch("examclassInfograde",function(){
                	 if (!$scope.examclassInfograde) {
                        return false;
                     }

                     if ($scope.examclassInfograde.length > 0) {

                     		$scope.param["classId"] = $scope.examclassInfograde[0].id;
                            $scope.getexamlist2($scope.examclassInfograde[0].id);
                     }
                })

                //获取年级考试列表
                $scope.getexamlist2 = function (id) {
                    var success = function (result) {
                        $scope.examgradeList = result.data;

                        if ($scope.examgradeList.list.length != 0) {

                            $scope.examId = $scope.examgradeList.list[0].id;
                            $scope.exam = $scope.examgradeList.list[0];
                            $scope.config.title.subtext = $scope.exam.name;
                            $scope.getClassData();
                            //$scope.getGradeData();
                            //$scope.data = $scope.buildChartData($scope.gradeData, $scope.classData);
                        } else {
                            $scope.examSubject2 = {};
                        }
                        $scope.id = id;
                        $scope.$apply();
                    }
                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }
                    $scope.param["classId"] = id;
                    API.post('/res/exam/read/list', $scope.param, success, error);
                }

                $scope.getClassData = function () {
                    // if (!$scope.examId || !$scope.param["classId"]) {
                    //     setTimeout(function () {
                    //         $scope.getGradeData();
                    //     }, 200);
                    // }

                    var success = function (result) {
                        $scope.classData = result.data;
                        $scope.getGradeData();

                        $scope.$apply();
                    }

                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                    API.post('/res/exam/score/read/score/avg', {
                        examId: $scope.examId,
                        classId: $scope.param["classId"]
                    }, success, error);

                }

                //$scope.getClassData();

                $scope.getGradeData = function () {
                    // if (!$scope.examId) {
                    //     setTimeout(function () {
                    //         $scope.getGradeData();
                    //     }, 200);
                    //     return false;
                    // }

                    var success = function (result) {
                        $scope.gradeData = result.data;
                        $scope.data = $scope.buildChartData($scope.gradeData, $scope.classData);
                        $scope.getExamSubject();
                        $scope.$apply();
                    }

                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }
                    API.post('/res/exam/score/read/score/avg', {examId: $scope.examId}, success, error);

                }

                $scope.$watch("examId",function(){
                	if (!$scope.examId) {
                        return false;
                    }

                    //$scope.getGradeData();
					//$scope.getExamSubject();
                })

                //$scope.getGradeData();

                $scope.getExamSubject = function () {
                    // if (!$scope.examId) {
                    //     setTimeout(function () {
                    //         $scope.getExamSubject();
                    //     }, 200);
                    //     return false;
                    // }

                    var success = function (result) {
                        $scope.examSubject = result.data;
                        $scope.data = $scope.buildChartData($scope.gradeData, $scope.classData);
                        $scope.$apply();
                    }

                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                    API.post('/res/exam/score/getExamSubjects', {
                        examId: $scope.examId
                    }, success, error);

                }

                //$scope.getExamSubject();

                $scope.config = {
                    title: {text: '平均成绩', x: "center", subtext: ""},
                    legend: {
                        y: "bottom"
                    },
                    subtitle: '',
                    debug: true,
                    showXAxis: true,
                    showYAxis: true,
                    showLegend: true,
                    stack: false,
                    grid: {x: 24, y: 55, x2: 0, y2: 60},
                };
            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'template/module/exam/scorechart/teacher/echartdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            /*link: function($scope, iElm, iAttrs, controller) {

             }*/
        };
    })
    .directive('myTeacher', function () {   //任课老师(针对学生)
                                            // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, toaster, API) {

                $scope.stu_teachers = function () {

                    var success = function (result) {
                        $scope.myTeacher = result.data;

                        $scope.$apply();
                    };

                    var error = function () {

                    }

                    API.post("/classes/teacher/getTeachersByStudent", {}, success, error);
                }

                $scope.stu_teachers();

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div><a href="#/main/teachermanage/teacherlist">老师管理</a></div>',
            templateUrl: 'template/module/myclass/myteacherdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('myTeachers', function () {   //任课老师(针对老师)
                                             // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, toaster, API) {

                $scope.getClass = function () {
                    var success = function (result) {
                        $scope.classInfo = result.data;
                        console.log($scope.classInfo);
                        $scope.$apply();
                    }

                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                    API.post('/oa/addressbook/read/list/class', {}, success, error);

                }
                $scope.getClass();


                var teachers_list = function (obj, i) {

                    var success = function (result) {
                        // console.log(result);
                        $scope.classInfo[i].teacherinfo = result.data;

                        $scope.$apply();

                    };

                    var error = function () {

                    }

                    API.post("/classes/teacher/getTeachersInfo", {"classId": obj.id}, success, error);
                }

                $scope.$watch('classInfo', function () {
                    if (!$scope.classInfo) {
                        return false;
                    }

                    for (var i = 0; i < $scope.classInfo.length; i++) {
                        teachers_list($scope.classInfo[i], i);
                    }


                });


            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div><a href="#/main/teachermanage/teacherlist">老师管理</a></div>',
            templateUrl: 'template/module/classmanage/teachers/myteachersdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('myCommforstudent', function () {    //班委 （针对学生）
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, API) {

                $scope.committee_list = function () {

                    var success = function (result) {

                        $scope.myComm = result.data;
                        $scope.$apply();

                    };

                    var error = function () {

                    }

                    API.post("/classes/cadre/read/cadreInfo", {}, success, error);

                }

                $scope.committee_list();

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div><a href="#/main/studentmanage/studentlist">学生管理</a></div>',
            templateUrl: 'template/module/myclass/committee/commdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('myCommforteacher', function () {    //班委 （针对老师）
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, API) {


                // 班级
                $scope.schoolteachers_list = function () {

                    var success = function (result) {
                        console.log(result.data);
                        $scope.classInfo = result.data;

                        $scope.$apply();
                    };

                    var error = function () {

                    }

                    API.post("/oa/addressbook/read/list/class", {}, success, error);
                }

                $scope.schoolteachers_list();


                //取得班级下的学生
                var get_student = function (obj) {

                    var success = function (result) {
                        // console.log(result);
                        obj.student = result.data;
                        if(obj.student.length>1){
                            obj.student.length=1;
                        }

                        $scope.$apply();
                        
                        // alert(1);

                    };

                    var error = function () {

                    }

                    API.post("/classes/cadre/read/cadreInfoByClassId", {"classId": obj.id}, success, error);
                }

                $scope.$watch('classInfo', function () {
                    if (!$scope.classInfo) {
                        return false;
                    }

                    for (var i = 0; i < $scope.classInfo.length; i++) {
                        // console.log($scope.classInfo);
                        get_student($scope.classInfo[i]);
                    }


                });


            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div><a href="#/main/studentmanage/studentlist">学生管理</a></div>',
            templateUrl: 'template/module/classmanage/committee/commdesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('myIconappcontainer', function () {    //桌面上图标应用容器
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, API) {


            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div><a href="#/main/studentmanage/studentlist">学生管理</a></div>',
            templateUrl: 'template/module/desk/desk/iconcontainer.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('mySchool', function () {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, toaster) {

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<div><a href="#/main/schoolDetail">学校信息</a></div>',
            //templateUrl: 'template/module/course/coursedesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    })
    .directive('myTest', function () {   //用于测试的
                                         // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                'delapp': '=delApp',
                'appidentify': '@appIdentify',
                'appurl': '@appUrl',
                'appicon': '@appIcon',
                'appname': '@appName'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function ($scope, $element, $attrs, $transclude, toaster) {

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<div>用于测试指令运行情况<span ng-click="delapp(\'112\')">ssds</span></div>',
            //templateUrl: 'template/module/course/coursedesk.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            //link: function($scope, iElm, iAttrs, controller) {

            //}
        };
    }).directive('myWeek', function () {
    // Runs during compile
    return {
        name: '周计划',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster) {
            $scope.myWeek = temp[0];
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div>fdfd</div>',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function ($scope, iElm, iAttrs, controller) {
            var w = moment().format('d');
            var s = 1 - w;
            var e = 7 - w;
            var s_week = moment().add('days', s).format('YYYY-MM-DD');  //当前周的周一
            var e_week = moment().add('days', e).format('YYYY-MM-DD');  //当前周的周末
            var week = moment().weeks();
            var year = moment().years();

            var temp = [
                [year, week, s_week, e_week]
            ];

            for (var i = 0; i < 5; i++) {

                var l = temp.length;

                var week = temp[i][1] + 1;
                var s_week = moment().add('days', 7 + 7 * i + s).format('YYYY-MM-DD');
                //alert(s_week);
                var e_week = moment().add('days', 7 + 7 + 7 * i + s - 1).format('YYYY-MM-DD');
                var year = moment().years();
                temp[l] = [year, week, s_week, e_week];

            };
            //alert(temp);

            angular.element(iElm).html(e_week);
        }

    };
}).directive('myTeacherscorepie', function () {
    // Runs during compile
    return {
        name: "分数分布",
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.param = {};

            $scope.buildChartData = function (classData, code) {
               
                if (classData.length == 0) {
                    setTimeout(function () {
                        $scope.buildChartData;
                    }, 200);
                }

                $scope.data = [{
                    name: '分数分布',
                    datapoints: [
                        {x: '优秀', y: classData[code].excellent},
                        {x: '良好', y: classData[code].good},
                        {x: '及格', y: classData[code].pass},
                        {x: '不及格', y: classData[code].unpass},
                    ]
                }];
            }

            $scope.getData = function () {
                $scope.getClassData($scope.subject);
            }

            $scope.getexamClass2 = function () {
                var success = function (result) {
                    $scope.examclassInfograde = result.data;

                    if ($scope.examclassInfograde.length > 0) {
                        $scope.getexamlist2($scope.examclassInfograde[0].id);

                    }

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getexamClass2();

            //获取考试状态
            // $scope.getExamStatus = function () {
            //     var success = function (result) {
            //         $scope.examStatus = result.data;
            //         $scope.$apply();
            //     }
            //     var error = function (result) {
            //         toaster.clear('*');
            //         toaster.pop('error', '', result.msg);
            //     }
            //     API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            // }
            // $scope.getExamStatus();
            //获取科目字典
            // $scope.dict = function () {
            //     var success = function (result) {
            //         $scope.sDict = result.data;
            //         $scope.$apply();
            //     }
            //     var error = function (result) {
            //         toaster.clear('*');
            //         toaster.pop('error', '', result.msg);
            //     }
            //     API.post('/subject/read/dict', {}, success, error);
            // }
            // $scope.dict();
            // 获取最后这次考试 的科目
            $scope.getexamsubject2 = function (id) {
                var success = function (result) {
                    $scope.examSubject2 = result.data;
                    $scope.config.title.subtext = $scope.examSubject2.name;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }
            //获取年级考试列表
            $scope.getexamlist2 = function (id) {
                var success = function (result) {
                    $scope.examgradeList = result.data;

                    if ($scope.examgradeList.list.length != 0) {

                        $scope.getexamsubject2($scope.examgradeList.list[0].id);
                        $scope.examId = $scope.examgradeList.list[0].id;
                        $scope.subject = $scope.examgradeList.list[0].details[0].subject.code;
                        $scope.getClassData();
                    } else {
                        $scope.examSubject2 = {};
                    }
                    $scope.id = id;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.param["classId"] = id;
                API.post('/res/exam/read/list', $scope.param, success, error);
            }

            // $scope.submit2 = function (id) {

            //     var temp = [];
            //     temp.push(id);
            //     if ($scope.examSubject2.details.length == 0) {
            //         return false;
            //     }
            //     var ids = temp.join(",");
            //     $scope.ids = id;
            // };

            $scope.getClassData = function () {

                var success = function (result) {
                    $scope.classData = result.data;
                    $scope.buildChartData($scope.classData, $scope.subject);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/fourRate', {
                    examId: $scope.examId,
                    classId: $scope.param["classId"]
                }, success, error);

            }

            $scope.config = {
                title: {text:'分数分布',x:"center"},
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                //grid: {borderWidth:0,x:'50%'},
                legend: {
                    y: "bottom",
                    orient:"horizontal",
                    x:"center"
                },
                toolbox: {
                    show: true,
                    feature: {
                        // mark : {show: true},
                        //  dataView : {show: true, readOnly: false},
                        //  magicType : {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        // saveAsImage : {show: true}
                    }
                }
            };

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '<div>fdfd</div>',
        templateUrl: 'template/module/exam/scorechart/teacher/piechartdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    };
}).directive('myHistoryscore', function () {
    // Runs during compile
    return {
        name: "分数分布",
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.param = {};

            $scope.buildChartData = function () {
                var scoreData = $scope.scoreData;
                var subjectData = $scope.subjectData;
                //console.log(!scoreData);
                if (!scoreData || scoreData.length == 0) {
                    setTimeout(function () {
                        $scope.buildChartData();
                    }, 200);
                    return false;
                }
                var subject = subjectData[$scope.subjectIndex];

                $scope.data = [{
                    name: "个人成绩",
                    datapoints: (function(){
                        var result = [];
                        for(var i=0;i<scoreData["historyScore"].length;i++){
                            var tmp = {};
                            tmp.x = scoreData["historyScore"][i].exam.name;
                            tmp.y = scoreData["historyScore"][i][subject.code]>0?scoreData["historyScore"][i][subject.code]:0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                },{
                    name: "年级平均成绩",
                    datapoints: (function(){
                        var result = [];
                        for(var i=0;i<scoreData["gradeHistoryAvg"].length;i++){
                            var tmp = {};
                            tmp.x = scoreData["gradeHistoryAvg"][i].exam.name;
                            tmp.y = scoreData["gradeHistoryAvg"][i][subject.code]||0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                },{
                    name: "班级平均成绩",
                    datapoints: (function(){
                        var result = [];
                        for(var i=0;i<scoreData["classHistoryAvg"].length;i++){
                            var tmp = {};
                            tmp.x = scoreData["classHistoryAvg"][i].exam.name;
                            tmp.y = scoreData["classHistoryAvg"][i][subject.code]||0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }];
                $scope.$apply();
            }

            $scope.getData = function () {
                var success = function (result) {
                    $scope.scoreData = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/score/read/score/history', {}, success, error);
            }

            $scope.getSubjectData = function () {

                var success = function (result) {
                    $scope.subjectData = result.data;
                    $scope.subjectIndex = "0";
                    $scope.buildChartData();
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/current/subject', {
                    examId: $scope.examId,
                    classId: $scope.param["classId"]
                }, success, error);

            }

            $scope.getData();
            $scope.getSubjectData();

            $scope.config = {
                title: {text:'考试历史平均成绩',x:"center"},
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                smooth:true,
                grid: {borderWidth:0,x:60,x2:60,y:40,y2:40},
                legend: {
                    y: "bottom",orient:"horizontal",x:"center"
                },
                toolbox: {
                    show: true,
                    feature: {
                        /*mark : {show: true},
                         dataView : {show: true, readOnly: false},
                         magicType : {show: true, type: ['line', 'bar']},*/
                        restore: {show: true},
                        // saveAsImage : {show: true}
                    }
                }
            };

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '<div>fdfd</div>',
        templateUrl: 'template/module/exam/scorechart/student/linechartdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    };
}).directive('myPractiseHistoryscore', function () {
    // Runs during compile
    return {
        name: "测验历史成绩",
        scope: {
            'delapp': '=delApp',
            'appidentify': '@appIdentify',
            'appurl': '@appUrl',
            'appicon': '@appIcon',
            'appname': '@appName'
        },
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function ($scope, $element, $attrs, $transclude, toaster, API) {
            //请求数据
            $scope.param = {};

            $scope.buildChartData = function () {
                var scoreData = $scope.scoreData;
                var subjectData = $scope.subjectData;
                if (!scoreData || scoreData.length == 0) {
                    setTimeout(function () {
                        $scope.buildChartData();
                    }, 200);
                    return false;
                }
                var subject = subjectData[$scope.subjectIndex];

                $scope.data = [{
                    name: "个人成绩",
                    datapoints: (function(){
                        var result = [];
                        if(scoreData["historyScore"].length==0)result.push({name:"暂无数据"})
                        for(var i=0;i<scoreData["historyScore"].length;i++){
                            var tmp = {};
                            tmp.x = scoreData["historyScore"][i].practise.name;
                            tmp.y = scoreData["historyScore"][i][subject.code]>0?scoreData["historyScore"][i][subject.code]:0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }, {
                    name: "班级平均成绩",
                    datapoints: (function(){
                        var result = [];
                        if(scoreData["classHistoryAvg"].length==0)result.push({name:"暂无数据"})
                        for(var i=0;i<scoreData["classHistoryAvg"].length;i++){
                            var tmp = {};
                            tmp.x = scoreData["classHistoryAvg"][i].practise.name;
                            tmp.y =scoreData["classHistoryAvg"][i][subject.code]>0?scoreData["classHistoryAvg"][i][subject.code]:0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }];
            }

            $scope.getData = function () {
                var success = function (result) {
                    $scope.scoreData = result.data;
                    $scope.buildChartData();
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/practise/score/read/score/history', {
                    subjectId:$scope.subjectData[$scope.subjectIndex].id
                }, success, error);
            }

            $scope.getSubjectData = function () {

                var success = function (result) {
                    $scope.subjectData = result.data;
                    $scope.subjectIndex = "0";
                    $scope.getData();
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subjectGroup/read/class', {
                }, success, error);

            }
            $scope.getSubjectData();

            $scope.config = {
                title: {text:'测试历史平均成绩',x:"center"},
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                smooth:true,
                grid: {borderWidth:0,x:60,x2:60,y:40,y2:40},
                legend: {
                    y: "bottom",orient:"horizontal",x:"center"
                },
                toolbox: {
                    show: true,
                    feature: {
                        /*mark : {show: true},
                         dataView : {show: true, readOnly: false},
                         magicType : {show: true, type: ['line', 'bar']},*/
                        restore: {show: true},
                        // saveAsImage : {show: true}
                    }
                }
            };

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '<div>fdfd</div>',
        templateUrl: 'template/module/exam/scorechart/student/studentlinechartdesk.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
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
})