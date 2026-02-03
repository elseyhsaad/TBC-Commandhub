// ---------- Mock Data ----------
let state = {
  annualTarget: 1000000,
  annualAchieved: 640000,

  campaigns: [
    { name: "VIP World Wild Challenge", status: "active" },
    { name: "Bullion Quest Challenge", status: "prep" },
    { name: "Elite Bullion Challenge", status: "ended" },
  ],

  eventsPrivate: [
    { name: "Gold Backed – Board", date: "2026-06-18", reg: "Open" },
    { name: "Safe Wealth Dinner", date: "2026-03-03", reg: "Waitlist" },
  ],

  eventsPublic: [
    { name: "TBC Gala Night", date: "2026-05-14", reg: "Open" },
    { name: "Golden Public Networking", date: "2026-02-01", reg: "Closed" },
  ],

  posts: [
    {
      id: 1,
      title: "نظام التقارير الجديد",
      body: "تم تفعيل نظام التقارير. الرجاء مراجعة تقارير الأداء والمبيعات شهرياً.",
      date: "2026-01-06",
      isNew: true,
      acknowledged: false,
      comments: [
        { by: "Company", text: "تم الاستلام، شكراً." }
      ]
    },
    {
      id: 2,
      title: "تنبيه فعاليات فبراير",
      body: "فتح التسجيل لفعاليات فبراير. يرجى تأكيد الحضور قبل نهاية الشهر.",
      date: "2026-01-05",
      isNew: false,
      acknowledged: true,
      comments: [
        { by: "Company", text: "تمت المراجعة. سنؤكد خلال يومين." }
      ]
    },
    {
      id: 3,
      title: "تحديث سياسات الخصوصية",
      body: "تم تحديث سياسات الخصوصية والصلاحيات. الرجاء مراجعة Privacy & Security.",
      date: "2026-01-02",
      isNew: false,
      acknowledged: false,
      comments: []
    },
  ],

  selectedPostId: null,
};

function applyManualAnnualPercent(){
  const p = Math.max(0, Math.min(100, MANUAL_ANNUAL_PERCENT));
  state.annualAchieved = (state.annualTarget * p) / 100;
}
const MANUAL_ANNUAL_PERCENT = 7.4;


// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

function moneyEUR(n){
  // simple format (no i18n libs)
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$ " + s;
}

function toast(msg){
  const el = $("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add("hidden"), 2400);
}

function openModal(title, bodyHtml, actions = []){
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = bodyHtml;

  const act = $("modalActions");
  act.innerHTML = "";
  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.className = a.className || "ghost";
    btn.textContent = a.label;
    btn.type = "button";
    btn.addEventListener("click", () => a.onClick?.());
    act.appendChild(btn);
  });

  $("modalBackdrop").classList.remove("hidden");
}

function closeModal(){
  $("modalBackdrop").classList.add("hidden");
}

// ---------- Header Menu ----------
const menuBtn = $("menuBtn");
const menu = $("menu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  menu.setAttribute("aria-hidden", open ? "false" : "true");
});

document.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");
});

menu.addEventListener("click", (e) => e.stopPropagation());

