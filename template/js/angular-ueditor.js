angular.module("ng.ueditor", []).directive("ueditor", [function() {
			return {
				restrict: "C",
				require: "ngModel",
				scope: {
					config: "=",
					ready: "="
				},
				link: function(a, b, c, d) {
					var e;
					new(e = function() {
						function e() {
							/*var _this = this;
							var init = function(){
							
								if(UE.editor_api<117){
									setTimeout(function(){
										console.log('延时执行');
										init();
									},200)
								}else{
									_this.bindRender(), _this.initEditor()
									
								}
							}
							init();*/

							
								this.bindRender(), this.initEditor()
							

						}
						return e.prototype.initEditor = function() {
							var e, f, g;
							return g = this, "undefined" == typeof UE ? void console.error("Please import the local resources of ueditor!") : (e = a.config ? a.config : {}, f = c.id ? c.id : "_editor" + Date.now(), b[0].id = f, this.editor = new UE.getEditor(f, e), this.editor.ready(function() {
								g.editorReady = !0, g.editor.addListener("contentChange", function() {
									d.$setViewValue(g.editor.getContent()), a.$$phase || a.$apply()
								}), g.setEditorContent(), "function" == typeof a.ready && a.ready(g.editor)
							}))
						}, e.prototype.setEditorContent = function(a) {
							null == a && (a = this.modelContent), this.editor && this.editorReady && this.editor.setContent(a)
						}, e.prototype.bindRender = function() {
							var a;
							a = this, d.$render = function() {
								a.modelContent = d.$isEmpty(d.$viewValue) ? "" : d.$viewValue, a.setEditorContent()
							}
						}, e
					}())
				}
			}
		}])