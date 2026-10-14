// Edit these: fest date and the sample fest events
var TARGET=new Date(Date.now()+50*864e5); // replace with new Date("2027-02-20T09:00:00+05:30")
var EVENTS=[
["CodeCombat Hackathon","Technical","24-hour team build on a campus problem.","Computer Science Lab"],
["RoboWars","Technical","Bot-versus-bot arena battles.","Main Ground"],
["Web Design Sprint","Technical","Ship a landing page in 3 hours.","Computer Lab 2"],
["Street Choreography","Cultural","Group dance on the open stage.","Open Air Stage"],
["Battle of Bands","Cultural","Live music, 8 minutes per band.","Auditorium"],
["Rangoli and Mehendi","Cultural","Design contest with a fest theme.","Corridor Hall"],
["Inter-College Cricket","Sports","Knockout tournament, 6 overs a side.","College Ground"],
["Kabaddi Cup","Sports","Seven-a-side league matches.","Sports Complex"],
["Chess Open","Sports","Rapid format, 7 rounds.","Seminar Hall"]];
// Real events from pdeabgcollege.edu.in (college activity pages). Year = from report name or listed date.
var HIST=[
["Computer Science","Two-day workshop on Internet of Things (IoT)","2018-19","Workshop with a report and photos on the college site."],
["Computer Science","Quick Heal Foundation MoU workshop","2018-19","Workshop held under an MoU with Quick Heal Foundation."],
["Computer Science","One-day seminar: career guidance and opportunities in IT","2020","Career seminar for IT students."],
["Computer Science","Project guidance on Angular JS, Web API, PHP and Android","2020","Hands-on problem solving for student projects."],
["Computer Science","Workshop: Web Technology with live project development","2021-22","Live project development session."],
["NSS Committee","National Co-operative Conference at villages Chale, Lavale, Chande, Dongargaon","25 Sep 2021","NSS outreach event in nearby villages."],
["NSS Committee","One-day workshop on the Scheme of Adoption of Historical Sites","2021-22","Part of the NSS historical sites programme."],
["NSS Committee","Five-day workshop on Adoption of Historical Places","NSS record","Report and photos on the college site."],
["NSS Committee","University-level three-day workshop at Harishchandra Gad","NSS record","Trekking and nature study camp."],
["Computer Science","Short-term course: Augmented Reality and Virtual Reality","2022-23","Short course for students."],
["Computer Science","One-day workshop on Salesforce and cloud computing","College record","Cloud and CRM workshop."],
["Computer Science","IoT workshop","Feb 2024","Latest listed Computer Science event."]];
var PHOTOS=[["College campus",""],["IGNITE opening",""],["Hackathon",""],["Dance stage",""],["Sports ground",""],["Prize ceremony",""]]; // second value: a data:image/jpeg;base64,... string
var DEPTS="Economics, History, Geography, Political Science, Marathi, English, Commerce, BBA(CA), Chemistry, Physics, Botany, Zoology, Computer Science, Electronics, Statistics, Mathematics, Physical Education, B.Voc programmes, Biomedical Instrumentation (Advanced Diploma)".split(", ");
var $=function(s,r){return(r||document).querySelector(s)};
var picks=[];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function load(){try{return JSON.parse(localStorage.getItem("ignite-regs")||"[]")}catch(e){return[]}}
function save(a){try{localStorage.setItem("ignite-regs",JSON.stringify(a))}catch(e){}}
var tick;
var pages={
home:function(){return '<section class="hero"><h1 aria-label="IGNITE 2027">'+"IGNITE 2027".split("").map(function(c,i){return '<span style="animation-delay:'+i*70+'ms">'+(c==" "?"&nbsp;":c)+"</span>"}).join("")+'</h1><p>National Annual Fest of Baburaoji Gholap College, Sangvi, Pune. Technical, cultural and sports events in one place.</p><a class="btn" href="#events">Browse events</a><a class="btn alt" href="#register">Register now</a><div class="count" id="cd" role="timer" aria-label="Time until fest"></div></section><h2>About the host college</h2><div class="grid"><div class="card"><h3>NAAC Grade B</h3><p>Established June 1989. Institute code AYU0149. Affiliated to Savitribai Phule Pune University.</p></div><div class="card"><h3>Awards and schemes</h3><p>Best College Award (SPPU), DBT Star College, DST-FIST support, state award "Jagar Janivancha" twice.</p></div><div class="card"><h3>Past events</h3><p>See '+HIST.length+' real workshops and seminars on the <a href="#history">history page</a>.</p></div></div>'},
events:function(){return '<h2>Events</h2><div class="filters" role="group" aria-label="Filter events">'+["All","Technical","Cultural","Sports"].map(function(c,i){return '<button aria-pressed="'+(i==0)+'" data-f="'+c+'">'+c+"</button>"}).join("")+'</div><div class="grid">'+EVENTS.map(function(e,i){return '<article class="card ev" data-category="'+e[1]+'"><span class="tag">'+e[1]+"</span><h3>"+e[0]+"</h3><p>"+e[2]+'</p><p>Venue: '+e[3]+'</p><button class="btn sm" data-add="'+i+'">'+(picks.indexOf(e[0])>-1?"Added":"Add to my picks")+"</button></article>"}).join("")+"</div>"},
register:function(){var r=load();return '<h2>Register</h2><form id="reg" novalidate><label for="n">Full name</label><input id="n" type="text" autocomplete="name"><div class="err"></div><label for="m">College email (.edu or .in)</label><input id="m" type="email" autocomplete="email"><div class="err"></div><label for="p">Mobile (10 digits)</label><input id="p" type="tel" autocomplete="tel"><div class="err"></div><fieldset style="border:0;margin-top:1rem"><legend>Events</legend><div class="pick">'+EVENTS.map(function(e){return '<label><input type="checkbox" value="'+e[0]+'"'+(picks.indexOf(e[0])>-1?" checked":"")+"> "+e[0]+"</label>"}).join("")+'</div><div class="err" id="ee"></div></fieldset><button class="btn" type="submit">Get my ticket</button></form><div id="tk" aria-live="polite"></div>'+(r.length?'<h2 class="noprint">Saved on this device</h2><div class="grid noprint">'+r.map(function(x,i){return '<div class="card"><h3>'+esc(x.id)+"</h3><p>"+esc(x.name)+'</p><button class="btn sm" data-open="'+i+'">Open</button><button class="btn sm alt" data-del="'+i+'">Remove</button></div>'}).join("")+"</div>":"")},
history:function(){return '<h2>Past college events</h2><p class="muted">Real events listed on the college website, from the Computer Science and NSS pages. Reports and photos are on <a href="https://www.pdeabgcollege.edu.in/CollegeActivity">the college activity page</a>. Other departments hold more.</p><div class="filters" role="group" aria-label="Filter history">'+["All","Computer Science","NSS Committee"].map(function(c,i){return '<button aria-pressed="'+(i==0)+'" data-h="'+c+'">'+c+"</button>"}).join("")+'</div><div class="tl">'+HIST.map(function(h){return '<article class="card ev" data-category="'+h[0]+'"><span class="tag">'+h[0]+"</span><h3>"+h[1]+'</h3><p><b>When:</b> '+h[2]+"</p><p>"+h[3]+"</p></article>"}).join("")+"</div>"},
college:function(){return '<h2>Baburaoji Gholap College</h2><div class="card"><dl><dt>Run by</dt><dd>Pune District Education Association (PDEA)</dd><dt>Address</dt><dd>Sangvi, Pune 411027, Maharashtra</dd><dt>Phone</dt><dd>020-2728 0204 (fax 020-2728 1722)</dd><dt>Email</dt><dd><a href="mailto:bgc_sangvi@pdeapune.org">bgc_sangvi@pdeapune.org</a></dd><dt>Principal</dt><dd>Dr. P. N. Shelke</dd><dt>PDEA President</dt><dd>Hon. Sunetra Ajit Pawar</dd><dt>Status</dt><dd>NAAC Grade B, est. 1989, SPPU affiliated, NIRF listed</dd><dt>Website</dt><dd><a href="https://www.pdeabgcollege.edu.in/">pdeabgcollege.edu.in</a></dd></dl></div><h2>Departments and programmes</h2><div class="grid">'+DEPTS.map(function(d){return '<div class="card"><h3 style="font-size:.95rem">'+d+"</h3></div>"}).join("")+"</div>"},
about:function(){return '<h2>About us</h2><div class="card"><h3>IGNITE 2027</h3><p>IGNITE is the National Annual Fest of Baburaoji Gholap College, Sangvi, Pune. It brings students from many colleges together for technical, cultural and sports events.</p></div><h2>About the college</h2><div class="card"><p>Baburaoji Gholap College is run by the Pune District Education Association (PDEA). It was established in June 1989, holds NAAC Grade B, and is affiliated to Savitribai Phule Pune University. It has received the SPPU Best College Award, is a DBT Star College, and has DST-FIST support.</p><p style="margin-top:.6rem">Read more on the <a href="https://www.pdeabgcollege.edu.in/AboutCollege.jsp">college website</a>.</p></div><h2>Built by</h2><div class="card"><p>Developed by Sumedh Dhamdhere.</p></div>'},
contact:function(){return '<h2>Contact us</h2><div class="card"><dl><dt>College</dt><dd>Baburaoji Gholap College, Sangvi, Pune 411027, Maharashtra</dd><dt>Phone</dt><dd><a href="tel:+912027280204">020-2728 0204</a></dd><dt>Fax</dt><dd>020-2728 1722</dd><dt>Email</dt><dd><a href="mailto:bgc_sangvi@pdeapune.org">bgc_sangvi@pdeapune.org</a></dd><dt>Map</dt><dd><a href="https://www.google.com/maps/search/?api=1&query=Baburaoji+Gholap+College+Sangvi+Pune">Open in Google Maps</a></dd></dl></div><h2>Send a message</h2><form id="msg" novalidate><label for="cn">Your name</label><input id="cn" type="text"><label for="cm">Message</label><textarea id="cm" rows="4" style="width:100%;padding:.65rem;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit"></textarea><div class="err" id="ce"></div><button class="btn" type="submit">Open email</button></form>'},
gallery:function(){return '<h2>Gallery</h2><p class="muted">Add your photos to the <code>PHOTOS</code> list in the script. Until then these slots stay empty.</p><div class="grid gal">'+PHOTOS.map(function(p){return p[1]?'<figure><img src="'+p[1]+'" alt="'+esc(p[0])+'"><figcaption class="muted">'+esc(p[0])+'</figcaption></figure>':'<div class="ph">Photo slot: '+esc(p[0])+'</div>'}).join("")+'</div>'},
design:function(){return '<h2>Design system</h2><div class="sw">'+[["#0f172a","Background"],["#1e293b","Panel"],["#f8fafc","Text"],["#6366f1","Indigo"],["#06b6d4","Cyan"]].map(function(c){return '<div><i style="background:'+c[0]+'"></i><small>'+c[1]+"<br>"+c[0]+"</small></div>"}).join("")+'</div><h2>Type and buttons</h2><p>Poppins 400, 500, 600, 700. Headings scale with the screen width.</p><a class="btn" href="#design">Primary</a><a class="btn alt" href="#design">Secondary</a><h2>Features</h2><ul class="muted" style="padding-left:1.2rem"><li>Live countdown, event filters, saved picks</li><li>Validated form with a printable ticket stored in localStorage</li><li>History timeline, light and dark theme, keyboard and reduced-motion support</li></ul>'}
};
function show(){
var k=(location.hash||"#home").slice(1);if(!pages[k])k="home";
clearInterval(tick);$("#app").innerHTML=pages[k]();
document.querySelectorAll("nav a").forEach(function(a){a.toggleAttribute("aria-current",a.getAttribute("href")=="#"+k);if(a.hasAttribute("aria-current"))a.setAttribute("aria-current","page")});
if(k=="home"){var f=function(){var d=Math.max(0,TARGET-Date.now()),v=[[864e5,"Days"],[36e5,"Hours"],[6e4,"Min"],[1e3,"Sec"]];$("#cd").innerHTML=v.map(function(u){var n=Math.floor(d/u[0]);d-=n*u[0];return "<div><strong>"+String(n).padStart(2,"0")+"</strong>"+u[1]+"</div>"}).join("")};f();tick=setInterval(f,1000)}
window.scrollTo(0,0)}
function ticket(x){return '<div class="ticket" id="tkt"><h3>IGNITE 2027 ticket</h3><p><b>'+esc(x.id)+"</b></p><p>"+esc(x.name)+" | "+esc(x.email)+" | "+esc(x.phone)+"</p><p>Events: "+esc(x.events.join(", "))+'</p><button class="btn sm noprint" onclick="window.print()">Print ticket</button></div>'}
function check(el){var v=el.value.trim(),m="";
if(el.id=="n"&&v.length<3)m="Enter your full name.";
if(el.id=="m"&&!/^[^@\s]+@[^@\s]+\.(edu|in)$/i.test(v))m="Use an email ending in .edu or .in.";
if(el.id=="p"&&!/^[6-9]\d{9}$/.test(v))m="Enter a 10-digit mobile number.";
el.className=m?"bad":"good";el.nextElementSibling.textContent=m;return!m}
document.addEventListener("click",function(e){var t=e.target;
if(t.id=="theme"){var r=document.documentElement;r.dataset.theme=r.dataset.theme=="light"?"dark":"light"}
if(t.dataset.f){document.querySelectorAll("[data-f]").forEach(function(b){b.setAttribute("aria-pressed",b==t)});document.querySelectorAll(".ev").forEach(function(c){c.classList.toggle("hide",t.dataset.f!="All"&&c.dataset.category!=t.dataset.f)})}
if(t.dataset.h){document.querySelectorAll("[data-h]").forEach(function(b){b.setAttribute("aria-pressed",b==t)});document.querySelectorAll(".ev").forEach(function(c){c.classList.toggle("hide",t.dataset.h!="All"&&c.dataset.category!=t.dataset.h)})}
if(t.dataset.add){var n=EVENTS[t.dataset.add][0],i=picks.indexOf(n);if(i<0)picks.push(n);else picks.splice(i,1);t.textContent=i<0?"Added":"Add to my picks"}
if(t.dataset.open){$("#tk").innerHTML=ticket(load()[t.dataset.open]);$("#tkt").scrollIntoView()}
if(t.dataset.del){var a=load();a.splice(t.dataset.del,1);save(a);show()}});
document.addEventListener("focusout",function(e){var t=e.target;if(t.closest&&t.closest("#reg")&&/^[nmp]$/.test(t.id))check(t)});
document.addEventListener("submit",function(e){e.preventDefault();if(e.target.id=="msg"){var n=$("#cn").value.trim(),m=$("#cm").value.trim();if(!n||!m){$("#ce").textContent="Enter your name and a message.";return}location.href="mailto:bgc_sangvi@pdeapune.org?subject="+encodeURIComponent("IGNITE 2027 enquiry from "+n)+"&body="+encodeURIComponent(m);return}var f=e.target,ok=["n","m","p"].map(function(i){return check($("#"+i,f))}).every(Boolean);
var ev=[].map.call(f.querySelectorAll("[type=checkbox]:checked"),function(c){return c.value});
$("#ee").textContent=ev.length?"":"Pick at least one event.";if(!ok||!ev.length)return;
var x={id:"#IGNITE-"+Math.random().toString(36).slice(2,6).toUpperCase(),name:$("#n").value.trim(),email:$("#m").value.trim(),phone:$("#p").value.trim(),events:ev},a=load();a.push(x);save(a);picks=[];
$("#tk").innerHTML=ticket(x);$("#tkt").scrollIntoView()});
window.addEventListener("hashchange",show);show();
