/* Spear Growth Accelerator concept prototype. No data leaves the browser. */
(function(){
"use strict";
const D = window.SP_DATA;
const $ = (s, el=document) => el.querySelector(s);
const app = $("#app");
const SVG = d => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  tp: SVG('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  imp: SVG('<path d="M8 3h8l-1 4H9z"/><path d="M10 7v12l2 2 2-2V7"/><path d="M10 10h4M10 13h4M10 16h4"/>'),
  clr: SVG('<path d="M4 10c0 5 3.6 8 8 8s8-3 8-8"/><path d="M7 10c0 3 2.2 5 5 5s5-2 5-5"/>'),
  arch: SVG('<path d="M3 15c2-6 5-9 9-9s7 3 9 9"/><path d="M6 15v3M9 12v6M12 11v7M15 12v6M18 15v3"/>'),
  cos: SVG('<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>'),
  endo: SVG('<path d="M7 4c-2 0-3 2-3 4 0 3 2 4 2 7 0 2 1 5 2.5 5S10 17 10 15c0-1 1-2 2-2s2 1 2 2c0 2 0 5 1.5 5S18 17 18 15c0-3 2-4 2-7 0-2-1-4-3-4-2 0-3 1-5 1S9 4 7 4z"/><path d="M8.5 13v5M15.5 13v5"/>'),
  slp: SVG('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
  occ: SVG('<path d="M3 9h18M3 15h18"/><path d="M6 9V6M10 9V5M14 9V5M18 9V6M6 15v3M10 15v4M14 15v4M18 15v3"/>'),
  team: SVG('<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 14.5c3 0 6 2 6 5.5"/>')
};
const AREA = Object.fromEntries(D.areas.map(a => [a.id, a]));

/* ---------- state ---------- */
const fresh = () => ({
  role: null, metric: "day", value: "", hours: 8, days: 4, hygShare: 0.3, target: null,
  years: null, love: [], master: [], pace: 1, block: 4,
  dso: { doctors: D.defaults.dsoDoctors, locations: D.defaults.dsoLocations, adoption: D.defaults.dsoAdoption },
  showDso: false,
  A: Object.assign({}, D.defaults, { lifts: Object.fromEntries(D.areas.map(a => [a.id, a.lift])), hygLift: 0.06, foundationsLift: 0.05, capstoneLift: 0.02, secondWsShare: 0.5 })
});
let S = fresh();
try { const j = sessionStorage.getItem("sv_state"); if (j) S = Object.assign(fresh(), JSON.parse(j)); } catch(e){}
const save = () => { try { sessionStorage.setItem("sv_state", JSON.stringify(S)); } catch(e){} };

/* ---------- helpers ---------- */
const money = (n, opts={}) => {
  const neg = n < 0; n = Math.abs(n);
  let s;
  if (opts.short && n >= 1e6) s = "$" + (n/1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.0+$/,"") + "M";
  else if (opts.short && n >= 1e4) s = "$" + Math.round(n/1e3) + "K";
  else s = "$" + Math.round(n).toLocaleString("en-US");
  return (neg ? "-" : "") + s;
};
const pct = (x, d=1) => (x*100).toFixed(d).replace(/\.0$/,"") + "%";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove("on"), 2600); };
const go = h => { location.hash = h; };
const daily = () => { const v = parseFloat(S.value) || 0; return S.metric === "day" ? v : v * (parseFloat(S.hours) || 8); };
const isEarly = () => S.role === "early" || S.years === "0-2" || S.years === "3-5";
const isDso = () => S.role === "dso";
const ROLE = { owner: "Practice owner", associate: "Associate", early: "Early-career dentist", dso: "DSO leader" };

function tcard(t, cls="") {
  return `<figure class="tcard ${cls}"><span class="tag tag-real">Verbatim from speareducation.com</span>
    <blockquote>“${esc(t.q)}”</blockquote>
    <figcaption><div class="who">${esc(t.who)}</div><div class="org">${esc(t.org)}</div>
    <div class="src">Source: <a href="${t.src}" target="_blank" rel="noopener">${t.src.replace("https://www.","")}</a></div></figcaption></figure>`;
}
function phcard(label="Example testimonial") {
  return `<figure class="tcard ph"><span class="tag tag-ph">${label}: placeholder</span>
    <blockquote>“[Member outcome in their words: what changed, by how much, how fast. For example: production per day up X% in Y months after Treatment Planning with Confidence.]”</blockquote>
    <figcaption><div class="who">[Name, credential]</div><div class="org">[Practice or DSO, state] · [verified % lift, months]</div></figcaption></figure>`;
}
function bigquote(t) {
  return `<div class="bigquote"><blockquote>${esc(t.q)}</blockquote><div class="who">${esc(t.who)}</div><div class="org">${esc(t.org)}</div>
    <div class="src">Verbatim from <a href="${t.src}" target="_blank" rel="noopener">${t.src.replace("https://www.","")}</a></div></div>`;
}
const T = id => D.testimonials.find(t => t.id === id);
const roleQuote = () => ({ owner: T("nelson"), associate: T("schuler"), early: T("nguyen"), dso: T("ponzio") }[S.role] || T("nelson"));

/* ---------- growth motif ---------- */
function growthMotif(where){
  // Subtle accelerating growth curve: Spear blue to cyan to mint.
  const cls = where==="loader" ? "vm vm-loader" : where==="plan" ? "vm vm-plan" : "vm";
  const pts=[...Array(41)].map((_,i)=>{const x=i/40; return [x*1000, 300-Math.pow(x,2.2)*270];});
  const path="M"+pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" L");
  const dots=[0.35,0.55,0.72,0.86,0.97].map((x,i)=>`<circle cx="${x*1000}" cy="${300-Math.pow(x,2.2)*270}" r="${3+i*1.4}" fill="url(#vmg)" opacity="${0.45+i*0.12}"/>`).join("");
  const streaks=[0,1,2].map(i=>`<path d="${path}" transform="translate(0 ${18+i*16})" stroke="url(#vmg)" stroke-width="1" fill="none" opacity="${0.22-i*0.06}"/>`).join("");
  return `<svg class="${cls}" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="vmg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#1743d7" stop-opacity="0"/><stop offset=".55" stop-color="#07c2ff"/><stop offset="1" stop-color="#27eec4"/></linearGradient></defs><path d="${path}" stroke="url(#vmg)" stroke-width="3" fill="none"/>${streaks}${dots}</svg>`;
}

