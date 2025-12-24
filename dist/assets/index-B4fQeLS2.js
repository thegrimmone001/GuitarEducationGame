(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();var M=(e=>(e.FRETBOARD="mode1_fretboard",e.STAFF="mode2_staff",e.TAB="mode3_tab",e.COMBINED="mode4_combined",e))(M||{}),F=(e=>(e.SINGLE="single",e.MULTI="multi",e))(F||{}),Je=(e=>(e.TIMED_TOTAL="timed_total",e.TARGET_SCORE="target_score",e.FIXED_ROUNDS="fixed_rounds",e.BLACKOUT="blackout",e))(Je||{}),B=(e=>(e.LEARNING="learning",e.EASY="easy",e.MEDIUM="medium",e.HARD="hard",e))(B||{}),y=(e=>(e[e.NAT=0]="NAT",e[e.SHR=1]="SHR",e[e.FLT=2]="FLT",e))(y||{});const G=[!1,!0,!1,!0,!1,!1,!0,!1,!0,!1,!0,!1],at=[4,11,7,2,9,4];function an(e,n){return((at[e]??0)+n)%12}function j(e,n){return G[e]?n===y.SHR||n===y.FLT:n===y.NAT}function ie(e,n){return e*3+n}function Me(e){const n=Math.floor(e/3),t=e%3;return{pitchClass:n,spelling:t}}const st=["C","D","E","F","G","A","B"],ct=[0,2,4,5,7,9,11];function H(e){const n=Me(e),t=n.pitchClass;if(!G[t]){const a=ct.indexOf(t);return st[a>=0?a:0]}const o=["C♯","D♯","F♯","G♯","A♯"],i=["D♭","E♭","G♭","A♭","B♭"],l=[1,3,6,8,10].indexOf(t);return n.spelling===y.FLT?i[l]:o[l]}function dt(e){return JSON.stringify(e,(n,t)=>{if(t&&typeof t=="object"&&!Array.isArray(t)){const o=t,i={};for(const r of Object.keys(o).sort())i[r]=o[r];return i}return t})}function ut(e){let n=2166136261;for(let t=0;t<e.length;t++)n^=e.charCodeAt(t),n=Math.imul(n,16777619);return(n>>>0).toString(16).padStart(8,"0")}const ft=[0,2,4,5,7,9,11],pt=[0,2,3,5,7,8,10];function mt(e){const n=e.trim().toUpperCase();return{C:0,"C#":1,DB:1,D:2,"D#":3,EB:3,E:4,F:5,"F#":6,GB:6,G:7,"G#":8,AB:8,A:9,"A#":10,BB:10,B:11}[n]??null}const vt=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],bt=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];function On(e){const n=e.trim(),t=n.toLowerCase();if(t==="chromatic"||t.startsWith("chromatic:"))return{kind:"chromatic",rootPc:null,mode:null,pref:"sharps"};if(t==="accidentals"||t.startsWith("accidentals:"))return{kind:"accidentals",rootPc:null,mode:null,pref:(n.split(":").map(b=>b.trim())[1]||"").toLowerCase()==="flats"?"flats":"sharps"};const o=n.split(":").map(p=>p.trim()),i=(o[0]||"").toLowerCase(),r=o[1]||"",l=(o[2]||"").toLowerCase(),a=(o[3]||"").toLowerCase(),d=mt(r),f=l==="maj"||l==="major"?"maj":l==="min"||l==="minor"?"min":null,s=a==="flats"?"flats":a==="sharps"?"sharps":r.toLowerCase().includes("b")?"flats":"sharps";return i==="key"?{kind:"key",rootPc:d,mode:f,pref:s}:i==="scale"?{kind:"scale",rootPc:d,mode:f,pref:s}:{kind:"chromatic",rootPc:null,mode:null,pref:"sharps"}}function ht(e){const n=On(e);if(n.kind==="chromatic")return"Chromatic";if(n.kind==="accidentals")return e.trim().toLowerCase()==="accidentals"?"Accidentals (♯/♭)":n.pref==="flats"?"Accidentals (♭)":"Accidentals (♯)";if(n.rootPc===null||n.mode===null)return"Custom";const o=(n.pref==="flats"?bt:vt)[n.rootPc],i=n.mode==="maj"?"Major":"Minor";return`${n.kind==="key"?"Key":"Scale"}: ${o} ${i}`}function En(e){const n=new Uint8Array(36),t=On(e.promptProfileId);if(t.kind==="chromatic"){for(let r=0;r<12;r++)G[r]?(n[r*3+y.SHR]=1,n[r*3+y.FLT]=1):n[r*3+y.NAT]=1;return n}if(t.kind==="accidentals"){for(let r=0;r<12;r++)G[r]&&(t.pref==="flats"?n[r*3+y.FLT]=1:(n[r*3+y.SHR]=1,e.promptProfileId.trim().toLowerCase()==="accidentals"&&(n[r*3+y.FLT]=1)));return n}if(t.rootPc===null||t.mode===null){for(let r=0;r<12;r++)G[r]||(n[r*3+y.NAT]=1);return n}const o=t.mode==="maj"?ft:pt,i=t.pref==="flats"?y.FLT:y.SHR;for(const r of o){const l=(t.rootPc+r)%12;G[l]?n[l*3+i]=1:n[l*3+y.NAT]=1}for(let r=0;r<12;r++)for(let l=0;l<=2;l++){const a=r*3+l;n[a]===1&&!j(r,l)&&(n[a]=0)}return n}const Hn=[1,2,3,5,10],yt=5;function Un(e){return e>=20?4:e>=10?3:e>=6?2:e>=3?1:0}function Gn(e){return e===3?"3 in a row!":e===6?"6 in a row!":e===8?"8 in a row — HEATING UP!":e===10?"HOT STREAK!":e===20?"YOU’RE ON FIRE!":null}function gt(e){let n=e|0;return n^=n<<13,n^=n>>>17,n^=n<<5,n|0}function Ct(e,n){const t=gt(e),o=(t>>>0)%n;return{seed:t,value:o}}function J(e,n,t){return e*t+n}function Vn(e,n,t){if(n<0||n>=6||t<0||t>=e.fretCount)return!1;const o=J(n,t,e.fretCount);return e.domainCellEnabled[o]===1}function Te(e,n){e.fill(n)}function Et(e){return{profile:e,score:0,tokenCount:0,turnsWithoutScore:0,lastClaimStack:new Int32Array(1024),lastClaimStackSize:0}}function Tt(e,n){if(e.lastClaimStackSize>=e.lastClaimStack.length){const t=new Int32Array(e.lastClaimStack.length*2);t.set(e.lastClaimStack),e.lastClaimStack=t}for(let t=Math.min(e.lastClaimStackSize,e.lastClaimStack.length-2);t>=0;t--)e.lastClaimStack[t+1]=e.lastClaimStack[t];e.lastClaimStack[0]=n,e.lastClaimStackSize++}function St(e,n,t){return n*e+t}function It(e,n){const t=Math.floor(n/e),o=n%e;return{slot:t,cellIndex:o}}function kt(e,n,t){const o=Math.max(1,Math.min(50,Number(e.fixedRoundsTotal??1))),i=Math.max(1,Number(e.domain.fretCount)||1),r=Math.min(i-1,Number(e.domain.maxFret)||0),l=Math.max(0,Math.min(r,Number(e.domain.minFret)||0)),a={...e,matchType:Je.BLACKOUT,fixedRoundsTotal:o,domain:{...e.domain,fretCount:i,minFret:l,maxFret:r}},d=6*i,f=[new Int16Array(d),new Int16Array(d),new Int16Array(d)];f[0].fill(-1),f[1].fill(-1),f[2].fill(-1);const s=[new Uint8Array(d),new Uint8Array(d),new Uint8Array(d)],p=[new Uint8Array(d),new Uint8Array(d),new Uint8Array(d)],m=[new Uint8Array(d),new Uint8Array(d),new Uint8Array(d)],v=new Uint8Array(d),b=new Uint8Array(d);for(let C=0;C<6;C++)for(let I=0;I<i;I++){const x=J(C,I,i);v[x]=an(C,I);const w=I>=a.domain.minFret&&I<=a.domain.maxFret,P=a.domain.enabledStrings[C]===!0;b[x]=w&&P?1:0}const h=En(a),g=new Int16Array(36),E=new Int16Array(36);let T=0;for(let C=0;C<d;C++){if(b[C]===0)continue;const I=v[C];for(let x=0;x<=2;x++){const w=I*3+x;h[w]===1&&j(I,x)&&(T++,g[w]++,E[w]++)}}const S=n.map(Et);return{settings:a,phase:"IN_MATCH",bonus:{active:!1,playerIndex:0,nextPlayerIndex:0,reason:"end_turn"},players:S,currentPlayer:0,roundIndex:1,lastChance:{active:!1,order:new Int16Array(0),pos:0},turnCounter:0,cellCount:d,fretCount:i,board:{owner:f,connectClaimed:s,vulnerable:p,claimedThisTurn:m},cellPitchClass:v,domainCellEnabled:b,variants:{allowed:h,requiredByVariant:g,requiredTotal:T,claimedRequired:0,unclaimedByVariant:E},turn:{correctCount:0,wrongCount:0,tries:0,streakCount:0,streakTier:0,breakBonusTier:0},prompt:{variantId:0},rngSeed:t|0}}function qn(e,n,t){return xt(e,n,t)}function xt(e,n,t){var a;const o=Me(n);if(!j(o.pitchClass,o.spelling)||e.variants.allowed[n]!==1)return!1;const i=((a=e.players[t])==null?void 0:a.profile.id)??t,r=(d,f)=>{var s;return(((s=d.players[f])==null?void 0:s.tokenCount)??0)>0};if(e.variants.unclaimedByVariant[n]>0)return!0;const l=e.settings.steal.globalStealOnExhausted&&e.variants.unclaimedByVariant[n]===0;if(!r(e,t))return!1;for(let d=0;d<e.cellPitchClass.length;d++){if(e.domainCellEnabled[d]===0||e.cellPitchClass[d]!==o.pitchClass)continue;const f=e.board.owner[o.spelling][d];if(f===-1||f===i)continue;if(e.board.vulnerable[o.spelling][d]||l)return!0}return!1}function Ke(e,n,t=!1){const o=[];for(let r=0;r<36;r++)qn(e,r,n)&&o.push(r);if(o.length===0)return{state:e,variantId:null};const i=Ct(e.rngSeed,o.length);return e.rngSeed=i.seed,{state:e,variantId:o[i.value]}}function Ln(e,n){for(let t=0;t<36;t++)if(qn(e,t,n))return!0;return!1}function Kn(e,n,t){if(!e.settings.feedback.samEnabled)return null;const o=e.players[t],i=o.profile.id,r=Me(n),l=r.pitchClass,a=r.spelling,d=e.board.owner[a],f=e.board.vulnerable[a];for(let s=0;s<e.cellCount;s++)if(e.domainCellEnabled[s]!==0&&e.cellPitchClass[s]===l&&j(l,a)&&d[s]===-1)return{cellIndex:s,slot:a,variantId:n};if(o.tokenCount>0){for(let m=0;m<e.cellCount;m++){if(e.domainCellEnabled[m]===0||e.cellPitchClass[m]!==l||!j(l,a))continue;const v=d[m];if(!(v===-1||v===i)&&f[m]===1)return{cellIndex:m,slot:a,variantId:n}}const s=ie(l,a);if(e.variants.unclaimedByVariant[s]===0&&e.settings.steal.globalStealOnExhausted)for(let m=0;m<e.cellCount;m++){if(e.domainCellEnabled[m]===0||e.cellPitchClass[m]!==l||!j(l,a))continue;const v=d[m];if(!(v===-1||v===i))return{cellIndex:m,slot:a,variantId:n}}}return null}function wt(e,n,t){if(!e.settings.feedback.samEnabled)return[];const o=e.players[t],i=o.profile.id,r=Me(n),l=r.pitchClass,a=r.spelling,d=e.board.owner[a],f=e.board.vulnerable[a],s=[];for(let p=0;p<e.cellCount;p++)e.domainCellEnabled[p]!==0&&e.cellPitchClass[p]===l&&j(l,a)&&d[p]===-1&&s.push({cellIndex:p,slot:a,variantId:n});if(s.length)return s;if(o.tokenCount>0){for(let v=0;v<e.cellCount;v++){if(e.domainCellEnabled[v]===0||e.cellPitchClass[v]!==l||!j(l,a))continue;const b=d[v];b===-1||b===i||f[v]===1&&s.push({cellIndex:v,slot:a,variantId:n})}if(s.length)return s;const p=ie(l,a);if(e.variants.unclaimedByVariant[p]===0&&e.settings.steal.globalStealOnExhausted)for(let v=0;v<e.cellCount;v++){if(e.domainCellEnabled[v]===0||e.cellPitchClass[v]!==l||!j(l,a))continue;const b=d[v];b===-1||b===i||s.push({cellIndex:v,slot:a,variantId:n})}}return s}function Mt(e){Te(e.board.claimedThisTurn[0],0),Te(e.board.claimedThisTurn[1],0),Te(e.board.claimedThisTurn[2],0)}function Tn(e){return e.variants.claimedRequired>=e.variants.requiredTotal}function At(e){for(let t=0;t<=2;t++)e.board.owner[t].fill(-1),Te(e.board.connectClaimed[t],0),Te(e.board.vulnerable[t],0),Te(e.board.claimedThisTurn[t],0);for(const t of e.players)t.lastClaimStackSize=0,t.turnsWithoutScore=0;e.variants.claimedRequired=0;for(let t=0;t<36;t++)e.variants.requiredByVariant[t]=0,e.variants.unclaimedByVariant[t]=0;let n=0;for(let t=0;t<e.cellCount;t++){if(e.domainCellEnabled[t]===0)continue;const o=e.cellPitchClass[t];for(let i=0;i<=2;i++){if(!j(o,i))continue;const r=ie(o,i);e.variants.allowed[r]!==0&&(e.variants.requiredByVariant[r]+=1,e.variants.unclaimedByVariant[r]+=1,n+=1)}}e.variants.requiredTotal=n}function Ze(e){e.turn.breakBonusTier=0}function sn(e){return Math.max(e.turn.streakTier,e.turn.breakBonusTier)}function Lt(e,n,t){const o=e.settings.steal.tokenCap,i=e.players[n];i.tokenCount=Math.min(o,i.tokenCount+t)}function Bt(e,n){if(e.turn.correctCount<=0)return;const t=e.players[n].profile.id;for(let o=0;o<=2;o++){const i=e.board.owner[o],r=e.board.vulnerable[o];for(let l=0;l<e.cellCount;l++)r[l]===1&&i[l]===t&&(r[l]=0)}}function Pt(e,n){const t=e.players[n];for(let o=0;o<t.lastClaimStackSize;o++){const i=t.lastClaimStack[o],{slot:r,cellIndex:l}=It(e.cellCount,i),a=e.board.owner[r],d=e.board.vulnerable[r];if(a[l]===t.profile.id&&d[l]!==1){d[l]=1;return}}}function Nt(e,n){const t=e.players[n];e.turn.correctCount<=0?(t.turnsWithoutScore++,t.turnsWithoutScore>=3&&Pt(e,n)):t.turnsWithoutScore=0}function Rt(e,n,t,o){const i=e.players[n],r=e.board.owner[t];r[o]=i.profile.id,e.board.claimedThisTurn[t][o]=1;const l=e.cellPitchClass[o],a=ie(l,t);e.variants.unclaimedByVariant[a]>0&&(e.variants.unclaimedByVariant[a]--,e.variants.claimedRequired++),Tt(i,St(e.cellCount,t,o)),e.turn.correctCount++,e.turn.tries++,e.turn.streakCount++,e.turn.streakTier=Un(e.turn.streakCount);const d=sn(e);i.score+=1*Hn[d];const f=[],s=Gn(e.turn.streakCount);return s&&(f.push({type:"STREAK_CALLOUT",playerId:i.profile.id,message:s}),e.turn.streakCount===20&&f.push({type:"FIRE_MODE",playerId:i.profile.id,enabled:!0})),f}function Se(e,n){return e.turn.wrongCount++,e.turn.tries++,e.turn.streakCount=0,e.turn.streakTier=0,Ze(e),[{type:"FIRE_MODE",playerId:n,enabled:!1}]}function $t(e,n){return e.turn.wrongCount++,e.turn.tries++,e.turn.streakCount=0,e.turn.streakTier=0,Ze(e),[{type:"FIRE_MODE",playerId:n,enabled:!1}]}function Ft(e,n,t,o){const i=[],r=e.players[n];if(!Vn(e,t,o))return{ended:!1,effects:i};const l=J(t,o,e.fretCount),a=e.prompt.variantId,d=Me(a),f=d.spelling,s=e.cellPitchClass[l];if(!j(s,f))return i.push(...Se(e,r.profile.id)),{ended:!0,effects:i,endVariantId:a};if(s!==d.pitchClass)return i.push(...Se(e,r.profile.id)),{ended:!0,effects:i,endVariantId:a};if(e.board.owner[f][l]!==-1)return i.push(...Se(e,r.profile.id)),{ended:!0,effects:i,endVariantId:a};i.push(...Rt(e,n,f,l));const p=Tn(e),m=Ke(e,n,p);return e=m.state,m.variantId===null?{ended:!0,effects:i}:(e.prompt.variantId=m.variantId,i.push({type:"PROMPT_CHANGED",variantId:e.prompt.variantId}),{ended:!1,effects:i})}function Dt(e,n,t,o){const i=e.players[n];if(i.tokenCount<=0)return!1;const l=e.board.owner[t][o];if(l===-1||l===i.profile.id)return!1;const a=e.cellPitchClass[o];if(!j(a,t))return!1;if(e.board.vulnerable[t][o]===1)return!0;if(!e.settings.steal.globalStealOnExhausted)return!1;const d=ie(a,t);return e.variants.unclaimedByVariant[d]===0}function _t(e,n,t,o){const i=[],r=e.players[n],l=e.lastChance.active;if(!Vn(e,t,o))return{ended:!1,effects:i};const a=J(t,o,e.fretCount),d=e.prompt.variantId,f=Me(d),s=f.spelling;if(r.tokenCount<=0)return l?{ended:!0,effects:i}:(i.push(...Se(e,r.profile.id)),{ended:!0,effects:i,endVariantId:d});const p=()=>l?$t(e,r.profile.id):Se(e,r.profile.id);if(Dt(e,n,s,a))if(e.cellPitchClass[a]!==f.pitchClass){if(r.tokenCount--,i.push(...p()),!l)return{ended:!0,effects:i,endVariantId:d}}else{r.tokenCount--;const h=e.board.owner[s][a],g=e.board.connectClaimed[s][a];if(g!==0&&h!==-1){const S=sn(e);S===0?e.turn.breakBonusTier=1:S<4?e.turn.breakBonusTier=S+1:r.score+=e.settings.steal.breakConnectMaxTierBonus,zn(e,s,a,h,g)}e.board.owner[s][a]=r.profile.id,e.board.vulnerable[s][a]=0,e.board.claimedThisTurn[s][a]=1,e.board.connectClaimed[s][a]=0,e.turn.correctCount++,e.turn.tries++,e.turn.streakCount++,e.turn.streakTier=Un(e.turn.streakCount);const E=sn(e);r.score+=1*Hn[E];const T=Gn(e.turn.streakCount);T&&(i.push({type:"STREAK_CALLOUT",playerId:r.profile.id,message:T}),e.turn.streakCount===20&&i.push({type:"FIRE_MODE",playerId:r.profile.id,enabled:!0}))}else if(r.tokenCount--,i.push(...p()),!l)return{ended:!0,effects:i,endVariantId:d};if(l&&r.tokenCount<=0)return{ended:!0,effects:i};const m=l||Tn(e),v=Ke(e,n,m);return e=v.state,v.variantId===null?{ended:!0,effects:i}:(e.prompt.variantId=v.variantId,i.push({type:"PROMPT_CHANGED",variantId:e.prompt.variantId}),{ended:!1,effects:i})}function jn(e,n){return Math.floor(e/n)}function Wn(e,n){return e%n}function zn(e,n,t,o,i){const r=e.board.owner[n],l=e.board.connectClaimed[n],a=jn(t,e.fretCount),d=Wn(t,e.fretCount),f=[{bit:1,ds:0,df:1},{bit:2,ds:1,df:0},{bit:4,ds:1,df:1},{bit:8,ds:-1,df:1}];for(const s of f){if(!(i&s.bit))continue;let p=a,m=d;for(;;){const h=p-s.ds,g=m-s.df;if(h<0||h>=6||g<0||g>=e.fretCount)break;const E=J(h,g,e.fretCount);if(e.domainCellEnabled[E]===0||r[E]!==o)break;p=h,m=g}let v=p,b=m;for(;v>=0&&v<6&&b>=0&&b<e.fretCount;){const h=J(v,b,e.fretCount);if(e.domainCellEnabled[h]===0||r[h]!==o)break;l[h]=l[h]&~s.bit,v+=s.ds,b+=s.df}}}function Ot(e,n){const o=e.players[n].profile.id;let i=0,r=0;const l=[[0,1],[1,0],[1,1],[-1,1]],a=new Set;for(let d=0;d<=2;d++){const f=e.board.owner[d],s=e.board.claimedThisTurn[d],p=e.board.connectClaimed[d];for(let m=0;m<e.cellCount;m++)if(s[m]===1&&f[m]===o&&e.domainCellEnabled[m]!==0)for(const[v,b]of l){const h=v===0&&b===1?1:v===1&&b===0?2:v===1&&b===1?4:8,g=(k,A,L)=>[k+v*L,A+b*L];let E=jn(m,e.fretCount),T=Wn(m,e.fretCount);for(;;){const[k,A]=g(E,T,-1);if(k<0||k>=6||A<0||A>=e.fretCount)break;const L=J(k,A,e.fretCount);if(e.domainCellEnabled[L]===0||f[L]!==o)break;E=k,T=A}const S=J(E,T,e.fretCount),C=`${d}:${S}:${v}:${b}`;if(a.has(C))continue;a.add(C);const I=[];let x=E,w=T;for(;x>=0&&x<6&&w>=0&&w<e.fretCount;){const k=J(x,w,e.fretCount);if(e.domainCellEnabled[k]===0||f[k]!==o)break;I.push(k);const A=g(x,w,1);x=A[0],w=A[1]}if(I.length<4)continue;let P=0;for(const k of I)p[k]&h&&P++;const R=P<4;R&&(r+=1),R&&(i+=25);const q=Math.max(4,P);I.length>q&&(i+=2*(I.length-q));for(const k of I)p[k]=p[k]|h}}return{connectScore:i,tokensEarned:r}}function Ht(e,n){var o,i;const t=[];switch(n.type){case"INIT_MATCH":{const r=kt(n.settings,n.players,n.seed),l=Ke(r,0,!1);let a=l.variantId;if(a===null){let d=null;for(let f=0;f<36;f++)if(l.state.variants.allowed[f]===1){d=f;break}a=d??0}return l.state.prompt.variantId=a,t.push({type:"PROMPT_CHANGED",variantId:a}),{state:l.state,effects:t}}case"DEV_SET_CURRENT_PLAYER":{if(!e)throw new Error("State required");const r=e.players.length,l=Math.max(0,Math.min(r-1,n.playerIndex));return e.currentPlayer=l,{state:e,effects:t}}case"DEV_FORCE_PHASE":{if(!e)throw new Error("State required");if(e.phase=n.phase,n.phase==="LAST_CHANCE"&&(e.lastChance.active=!0),n.phase!=="LAST_CHANCE"&&(e.lastChance.active=!1),n.phase==="BONUS"){const r=e.players.length>0?(e.currentPlayer+1)%e.players.length:0;e.bonus={active:!0,playerIndex:e.currentPlayer,nextPlayerIndex:r,reason:"dev_force"}}else e.bonus.active=!1;return{state:e,effects:t}}case"END_BONUS":{if(!e)throw new Error("State required");if(e.phase!=="BONUS")return{state:e,effects:t};const r=e.bonus.active?e.bonus.playerIndex:e.currentPlayer,l=((o=e.players[r])==null?void 0:o.profile.id)??0;if(e.settings.playType===F.MULTI&&e.players.length>1){const a=e.bonus.active?e.bonus.nextPlayerIndex:(r+1)%e.players.length;return e.currentPlayer=a,e.phase="INTERMISSION",e.bonus.active=!1,t.push({type:"TURN_ENDED",playerId:l,nextPlayerId:e.players[a].profile.id}),{state:e,effects:t}}return e.phase=e.lastChance.active?"LAST_CHANCE":"IN_MATCH",e.bonus.active=!1,t.push({type:"TURN_ENDED",playerId:l}),{state:e,effects:t}}case"DEV_SET_PAINT":{if(!e)throw new Error("State required");const r=e.settings.dev??{enabled:!1,paintPlayerIndex:0,paintLane:"prompt",paintMode:"paint"};return e.settings.dev={...r,...n.patch},{state:e,effects:t}}case"DEV_CLEAR_BOARD":{if(!e)throw new Error("State required");for(let r=0;r<=2;r++)e.board.owner[r].fill(-1),e.board.vulnerable[r].fill(0),e.board.claimedThisTurn[r].fill(0),e.board.connectClaimed[r].fill(0);for(const r of e.players)r.lastClaimStackSize=0,r.turnsWithoutScore=0;e.variants.claimedRequired=0;for(let r=0;r<36;r++)e.variants.unclaimedByVariant[r]=e.variants.requiredByVariant[r];return{state:e,effects:t}}case"DEV_END_TURN":{if(!e)throw new Error("State required");return e.phase!=="IN_MATCH"&&e.phase!=="LAST_CHANCE"?{state:e,effects:t}:(ve(e,t,void 0),{state:e,effects:t})}case"DEV_PLACE":{if(!e)throw new Error("State required");const{stringIndex:r,fretIndex:l,lane:a,set:d}=n;if(r<0||r>=6||l<0||l>=e.fretCount)return{state:e,effects:t};const f=J(r,l,e.fretCount);if(e.domainCellEnabled[f]===0)return{state:e,effects:t};const s=e.board.owner[a],p=s[f],m=e.board.connectClaimed[a][f];p!==-1&&m!==0&&(d===0||n.ownerPlayerIndex<0||((i=e.players[n.ownerPlayerIndex])==null?void 0:i.profile.id)!==p)&&zn(e,a,f,p,m);const v=d===1&&n.ownerPlayerIndex>=0&&n.ownerPlayerIndex<e.players.length?e.players[n.ownerPlayerIndex].profile.id:-1,b=e.cellPitchClass[f],h=ie(b,a),g=e.variants.allowed[h]===1&&j(b,a);if(d===1){if(v===-1)return{state:e,effects:t};if(p===v)return{state:e,effects:t};g&&p===-1&&(e.variants.unclaimedByVariant[h]=Math.max(0,e.variants.unclaimedByVariant[h]-1),e.variants.claimedRequired+=1),s[f]=v,e.board.vulnerable[a][f]=0,e.board.claimedThisTurn[a][f]=1,e.board.connectClaimed[a][f]=0}else{if(p===-1)return{state:e,effects:t};g&&(e.variants.unclaimedByVariant[h]=Math.min(e.variants.requiredByVariant[h],e.variants.unclaimedByVariant[h]+1),e.variants.claimedRequired=Math.max(0,e.variants.claimedRequired-1)),s[f]=-1,e.board.vulnerable[a][f]=0,e.board.claimedThisTurn[a][f]=0,e.board.connectClaimed[a][f]=0}return{state:e,effects:t}}case"UPDATE_SETTINGS":{if(!e)throw new Error("State required");return e.settings=n.settings,{state:e,effects:t}}case"START_TURN":{if(!e)throw new Error("State required");if(e.phase==="RESULTS")return{state:e,effects:t};if(e.phase==="BONUS")return{state:e,effects:t};e.phase=e.lastChance.active?"LAST_CHANCE":"IN_MATCH",e.turnCounter+=1,Mt(e),e.turn.correctCount=0,e.turn.wrongCount=0,e.turn.tries=0,e.turn.streakCount=0,e.turn.streakTier=0,e.turn.breakBonusTier=0;const r=e.lastChance.active,l=Ke(e,e.currentPlayer,r);return e=l.state,l.variantId===null?(ve(e,t),{state:e,effects:t}):(e.prompt.variantId=l.variantId,t.push({type:"PROMPT_CHANGED",variantId:e.prompt.variantId}),{state:e,effects:t})}case"TAP_CELL":{if(!e)throw new Error("State required");if(e.settings.modeId!==M.FRETBOARD&&e.settings.modeId!==M.TAB)return{state:e,effects:t};if(e.phase!=="IN_MATCH")return{state:e,effects:t};if(e.lastChance.active)return{state:e,effects:t};const r=Ft(e,e.currentPlayer,n.stringIndex,n.fretIndex);return t.push(...r.effects),r.ended&&ve(e,t,r.endVariantId),{state:e,effects:t}}case"STEAL_CELL":{if(!e)throw new Error("State required");if(e.settings.modeId!==M.FRETBOARD&&e.settings.modeId!==M.TAB)return{state:e,effects:t};if(e.phase!=="IN_MATCH"&&e.phase!=="LAST_CHANCE")return{state:e,effects:t};const r=_t(e,e.currentPlayer,n.stringIndex,n.fretIndex);return t.push(...r.effects),r.ended&&ve(e,t,r.endVariantId),{state:e,effects:t}}case"TIMEOUT":{if(!e)throw new Error("State required");if(e.phase!=="IN_MATCH"&&e.phase!=="LAST_CHANCE")return{state:e,effects:t};const r=e.prompt.variantId,l=e.players[e.currentPlayer].profile.id;return t.push(...Se(e,l)),ve(e,t,r),{state:e,effects:t}}case"USE_HINT":{if(!e)throw new Error("State required");if(e.settings.difficulty!==B.EASY&&e.settings.difficulty!==B.LEARNING)return{state:e,effects:t};if(e.phase!=="IN_MATCH")return{state:e,effects:t};if(e.lastChance.active)return{state:e,effects:t};const r=e.currentPlayer,l=e.players[r].profile.id,a=e.prompt.variantId,d=e.players[r].score;e.players[r].score=Math.max(0,d-yt),e.turn.tries+=1,e.turn.streakCount=0,e.turn.streakTier=0,Ze(e),t.push({type:"FIRE_MODE",playerId:l,enabled:!1}),ve(e,t,void 0);const s=e.players[r].score-d,p=Kn(e,a,r);return t.push({type:"FEEDBACK_PULSE",playerId:l,variantId:a,durationMs:Math.max(1200,e.settings.feedback.samDurationMs),ghost:p,scoreDelta:s,includeLabel:!0}),{state:e,effects:t}}case"END_MATCH":{if(!e)throw new Error("State required");return e.phase="RESULTS",{state:e,effects:t}}}}function ve(e,n,t){var h,g,E;const o=e.currentPlayer,i=e.players[o].profile.id,r=e.players[o].score,{connectScore:l,tokensEarned:a}=Ot(e,o);l>0&&(e.players[o].score+=l);const d=e.lastChance.active?0:a;d>0&&Lt(e,o,d),Nt(e,o),Bt(e,o);const f=Tn(e),s=Math.max(1,e.settings.fixedRoundsTotal||1);let p=!1,m=!1;if(!e.lastChance.active&&f)if(e.roundIndex<s)n.push({type:"ROUND_COMPLETE",completedRound:e.roundIndex,totalRounds:s}),e.roundIndex+=1,At(e);else{const T=e.settings.playType===F.MULTI&&e.players.length>1,S=e.players.some(C=>C.tokenCount>0);if(T&&S){const C=(o+1)%e.players.length,I=[];for(let x=0;x<e.players.length;x++){const w=(C+x)%e.players.length;e.players[w].tokenCount>0&&Ln(e,w)&&I.push(w)}I.length===0?(e.phase="RESULTS",m=!0,n.push({type:"MATCH_COMPLETE",roundsCompleted:e.roundIndex,totalRounds:s})):(e.lastChance.active=!0,e.lastChance.order=Int16Array.from(I),e.lastChance.pos=0,e.currentPlayer=I[0],p=!0,n.push({type:"LAST_CHANCE_STARTED",totalRounds:s}))}else e.phase="RESULTS",m=!0,n.push({type:"MATCH_COMPLETE",roundsCompleted:e.roundIndex,totalRounds:s})}if(Ut(e,n,o,i,t,r),Ze(e),m)return;if(!!((h=e.settings.dev)!=null&&h.enabled)&&!!((g=e.settings.dev)!=null&&g.forceBonusOnTurnEnd)&&e.settings.playType===F.MULTI&&e.players.length>1&&!e.lastChance.active&&!f){const T=(o+1)%e.players.length;e.bonus={active:!0,playerIndex:o,nextPlayerIndex:T,reason:"dev_force"},e.phase="BONUS",n.push({type:"BONUS_STARTED",playerId:i,reason:"dev_force"});return}if(e.settings.playType===F.MULTI){if(e.lastChance.active){if(!p){let T=e.lastChance.pos+1;for(;T<e.lastChance.order.length;){const S=e.lastChance.order[T];if((((E=e.players[S])==null?void 0:E.tokenCount)??0)>0&&Ln(e,S))break;T++}if(T>=e.lastChance.order.length){e.lastChance.active=!1,e.phase="RESULTS",n.push({type:"MATCH_COMPLETE",roundsCompleted:e.roundIndex,totalRounds:s});return}e.lastChance.pos=T,e.currentPlayer=e.lastChance.order[T]}e.phase="INTERMISSION",n.push({type:"TURN_ENDED",playerId:i,nextPlayerId:e.players[e.currentPlayer].profile.id});return}e.currentPlayer=(e.currentPlayer+1)%e.players.length,e.phase="INTERMISSION",n.push({type:"TURN_ENDED",playerId:i,nextPlayerId:e.players[e.currentPlayer].profile.id});return}e.phase=e.lastChance.active?"LAST_CHANCE":"IN_MATCH",n.push({type:"TURN_ENDED",playerId:i})}function Ut(e,n,t,o,i,r){if(!e.settings.feedback.samEnabled||i===void 0)return;const a=e.players[t].score-r,d=e.settings.feedback.samRevealMode==="all",f=d?wt(e,i,t):void 0,s=d?f&&f.length?f[0]:null:Kn(e,i,t);n.push({type:"FEEDBACK_PULSE",playerId:o,variantId:i,durationMs:e.settings.feedback.samDurationMs,ghost:s,ghosts:f,scoreDelta:a,includeLabel:e.settings.feedback.samIncludeLabel})}function Gt(e){const{dev:n,...t}=e,o=dt(t);return ut(o)}function Vt(e){return e.replace(/[\n\t\r]/g," ").split(/[ ,]+/).filter(Boolean).map(Number).filter(n=>Number.isFinite(n))}function qt(e){const n=e.match(/viewBox="([^"]+)"/);if(!n)throw new Error("SVG missing viewBox");const t=Vt(n[1]);if(t.length!==4)throw new Error("Invalid viewBox");return{x:t[0],y:t[1],w:t[2],h:t[3]}}function Kt(e){const n=e.match(/<polygon[^>]+id="Neck"[^>]+points="([\s\S]*?)"/);if(!n)throw new Error("SVG missing Neck polygon");const t=n[1].match(/([0-9.]+),([0-9.]+)/g)??[],o=[],i=[];for(const r of t){const[l,a]=r.split(",").map(Number);Number.isFinite(l)&&Number.isFinite(a)&&(o.push(l),i.push(a))}return{xMin:Math.min(...o),xMax:Math.max(...o),yMin:Math.min(...i),yMax:Math.max(...i)}}function jt(e,n=.01){const t=[...e].sort((i,r)=>i-r),o=[];for(const i of t){const r=o[o.length-1];!r||Math.abs(r[r.length-1]-i)>n?o.push([i]):r.push(i)}return o.map(i=>i.reduce((r,l)=>r+l,0)/i.length)}function Wt(e){const n=e.match(/<g id="Frets">([\s\S]*?)<\/g>/);if(!n)throw new Error("SVG missing Frets group");const t=[...n[1].matchAll(/x1="([0-9.]+)"/g)].map(o=>Number(o[1])).filter(Number.isFinite);return jt(t)}function zt(e){const n=e.match(/<g id="Strings">([\s\S]*?)<\/g>/);if(!n)throw new Error("SVG missing Strings group");return[...n[1].matchAll(/y1="([0-9.]+)"/g)].map(o=>Number(o[1])).filter(Number.isFinite).sort((o,i)=>o-i)}function Yt(e){const n=qt(e),t=Kt(e),o=Wt(e),i=t.xMin,r=o.length>=2?o[1]-o[0]:(t.xMax-t.xMin)/24,l=Math.max(n.x,i-r),a=[l,...o,t.xMax].sort((b,h)=>b-h),d={...t,xMin:l},f=zt(e);if(f.length!==6)throw new Error("Expected 6 strings from SVG");const s=[t.yMin];for(let b=0;b<f.length-1;b++)s.push((f[b]+f[b+1])/2);s.push(t.yMax);const p=Math.min(...a.slice(1).map((b,h)=>b-a[h])),m=Math.min(...s.slice(1).map((b,h)=>b-s[h])),v=Math.max(8,Math.min(p*.22,m*.33));return{viewBox:n,neck:d,fretBoundaries:a,stringCenters:f,stringBands:s,dotRadius:v}}function Ve(e,n,t){const o=e.fretBoundaries[t],i=e.fretBoundaries[t+1];return{cx:(o+i)/2,cy:e.stringCenters[n]}}function Xt(e,n,t){if(n<e.neck.xMin||n>e.neck.xMax||t<e.neck.yMin||t>e.neck.yMax)return null;let o=-1;for(let r=0;r<e.fretBoundaries.length-1;r++)if(n>=e.fretBoundaries[r]&&n<e.fretBoundaries[r+1]){o=r;break}if(o<0)return null;let i=-1;for(let r=0;r<e.stringBands.length-1;r++)if(t>=e.stringBands[r]&&t<e.stringBands[r+1]){i=r;break}return i<0||i>5?null:{stringIndex:i,fretIndex:o}}async function Jt(e,n){const t=await fetch("/fretboard.svg").then(i=>i.text());return{layout:Yt(t),svgRoot:e,dispatch:n}}function Zt(e,n,t){const o=e.createSVGPoint();o.x=n,o.y=t;const i=e.getScreenCTM();if(!i)return{x:0,y:0};const r=i.inverse(),l=o.matrixTransform(r);return{x:l.x,y:l.y}}function Qt(e){return e.prompt.variantId%3}function er(e,n,t,o,i){const r=Ve(e,n,t),l=o-r.cx,a=i-r.cy;return l*l+a*a<=e.dotRadius*e.dotRadius}function nr(e,n,t){const o=i=>{var h,g;i.preventDefault(),t.setPointerCapture(i.pointerId);const r=n();if(!r)return;const l=Zt(e.svgRoot,i.clientX,i.clientY),a=Xt(e.layout,l.x,l.y);if(!a)return;const{stringIndex:d,fretIndex:f}=a,s=Qt(r);if((h=r.settings.dev)!=null&&h.enabled){const E=r.settings.dev,T=E.paintMode==="erase"||i.shiftKey?0:1;let S=s;E.paintLane==="nat"?S=0:E.paintLane==="shr"?S=1:E.paintLane==="flt"&&(S=2);const C=Math.max(0,Math.min(r.players.length-1,E.paintPlayerIndex|0));e.dispatch({type:"DEV_PLACE",stringIndex:d,fretIndex:f,lane:S,ownerPlayerIndex:C,set:T});return}const p=d*r.fretCount+f,m=r.board.owner[s][p],v=((g=r.players[r.currentPlayer])==null?void 0:g.profile.id)??-1,b=er(e.layout,d,f,l.x,l.y);if(!(m===v&&b)){if(m!==-1&&m!==v&&b){e.dispatch({type:"STEAL_CELL",stringIndex:d,fretIndex:f});return}e.dispatch({type:"TAP_CELL",stringIndex:d,fretIndex:f})}};t.addEventListener("pointerdown",o,{passive:!1})}const ee=["#38bdf8","#a78bfa","#34d399","#fb7185","#fbbf24","#60a5fa","#f472b6","#4ade80","#f97316","#22c55e","#e879f9","#93c5fd","#fda4af","#c084fc","#fde047","#2dd4bf"],be=["●","▲","■","◆","✚","✖","★","⬢","⬣","⬟","◐","◑","◒","◓","◍","⬤"];function $(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function V(e,n){for(const[t,o]of Object.entries(n))e.setAttribute(t,o)}function He(e,n,t,o){const i=o==="left"?"0":"1";return`M ${e} ${n-t} A ${t} ${t} 0 0 ${i} ${e} ${n+t} L ${e} ${n-t} Z`}function Bn(e){const n=$("text");return V(n,{x:String(e.x),y:String(e.y),"text-anchor":"middle","dominant-baseline":"middle","font-size":String(Math.max(10,e.r*(e.emphasize?.72:.64))),fill:`rgba(0,0,0,${e.alpha})`,stroke:`rgba(255,255,255,${Math.min(.6,Math.max(0,e.alpha))})`,"stroke-width":String(Math.max(1,e.r*.12)),"paint-order":"stroke"}),n.textContent=e.text,n}function tr(e,n,t,o){const i=$("g"),r=$("g"),l=$("g");r.setAttribute("pointer-events","none"),l.setAttribute("pointer-events","none");const a=n.dotRadius,d=t.settings.accessibility.colorBlindMode;for(let b=0;b<6;b++)for(let h=0;h<t.fretCount;h++){const g=b*t.fretCount+h;if(t.domainCellEnabled[g]===0)continue;const E=an(b,h),T=G[E],{cx:S,cy:C}=Ve(n,b,h),I=t.board.owner[y.NAT][g],x=t.board.owner[y.SHR][g],w=t.board.owner[y.FLT][g],P=t.board.vulnerable[y.NAT][g]===1,R=t.board.vulnerable[y.SHR][g]===1,q=t.board.vulnerable[y.FLT][g]===1;if(!T&&I!==-1){const k=ee[I%ee.length],A=$("circle");if(V(A,{cx:String(S),cy:String(C),r:String(a),fill:k,opacity:"0.92"}),P&&A.classList.add("vulnerable"),i.appendChild(A),d){const L=$("text");V(L,{x:String(S),y:String(C+a*.35),"text-anchor":"middle","font-size":String(a*1.05),fill:"rgba(0,0,0,0.75)"}),L.textContent=be[I%be.length],i.appendChild(L)}continue}if(T){if(x!==-1){const k=ee[x%ee.length],A=$("path");if(V(A,{d:He(S,C,a,"left"),fill:k,opacity:"0.92"}),R&&A.classList.add("vulnerable"),i.appendChild(A),d){const L=$("text");V(L,{x:String(S-a*.35),y:String(C+a*.35),"text-anchor":"middle","font-size":String(a*.95),fill:"rgba(0,0,0,0.75)"}),L.textContent=be[x%be.length],i.appendChild(L)}}if(w!==-1){const k=ee[w%ee.length],A=$("path");if(V(A,{d:He(S,C,a,"right"),fill:k,opacity:"0.92"}),q&&A.classList.add("vulnerable"),i.appendChild(A),d){const L=$("text");V(L,{x:String(S+a*.35),y:String(C+a*.35),"text-anchor":"middle","font-size":String(a*.95),fill:"rgba(0,0,0,0.75)"}),L.textContent=be[w%be.length],i.appendChild(L)}}if(x!==-1&&x===w){const k=ee[x%ee.length],A=$("circle");V(A,{cx:String(S),cy:String(C),r:String(a+2),fill:"none",stroke:k,"stroke-width":"3"}),i.appendChild(A);const L=$("circle");V(L,{cx:String(S),cy:String(C),r:String(a-2),fill:"none",stroke:k,"stroke-width":"2"}),i.appendChild(L)}}}const f=t.settings.difficulty,s=f===B.LEARNING,p=f===B.EASY;if(s||p)for(let b=0;b<6;b++)for(let h=0;h<t.fretCount;h++){const g=b*t.fretCount+h,E=an(b,h),T=G[E],{cx:S,cy:C}=Ve(n,b,h),x=t.domainCellEnabled[g]===1?s?.7:.92:s?.22:0;if(!(x<=0))if(T)for(const w of[y.SHR,y.FLT]){const P=ie(E,w);if(t.variants.allowed[P]!==1)continue;const R=t.board.owner[w][g]!==-1;if(!s&&!R)continue;const q=w===y.SHR?S-a*.35:S+a*.35,k=Bn({x:q,y:C+a*.2,r:a,text:H(P),alpha:x,emphasize:R&&!s});(s?l:r).appendChild(k)}else{const w=ie(E,y.NAT);if(t.variants.allowed[w]!==1)continue;const P=t.board.owner[y.NAT][g]!==-1;if(!s&&!P)continue;const R=Bn({x:S,y:C+a*.2,r:a,text:H(w),alpha:x,emphasize:P&&!s});(s?l:r).appendChild(R)}}let m=null;if(o){m=$("g"),m.classList.add("pulseOverlay");const b=$("text");V(b,{x:String(n.neck.xMin+14),y:String(n.neck.yMin+26),"font-size":"18",fill:"white"});const h=o.scoreDelta,g=h>=0?"Correct":"Hint",E=h>=0?"+":"-";b.textContent=`${g}: ${H(o.variantId)}  (${E}${Math.abs(h)})`,m.appendChild(b);const T=o.ghosts??(o.ghost?[o.ghost]:[]);if(T.length){const S=T.length>10?.55:.9;for(const C of T){const I=C.cellIndex,x=Math.floor(I/t.fretCount),w=I%t.fretCount,{cx:P,cy:R}=Ve(n,x,w),q=$("circle");if(V(q,{cx:String(P),cy:String(R),r:String(a+4),fill:"none",stroke:"white","stroke-width":"3",opacity:String(S)}),m.appendChild(q),C.slot===y.SHR){const k=$("path");V(k,{d:He(P,R,a,"left"),fill:"rgba(255,255,255,0.65)"}),m.appendChild(k)}else if(C.slot===y.FLT){const k=$("path");V(k,{d:He(P,R,a,"right"),fill:"rgba(255,255,255,0.65)"}),m.appendChild(k)}else{const k=$("circle");V(k,{cx:String(P),cy:String(R),r:String(a),fill:"rgba(255,255,255,0.65)"}),m.appendChild(k)}}}}const v=[i];p&&v.push(r),s&&v.push(l),m&&v.push(m),e.replaceChildren(...v)}const Yn="gedu.settings.v1";function Xn(e){const n=Gt(e);return`gedu.lb.v1.${e.modeId}.${e.playType}.${n}`}function X(e){localStorage.setItem(Yn,JSON.stringify(e))}function rr(){const e=localStorage.getItem(Yn);if(!e)return null;try{return JSON.parse(e)}catch{return null}}function Pn(e,n,t,o){const i=Xn(e),r=localStorage.getItem(i),l=r?JSON.parse(r):[];l.push({name:n,score:t,durationMs:o,atIso:new Date().toISOString()}),l.sort((d,f)=>{if(f.score!==d.score)return f.score-d.score;const s=d.durationMs,p=f.durationMs;return typeof s=="number"&&typeof p=="number"?s-p:typeof s=="number"&&typeof p!="number"?-1:typeof s!="number"&&typeof p=="number"?1:0});const a=l.slice(0,50);localStorage.setItem(i,JSON.stringify(a))}function ir(e){const n=Xn(e),t=localStorage.getItem(n);if(!t)return[];try{return JSON.parse(t)}catch{return[]}}const Jn=25,Be=12,or=Array.from({length:Jn},(e,n)=>n-Be),lr=Array.from({length:Jn},(e,n)=>n);function ar(e,n){const t=(n-e+12)%12,o=(e-n+12)%12;return t<o?+t:o<t?-o:+t}function Pe(e){return Math.floor(e/3)}function Nn(e){return e%3}function sr(e,n){return G[e]?e*3+n:e*3+y.NAT}function Zn(e){const n=En(e),t=1,o=n[t*3+y.SHR]===1,i=n[t*3+y.FLT]===1;return o&&!i?y.SHR:i&&!o?y.FLT:y.SHR}function Qn(e,n){const t=En(n),o=t[e*3+y.NAT]===1,i=t[e*3+y.SHR]===1,r=t[e*3+y.FLT]===1;return{allowed:o||i||r,allowedShr:i,allowedFlt:r,allowedNat:o}}function Ue(e,n){const t=Pe(e);return Zn(n),or.map((o,i)=>{const r=(t+o+1200)%12,l=Qn(r,n),a=i===Be;let d="";if(!G[r])d=H(r*3+y.NAT);else if(l.allowedShr&&!l.allowedFlt)d=H(r*3+y.SHR);else if(l.allowedFlt&&!l.allowedShr)d=H(r*3+y.FLT);else{const p=H(r*3+y.SHR),m=H(r*3+y.FLT);d=`<span class="railSplit"><span class="railSplitSharp">${p}</span><span class="railSplitFlat">${m}</span></span>`}const f=["railCell",l.allowed?"allowed":"blocked",G[r]?"black":"white",a?"center":""].filter(Boolean).join(" "),s=G[r]&&l.allowed&&l.allowedShr!==l.allowedFlt?`<div class="halfBlock ${l.allowedShr?"fltOff":"shrOff"}"></div>`:"";return`<div class="${f}" data-idx="${i}">${s}<div class="railLabel">${d}</div></div>`}).join("")}function cr(e,n){const t=Pe(e);return Zn(n),lr.map((o,i)=>{const r=(t+o+1200)%12,l=Qn(r,n);let a="";const d=i===0||i===12||i===24;if(d)a=H(e);else if(!G[r])a=H(r*3+y.NAT);else if(l.allowedShr&&!l.allowedFlt)a=H(r*3+y.SHR);else if(l.allowedFlt&&!l.allowedShr)a=H(r*3+y.FLT);else{const p=H(r*3+y.SHR),m=H(r*3+y.FLT);a=`<span class="railSplit"><span class="railSplitSharp">${p}</span><span class="railSplitFlat">${m}</span></span>`}const f=["railCell",l.allowed?"allowed":"blocked",G[r]?"black":"white",d?"tonic":""].filter(Boolean).join(" "),s=G[r]&&l.allowed&&l.allowedShr!==l.allowedFlt?`<div class="halfBlock ${l.allowedShr?"fltOff":"shrOff"}"></div>`:"";return`<div class="${f}" data-idx="${i}">${s}<div class="railLabel">${a}</div></div>`}).join("")}function dr(){const e=document.createElement("div");e.className="rail",e.innerHTML=`
    <div class="railViewport">
      <div class="railTrack" id="railTrack"></div>
    </div>
  `;const n=e.querySelector("#railTrack");let t=null,o=null,i=null;return{el:e,setConfig:(l,a)=>{var T,S;i=l;const d=l.mode,f=d==="ROTATE_COMPASS"?l.currentVariantId:l.anchorVariantId,s=Pe(f),p=Nn(f);if(d==="FIXED_REFERENCE"){const C=l.anchorVariantId,I=Pe(C);n.style.transition="none",n.style.transform="translateX(0px)",n.innerHTML=cr(C,a),requestAnimationFrame(()=>{const P=(Pe(l.currentVariantId)-I+12)%12;n.querySelectorAll(".railCell").forEach(q=>q.classList.remove("target"));const R=n.querySelector(`.railCell[data-idx="${P}"]`);R==null||R.classList.add("target")}),t=I,o=Nn(C);return}if(t===null){n.style.transition="none",n.style.transform="translateX(0px)",n.innerHTML=Ue(l.currentVariantId,a),(T=n.querySelector(`.railCell[data-idx="${Be}"]`))==null||T.classList.add("target"),t=s,o=p;return}const m=ar(t,s);if(Math.abs(m)===0){n.style.transition="none",n.style.transform="translateX(0px)",n.innerHTML=Ue(l.currentVariantId,a),(S=n.querySelector(`.railCell[data-idx="${Be}"]`))==null||S.classList.add("target"),t=s,o=p;return}const b=sr(t,o??y.SHR);n.style.transition="none",n.style.transform="translateX(0px)",n.innerHTML=Ue(b,a);const h=n.querySelector('.railCell[data-idx="0"]'),g=(h==null?void 0:h.getBoundingClientRect().width)??34,E=-m*g;requestAnimationFrame(()=>{n.style.transition="transform 280ms ease-out",n.style.transform=`translateX(${E}px)`}),window.setTimeout(()=>{var C;i&&(n.style.transition="none",n.style.transform="translateX(0px)",n.innerHTML=Ue(i.currentVariantId,a),(C=n.querySelector(`.railCell[data-idx="${Be}"]`))==null||C.classList.add("target"),t=s,o=p)},300)}}}const ur=["e","B","G","D","A","E"];function fr(e=16){const n=document.createElement("div");n.className="tabBoard";const t=document.createElement("div");t.className="tabGrid",n.appendChild(t);const o=[],i=[];for(let s=0;s<6;s++){const p=document.createElement("div");p.className="tabRow",p.dataset.string=String(s);const m=document.createElement("div");m.className="tabStringLabel",m.textContent=ur[s]??"",p.appendChild(m);const v=[],b=document.createElement("div");b.className="tabRowTrack";for(let h=0;h<e;h++){const g=document.createElement("div");g.className="tabCell",g.dataset.col=String(h),g.textContent="",b.appendChild(g),v.push(g)}p.appendChild(b),t.appendChild(p),i.push(p),o.push(v)}let r=-1,l=null,a=null;n.addEventListener("pointerdown",s=>{var h;const p=s.target,m=(h=p==null?void 0:p.closest)==null?void 0:h.call(p,".tabRow");if(!m)return;const v=m.dataset.string;if(v==null)return;const b=Number(v);Number.isFinite(b)&&b>=0&&b<6&&(a==null||a(b))});function d(s){var p,m,v,b,h,g;if(r!==s.cursor){if(r>=0)for(let E=0;E<6;E++)(p=o[E][r])==null||p.classList.remove("cursor");if(s.cursor>=0&&s.cursor<e)for(let E=0;E<6;E++)(m=o[E][s.cursor])==null||m.classList.add("cursor");r=s.cursor}l!==s.selectedString&&(l!=null&&((v=i[l])==null||v.classList.remove("selected")),s.selectedString!=null&&((b=i[s.selectedString])==null||b.classList.add("selected")),l=s.selectedString);for(let E=0;E<6;E++)for(let T=0;T<e;T++){const S=((g=(h=s.grid)==null?void 0:h[E])==null?void 0:g[T])??null,C=S==null?"":String(S),I=o[E][T];I.textContent!==C&&(I.textContent=C)}}function f(s){a=s}return{el:n,setState:d,onSelectString:f}}const pr=document.getElementById("app"),Rn=5;pr.innerHTML=`
  <div id="screenTitle" class="screen"></div>
  <div id="screenGame" class="screen hidden"></div>
  <div id="backdrop" class="backdrop hidden"></div>
  <div id="modalSettings" class="modal hidden"></div>
  <div id="modalLeaderboard" class="modal hidden"></div>
