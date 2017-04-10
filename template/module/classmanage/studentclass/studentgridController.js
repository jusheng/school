'use strict';

angular.module('app')
  .controller('studentgridController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API', 'toaster',
    function($rootScope, $scope, $http, $state, Upload, ngDialog, API, toaster) {

      var seats = {};
      var cols_array;
      var context;
      var a = [];
      var num00;
      var width00;
      var cel;
      var cely;
      var canvas;
      var context

      // 绘制头像
      var create_face = function(obj, w, ctx) {

        var canvas = document.createElement("canvas");
        canvas.width = obj.width;
        canvas.height = obj.height;
        var context = canvas.getContext("2d");

        var pattern = context.createPattern(obj, "no-repeat");

        // 绘制一个圆
        //context.arc(this.zb[0], this.zb[1], 50, 0, 2 * Math.PI);
        var r = obj.width > obj.height ? obj.height * 0.5 : obj.width * 0.5;


        context.arc(obj.width * 0.5, obj.height * 0.5, r, 0, 2 * Math.PI);
        // 填充绘制的圆
        context.fillStyle = pattern;
        context.fill();


        var sx = obj.width >= obj.height ? (obj.width - obj.height) * 0.5 : 0;
        var sy = obj.width >= obj.height ? 0 : (obj.height - obj.width) * 0.5;
        var swidth = obj.width >= obj.height ? obj.height : obj.width;
        var sheight = swidth;

        var x = obj.zb[0] - 0.5 * w + w / 6;
        var y = obj.zb[1] - 0.56 * w + w / 6;
        var width = 2 * w / 3;
        var height = 2 * w / 3;


        ctx.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height);

      }


      // 绘图
      var draw = function(context) {

        context.clearRect(0, 0, cel * cols_array.length, cely * ($scope.rows() + 2));
        context.fillStyle = "#fff";
        context.fillRect(0, 0, cel * cols_array.length, cely * ($scope.rows() + 2));

        var img_arr = [];

        for (var i = 0; i < $scope.rows(); i++) {
          img_arr.push([]);
          for (var j = 0; j < cols_array.length; j++) {
            img_arr[i].push(new Image());
            var x = cel * j;
            var y = cely * i + cely;
            var name = $scope.seats[i].data[j].studentName;
            var zb = [x + cel / 2, y + 0.4 * cely];
            if(cols_array[j]==1){
              $scope.seat(context, name, x, y);
              img_arr[i][j].zb = zb;
              img_arr[i][j].i = i;
              img_arr[i][j].j = j;
              img_arr[i][j].onload = function() {
                    create_face(this, cel, context);
              }
                 
              if ($scope.seats[i].data[j].studentCover) {
                img_arr[i][j].src = $scope.seats[i].data[j].studentCover;
              } else {
                img_arr[i][j].src = "/res/img/no.jpg";
              }
              $scope.cyclePoint(context, x, y);
            }else{
               $scope.way(context, j);
            }
            
          }
        }
        console.log(img_arr);
        var table = new Image();
        table.src = "/res/img/table.png";
        if (table.complete) {
          context.drawImage(table, cel * cols_array.length / 2 - cel / 2, 0, cel, cel);
        } else {
          table.onload = function() {
            context.drawImage(table, cel * cols_array.length / 2 - cel / 2, 0, cel, cel);
          };
          table.onerror = function() {
            window.alert('加载失败，请重试');
          };
        };
        $('#lr').css({
          "left": cols_array.length * cel / 2 - cel + 39 + 'px',
          'top': 2 * cel / 3 + 100 + 'px',
          'width': cel * 2 + 'px'
        });
        $('#cover').css({
          "width": cel + 'px',
          "height": cely + 'px'
        });
        $('#cover img').css({
          "width": 2 * cel / 3 + 'px',
          "height": 2 * cel / 3 + 'px',
          "margin-left": cel / 6 + 'px',
          "margin-top": cel / 6 + 'px'
        });
        // $('#cover').css({"width" : col0 +'px',"height" : row0 +'px'});

      }

      // 重新绘图只重绘变动点
      var draw1 = function(context) {
          
          for (var i = 0; i < $scope.seats.length; i++) {
            // var myImage= new Array();
            for (var j = 0; j < cols_array.length; j++) {
              // console.log('cel:'+cel);
              var x = cel * j;
              var y = cely * i + cely;
              var name = $scope.seats[i].data[j].studentName;
              // var myImage = new Image();
              var zb = [x + cel / 2, y + 0.4 * cely];

              if(cols_array[j]==1){
                  context.fillStyle = "#000";
                  context.fillText(name, x + cel / 2 - 20, y + cely * 0.84);
                  $scope.cyclePoint(context, x, y);
                } else {
                  $scope.way(context, j)
                }
            }
          }

      }

        //获取列
        //格式：return : [1,1,1,1,1,0,1,1,1]
        // 1:座位  0：过道
      $scope.clos = function(col_data) {
        var cols = [];
        var tmp = col_data.split(":");
        var index = 0;
        for (var i = 0; i < tmp.length; i++) {
          for (var j = 0; j < parseInt(tmp[i]); j++) {
            cols[index++] = 1;
          }
          if (i < tmp.length - 1) {
            cols[index++] = 0;
          }
        }
        return cols;
      }

      //获取班级排数
      //return : 5 
      // 
      $scope.rows = function() {
          return $scope.seats.length;
        }
        //座位设置
        //
      $scope.seat = function(context, name, x, y) {
      
        context.strokeStyle = "#fff";
        context.lineWidth = 4;
        context.strokeRect(x, y, cel, cely);
        context.fillStyle = "#e9e9e9";
        context.fillRect(x, y, cel, cely - 6);
        context.fillStyle = "#000";
        context.fillText(name, x + cel / 2 - 20, y + cely * 0.84);
      }


      // 画中间圆点
      $scope.cyclePoint = function(context, x, y, color) {
        if(color==undefined){
          context.fillStyle = "#9DA5AC";
        }else{
          context.fillStyle = color;
        }
        
        context.beginPath();
        context.arc(x + cel / 2, y + 0.7 * cely, 3, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

      }


      // 画过道
      $scope.way = function(context, index) {
       
        context.fillStyle = "#fff";
        context.fillRect(cel * index, cely, cel, (1 + cely) * $scope.rows());
        context.fillStyle = "#6f7478";
        context.fillText("过", index * cel + cel / 2 - 6, cely * $scope.rows() / 3 + cely);
        context.fillText("道", index * cel + cel / 2 - 6, cely * $scope.rows() / 3 * 2 + cely);

      }

      // 创建第一个画布
      $scope.init = function(){

        cols_array = $scope.clos($scope.number);
        cel = width00 / cols_array.length;
        cely = cel * 1.4;

        canvas = document.getElementById("mycanvas");
        canvas.width = cel * cols_array.length;
        canvas.height = cely * ($scope.rows() + 2);
        context = canvas.getContext("2d");
        
        draw(context);


      }
      // 展示开关
      $scope.showDemo = function() {
        $('#cover').hide();
        $('#cover1').hide();
        var sty = $scope.number;
        if (sty == undefined) {
          setTimeout(function() {
            $scope.showDemo();
          }, 200);

          return false;
        }

        $scope.init();

        var bbox = canvas.getBoundingClientRect();

      }

      var start = function() {
        if ($('.canvas_lay').length == 0) {
          setTimeout(function() {
            start();
          }, 200);
          return false;
        }
        width00 = $(".search-form").width() - 75;

        $scope.showDemo();
      }

      start();

        // 创建全局座次对象
      var sub = {

      }
      // 数据请求----------------------------------

      //检查是否已经有座位表
      $scope.check = function() {
        var success = function(result) {
          // $scope.param = 
          $scope.seats = JSON.parse(result.data.jsonStr);
          $scope.number = result.data.scale;
          console.log($scope.seats);

          $scope.$apply();
        }

        var error = function(result) {
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
          }

        API.post('/class/seat/init', {}, success, error);

      }

      $scope.check();


    }
  ])