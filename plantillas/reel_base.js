// Motor común de reels Dyntec. Cada reel define: window.T (cortes), LV (altura de ola por escena), anim(t,T)
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
const back=x=>{x=clamp(x);const c=1.6;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const pop=(el,lt)=>{el.style.transform=`scale(${back(lt/0.4)})`;el.style.opacity=clamp(lt/0.12)};
const rise=(el,lt,dist=40)=>{el.style.opacity=ease(lt/0.35);el.style.transform=`translateY(${(1-ease(lt/0.35))*dist}px)`};
function wavePath(t){const a=40*Math.sin(t*1.3),b=40*Math.cos(t*1.1);return `M0,${70+a} C320,${0+b} 720,${140-a} 1080,${50+b} L1080,140 L0,140 Z`}
function render(t){
  const T=window.T,N=T.length-1;
  let idx=0;for(let i=0;i<N;i++)if(t>=T[i])idx=i;
  const prev=idx>0?LV[idx-1]:LV[0],k=ease((t-T[idx])/0.6),h=prev+(LV[idx]-prev)*k;
  document.getElementById('wave').style.height=(h+140)+'px';
  document.getElementById('wp').setAttribute('d',wavePath(t));
  for(let i=0;i<N;i++){
    const s=document.getElementById('s'+(i+1));if(!s)continue;const st=T[i],en=T[i+1],lt=t-st;
    const fin=i==N-1?1:1-ease((t-en)/0.25);
    s.style.opacity=t<st-0.01||t>en+0.25?0:Math.min(ease(lt/0.3),fin);
    const head=s.querySelector('.head');if(head)head.style.transform=`translateY(${(1-ease(lt/0.45))*50}px)`;
    const ph=s.querySelector('.phone');if(ph)ph.style.transform=`translateY(${(1-back(lt/0.6))*260}px)`;
  }
  anim(t,T);
}
