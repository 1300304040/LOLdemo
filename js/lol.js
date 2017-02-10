/**
 *
 * Created by Administrator on 2016/12/21 0021.
 */

$(function(){
    //子导航栏显示隐藏
    $("#header_nav_ul").mouseenter(function(){
        $(".hide-ul").stop().slideDown();
    });
    $("#hide_ul").mouseleave(function(){
        $("#hide_ul").stop().slideUp();
    });
    //筋斗云
    var defaultLeft = $("#move-img").position().left;
    $(".header-nav-ul li").mouseenter(function(){
        $("#move-img").stop().animate({"left":$(this).index()*144 + defaultLeft},200);
    });
    var clickPos = defaultLeft;
    $(".header-nav-ul li").click(function(){
        clickPos = $("#movr-img").position().left;
    });
    $("#move-img").stop().animate({"left":clickPos},200);
    //download部分透明度变化
    $(".download .public").mouseenter(function(){
        $(this).css("opacity","0.8");
    }).mouseleave(function(){
        $(this).css("opacity","1");
    });
    //loginAPI相关操作
    $("#loginApi").click(function(){
        $("#login_bar,#overlay").css("display","block");
          //username自动获得焦点
        $("#username").trigger("focus").css("background-position","-2px -46px");
            $("#username,#password").focus(function(){
            $(this).css("background-position","-2px -46px");
        }).blur(function(){
            $(this).css("background-position","-2px -2px");
        });
        //拖拽
        $(".remove").mousedown(function(ele){
            var loginL = ele.pageX - $("#login_bar").offset().left;
            var loginT = ele.pageY - $("#login_bar").offset().top;
            $(document).mousemove(function(e){
                var left = e.pageX + $("#login_bar").width()/2 - loginL;
                var top = e.pageY + $("#login_bar").height()/2 - loginT;
                $("#login_bar").css({"left":left,"top":top});
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            });
        });
        $(document).mouseup(function(){
            $(this).off("mousemove");
        });
        //滚动时login_bar固定定位
        $(window).scroll(function(){
            $("#login_bar").css("position","fixed");
            //var scrollTop = $(this).scroll().top();
            //console.log(scrollTop);
        });
        $("#username").keyup(function(){
            if( $(this).val() != "" ) {
                $("#clear_content").css("display","block");
            } else {
                $("#clear_content").css("display","none");
            }
            //点击clear_content清空
            $("#clear_content a").click(function(){
                $("#username").val("").trigger("focus");
                $("#clear_content").css("display","none");
                $(".tip").css("display","none");
            });
             //正则验证 空格及特俗字符串
            if(/(\W+)|(\s+)/.test($(this).val())) {
                //console.log(/(\W+)|(\s+)/.test($(this).val()));
                //console.log($(this).val());
                $(".tip").css("display","block").html("<span class='alarm'></span>请输入正确的账号！");
                //$(".alarm").css("display","block");

            } else {
                $(".tip").css("display","none");
            }
        });
        $("#password").keyup(function(){
            if( $(this).val() != "" ) {
                $("#clear_psw").css("display","block");
            } else {
                $("#clear_psw").css("display","none");
            }
            //点击clear_psw清空
            $("#clear_psw a").click(function(){
                $("#password").val("").trigger("focus");
                $("#clear_psw").css("display","none");
            });
        });
        //提交按钮验证
        $("#sub").click(function(){
            if ($("#username").val().length == 0 && $("#password").val().length == 0) {
                $(".tip").css("display","block").html("<span class='alarm'></span>请输入账号密码！");
            } else if($("#username").val().length == 0) {
                $(".tip").css("display","block").html("<span class='alarm'></span>请输入账号！");
            } else if($("#password").val().length == 0) {
                $(".tip").css("display","block").html("<span class='alarm'></span>请输入密码！");
            } else {
                $(".tip").css("display","none");
            }
        });
        //点击close关闭登录及遮罩窗口
        $(".close").hover(function () {
            $(this).css("background-position","-221px -151px");
        },function(){
            $(this).css("background-position","-221px -128px");
        }).click(function(){
            $("#login_bar,#overlay").css("display","none");
        });

    });

});
//*****************第一部分结束********************//
//*****************第二部分开始********************//
$(function(){
    //左边轮播图部分
    var picIndex = 0;
    var timer = null;
    var picWidth = $(".home-mod").width();
    timer = setInterval(picMove,2000);
    $(".home-mod .slide").append($(".slide>li").eq(0).clone());
    var slidePics = $(".slide>li");
    //console.log(slidePics.length);
    function picMove(){
        if (picIndex === slidePics.length - 1) {
            picIndex = 0;
            $(".slide").css("left",0);
            //$(".home-mod .trigger-item").eq(0).addClass("on").siblings().removeClass("on");
        }
        picIndex++;
        //console.log(picIndex);
        $(".slide").animate({"left": -picIndex * picWidth},400);
        if (picIndex === slidePics.length - 1) {
            $(".home-mod .trigger-item").eq(0).addClass("on").eq(0).siblings().removeClass("on");
        }
        $(".home-mod .trigger-item").eq(picIndex).addClass("on").siblings().removeClass("on");
        //console.log(picIndex);
        //console.log(slidePics.length);
    }
    $(".home-mod").mouseenter(function(){
        clearInterval(timer);
    });
    $(".home-mod").mouseleave(function(){
        timer = setInterval(picMove,2000);
    });
    $(".trigger-item").eq(0).addClass("on");
    $(".trigger-item").mouseenter(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".slide").stop().animate({"left": (-$(this).index() + 1) * picWidth});
    });
    //???为什么是开启之前定时器
    //右边部分
    $(".topNav li").mouseenter(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".content").eq($(this).index()).css("display","block").siblings().css("display","none");
    });
    //左边视频中心部分
    //$(".tab ul li").mouseenter(function(){
    //    $(this).addClass("current").siblings().removeClass("current");
    //    $(".content-video .list-video").eq($(this).index()).css("display","block").siblings().css("display","none");
    //});

});
//*****************第三部分开始********************//
//视频中心
$(function(){
    var newVideoStr = "";
    console.log(newVideo);
    function eachVideo(newVideoArr){
        newVideoStr = "";
        for (var i = 0; i < newVideoArr.length; i++) {
            newVideoStr +=       '<li>' +
            '<a class="v-link" href="#">' +
                '<img src=' + newVideoArr[i].srcImg + ' >' +
                '<span class="shadow1"></span>' +
                '<span class="v-meta">' +
                '<span class="v-time">' + newVideoArr[i].v_time + '</span>' +
            '</span>' +
            '<span class="shadow2"></span>' +
                '<i class="icon-v"></i>' +
                '</a>' +
                '<h5 class="v-name">' +
                '<a href="#">' + newVideoArr[i].description + '</a>' +
            '</h5>' +
            '</li>';
        }
        return newVideoStr
    }
    $(".list-video").css("display","block").html(eachVideo(newVideo)).find("li").hover(function(){
        $(this).find(".shadow2,.icon-v").css("display","block");
    },function(){
        $(this).find(".shadow2,.icon-v").css("display","none");
    });
    $("#tab_li li").mouseenter(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".list-video").eq($(this).index()).css("display","block").siblings().css("display","none");
        switch ($(this).index()) {
            case 0:
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(newVideo));
                break;
            case 1:
            $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(commentVideo));
            break;
            case 2:
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(weekHero));
                break;
            case 3:
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(matchVideo));
                break;
            case 4:
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(funnyVideo));
                break;
            case 5:
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(officialVideo));
                break;
            default :
                $(".list-video").eq($(this).index()).css("display","block").html(eachVideo(newVideo));
        }
        $(".list-video").eq($(this).index()).find("li").hover(function(){
            $(this).find(".shadow2,.icon-v").css("display","block");
        },function(){
            $(this).find(".shadow2,.icon-v").css("display","none");
        });
    });

    var heroStr = "";
    function eachHero(heroArr) {
        heroStr = "";
        if (heroArr == hero0) {
            for(var i = 0; i < heroArr.length; i++){
                heroStr +=
            '<a class="hero" href="#"><img src= '+ heroArr[i].srcImg +' alt=""/>' +
                    '<span class="bg">' +
                    '<span class="name"> '+ heroArr[i].firstName +'</span>' +
                    '</span>' +
                    '</a>'
            }
        } else {
            for (var i = 0; i < heroArr.length; i++) {
                heroStr +=
                    '<a href="#"><img src= '+ heroArr[i].srcImg +' alt=""/></a>'
            }
            heroStr = '<div class="new-hero-list">' + heroStr + '</div>'
        }
        return heroStr;
    }
    $(".free-list").html(eachHero(hero0));
    $("#hero_tab li").mouseenter(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $("#hero .hero-content").eq($(this).index()).css("display","block").siblings().css("display","none");
        switch ($(this).index()){

            case 1:
                $("#hero .hero-content").eq($(this).index()).html(eachHero(hero1));
                break;
            case 2:
                $("#hero .hero-content").eq($(this).index()).html(eachHero(hero2));
                break;

        }
    });
    $(".free-list .hero").hover(function(){
        $(".bg").eq($(this).index()).css("display","block");
    },function(){
        $(".bg").eq($(this).index()).css("display","none");
    });

    //快速登录部分



    $(".match-tab li").mouseenter(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $("#matchContent .home-match-content").eq($(this).index()).css("display","block").siblings().css("display","none");
    });


    //活动中心部分
    $(".act-list").mouseenter(function(){
        $(".acr-info").slideDown("fast");
    }).mouseleave(function(){
        $(".acr-info").slideUp("fast");
    });

    //客服专区部分
    $(".tab-nav li").mouseenter(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".kf-list>li").eq($(this).index()).css("display","block").siblings().css("display","none");
    });

    //官方媒体合作部分
    $(document).click(function(){
        $(".footer-mt-site").css("display","none");
    });
    $(".footer-mt").click(function (ele) {
        $(".footer-mt-site").css("display","block");
        ele.stopPropagation();
    });

    //小火箭部分
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".rocket").css("display","block");
        } else {
            $(".rocket").css("display","none");
        }
    });
    //点击回页面顶部
    $(".rocket").click(function () {
        $("html,body").animate({scrollTop:0},500);
    });
    //小火箭放大效果
    $(".rocket>img").mouseenter(function () {
        $(".rocket img").stop().animate({
            "width": "86px",
            "height": "86px",
            "margin-left": "-8px",
            "margin-top": "-8px"
        },300);
    });
    $(".rocket>img").mouseleave(function () {
        $(".rocket img").stop().animate({
            "width": "70px",
            "height": "70px",
            "margin-left": "0px",
            "margin-top": "0px"
        },300);
    });

});
