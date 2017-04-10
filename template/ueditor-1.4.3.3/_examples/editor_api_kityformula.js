/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            //'editor.js',
            'core/browser.js',
            'core/utils.js',
            'core/EventBase.js',
            'core/dtd.js',
            'core/domUtils.js',
            'core/Range.js',
            'core/Selection.js',
            'core/Editor.js',
            'core/Editor.defaultoptions.js',
            'core/loadconfig.js',
            'core/ajax.js',
            'core/filterword.js',
            'core/node.js',
            'core/htmlparser.js',
            'core/filternode.js',
            'core/plugin.js',
            'core/keymap.js',
            'core/localstorage.js',
            'plugins/defaultfilter.js',
            'plugins/inserthtml.js',
            'plugins/autotypeset.js',
            'plugins/autosubmit.js',
            'plugins/background.js',
            'plugins/image.js',
            'plugins/justify.js',
            'plugins/font.js',
            'plugins/link.js',
            'plugins/iframe.js',
            'plugins/scrawl.js',
            'plugins/removeformat.js',
            'plugins/blockquote.js',
            'plugins/convertcase.js',
            'plugins/indent.js',
            'plugins/print.js',
            'plugins/preview.js',
            'plugins/selectall.js',
            'plugins/paragraph.js',
            'plugins/directionality.js',
            'plugins/horizontal.js',
            'plugins/time.js',
            'plugins/rowspacing.js',
            'plugins/lineheight.js',
            'plugins/insertcode.js',
            'plugins/cleardoc.js',
            'plugins/anchor.js',
            'plugins/wordcount.js',
            'plugins/pagebreak.js',
            'plugins/wordimage.js',
            'plugins/dragdrop.js',
            'plugins/undo.js',
            'plugins/copy.js',
            'plugins/paste.js',
            'plugins/puretxtpaste.js',
            'plugins/list.js',
            'plugins/source.js',
            'plugins/enterkey.js',
            'plugins/keystrokes.js',
            'plugins/fiximgclick.js',
            'plugins/autolink.js',
            'plugins/autoheight.js',
            'plugins/autofloat.js',
            'plugins/video.js',
            'plugins/table.core.js',
            'plugins/table.cmds.js',
            'plugins/table.action.js',
            'plugins/table.sort.js',
            'plugins/contextmenu.js',
            'plugins/shortcutmenu.js',
            'plugins/basestyle.js',
            'plugins/elementpath.js',
            'plugins/formatmatch.js',
            'plugins/searchreplace.js',
            'plugins/customstyle.js',
            'plugins/catchremoteimage.js',
            'plugins/snapscreen.js',
            'plugins/insertparagraph.js',
            'plugins/webapp.js',
            'plugins/template.js',
            'plugins/music.js',
            'plugins/autoupload.js',
            'plugins/autosave.js',
            'plugins/charts.js',
            'plugins/section.js',
            'plugins/simpleupload.js',
            'plugins/serverparam.js',
            'plugins/insertfile.js',
            'plugins/xssFilter.js',
            'ui/ui.js',
            'ui/uiutils.js',
            'ui/uibase.js',
            'ui/separator.js',
            'ui/mask.js',
            'ui/popup.js',
            'ui/colorpicker.js',
            'ui/tablepicker.js',
            'ui/stateful.js',
            'ui/button.js',
            'ui/splitbutton.js',
            'ui/colorbutton.js',
            'ui/tablebutton.js',
            'ui/autotypesetpicker.js',
            'ui/autotypesetbutton.js',
            'ui/cellalignpicker.js',
            'ui/pastepicker.js',
            'ui/toolbar.js',
            'ui/menu.js',
            'ui/combox.js',
            'ui/dialog.js',
            'ui/menubutton.js',
            'ui/multiMenu.js',
            'ui/shortcutmenu.js',
            'ui/breakline.js',
            'ui/message.js',
            'adapter/editorui.js',
            'adapter/editor.js',
            'adapter/message.js',
            'adapter/autosave.js',

            // 公式编辑器
            '../kityformula-plugin/addKityFormulaDialog.js',
            '../kityformula-plugin/getKfContent.js',
            '../kityformula-plugin/defaultFilterFix.js'

        ],
        baseURL = '/template/ueditor-1.4.3.3/_src/';
   /* for (var i=0,pi;pi = paths[i++];) {
        $('body').append('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }*/

    var temp = [];
    function loadScript(sScriptSrc,callbackfunction)   
    {  
        //gets document head element  
        var oHead = document.getElementsByTagName('head')[0];  
        if(oHead)  
        {  
            //creates a new script tag        
            var oScript = document.createElement('script');  

            //adds src and type attribute to script tag  
            oScript.setAttribute('src',sScriptSrc);  
            oScript.setAttribute('type','text/javascript');
            oScript.setAttribute('class','uejs');  

            //calling a function after the js is loaded (IE)  
            var loadFunction = function()  
                {  
                    if (this.readyState == 'complete' || this.readyState == 'loaded')  
                    {  
                        callbackfunction();   
                    }  
                };  
            oScript.onreadystatechange = loadFunction;  

            //calling a function after the js is loaded (Firefox)  
            oScript.onload = callbackfunction;  

            //append the script tag to document head element          
            oHead.appendChild(oScript);  
        }  
    } 


    var apply = function(){
           UE.editor_api = paths.length;
            var $scope = angular.element('.editor_jsfinished').scope();
            //$scope.$parent.editor_jsfinished = UE.editor_api;
            $scope.editor_jsfinished = UE.editor_api;
            $scope.$apply();
    }


    var callback = function(){
      UE.editor_api++;
      if(UE.editor_api < paths.length){
            loadScript(baseURL + paths[UE.editor_api],callback);
      }else{
            apply();
      }
      
    }
    
    UE.editor_api==0  &&  $('.uejs').remove()  && loadScript(baseURL + paths[UE.editor_api],callback);
    



})();
