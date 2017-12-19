window.onload=function(){
    var container = document.getElementById('container');

    var direction = {
        up:1,
        down:2
    };

    var nowIndeY = 1;
    var lastIndeY = 1;
    var startY = 0 ;
    var isUp = false;
    var isDown= false;
    
    
	//	音频控制
	musicPlay ()
	function musicPlay (){
		var isShow = false
		var isClick = document.querySelector('.music')
		var musicImg = document.querySelector('.music-img')
		var musicP = document.querySelector('.music-p img')
		var audio = document.querySelector('.music audio')
		
		isClick.addEventListener('click',function(ev){
	        if(isShow){
	        	audio.pause();
	        	tools.removeClass(musicImg,'infiniteRotateOut');
	        	tools.addClass(musicP,'hide');
	        	isShow = !isShow
	        }else{
	        	tools.addClass(musicImg,'infiniteRotateOut');
	        	tools.removeClass(musicP,'hide');
	        	audio.play();
	        	isShow = !isShow
	        }
	    });
	} 
	
	//	滑屏控制
    var isMoving = false;
    var isBottom = false
	var upIcon = document.querySelector('.point')
	
    container.addEventListener('touchstart',function(ev){
        ev = ev || event ;
        var touchC = ev.changedTouches[0];
        startY = touchC.clientY;
    });

    container.addEventListener('touchmove',function(ev){
        if (isMoving){
            return;
        }
        ev = ev || event ;
        var touchC = ev.changedTouches[0];
        var nowY = touchC.clientY;
        var disY = nowY - startY;

        if	(disY > 0 ) {
            console.log('downMove');
            isDown = true;

        }else if(disY < 0 ){
            console.log('upMove');
            isUp = true;
        }
    });
    container.addEventListener('touchend',function(ev){
        if (isMoving){
            return;
        }
        ev = ev || event;
        if(isUp){
        	//判断是否到底部
            if(nowIndeY<7){
            	lastIndeY = nowIndeY;
                nowIndeY = lastIndeY + 1;
                movePage(direction.up , lastIndeY , nowIndeY)
               	// 若滑屏后到底部，隐藏图标
                if( nowIndeY === 7 ){
	            	isBottom = true              	
	        		tools.addClass(upIcon,'hide');	
	            }else{
	            	//null
	            }
            }else{
              	//null
            }
            
        }else if(isDown){
        	//防止第一屏被划出
            if(nowIndeY>1){
            	lastIndeY = nowIndeY;
                nowIndeY = lastIndeY - 1;
                movePage(direction.down , lastIndeY , nowIndeY)
                //若有到底部标识，并且返回上层才会取消隐藏
                if (isBottom) {
                	tools.removeClass(upIcon,'hide');	
                }else{
                	//null
                }
            }else{
			//null
            }            
        }

        isUp = false;
        isDown = false;
        console.log('lastIndeY' +lastIndeY)
    });

    function movePage(dir,lastIndeY ,nowIndeY ){
        var lastPage = '.page-' + lastIndeY ;
        var nowPage = '.page-' + nowIndeY ;
		var arr1 = '.page-' + lastIndeY + ' img'
		var arr2 = '.page-' + nowIndeY + ' img'
        var inClass = '';
        var outClass = '';
		
		
        switch (dir){
            case direction.up:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case direction.down:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
        }
		
		// lastPage和nowPage是带class的字符串
        var lastNode = document.querySelector(lastPage);
        var nowNode = document.querySelector(nowPage);
        var arr1Node = document.querySelectorAll(arr1);
        var arr2Node = document.querySelectorAll(arr2);
		console.log(arr1Node.length)
		console.log(arr2Node.length)
		
		//nowNode 为正要进场的页，lastNode 为正要出场的页
        tools.addClass(lastNode,outClass);
        tools.addClass(nowNode,inClass);
        tools.removeClass(nowNode,'hide');
        
		// 页面下的img也要hide
		for(var i = 0 ; i < arr1Node.length ; i ++){
        	tools.addClass(arr1Node[i],'hide');
        }
	
        isMoving = true;

		//清除进场和出场页的样式
        setTimeout(function () {
			//nowNode 为已经进场的页 ，lastNode 为已经出场的页
            tools.removeClass(lastNode,outClass);
            
			// 页面下的img也要hide
            tools.addClass(lastNode,'hide');
            for(var i = 0 ; i < arr2Node.length ; i ++){
				tools.removeClass(arr2Node[i],'hide');
           	}

            tools.removeClass(nowNode,inClass);
            isMoving = false;
        }, 600)

    }
}
