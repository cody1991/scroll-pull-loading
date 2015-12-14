
// scrollPullLoading
$.fn.scrollPullLoading = function(options){
    var defaults = { 
            sectionRow    : ".section-row",
            rowList       : ".row-list",
            loading       : ".loading",
            screenH       : $(window).height(),
            showNum       : 10,
            loadNum       : 10,
            tempNum       : 0,
            isLoad        : true,
            loadDirection : "bottom",
            dataUrl       : "js/data.js"
        }
    var options = $.extend(defaults, options); 
    this.each(function(){
        var t = $(this),
            sectionRow = t.find(options.sectionRow),
            rowList = t.find(options.rowList),
            loading = t.find(options.loading),
            screenH = options.screenH,
            showNum = options.showNum,
            loadNum = options.loadNum,
            tempNum = options.tempNum,
            isLoad = options.isLoad,
            loadDirection = options.loadDirection,
            dataUrl = options.dataUrl,
            sectionRowTop = sectionRow.offset().top,
            loadingH = loading.height();

        // 滚动加载
        (loadDirection == "bottom") &&
        (t.css({"position" : "relative" , "height" : "auto" , "overflow" : "auto"})) &&
        $(window).bind( "scroll" , function(){
            var scrollTop = $(window).scrollTop(),
                sectionRowH = sectionRow.height();

            if(scrollTop > (sectionRowTop + sectionRowH - screenH - loadingH*4) && isLoad){  // loading data
                loading.show();
                insertData();
            }
        })

        // 下拉加载
        if( loadDirection == "top" ){
            var hammerT = new Hammer(sectionRow.get(0));

            t.css({"position" : "relative" , "height" : screenH , "overflow" : "hidden"});
            loading.css({
                "position" : "absolute",
                "left" : 0,
                "top" : 0,
                "width" : "100%",
                "display" : "none",
                "-webkit-transform" : "translate3d(0 ,"+ ( -loadingH ) +"px, 0)",
                "transform" : "translate3d(0 ,"+ ( -loadingH ) +"px, 0)"
            });

            hammerT.get("pan").set({
                direction: Hammer.DIRECTION_VERTICAL
            });

            hammerT.on("panstart", function(e) { hammerAction.hStart(e); });
            hammerT.on("panmove", function(e) { hammerAction.hMove(e); });
            hammerT.on("panend", function(e) { hammerAction.hEnd(e); });

            var moveOffset = 0,
                tempOffset = 0,
                topPullLoad = true;

            var hammerAction = {
                hStart : function(e){
                   tempOffset = moveOffset;
                   topPullLoad =  moveOffset >= 0 ? true : false;  // 是否从顶部往下拉
                   // console.log( moveOffset );
                },
                hMove : function(e){
                    if( topPullLoad ){   // topPullLoad为真，直接计算 e.deltaY
                        tempOffset = e.deltaY;
                        if(tempOffset > 100 ){
                            loading.show().removeClass("loading-drag-move").addClass("loading-drag-trigger");
                        }
                        else if( tempOffset > 0 && tempOffset < 100 ){
                            loading.show().removeClass("loading-drag-trigger").addClass("loading-drag-move");
                        }
                    }
                    else{  // 否则，计算 列表之前移动的高度+e.deltaY
                        tempOffset = moveOffset + e.deltaY;
                        if(tempOffset > 100 ){
                            loading.show().removeClass("loading-drag-move").addClass("loading-drag-trigger");
                        }
                        else if(tempOffset > 0 && tempOffset < 100 ){
                            loading.show().removeClass("loading-drag-trigger").addClass("loading-drag-move");
                        }
                    }
                    this.setAnimationAttr( 0 , tempOffset);
                    e.preventDefault();
                    // document.title = e.deltaY + ";" + tempOffset;
                    // console.log(e.deltaY + ";" + tempOffset + ";" + moveOffset);
                },
                hEnd : function(e){
                    var self = this;
                    moveOffset += e.deltaY;
                    if( loading.hasClass("loading-drag-trigger") ){ // loading data
                        loading.removeClass("loading-drag-trigger");
                        moveOffset = loadingH;
                        insertData(function(){
                            self.setAnimationAttr( 0.5 , 0);
                        });
                    }
                    else if( loading.hasClass("loading-drag-move") ){  // 下拉距离不满足加载数据条件
                        loading.hide().removeClass("loading-drag-move");
                        moveOffset = 0;
                    }
                    else if( moveOffset < 0 && moveOffset <= screenH - sectionRow.height()){ // 上拉释放时，作如下判断
                        if( screenH < sectionRow.height() ){ // 若列表高度大于屏幕高，则列表最后一项位于底部
                            moveOffset = screenH - sectionRow.height();
                        }
                        else{  // 否则列表第一项在顶部
                            moveOffset = 0 ;
                        }
                    }
                    this.setAnimationAttr( 0.5 , moveOffset);
                    e.preventDefault();
                },
                setAnimationAttr : function( duration , offset){
                    sectionRow.css({
                        "-webkit-transition" : duration + "s all ease-out",
                        "transition" : duration + "s all ease-out",
                        "-webkit-transform" : "translate3d(0 ,"+ ( offset ) +"px, 0)",
                        "transform" : "translate3d(0 ,"+ ( offset ) +"px, 0)"
                    });
                }
            }
        }

        function insertData(callback){
            isLoad = false;
            setTimeout( function(){
                isLoad = true;
                loadData( dataUrl );
                callback && callback();
            } , 1000);
        }

        function loadData(url){
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'js',
                timeout: 2000,
                context: $('body'),
                success: function(data){
                    var data = $.parseJSON(data);
                    for(var i = tempNum ; i < showNum ; i++){
                        if( tempNum > data.total - 1 ){ 
                            loading.html("数据全部加载完成！");
                            return false;
                        }
                        appendHtml( data.info[tempNum] );
                        tempNum++;
                    }
                    // loading.hide();
                    showNum += loadNum;
                },
                error: function(xhr, type){
                    loading.html("数据加载失败");
                }
            })
        }

        function appendHtml(data){
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
            if(loadDirection == "top"){
                tempEle.prependTo( rowList );
                return;
            }
            rowList.append( tempEle );
        }

        loadData( dataUrl );


    })
}