# scroll-pull-loading
一个滚动或下拉页面进行数据加载的插件

- 你可以滚动页面加载数据，只需要加入如下代码：

```javascript
$(".loading-data-mod").scrollPullLoading({
    dataUrl : "js/data.js"
});
```

- 你也能下拉加载数据，当然，只需要设置加载方向即可：

```javascript
$(".loading-data-mod").scrollPullLoading({
    loadDirection : "top",
    dataUrl : "js/data.js"
});
```
