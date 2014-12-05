!function(e,t){"object"==typeof exports&&exports?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Mustache={})}(this,function(e){function t(e){return"function"==typeof e}function n(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(e,t){return g.call(e,t)}function i(e){return!r(w,e)}function s(e){return String(e).replace(/[&<>"'\/]/g,function(e){return d[e]})}function o(t,r){function s(){if(U&&!m)for(;d.length;)delete w[d.pop()];else d=[];U=!1,m=!1}function o(e){if("string"==typeof e&&(e=e.split(k,2)),!f(e)||2!==e.length)throw new Error("Invalid tags: "+e);h=new RegExp(n(e[0])+"\\s*"),l=new RegExp("\\s*"+n(e[1])),p=new RegExp("\\s*"+n("}"+e[1]))}if(!t)return[];var h,l,p,g=[],w=[],d=[],U=!1,m=!1;o(r||e.tags);for(var E,T,j,C,A,R,S=new u(t);!S.eos();){if(E=S.pos,j=S.scanUntil(h))for(var O=0,$=j.length;$>O;++O)C=j.charAt(O),i(C)?d.push(w.length):m=!0,w.push(["text",C,E,E+1]),E+=1,"\n"===C&&s();if(!S.scan(h))break;if(U=!0,T=S.scan(x)||"name",S.scan(v),"="===T?(j=S.scanUntil(y),S.scan(y),S.scanUntil(l)):"{"===T?(j=S.scanUntil(p),S.scan(b),S.scanUntil(l),T="&"):j=S.scanUntil(l),!S.scan(l))throw new Error("Unclosed tag at "+S.pos);if(A=[T,j,E,S.pos],w.push(A),"#"===T||"^"===T)g.push(A);else if("/"===T){if(R=g.pop(),!R)throw new Error('Unopened section "'+j+'" at '+E);if(R[1]!==j)throw new Error('Unclosed section "'+R[1]+'" at '+E)}else"name"===T||"{"===T||"&"===T?m=!0:"="===T&&o(j)}if(R=g.pop())throw new Error('Unclosed section "'+R[1]+'" at '+S.pos);return c(a(w))}function a(e){for(var t,n,r=[],i=0,s=e.length;s>i;++i)t=e[i],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}function c(e){for(var t,n,r=[],i=r,s=[],o=0,a=e.length;a>o;++o)switch(t=e[o],t[0]){case"#":case"^":i.push(t),s.push(t),i=t[4]=[];break;case"/":n=s.pop(),n[5]=t[2],i=s.length>0?s[s.length-1][4]:r;break;default:i.push(t)}return r}function u(e){this.string=e,this.tail=e,this.pos=0}function h(e,t){this.view=null==e?{}:e,this.cache={".":this.view},this.parent=t}function l(){this.cache={}}var p=Object.prototype.toString,f=Array.isArray||function(e){return"[object Array]"===p.call(e)},g=RegExp.prototype.test,w=/\S/,d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},v=/\s*/,k=/\s+/,y=/\s*=/,b=/\s*\}/,x=/#|\^|\/|>|\{|&|=|!/;u.prototype.eos=function(){return""===this.tail},u.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},u.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},h.prototype.push=function(e){return new h(e,this)},h.prototype.lookup=function(e){var n,r=this.cache;if(e in r)n=r[e];else{for(var i,s,o=this;o;){if(e.indexOf(".")>0)for(n=o.view,i=e.split("."),s=0;null!=n&&s<i.length;)n=n[i[s++]];else n=o.view[e];if(null!=n)break;o=o.parent}r[e]=n}return t(n)&&(n=n.call(this.view)),n},l.prototype.clearCache=function(){this.cache={}},l.prototype.parse=function(e,t){var n=this.cache,r=n[e];return null==r&&(r=n[e]=o(e,t)),r},l.prototype.render=function(e,t,n){var r=this.parse(e),i=t instanceof h?t:new h(t);return this.renderTokens(r,i,n,e)},l.prototype.renderTokens=function(n,r,i,s){function o(e){return h.render(e,r,i)}for(var a,c,u="",h=this,l=0,p=n.length;p>l;++l)switch(a=n[l],a[0]){case"#":if(c=r.lookup(a[1]),!c)continue;if(f(c))for(var g=0,w=c.length;w>g;++g)u+=this.renderTokens(a[4],r.push(c[g]),i,s);else if("object"==typeof c||"string"==typeof c)u+=this.renderTokens(a[4],r.push(c),i,s);else if(t(c)){if("string"!=typeof s)throw new Error("Cannot use higher-order sections without the original template");c=c.call(r.view,s.slice(a[3],a[5]),o),null!=c&&(u+=c)}else u+=this.renderTokens(a[4],r,i,s);break;case"^":c=r.lookup(a[1]),(!c||f(c)&&0===c.length)&&(u+=this.renderTokens(a[4],r,i,s));break;case">":if(!i)continue;c=t(i)?i(a[1]):i[a[1]],null!=c&&(u+=this.renderTokens(this.parse(c),r,i,c));break;case"&":c=r.lookup(a[1]),null!=c&&(u+=c);break;case"name":c=r.lookup(a[1]),null!=c&&(u+=e.escape(c));break;case"text":u+=a[1]}return u},e.name="mustache.js",e.version="0.8.1",e.tags=["{{","}}"];var U=new l;e.clearCache=function(){return U.clearCache()},e.parse=function(e,t){return U.parse(e,t)},e.render=function(e,t,n){return U.render(e,t,n)},e.to_html=function(n,r,i,s){var o=e.render(n,r,i);return t(s)?void s(o):o},e.escape=s,e.Scanner=u,e.Context=h,e.Writer=l});