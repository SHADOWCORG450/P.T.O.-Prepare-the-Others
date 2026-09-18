const ShiftMath=(()=>{
const date=s=>new Date(s+'T12:00:00Z');
const iso=d=>d.toISOString().slice(0,10);
const add=(s,n)=>{const d=date(s);d.setUTCDate(d.getUTCDate()+n);return iso(d)};
const week=(s,start)=>add(s,-((date(s).getUTCDay()-start+7)%7));
function period(start,type){let first=start,last;if(type==='semi'){const d=date(start),day=d.getUTCDate();d.setUTCDate(day<=15?1:16);first=iso(d);if(day<=15){d.setUTCDate(15)}else{d.setUTCMonth(d.getUTCMonth()+1,0)}last=iso(d)}else if(type==='month'){const d=date(start);d.setUTCDate(1);first=iso(d);d.setUTCMonth(d.getUTCMonth()+1,0);last=iso(d)}else last=add(start,Number(type)-1);return {first,last}}
function calculate(p,shifts,base){const used={...base};let gross=0,ot=0,breakEven=null,targetAt=null;const fixed=p.travel+p.lodging+p.fixed;const rows=[...shifts].sort((a,b)=>a.date.localeCompare(b.date)||a.id-b.id).map((s,i)=>{const key=week(s.date,p.weekstart),previous=used[key]||0;const overtime=Math.min(s.hours,Math.max(0,previous+s.hours-p.threshold));used[key]=previous+s.hours;const weekend=[0,6].includes(date(s.date).getUTCDay());const dif=(weekend?p.weekend:0)+p.other;const diffPay=dif*s.hours+p.night*s.night;const regular=p.rate*s.hours+diffPay;const premium=overtime*(p.multiplier-1)*(p.rate+(p.diffOT?diffPay/s.hours:0));const pay=regular+premium;gross+=pay;ot+=overtime;const net=gross*(1-p.tax/100)-fixed-(i+1)*p.daily;if(net>=-1e-8&&breakEven===null)breakEven=i+1;if(net>=p.target-1e-8&&targetAt===null)targetAt=i+1;return {...s,weekend,overtime,pay,net}});const withholding=gross*p.tax/100,costs=fixed+rows.length*p.daily;return {gross,withholding,costs,net:gross-withholding-costs,ot,rows,breakEven,targetAt}}
return {date,iso,add,week,period,calculate};})();
if(typeof module!=='undefined')module.exports=ShiftMath;
