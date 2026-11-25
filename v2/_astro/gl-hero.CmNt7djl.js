import{_ as q}from"./Base.astro_astro_type_script_index_0_lang.BDoiLrWF.js";const A=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`,E=`
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uTime;
uniform float uFocusY;
varying vec2 vUv;

vec2 cover(vec2 p) {
  float rr = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 uv = p;
  if (rr > ri) {
    float k = ri / rr;
    uv.y = (uv.y - 0.5) * k + 0.5 + (uFocusY - 0.5) * (1.0 - k);
  } else {
    float k = rr / ri;
    uv.x = (uv.x - 0.5) * k + 0.5;
  }
  return uv;
}

float beacon(vec2 imgUv, vec2 c, float phase) {
  float d = distance(imgUv * vec2(uImg.x / uImg.y, 1.0), c * vec2(uImg.x / uImg.y, 1.0));
  float flash = pow(max(0.0, sin(uTime * 6.0 + phase)), 6.0);
  return exp(-d * 55.0) * (0.25 + 0.75 * flash);
}

void main() {
  vec2 iu = cover(vUv);
  vec3 col = texture2D(uTex, iu).rgb;
  float b = beacon(iu, vec2(0.235, 0.345), 0.0) + beacon(iu, vec2(0.50, 0.335), 2.1) + beacon(iu, vec2(0.765, 0.328), 4.2);
  col += vec3(0.22, 0.5, 1.0) * b * 0.55;
  gl_FragColor = vec4(col, 1.0);
}
`;async function U(n,{gsap:d,reduce:s}){try{sessionStorage.setItem("rt-intro","1")}catch{}const r=n.querySelector("[data-gh-photo]"),h=n.querySelector("[data-gh-text]"),u=n.querySelector("[data-gh-canvas]"),o=r?.querySelector("img");if(!r||!u||!o)return;s||d.timeline({scrollTrigger:{trigger:n,start:"top top",end:"bottom top",scrub:!0}}).to(r,{yPercent:14,ease:"none"},0).to(h,{yPercent:-36,opacity:0,ease:"none"},0);const p=matchMedia("(hover: hover) and (pointer: fine)").matches;if(!(s||!p))try{const{Renderer:i,Program:x,Mesh:y,Triangle:b,Texture:R}=await q(async()=>{const{Renderer:t,Program:w,Mesh:_,Triangle:F,Texture:P}=await import("./index.CztNQUZH.js");return{Renderer:t,Program:w,Mesh:_,Triangle:F,Texture:P}},[]);o.complete||await o.decode().catch(()=>{});const c=new i({canvas:u,alpha:!1,antialias:!1,dpr:Math.min(devicePixelRatio,1.75)}),e=c.gl,v=new R(e,{generateMipmaps:!1,minFilter:e.LINEAR,magFilter:e.LINEAR,flipY:!0});v.image=o;const a={uTex:{value:v},uRes:{value:[1,1]},uImg:{value:[o.naturalWidth||1280,o.naturalHeight||853]},uTime:{value:0},uFocusY:{value:.38}},T=new x(e,{vertex:A,fragment:E,uniforms:a}),I=new y(e,{geometry:new b(e),program:T}),l=()=>{const t=r.getBoundingClientRect();c.setSize(r.clientWidth,r.clientHeight),a.uRes.value=[e.canvas.width,e.canvas.height]};new ResizeObserver(l).observe(r),l();let m=!0;new IntersectionObserver(([t])=>{m=t.isIntersecting},{threshold:0}).observe(n);let g=performance.now();const f=t=>{if(requestAnimationFrame(f),!m||document.hidden){g=t-a.uTime.value*1e3;return}a.uTime.value=(t-g)/1e3,c.render({scene:I})};requestAnimationFrame(f),document.documentElement.classList.add("gl-on")}catch(i){console.warn("WebGL-слой не запущен",i)}}export{U as default};