/* ---------- landing ---------- */
function landing() {
  document.title = "Spear Growth Accelerator | See your growth and when Spear pays for itself (concept)";
  app.innerHTML = `
  <section class="hero"><div class="wrap">
    ${growthMotif()}
    <span class="eyebrow">Spear Growth Accelerator</span>
    <h1>See your growth. Know when Spear <mark>pays for itself.</mark></h1>
    <p class="lead">Tell us your production and the skills you want to add. We build a sequenced plan of Spear workshops, online courses and study clubs, then show the growth you can expect, the month your first gain shows up, and the month your gains have paid for the courses. After that, it is house money.</p>
    <p style="color:#fff;font-weight:600;margin-top:28px">Get your growth plan in about 3 minutes. Which best describes you?</p>
    <div class="role-grid">
      ${[["owner","◆","Practice owner","Grow production across your chair and your team"],
         ["associate","◇","Associate","Build your schedule and your production"],
         ["early","✧","Early career (0-5 yrs)","Build confidence and grow production sooner"],
         ["dso","▣","DSO or group leader","Ramp associates faster across locations"]]
        .map(r => `<button class="role" data-role="${r[0]}"><span class="ic">${r[1]}</span><b>${r[2]}</b><span>${r[3]}</span></button>`).join("")}
    </div>
    <div class="facts">${D.facts.map(f => `<div><b>${f.k}</b>${f.v}</div>`).join("")}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>How the Growth Accelerator works</h2>
    <div class="how">
      <div class="card"><div class="num">1</div><h3>Set your baseline</h3><p>Production per day or per hour, days per week, hygiene share and the growth goal you want to hit.</p></div>
      <div class="card"><div class="num">2</div><h3>Choose your growth areas</h3><p>What you love to do and the skills you want to add next: implants, aligners, full-arch, cosmetic, endo, airway, occlusion, case acceptance, team.</p></div>
      <div class="card"><div class="num">3</div><h3>Get your growth plan</h3><p>Real Spear workshops in your priority order, your first-gain month, your payback month, and the point where your gains turn into house money.</p></div>
    </div>
  </div></section>
  <section class="section" style="padding-top:0"><div class="wrap">
    <h2>Dentists on Spear, in their words</h2><p class="muted" style="margin-top:-6px;margin-bottom:22px">Verbatim from speareducation.com, with sources.</p>
    <div class="tgrid">${[T("nelson"),T("schuler"),T("ponzio")].map(t=>tcard(t)).join("")}</div>
    <p class="center" style="margin-top:28px"><button class="btn btn-line" id="demo">See a sample growth plan</button></p>
  </div></section>`;
  app.querySelectorAll("[data-role]").forEach(b => b.onclick = () => { S = Object.assign(fresh(), { role: b.dataset.role }); S.showDso = S.role === "dso"; if (S.role === "early" && !S.years) S.years = "0-2"; save(); go("#/step/1"); });
  $("#demo").onclick = () => { S = Object.assign(fresh(), { role:"owner", metric:"day", value:"6000", days:4, hygShare:0.3, target:7200, years:"6-10", love:["cos","tp"], master:["imp","tp","clr"], pace:1, block:4 }); save(); go("#/building"); };
}