menu.querySelectorAll(".menu-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const act = btn.dataset.action;
    menu.classList.remove("open");

    if (act === "profile") {
  openModal(
    "White Ocean Strategy – TBC",
    `
    <iframe 
      src="white-ocean.html"
      style="width:100%;height:70vh;border:0;"
      loading="lazy"
    ></iframe>
    `,
    [
      { label: "Close", className: "ghost", onClick: closeModal }
    ]
  );

      setTimeout(() => {
        document.getElementById("renameBtn")?.addEventListener("click", () => {
          const v = prompt("Company name:", $("companyName").textContent);
          if (v) {
            $("companyName").textContent = v;
            toast("Company name updated");
          }
        });

        document.getElementById("levelBtn")?.addEventListener("click", () => {
          const v = prompt(
            "Level / Tier:",
            $("companyLevel").textContent.replace("Level: ", "")
          );
          if (v) {
            $("companyLevel").textContent = "Level: " + v;
            toast("Level updated");
          }
        });
      }, 0);

    } else if (act === "privacy") {
      openModal(
        "About Us",
        `
       <iframe 
      src="aboutus.html"
      style="width:100%;height:70vh;border:0;"
      loading="lazy"
    ></iframe>
        `,
        [{ label: "Close", className: "ghost", onClick: closeModal }]
      );

    } else if (act === "partnerships") {
      openModal(
        "Privacy Policy",
       `
       <iframe 
      src="Privacy-Policy.html"
      style="width:100%;height:70vh;border:0;"
      loading="lazy"
    ></iframe>
        `,
        [{ label: "Close", className: "ghost", onClick: closeModal }]
      );
      } else if (act === "terms") {
  openModal(
    "Terms & Conditions – TBC",
    `
    <iframe 
      src="TermsConditions.html"
      style="width:100%;height:70vh;border:0;"
      loading="lazy"
    ></iframe>
    `,
    [
      { label: "Close", className: "ghost", onClick: closeModal }
    ]
  );

} else if (act === "dpo") {
  openModal(
    "Data Protection Officer (DPO)",
    `
    <iframe 
      src="dpo.html"
      style="width:100%;height:70vh;border:0;"
      loading="lazy"
    ></iframe>
    `,
    [
      { label: "Close", className: "ghost", onClick: closeModal }
    ]
  );


    } else if (act === "logout") {
      // ✅ LOGOUT CONFIRMATION
      openModal(
        "تسجيل الخروج",
        `<div style="font-size:15px">هل تريد تسجيل الخروج؟</div>`,
        [
          {
            label: "إلغاء",
            className: "ghost",
            onClick: closeModal
          },
          {
            label: "تسجيل الخروج",
            className: "cta small",
            onClick: () => {
              closeModal();

              // session temizle
              localStorage.removeItem("tbc_logged_in");
              localStorage.removeItem("tbc_user_email");

              // login sayfasına yönlendir
              window.location.href = "login.html";
            }
          }
        ]
      );
    }
  });
});


// Logo change (mock)
const changeLogoBtn = $("changeLogoBtn");
if (changeLogoBtn) {
  changeLogoBtn.addEventListener("click", () => {
    const v = prompt("Type logo text (e.g., ABC):", "TBC");
    if(v){
      const logo = document.querySelector(".logo");
      if(logo) logo.textContent = v.toUpperCase();
      toast("Logo updated");
    }
  });
}

$("modalClose").addEventListener("click", closeModal);
$("modalBackdrop").addEventListener("click", (e) => {
  if(e.target.id === "modalBackdrop") closeModal();
});

// ---------- Render Campaigns ----------
function statusTag(status){
  const map = {
    active: { label: "Active", cls: "tag active" },
    ended:  { label: "Ended",  cls: "tag ended"  },
    prep:   { label: "Prep",   cls: "tag prep"   },
  };
  return map[status] || { label: status, cls:"tag" };
}

function renderCampaigns(){
  const ul = $("campaignList");
  ul.innerHTML = "";
  state.campaigns.forEach((c) => {
    const li = document.createElement("li");
    li.className = "li";
    const t = statusTag(c.status);
    li.innerHTML = `
      <div>
        <div class="strong">${c.name}</div>
        <div class="muted tiny">حالة الحملة</div>
      </div>
      <span class="${t.cls}">${t.label}</span>
    `;
    ul.appendChild(li);
  });
}

const addCampaignBtn = $("addCampaignBtn");
if (addCampaignBtn) {
  addCampaignBtn.addEventListener("click", () => {
    const name = prompt("Campaign name:");
    if(!name) return;
    const status = prompt("Status: active | ended | prep", "prep");
    state.campaigns.unshift({ name, status: (status || "prep").toLowerCase() });
    renderCampaigns();
    toast("Campaign added");
  });
}


