'use strict';

angular.module('app')
    .controller('courseScheduleController', ['$rootScope', '$scope', '$http', '$state', 'Upload','Dtree', 'ngDialog', 'API','toaster','$compile','recordFormat',
        function ($rootScope, $scope, $http, $state, Upload,Dtree, ngDialog, API,toaster,$compile,recordFormat) {

            // $scope.app_name = "考试成绩";
            $scope.param = {typeIndex:1};
            $scope.week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            $scope.setting = [];
            $scope.curr='root_0';
            $scope.root = $scope.curr;
            $scope.entityId = 0;
            $scope.type = "0";

            $scope.typeDict = {
                "1":"无课",
                "2":"自习",
                "3":"班会",
                "4":"劳动",
                "5":"活动",
                "0":"",
            }

            $scope.tree = Dtree.dtreeFactory('tree','template/js/dtree/img/','no','no');

            $scope.tree.add(
                "root_0",
                -1,
                "全校",
                "setValue('0','root')",
                '全校',
                "_self",
                false
            );

            $scope.add_node = function(pre,data){
                for(var i=0;i<data.length;i++){
                    $scope.tree.add(
                        pre+"_"+data[i].id,
                        "root_0",
                        data[i].name,
                        "setValue('"+data[i].id+"','"+pre+"')",
                        data[i].name,
                        "_self",
                        false
                    );
                }
            }


            $scope.getSubjectGroup = function () {

                var success = function (result) {
                    $scope.subjectGroup = result.data;
                    $scope.add_node("subjectGroup",result.data);
                    $scope.$apply();
                    $('.tree').html($scope.tree.toString());

                    var scope = angular.element($('.tree')[0]).scope();
                    var link = $compile($('.tree')[0]);

                    link(scope);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("subjectGroup/read/all", {}, success, error);

            }
            $scope.getSubjectGroup();

            //请求数据
            $scope.getCourseDayNum = function () {

                var success = function (result) {
                    $scope.courseDayNum = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/course/day/num/read', $scope.param, success, error);

            }

            $scope.updateCourseDayNum = function () {

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                recordFormat.format($scope.courseDayNum,'.')
                API.post('/edu/course/day/num/update', $scope.courseDayNum, success, error);

            }

            $scope.getCourseDayNum();

            $scope.getCourseCycle = function () {

                var success = function (result) {
                    $scope.courseCycle = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/course/cycle/read', $scope.param, success, error);

            }

            $scope.updateCourseCycle = function () {

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                recordFormat.format($scope.courseCycle,'.')
                API.post('/edu/course/cycle/update', $scope.courseCycle, success, error);

            }

            $scope.getCourseCycle();

            $scope.select_this = function(id,type){
                if(type=="0"){
                    $scope.entityId = 0;
                    $scope.type = "0"
                }else{
                    $scope.entityId = id;
                    $scope.type = type;
                }
                $scope.init();
            }

            $scope.setValue = function(id,type){
                $scope.curr = type+"_"+id;
                switch(type){
                    case "root":
                        $scope.select_this(id,"0");
                        break;
                    case "subjectGroup":
                        $scope.select_this(id,"1");
                        break;
                    case "eduClass":
                        $scope.select_this(id,"2");
                        break;
                }
            }

            function CourseSettingDetail(){
                this.text = $scope.typeDict[$scope.param.typeIndex];
                this.type = $scope.param.typeIndex;
            }

            function CourseSetting(){
                this.text = "";
                this.entityId = $scope.entityId;
                this.type = $scope.type;
                this.data = [];
            }

            $scope.noCourse = function(key,index) {
                // console.log(key,index);
                if(!$scope.setting[index])$scope.setting[index] = new CourseSetting();
                if(!$scope.setting[index].data)$scope.setting[index].data = [];
                var d = new CourseSettingDetail();
                if(!$scope.setting[index].data[key]){
                    $scope.setting[index].data[key] = d;
                }else{
                    delete $scope.setting[index].data[key];
                }
            }

            $scope.submit = function(){

                var success = function (result) {
                    // $scope.courseCycle = result.data;
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                if($scope.record && $scope.record.id){
                    $scope.record.data = $scope.setting;
                    API.jsonpost('/course/setting/update', $scope.record, success, error);
                }else{
                    $scope.record = {
                        entityId:$scope.entityId,
                        type:$scope.type,
                        data:$scope.setting
                    }
                    API.jsonpost('/course/setting/update', $scope.record, success, error);
                }
            }

            $scope.init = function(){

                var success = function (result) {
                    $scope.record = result.data;
                    $scope.setting = result.data?result.data.data:[];
                    // toaster.clear('*');
                    // toaster.pop('success', '', "保存成功");
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                var data = {}
                data.entityId = $scope.entityId;
                data.type = $scope.type;
                if($scope.record){
                    data.schoolId = $scope.record.schoolId;
                }
                API.jsonpost('/course/setting/read/school',data, success, error);
            }

            $scope.init();

        }]);