/* ---------- steps ---------- */
const SECTIONS = ["Baseline","Goal","Growth areas","Your plan"];
const STEPS = [
  { id:"proof", sec:0, inter:true, render(){
      const t = roleQuote();
      const head = { owner:"Growth on purpose beats growth by accident.", associate:"Learn in the right order. Grow faster.", early:"Your first five years set your growth curve.", dso:"Faster associate ramp is growth you can measure." }[S.role] || "Let's map your growth.";
      return `<div class="inter"><span class="eyebrow" style="color:var(--blue)">${esc(ROLE[S.role]||"")}</span><h2>${head}</h2>
        <p class="sub muted">About 3 minutes. No email. Nothing leaves this page.</p></div>${bigquote(t)}`; },
    valid:()=>true },
  { id:"metric", sec:0, render(){
      return `<div class="q"><h2>${isDso() ? "Your baseline: what does a typical associate produce today?" : "Your baseline: what do you produce today?"}</h2>
      <p class="sub">${S.role==="owner" ? "Practice production, doctor plus hygiene." : "Your own doctor production."} Use a typical recent month.</p>
      <div class="center"><div class="toggle" role="tablist"><button data-m="day" class="${S.metric==="day"?"on":""}">Per day</button><button data-m="hour" class="${S.metric==="hour"?"on":""}">Per hour</button></div></div>
      <div class="numin"><span class="u">$</span><input id="val" inputmode="decimal" type="number" min="0" placeholder="${S.metric==="day"?"6,000":"750"}" value="${esc(S.value)}" aria-label="Production"><span class="u">/${S.metric==="day"?"day":"hr"}</span></div>
      ${S.metric==="hour" ? `<div class="numin" style="margin-top:18px"><input id="hrs" type="number" min="1" max="14" step="0.5" value="${S.hours}" style="width:110px;font-size:1.8rem" aria-label="Clinical hours per day"><span class="u">clinical hours per day</span></div>` : ""}
      <p class="hint">Production, not collections. Growth is measured from here. Your numbers stay in this browser.</p></div>`; },
    bind(){
      app.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { S.metric = b.dataset.m; S.value=""; S.target=null; save(); render(); });
      $("#val").oninput = e => { S.value = e.target.value; S.target = null; save(); updCta(); };
      const h = $("#hrs"); if (h) h.oninput = e => { S.hours = e.target.value; save(); };
      setTimeout(()=>$("#val").focus(), 50); },
    valid:()=> parseFloat(S.value) > 0 },
  { id:"days", sec:0, auto:true, render(){
      return `<div class="q"><h2>How many days a week ${isDso()?"is an associate in the chair":"are you in the chair"}?</h2><p class="sub">We assume ${S.A.weeks} working weeks a year. You can change that later.</p>
      <div class="opts cols3">${[3,3.5,4,4.5,5,5.5].map(d=>`<button class="opt ${S.days==d?"sel":""}" data-d="${d}"><span class="ic">${d}</span>days per week</button>`).join("")}</div></div>`; },
    bind(){ app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { S.days = parseFloat(b.dataset.d); save(); pick(b); }); },
    valid:()=> S.days > 0 },
  { id:"hyg", sec:0, skipIf:()=> S.role!=="owner", render(){
      return `<div class="q"><h2>How much of that is hygiene?</h2><p class="sub">We split doctor and hygiene production because they grow differently.</p>
      <div class="rangeval" id="hv">${pct(S.hygShare,0)}</div>
      <input class="range" id="hr" type="range" min="0" max="0.5" step="0.01" value="${S.hygShare}" aria-label="Hygiene share">
      <div class="summary"><div class="card"><small>Doctor</small><b id="dv">${money(daily()*(1-S.hygShare))}/day</b></div><div class="card"><small>Hygiene</small><b id="hy">${money(daily()*S.hygShare)}/day</b></div></div></div>`; },
    bind(){ $("#hr").oninput = e => { S.hygShare = parseFloat(e.target.value); $("#hv").textContent = pct(S.hygShare,0); $("#dv").textContent = money(daily()*(1-S.hygShare))+"/day"; $("#hy").textContent = money(daily()*S.hygShare)+"/day"; save(); }; },
    valid:()=>true },
  { id:"worth", sec:0, inter:true, render(){
      const yr = daily()*S.days*S.A.weeks;
      return `<div class="inter"><h2>Your baseline</h2>
      <div class="big">${money(yr,{short:true})}</div><p class="muted">a year in production at ${money(daily())}/day, ${S.days} days a week</p>
      <div class="callout" style="text-align:left"><b>Every 1% of lift is worth ${money(yr*0.01)} a year</b> in production. Small gains, started early, compound into real growth.</div></div>`; },
    valid:()=>true },
  { id:"target", sec:1, render(){
      const d = daily(); if (!S.target) S.target = Math.round(d*1.2/50)*50;
      return `<div class="q"><h2>Set your growth goal</h2><p class="sub">Where do you want to be in 12 months? Drag to set your target ${S.metric==="hour"?"daily production (we converted your hourly number)":"daily production"}.</p>
      <div class="rangeval" id="tv">${money(S.target)}/day</div>
      <input class="range" id="tr" type="range" min="${Math.round(d*1.02)}" max="${Math.round(d*1.6)}" step="${Math.max(10,Math.round(d/200)*1)}" value="${S.target}" aria-label="Target daily production">
      <div class="summary"><div class="card"><small>Lift</small><b id="tl">${pct(S.target/d-1)}</b></div><div class="card"><small>Worth per year</small><b id="tw">${money((S.target-d)*S.days*S.A.weeks)}</b></div></div></div>`; },
    bind(){ const d = daily(); $("#tr").oninput = e => { S.target = parseFloat(e.target.value); $("#tv").textContent = money(S.target)+"/day"; $("#tl").textContent = pct(S.target/d-1); $("#tw").textContent = money((S.target-d)*S.days*S.A.weeks); save(); }; },
    valid:()=> S.target > daily() },
  { id:"years", sec:1, auto:true, render(){
      return `<div class="q"><h2>${isDso()?"How experienced are the associates you want to develop?":"How long have you been practicing?"}</h2><p class="sub">This decides your first move. Early-career doctors start with Foundations.</p>
      <div class="opts">${[["0-2","0 to 2 years"],["3-5","3 to 5 years"],["6-10","6 to 10 years"],["11-20","11 to 20 years"],["20+","More than 20 years"]].map(y=>`<button class="opt ${S.years===y[0]?"sel":""}" data-y="${y[0]}">${y[1]}</button>`).join("")}</div></div>`; },
    bind(){ app.querySelectorAll("[data-y]").forEach(b => b.onclick = () => { S.years = b.dataset.y; save(); pick(b); }); },
    valid:()=> !!S.years },
  { id:"love", sec:2, render(){
      return `<div class="q"><h2>What do you love to do?</h2><p class="sub">Choose all that apply. We build on your strengths and skip ahead where you are already strong.</p>
      <div class="opts cols2">${D.areas.map(a=>`<button class="opt ${S.love.includes(a.id)?"sel":""}" data-a="${a.id}"><span class="ic">${ICON[a.id]}</span>${a.label}<span class="chk">✓</span></button>`).join("")}</div></div>`; },
    bind(){ app.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { const id=b.dataset.a; S.love = S.love.includes(id) ? S.love.filter(x=>x!==id) : S.love.concat(id); b.classList.toggle("sel"); save(); updCta(); }); },
    valid:()=> S.love.length > 0 },
  { id:"master", sec:2, render(){
      return `<div class="q"><h2>Which skills do you want to add next?</h2><p class="sub">Pick up to 3, in priority order. Your first pick goes first. Tap again to remove.</p>
      <div class="opts cols2">${D.areas.map(a=>{ const r=S.master.indexOf(a.id); return `<button class="opt ${r>=0?"sel":""} ${r<0&&S.master.length>=3?"disabled":""}" data-a="${a.id}"><span class="ic">${ICON[a.id]}</span>${a.label}${r>=0?`<span class="rank">${r+1}</span>`:""}<span class="chk">✓</span></button>`; }).join("")}</div>
      ${S.master.length ? `<p class="hint" style="margin-top:14px">Priority: ${S.master.map(id=>AREA[id].label).join(" → ")}</p>`:""}</div>`; },
    bind(){ app.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { const id=b.dataset.a; S.master = S.master.includes(id) ? S.master.filter(x=>x!==id) : (S.master.length<3 ? S.master.concat(id) : S.master); save(); render(); }); },
    valid:()=> S.master.length > 0 },
  { id:"pace", sec:2, render(){
      return `<div class="q"><h2>Choose your acceleration</h2><p class="sub">How often can you get to campus in Scottsdale or Charlotte? More hands-on time means faster growth, and more spend up front. Online courses fill the gaps.</p>
      <div class="center"><div class="toggle"><button data-b="4" class="${S.block==4?"on":""}">4-month blocks</button><button data-b="6" class="${S.block==6?"on":""}">6-month blocks</button></div></div>
      <div class="opts">${[[0.5,"Steady","One workshop every other block, mostly online"],[1,"Accelerated","One hands-on workshop per block"],[2,"Maximum","Two workshops per block. Most growth, most spend up front"]].map(p=>`<button class="opt ${S.pace==p[0]?"sel":""}" data-p="${p[0]}"><span class="ic">${p[0]==0.5?"◔":p[0]==1?"◑":"●"}</span><span><b>${p[1]}</b><br><span class="muted" style="font-size:.9rem">${p[2]}</span></span><span class="chk">✓</span></button>`).join("")}</div></div>`; },
    bind(){ app.querySelectorAll("[data-b]").forEach(b => b.onclick = () => { S.block = +b.dataset.b; save(); render(); });
      app.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { S.pace = parseFloat(b.dataset.p); save(); render(); }); },
    valid:()=> S.pace > 0 },
  { id:"dso", sec:2, skipIf:()=> !isDso(), render(){
      return `<div class="q"><h2>How big is the rollout?</h2><p class="sub">We'll roll your growth plan up across your doctors: payback and house money for the group.</p>
      <div class="opts">
        <label class="opt" style="cursor:default">Doctors in the program<input id="dd" type="number" min="1" value="${S.dso.doctors}" style="margin-left:auto;width:110px;font:700 1.1rem Inter;padding:8px;border:1.5px solid var(--line);border-radius:8px;text-align:right"></label>
        <label class="opt" style="cursor:default">Locations<input id="dl" type="number" min="1" value="${S.dso.locations}" style="margin-left:auto;width:110px;font:700 1.1rem Inter;padding:8px;border:1.5px solid var(--line);border-radius:8px;text-align:right"></label>
        <label class="opt" style="cursor:default">Share who complete the plan<input id="da" type="number" min="0" max="100" value="${Math.round(S.dso.adoption*100)}" style="margin-left:auto;width:110px;font:700 1.1rem Inter;padding:8px;border:1.5px solid var(--line);border-radius:8px;text-align:right">%</label>
      </div><p class="hint" style="margin-top:12px">Completion rate is an assumption. Spear should report real completion and attrition.</p></div>`; },
    bind(){ $("#dd").oninput=e=>{S.dso.doctors=+e.target.value||1;save();}; $("#dl").oninput=e=>{S.dso.locations=+e.target.value||1;save();}; $("#da").oninput=e=>{S.dso.adoption=Math.min(1,(+e.target.value||0)/100);save();}; },
    valid:()=> S.dso.doctors > 0 },
  { id:"graph", sec:3, inter:true, render(){
      return `<div class="inter"><h2>Growth compounds</h2><p class="muted">Learn one skill, put it to work, then add the next. Sequence is what turns CE into growth.</p>
      ${miniCurve()}<p class="hint"><span class="tag tag-assume">Illustrative shape</span> Not data. Your projection comes next, built from your inputs and editable assumptions.</p></div>`; },
    valid:()=>true },
  { id:"summary", sec:3, cta:"Build my growth plan", render(){
      return `<div class="q"><h2>Ready to build your growth plan</h2><p class="sub">Check your answers, then we'll project your growth, first-gain month and payback month.</p>
      <div class="summary">
        <div class="card"><small>Role</small><b>${ROLE[S.role]||"-"}</b></div>
        <div class="card"><small>Baseline</small><b>${money(daily())}/day · ${S.days} days/wk</b></div>
        <div class="card"><small>Growth goal</small><b>${money(S.target||0)}/day (${pct((S.target||0)/daily()-1)})</b></div>
        <div class="card"><small>Experience</small><b>${S.years||"-"} years</b></div>
        <div class="card"><small>Love to do</small><b>${S.love.map(i=>AREA[i].label).join(", ")||"-"}</b></div>
        <div class="card"><small>Skills to add</small><b>${S.master.map(i=>AREA[i].label).join(", ")||"-"}</b></div>
        <div class="card"><small>Pace</small><b>${{0.5:"Steady",1:"Accelerated",2:"Maximum"}[S.pace]} · ${S.block}-month blocks</b></div>
        ${isDso()?`<div class="card"><small>Rollout</small><b>${S.dso.doctors} doctors · ${S.dso.locations} locations</b></div>`:""}
      </div></div>`; },
    valid:()=>true, next:()=>go("#/building") }
];
const visible = () => STEPS.filter(s => !(s.skipIf && s.skipIf()));
let cur = 0;
function miniCurve(){
  const w=560,h=220, p=(x,y)=>`${30+x*(w-50)},${h-30-y*(h-60)}`;
  const flat=[...Array(13)].map((_,i)=>p(i/12, .2+ .02*Math.sin(i))).join(" ");
  const up=[...Array(13)].map((_,i)=>p(i/12, .2+ .7*(1-Math.exp(-i/4)))).join(" ");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Illustrative curve: with plan vs without">
    <line x1="30" y1="${h-30}" x2="${w-20}" y2="${h-30}" stroke="#dfe3f0"/><polyline points="${flat}" fill="none" stroke="#b5bbd0" stroke-width="3" stroke-dasharray="6 6"/>
    <polyline points="${up}" fill="none" stroke="var(--blue)" stroke-width="4"/><circle cx="${w-20}" cy="${h-30-.9*(h-60)+5}" r="6" fill="var(--mint)"/>
    <text x="${w-24}" y="${h-30-.9*(h-60)-10}" text-anchor="end" font-size="13" font-weight="700" fill="var(--blue)">With a sequenced Spear plan</text>
    <text x="${w-24}" y="${h-48}" text-anchor="end" font-size="13" fill="#8a90a8">Ad hoc CE</text>
    <text x="30" y="${h-8}" font-size="12" fill="#8a90a8">Today</text><text x="${w-20}" y="${h-8}" text-anchor="end" font-size="12" fill="#8a90a8">12 months</text></svg>`;
}
function stepView(n) {
  const vs = visible(); if (!S.role) { go("#/"); return; }
  cur = Math.max(0, Math.min(n-1, vs.length-1)); const st = vs[cur];
  const secCount = SECTIONS.map((_,i)=>vs.filter(s=>s.sec===i).length);
  const secDone = SECTIONS.map((_,i)=>{ const idx=vs.filter(s=>s.sec===i); const pos=idx.indexOf(st); return st.sec>i?1: st.sec<i?0:(pos+1)/idx.length; });
  app.innerHTML = `<div class="funnel"><div class="ptop"><button class="back" id="back">← Back</button><span>${SECTIONS[st.sec]}</span><span>${cur+1} of ${vs.length}</span></div>
    <div class="progress">${secDone.map(f=>`<i><b style="width:${f*100}%"></b></i>`).join("")}</div>
    <div id="stepbody">${st.render()}</div></div>
    <div class="ctabar"><button class="btn ${st.cta?"btn-orange":""}" id="next">${st.cta||"Continue"}</button></div>`;
  $("#back").onclick = () => cur===0 ? go("#/") : go("#/step/"+cur);
  $("#next").onclick = next;
  st.bind && st.bind();
  updCta();
  app.focus({preventScroll:true}); window.scrollTo(0,0);
}
function updCta(){ const st = visible()[cur]; const b=$("#next"); if (b && st) b.disabled = !st.valid(); }
function next(){ const vs=visible(), st=vs[cur]; if (!st.valid()) return; if (st.next) return st.next(); go("#/step/"+(cur+2)); }
function pick(b){ b.parentElement.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel")); b.classList.add("sel"); updCta(); setTimeout(next, 260); }

/* ---------- loader ---------- */
function building(){
  const qs = [roleQuote(), T("dudley"), T("larrick"), T("burns")].filter(Boolean);
  app.innerHTML = `<div class="loader"><img class="loader-logo" src="assets/spear-growth-accelerator-logo.png" alt="Spear Growth Accelerator" width="1505" height="568"><h2>Building your <mark>growth plan</mark></h2>
   ${["Reading your baseline","Matching Spear workshops to your growth areas","Sequencing your blocks and pricing the plan","Projecting your growth, first gain and payback"].map((l,i)=>`<div class="bar"><div class="lbl"><span>${l}</span><span id="p${i}">0%</span></div><div class="trk"><b id="b${i}"></b></div></div>`).join("")}
   <div id="lq" style="margin-top:30px"></div></div>`;
  let i=0,k=0; const showQ=()=>{ $("#lq").innerHTML = tcard(qs[k++%qs.length]); }; showQ();
  const qt = setInterval(showQ, 1500);
  const iv = setInterval(()=>{ i+=4; for(let j=0;j<4;j++){ const v=Math.max(0,Math.min(100,i-j*25)*4/4); const p=Math.min(100,Math.max(0,(i-j*22)*1.6)); $("#b"+j).style.width=p+"%"; $("#p"+j).textContent=Math.round(p)+"%"; }
    if (i>=110){ clearInterval(iv); clearInterval(qt); setTimeout(()=>go("#/plan"),250); } }, 70);
  building._stop = () => { clearInterval(iv); clearInterval(qt); };
}

/* ---------- model ---------- */
function buildPlan(){
  const A = S.A, B = S.block, H = A.horizon, nBlocks = Math.ceil(H/B);
  const queue = [];
  if (isEarly()) queue.push({ w: D.foundationsWorkshop, area: null, lift: A.foundationsLift, why: "Starts early-career doctors on patient conversations, diagnosis and core restorative skills" });
  const master = S.master.length ? S.master : ["tp"];
  if (!master.includes("tp")) queue.push({ w: AREA.tp.ws[0], area: "tp", lift: A.lifts.tp, core: true, why: "Spear's core: Facially Generated Treatment Planning makes every other skill easier to sell" });
  master.forEach(id => { const a = AREA[id]; const strong = S.love.includes(id) && a.ws[1];
    queue.push({ w: strong ? a.ws[1] : a.ws[0], area: id, lift: A.lifts[id], why: strong ? "You already love this. Go straight to the advanced workshop" : "Priority " + (master.indexOf(id)+1) + " on your list" }); });
  if (S.pace >= 2) master.forEach(id => { const a = AREA[id]; if (a.ws[1] && !S.love.includes(id)) queue.push({ w: a.ws[1], area: id, lift: A.lifts[id]*A.secondWsShare, why: "Second workshop in " + a.label.toLowerCase() }); });
  if (queue.length >= 3) queue.push({ w: D.capstone, area: null, lift: A.capstoneLift, why: "Capstone that ties the year together" });
  // schedule
  const items = [];
  queue.forEach((q, i) => {
    const blk = S.pace >= 1 ? Math.floor(i / S.pace) : i*2;
    if (blk >= nBlocks) return;
    const slot = S.pace >= 2 ? (i % 2) : 0;
    const month = blk*B + 2 + slot*Math.max(1, Math.floor(B/2));
    if (month > H) return;
    items.push(Object.assign({}, q, { block: blk, month }));
  });
  return { items, nBlocks, B, H };
}
function chooseTier(items){
  const A=S.A, years=A.horizon/12;
  const tuition = it => it.w === D.foundationsWorkshop ? D.foundationsWorkshop.price : (it.w.d === 2 ? A.tuition2 : A.tuition3);
  const needTeam = S.master.includes("team") || S.role === "owner" && S.hygShare > 0 && S.master.includes("team");
  let keys = isEarly() && S.role !== "owner" && S.role !== "dso" ? ["foundations","individual","practice","faculty","allaccess"] : ["individual","practice","faculty","allaccess"];
  const rows = keys.map(k => { const t = D.tiers[k];
    const ws = items.reduce((s,it)=> s + tuition(it)*(1 - t.discount), 0);
    const ok = !needTeam || t.team;
    return { k, t, mem: t.annual*years, ws, total: t.annual*years + ws, ok }; });
  const best = rows.filter(r=>r.ok).sort((a,b)=>a.total-b.total)[0];
  return { rows, best, tuition };
}
function project(){
  const A = S.A, plan = buildPlan(), H = plan.H, d = daily();
  const tier = chooseTier(plan.items);
  const daysYr = S.days * A.weeks, monthlyBase = d * daysYr / 12;
  const hyg = S.role === "owner" ? S.hygShare : 0;
  const docM = monthlyBase*(1-hyg), hygM = monthlyBase*hyg;
  const ramps = [], hramps = [];
  plan.items.forEach(it => {
    const s = it.month + A.lagMonths;
    ramps.push({ s, r: A.rampMonths, L: it.lift*(1-A.onlineHeadStart) });
    ramps.push({ s: Math.max(1, it.month - 1) + A.lagMonths, r: 2, L: it.lift*A.onlineHeadStart });
    if (it.area === "team" && hyg > 0) hramps.push({ s, r: A.rampMonths, L: A.hygLift });
  });
  const lv = (rs, m) => 1 - rs.reduce((p, x) => p * (1 - (m < x.s ? 0 : x.L * Math.min(1, (m - x.s + 1) / x.r))), 1);
  const t = tier.best.t, disc = t.discount;
  const months = [];
  let cc = 0, cs = 0;
  for (let m = 1; m <= H; m++) {
    const dl = lv(ramps, m), hl = lv(hramps, m);
    const prod = docM*dl + hygM*hl;
    const contrib = prod * A.margin;
    let spend = A.billing === "annual" ? ((m - 1) % 12 === 0 ? t.annual : 0) : t.annual/12;
    plan.items.filter(it => it.month === m).forEach(it => {
      spend += tier.tuition(it)*(1-disc) + A.travel + (A.includeChairDays ? it.w.d * d * A.margin : 0);
    });
    cc += contrib; cs += spend;
    months.push({ m, lift: monthlyBase ? prod/monthlyBase : 0, prod, contrib, spend, cc, cs, daily: d*(1 + (monthlyBase ? prod/monthlyBase : 0)) });
  }
  const firstGain = (months.find(x => x.prod > 1) || {}).m || null;
  const pb = months.find(x => x.cs > 0 && x.cc >= x.cs);
  const y1 = months[Math.min(11, H-1)];
  const targetLift = (S.target || d) / d - 1;
  const hit = months.find(x => x.lift >= targetLift - 1e-9);
  return { plan, tier, months, firstGain, payback: pb ? pb.m : null, y1, last: months[H-1], targetLift, hit: hit ? hit.m : null, monthlyBase, d, daysYr };
}

/* ---------- charts ---------- */
function houseChart(R, scale=1, label="per doctor"){
  const NARROW = window.innerWidth < 600; const W=NARROW?440:900, Hh=NARROW?320:360, L=NARROW?54:70, Rr=20, Tp=24, Bt=40, ms=R.months, n=ms.length;
  const maxY = Math.max(...ms.map(x=>Math.max(x.cc,x.cs)))*scale*1.08 || 1;
  const X = m => L + (m)*(W-L-Rr)/n, Y = v => Tp + (Hh-Tp-Bt)*(1 - v*scale/maxY);
  const pts = k => [`${X(0)},${Y(0)}`].concat(ms.map(x=>`${X(x.m)},${Y(x[k])}`)).join(" ");
  let house = "";
  if (R.payback){ const seg = ms.filter(x=>x.m>=R.payback);
    house = `<polygon points="${seg.map(x=>`${X(x.m)},${Y(x.cc)}`).join(" ")} ${seg.slice().reverse().map(x=>`${X(x.m)},${Y(x.cs)}`).join(" ")}" fill="rgba(39,238,196,.28)"/>`; }
  const ticks = 5, grid = [...Array(ticks+1)].map((_,i)=>{ const v=maxY*i/ticks; return `<line x1="${L}" x2="${W-Rr}" y1="${Y(v/scale)}" y2="${Y(v/scale)}" stroke="#eef0f6"/><text x="${L-8}" y="${Y(v/scale)+4}" text-anchor="end" font-size="12" fill="#8a90a8">${money(v,{short:true})}</text>`; }).join("");
  const xt = ms.filter(x=>x.m%(NARROW?6:(n>12?3:2))===0).map(x=>`<text x="${X(x.m)}" y="${Hh-14}" text-anchor="middle" font-size="12" fill="#8a90a8">M${x.m}</text>`).join("");
  const ws = R.plan.items.map(it=>`<g><circle cx="${X(it.month)}" cy="${Y(ms[it.month-1].cs)}" r="5" fill="#fff" stroke="var(--orange)" stroke-width="2.5"/></g>`).join("");
  const pbm = R.payback ? `<line x1="${X(R.payback)}" x2="${X(R.payback)}" y1="${Tp}" y2="${Hh-Bt}" stroke="var(--green)" stroke-dasharray="5 5" stroke-width="2"/>
    <rect x="${Math.min(X(R.payback)+8, W-230)}" y="${Tp+4}" width="214" height="46" rx="8" fill="var(--green)"/><text x="${Math.min(X(R.payback)+20, W-218)}" y="${Tp+24}" font-size="13" font-weight="700" fill="#fff">Month ${R.payback}: paid back</text><text x="${Math.min(X(R.payback)+20, W-218)}" y="${Tp+41}" font-size="12" fill="#d6fff3">House money from here</text>` : "";
  return `<svg class="chart" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Cumulative added contribution versus cumulative Spear spend, ${label}">
    ${grid}${house}<polyline points="${pts("cs")}" fill="none" stroke="var(--orange)" stroke-width="3"/><polyline points="${pts("cc")}" fill="none" stroke="var(--blue)" stroke-width="3.5"/>${ws}${pbm}${xt}</svg>`;
}
function prodChart(R){
  const NARROW = window.innerWidth < 600; const W=NARROW?440:900, Hh=NARROW?260:300, L=NARROW?58:70, Rr=20, Tp=20, Bt=40, ms=R.months, n=ms.length, d=R.d, tgt=S.target||d;
  const lo = d*0.97, hi = Math.max(tgt, ...ms.map(x=>x.daily))*1.04;
  const X = m => L + m*(W-L-Rr)/n, Y = v => Tp + (Hh-Tp-Bt)*(1-(v-lo)/(hi-lo));
  const line = [`${X(0)},${Y(d)}`].concat(ms.map(x=>`${X(x.m)},${Y(x.daily)}`)).join(" ");
  const area = `${X(0)},${Y(lo)} ${line} ${X(n)},${Y(lo)}`;
  const grid = [0,1,2,3,4].map(i=>{ const v=lo+(hi-lo)*i/4; return `<line x1="${L}" x2="${W-Rr}" y1="${Y(v)}" y2="${Y(v)}" stroke="#eef0f6"/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#8a90a8">${money(v,{short:v>=1e4})}</text>`; }).join("");
  const xt = ms.filter(x=>x.m%(NARROW?6:(n>12?3:2))===0).map(x=>`<text x="${X(x.m)}" y="${Hh-14}" text-anchor="middle" font-size="12" fill="#8a90a8">M${x.m}</text>`).join("");
  const ws = R.plan.items.map(it=>`<line x1="${X(it.month)}" x2="${X(it.month)}" y1="${Tp}" y2="${Hh-Bt}" stroke="rgba(247,106,12,.35)" stroke-dasharray="3 4"/>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Projected daily production versus today and target">
    <defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1743d7" stop-opacity=".25"/><stop offset="1" stop-color="#1743d7" stop-opacity="0"/></linearGradient></defs>
    ${grid}${ws}<polygon points="${area}" fill="url(#g1)"/>
    <line x1="${L}" x2="${W-Rr}" y1="${Y(d)}" y2="${Y(d)}" stroke="#8a90a8" stroke-dasharray="6 6" stroke-width="2"/><text x="${W-Rr-4}" y="${Y(d)-6}" text-anchor="end" font-size="12" fill="#646366">Today ${money(d)}</text>
    <line x1="${L}" x2="${W-Rr}" y1="${Y(tgt)}" y2="${Y(tgt)}" stroke="var(--orange)" stroke-dasharray="6 6" stroke-width="2"/><text x="${L+6}" y="${Y(tgt)-6}" font-size="12" font-weight="700" fill="var(--orange)">Target ${money(tgt)}</text>
    <polyline points="${line}" fill="none" stroke="var(--blue)" stroke-width="3.5"/>${xt}</svg>`;
}

/* ---------- plan page ---------- */
function planPage(){
  if (!S.role || !(parseFloat(S.value) > 0)) { go("#/"); return; }
  document.title = "Your Spear Growth Accelerator plan (concept)";
  const R = project(), A = S.A, t = R.tier.best, d = R.d;
  const y1spend = R.y1.cs, y1c = R.y1.cc, roi = y1spend ? (y1c - y1spend)/y1spend : 0;
  const blocks = [...Array(R.plan.nBlocks)].map((_,b)=>({ b, from: b*R.plan.B+1, to: Math.min(R.plan.H,(b+1)*R.plan.B), items: R.plan.items.filter(i=>i.block===b) }));
  const summitMonth = 6; // plan starts Nov 2026; April 2027 is month 6
  const rxWorkshop = it => { const real = it.w === D.foundationsWorkshop; const list = R.tier.tuition(it); const net = list*(1-t.t.discount);
    return `<div class="rxi"><span class="t ws">Workshop</span><div><div class="n">${esc(it.w.n)}</div><div class="m">${it.w.d}-day ${esc(it.w.cat)} workshop · month ${it.month}${real?` · ${D.foundationsWorkshop.ce} CE`:""} · ${esc(it.why)}</div></div>
      <div class="c">${t.t.unlimited ? "Included" : money(net)}<small>${real ? "list $3,995 published" : "list "+money(list)+" placeholder"}${!t.t.unlimited && t.t.discount ? " · "+pct(t.t.discount,0)+" member discount" : ""}</small></div></div>`; };
  const areasIn = b => [...new Set(b.items.map(i=>i.area).filter(Boolean))];
  const blockHtml = blocks.map(b => {
    const m = R.months[b.to-1]; const ar = areasIn(b);
    const goal = b.items.length ? b.items.map(i=>i.w.n).join(" + ") : "Consolidate and compound";
    return `<div class="block"><div class="when"><span class="tag tag-assume">Block ${b.b+1}</span><b>Months ${b.from} to ${b.to}</b><div class="goal">${b.b===0?"Launch: first gain by month "+(R.firstGain||"-"):b.items.length?"Accelerate: add the next skill and put it to work":"Compound: let the gains stack"}</div><div class="gain">+${pct(m.lift)} projected by month ${b.to}</div></div>
      <div class="rx">
        ${b.b===0?`<div class="rxi"><span class="t">Membership</span><div><div class="n">${esc(t.t.name)}</div><div class="m">${esc(t.t.priceNote)}. Lowest total cost for this plan among the tiers that fit.</div></div><div class="c">${money(t.t.annual)}/yr<small>published</small></div></div>`:""}
        ${ar.map(id=>`<div class="rxi"><span class="t">Online</span><div><div class="n">Spear Online: ${esc(AREA[id].label)} course series</div><div class="m">Start the month before the workshop so you arrive ready. Course titles: placeholder.</div></div><div class="c">Included<small>in membership</small></div></div>`).join("")}
        ${b.items.map(rxWorkshop).join("")}
        ${t.t.studyClubs?`<div class="rxi"><span class="t sc">Study Club</span><div><div class="n">Spear Study Club</div><div class="m">${b.items.length?"Present one case using this block's skills.":"Monthly case reviews keep the gains sticking."}</div></div><div class="c">Included<small>${esc(t.t.name)}</small></div></div>`:""}
        ${b.b===0 && S.master.includes("team") && t.t.team?`<div class="rxi"><span class="t sc">Team</span><div><div class="n">Hygiene Excellence and role-based team training</div><div class="m">Hygiene and front office learn the same language as the doctor.</div></div><div class="c">Included<small>${esc(t.t.name)}</small></div></div>`:""}
        ${b.b===0 && t.t.navigator?`<div class="rxi"><span class="t sc">Coaching</span><div><div class="n">Spear Navigator + Practice Growth Partner + Dental Intelligence</div><div class="m">Six hours of monthly coaching and analytics to track the lift (published All Access benefits).</div></div><div class="c">Included<small>All Access</small></div></div>`:""}
        ${!b.items.length?`<div class="rxi"><span class="t">Online</span><div><div class="n">Spear Online: refresh courses in ${esc(S.master.map(i=>AREA[i].label.toLowerCase()).join(", "))}</div><div class="m">Short refreshers while the new skills become routine. Course titles: placeholder.</div></div><div class="c">Included<small>in membership</small></div></div>
          <div class="rxi"><span class="t sc">Measure</span><div><div class="n">Re-run your numbers</div><div class="m">Compare production per day to your ${money(d)} baseline${t.t.navigator?" in Dental Intelligence":""}. Adjust the next block to what moved.</div></div><div class="c">Free<small>no added cost</small></div></div>`:""}
        ${summitMonth>=b.from && summitMonth<=b.to?`<div class="rxi"><span class="t ev">Event</span><div><div class="n">${D.summit}</div><div class="m">Optional. Faculty Club includes 2 seats (published). Not in cost model.</div></div><div class="c">${t.k==="faculty"||t.k==="allaccess"?"Included":"Optional"}<small>${t.k==="faculty"||t.k==="allaccess"?"2 seats":"price not modeled"}</small></div></div>`:""}
      </div></div>`;
  }).join("");
  const tq = roleQuote();
  const others = D.testimonials.filter(x=>x.id!==tq.id && (x.for.includes(S.role) || x.for.includes("owner"))).slice(0,2);
  app.innerHTML = `
  <section class="planhero"><div class="wrap">
    ${growthMotif("plan")}<span class="eyebrow">${isDso()?"Spear Growth Accelerator · per associate · group roll-up below":"Your Spear Growth Accelerator plan"}</span>
    <h1>Your first gain in <mark>month ${R.firstGain||"-"}</mark>. ${R.payback?`Paid back by <mark>month ${R.payback}</mark>.`:`Paid back <mark>after month ${R.plan.H}</mark> at these assumptions.`}</h1>
    <p style="color:#d8defa;max-width:780px">Projected growth: +${pct(R.y1.lift)} by month 12 and +${pct(R.last.lift)} by month ${R.plan.H}. ${R.hit ? `You reach your ${money(S.target)}/day goal in month ${R.hit}.` : `That is short of your ${money(S.target)}/day goal.`} ${R.plan.items.length} hands-on workshops in ${R.plan.B}-month blocks, online courses between trips${t.t.studyClubs?", and a study club to make it stick":""}. Every month comes from your inputs and <a href="#" data-open style="color:var(--mint)">illustrative assumptions you can edit</a>.</p>
    <div class="chips"><span class="chip">${ROLE[S.role]}</span><span class="chip">Baseline ${money(d)}/day</span><span class="chip">Goal ${money(S.target)}/day (+${pct(R.targetLift)})</span><span class="chip">${S.days} days/wk</span><span class="chip">Adding: ${S.master.map(i=>AREA[i].label).join(", ")}</span></div>
  </div></section>
  <div class="wrap">
    <div class="kpis">
      <div class="kpi"><small>First gain</small><div class="v">Month ${R.firstGain||"-"}</div><div class="d">When added production starts</div></div>
      <div class="kpi hl"><small>Payback month</small><div class="v">${R.payback?"Month "+R.payback:"After "+R.plan.H}</div><div class="d">Your gains have paid for the courses</div></div>
      <div class="kpi"><small>Growth by month 12</small><div class="v">+${pct(R.y1.lift)}</div><div class="d">${money(R.y1.daily)}/day vs ${money(d)} at the start</div></div>
      <div class="kpi"><small>House money, month ${R.plan.H}</small><div class="v">${money(R.last.cc-R.last.cs,{short:true})}</div><div class="d">Gains kept after every Spear dollar is repaid</div></div>
    </div>
    ${!R.hit?`<div class="notice">At these assumptions you reach +${pct(R.last.lift)} by month ${R.plan.H}, short of your +${pct(R.targetLift)} goal. To accelerate, try Maximum acceleration, add a growth area, or check the assumptions.</div>`:""}

    <div class="panel"><div class="panel-head"><div><h2 style="margin:0">When your growth pays for the courses</h2><p class="muted" style="margin:.3em 0 0">Cumulative added contribution vs cumulative Spear spend (membership, tuition, travel${A.includeChairDays?", chair days out":""}). Where the blue line crosses the orange, Spear has paid for itself.</p></div>
      <div class="legend"><span><i style="background:var(--blue)"></i>Added contribution</span><span><i style="background:var(--orange)"></i>Spear spend</span><span><i style="background:rgba(39,238,196,.6);height:10px"></i>House money</span><span><i style="background:#fff;border:2px solid var(--orange);width:10px;height:10px;border-radius:50%"></i>Workshop</span></div></div>
      ${houseChart(R)}
      <p class="hint" style="text-align:left">Contribution = added production × ${pct(A.margin,0)} margin <span class="tag tag-assume">assumption</span>. Year 1: ${money(y1c)} contribution on ${money(y1spend)} spend, ROI ${pct(roi,0)}.</p></div>

    <div class="panel"><div class="panel-head"><div><h2 style="margin:0">Your growth curve</h2><p class="muted" style="margin:.3em 0 0">Projected daily production by month vs your baseline and goal. Dotted lines mark workshops.</p></div></div>${prodChart(R)}</div>

    <div class="panel"><div class="panel-head"><div><h2 style="margin:0">Your growth plan</h2><p class="muted" style="margin:.3em 0 0">Real Spear workshop names and durations from the campus catalog. Only the Foundations workshop price and membership prices are published; other tuition is a placeholder.</p></div>
      <div class="toggle" style="margin:0"><button data-b="4" class="${S.block==4?"on":""}">4-month blocks</button><button data-b="6" class="${S.block==6?"on":""}">6-month blocks</button></div></div>
      <div class="blocks">${blockHtml}</div></div>

    <div class="section" style="padding:40px 0 10px">${bigquote(tq)}
      <div class="tgrid" style="margin-top:18px">${others.map(x=>tcard(x)).join("")}${phcard("Example testimonial")}</div></div>

    <div class="two">
      <div class="panel"><h3>Why ${esc(t.t.name)}?</h3><p class="muted" style="margin-top:0">Total ${R.plan.H}-month cost for this exact plan, by tier. Membership prices and discounts are published; tuition other than Foundations is a placeholder.</p>
        <table class="t"><tr><th>Tier</th><th>Membership</th><th>Tuition after discount</th><th>Total</th></tr>
        ${R.tier.rows.map(r=>`<tr style="${r.k===t.k?"font-weight:700;color:var(--blue)":""}${!r.ok?";opacity:.5":""}"><td>${esc(r.t.name)}${r.k===t.k?" ✓":""}${!r.ok?" (no team training)":""}</td><td>${money(r.mem)}</td><td>${r.t.unlimited?"Unlimited":money(r.ws)}</td><td>${money(r.total)}</td></tr>`).join("")}</table></div>
      <div class="panel"><h3>The math</h3><div class="formula">
        Percent lift = (post − baseline) ÷ baseline<br>
        Added production = monthly baseline × lift<br>
        Contribution = added production × margin<br>
        Spend = membership + tuition + travel + chair days out × daily production × margin<br>
        ROI = (contribution − spend) ÷ spend<br>
        Payback = first month cumulative contribution ≥ cumulative spend</div>
        <p class="hint" style="text-align:left">Standard percent-lift, ROI and payback math. Lifts combine as 1 − Π(1 − lift) so they don't simply stack.</p>
        <button class="btn btn-line btn-sm" data-open>Open assumptions</button></div>
    </div>

    <div class="panel ${S.showDso?"dso":""}" id="dsoPanel"><div class="panel-head"><div><h2 style="margin:0">Group growth (DSO)</h2><p class="muted" style="margin:.3em 0 0">Scale this plan across doctors and locations: payback and house money for the whole group.</p></div>
      <label class="toggle" style="margin:0"><button id="dsoT" class="${S.showDso?"on":""}">${S.showDso?"On":"Show DSO view"}</button></label></div>
      ${S.showDso ? dsoHtml(R) : ""}</div>

    <div class="panel" style="text-align:center;background:linear-gradient(135deg,#fff,#eef2ff)"><h2>Ready to accelerate your growth?</h2><p class="muted">Month 1 starts when you do. A Spear advisor can confirm dates, real tuition and which membership fits.</p>
      <div class="endcta" style="justify-content:center"><a class="btn btn-orange" href="https://www.speareducation.com/request-information/" target="_blank" rel="noopener">Talk to a Spear advisor</a><button class="btn btn-line" id="emailme">Email me this plan</button><a class="btn btn-line" href="#/step/1">Edit my answers</a></div></div>
  </div>
  <button class="btn drawer-btn" data-open>⚙ Assumptions</button>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Assumptions"><header><div><b>Assumptions</b><div class="muted" style="font-size:.8rem">Illustrative. Edit any value. Spear must supply real cohort data.</div></div><button class="btn btn-sm" id="closeD">Done</button></header><div class="body">${drawerHtml()}</div></aside>`;
  bindPlan();
}
function dsoHtml(R){
  const A=S.A, n=S.dso.doctors*S.dso.adoption, last=R.last, y1=R.y1;
  const fee=A.dsoProgramFee, ret=A.dsoReplacement*A.dsoRetentionLift*S.dso.doctors; // annual retention value
  const H=R.plan.H;
  const cum = R.months.map(x=>({ m:x.m, cc: x.cc*n + ret*x.m/12, cs: x.cs*n + fee }));
  const pb = cum.find(x=>x.cs>0 && x.cc>=x.cs);
  const y=cum[Math.min(11,H-1)], L=cum[H-1];
  const roi = (y.cc-y.cs)/y.cs;
  const Rd = Object.assign({}, R, { months: R.months.map((x,i)=>Object.assign({},x,{cc:cum[i].cc,cs:cum[i].cs})), payback: pb?pb.m:null });
  return `<div class="dso-grid">
    <div class="fld"><label>Doctors</label><input data-dso="doctors" type="number" min="1" value="${S.dso.doctors}"></div>
    <div class="fld"><label>Locations</label><input data-dso="locations" type="number" min="1" value="${S.dso.locations}"></div>
    <div class="fld"><label>Completion rate %</label><input data-dso="adoption" type="number" min="0" max="100" value="${Math.round(S.dso.adoption*100)}"></div>
    <div class="fld"><label>Program fee, one-time <span class="tag tag-ph">placeholder</span></label><input data-a="dsoProgramFee" type="number" min="0" value="${A.dsoProgramFee}"></div>
  </div>
  <div class="kpis" style="margin-top:16px">
    <div class="kpi"><small>Doctors in the program</small><div class="v">${Math.round(n)}</div><div class="d">${S.dso.locations} locations · ${(n/S.dso.locations).toFixed(1)} per location</div></div>
    <div class="kpi hl"><small>Group payback</small><div class="v">${pb?"Month "+pb.m:"After "+H}</div><div class="d">When the group's gains have paid for the program</div></div>
    <div class="kpi"><small>Year 1 ROI</small><div class="v">${pct(roi,0)}</div><div class="d">${money(y.cc,{short:true})} contribution on ${money(y.cs,{short:true})} spend</div></div>
    <div class="kpi"><small>House money, ${H} months</small><div class="v">${money(L.cc-L.cs,{short:true})}</div><div class="d">${money((L.cc-L.cs)/S.dso.locations,{short:true})} per location</div></div>
  </div>
  ${houseChart(Rd,1,"DSO total")}
  <p class="hint" style="text-align:left">Per-doctor plan × doctors × completion rate. Enterprise pricing and the Associate Foundations Program price are not published, so per-doctor cost uses the individual plan above plus the one-time fee you enter. Retention value (replacement cost × retention lift) is off by default: add your own in Assumptions. Real proof points to cite: Select Dental (12% daily production in 3 months, 10-doctor pilot), NADG (new-clinician retention up from about 70% to 80-85%).</p>
  <div class="tgrid" style="margin-top:12px">${[T("ponzio"),T("dudley"),T("portnoff")].map(x=>tcard(x)).join("")}</div>`;
}
function drawerHtml(){
  const A=S.A;
  const f=(k,label,sub,step=0.01,mult=1,suffix="")=>`<div class="fld"><label>${label}${sub?`<small>${sub}</small>`:""}</label><input data-a="${k}" data-mult="${mult}" type="number" step="${step}" value="${+(A[k]*mult).toFixed(4)}"></div>`;
  return `<h4>Economics</h4>
    ${f("margin","Incremental contribution margin %","Share of added production you keep",1,100)}
    ${f("weeks","Working weeks per year","",1)}
    ${f("travel","Travel per campus trip ($)","Placeholder",50)}
    <div class="fld"><label>Count chair days out as a cost<small>days × daily production × margin</small></label><select data-a="includeChairDays"><option value="1" ${A.includeChairDays?"selected":""}>Yes</option><option value="0" ${!A.includeChairDays?"selected":""}>No</option></select></div>
    <div class="fld"><label>Membership billing</label><select data-a="billing"><option value="monthly" ${A.billing==="monthly"?"selected":""}>Spread monthly</option><option value="annual" ${A.billing==="annual"?"selected":""}>Annual upfront</option></select></div>
    ${f("horizon","Horizon (months)","12 to 36",1)}
    <h4>Tuition <span class="tag tag-ph">placeholder</span></h4>
    ${f("tuition2","2-day workshop list price ($)","Default mirrors the published Foundations price",50)}
    ${f("tuition3","3-day workshop list price ($)","Not yet published by Spear",50)}
    <h4>Timing <span class="tag tag-assume">illustrative</span></h4>
    ${f("lagMonths","Months from workshop to first gain","",1)}
    ${f("rampMonths","Months to full effect","",1)}
    ${f("onlineHeadStart","Share of gain from online prep %","Starts the month before the workshop",1,100)}
    <h4>Lift at full effect, % of doctor production <span class="tag tag-assume">illustrative</span></h4>
    ${D.areas.map(a=>`<div class="fld"><label>${a.label}</label><input data-lift="${a.id}" type="number" step="0.5" value="${+(A.lifts[a.id]*100).toFixed(2)}"></div>`).join("")}
    ${f("foundationsLift","Foundations workshop","Early career",0.5,100)}
    ${f("capstoneLift","Advanced Treatment Planning capstone","",0.5,100)}
    ${f("secondWsShare","Second workshop in same area, % of first","",5,100)}
    ${f("hygLift","Hygiene lift from team training %","Applies to hygiene production",0.5,100)}
    <h4>DSO <span class="tag tag-ph">placeholder</span></h4>
    ${f("dsoReplacement","Cost to replace an associate ($)","Enter yours",1000)}
    ${f("dsoRetentionLift","Retention improvement, points %","e.g. NADG reports ~70% to 80-85%",1,100)}
    <p class="hint" style="text-align:left;margin-top:18px">Benchmarks Spear has published, for context only: Select Dental pilot (10 doctors) +12% daily production in 3 months; P1 Dental production per hour +10% to over 40% by doctor. These are not inputs. Spear must supply cohort n, baseline, time window, mean and median, and a comparison group before any default here is replaced with "real" numbers.</p>
    <button class="btn btn-line btn-sm" id="resetA" style="margin-top:12px">Reset assumptions</button>`;
}
function bindPlan(){
  const open = () => { $("#drawer").classList.add("open"); $("#scrim").classList.add("on"); };
  const close = () => { $("#drawer").classList.remove("open"); $("#scrim").classList.remove("on"); };
  app.querySelectorAll("[data-open]").forEach(b=>b.onclick=e=>{e.preventDefault();open();});
  $("#closeD").onclick=close; $("#scrim").onclick=close;
  app.querySelectorAll(".panel [data-b]").forEach(b=>b.onclick=()=>{ S.block=+b.dataset.b; save(); rerender(); });
  $("#dsoT").onclick=()=>{ S.showDso=!S.showDso; save(); rerender(); if(S.showDso) setTimeout(()=>$("#dsoPanel").scrollIntoView({behavior:"smooth"}),60); };
  $("#emailme").onclick=()=>toast("Prototype: no email is collected. In production this would save the plan.");
  const onA = e => { const el=e.target; let v=el.value;
    if (el.dataset.lift) { S.A.lifts[el.dataset.lift]=(parseFloat(v)||0)/100; }
    else if (el.dataset.a) { const k=el.dataset.a;
      if (k==="includeChairDays") S.A[k]=v==="1"; else if (k==="billing") S.A[k]=v;
      else { let n=(parseFloat(v)||0)/(parseFloat(el.dataset.mult)||1); if(k==="horizon") n=Math.max(12,Math.min(36,Math.round(n))); S.A[k]=n; } }
    else if (el.dataset.dso) { const k=el.dataset.dso; S.dso[k]= k==="adoption" ? Math.min(1,(parseFloat(v)||0)/100) : Math.max(1,parseFloat(v)||1); }
    save(); rerender(true); };
  app.querySelectorAll("#drawer input, #drawer select, #dsoPanel input").forEach(i=>i.addEventListener("change", onA));
  const r=$("#resetA"); if(r) r.onclick=()=>{ const f=fresh(); S.A=f.A; save(); rerender(true); };
}
function rerender(keepDrawer){
  const y=window.scrollY, wasOpen=$("#drawer")&&$("#drawer").classList.contains("open"), ds=$("#drawer .body")?$("#drawer .body").scrollTop:0;
  planPage(); window.scrollTo(0,y);
  if (keepDrawer && wasOpen){ $("#drawer").classList.add("open"); $("#scrim").classList.add("on"); $("#drawer .body").scrollTop=ds; }
}

/* ---------- router ---------- */
function render(){
  if (building._stop) { building._stop(); building._stop = null; }
  const h = location.hash || "#/";
  document.body.classList.toggle("in-funnel", /^#\/step/.test(h));
  let m;
  if ((m = h.match(/^#\/step\/(\d+)/))) stepView(+m[1]);
  else if (h === "#/building") building();
  else if (h === "#/plan") planPage();
  else landing();
}
window.addEventListener("hashchange", render);
document.addEventListener("keydown", e => { if (e.key === "Enter" && /#\/step/.test(location.hash) && !e.target.matches("button")) { e.preventDefault(); next(); } });
render();
})();
