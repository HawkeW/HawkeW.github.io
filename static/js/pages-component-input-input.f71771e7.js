(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-component-input-input"],{"1f65":function(t,i,n){"use strict";n.r(i);var e=n("c291"),a=n.n(e);for(var s in e)"default"!==s&&function(t){n.d(i,t,function(){return e[t]})}(s);i["default"]=a.a},2759:function(t,i,n){"use strict";var e,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"nvue-page-root"},[n("v-uni-view",{staticClass:"page-title"},[n("v-uni-view",{staticClass:"page-title__wrapper"},[n("v-uni-text",{staticClass:"page-title__text"},[t._v(t._s(t.title))])],1)],1),n("v-uni-view",{staticClass:"uni-common-mt"},[n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("可自动聚焦的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{focus:!0,placeholder:"自动获得焦点"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("键盘右下角按钮显示为搜索")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{"confirm-type":"search",placeholder:"键盘右下角按钮显示为搜索"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("控制最大输入长度的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{maxlength:"10",placeholder:"最大输入长度为10"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("实时获取输入值："+t._s(t.inputValue))])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"输入同步到view中"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onKeyInput.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("控制输入的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"连续的两个1会变成2"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.replaceInput.apply(void 0,arguments)}},model:{value:t.changeValue,callback:function(i){t.changeValue=i},expression:"changeValue"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("控制键盘的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{ref:"input1",staticClass:"uni-input",attrs:{placeholder:"输入123自动收起键盘"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.hideKeyboard.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("数字输入的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",placeholder:"这是一个数字输入框"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("密码输入的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{password:!0,type:"text",placeholder:"这是一个密码输入框"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("带小数点的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{type:"digit",placeholder:"带小数点的数字键盘"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("身份证输入的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{type:"idcard",placeholder:"身份证输入键盘"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("控制占位符颜色的 input")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{"placeholder-style":"color:#F76260",placeholder:"占位符字体是红色的"}})],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("带清除按钮的输入框")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"带清除按钮的输入框",value:t.inputClearValue},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.clearInput.apply(void 0,arguments)}}}),t.showClearIcon?n("v-uni-text",{staticClass:"uni-icon",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clearIcon.apply(void 0,arguments)}}},[t._v("")]):t._e()],1)],1),n("v-uni-view",{staticClass:"uni-form-item uni-column"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"uni-form-item__title"},[t._v("可查看密码的输入框")])],1),n("v-uni-view",{staticClass:"uni-input-wrapper"},[n("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"请输入密码",password:t.showPassword}}),n("v-uni-text",{staticClass:"uni-icon",class:[t.showPassword?"":"uni-eye-active"],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.changePassword.apply(void 0,arguments)}}},[t._v("")])],1)],1)],1)],1)},s=[];n.d(i,"b",function(){return a}),n.d(i,"c",function(){return s}),n.d(i,"a",function(){return e})},7226:function(t,i,n){"use strict";var e=n("963d"),a=n.n(e);a.a},7305:function(t,i,n){"use strict";n.r(i);var e=n("2759"),a=n("1f65");for(var s in a)"default"!==s&&function(t){n.d(i,t,function(){return a[t]})}(s);n("7226");var u,l=n("f0c5"),o=Object(l["a"])(a["default"],e["b"],e["c"],!1,null,"27190706",null,!1,e["a"],u);i["default"]=o.exports},"963d":function(t,i,n){var e=n("c11e");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("245987b1",e,!0,{sourceMap:!1,shadowMode:!1})},c11e:function(t,i,n){i=t.exports=n("2350")(!1),i.push([t.i,".nvue-page-root[data-v-27190706]{background-color:#f8f8f8;padding-bottom:20px}.page-title[data-v-27190706]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?35?%}.page-title__wrapper[data-v-27190706]{padding:0 20px;border-bottom-color:#d8d8d8;border-bottom-width:1px}.page-title__text[data-v-27190706]{font-size:16px;height:48px;line-height:48px;color:#bebebe}.title[data-v-27190706]{padding:5px 13px}.uni-form-item__title[data-v-27190706]{font-size:16px;line-height:24px}.uni-input-wrapper[data-v-27190706]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\npadding:8px 13px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;background-color:#fff}.uni-input[data-v-27190706]{height:28px;line-height:28px;font-size:15px;padding:0;-webkit-box-flex:1;-webkit-flex:1;flex:1;background-color:#fff}.uni-icon[data-v-27190706]{font-family:uniicons;font-size:24px;font-weight:400;font-style:normal;width:24px;height:24px;line-height:24px;color:#999}.uni-eye-active[data-v-27190706]{color:#007aff}",""])},c291:function(t,i,n){"use strict";var e=n("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("78bc")),s={components:{pageHead:a.default},data:function(){return{title:"input",focus:!1,inputValue:"",showClearIcon:!1,inputClearValue:"",changeValue:"",showPassword:!0,src:"../../../static/eye-1.png",platform:""}},methods:{onKeyInput:function(t){this.inputValue=t.target.value},replaceInput:function(t){var i=t.target.value;"11"===i&&(this.changeValue="2")},hideKeyboard:function(t){"123"===t.target.value&&uni.hideKeyboard()},clearInput:function(t){this.inputClearValue=t.target.value,t.detail.value.length>0?this.showClearIcon=!0:this.showClearIcon=!1},clearIcon:function(){this.inputClearValue="",this.showClearIcon=!1},changePassword:function(){this.showPassword=!this.showPassword},onFocus:function(){this.$mp.page.$getAppWebview().setStyle({softinputNavBar:"none"})},onBlur:function(){this.$mp.page.$getAppWebview().setStyle({softinputNavBar:"auto"})}},onLoad:function(){this.platform=uni.getSystemInfoSync().platform}};i.default=s}}]);