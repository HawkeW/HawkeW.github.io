# AJAX与服务请求

## AJAX是什么

*AJAX*: `Asynchronous Java Script and XML`，即用`Javascript`来执行*异步*网络请求。AJAX不是一种新的技术而是一个用于描述使用现有技术集合的'新'方法的术语。

在Web中，每一次`HTTP`请求实际对应着一个界面。而如果想要在用户留在当前页面的同时（即不重载页面），可以得到新的内容，就需要通过`Javascript`发送新请求并得到数据，然后由`Javascript`进行页面的更新。AJAX描述的就是这样一种过程。

现在由于JSON的优势和普遍使用，已经逐渐了AJAX的最后一个 X(XML)。

## Ajax核心：XMLHttpRequest API

XMLHttpRequest是用来发送HTTP请求以实现网站和服务器之间的数据交换的API。

发送一个HTTP请求，需要经过这样一个过程



### 请求类型



