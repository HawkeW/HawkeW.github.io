(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-request-payment-request-payment"],{"4dff":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".rmbLogo[data-v-0cbeacab]{font-size:%?40?%}uni-button[data-v-0cbeacab]{background-color:#007aff;color:#fff}.uni-h1.uni-center[data-v-0cbeacab]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.price[data-v-0cbeacab]{border-bottom:1px solid #eee;width:%?200?%;height:%?80?%;padding-bottom:%?4?%}.ipaPayBtn[data-v-0cbeacab]{margin-top:%?30?%}",""])},"5d4c":function(e,t,n){"use strict";var i=n("e201"),o=n.n(i);o.a},6798:function(e,t,n){"use strict";var i=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("795b"));n("96cf");var a=i(n("3b8d")),c={data:function(){return{title:"request-payment",loading:!1,price:1,providerList:[]}},onLoad:function(){},methods:{weixinPay:function(){var e=this;console.log("发起支付"),this.loading=!0,uni.login({success:function(t){console.log("login success",t),uni.request({url:"https://unidemo.dcloud.net.cn/payment/wx/mp?code=".concat(t.code,"&amount=").concat(e.price),success:function(t){if(console.log("pay request success",t),200===t.statusCode)if(0===t.data.ret){console.log("得到接口prepay_id",t.data.payment);var n=t.data.payment;uni.requestPayment({timeStamp:n.timeStamp,nonceStr:n.nonceStr,package:n.package,signType:"MD5",paySign:n.paySign,success:function(e){uni.showToast({title:"感谢您的赞助!"})},fail:function(e){uni.showModal({content:"支付失败,原因为: "+e.errMsg,showCancel:!1})},complete:function(){e.loading=!1}})}else uni.showModal({content:t.data.desc,showCancel:!1});else uni.showModal({content:"支付失败，请重试！",showCancel:!1})},fail:function(t){console.log("fail",t),e.loading=!1,uni.showModal({content:"支付失败,原因为: "+t.errMsg,showCancel:!1})}})},fail:function(t){console.log("fail",t),e.loading=!1,uni.showModal({content:"支付失败,原因为: "+t.errMsg,showCancel:!1})}})},requestPayment:function(){var e=(0,a.default)(regeneratorRuntime.mark(function e(t,n){var i,o=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.providerList[n].loading=!0,e.next=3,this.getOrderInfo(t.id);case 3:if(i=e.sent,console.log("得到订单信息",i),200===i.statusCode){e.next=9;break}return console.log("获得订单信息失败",i),uni.showModal({content:"获得订单信息失败",showCancel:!1}),e.abrupt("return");case 9:uni.requestPayment({provider:t.id,orderInfo:i.data,success:function(e){console.log("success",e),uni.showToast({title:"感谢您的赞助!"})},fail:function(e){console.log("fail",e),uni.showModal({content:"支付失败,原因为: "+e.errMsg,showCancel:!1})},complete:function(){o.providerList[n].loading=!1}});case 10:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}(),getOrderInfo:function(e){var t="",n="https://demo.dcloud.net.cn/payment/?payid="+e+"&appid="+t+"&total="+this.price;return new o.default(function(e){uni.request({url:n,success:function(t){e(t)},fail:function(t){e(t)}})})},priceChange:function(e){console.log(e.detail.value),this.price=e.detail.value}}};t.default=c},"7fa8":function(e,t,n){"use strict";n.r(t);var i=n("6798"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);t["default"]=o.a},c568:function(e,t,n){"use strict";n.r(t);var i=n("c6c3"),o=n("7fa8");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("5d4c");var c,s=n("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"0cbeacab",null,!1,i["a"],c);t["default"]=r.exports},c6c3:function(e,t,n){"use strict";var i,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("page-head",{attrs:{title:e.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap"},[n("v-uni-view",{staticStyle:{background:"#FFF",padding:"50upx 0"}},[n("v-uni-view",{staticClass:"uni-hello-text uni-center"},[e._v("支付金额")]),n("v-uni-view",{staticClass:"uni-h1 uni-center uni-common-mt"},[n("v-uni-text",{staticClass:"rmbLogo"},[e._v("￥")]),n("v-uni-input",{staticClass:"price",attrs:{type:"digit",value:e.price,maxlength:"4"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.priceChange.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:"uni-btn-v uni-common-mt"})],1)],1)},a=[];n.d(t,"b",function(){return o}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return i})},e201:function(e,t,n){var i=n("4dff");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("4f06").default;o("a066860e",i,!0,{sourceMap:!1,shadowMode:!1})}}]);