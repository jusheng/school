function newGuid(){for(var a="",b=1;32>=b;b++){var c=Math.floor(16*Math.random()).toString(16),a=a+c;if(8==b||12==b||16==b||20==b)a+="-"}return a}var unInstalledMMLTip="\u7f16\u8f91\u5668\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u518d\u64cd\u4f5c\u3002",jyeEditBookmark={cTarget:null,cRange:null};
$.fn.jye=function(a,b){if(/jyeoo|localhost|file:|127.0/ig.test(location)){var c=[];$(this).each(function(d){this.id||(this.id=newGuid());"boolean"!=typeof b&&(b=!1);c[this.id]=b?new jyeditorM(this,a||{}):new jyeditor(this,a||{})});return c}};
var jyeditor=function(a,b){this.textarea=$(a);this.css=b.css||this.textarea.attr("class")||"";this.style=[];this.addDepot=!1;this.displayToolbars=b.displayToolbars||!0;this.toolbar=b.toolbar||"jye_toolbar";this.controls=b.controls||["subscript","superscript","imgtopright","imgright","symbols"];this.limitLetter=$("span[limitMaxChar]");this.limitMaxChar=0;0!=this.limitLetter.size()&&(this.limitMaxChar=parseInt(this.limitLetter.attr("limitMaxChar")));if(!0==b.addDepot||1==b.addDepot)this.addDepot=!0;
$.extend(this.style,b.style||{});this.init()};
jyeditor.prototype.init=function(){function a(){if(0<b.limitMaxChar){var a="",a=b.limitMaxChar,a=b.textarea.html().replace(/<[^<]+?>/g,""),a=a.replace(/&[a-z]+?;/ig," "),a=b.limitMaxChar-a.length;0>a&&(a=0);b.limitLetter.html(b.limitLetter.html().replace(/\d+/g,a))}}var b=this;b.textarea.attr("id");var c=b.textarea.html();b.create_toolbar();b.textarea.attr("contenteditable","true");b.textarea.attr("class",b.css);b.textarea.attr("tb",b.toolbar);b.textarea.css(b.style);b.textarea.html(b.tex2HTML(c));
b.textarea.keydown(function(a){var c=b.get_selection_range();a=a.keyCode;if(13==a&&!c.item)return 0<c.text.length&&document.execCommand("delete",!1,null),c.text="\n",c.select(),!1;8==a&&c.item&&document.execCommand("delete",!1,null)});b.textarea.mouseup(function(){try{var a=$(this).find("span[onselectstart]").parent("span");if(!(0==a.size()||0>a.html().indexOf("dsi:"))){var b=a.find("math[title]");a.replaceWith(b)}}catch(c){}});b.textarea.click(function(a,c){var f=$(this),g=f.next("input:hidden");
b.activate_toolbar(this.id,f.attr("tb"));0<g.length&&g.val(b.getContent(this))});b.textarea.bind("keyup",function(c,e){jyeEditBookmark.cRange=b.get_selection_range();jyeEditBookmark.cTarget=this;a()});b.textarea.bind("mouseup",function(c,e){jyeEditBookmark.cRange=b.get_selection_range();jyeEditBookmark.cTarget=this;a()});b.textarea.bind("blur",function(b,c){a()});b.addDepot&&b.pdepot(b.textarea)};
jyeditor.prototype.pdepot=function(a){var b=this,c=a.attr("id"),c=$('<input type="hidden" id="'+(c+"_depot")+'" name="'+c+'" />').val(b.mathML2tex(a.html()));a.after(c);a.blur(function(){var a=$(this),c=a.next("input:hidden");0<c.length&&c.val(b.mathML2tex(a.html()))})};jyeditor.prototype.activate_toolbar=function(a,b){var c=$("#"+b);c.attr("rid")!=a&&(c.attr("rid",a),$(".oddstoolbar a",c).unbind("click").click(function(){jye_toolbar[$(this).attr("cmd")].command(a,this)}),c.data("taid",a));c.show()};
jyeditor.prototype.create_toolbar=function(){var a=this,b=$("#"+a.toolbar);if(!a.displayToolbars)return null;var c,b=$("#"+a.toolbar),d=Math.max(264,26*a.controls.length);if(0==b.length&&0<a.controls.length){for(var e=document.documentElement.clientWidth,f=document.documentElement.clientHeight,g=($.cookie("jye_tbp")||"").split("|"),b=$('<div id="'+a.toolbar+'" class="edittoolbar" style=width:'+d+"px;position:fixed></div>").bgiframe(),d=$('<div title="\u5f53\u524d\u533a\u57df\u53ef\u62d6\u52a8" class="thandle"><input type="button" title="\u5173\u95ed" class="smbtn hclose" /><input type="button" title="\u6700\u5927\u5316" class="smbtn hmax" /><input type="button" title="\u6700\u5c0f\u5316" class="smbtn hmin" />\u83c1\u4f18\u7f16\u8f91\u5668</div><div style="padding:3px"></div>'),
h=$('<div id="editTabs" ><h2 class="cmenubox"><ul><li class="onact" rid="ecmdh">\u6807\u51c6\u578b</li><li rid="ecmdah">\u79d1\u5b66\u578b</li><li rid="ecmdbh">\u5316\u5b66</li></ul></h2></div>'),p=$('<dl class="oddstoolbar"/>'),m=0;m<a.controls.length;m++)for(var l in jye_toolbar)c=jye_toolbar[l],c.name.toLowerCase()==a.controls[m].toLowerCase()&&(c=$('<a href="javascript:void(0)"><input name type="button" class="smbtn '+c.name+'" /></a>').attr({title:c.title||c.name,cmd:c.name}),p.append(c));$("#cont");
b.drag(function(a,b){var c=document.documentElement?document.documentElement.scrollTop:document.body.scrollTop,c={top:Math.min(f-$(this).outerHeight(),Math.max(0,b.offsetY-c)),left:Math.min(e-$(this).outerWidth(),Math.max(0,b.offsetX))};$(this).css(c);$.cookie("jye_tbp",c.left+"|"+c.top)});$(".hclose",d).click(function(){$("#"+a.toolbar).hide()});$(".hmax",d).click(function(){$("#editTabs").show()});$(".hmin",d).click(function(){$("#editTabs").hide()});h.find(".cmenubox li").click(function(){var a=
$(this);$(".cmenubox li",h).each(function(){var a=$(this);a.removeClass("onact");$("#"+a.attr("rid")).hide()});a.addClass("onact");$("#"+a.attr("rid")).show()});l=$('<div id="ecmdh" style="overflow:hidden">');jye_initSymbols(l);h.append(l);var n=$('<div id="ecmdah" style="overflow:hidden;display:none">');h.append(n);$.getJSON("http://blog.jyeoo.com/api/jsonp?file="+encodeURIComponent("scripts/tinyedit/plugins/MathML/index.htm")+"&r="+Math.random()+"&format=json&jsoncallback=?",function(a){a=a.data;
a=a.replace('src="##"','src="'+jyeditor.prototype.getBaseUrl()+'plugins/MathML/editor.htm"');n.append(a);a=$("center>:button",n);a.eq(0).click(function(){jyeEditBookmark.cRange.item?alert("\u8bf7\u5148\u70b9\u51fb\u516c\u5f0f\u8981\u63d2\u5165\u7684\u4f4d\u7f6e\u3002"):baseEQ_JWEQ?(jye_insertEQ(baseEQ_JWEQ.ToLatex()),baseEQ_JWEQ.Clear()):alert(unInstalledMMLTip)});a.eq(1).click(function(){baseEQ_JWEQ?baseEQ_JWEQ.Clear():alert(unInstalledMMLTip)})});var k=$('<div id="ecmdbh" style="overflow:hidden;display:none">');
h.append(k);$.getJSON("http://blog.jyeoo.com/api/jsonp?file="+encodeURIComponent("scripts/tinyedit/plugins/Chemistry/Index.htm")+"&r="+Math.random()+"&format=json&jsoncallback=?",function(a){k.append(a.data);k.find("input:text").focus(function(){$("#currTbox").val(this.id)});k.find(".autoSymbol").click(function(){jye_TextBoxInsert($("#currTbox").val(),this.innerText)});k.find("a[cmd]").click(function(){var a=this.getAttribute("cmd");jye_insertEQ(a)});k.find("input[name='CHConditionS']").focus(function(){$("#CHCPIC").attr("src",
"http://img.jyeoo.net/space/math/ch/"+$(this).val()+".png")});k.find("input[id='GetCondition']").click(function(){var a=$("#overCondition"),b=$("#underCondition"),c=0,d="",d=a.val().replace(/\s/g,""),e=b.val().replace(/\s/g,""),c=$("input[name='CHConditionS']:checked").val(),g=jye_getLength(d),f=jye_getLength(e),d=d.replace(/([a-z\)\uff09])(\d+)/ig,"$1_{$2}"),e=e.replace(/([a-z\)\uff09])(\d+)/ig,"$1_{$2}");if(1>d.length)alert("\u4e0a\u53cd\u5e94\u6761\u4ef6\u4e0d\u80fd\u4e3a\u7a7a\uff01");else{a.val("");
b.val("");switch(c){case "RLA":if(f>g)for(c=f-g,0!=c%2&&(c+=1),c/=2,a=0;a<c;a++)d="\\;\\;"+d+"\\;\\;";d="\\frac{\\underline{\\;"+d+"\\;}}{"+e+"}";break;case "RLB":d=1>e.length?"\\stackrel{"+d+"}{\u2192}":"\u2192_{"+e+"}^{"+d+"}";break;case "RLC":d="\\frac{"+d+"}{"+e+"}";break;case "RLD":d=1>e.length?"\\stackrel{"+d+"}{\u21cc}":"\u21cc_{"+e+"}^{"+d+"}";break;default:return}""!=d&&jye_insertEQ(d)}})});d.appendTo(b);h.appendTo(b);h.prepend(p);b.appendTo(document.body);g=null!=g&&2==g.length?{top:Math.min(f-
b.outerHeight(),Math.max(0,parseInt(g[1]))),left:Math.min(e-b.outerWidth(),Math.max(0,parseInt(g[0])))}:{top:(f-b.outerHeight())/2,left:(e-b.outerWidth())/2};b.css(g);return b}};jyeditor.prototype.getBaseUrl=function(){for(var a,b=document.getElementsByTagName("script"),c=0;c<b.length;c++)if(a=b[c].src.toLowerCase(),!(3>a.length)&&-1!=a.indexOf("tinyedit/core"))return a.slice(0,a.lastIndexOf("/")+1);return"/content/scripts/tinyedit/"};
jyeditor.prototype.cmd=function(a,b){document.execCommand(a,!1,b)};jyeditor.prototype.is=function(a,b){var c=typeof a;return b?"array"==b&&a.hasOwnProperty&&a instanceof Array?!0:c==b:"undefined"!=c};jyeditor.prototype.get_selected_element=function(){var a,b;b=this.get_selection_range();if(window.getSelection)try{a=b.commonAncestorContainer}catch(c){return null}else try{a=b.item?b.item(0):b.parentElement()}catch(d){return null}return a};
jyeditor.prototype.get_selection=function(){var a=null;return a=window.getSelection?window.getSelection():document.selection};jyeditor.prototype.get_selection_range=function(){var a=null,a=this.get_selection();if(a.getRangeAt){if(a=a.getRangeAt(0),$.browser.opera){var b=a.startContainer;b.nodeType===Node.TEXT_NODE&&a.setStartBefore(b.parentNode)}}else a=a.createRange();return a};
jyeditor.prototype.currentElement=function(a){var b=null,c=typeof a;"string"==c?b=document.getElementById(a):"object"==c?a.innerHTML&&(b=a):b=jyeEditBookmark.cTarget;return b};jyeditor.prototype.getContent=function(a){a=this.currentElement(a);if(!a)return"";a=$(a).html();return a=this.mathML2tex(a)};jyeditor.prototype.setContent=function(a,b){if("string"==typeof a){var c=this.currentElement(b);c&&(c.innerHTML=a)}};
jyeditor.prototype.insertContent=function(a){var b=jyeEditBookmark.cRange;if(b&&a&&""!=a){if(window.getSelection){var c=window.getSelection(),d=b;d.collapse(!1);var e=a;"string"!=typeof a&&(e=document.createElement("div"),e.appendChild(a),e=e.innerHTML);e=d.createContextualFragment(e);for(a=e.lastChild;a&&"br"==a.nodeName.toLowerCase()&&a.previousSibling&&"br"==a.previousSibling.nodeName.toLowerCase();){var f=a;a=a.previousSibling;e.removeChild(f)}d.insertNode(e);a&&(d.setEndAfter(a),d.setStartAfter(a));
c.removeAllRanges();c.addRange(d)}else b.item&&(b.execCommand("Delete",!1,null),b=this.get_selection_range()),"string"==typeof a?b.pasteHTML(a):b.pasteHTML(a.outerHTML);b.select()}};jyeditor.prototype.get_selected_text=function(){var a=this.get_selection(),b;if(a)return window.getSelection?b=a.toString?a.toString():"":(a.createRange().select(),a.text&&(b=a.text)),b};
jyeditor.prototype.get_selected_html=function(){var a,b=wa="",c=document.createElement("div"),d=this.get_selection_range();d.cloneContents?(a=d.cloneContents())&&c.appendChild(d.cloneContents()):this.is(d.item)||this.is(d.htmlText)?c.innerHTML=d.item?d.item(0).outerHTML:d.htmlText:c.innerHTML=d.toString();a=c.innerHTML;/^\s/.test(a)&&(b=" ");/\s+$/.test(a)&&(wa=" ");return b+a+wa};
jyeditor.prototype.cursorMoveTo=function(a){if(null!=jyeEditBookmark.cRange&&null!=jyeEditBookmark.cTarget){var b=jyeEditBookmark.cRange;a=a||jyeEditBookmark.cTarget.innerText.length;b.collapse(!0);b.moveEnd("character",a);b.moveStart("character",a);b.select()}};
jyeditor.prototype.tex2MathML=function(a){isIE&&!hasMathPlayer&&LatexRender.ShowNote();var b,c=document.createElement("div");a=a.replace(/\$[\s\S]*?\$/ig,function(a){try{return hasMathPlayer?(b=a.replace(/<[^>]*>/g,""),b=b.replace(/&nbsp;/ig," "),b=b.replace(/&amp;/ig,"& "),b=b.replace(/&lt;/ig,"\uff1c"),b=b.replace(/&gt;/ig,"\uff1e"),b=b.replace(/\\%/ig,"%"),""!=$.trim(b)?(c.innerHTML="",c.appendChild(LatexRender.ToMathML(b)),b=c.innerHTML):b=""):(c.innerHTML="",c.appendChild(LatexRender.ServerParse(a)),
b=c.innerHTML),b}catch(e){return a}});return a=a.replace("\ufeff ","")};
jyeditor.prototype.tex2HTML=function(a){var b,c=document.createElement("div"),d=this.mathIframe();c.appendChild(d);a=a.replace(/\$[\s\S]*?\$/ig,function(a){try{return b=a.replace(/<[^>]*>/g,""),b=b.replace(/&nbsp;/ig," "),b=b.replace(/&amp;/ig,"& "),b=b.replace(/&lt;/ig,"\uff1c"),b=b.replace(/&gt;/ig,"\uff1e"),b=b.replace(/\\%/ig,"%"),""!=$.trim(b)?(d.setAttribute("latex",b),b=c.innerHTML):b="",b}catch(f){return a}});return a=a.replace("\ufeff ","")};
jyeditor.prototype.mathML2tex=function(a){if(!a)return a;var b,c;a=a.replace(/<\?import[^>]*\/>/ig,"");a=a.replace(/(<m:math[^>]*>[\s\S]*?<\/m:math>|<img[^>]+?>|<iframe[^>]+?>[\s\S]*?<\/iframe>)/ig,function(a){c=$(a);b=$.trim(c.attr("latex")||"");""!=b?"$"!=b.charAt(0)&&(b="$"+b+"$"):b="";return""==b&&c.attr("src")?a:b});return a.replace(/(<br[^<]*>|\s)+$/ig,"")};
jyeditor.prototype.completeTag=function(a){return a=a.replace(/(\s+\w+)\s*=\s*([^"\s]+)(?=[^<>]*>)/ig,'$1="$2"').replace(/"'([^'"]*)'"/ig,'"$1"')};
jyeditor.prototype.clearHtml=function(a,b){if(!a||0>a.indexOf("<"))return a;var c=[];b&&(c.push("m"),c.push("\\?import"));c=c.concat("br img sub sup table tr td tbody".split(" "));a=a.replace(/<\s*\/p\s*>/gi,"<br />");a=a.replace(/<[^>]+>/igm,function(a){for(var b=0;b<c.length;b++)if(a.match(eval("/^<\\/?\\s*("+c[b]+")(\\s|>|:)/i")))return a;return""});return a=a.replace(/(<sub[^>]*?>.*?<\/\s*sub>|<sup[^>]*?>.*?<\/\s*sup>)/ig,function(a){var b=a.replace(/<[^>]*?>/ig,"");switch(a.toString().charAt(3).toLowerCase()){case "p":a=
"<sup>"+b+"</sup>";break;case "b":a="<sub>"+b+"</sub>"}return a})};jyeditor.prototype.mathIframe=function(){var a=document.createElement("iframe");a.setAttribute("frameBorder","0");a.scrolling="no";a.src=jyeditor.prototype.getBaseUrl()+"plugins/MathML/formula.htm";a.style.margin="0 1px";a.style.padding="0";a.style.verticalAlign="middle";a.style.position="absolute";a.style.left="10000px";return a};
var jye_toolbar={imgright:{name:"imgright",title:"\u56fe\u7247\u53f3\u6d6e\u52a8",command:function(){jye_imgfloat(!0)}},imgtopright:{name:"imgtopright",title:"\u56fe\u7247\u53f3\u4e0a\u6d6e\u52a8",command:function(a){jye_imgtopfloat(a)}},subscript:{name:"subscript",title:"\u4e0b\u6807",command:function(){jyeditor.prototype.cmd("subscript")}},superscript:{name:"superscript",title:"\u4e0a\u6807",command:function(){jyeditor.prototype.cmd("superscript")}}};
function jye_insertTag(a){var b=/<(\/)?div[^>]*>/ig,c=jyeditor.prototype.get_selected_text()||jyeditor.prototype.get_selected_html()||"";a=c.match(b);c=$.trim(c.replace(b,""));a&&2==a.length&&-1!=a[0].toLowerCase().indexOf("quizputtag")||(c='<div class="quizPutTag">'+c+"</div>");jyeditor.prototype.insertContent(c)}
function jye_insertMathML(a){"string"!=typeof a||0>a.indexOf("$")||(a=a.replace(/\ufeff/ig,""),""!=a.replace(/\s|\\;|\$/g,"").replace(/\\/g,"")&&(a=jye_decodeMathML(a),a=a.match(/\\|_|\^/)?jyeditor.prototype.tex2MathML(a):a.replace(/\s|\$/g,""),jyeditor.prototype.insertContent(a)))}function jye_decodeMathML(a){a=a.replace(/\ufeff/ig,"");return 0>a.indexOf("\\")?a:a=a.replace(/</g,"\\lt").replace(/>/g,"\\gt")}
function jye_initSymbols(a){for(var b=[{t:"\u5e73\u65b9",s:"\u00b2"},{t:"\u7acb\u65b9",s:"\u00b3"},{t:"\u52a0\u53f7",s:"+"},{t:"\u51cf\u53f7",s:"-"},{t:"\u4e58\u53f7",s:"\u00d7"},{t:"\u9664\u53f7",s:"\u00f7"},{t:"\u6b63\u8d1f\u53f7",s:"\u00b1"},{t:"\u4e0d\u7b49\u4e8e",s:"\u2260"},{t:"\u5c0f\u4e8e\u53f7",s:"\uff1c"},{t:"\u5927\u4e8e\u53f7",s:"\uff1e"},{t:"\u5c0f\u4e8e\u7b49\u4e8e",s:"\u2264"},{t:"\u5927\u4e8e\u7b49\u4e8e",s:"\u2265"},{t:"\u6052\u7b49\u4e8e",s:"\u2261"},{t:"\u5168\u7b49\u4e8e",s:"\u224c"},
{t:"\u7ea6\u7b49\u4e8e\u53f7",s:"\u2248"},{t:"\u8fde\u63a5\u53f7",s:"\uff5e"},{t:"\u76f8\u4f3c\u4e8e",s:"\u223d"},{t:"\u56e0\u4e3a",s:"\u2235"},{t:"\u6240\u4ee5",s:"\u2234"},{t:"\u65e0\u7a77\u5927",s:"\u221e"},{t:"\u5ea6",s:"\u00b0"},{t:"\u5206",s:"\u2032"},{t:"\u79d2",s:"\u2033"},{t:"\u6444\u6c0f\u5ea6",s:"\u2103"},{t:"\u534e\u6c0f\u5ea6",s:"\u2109"},{t:"\u9636\u4e58",s:"!"},{t:"\u6210\u6bd4\u4f8b",s:"\u221d"},{t:"\u767e\u5206\u53f7",s:"%"},{t:"\u70b9\u4e58",s:"\u2022"},{t:"\u6d3e",s:"\u03c0"},{t:"\u963f\u5c14\u6cd5",
s:"\u03b1"},{t:"\u8d1d\u5854",s:"\u03b2"},{t:"\u4f3d\u739b",s:"\u03b3"},{t:"\u897f\u5854",s:"\u03b8"},{t:"\u62c9\u59c6\u8fbe",s:"\u03bb"},{t:"\u03c1",s:"\u03c1"},{t:"\u03be",s:"\u03be"},{t:"\u025b",s:"\u025b"},{t:"\u03c6",s:"\u03c6"},{t:"\u03c9",s:"\u03c9"},{t:"\u03d6",s:"\u03d6"},{t:"\u2201",s:"\u2201"},{t:"\u7f2a",s:"\u03bc"},{t:"\u03b7",s:"\u03b7"},{t:"\u222b",s:"\u222b"},{t:"\u6b27\u7c73\u4f3d",s:"\u03a9"},{t:"\u2211",s:"\u2211"},{t:"\u220f",s:"\u220f"},{t:"\u2210",s:"\u2210"},{t:"\u5782\u76f4",
s:"\u22a5"},{t:"\u5e73\u884c",s:"\u2225"},{t:"\u89d2",s:"\u2220"},{t:"\u5706",s:"\u2299"},{t:"\u2295",s:"\u2295"},{t:"\u2297",s:"\u2297"},{t:"\u03a6",s:"\u03a6"},{t:"\u7a7a\u96c6",s:"\u2205"},{t:"\u4ea4\u96c6",s:"\u2229"},{t:"\u5e76\u96c6",s:"\u222a"},{t:"\u2282",s:"\u2282"},{t:"\u2283",s:"\u2283"},{t:"\u2284",s:"\u2284"},{t:"\u2285",s:"\u2285"},{t:"\u2286",s:"\u2286"},{t:"\u2287",s:"\u2287"},{t:"\u228a",s:"\u228a"},{t:"\u228b",s:"\u228b"},{t:"\u2288",s:"\u2288"},{t:"\u2289",s:"\u2289"},{t:"\u975e",
s:"\uffe2"},{t:"\u2203",s:"\u2203"},{t:"\u2200",s:"\u2200"},{t:"\u2227",s:"\u2227"},{t:"\u5c5e\u4e8e",s:"\u2208"},{t:"\u4e0d\u5c5e\u4e8e",s:"\u2209"},{t:"\u4e09\u89d2\u5f62",s:"\u25b3"},{t:"\u6b63\u65b9\u5f62",s:"\u25a1"},{t:"\u5e73\u884c\u56db\u8fb9\u5f62",s:"\u25b1"},{t:"\u6839\u53f7\u3001\u52fe",s:"\u221a"},{t:"\u225c",s:"\u225c"},{t:"\u2550",s:"\u2550"},{t:"\u5de6\u7bad\u5934",s:"\u2190"},{t:"\u53f3\u7bad\u5934",s:"\u2192"},{t:"\u4e0a\u7bad\u5934",s:"\u2191"},{t:"\u4e0b\u7bad\u5934",s:"\u2193"},
{t:"\u5de6\u53cc\u7bad\u5934",s:"\u21d0"},{t:"\u53f3\u53cc\u7bad\u5934",s:"\u21d2"},{t:"\u53cc\u5411\u7bad\u5934",s:"\u21d4"},{t:"\u53cc\u5411\u7b80\u5f0f\u7bad\u5934",s:"\u21cc"},{t:"\u2460",s:"\u2460"},{t:"\u2461",s:"\u2461"},{t:"\u2462",s:"\u2462"},{t:"\u2463",s:"\u2463"},{t:"\u2464",s:"\u2464"},{t:"\u2465",s:"\u2465"},{t:"\u2466",s:"\u2466"},{t:"\u2467",s:"\u2467"},{t:"\u2468",s:"\u2468"},{t:"\u2469",s:"\u2469"},{t:"\u2160",s:"\u2160"},{t:"\u2161",s:"\u2161"},{t:"\u2162",s:"\u2162"},{t:"\u2163",
s:"\u2163"},{t:"\u2164",s:"\u2164"},{t:"\u2165",s:"\u2165"}],c='<ul class="symbols2">',d=0;d<b.length;d++)c="\u00b2"==b[d].s||"\u00b3"==b[d].s?c+('<li title="'+b[d].t+'" style="font-family:Tahoma">'+b[d].s+"</li>"):c+('<li title="'+b[d].t+'">'+b[d].s+"</li>");a.append(c+"</ul>");$(".symbols2 li",a).click(function(){jyeEditBookmark.cRange.item?alert("\u8bf7\u5148\u70b9\u51fb\u7b26\u53f7\u8981\u63d2\u5165\u7684\u4f4d\u7f6e\u3002"):jyeditor.prototype.insertContent(this.innerHTML)})}
function jye_insertImage(a,b){openBox({width:450,height:250,title:"\u3000"},"/wenda/addpic")}function jye_imgfloat(a){a=a?"right":"left";var b=jyeditor.prototype.get_selected_element();b&&(b=$(b),b.is("img")&&("none"!=b.css("float")?b.css("float",""):b.css("float",a)))}function jye_imgtopfloat(a){var b=jyeditor.prototype.get_selected_element();b&&(b=$(b),b.is("img")||b.is("table"))&&("none"!=b.css("float")?b.css("float",""):(b.css("float","right"),$("#"+a).prepend(b.clone()),b.remove()))}
function jye_TextBoxInsert(a,b){var c=$("#"+a);if(document.selection){c.focus();var d=document.selection.createRange();document.selection.empty();d.text=b}else{var e,d=c.value.substring(0,c.selectionStart);c.value.substring(c.selectionStart,c.selectionEnd);e=c.value.substring(c.selectionEnd);c.value=d+b+e}c.focus()}function jye_getLength(a){var b=0;try{for(var c=-1,d=0;d<a.length;d++)c=a.charCodeAt(d),b=0<=c&&128>=c?b+1:b+2}catch(e){}return b}
function jye_insertEQ(a){if("string"==typeof a){var b=jyeditor.prototype.mathIframe(),c=document.createElement("div");c.appendChild(b);b.setAttribute("latex",a);jyeditor.prototype.insertContent(c.innerHTML)}}
$.fn.MathSearch=function(a,b){var c=$(this[0]),d=$("#MathSearchBar");c.click(function(){if(c.attr("hastb"))d.slideToggle("slow");else{var e;if(0==d.length){var f=$('<div class="thandle"><input type="button" class="smbtn hclose" />\u516c\u5f0f\u5feb\u6377\u8f93\u5165</div><div style="padding:3px"></div>');e=null!=a?{top:parseInt(a.y),left:parseInt(a.x)}:{top:c.offset().top+c.outerHeight(!0),left:c.offset().left-460+c.outerWidth(!0)};d=$('<div style="position:absolute;width:460px" id="MathSearchBar" class="edittoolbar" ></div>');
f.appendTo(d);d.appendTo(document.body);$(".hclose",f).click(function(){d.slideUp("slow")});$.getJSON("http://blog.jyeoo.com/api/jsonp?file="+encodeURIComponent("scripts/tinyedit/plugins/MathML/search.htm")+"&r="+Math.random()+"&format=json&jsoncallback=?",function(a){a=a.data;a=a.replace('src="##"','src="'+jyeditor.prototype.getBaseUrl()+'plugins/MathML/editor.htm"');d.append(a).slideDown("slow");c.attr("hastb","true");d.css(e);if(a=$("center>:button",d))a.eq(0).click(function(){if($.isFunction(b))if(search_JWEQ){var a=
search_JWEQ.ToLatex(!0).join("");b(a);d.slideUp("slow")}else alert(unInstalledMMLTip)}),a.eq(1).click(function(){search_JWEQ?search_JWEQ.Clear():alert(unInstalledMMLTip)})})}}})};