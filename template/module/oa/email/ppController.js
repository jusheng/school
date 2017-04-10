'use strict';

angular.module('app')
    .controller('ppController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'ivhTreeviewMgr', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, ivhTreeviewMgr, API) {

            //console.log(ivhTreeviewMgr);

            //$scope.getType = function () {
            //    var success = function (result) {
            //        $scope.teacherList = result.data;
            //        $scope.$apply();
            //    }
            //    var error = function (result) {
            //        toaster.clear('*');
            //        toaster.pop('error', '', result.msg);
            //    }
            //    API.post('/res/exam/score/downloadExcelTemplate', {"ids": "1,2,3,4,5"}, success, error);
            //}
            //$scope.getType();
            //return false;
            // $scope.title = '弹出框';
            // $scope.openWithJSSpecificWidth = function () {
            //               ngDialog.open({
            //                   template: '<h2>Notice that style inline set specific width!</h2>',
            //                   className: 'ngdialog-theme-default',
            //                   width: 650,
            //                   plain: true
            //               });
            //           };
            //       API.post()
            //       $scope.myData = [{name: "Moroni", age: 50},
            //                    {name: "Tiancum", age: 43},
            //                    {name: "Jacob", age: 27},
            //                    {name: "Nephi", age: 29},
            //                    {name: "Enos", age: 34}];

  //       $scope.gridOptions = {
  //           data: 'myData',
  //           showGroupPanel: true,
  //           jqueryUIDraggable: true
  //       };

            //       $scope.gridOptions = {
            //           data: 'myData',
            //           showGroupPanel: true,
            //           jqueryUIDraggable: true
            //       };


            //       $scope.stuff = [{
            //         id: 'hats',
            //         label: 'Hats',
            //         children: [
            //           {label: 'Flat cap'},
            //           {label: 'Fedora'},
            //           {label: 'Baseball'},
            //           {label: 'Top hat'},
            //           {label: 'Gatsby',
            //                childen:[
            //                    {label:"dddd"}
            //                ]
            //               }
            //         ]
            //       },{
            //         id: 'pens',
            //         label: 'Pens',
            //         selected: true,
            //         children: [
            //           {label: 'Fountain'},
            //           {label: 'Gel ink'},
            //           {label: 'Roller ball'},
            //           {label: 'Fiber tip'},
            //           {label: 'Ballpoint'}
            //         ]
            //       },{
            //         label: 'Whiskey',
            //         id: 'whiskey',
            //         children: [
            //           {label: 'Irish'},
            //           {label: 'Scotch'},
            //           {label: 'Rye'},
            //           {label: 'Tennessee'},
            //           {label: 'Bourbon'}
            //         ]
            //       }];


            /*    $.ajax({
             url : '/attendance/read/month',
             data: {
             date:new Date("2016-08-08"),
             "school.id":1
             }
             }).then(function(result) {
             console.log(result);
             });*/


            //function validate(){
            //    alert('validate');
            //    $('form').validate({
            //        rules: {
            //          title: {
            //                required: true
            //            },
            //            remindTime: {
            //                required: true
            //            }
            //        },
            //        messages: {
            //          title: {
            //                required: '请填写标题'
            //            },
            //            remindTime: {
            //                required: '请填写时间'
            //            }
            //        },
            //        submitHandler: function() {
            //            alert('fdfdfd');
            //            //$scope.submit();
            //        }
            //    });
            //}
            //
            //validate();
            //
            //$scope.roles = [
            //  'guest',
            //  'user',
            //  'customer',
            //  'admin'
            //];
            //$scope.user = {
            //  roles: ['user']
            //};


            //附件上传
            //      $scope.onFileSelect = function(files){
            //        console.log(files);
            //        angular.forEach(files,function(file){
            //          file.upload = Upload.upload({
            //            "url":"/res/exam/score/importTemplate",
            //              headers: {'Content-Type': 'multipart/form-data'},
            //            "data":{file:file,classId:2,examId:140},
            //          });
            //          // file.upload.then(function(response){
            //          // })
            //        })
            //      };
            //
            //
            //
                 //内容编辑框的样式
            $scope._simpleConfig = {
                       //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                       toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test','kityformula']],
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
                 }


            var pageload = {
                name: 'page.load',
                datapoints: [
                    {x: 2001, y: 1012},
                    {x: 2002, y: 1023},
                    {x: 2003, y: 1045},
                    {x: 2004, y: 1062},
                    {x: 2005, y: 1032},
                    {x: 2006, y: 1040},
                ]
            };

            var firstPaint = {
                name: 'page.firstPaint',
                datapoints: [
                    {x: 2001, y: 22},
                    {x: 2002, y: 13},
                    {x: 2003, y: 35},
                    {x: 2004, y: 52},
                    {x: 2005, y: 32},
                    {x: 2006, y: 40},
                ]
            };

            $scope.config = {
                title: 'Line Chart',
                subtitle: 'Line Chart Subtitle',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                polar: [
                    {
                        scale: true,
                        name: {
                            show: true,
                            formatter: function (value) {
                                return value;
                            },
                            textStyle: {
                                color: "#888"
                            }
                        },
                        indicator: [
                            {text: '销售（sales）', max: 6000},
                            {text: '管理（Administration）', max: 16000},
                            {
                                text: '信息技术（Information Techology）', max: 40000
                            },
                            {text: '客服（Customer Support）', max: 38000},
                            {text: '研发（Development）', max: 52000},
                            {text: '市场（Marketing）', max: 25000}
                        ]
                    }
                ],
                legend: {
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
            };

            $scope.data = [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [
                    {
                        value: [4000, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配（Allocated Budget）',
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
                    }
                ]
            }]


        }]);