// ---------- Annual Target ----------
function renderAnnual(){
  $("annualTargetText").textContent = moneyEUR(state.annualTarget);
  $("annualAchievedText").textContent = moneyEUR(state.annualAchieved);

  const pct = Math.max(0, Math.min(100, (state.annualAchieved / state.annualTarget) * 100));
  $("annualBar").style.width = pct.toFixed(0) + "%";
  $("annualPercent").textContent = pct.toFixed(0) + "%";
}

const editTargetBtn = $("editTargetBtn");
if (editTargetBtn) {
  editTargetBtn.addEventListener("click", () => {
    const v = prompt("Annual target (number):", state.annualTarget);
    const n = Number(v);
    if(Number.isFinite(n) && n > 0){
      state.annualTarget = n;
      renderAnnual();
      recalcOverall();
      toast("Target updated");
    }
  });
}


const simulateSaleBtn = $("simulateSaleBtn");
if (simulateSaleBtn) {
  simulateSaleBtn.addEventListener("click", () => {
    state.annualAchieved += 25000;
    renderAnnual();
    recalcOverall();
    toast("Added €25k achieved (mock)");
  });
}


// ---------- Events ----------
function renderEvents(){
  const p = $("privateEvents");
  const u = $("publicEvents");
  p.innerHTML = "";
  u.innerHTML = "";

  const renderOne = (ul, e) => {
    const li = document.createElement("li");
    li.className = "li";
    const regTag =
      e.reg === "Open" ? `<span class="tag active">Open</span>` :
      e.reg === "Waitlist" ? `<span class="tag prep">Waitlist</span>` :
      `<span class="tag ended">Closed</span>`;
    li.innerHTML = `
      <div>
        <div class="strong">${e.name}</div>
        <div class="muted tiny">${e.date}</div>
      </div>
      ${regTag}
    `;
    ul.appendChild(li);
  };

  state.eventsPrivate.forEach(e => renderOne(p, e));
  state.eventsPublic.forEach(e => renderOne(u, e));
}

// ---------- Reports (mock download/view) ----------
document.querySelectorAll("[data-report]").forEach(btn => {
  btn.addEventListener("click", () => {
    const rep = btn.dataset.report;
    const fmt = btn.dataset.format;

    if(fmt === "pdf"){
      openModal("View Report (Mock)", `
        <div class="muted">Opening <b>${rep}</b> as <b>PDF</b> (محاكاة).</div>
        <div style="margin-top:10px;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.03)">
          <div class="strong">Report Preview</div>
          <div class="muted tiny">This is a placeholder preview area.</div>
        </div>
      `, [{label:"Close", className:"ghost", onClick: closeModal}]);
    } else {
      toast(`Downloading ${rep}.${fmt} (mock)`);
    }
  });
});

// ---------- Admin Posts + Comments ----------
function renderPosts(){
  const ul = $("postList");
  ul.innerHTML = "";

  state.posts.forEach(post => {
    const li = document.createElement("li");
    li.className = "post" + (post.id === state.selectedPostId ? " active" : "");
    li.dataset.id = post.id;

    const flags = [
      post.isNew ? `<span class="flag new">NEW</span>` : "",
      post.acknowledged ? `<span class="flag ack">ACK</span>` : ""
    ].join("");

    li.innerHTML = `
      <div class="title">${post.title}</div>
      <div class="muted" style="margin-top:6px">${post.body.slice(0, 68)}${post.body.length>68?"…":""}</div>
      <div class="meta">
        <span>${post.date}</span>
        <span class="flags">${flags}</span>
      </div>
    `;
    ul.appendChild(li);
  });

  ul.querySelectorAll(".post").forEach(node => {
    node.addEventListener("click", () => {
      state.selectedPostId = Number(node.dataset.id);
      // When opened, mark not new
      const p = state.posts.find(x => x.id === state.selectedPostId);
      if(p) p.isNew = false;

      renderPosts();
      renderSelectedPost();
    });
  });
}

