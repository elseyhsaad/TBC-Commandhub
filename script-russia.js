// ---------- Mock Data ----------
let state = {
  annualTarget: 2000000,
  annualAchieved: 1750000,

  campaigns: [
    { name: "Spring VIP Launch", status: "active" },
    { name: "Venue Partnership Rollout", status: "prep" },
    { name: "Q1 Influencer Push", status: "ended" },
  ],

  eventsPrivate: [
    { name: "Private Dinner – Board", date: "2026-01-18", reg: "Open" },
    { name: "Founder Roundtable", date: "2026-02-03", reg: "Waitlist" },
  ],

  eventsPublic: [
    { name: "TBC Gala Night", date: "2026-02-14", reg: "Open" },
    { name: "Public Networking", date: "2026-03-01", reg: "Closed" },
  ],

  posts: [
    {
      id: 1,
      title: "Новая система отчетности",
      body: "Система отчетности активирована. Пожалуйста, ежемесячно просматривайте отчеты по продажам и эффективности.",
      date: "2026-01-06",
      isNew: true,
      acknowledged: false,
      comments: [
        { by: "Company", text: "Получено, спасибо." }
      ]
    },
    {
      id: 2,
      title: "Уведомление о мероприятиях февраля",
      body: "Регистрация на мероприятия февраля открыта. Пожалуйста, подтвердите участие до конца месяца.",
      date: "2026-01-05",
      isNew: false,
      acknowledged: true,
      comments: [
        { by: "Company", text: "Проверено. Подтвердим в течение двух дней." }
      ]
    },
    {
      id: 3,
      title: "Обновление политики конфиденциальности",
      body: "Политика конфиденциальности и уровни доступа обновлены. Пожалуйста, ознакомьтесь с разделом Privacy & Security.",
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
const MANUAL_ANNUAL_PERCENT = 70;


// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

function moneyEUR(n){
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "€ " + s;
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

$("modalClose").addEventListener("click", closeModal);
$("modalBackdrop").addEventListener("click", (e) => {
  if(e.target.id === "modalBackdrop") closeModal();
});

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
          src="white-ocean-russia.html"
          style="width:100%;height:70vh;border:0;"
          loading="lazy"
        ></iframe>
        `,
        [{ label: "Закрыть", className: "ghost", onClick: closeModal }]
      );

      setTimeout(() => {
        document.getElementById("renameBtn")?.addEventListener("click", () => {
          const v = prompt("Название компании:", $("companyName").textContent);
          if (v) {
            $("companyName").textContent = v;
            toast("Название компании обновлено");
          }
        });

        document.getElementById("levelBtn")?.addEventListener("click", () => {
          const v = prompt(
            "Уровень / Статус:",
            $("companyLevel").textContent.replace("Level: ", "")
          );
          if (v) {
            $("companyLevel").textContent = "Level: " + v;
            toast("Уровень обновлен");
          }
        });
      }, 0);

    } else if (act === "privacy") {
      openModal(
        "О нас",
        `<iframe src="aboutus-russia.html" style="width:100%;height:70vh;border:0;" loading="lazy"></iframe>`,
        [{ label: "Закрыть", className: "ghost", onClick: closeModal }]
      );

    } else if (act === "partnerships") {
      openModal(
        "Политика конфиденциальности",
        `<iframe src="Privacy-Policy-russia.html" style="width:100%;height:70vh;border:0;" loading="lazy"></iframe>`,
        [{ label: "Закрыть", className: "ghost", onClick: closeModal }]
      );

    } else if (act === "terms") {
      openModal(
        "Условия использования – TBC",
        `<iframe src="terms-russia.html" style="width:100%;height:70vh;border:0;" loading="lazy"></iframe>`,
        [{ label: "Закрыть", className: "ghost", onClick: closeModal }]
      );

    } else if (act === "dpo") {
      openModal(
        "Ответственный по защите данных (DPO)",
        `<iframe src="dpo-russia.html" style="width:100%;height:70vh;border:0;" loading="lazy"></iframe>`,
        [{ label: "Закрыть", className: "ghost", onClick: closeModal }]
      );

    } else if (act === "logout") {
      openModal(
        "Выход из системы",
        `<div style="font-size:15px">Вы уверены, что хотите выйти?</div>`,
        [
          { label: "Отмена", className: "ghost", onClick: closeModal },
          {
            label: "Выйти",
            className: "cta small",
            onClick: () => {
              closeModal();
              localStorage.removeItem("tbc_logged_in");
              localStorage.removeItem("tbc_user_email");
              window.location.href = "login.html";
            }
          }
        ]
      );
    }
  });
});

// ---------- Render Campaigns ----------
function statusTag(status){
  const map = {
    active: { label: "Активно", cls: "tag active" },
    ended:  { label: "Завершено", cls: "tag ended" },
    prep:   { label: "Подготовка", cls: "tag prep" },
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
        <div class="muted tiny">Статус кампании</div>
      </div>
      <span class="${t.cls}">${t.label}</span>
    `;
    ul.appendChild(li);
  });
}

const addCampaignBtn = $("addCampaignBtn");
if (addCampaignBtn) {
  addCampaignBtn.addEventListener("click", () => {
    const name = prompt("Название кампании:");
    if(!name) return;
    const status = prompt("Статус: active | ended | prep", "prep");
    state.campaigns.unshift({ name, status: (status || "prep").toLowerCase() });
    renderCampaigns();
    toast("Кампания добавлена");
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
    const v = prompt("Годовая цель (число):", state.annualTarget);
    const n = Number(v);
    if(Number.isFinite(n) && n > 0){
      state.annualTarget = n;
      renderAnnual();
      recalcOverall();
      toast("Цель обновлена");
    }
  });
}


const simulateSaleBtn = $("simulateSaleBtn");
if (simulateSaleBtn) {
  simulateSaleBtn.addEventListener("click", () => {
    state.annualAchieved += 25000;
    renderAnnual();
    recalcOverall();
    toast("Добавлено €25k к достигнутому (симуляция)");
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
      e.reg === "Open" ? `<span class="tag active">Открыто</span>` :
      e.reg === "Waitlist" ? `<span class="tag prep">Лист ожидания</span>` :
      `<span class="tag ended">Закрыто</span>`;
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
      openModal("Просмотр отчета (симуляция)", `
        <div class="muted">Открываем <b>${rep}</b> как <b>PDF</b> (симуляция).</div>
        <div style="margin-top:10px;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.03)">
          <div class="strong">Предпросмотр отчета</div>
          <div class="muted tiny">Это область-заглушка для предпросмотра.</div>
        </div>
      `, [{label:"Закрыть", className:"ghost", onClick: closeModal}]);
    } else {
      toast(`Скачивание ${rep}.${fmt} (симуляция)`);
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
      post.isNew ? `<span class="flag new">НОВОЕ</span>` : "",
      post.acknowledged ? `<span class="flag ack">ПОДТВ</span>` : ""
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
    box.innerHTML = `<div class="muted">Выберите публикацию слева, чтобы увидеть детали и оставить комментарий.</div>`;
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
        ${post.acknowledged ? "Подтверждено" : "Не подтверждено"}
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
  if(!post){ toast("Сначала выберите публикацию"); return; }

  const text = $("commentInput").value.trim();
  if(!text) return;

  post.comments.push({ by: "Company", text });
  $("commentInput").value = "";
  renderComments();
  toast("Комментарий отправлен");
});

$("ackBtn").addEventListener("click", () => {
  const post = state.posts.find(p => p.id === state.selectedPostId);
  if(!post) return;
  post.acknowledged = true;
  renderPosts();
  renderSelectedPost();
  toast("Подтверждено");
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
 


 
  $("overallBar").style.width = overall.toFixed(0) + "%";
}

const recalcBtn = $("recalcBtn");
if (recalcBtn) {
  recalcBtn.addEventListener("click", () => {
    recalcOverall();
    toast("Прогресс пересчитан");
  });
}


// Join button (mock)
const joinBtn = $("joinBtn");
if (joinBtn) {
  joinBtn.addEventListener("click", () => toast("Действие вступления (симуляция)"));
}


document.getElementById("commentForm")?.addEventListener("submit", (e) => {
  e.preventDefault(); // formun sayfayı yenilemesini engeller

  const phone = "905528828825"; // + yok, boşluk yok
  const defaultMsg = "Здравствуйте, это комментарий из панели TBC Command Hub:";
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