`;const qe=document.getElementById("screenTitle"),cn=document.getElementById("screenGame"),Sn=document.getElementById("backdrop"),In=document.getElementById("modalSettings"),kn=document.getElementById("modalLeaderboard");function Z(e,n){e.classList.toggle("hidden",!n)}function je(e){Z(Sn,!0),Z(In,e==="settings"),Z(kn,e==="leaderboard")}function Ae(){Z(Sn,!1),Z(In,!1),Z(kn,!1)}Sn.addEventListener("click",()=>Ae());window.addEventListener("keydown",e=>{e.key==="Escape"&&Ae()});function mr(){return{modeId:M.FRETBOARD,playType:F.MULTI,matchType:Je.BLACKOUT,difficulty:B.MEDIUM,fixedRoundsTotal:3,timers:{turnMs:15e3,intermissionMs:900},domain:{fretCount:25,minFret:0,maxFret:24,enabledStrings:[!0,!0,!0,!0,!0,!0]},feedback:{samEnabled:!0,samDurationMs:900,samRevealMode:"single",claimLabelMode:"off",claimLabelDurationMs:900,samIncludeLabel:!0},steal:{tokenCap:10,globalStealOnExhausted:!0,enharmonicOppositeStealBonus:5,breakConnectMaxTierBonus:25},accessibility:{colorBlindMode:!0},dev:{enabled:!1,paintPlayerIndex:0,paintLane:"prompt",paintMode:"paint",forceBonusOnTurnEnd:!1},promptProfileId:"chromatic"}}function vr(e){var i;const n=mr(),t=e??{},o={...n,...t,timers:{...n.timers,...t.timers},domain:{...n.domain,...t.domain},feedback:{...n.feedback,...t.feedback},steal:{...n.steal,...t.steal},accessibility:{...n.accessibility,...t.accessibility},dev:{...n.dev,...t.dev}};return o.matchType=Je.BLACKOUT,o.fixedRoundsTotal=Math.max(1,Math.min(50,Number(o.fixedRoundsTotal??1))),o.steal.tokenCap=Math.max(0,Math.min(20,Number(((i=o.steal)==null?void 0:i.tokenCap)??o.steal.tokenCap??10))),o}const we=["●","▲","■","◆","✚","✖","★","⬢","⬣","⬟","◐","◑","◒","◓","◍","⬤"];function Ie(e){const n=Math.max(1,Math.min(16,e)),t=[];for(let o=0;o<n;o++)t.push({id:o,name:`P${o+1}`,colorId:o,patternId:o});return t}let Ne="title",u=vr(rr()),D=Ie(u.playType===F.SINGLE?1:4),c=null,dn=null,Q=!1,z=!1,Ge=null,$n=0,rn=0,Fn=!1,ne=null,De=0,xn=0,ke=0;function br(){xn=0,ke=0}function wn(e=performance.now()){ke>0&&(xn+=Math.max(0,e-ke),ke=0)}function hr(e){if(typeof e!="number"||!isFinite(e)||e<0)return"—";const n=Math.round(e/1e3),t=Math.floor(n/60),o=n%60;return`${t}:${String(o).padStart(2,"0")}`}let xe=0,Re=null,Le=null;const _e=new Set;let ye=null,on=null,U=null;const We=16;let _={cursor:0,grid:Array.from({length:6},()=>Array.from({length:We},()=>null)),selectedString:null},K="",pe=!1,ge=null;function yr(){_={cursor:0,grid:Array.from({length:6},()=>Array.from({length:We},()=>null)),selectedString:null},K="",pe=!1,ge=null,U==null||U.setState(_)}let re=null;function ze(){if(!c||c.settings.modeId!==M.TAB)return;U==null||U.setState(_);const e=document.getElementById("tabDispString"),n=document.getElementById("tabDispFret"),t=document.getElementById("tabDispMode"),o=document.getElementById("btnTabSteal"),i=document.getElementById("btnTabEnter");if(e){const p=_.selectedString;e.textContent=p===null?"–":`${p+1} (${["e","B","G","D","A","E"][p]})`}n&&(n.textContent=K===""?"–":K);const r=c.players[c.currentPlayer].tokenCount;o&&(o.disabled=r<=0,o.classList.toggle("active",pe)),t&&(t.textContent=pe?"Steal":"Normal");const l=c.settings.domain.fretCount-1,a=parseInt(K,10),d=Number.isInteger(a)&&a>=0&&a<=l,f=_.selectedString!==null,s=K.trim()!=="";n&&n.classList.toggle("invalid",s&&!d),i&&(i.disabled=!(f&&d))}function Dn(){if(!c||c.settings.modeId!==M.TAB)return;const e=_.selectedString,n=c.settings.domain.fretCount-1,t=parseInt(K,10);if(e===null||!Number.isInteger(t)||t<0||t>n)return;const o=c.players[c.currentPlayer].tokenCount,i=pe&&o>0;ge={stringIndex:e,fretIndex:t,steal:i},O({type:i?"STEAL_CELL":"TAP_CELL"})}function gr(){re==null||re();const e=Array.from(document.querySelectorAll(".keyBtn")),n=document.getElementById("btnTabSteal"),t=document.getElementById("btnTabEnter"),o=d=>{if(!(!c||c.settings.modeId!==M.TAB)){if(d==="back")K=K.slice(0,-1);else if(d==="clr")K="";else{if(K.length>=2)return;K=`${K}${d}`}ze()}},i=[];for(const d of e){const f=()=>o(d.dataset.key||"");d.addEventListener("click",f),i.push(()=>d.removeEventListener("click",f))}const r=()=>{!c||c.settings.modeId!==M.TAB||c.players[c.currentPlayer].tokenCount<=0||(pe=!pe,ze())};n==null||n.addEventListener("click",r);const l=()=>Dn();t==null||t.addEventListener("click",l);const a=d=>{if(!(!c||c.settings.modeId!==M.TAB)){if(d.key==="Enter"){d.preventDefault(),Dn();return}if(d.key==="Backspace"){d.preventDefault(),o("back");return}/^\d$/.test(d.key)&&(d.preventDefault(),o(d.key))}};window.addEventListener("keydown",a),re=()=>{for(const d of i)d();n==null||n.removeEventListener("click",r),t==null||t.removeEventListener("click",l),window.removeEventListener("keydown",a)}}function te(){Ne="title",Z(qe,!0),Z(cn,!1),Ae(),Ee();const e=u.playType===F.SINGLE,n=D.length;qe.innerHTML=`
    <div class="titleHero">
      <div class="brand">
        <div class="logo">G</div>
        <div>
          <div class="h1">GuitarEdu</div>
          <div class="sub">Smart-board friendly guitar learning games</div>
        </div>
      </div>
      <div class="heroActions">
        <button class="btn" id="btnTitleSettings">Settings</button>
        <button class="btn" id="btnTitleLeaderboard">Leaderboard</button>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="cardTitle">Game mode</div>
        <div class="modeGrid">
          <button class="modeBtn ${u.modeId===M.FRETBOARD?"active":""}" data-mode="${M.FRETBOARD}">
            <div class="modeName">Mode 1</div>
            <div class="modeDesc">${u.modeId===M.TAB?"Tab note finder":"Fretboard note finder"}</div>
          </button>
          <button class="modeBtn" disabled>
            <div class="modeName">Mode 2</div>
            <div class="modeDesc">Staff note finder (soon)</div>
          </button>
          <button class="modeBtn ${u.modeId===M.TAB?"active":""}" data-mode="${M.TAB}">
            <div class="modeName">Mode 3</div>
            <div class="modeDesc">Tab note finder</div>
          </button>
          <button class="modeBtn" disabled>
            <div class="modeName">Mode 4</div>
            <div class="modeDesc">Combined trainer (soon)</div>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="cardTitle">Match setup</div>

        <div class="row">
          <div class="label">Play type</div>
          <div class="seg">
            <button class="segBtn ${e?"active":""}" id="segSingle">Single</button>
            <button class="segBtn ${e?"":"active"}" id="segMulti">Multiplayer</button>
          </div>
        </div>

        <div class="row">
          <div class="label">Players</div>
          <div class="stepper">
            <button class="btn" id="btnPMinus" ${e?"disabled":""}>−</button>
            <div class="stepVal" id="pCount">${n}</div>
            <button class="btn" id="btnPPlus" ${e?"disabled":""}>+</button>
          </div>
        </div>

        <div class="row">
          <div class="label">Difficulty</div>
          <select id="selDifficulty" class="select">
            <option value="${B.LEARNING}" ${u.difficulty===B.LEARNING?"selected":""}>Learning</option>
            <option value="${B.EASY}" ${u.difficulty===B.EASY?"selected":""}>Easy</option>
            <option value="${B.MEDIUM}" ${u.difficulty===B.MEDIUM?"selected":""}>Medium</option>
            <option value="${B.HARD}" ${u.difficulty===B.HARD?"selected":""}>Hard</option>
          </select>
        </div>


        <div class="row" id="rowRounds">
          <div class="label">Rounds</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn" id="btnRoundsMinus" type="button" style="padding:6px 10px;">−</button>
            <input id="inpRoundsTotal" class="input" type="number" min="1" max="50" value="${u.fixedRoundsTotal}" style="width:90px;" />
            <button class="btn" id="btnRoundsPlus" type="button" style="padding:6px 10px;">+</button>
          </div>
        </div>

        <div class="row" style="align-items:flex-start;">
          <div class="label">Player names</div>
          <div class="names" id="names"></div>
        </div>

        <div class="row" style="justify-content:flex-end; gap:10px;">
          <button class="btn primary" id="btnStart">Start</button>
        </div>
      </div>
    </div>
  `;const t=document.getElementById("names");t.innerHTML=D.map((s,p)=>`
      <div class="nameRow">
        <div class="badge" aria-hidden="true">${u.accessibility.colorBlindMode?we[s.patternId%we.length]:""}</div>
        <input class="input" data-pid="${s.id}" value="${Y(s.name)}" />
      </div>`).join(""),document.getElementById("btnTitleSettings").addEventListener("click",()=>{et(),je("settings")}),document.getElementById("btnTitleLeaderboard").addEventListener("click",()=>{nt(),je("leaderboard")}),qe.querySelectorAll(".modeBtn[data-mode]").forEach(s=>{s.addEventListener("click",()=>{const p=s.dataset.mode;p&&(u.modeId=p,X(u),te())})}),document.getElementById("segSingle").addEventListener("click",()=>{u.playType=F.SINGLE,D=Ie(1),X(u),te()}),document.getElementById("segMulti").addEventListener("click",()=>{u.playType=F.MULTI,D.length<2&&(D=Ie(4)),X(u),te()});const o=document.getElementById("btnPMinus"),i=document.getElementById("btnPPlus");o==null||o.addEventListener("click",()=>{const s=Math.max(2,D.length-1);D=D.slice(0,s),te()}),i==null||i.addEventListener("click",()=>{const s=Math.min(16,D.length+1);D=Ie(s).map((p,m)=>{var v;return{...p,name:((v=D[m])==null?void 0:v.name)??p.name}}),te()});const r=document.getElementById("selDifficulty");r.addEventListener("change",()=>{u.difficulty=r.value,X(u)});const l=document.getElementById("inpRoundsTotal"),a=document.getElementById("btnRoundsMinus"),d=document.getElementById("btnRoundsPlus"),f=s=>Math.max(1,Math.min(50,s));if(l){const s=p=>{const m=f(p);l.value=String(m),u.fixedRoundsTotal=m,X(u)};l.addEventListener("change",()=>s(Number(l.value))),l.addEventListener("input",()=>{}),a==null||a.addEventListener("click",()=>s(Number(l.value)-1)),d==null||d.addEventListener("click",()=>s(Number(l.value)+1))}t.querySelectorAll("input[data-pid]").forEach(s=>{s.addEventListener("input",()=>{const p=Number(s.dataset.pid),m=D.find(v=>v.id===p);m&&(m.name=s.value.slice(0,16))})}),document.getElementById("btnStart").addEventListener("click",()=>{X(u),Fe()})}function Y(e){return e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function et(){const e=(u.promptProfileId||"chromatic").trim(),n=e.toLowerCase();let t="chromatic",o="C",i="maj",r="auto",l="both";if(n.startsWith("accidentals")){t="accidentals";const W=(e.split(":")[1]||"").toLowerCase();l=W==="flats"?"flats":W==="sharps"?"sharps":"both"}else if(!n.startsWith("chromatic")){const N=e.split(":");t=N[0]||"chromatic",o=N[1]||"C",i=N[2]||"maj",r=(N[3]||"auto")==="flats"?"flats":(N[3]||"auto")==="sharps"?"sharps":"auto"}const a=["C","C#","Db","D","D#","Eb","E","F","F#","Gb","G","G#","Ab","A","A#","Bb","B"],d=Math.max(0,Number(u.domain.fretCount||25)-1),f=d<=5?5:d<=12?12:24;In.innerHTML=`
    <div class="modalHead">
      <div class="modalTitle">Settings</div>
      <button class="btn" id="btnCloseSettings">Close</button>
    </div>
    <div class="modalBody">
      <div class="formGrid">
        <div class="row">
          <div class="label">Turn timer (seconds)</div>
          <input class="input" id="inpTurn" type="number" min="3" max="120" value="${Math.round(u.timers.turnMs/1e3)}" />
        </div><div class="row">
          <div class="label">Displayed frets</div>
          <select class="input" id="selFretView">
            <option value="5" ${f===5?"selected":""}>0–5 (6 frets)</option>
            <option value="12" ${f===12?"selected":""}>0–12 (13 frets)</option>
            <option value="24" ${f===24?"selected":""}>0–24 (25 frets)</option>
          </select>
        </div>
        <div class="row">
          <div class="label">Active range min fret</div>
          <input class="input" id="inpMinFret" type="number" min="0" max="${d}" value="${u.domain.minFret}" />
        </div>
        <div class="row">
          <div class="label">Active range max fret</div>
          <input class="input" id="inpMaxFret" type="number" min="0" max="${d}" value="${u.domain.maxFret}" />
        </div>

        <div class="row">
          <div class="label">Prompt profile</div>
          <select class="input" id="selProfileKind">
            <option value="chromatic" ${t==="chromatic"?"selected":""}>Chromatic (all notes)</option>
            <option value="accidentals" ${t==="accidentals"?"selected":""}>Accidentals only (sharps/flats)</option>
            <option value="key" ${t==="key"?"selected":""}>Key (diatonic)</option>
            <option value="scale" ${t==="scale"?"selected":""}>Scale (diatonic)</option>
          </select>
        </div>

        <div class="row" id="rowAccMode">
          <div class="label">Accidentals lane</div>
          <select class="input" id="selAccMode">
            <option value="both" ${l==="both"?"selected":""}>Both (♯ and ♭)</option>
            <option value="sharps" ${l==="sharps"?"selected":""}>Sharps only</option>
            <option value="flats" ${l==="flats"?"selected":""}>Flats only</option>
          </select>
        </div>

        <div class="row" id="rowRoot">
          <div class="label">Root</div>
          <select class="input" id="selRoot">
            ${a.map(N=>`<option value="${N}" ${N===o?"selected":""}>${N}</option>`).join("")}
          </select>
        </div>
        <div class="row" id="rowMode">
          <div class="label">Mode</div>
          <select class="input" id="selMode">
            <option value="maj" ${i==="maj"?"selected":""}>Major</option>
            <option value="min" ${i==="min"?"selected":""}>Minor</option>
          </select>
        </div>
        <div class="row" id="rowPref">
          <div class="label">Spelling preference</div>
          <select class="input" id="selPref">
            <option value="auto" ${r==="auto"?"selected":""}>Auto</option>
            <option value="sharps" ${r==="sharps"?"selected":""}>Sharps</option>
            <option value="flats" ${r==="flats"?"selected":""}>Flats</option>
          </select>
        </div>

        <div class="row">
          <div class="label">Steal token cap</div>
          <input class="input" id="inpCap" type="number" min="0" max="20" value="${u.steal.tokenCap}" />
        </div>
        <div class="row">
          <div class="label">Color-blind mode</div>
          <label class="chk"><input id="chkCB" type="checkbox" ${u.accessibility.colorBlindMode?"checked":""}/> On (recommended)</label>
        </div>
        <div class="row">
          <div class="label">Show-after-miss (SAM)</div>
          <label class="chk"><input id="chkSAM" type="checkbox" ${u.feedback.samEnabled?"checked":""}/> Enabled</label>
        </div>
        <div class="row">
          <div class="label">SAM reveal</div>
          <select class="input" id="selSAMMode">
            <option value="single" ${u.feedback.samRevealMode!=="all"?"selected":""}>Single target</option>
            <option value="all" ${u.feedback.samRevealMode==="all"?"selected":""}>All targets</option>
          </select>
        </div>
        <div class="row">
          <div class="label">SAM duration (ms)</div>
          <input class="input" id="inpSAM" type="number" min="100" max="2500" value="${u.feedback.samDurationMs}" />
        </div>
        <div class="row">
          <div class="label">Dev/Test mode</div>
          <label class="chk"><input id="chkDev" type="checkbox" ${u.dev.enabled?"checked":""} ${Ne==="title"?"":"disabled"}/> Enabled</label>
        </div>
      </div>
      <div class="hint">
        <b>UI note:</b> The top rail blacks out notes not in the selected key/scale to remove ambiguity.
      </div>
    </div>
  `;const s=document.getElementById("inpTurn"),p=document.getElementById("selFretView"),m=document.getElementById("inpMinFret"),v=document.getElementById("inpMaxFret"),b=document.getElementById("inpCap"),h=document.getElementById("chkCB"),g=document.getElementById("chkSAM"),E=document.getElementById("selSAMMode"),T=document.getElementById("inpSAM"),S=document.getElementById("chkDev"),C=document.getElementById("selProfileKind"),I=document.getElementById("selAccMode"),x=document.getElementById("selRoot"),w=document.getElementById("selMode"),P=document.getElementById("selPref"),R=document.getElementById("rowAccMode"),q=document.getElementById("rowRoot"),k=document.getElementById("rowMode"),A=document.getElementById("rowPref"),L=()=>{const N=C.value;R.style.display=N==="accidentals"?"grid":"none";const W=N==="key"||N==="scale";q.style.display=W?"grid":"none",k.style.display=W?"grid":"none",A.style.display=W?"grid":"none"},en=()=>{const N={...u.domain},W=Math.max(0,Math.min(24,Number(p.value)||24));u.domain.fretCount=W+1,m.max=String(W),v.max=String(W),u.domain.maxFret=Math.max(0,Math.min(W,Number(v.value)||W)),u.domain.minFret=Math.max(0,Math.min(u.domain.maxFret,Number(m.value)||0)),u.timers.turnMs=Math.max(3,Math.min(120,Number(s.value)||15))*1e3,u.timers.intermissionMs=0,u.steal.tokenCap=Math.max(0,Math.min(20,Number(b.value)||10)),u.accessibility.colorBlindMode=!!h.checked,u.feedback.samEnabled=!!g.checked,u.feedback.samRevealMode=E.value==="all"?"all":"single",u.feedback.samDurationMs=Math.max(100,Math.min(2500,Number(T.value)||900)),Ne==="title"&&(u.dev.enabled=S.checked);const nn=C.value;if(nn==="chromatic")u.promptProfileId="chromatic";else if(nn==="accidentals"){const Oe=I.value;u.promptProfileId=Oe==="both"?"accidentals":`accidentals:${Oe}`}else{const Oe=x.value,lt=w.value,tn=P.value;u.promptProfileId=`${nn}:${Oe}:${lt}${tn&&tn!=="auto"?`:${tn}`:""}`}X(u);const ot=N.fretCount!==u.domain.fretCount||N.minFret!==u.domain.minFret||N.maxFret!==u.domain.maxFret;Ne==="game"&&(ot?Fe():(O({type:"UPDATE_SETTINGS",settings:u}),Qe()))};L(),[s,p,m,v,b,h,g,E,T,S,C,I,x,w,P].forEach(N=>{N.addEventListener("input",()=>{L(),en()}),N.addEventListener("change",()=>{L(),en()})}),document.getElementById("btnCloseSettings").addEventListener("click",()=>{L(),en(),Ae()})}function nt(){const e=ir(u);kn.innerHTML=`
    <div class="modalHead">
      <div class="modalTitle">Leaderboard</div>
      <button class="btn" id="btnCloseLB">Close</button>
    </div>
    <div class="modalBody">
      <div class="small">Profile: <b>${u.playType===F.SINGLE?"Single":"Multi"}</b> · Mode <b>${u.modeId}</b> · ${u.promptProfileId}</div>
      <div class="lbList">${e.length?e.slice(0,20).map((n,t)=>`
                <div class="lbRow">
                  <div>${t+1}.</div>
                  <div>${Y(n.name)}</div>
                  <div class="lbScore">${n.score}</div>
                  <div class="lbTime">${hr(n.durationMs)}</div>
                </div>
              `).join(""):'<div class="muted">No scores yet.</div>'}</div>
    </div>
  `,document.getElementById("btnCloseLB").addEventListener("click",()=>Ae())}let Ce,de,Mn,un,fn,fe,pn,mn=null,ue=null,tt,rt,vn=null,bn=null,hn=null,yn=null,oe=null,le=null,ae=null,he=null,se=null,$e=null,ln=null;function Cr(e){const n=e.trim().toUpperCase().replace("♯","#").replace("♭","B");return{C:0,"C#":1,DB:1,D:2,"D#":3,EB:3,E:4,F:5,"F#":6,GB:6,G:7,"G#":8,AB:8,A:9,"A#":10,BB:10,B:11}[n]??null}function Er(e){const n=(e||"").trim(),t=n.toLowerCase();if(!n||t==="chromatic"||t.startsWith("chromatic:")||t==="accidentals"||t.startsWith("accidentals:"))return 0*3+y.NAT;const i=n.split(":").map(f=>f.trim())[1]||"C",r=Cr(i)??0,l=i.toLowerCase().includes("b"),a=i.includes("#")||i.includes("♯"),d=l?y.FLT:a?y.SHR:y.NAT;return r*3+d}function Tr(){Ne="game",Z(qe,!1),Z(cn,!0),Ae(),cn.innerHTML=`
    <div class="geHeader">
      <div class="geHeaderLeft">
        <div class="geLogoBox" aria-label="GuitarEdu">LOGO</div>
      </div>

      <div class="geHeaderCenter">
        <div class="geModeTitle" id="modeTitle">—</div>
      </div>

      <div class="geHeaderRight">
        <button class="btn" id="btnBack" title="Return to title">Menu</button>
        <button class="btn" id="btnGameLB" title="Leaderboard">Leaderboard</button>
        <button class="iconBtn" id="btnGameSettings" title="Settings" aria-label="Settings">⚙</button>
      </div>
    </div>

    <div class="gePlayerStrip" id="scoreStrip"></div>

    <div class="geLeft">
      <div class="geCard">
        <div class="geCardTitle">Task</div>
        <div class="geTabRow" role="tablist" aria-label="Task tabs">
          <button class="segBtn active" id="leftTabMain" role="tab">Main</button>
          <button class="segBtn" id="leftTabDisplay" role="tab">Display</button>
          <button class="segBtn" id="leftTabMisc" role="tab">Misc</button>
        </div>

        <div class="geStack" id="leftTabContent">
          <div class="row" style="padding-top:0;">
            <div class="label">Difficulty</div>
            <select class="select" id="selDifficultyInline">
              <option value="learning" ${u.difficulty===B.LEARNING?"selected":""}>Learning</option>
              <option value="easy" ${u.difficulty===B.EASY?"selected":""}>Easy</option>
              <option value="medium" ${u.difficulty===B.MEDIUM?"selected":""}>Medium</option>
              <option value="hard" ${u.difficulty===B.HARD?"selected":""}>Hard</option>
            </select>
          </div>

          <div class="row">
            <div class="label">Fret range</div>
            <div class="small muted">Use Settings → Domain for now</div>
          </div>

          <div class="row">
            <div class="label">Notes / Intervals</div>
            <div class="small muted">Use Settings → Feedback for now</div>
          </div>

          <div class="small muted" style="margin-top:6px;">
            This panel is the permanent home for in-game controls. We will progressively migrate options out of Settings.
          </div>
        </div>
      </div>

      <div class="geCard">
        <div class="geCardTitle">Info Panel A</div>
        <div class="small" id="leftInfoText">Round alerts, bonus prompts, and contextual tips will live here.</div>
      </div>
    </div>

    <div class="geCenter">
      <div class="geCard geStaffCard">
        <div class="geStaffTop">
          <div class="prompt" id="prompt">—</div>
        </div>
        <div class="geStaffFrame">
          <img class="geStaffImg" src="/Guitar_Tab_Staff-Blank.svg" alt="Staff and tab" />
        </div>
      </div>

      <div class="geCard geRailCard">
        <div id="railMount" class="railMount"></div>
      </div>

      <div class="geCard geFretCard">
        <div class="boardWrap ${u.modeId===M.TAB?"tabMode":""}">
          <svg id="baseSvg" viewBox="0 0 1458 342" aria-label="Fretboard base"></svg>
          <svg id="overlaySvg" class="overlay" viewBox="0 0 1458 342" aria-label="Overlay"></svg>

          <div id="tabLayer" class="tabLayer ${u.modeId===M.TAB?"":"hidden"}">
            <div id="tabMount" class="tabMount"></div>
          </div>

          <div id="callout" class="callout hidden"></div>

          <div id="intermission" class="intermission">
            <div class="card">
              <div id="interTitle" style="font-size:18px; font-weight:700; margin-bottom:6px;">Next player</div>
              <div class="small" id="interText">—</div>
              <div style="margin-top:10px;" class="btnrow">
                <button class="btn primary" id="btnNextTurn">Ready</button>
                <button class="btn" id="btnInterAlt" style="display:none; margin-left:8px;">—</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="geRight">
      <div class="geCard activePlayerShell">
        <div id="activePlayerCard"></div>
        <div class="activeTimerOverlay" id="timer">—</div>
      </div>

      <div class="geCard">
        <div class="btnrow">
          <button class="btn primary" id="btnStartTurn">Start</button>
          <button class="btn" id="btnPause">Pause</button>
          ${(u.difficulty===B.EASY||u.difficulty===B.LEARNING)&&u.modeId!==M.TAB?`<button class="btn" id="btnHint" title="Reveal a correct target and end your turn (-${Rn} points)">Hint (-${Rn})</button>`:""}
          <button class="btn" id="btnReset">Reset</button>
          <button class="btn danger" id="btnEnd">End</button>
        </div>

        <hr />
        <div class="kv small" id="stats"></div>

        <hr />
        <div class="card ${u.dev.enabled?"":"hidden"}" id="devTools">
          <div class="cardTitle">Dev/Test</div>
          <div class="small" style="margin-bottom:8px;">Click the board to paint claims. Hold <b>Shift</b> to erase.</div>
          <div class="formGrid">
            <label>Paint player</label>
            <select id="selDevPaintPlayer">
              ${Array.from({length:D.length},(a,d)=>`<option value="${d}" ${d===u.dev.paintPlayerIndex?"selected":""}>P${d+1}</option>`).join("")}
            </select>

            <label>Lane</label>
            <select id="selDevPaintLane">
              <option value="prompt" ${u.dev.paintLane==="prompt"?"selected":""}>Prompt lane</option>
              <option value="nat" ${u.dev.paintLane==="nat"?"selected":""}>Natural (A..G)</option>
              <option value="shr" ${u.dev.paintLane==="shr"?"selected":""}>Sharp lane (A#..G#)</option>
              <option value="flt" ${u.dev.paintLane==="flt"?"selected":""}>Flat lane (Ab..Gb)</option>
            </select>

            <label>Paint mode</label>
            <select id="selDevPaintMode">
              <option value="paint" ${u.dev.paintMode==="paint"?"selected":""}>Paint</option>
              <option value="erase" ${u.dev.paintMode==="erase"?"selected":""}>Erase</option>
            </select>

            <label>Force phase</label>
            <select id="selDevForcePhase">
              <option value="TITLE">Title</option>
              <option value="IN_MATCH">In match</option>
              <option value="BONUS">Bonus</option>
              <option value="LAST_CHANCE">Last chance</option>
              <option value="INTERMISSION">Intermission</option>
              <option value="RESULTS">Results</option>
            </select>

            <label>Force bonus on end turn</label>
            <label class="chk" style="align-items:center; gap:8px;"><input id="chkDevForceBonus" type="checkbox" ${u.dev.forceBonusOnTurnEnd?"checked":""}/> Enabled</label>
          </div>
          <div class="btnrow" style="flex-wrap:wrap; margin-top:10px;">
            <button class="btn" id="btnDevSetP1">To P1</button>
            <button class="btn" id="btnDevSetP2">To P2</button>
            <button class="btn" id="btnDevEndTurn">End turn</button>
            <button class="btn" id="btnDevClear">Clear board</button>
          </div>
        </div>

        <hr />
        ${u.modeId===M.TAB?`
        <div class="card">
          <div class="cardTitle">Tab input</div>
          <div class="tabDisp">
            <div class="tabDispRow"><span class="small">String</span><span id="tabDispString" class="tabValue">—</span></div>
            <div class="tabDispRow"><span class="small">Fret</span><span id="tabDispFret" class="tabValue">—</span></div>
            <div class="small" id="tabDispMode">Normal</div>
          </div>
          <div class="keypad" id="tabKeypad">
            <button class="keyBtn" data-key="1">1</button>
            <button class="keyBtn" data-key="2">2</button>
            <button class="keyBtn" data-key="3">3</button>
            <button class="keyBtn" data-key="4">4</button>
            <button class="keyBtn" data-key="5">5</button>
            <button class="keyBtn" data-key="6">6</button>
            <button class="keyBtn" data-key="7">7</button>
            <button class="keyBtn" data-key="8">8</button>
            <button class="keyBtn" data-key="9">9</button>
            <button class="keyBtn" data-key="clr">Clear</button>
            <button class="keyBtn" data-key="0">0</button>
            <button class="keyBtn" data-key="back">⌫</button>
          </div>
          <div class="btnrow" style="justify-content:space-between; margin-top:10px;">
            <button class="btn btnToggle" id="btnTabSteal" disabled>Steal</button>
            <button class="btn primary" id="btnTabEnter">Enter</button>
          </div>
          <div class="hint" style="margin-top:8px;">
            <b>Answer:</b> pick a string line and enter the fret number. Enter can be used any time once both are set.
          </div>
        </div>
        `:""}

        <hr />
        <div class="hint">
          <b>Input:</b> ${u.modeId===M.TAB?"select a tab line + enter a fret":"tap/click a position to answer"}. ${u.modeId===M.TAB?"Use Steal during your turn on a vulnerable note matching the prompt.":"Tap a claimed dot to attempt a steal (token required)."}
        </div>
      </div>

      <div class="geCard">
        <div class="geCardTitle">Info Panel B</div>
        <div class="small">Contextual menus (keypad, chord/scale selectors, note names) will appear here depending on the task.</div>
      </div>
    </div>

    <div class="geFooter">
      <div class="geFooterLeft">
        <div class="pill" id="phasePill">—</div>
        <div class="small" id="turnInfo">—</div>
      </div>
      <div class="geFooterRight">
        <div class="dockCard" id="mechanicsDock"></div>
      </div>
    </div>
  `,Ce=document.querySelector("#baseSvg"),de=document.querySelector("#overlaySvg"),Mn=document.getElementById("intermission"),un=document.getElementById("interTitle"),fn=document.getElementById("interText"),fe=document.getElementById("callout"),pn=document.getElementById("prompt"),ue=document.getElementById("timer"),tt=document.getElementById("scoreStrip"),rt=document.getElementById("stats"),vn=document.getElementById("activePlayerCard"),bn=document.getElementById("phasePill"),hn=document.getElementById("turnInfo"),yn=document.getElementById("mechanicsDock"),mn=document.getElementById("modeTitle"),An(),ln=document.getElementById("railMount"),ln.innerHTML="",$e||($e=dr()),ln.appendChild($e.el),document.getElementById("btnBack").addEventListener("click",()=>te()),document.getElementById("btnGameSettings").addEventListener("click",()=>{et(),je("settings")}),document.getElementById("btnGameLB").addEventListener("click",()=>{nt(),je("leaderboard")});const e=document.getElementById("selDifficultyInline");e==null||e.addEventListener("change",()=>{u.difficulty=e.value,X(u),Fe()}),document.getElementById("btnStartTurn").addEventListener("click",()=>{c&&c.phase!=="RESULTS"&&(O({type:"START_TURN"}),!(!c||c.phase!=="IN_MATCH"&&c.phase!=="LAST_CHANCE")&&(_n(),ce()))}),document.getElementById("btnPause").addEventListener("click",()=>Nr());const n=document.getElementById("btnHint");n==null||n.addEventListener("click",()=>{c&&c.phase==="IN_MATCH"&&(c.lastChance.active||c.settings.difficulty!==B.EASY&&c.settings.difficulty!==B.LEARNING||O({type:"USE_HINT"}))}),document.getElementById("btnReset").addEventListener("click",()=>Fe()),document.getElementById("btnEnd").addEventListener("click",()=>Br(!1,!0)),document.getElementById("btnNextTurn").addEventListener("click",()=>{if(c){if(c.phase==="BONUS"){ce(),O({type:"END_BONUS"});return}if(c.phase==="RESULTS"){ce(),te();return}ce(),O({type:"START_TURN"}),!(!c||c.phase!=="IN_MATCH"&&c.phase!=="LAST_CHANCE")&&_n()}}),document.getElementById("btnInterAlt").addEventListener("click",()=>{ce(),Fe()}),document.getElementById("devTools"),oe=document.getElementById("selDevPaintPlayer"),le=document.getElementById("selDevPaintLane"),ae=document.getElementById("selDevPaintMode"),he=document.getElementById("selDevForcePhase"),se=document.getElementById("chkDevForceBonus"),oe&&(oe.value=String(u.dev.paintPlayerIndex??0)),le&&(le.value=String(u.dev.paintLane??"prompt")),ae&&(ae.value=String(u.dev.paintMode??"paint")),he&&(he.value=(c==null?void 0:c.phase)??"IN_MATCH"),se&&(se.checked=!!u.dev.forceBonusOnTurnEnd);const t=document.getElementById("btnDevSetP1"),o=document.getElementById("btnDevSetP2"),i=document.getElementById("btnDevEndTurn"),r=document.getElementById("btnDevClear"),l=()=>{if(!c)return;u.dev||(u.dev={enabled:!1,paintPlayerIndex:0,paintLane:"prompt",paintMode:"paint",forceBonusOnTurnEnd:!1});const a={};oe&&(a.paintPlayerIndex=Math.max(0,Math.min(c.players.length-1,Number(oe.value)||0))),le&&(a.paintLane=le.value||"prompt"),ae&&(a.paintMode=ae.value||"paint"),se&&(a.forceBonusOnTurnEnd=!!se.checked),u.dev={...u.dev,...a},X(u),O({type:"DEV_SET_PAINT",patch:a})};oe&&(oe.onchange=l),le&&(le.onchange=l),ae&&(ae.onchange=l),se&&(se.onchange=l),he&&(he.onchange=()=>{var d,f,s;if(!c)return;const a=he.value;if(O({type:"DEV_FORCE_PHASE",phase:a}),a==="BONUS"){const p=((d=c==null?void 0:c.bonus)==null?void 0:d.playerIndex)??(c==null?void 0:c.currentPlayer)??0,m=((s=(f=c==null?void 0:c.players)==null?void 0:f[p])==null?void 0:s.profile.name)??`P${p+1}`;me(`<div><b>Bonus stage:</b> ${Y(m)}</div><div class="small" style="margin-top:6px;">(Forced via dev tool.)</div>`,{title:"Bonus stage",nextLabel:"End bonus",html:!0})}else a!=="INTERMISSION"&&ce()}),t&&(t.onclick=()=>{c&&O({type:"DEV_SET_CURRENT_PLAYER",playerIndex:0})}),o&&(o.onclick=()=>{c&&O({type:"DEV_SET_CURRENT_PLAYER",playerIndex:1})}),i&&(i.onclick=()=>{c&&O({type:"DEV_END_TURN"})}),r&&(r.onclick=()=>{c&&O({type:"DEV_CLEAR_BOARD"})})}function Sr(e,n,t){if(ne!==null&&(window.clearTimeout(ne),ne=null),!t||t<=0){me(e,n);return}ne=window.setTimeout(()=>{ne=null,me(e,n)},t)}function me(e,n){const t=(n==null?void 0:n.title)??(u.playType===F.MULTI?"Next player":"Ready"),o=(n==null?void 0:n.nextLabel)??(u.playType===F.MULTI?"Ready":"Go");un&&(un.textContent=t);const i=document.getElementById("btnNextTurn");i&&(i.textContent=o);const r=document.getElementById("btnInterAlt");r&&(n!=null&&n.altLabel?(r.textContent=n.altLabel,r.style.display="inline-flex"):r.style.display="none"),n!=null&&n.html?fn.innerHTML=e:fn.textContent=e,Mn.classList.add("show")}function ce(){ne!==null&&(window.clearTimeout(ne),ne=null),Mn.classList.remove("show")}function it(){if(!c){pn.textContent="—";return}pn.textContent=H(c.prompt.variantId)}function Ir(){var o;if(!c)return;const e=(o=c.players[c.currentPlayer])==null?void 0:o.profile.id,n=c.turn.streakTier,t=Ye(n);tt.innerHTML=c.players.map(i=>{const r=i.profile.id===e,l=_e.has(i.profile.id),a=Array.from({length:u.steal.tokenCap},(f,s)=>`<span class="tokenDot ${s<i.tokenCount?"on":""}"></span>`).join(""),d=r&&t>1?`x${t}`:"";return`
        <div class="scoreCard ${r?"active":""} ${l?"fire":""}">
          <div class="tokens">${a}</div>
          <div class="nameRow">
            <div class="mark">${u.accessibility.colorBlindMode?we[i.profile.patternId%we.length]:""}</div>
            <div class="name">${Y(i.profile.name)}</div>
          </div>
          <div class="scoreRow">
            <div class="score">${i.score}</div>
            <div class="mult">${d}</div>
          </div>
        </div>
      `}).join("")}function kr(){if(!c)return;const e=c.players[c.currentPlayer],n=c.turn.streakTier,t=Ye(n);rt.innerHTML=`
    <div>Player</div><div>${Y(e.profile.name)}</div>
    <div>Profile</div><div>${Y(ht(u.promptProfileId))}</div>
    <div>Score</div><div>${e.score} ${t>1?`(x${t})`:""}</div>
    <div>Tokens</div><div>${e.tokenCount}</div>
    ${c.settings.fixedRoundsTotal>1?`<div>Round</div><div>${c.roundIndex} / ${c.settings.fixedRoundsTotal}${c.lastChance.active?" (Last chance)":""}</div>`:""}
    <div>Turn</div><div>${c.turnCounter}</div>
    <div>Correct</div><div>${c.turn.correctCount}</div>
    <div>Wrong</div><div>${c.turn.wrongCount}</div>
    <div>Tries</div><div>${c.turn.tries}</div>
    <div>Streak</div><div>${c.turn.streakCount}</div>
  `}function xr(){var e;if(c){if(vn){const n=c.players[c.currentPlayer],t=c.turn.streakTier,o=Ye(t),i=Array.from({length:u.steal.tokenCap},(r,l)=>`<span class="tokenDot ${l<n.tokenCount?"on":""}"></span>`).join("");vn.innerHTML=`
      <div class="activePlayerTop">
        <div class="nameRow">
          <div class="mark">${u.accessibility.colorBlindMode?we[n.profile.patternId%we.length]:""}</div>
          <div class="name">${Y(n.profile.name)}</div>
        </div>
        <div class="activeScore">
          <span class="score">${n.score}</span>
          <span class="mult">${o>1?`x${o}`:""}</span>
        </div>
      </div>
      <div class="tokens">${i}</div>
      <div class="small">Turn streak: <b>${c.turn.streakCount}</b> · Correct: <b>${c.turn.correctCount}</b> · Wrong: <b>${c.turn.wrongCount}</b></div>
    `}if(bn){const n=c.lastChance.active?" · Last chance":"",t=c.phase==="BONUS"?" · Bonus":"";bn.textContent=`${c.phase}${t}${n}`}if(hn){const n=c.settings.fixedRoundsTotal>1?`Round ${c.roundIndex}/${c.settings.fixedRoundsTotal}`:`Round ${c.roundIndex}`;hn.textContent=`${n} · Turn ${c.turnCounter}`}if(yn){const n=!!((e=c.settings.dev)!=null&&e.forceBonusOnTurnEnd),t=c.settings.playType===F.MULTI,o=H(c.prompt.variantId);yn.innerHTML=`
      <div class="dockGrid">
        <div class="dockCol">
          <div class="dockTitle">Turn</div>
          <div class="dockKv"><span>Prompt</span><b>${Y(o)}</b></div>
          <div class="dockKv"><span>Tries</span><b>${c.turn.tries}</b></div>
          <div class="dockKv"><span>Correct</span><b>${c.turn.correctCount}</b></div>
          <div class="dockKv"><span>Wrong</span><b>${c.turn.wrongCount}</b></div>
        </div>
        <div class="dockCol">
          <div class="dockTitle">Scoring</div>
          <div class="dockKv"><span>Streak</span><b>${c.turn.streakCount}</b></div>
          <div class="dockKv"><span>Tier</span><b>${c.turn.streakTier}</b></div>
          <div class="dockKv"><span>Multiplier</span><b>x${Ye(c.turn.streakTier)}</b></div>
          <div class="dockKv"><span>Fire</span><b>${_e.has(c.players[c.currentPlayer].profile.id)?"ON":"OFF"}</b></div>
        </div>
        <div class="dockCol">
          <div class="dockTitle">Bonus</div>
          <div class="dockKv"><span>Multiplayer</span><b>${t?"YES":"NO"}</b></div>
          <div class="dockKv"><span>Dev force</span><b>${n?"ON":"OFF"}</b></div>
          <div class="dockKv"><span>Status</span><b>${c.phase==="BONUS"?"IN BONUS":"—"}</b></div>
          <div class="dockKv"><span>Eligibility</span><b class="muted">(hook pending)</b></div>
        </div>
      </div>
    `}}}function Ye(e){return e<=0?1:e===1?2:e===2?3:e===3?5:10}function wr(e,n){Le={text:e,playerId:n,until:performance.now()+900},fe.textContent=e,fe.classList.remove("hidden"),setTimeout(()=>{Le&&performance.now()>=Le.until&&(Le=null,fe.classList.add("hidden"))},920)}function gn(){if(!c)return;const e=xn;if(u.playType===F.MULTI){const n=[...c.players].sort((t,o)=>o.score-t.score)[0];n&&Pn(u,n.profile.name,n.score,e)}else{const n=c.players[0];Pn(u,n.profile.name,n.score,e)}}function Cn(e,n){var a;if(!c||!((a=c.players)!=null&&a.length)){me(`Rounds completed: ${e}`,{title:n!=null&&n.endedEarly?"Game ended":"Game complete",nextLabel:"Back to title",altLabel:n!=null&&n.endedEarly?"Try again":"New game"});return}const t=[...c.players].sort((d,f)=>f.score-d.score),o=t[0],i=Y(o.profile.name||"Winner"),r=!!(n!=null&&n.endedEarly);let l=`<div class="small">Rounds completed: <b>${e}</b></div>`;if(r||(l+=`<div style="margin-top:10px; font-size:16px; font-weight:800;">Congratulations, ${i}!</div>`),!r&&t.length>1){const d=t.slice(0,3);l+='<div style="margin-top:10px;" class="small"><b>Top players</b></div>',l+='<div style="margin-top:6px; display:grid; gap:6px;">',d.forEach((f,s)=>{const p=Y(f.profile.name||`P${s+1}`);l+=`<div style="display:flex; justify-content:space-between; gap:10px;">
        <div><b>${s+1}</b>. ${p}</div>
        <div><b>${f.score}</b></div>
      </div>`}),l+="</div>"}me(l,{title:r?"Game ended":"Game complete",nextLabel:"Back to title",altLabel:r?"Try again":"New game",html:!0})}function Mr(e){var n,t,o;for(const i of e)switch(i.type){case"PROMPT_CHANGED":{it(),An(),Q&&!z&&Pr();break}case"FEEDBACK_PULSE":{$n=performance.now(),rn=i.durationMs,Fn=!!i.ghost||Array.isArray(i.ghosts)&&i.ghosts.length>0,dn={playerId:i.playerId,variantId:i.variantId,ghost:i.ghost?{cellIndex:i.ghost.cellIndex,slot:i.ghost.slot}:null,ghosts:i.ghosts?i.ghosts.map(r=>({cellIndex:r.cellIndex,slot:r.slot})):void 0,scoreDelta:i.scoreDelta},setTimeout(()=>{dn=null,Qe()},i.durationMs);break}case"STREAK_CALLOUT":{wr(i.message,i.playerId);break}case"FIRE_MODE":{i.enabled?_e.add(i.playerId):_e.delete(i.playerId);break}case"ROUND_COMPLETE":{Ge=`Round ${i.completedRound} complete.`;break}case"LAST_CHANCE_STARTED":{Ge="Final round complete. Last chance steals: use your remaining tokens.";break}case"BONUS_STARTED":{Ee();const r=((n=c==null?void 0:c.bonus)==null?void 0:n.playerIndex)??(c==null?void 0:c.currentPlayer)??0,l=((o=(t=c==null?void 0:c.players)==null?void 0:t[r])==null?void 0:o.profile.name)??`P${r+1}`;me(`<div><b>Bonus stage:</b> ${Y(l)}</div><div class="small" style="margin-top:6px;">(Scaffold: bonus gameplay hooks will be added next.)</div>`,{title:"Bonus stage",nextLabel:"End bonus",html:!0});break}case"MATCH_COMPLETE":{Ee(),gn(),Cn(i.roundsCompleted);break}case"BLACKOUT_COMPLETE":{Ee(),gn(),Cn((c==null?void 0:c.roundIndex)??1,{endedEarly:!0});break}case"TURN_ENDED":{Ee();const r=Ge;Ge=null;const l=u.playType===F.MULTI,a=l?"Next player":"Ready",d=l?"Ready":"Go",s=performance.now()-$n,m=Fn&&s<(rn||0)?Math.max(0,(rn||0)-s):0;let v="";if(r)if(l){const b=(c==null?void 0:c.players[c.currentPlayer].profile.name)??"—";v=`${r} Next: ${b}`}else v=r;else l?v=`Next: ${(c==null?void 0:c.players[c.currentPlayer].profile.name)??"—"}`:v="Press Start to continue.";Sr(v,{title:a,nextLabel:d},m);break}}}function O(e){if(!c&&e.type!=="INIT_MATCH")return;const n=c?c.turn.correctCount:0,t=c?c.settings.modeId:u.modeId,o=(e.type==="TAP_CELL"||e.type==="STEAL_CELL")&&t===M.TAB,i=Ht(c,e);if(c=i.state,c&&o&&ge){if(c.turn.correctCount>n){const l=_.cursor,a=ge.stringIndex;_.grid[a]&&_.grid[a][l]!==void 0&&(_.grid[a][l]=ge.fretIndex),l>=We-1?(window.setTimeout(()=>{!c||c.settings.modeId!==M.TAB||(_.cursor=0,_.grid=Array.from({length:6},()=>Array.from({length:We},()=>null)),U==null||U.setState(_))},450),_.cursor=0):_.cursor=l+1,U==null||U.setState(_)}K="",pe=!1,ge=null,ze()}Mr(i.effects),Qe()}function Ar(){switch(u.modeId){case M.FRETBOARD:return"Fret Finder";case M.STAFF:return"Staff Finder";case M.TAB:return"Tab Finder";case M.COMBINED:return"Combined";default:return"GuitarEdu"}}function An(){mn&&(mn.textContent=Ar())}function Qe(){if(!(!c||!ye)){if(it(),An(),$e){const e=(u.promptProfileId||"chromatic").toLowerCase(),t=e.startsWith("chromatic")||e.startsWith("accidentals")?"ROTATE_COMPASS":"FIXED_REFERENCE",o=Er(u.promptProfileId);$e.setConfig({anchorVariantId:o,currentVariantId:c.prompt.variantId,mode:t},u)}Ir(),kr(),xr(),tr(de,ye.layout,c,dn),Lr()}}function Lr(){const e=document.getElementById("btnStartTurn"),n=document.getElementById("btnPause"),t=document.getElementById("btnNextTurn"),o=document.getElementById("btnEnd"),i=document.getElementById("btnHint");if(!e||!n||!t||!o||!c)return;const r=c.phase==="RESULTS",l=c.phase==="BONUS";e.disabled=r||l,n.disabled=r||l||!Q,t.disabled=!1,i&&(i.disabled=r||l||!Q||z||c.phase!=="IN_MATCH"||c.lastChance.active||c.settings.difficulty!==B.EASY&&c.settings.difficulty!==B.LEARNING)}function Fe(){br(),u.playType===F.SINGLE&&(D=Ie(1)),u.playType===F.MULTI&&D.length<2&&(D=Ie(4)),X(u),Tr(),ce(),_e.clear(),Le=null,fe==null||fe.classList.add("hidden"),(async()=>{await Rr(),ye?ye.svgRoot=Ce:ye=await Jt(Ce,O);const e=document.getElementById("tabLayer"),n=document.getElementById("tabMount");u.modeId===M.TAB?(Ce.classList.add("hidden"),de.classList.add("hidden"),e==null||e.classList.remove("hidden"),on=null,U||(U=fr(),U.onSelectString(t=>{_.selectedString=t,ze()})),n&&n.replaceChildren(U.el),yr(),gr()):(Ce.classList.remove("hidden"),de.classList.remove("hidden"),e==null||e.classList.add("hidden"),re==null||re(),re=null,on!==de&&(nr(ye,()=>{var t;return c&&((t=c.settings.dev)!=null&&t.enabled||Q&&!z)?c:null},de),on=de)),O({type:"INIT_MATCH",settings:u,players:D,seed:Date.now()|0}),me("Press Start to begin.",{title:"Ready",nextLabel:"Go"}),Qe()})()}function Br(e=!1,n=!1){c&&(Ee(),O({type:"END_MATCH"}),e&&gn(),Cn((c==null?void 0:c.roundIndex)??1))}function _n(){ke=performance.now(),Q=!0,z=!1,xe=0,De=performance.now()+u.timers.turnMs,Xe()}function Pr(){De=performance.now()+u.timers.turnMs}function Ee(){wn(performance.now()),Q=!1,z=!1,xe=0,Re!==null&&cancelAnimationFrame(Re),Re=null,ue&&(ue.textContent="—");const e=document.getElementById("btnPause");e&&(e.textContent="Pause")}function Nr(){if(!Q)return;const e=performance.now();z?(z=!1,De=e+xe,xe=0,ke=e):(wn(e),xe=Math.max(0,Math.round(De-e)),z=!0);const n=document.getElementById("btnPause");n&&(n.textContent=z?"Resume":"Pause"),z||Xe()}function Xe(){if(!Q||!ue)return;if(z){ue.textContent=`${(xe/1e3).toFixed(1)}s`,Re=requestAnimationFrame(Xe);return}const e=performance.now(),n=Math.max(0,Math.round(De-e));if(ue.textContent=`${(n/1e3).toFixed(1)}s`,n<=0){ue.textContent="0.0s",wn(e),Q=!1,O({type:"TIMEOUT"});return}Re=requestAnimationFrame(Xe)}async function Rr(){const e=await fetch("/fretboard.svg").then(n=>n.text());Ce.innerHTML=e.replace(/^<\?xml[\s\S]*?\?>/g,"").replace(/<!DOCTYPE[\s\S]*?>/g,"").replace(/<svg[^>]*>/,"").replace(/<\/svg>\s*$/g,"")}async function $r(){te()}$r();