function renderSelectedPost(){
  const box = $("selectedPostBox");
  const ackBtn = $("ackBtn");
  const post = state.posts.find(p => p.id === state.selectedPostId);

  if(!post){
    box.innerHTML = `<div class="muted">اختر منشور من اليسار لعرض التفاصيل والتعليق.</div>`;
    ackBtn.disabled = true;
    $("commentCount").textContent = "0";
    $("commentList").innerHTML = "";
    return;
  }

  ackBtn.disabled = false;

  box.innerHTML = `
    <div class="strong">${post.title}</div>
    <div class="muted tiny" style="margin-top:6px">${post.date}</div>
    <div style="margin-top:10px">${post.body}</div>
    <div class="row" style="margin-top:12px">
      <span class="pill ${post.acknowledged ? "gold" : ""}">
        ${post.acknowledged ? "Acknowledged" : "Not acknowledged"}
      </span>
    </div>
  `;

  renderComments();
}

function renderComments(){
  const post = state.posts.find(p => p.id === state.selectedPostId);
  const ul = $("commentList");
  ul.innerHTML = "";

  const comments = post?.comments || [];
  $("commentCount").textContent = String(comments.length);

  comments.forEach(c => {
    const li = document.createElement("li");
    li.className = "comment";
    li.innerHTML = `
      <div class="strong">${c.by}</div>
      <div class="muted tiny" style="margin-top:4px">${new Date().toISOString().slice(0,10)}</div>
      <div style="margin-top:8px">${c.text}</div>
    `;
    ul.appendChild(li);
  });
}

$("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const post = state.posts.find(p => p.id === state.selectedPostId);
  if(!post){ toast("Select a post first"); return; }

  const text = $("commentInput").value.trim();
  if(!text) return;

  post.comments.push({ by: "Company", text });
  $("commentInput").value = "";
  renderComments();
  toast("Comment sent");
});

$("ackBtn").addEventListener("click", () => {
  const post = state.posts.find(p => p.id === state.selectedPostId);
  if(!post) return;
  post.acknowledged = true;
  renderPosts();
  renderSelectedPost();
  toast("Acknowledged");
});




function recalcOverall(){

  const salesPct = Math.max(0, Math.min(100, (state.annualAchieved / state.annualTarget) * 100));


  const activeCampaigns = state.campaigns.filter(c => c.status === "active").length;
  const totalEvents = state.eventsPrivate.length + state.eventsPublic.length;
  const activityPct = Math.max(0, Math.min(100, (activeCampaigns * 18) + (totalEvents * 6)));


  const ackCount = state.posts.filter(p => p.acknowledged).length;
  const commitmentPct = state.posts.length ? (ackCount / state.posts.length) * 100 : 0;

  const overall = (salesPct * 0.5) + (activityPct * 0.3) + (commitmentPct * 0.2);

  $("scoreSales").textContent = salesPct.toFixed(0) + "%";
  $("scoreActivity").textContent = activityPct.toFixed(0) + "%";
  $("scoreCommitment").textContent = commitmentPct.toFixed(0) + "%";

  $("overallPercent").textContent = overall.toFixed(0) + "%";
  $("overallBar").style.width = overall.toFixed(0) + "%";
}

const recalcBtn = $("recalcBtn");
if (recalcBtn) {
  recalcBtn.addEventListener("click", () => {
    recalcOverall();
    toast("Progress recalculated");
  });
}


// Join button (mock)
const joinBtn = $("joinBtn");
if (joinBtn) {
  joinBtn.addEventListener("click", () => toast("Join action (mock)"));
}


document.getElementById("commentForm")?.addEventListener("submit", (e) => {
  e.preventDefault(); // formun sayfayı yenilemesini engeller

  const phone = "905528828825"; // + yok, boşluk yok
  const defaultMsg = "سلام، هذا تعليق من لوحة TBC Command Hub:";
  const userMsg = document.getElementById("commentInput")?.value?.trim() || "";
  const text = encodeURIComponent(defaultMsg + "\n\n" + userMsg);

  // mobil/desktop uyumlu:
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener");
});


// ---------- Init ----------
applyManualAnnualPercent(); // 👈 MUTLAKA EN ÜSTTE

renderCampaigns();
renderAnnual();
renderEvents();
renderPosts();
renderSelectedPost();
recalcOverall();
