//GNB
$(function(){

    const $gnb = $("header>nav>.gnb>li");
    const $sub = $gnb.find(".sub");

    let nowIdx = 0; 
    
    $gnb.on({
        "mouseenter":function(){
            nowIdx = $gnb.index(this);
            
            $sub.eq(nowIdx).fadeIn(100);
            
            $gnb.eq(nowIdx).children("a").append("<span class='bar'></span>");
            
            const barW = $gnb.eq(nowIdx).find('span').first().width();

            $gnb.eq(nowIdx).find(".bar").css({
                width : barW,
                marginLeft : -barW/2
            });
        }
        ,
        "mouseleave":function(){
            $(".bar").remove();
            $sub.hide();
        }
    });
});


//자동재생 슬라이드
$(function(){
    const $container = $('.slides>.slides-container');
    const $indicator = $('.slides>.slides-indicator>li>a');
    const $btnPlay = $('.slides>.play');
    const $btnPause = $('.slides>.pause');

    const $button = $('.slides>.btnslides>.button');
    const $prev = $('.slides>.btnslides>.prev');

    let nowIdx = 0;
    let intervalKey = null;

    //재생함수
    const play = function(){
        clearInterval(intervalKey);
        intervalKey = setInterval(function(){
            if(nowIdx<2){
                nowIdx++;  
            }else{
                nowIdx=0;
            }
            $container.stop().animate({
                left : -940*nowIdx
            },1000);

            $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

            
        },4500);          
    };

    play();
    
    $btnPause.on('click', function(){
        clearInterval(intervalKey);
    
        $(this).hide().siblings().show();
    });

    $btnPlay.on('click', function(){
        play();

        $(this).hide().siblings().show();
    });


    //이전다음
    $container.parent().on({
        'mouseover' :  function(){
            $prev.stop().animate({
                left:42
            }).siblings().stop().animate({
                right:42
            })
        },
        'mouseleave' : function(){
            $prev.stop().animate({
                left:-42
            }).siblings().stop().animate({
                right:-42
            })
        }
    });
    
    $prev.on('click', function(evt){
        evt.preventDefault();
        
        if(nowIdx>1){
            nowIdx--;
        }else{
            nowIdx=0;
        }

        $container.stop().animate({
            left : -940*nowIdx
        },1000);

        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    }).siblings().on('click', function(evt){
        evt.preventDefault();
        
        if(nowIdx<2){
            nowIdx++;
        }else{
            nowIdx=0;
        }

        $container.stop().animate({
            left : -940*nowIdx
        },1000);

        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    })
});

//페이드 슬라이드
$(function(){
    const $storyTit = $(".story>ul>li>h2+a");
    const $slides = $('.story>ul>li');

    const $btnPlay = $(".story>.btn_play");
    const $btnPause = $(".story>.btn_pause");

    let intervalKey = null;
    let nowIdx = 0;

    const autoPlay = function(){
        intervalKey = setInterval(function(){
            $slides.eq(nowIdx).stop().fadeOut();

            if(nowIdx==0){
                nowIdx=1;
            }else{
                nowIdx=0;
            }

            $slides.eq(nowIdx).stop().fadeIn();

            $btnPlay.addClass('on').next().removeClass('on');
        },4000);
    };

    autoPlay();

    $storyTit.on('click', function(evt){
        evt.preventDefault();

        clearInterval(intervalKey);

        $btnPlay.removeClass('on');
        $btnPause.addClass('on');

        $(this).parent().stop().fadeOut();
        $(this).parent().siblings().stop().fadeIn();
    });


    $btnPlay.on('click', function(evt){
        evt.preventDefault();

        autoPlay();
    });
    

    $btnPause.on('click', function(evt){
        evt.preventDefault();

        $(this).addClass('on').prev().removeClass('on');
        clearInterval(intervalKey);
    });

});
    

//옵션박스
$(function(){
    $('.group input, .group button').on('click', function(){
        $(this).parent().next().toggle();
    });

    const $list = $('.group>.list, .group>.list_2');

    $('.group').on('mouseleave', function(){
        $list.hide();
    });

    $list.find('a').on('click', function(evt){
        evt.preventDefault();

        const sitename = $(this).text();

        $(this).parents('.list, .list_2').prev().children('input').val(sitename);
        $list.hide();

        
        $(this).parent().on('click', function(){
            $(this).addClass('on').siblings().removeClass('on');
        });
    });
});

//footer GNB
$(function(){
    $('footer>.info>ul').append('<li class="clse"><a href="#"></a></li>');
    
    const $gnb = $('footer>.info>ul>li:nth-child(4)>a');
    const $gnbClse = $('footer>.info>ul>li.clse>a');
    const $cite = $('footer>.info>ul>li:nth-child(3)>a');
    const $citeLst = $('footer>.info>ul>li>ol');
    const $top = $('footer>.info>ul>li:nth-child(5)>a')
    
    const gnbOpn = function(){
        $('footer>.info>ul>li.clse>a').show();
        $('section>.box').show();
        $('footer>.gnb').show().stop().animate({bottom:92,height: '500px'});
        $('html, body').stop().animate({
            scrollTop : 1500
        },700);
    }; 

    $gnb.on('click', function(evt){
        evt.preventDefault();
        gnbOpn();
    });

    $gnbClse.on('click', function(evt){
       evt.preventDefault();
       $(this).hide();
       $('footer>.gnb').stop().animate({bottom:0,height:'92px'});
       $('section>.box').hide();
    });

    $cite.on('click', function(evt){
        evt.preventDefault();

        if($citeLst.is(':visible')){
            $citeLst.stop().animate({height:0,top:10},300)
            $('footer>.info>ul>li>ol>li>a').css({'display':'none'})
        }else{
            $citeLst.show().stop().animate({height:'112px',top:-119},500);
        }

    });
    
    $top.on('click', function(evt){
        evt.preventDefault();
        $('html, body').stop().animate({
            scrollTop : 0
        },500);
    });

});

