// $(function(){
// 	var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K',};
// 	var colors=['h','s','c','d'];
// 	var poker=[];
// 	var biao={};
// 	while (poker.length!==52) {
// 		var index=Math.floor(Math.random()*4);
// 		var n=Math.ceil(Math.random()*13);
// 		var c=colors[index];
// 		var v={
// 			color:colors[index],
// 			number:n
// 		}
// 		if(!biao[c+n]){
// 			poker.push(v);
// 			biao[c+n]=true;
// 		}
		
// 	};
// 	$(poker).each(function(i,v){
// 		$('<div>')
// 	          .addClass('pai')
// 	          .css('background-image','url(image/image/'+dict[v.number]+v.color+'.png)')
// 	          .appendTo($('.scene'))

// 	})		
// })


$(function(){
	var fen=0;
	function makePoker(){
		var poker=[];//56张牌的两个参数用来确定图片[{number:,color:},{},{}.....]
		var colors=['h','s','c','d'];
		var biao={};
		
		while(poker.length!=52){
			var n=Math.ceil(Math.random()*13);
			var index=Math.floor(Math.random()*4);
			var c=colors[index];
	        var v={
	        	number:n,
	        	color:c,
	        }
	        if (!biao[c+n]) {
	        	poker.push(v);
	        	biao[c+n]=true;
	        };
	        
		}
		return poker;
	}
	function setPoker(poker){
        var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K',};
		var indexa=0;
	    for(var i=0;i<7;i++){ 
          
	    	for (var j = 0,poke; j <i+1; j++) {
	    		poke=poker[indexa];
	            indexa++;
	    		 $('<div>')
	    		 .attr('id',i+'_'+j)
	    		 .attr('data-number',poke.number)
		         .addClass('pai')
		         .css('background-image',"url(image/image/"+dict[poke.number]+poke.color+".png)")
		         .appendTo($('.scene'))
		         .delay(indexa*30)
		         .animate({
		         	top:i*40,
		         	left:45+(6-i)*65+j*130,
		         	opacity:1
		         },500)
	    	};
	    	    
	    }
        
	    for (; indexa<poker.length; indexa++) {
	    	v=poker[indexa];
	    	$('<div>')
	    	     .attr('id',indexa)
	    	     .attr('data-number',v.number)
		         .addClass('pai')
		         .addClass('left')
		         .css('background-image',"url(image/image/"+dict[v.number]+v.color+".png)")
		         .appendTo($('.scene'))
		         .delay(indexa*30)
		         .animate({
		         	top:420,
		         	left:240,
		         	opacity:1
		         },500)
	    };
	}
	//点击开始按钮
	$('.start').on("click",function(){
		$('.shade').css('display','none')
		setPoker(makePoker());
	})
	//点击游戏说明按钮
	$('.explain').on("click",function(){
		$('.explain-l').toggleClass('play');
	})

	
	var bright=$('.bom-right');
	var zIndex=1;
	bright.on('click',(function(){
		return function(){
        $('.left').last()
        .css('z-index',zIndex++)
        .animate({
        	left:630,
        })
        .queue(function(){
        	$(this).removeClass('left')
        	.addClass('right')
        	.dequeue();
        })
        }
	})()
		
	)

	var bleft=$('.bom-left');
    var number=0;
	bleft.on('click',(function(){
        return function(){
		if ($('.left').length) {
			return;
		};
		number++;//最多只能返回三次
		if (number>3) {
			return;
		};
		$('.right').each(function(i){
			$(this)
			.delay(i*100)
			.css('z-index',0)
			.animate({
        	  left:240,
            },500)
            .queue(function(){
        	$(this).removeClass('right')
        	.addClass('left')
        	.dequeue();
        })
		})
	    }
	})()		
	)


	function getNumber(el){
		return parseInt($(el).attr('data-number'));
	}

	function isCanClick(el){
        var x=parseInt($(el).attr('id').split('_')[0]);
        var y=parseInt($(el).attr('id').split('_')[1]);
        if ($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
        	return false;
        }else{
        	return true;
        }
	}
    var prev;
    $('.scene').on('click','.pai',function(){
    	//如果是上边的牌而且被压住直接返回
    	if ($(this).attr('id')&&!isCanClick(this)) {
    		return;
    	};

    	var number=getNumber(this);
        //点击到13直接消失
        if(number==13){
        	fen+=10;
        	$(this)
        	.animate({
        		top:0,
        		left:700
        	})
        	.queue(function(){
        		$(this).detach().dequeue();
        	});
        	$('.fen').text(fen);
        	return;
        }

        if(prev){
        	//第二个数非13的情况
	        if (getNumber(prev)+getNumber(this)==13) {
	        	    fen+=10;
	        		prev.add(this
	        			)
	        		.animate({
	        			top:0,
	        			left:700
	        		})
	        		.queue(function(){
	        			$(this).detach().dequeue();
	        		})
	        	}else{
	        		if ($(this).attr('id')==prev.attr('id')) {
	        			$(this).animate({
	        			top:'+=20'
	        		    })
	        		    prev=null;
	        		    return;
	        		};
	        		$(this).animate({
	        			top:'-=20'
	        		})
	        		$(this).animate({
	        			top:'+=20'
	        		})
	        		prev.delay(400).animate({
	        			top:'+=20'
	        		})
	        	}
	        	prev=null;
	    }else{
	        	//第一个数非13
	        	$(this).animate({
	        			top:'-=20'
	        	})
	        	prev=$(this);
	        
        }

     $('.fen').text(fen);
    })

//点击重新开始
$('.restart').on("click",function(){
	fen=0;
	$('.fen').text(fen);
	number=0;
	$('.pai').remove();
	setPoker(makePoker());
})

})