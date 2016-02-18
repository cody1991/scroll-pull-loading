# scroll-pull-loading
一个滚动或下拉页面进行数据加载的插件
<<<<<<< HEAD

### 介绍

scroll-pull-loading 是基于zepto.js和hammer.js的一款加载数据的插件，主要应用于移动端，当然你也可以在PC端使用。当你滚动页面，或者下拉页面时，都可以加载数据。需要注意的是，在PC端下拉页面加载数据后，不能通过滚动条来查看数据，需要通过鼠标拖动

### 如何使用

- 首先引入scroll-pull-loading和基础库：

```html
<script src="js/zepto-1.1.6.min.js"></script>
<script src="js/hammer.min.js"></script>
<script src="js/scroll-pull-loading.js"></script>
```

- 然后根据页面结构结构加载数据，具体可查看页面源代码，此处只说明用法。因为加载结构的不同，你需要在 `scoll-pull-loading.js` 中修改函数 `appendHtml`
 
- 一般来说，在页面中使用前，你还需要设置数据方向和加载数据文件即可。默认情况下，加载方向为 `bottom`，即向下滚动加载

- 比如你要滚动页面加载数据，只需要加入如下代码（这里的 `loading-data-mod` 为加载数据列表的 class）：

```javascript
$(".loading-data-mod").scrollPullLoading({
    dataUrl : "js/data.js",
    insert : function(data){
        var tempEle = $("<li class='row-item'>"),
                str = "";
            str += "<div class='info'>";
            str += "<div class='thumb'>";
            str += "<a href='#'><img src='"+ data.pic +"' alt='' class='img'></a>";
            str += "</div>";
            str += "<div class='meta'>";
            str += "<p class='name'>"+ data.name +"</p>";
            str += "<p class='intro'>"+ data.desc +"</p>";
            str += "<p class='price'>";
            str += "<span class='price-now'>￥"+ (data.price * 0.8).toFixed(2) +"</span>";
            str += "<del class='price-original'>￥"+ data.price +"</del>";
            str += "</p>";
            str += "</div>";
            str += "<div class='action'>";
            str += "<a href='"+ data.href +"' class='btn btn-action'>操作按钮</a>";
            str += "</div>";
            str += "</div>";
            tempEle.html( str );
        return tempEle;
    }
});
```

滚动加载数据演示：[点击查看](http://joy-yi0905.github.io/scroll-pull-loading/loading-row-scroll.html)

- 你也能下拉加载数据，当然，只需要设置加载方向即可：

```javascript
$(".loading-data-mod").scrollPullLoading({
    loadDirection : "top",
    dataUrl : "js/data.js",
    insert : function(data){
        var tempEle = $("<li class='row-item'>"),
                str = "";
            str += "<div class='info'>";
            str += "<div class='thumb'>";
            str += "<a href='#'><img src='"+ data.pic +"' alt='' class='img'></a>";
            str += "</div>";
            str += "<div class='meta'>";
            str += "<p class='name'>"+ data.name +"</p>";
            str += "<p class='intro'>"+ data.desc +"</p>";
            str += "<p class='price'>";
            str += "<span class='price-now'>￥"+ (data.price * 0.8).toFixed(2) +"</span>";
            str += "<del class='price-original'>￥"+ data.price +"</del>";
            str += "</p>";
            str += "</div>";
            str += "<div class='action'>";
            str += "<a href='"+ data.href +"' class='btn btn-action'>操作按钮</a>";
            str += "</div>";
            str += "</div>";
            tempEle.html( str );
        return tempEle;
    }
});
```

下拉加载数据演示：[点击查看](http://joy-yi0905.github.io/scroll-pull-loading/loading-row-pull.html)
=======
>>>>>>> gh-pages
