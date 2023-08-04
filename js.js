  function create_scroll(x,start,end,preset)
  {
      
      x.style.gap = "30px";
      x.style.padding = x.style.gap.substring(0,2)/2+ "px 0px";
      x.style.fontSize = "50px";
      x.style.lineHeight ="50px";
      x.style.height="50px";
      func_1(x, start,end);
      set_event_scroll(x,start,end);
      
      x.value =preset;
      //x.scrollTop = 85;
      //x.childNodes[preset].offsetTop - x.childNodes[0].offsetTop;
      //console.log(x.value +":"+x.scrollTop + " : "+x.childNodes[preset].offsetTop+":"+x.childNodes[0].offsetTop);
  }


  function set_event_scroll(elem,start,end)
  {
      var down_time =0;
      var down_pos_x =0;
      var up_time = 0;
      let up_pos_x = 0;
      elem.scrollTop = 85;
      elem.addEventListener("touchstart",function(e) 
      {
          down_time = new Date();
          down_pos_x = e.touches[0].pageY;
      });
      
      elem.addEventListener("touchmove",function(e) 
      {
          up_time = new Date();
          up_pos_x = e.touches[0].pageY;
      });
      
      elem.addEventListener("touchend",function(e) 
      {
          time_interval = up_time - down_time;
          if(time_interval != 0)
   		      {
   		          speed = Math.abs((up_pos_x - down_pos_x) / time_interval );
   		      }
          else
          {
              speed = 0;
          }
          func(elem,speed,start,end);
      });
  }


  function func_1(elem,start,end)
  {
      let gap = elem.style.gap.substring(0,2);
      let character = elem.style.lineHeight.substring(0,2);
      character = Math.floor(1.1*character);
      let container = elem.style.height.substring(0,2);
          
    for (let i = start; i <= end; i++)
    {
        let y = document.createElement("span");
        
        y.innerText = i;
        elem.appendChild(y);
    }
  }
  
  async function func(elem, speed,start,end)
  {
       let height = elem.childNodes[1].offsetTop - elem.childNodes[0].offsetTop
      
      
      
      if(speed<0.5)
      { 
          await sleep(500);
      }
      else if (speed<0.9)
      {
          await sleep(750);
      }
      else if (speed<1.20)
      {
          await sleep(1000);
      }
      else if (speed < 1.70)
      {
          await sleep(1500);
      }
      else
      {
          await sleep(2000);
      }
      var id =0;
      let w = end-start;
      
      for (let i=0 ; i <= end-start; i++)
      {
          
          if ( (elem.childNodes[i].offsetTop-elem.childNodes[0].offsetTop)> elem.scrollTop)
          {
              w=i;
              break;
          }
      }
      
      w-=1;
      elem.value = start + w;
      let top = elem.childNodes[w].offsetTop;
      top -= elem.childNodes[0].offsetTop;
      
      
      console.log("tot:"+top+" scroll:"+ elem.scrollTop);
      if (top<(elem.scrollTop -height))
      {
          console.log("happy")
          top -= -height;
          elem.value -= -1;
      }
      console.log(top);
      
      let v =Math.floor(top);
      
      clearInterval(id);
      let pos = Math.floor(elem.scrollTop);
      
      id = setInterval(frame, 10);
      
      function frame() 
      {
        if (pos == v) 
        {
          clearInterval(id);
        } 
        else
        {
          if( pos > v)
          {
            pos--;
          }
          else
          {
            pos++;
          }
          elem.scrollTop = pos;        
        }
      }
  }
