const state = {
  activeView: "dashboard",
  selectedTaskId: "task-001",
  selectedSlide: 0,
  diagnosis: null,
  matchedCases: [],
  slides: [],
  selectedCaseIds: new Set(),
  tokens: {},
  caseSourceFilter: "all",
  caseTypeFilter: "all",
  assetTypeFilter: "all",
};

const sampleRequirement = `客户：华东某股份制银行
背景：客服中心坐席超过 800 人，知识库分散在 KMS、内部网盘和历史 FAQ 中。客户希望用大模型提升客服响应效率，同时降低新人培训成本。
当前问题：
1. 坐席查找知识平均需要 3-5 分钟，影响一次解决率。
2. 不同渠道回复口径不一致，存在合规风险。
3. 历史项目资料和标杆案例分散，售前准备周期长。
4. 希望能自动生成面向管理层的解决方案 PPT，并推送给客户对应铁三角成员。
期望：先在信用卡客服和网点运营两个场景试点，3 个月内形成可复用模板。`;

const tasks = [
  {
    id: "task-001",
    name: "华东某股份制银行",
    industry: "金融",
    scenario: "智能客服",
    stage: "试点规划",
    owner: "王晨 / 售前",
    status: "方案生成中",
    updated: "2026-05-23",
    requirement: sampleRequirement,
    materials: [
      { name: "客服中心需求交流纪要.docx", type: "Word", source: "客户交流", status: "已解析" },
      { name: "智能客服历史方案.pptx", type: "PPT", source: "KH", status: "已索引" },
    ],
  },
  {
    id: "task-002",
    name: "长三角装备制造集团",
    industry: "制造",
    scenario: "售后知识库",
    stage: "立项评估",
    owner: "李可 / 行业方案",
    status: "案例匹配完成",
    updated: "2026-05-22",
    requirement:
      "客户：长三角装备制造集团\n背景：售后工程师经验分散在个人电脑、服务工单和历史 PPT 中。\n当前问题：新人学习周期长，复杂设备故障依赖专家远程支持，案例材料无法快速沉淀。\n期望：建设售后知识运营助手，形成可复用案例和服务方案。",
    materials: [
      { name: "售后知识库现状调研.xlsx", type: "Excel", source: "客户需求文件", status: "已解析" },
    ],
  },
  {
    id: "task-003",
    name: "华南连锁零售品牌",
    industry: "零售",
    scenario: "会员运营",
    stage: "需求调研",
    owner: "陈璐 / 客成",
    status: "需求诊断完成",
    updated: "2026-05-21",
    requirement:
      "客户：华南连锁零售品牌\n背景：门店数量超过 1200 家，会员运营、导购培训和活动复盘材料分散。\n当前问题：门店执行口径不一致，导购难以快速获取商品和活动话术。\n期望：形成门店运营知识助手和会员增长方案。",
    materials: [
      { name: "会员运营项目方案.pptx", type: "PPT", source: "KMS", status: "已索引" },
    ],
  },
  {
    id: "task-004",
    name: "某省政务服务中心",
    industry: "政企",
    scenario: "政策问答",
    stage: "招标准备",
    owner: "周远 / 售前",
    status: "待诊断",
    updated: "2026-05-20",
    requirement:
      "客户：某省政务服务中心\n背景：政策咨询量大，政策文件更新频繁，跨部门知识协同压力高。\n当前问题：人工回复效率不稳定，政策问答存在口径差异。\n期望：建设政策知识问答和办事指南生成能力。",
    materials: [
      { name: "政策问答需求清单.docx", type: "Word", source: "客户需求文件", status: "待解析" },
    ],
  },
];

const cases = [
  {
    id: "case-001",
    title: "某国有银行智能客服知识库升级",
    industry: "金融",
    scenario: "客服降本增效",
    score: 94,
    visibility: "内部可引用",
    source: "KMS",
    materialType: "PPT",
    link: "kms://bank-cs-knowledge-upgrade",
    reason:
      "同属银行客服场景，均存在知识库分散、坐席检索慢、回复口径不一致的问题，可复用智能知识检索、答案质检和人工闭环方案。",
  },
  {
    id: "case-002",
    title: "某保险集团销售助手与合规问答",
    industry: "金融",
    scenario: "合规问答",
    score: 88,
    visibility: "脱敏可引用",
    source: "KH",
    materialType: "Word",
    link: "kh://insurance-compliance-assistant",
    reason:
      "案例覆盖合规话术、知识授权和敏感内容拦截，与当前客户对合规风险控制的隐含诉求高度相关。",
  },
  {
    id: "case-003",
    title: "某制造企业售后专家经验沉淀",
    industry: "制造",
    scenario: "售后知识管理",
    score: 82,
    visibility: "内部可引用",
    source: "本地电脑",
    materialType: "Excel",
    link: "/local/cases/manufacturing-after-sales.xlsx",
    reason:
      "虽然行业不同，但在知识分散、专家经验难复用、服务响应慢方面具备横向参考价值，可作为知识运营方法论补充。",
  },
  {
    id: "case-004",
    title: "某城商行网点运营知识助手",
    industry: "金融",
    scenario: "网点运营",
    score: 91,
    visibility: "准标杆",
    source: "历史 PPT",
    materialType: "PPT",
    link: "history://branch-operation-assistant",
    reason:
      "与客户试点中的网点运营场景直接对应，可引用其分阶段实施路径、人员培训方式和运营指标设计。",
  },
];

const assets = [
  {
    title: "华东某股份制银行需求诊断报告",
    type: "HTML 报告",
    owner: "王晨",
    date: "2026-05-23",
    summary: "围绕智能客服、知识运营、合规质检和方案生成的需求诊断报告。",
  },
  {
    title: "智能客服知识库升级方案",
    type: "PPT 大纲",
    owner: "王晨",
    date: "2026-05-23",
    summary: "面向银行智能客服知识库升级的解决方案 PPT 大纲。",
  },
  {
    title: "装备制造售后知识运营案例清单",
    type: "案例清单",
    owner: "李可",
    date: "2026-05-22",
    summary: "制造行业售后知识运营相关案例与材料清单。",
  },
  {
    title: "零售会员运营 Agent 诊断模板",
    type: "Agent 模型",
    owner: "陈璐",
    date: "2026-05-21",
    summary: "面向客户会员运营场景的 Agent 诊断模板。",
  },
];

const connectors = [
  {
    name: "KH",
    desc: "线上资料平台，沉淀客户解决方案、项目解决方案等资料，主要材料形态为 PPT、Word、Excel。",
    placeholder: "kh_xxx",
  },
  {
    name: "KMS",
    desc: "内部文档撰写系统，用于编写、沉淀和发布诊断报告、方案草稿与知识文档。",
    placeholder: "kms_xxx",
  },
  {
    name: "GitHub",
    desc: "同步 ConsWork 项目代码与文档资产",
    placeholder: "github_pat_xxx",
  },
  {
    name: "企业微信 / 飞书",
    desc: "诊断报告和方案推送给客户铁三角",
    placeholder: "webhook_xxx",
  },
  {
    name: "LLM Provider",
    desc: "OpenAI、DeepSeek、内部模型或私有化大模型",
    placeholder: "sk_xxx",
  },
  {
    name: "本地知识目录",
    desc: "索引本地电脑中的方案、录屏、客户材料",
    placeholder: "/Users/simon/Documents/...",
  },
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function currentTask() {
  return tasks.find((task) => task.id === state.selectedTaskId) || tasks[0];
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function saveWorkspace() {
  localStorage.setItem("conswork.tasks", JSON.stringify(tasks));
  localStorage.setItem("conswork.assets", JSON.stringify(assets));
}

function loadWorkspace() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem("conswork.tasks") || "null");
    if (Array.isArray(savedTasks) && savedTasks.length) {
      tasks.splice(0, tasks.length, ...savedTasks);
      state.selectedTaskId = tasks[0].id;
    }
  } catch {
    localStorage.removeItem("conswork.tasks");
  }

  try {
    const savedAssets = JSON.parse(localStorage.getItem("conswork.assets") || "null");
    if (Array.isArray(savedAssets) && savedAssets.length) {
      assets.splice(0, assets.length, ...savedAssets);
    }
  } catch {
    localStorage.removeItem("conswork.assets");
  }
}

function persistTokens() {
  localStorage.setItem("conswork.tokens", JSON.stringify(state.tokens));
}

function loadTokens() {
  try {
    state.tokens = JSON.parse(localStorage.getItem("conswork.tokens") || "{}");
  } catch {
    state.tokens = {};
  }
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderMetrics() {
  qs("#metric-tasks").textContent = tasks.length;
  qs("#metric-reports").textContent = assets.filter((asset) => asset.type === "HTML 报告").length;
  qs("#metric-cases").textContent = cases.length;
  qs("#metric-solutions").textContent = assets.filter((asset) => asset.type === "PPT 大纲").length;
}

function switchView(view) {
  state.activeView = view;
  qsa(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  qsa(".nav-item").forEach((item) =>
    item.classList.toggle("active", item.dataset.view === view),
  );

  const titles = {
    dashboard: "行业需求诊断与方案生成 Agent 平台",
    tasks: "客户任务中心",
    diagnosis: "需求诊断工作台",
    cases: "同行案例匹配",
    solutions: "解决方案 PPT 生成",
    agents: "Agent / Skill 配置",
    history: "历史生成资产",
    settings: "平台令牌配置",
  };
  qs("#page-title").textContent = titles[view] || titles.dashboard;
}

function renderTasks() {
  const selected = currentTask();
  qs("#task-select").innerHTML = tasks
    .map(
      (task) =>
        `<option value="${task.id}" ${task.id === state.selectedTaskId ? "selected" : ""}>${task.name}</option>`,
    )
    .join("");

  const dashboard = qs("#dashboard-tasks");
  dashboard.innerHTML = tasks
    .slice(0, 3)
    .map(
      (task) => `
        <article class="task-row ${task.id === state.selectedTaskId ? "selected" : ""}" data-task-id="${task.id}">
          <div>
            <strong>${task.name}</strong>
            <span>${task.industry} · ${task.scenario} · ${task.stage}</span>
            <small>${task.owner} · ${task.updated}</small>
          </div>
          <span class="tag">${task.status}</span>
        </article>
      `,
    )
    .join("");

  qs("#task-table").innerHTML = tasks
    .map(
      (task) => `
        <article class="task-table-row ${task.id === state.selectedTaskId ? "selected" : ""}" data-task-id="${task.id}">
          <div><span class="table-label">客户</span><strong>${task.name}</strong></div>
          <div><span class="table-label">行业</span><strong>${task.industry}</strong></div>
          <div><span class="table-label">场景</span><strong>${task.scenario}</strong></div>
          <div><span class="table-label">阶段</span><strong>${task.stage}</strong></div>
          <div><span class="table-label">负责人</span><strong>${task.owner}</strong></div>
          <div><span class="table-label">状态</span><span class="tag">${task.status}</span></div>
        </article>
      `,
    )
    .join("");

  qs("#task-detail").innerHTML = `
    <p class="eyebrow">Current Task</p>
    <h3>${selected.name}</h3>
    <div class="detail-stack">
      <p><strong>行业：</strong>${selected.industry}</p>
      <p><strong>场景：</strong>${selected.scenario}</p>
      <p><strong>阶段：</strong>${selected.stage}</p>
      <p><strong>负责人：</strong>${selected.owner}</p>
      <p><strong>状态：</strong>${selected.status}</p>
      <p><strong>最近更新：</strong>${selected.updated}</p>
    </div>
    <div class="inline-actions">
      <button class="primary-action" data-action="go-diagnosis">进入诊断</button>
      <button class="ghost-action" data-action="add-material">添加模拟材料</button>
      <button class="ghost-action" data-action="summarize-materials">生成材料摘要</button>
      <button class="ghost-action" data-action="mark-pushed">标记已推送</button>
    </div>
    <div class="material-list">
      <h4>需求材料</h4>
      ${(selected.materials || [])
        .map(
          (material) => `
            <div class="material-item">
              <strong>${material.name}</strong>
              <span>${material.type} · ${material.source} · ${material.status}</span>
            </div>
          `,
        )
        .join("") || "<p>暂无材料，可先添加模拟材料或在需求诊断页粘贴客户材料。</p>"}
    </div>
  `;

  qsa("[data-task-id]").forEach((row) => {
    row.addEventListener("click", () => selectTask(row.dataset.taskId));
  });

  qs('[data-action="go-diagnosis"]').addEventListener("click", () => switchView("diagnosis"));
  qs('[data-action="add-material"]').addEventListener("click", () => {
    selected.materials = selected.materials || [];
    const type = ["PPT", "Word", "Excel"][selected.materials.length % 3];
    selected.materials.push({
      name: `${selected.name}${type === "PPT" ? "解决方案" : type === "Word" ? "需求纪要" : "数据清单"}.${type === "PPT" ? "pptx" : type === "Word" ? "docx" : "xlsx"}`,
      type,
      source: type === "PPT" ? "KH" : type === "Word" ? "KMS" : "本地电脑",
      status: "已索引",
    });
    selected.updated = today();
    saveWorkspace();
    renderTasks();
    showToast("已添加一条模拟材料");
  });
  qs('[data-action="summarize-materials"]').addEventListener("click", () => {
    const materialCount = (selected.materials || []).length;
    selected.requirement = `${selected.requirement}\n\n材料摘要：已纳入 ${materialCount} 份材料，覆盖客户需求、解决方案、项目数据和历史案例，可用于后续诊断与方案生成。`;
    selected.updated = today();
    saveWorkspace();
    qs("#requirement-input").value = selected.requirement;
    showToast("已把材料摘要追加到客户需求材料");
  });
  qs('[data-action="mark-pushed"]').addEventListener("click", () => {
    selected.status = "已推送铁三角";
    selected.updated = today();
    addAsset(`${selected.name} 推送记录`, "推送记录", selected.owner.split(" / ")[0]);
    saveWorkspace();
    renderAll();
    showToast("已生成推送记录并沉淀到历史资产");
  });
}

function renderPipeline(running = false) {
  const steps = [
    ["资料解析 Agent", "解析需求文件、会议纪要、录屏转写文本"],
    ["需求诊断 Agent", "识别显性/隐性需求、痛点、机会和风险"],
    ["案例匹配 Agent", "从 KH、KMS、本地资料中匹配同行案例"],
    ["方案生成 Agent", "生成 HTML 报告和解决方案 PPT 大纲"],
    ["推送通知 Agent", "推送给客户对应铁三角同学"],
  ];

  qs("#pipeline-status").innerHTML = steps
    .map((step, index) => {
      const done = running || index < 2;
      return `
        <div class="pipeline-item">
          <span class="pipeline-dot">${done ? "✓" : index + 1}</span>
          <div>
            <strong>${step[0]}</strong>
            <p>${step[1]}</p>
          </div>
          <span class="status-pill ${done ? "success" : ""}">${done ? "已就绪" : "待运行"}</span>
        </div>
      `;
    })
    .join("");
}

function selectTask(taskId) {
  state.selectedTaskId = taskId;
  const task = currentTask();
  qs("#requirement-input").value = task.requirement || sampleRequirement;
  state.diagnosis = null;
  state.matchedCases = [];
  state.slides = [];
  state.selectedCaseIds = new Set();
  saveWorkspace();
  renderAll();
  showToast(`已切换到客户任务：${task.name}`);
}

function renderContexts() {
  const task = currentTask();
  const text = `
    <span>当前客户：<strong>${task.name}</strong></span>
    <span>行业：${task.industry}</span>
    <span>场景：${task.scenario}</span>
    <span>阶段：${task.stage}</span>
    <span>负责人：${task.owner}</span>
  `;
  qs("#diagnosis-context").innerHTML = text;
  qs("#case-context").innerHTML = text;
}

function buildDiagnosis() {
  const content = qs("#requirement-input").value.trim() || sampleRequirement;
  const task = currentTask();

  state.diagnosis = {
    customer: content.includes("客户：")
      ? content.split("客户：")[1].split("\n")[0].trim()
      : task.name,
    industry: task.industry,
    scenario: task.scenario,
    score: task.industry === "金融" ? 88 : 82,
    summary: `客户处于${task.stage}阶段，核心诉求是围绕“${task.scenario}”将分散知识、历史方案和客户交流材料转化为可复用的业务生产能力。`,
    explicitNeeds: [
      "统一接入客户需求文件、会议纪要、录屏转写等多源材料",
      "自动输出客户需求诊断报告",
      "匹配同行案例并形成可引用材料清单",
      "生成面向管理层和铁三角的解决方案 PPT",
    ],
    implicitNeeds: [
      "需要建立围绕客户资料的可配置 Agent 工作流，而不是一次性问答",
      "需要案例引用权限、脱敏策略和质检机制",
      "需要将 KH、KMS、本地电脑资料抽象为统一知识源",
    ],
    risks: [
      "客户资料和案例材料可能包含敏感信息，需要脱敏和权限控制",
      "PPT 自动生成需要保留人工编辑入口，避免黑盒输出不可控",
      "KH/KMS 接口和个人 token 需要按用户维度加密存储",
    ],
    strategy:
      "建议先落地 MVP 闭环：需求输入、三段 Agent 编排、HTML 报告、案例清单、PPT 大纲和历史记录，再逐步接入真实知识源与推送渠道。",
  };

  task.status = "需求诊断完成";
  task.updated = today();
  task.requirement = content;
  addAsset(`${state.diagnosis.customer} 需求诊断报告`, "HTML 报告", task.owner.split(" / ")[0], false);
  saveWorkspace();
  renderDiagnosis();
  renderTasks();
  renderAssets();
  showToast("需求诊断 Agent 已生成结构化报告");
}

function diagnosisToHtml() {
  const report = state.diagnosis;
  if (!report) return "<p>暂无诊断报告。</p>";
  return `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>${escapeHtml(report.customer)} 需求诊断报告</title></head>
<body>
  <h1>${escapeHtml(report.customer)} 需求诊断报告</h1>
  <p>${escapeHtml(report.industry)} · ${escapeHtml(report.scenario)} · 机会评分 ${report.score}</p>
  <h2>诊断摘要</h2>
  <p>${escapeHtml(report.summary)}</p>
  <h2>显性需求</h2>
  <ul>${report.explicitNeeds.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  <h2>隐性需求</h2>
  <ul>${report.implicitNeeds.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  <h2>主要风险</h2>
  <ul>${report.risks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  <h2>推荐策略</h2>
  <p>${escapeHtml(report.strategy)}</p>
</body>
</html>`;
}

function ensureDiagnosis() {
  if (!state.diagnosis) {
    buildDiagnosis();
  }
  return state.diagnosis;
}

function renderDiagnosis() {
  const report = state.diagnosis;
  if (!report) {
    qs("#diagnosis-report").innerHTML = `
      <div class="report-block">
        <h4>等待诊断</h4>
        <p>输入客户需求材料后运行需求诊断 Agent，系统会输出结构化诊断报告。</p>
      </div>
    `;
    qs("#diagnosis-status").textContent = "待运行";
    qs("#diagnosis-status").className = "status-pill";
    return;
  }

  qs("#diagnosis-status").textContent = "已完成";
  qs("#diagnosis-status").className = "status-pill success";
  qs("#diagnosis-report").innerHTML = `
    <div class="report-block">
      <h4>${report.customer} · ${report.industry}</h4>
      <p>${report.summary}</p>
    </div>
    <div class="report-block score-row">
      <h4>机会评分：${report.score}</h4>
      <div class="score-bar"><span style="width:${report.score}%"></span></div>
      <p>评分综合考虑需求清晰度、场景成熟度、案例可复用度、组织推动条件和短期试点可行性。</p>
    </div>
    ${renderListBlock("显性需求", report.explicitNeeds)}
    ${renderListBlock("隐性需求", report.implicitNeeds)}
    ${renderListBlock("主要风险", report.risks)}
    <div class="report-block">
      <h4>推荐策略</h4>
      <p>${report.strategy}</p>
    </div>
  `;
}

function renderListBlock(title, items) {
  return `
    <div class="report-block">
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function matchCases() {
  const preferred = currentTask().industry;
  state.matchedCases = cases
    .map((item) => ({
      ...item,
      adjustedScore: item.industry === preferred ? item.score : item.score - 8,
    }))
    .sort((a, b) => b.adjustedScore - a.adjustedScore);
  state.selectedCaseIds = new Set(state.matchedCases.slice(0, 2).map((item) => item.id));
  const task = currentTask();
  task.status = "案例匹配完成";
  task.updated = today();
  addAsset(`${task.name} 同行案例匹配清单`, "案例清单", task.owner.split(" / ")[0], false);
  saveWorkspace();
  renderCases();
  renderTasks();
  renderAssets();
  showToast("案例匹配 Agent 已完成排序和推荐");
}

function renderCases() {
  const baseList = state.matchedCases.length ? state.matchedCases : cases;
  const list = baseList.filter((item) => {
    const sourceOk = state.caseSourceFilter === "all" || item.source === state.caseSourceFilter;
    const typeOk = state.caseTypeFilter === "all" || item.materialType === state.caseTypeFilter;
    return sourceOk && typeOk;
  });
  qs("#case-grid").innerHTML = list
    .map(
      (item) => `
        <article class="case-card">
          <div class="case-top">
            <div>
              <h3>${item.title}</h3>
              <p>${item.reason}</p>
            </div>
            <span class="match-score">${item.adjustedScore || item.score}</span>
          </div>
          <div class="case-meta">
            <span class="tag">${item.industry}</span>
            <span class="tag">${item.scenario}</span>
            <span class="tag">${item.visibility}</span>
            <span class="tag">${item.source}</span>
            <span class="tag">${item.materialType}</span>
            <span class="tag">${item.link}</span>
          </div>
          <button class="${state.selectedCaseIds.has(item.id) ? "primary-action" : "ghost-action"} case-toggle" data-case-id="${item.id}">
            ${state.selectedCaseIds.has(item.id) ? "已加入方案" : "加入方案"}
          </button>
        </article>
      `,
    )
    .join("") || `<article class="case-card"><h3>暂无匹配案例</h3><p>请调整来源或材料类型筛选条件。</p></article>`;

  qsa(".case-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.caseId;
      if (state.selectedCaseIds.has(id)) {
        state.selectedCaseIds.delete(id);
      } else {
        state.selectedCaseIds.add(id);
      }
      renderCases();
    });
  });
}

function selectedCaseList() {
  const sourceCases = state.matchedCases.length ? state.matchedCases : cases;
  return sourceCases.filter((item) => state.selectedCaseIds.has(item.id));
}

function exportCaseList() {
  const rows = (state.matchedCases.length ? state.matchedCases : cases).map((item) =>
    [
      item.title,
      item.industry,
      item.scenario,
      item.adjustedScore || item.score,
      item.visibility,
      item.source,
      item.materialType,
      item.link,
      item.reason,
    ].join(","),
  );
  const csv = ["案例名称,行业,场景,匹配分,可引用等级,来源,材料类型,链接,匹配原因", ...rows].join("\n");
  downloadFile(`${currentTask().name}-同行案例清单.csv`, csv, "text/csv;charset=utf-8");
  addAsset(`${currentTask().name} 同行案例导出清单`, "案例清单", currentTask().owner.split(" / ")[0]);
  saveWorkspace();
}

function generateSlides(options = {}) {
  const silent = options.silent === true;
  const diagnosis = state.diagnosis || {
    customer: "华东某股份制银行",
    industry: "金融行业",
    scenario: "智能客服与知识运营",
    strategy:
      "先落地需求诊断、案例匹配、方案生成闭环，再接入 KH、KMS、本地文件和推送渠道。",
  };
  const sourceCases = state.matchedCases.length ? state.matchedCases : cases;
  const selectedCases = selectedCaseList();
  const topCases = (selectedCases.length ? selectedCases : sourceCases).slice(0, 2);

  state.slides = [
    {
      title: `${diagnosis.customer} 需求诊断与解决方案`,
      subtitle: `${diagnosis.industry} · ${diagnosis.scenario}`,
      body: ["客户需求理解", "同行案例对标", "Agent 方案生成与实施路径"],
      note: "封面页，面向客户管理层或铁三角内部评审。",
    },
    {
      title: "客户需求诊断结论",
      subtitle: "显性需求 + 隐性诉求 + 机会评分",
      body: [
        "客户希望统一客户材料、案例资产和方案生成流程",
        "隐含诉求是建立可配置、可复用、可追踪的行业 Agent 工作流",
        `当前机会评分建议为 ${diagnosis.score || 88} 分，适合先做试点闭环`,
      ],
      note: "来自需求诊断 Skill 的结构化输出。",
    },
    {
      title: "可参考同行案例",
      subtitle: "按行业、场景、痛点和可引用程度排序",
      body: topCases.map((item) => `${item.title}：${item.reason.slice(0, 46)}...`),
      note: "来自案例匹配 Skill，可继续接入 KH/KMS 链接和脱敏材料。",
    },
    {
      title: "总体解决方案",
      subtitle: "客户材料入口 + 三段 Agent 编排 + 资产沉淀",
      body: [
        "资料解析 Agent：处理录屏、文档、会议纪要和本地知识",
        "需求诊断 Agent：输出诊断报告、分类、评分和风险",
        "方案生成 Agent：形成 HTML 报告、案例清单和 PPT 大纲",
      ],
      note: "方案主体页，可进一步生成架构图和实施路线。",
    },
    {
      title: "实施路径建议",
      subtitle: "MVP、知识接入、平台化三阶段推进",
      body: [
        "第 1 阶段：完成 Web MVP 和模拟 Agent 闭环",
        "第 2 阶段：接入 KH、KMS、本地文件夹和真实大模型",
        "第 3 阶段：加入权限、质检、推送和客户级 Agent 流程配置",
      ],
      note: "用于明确下一步项目推进节奏。",
    },
  ];

  const task = currentTask();
  if (!silent) {
    task.status = "方案生成完成";
    task.updated = today();
    saveWorkspace();
  }
  state.selectedSlide = 0;
  renderSlides();
  if (!silent) {
    renderTasks();
    showToast("方案生成 Agent 已生成 PPT 大纲");
  }
}

function renderSlides() {
  if (!state.slides.length) {
    generateSlides();
    return;
  }

  qs("#slide-list").innerHTML = state.slides
    .map(
      (slide, index) => `
        <button class="slide-thumb ${index === state.selectedSlide ? "active" : ""}" data-slide="${index}">
          <strong>${String(index + 1).padStart(2, "0")} · ${slide.title}</strong>
          <small>${slide.subtitle}</small>
        </button>
      `,
    )
    .join("");

  const slide = state.slides[state.selectedSlide];
  qs("#slide-preview").innerHTML = `
    <article class="slide">
      <p class="eyebrow">ConsWork Solution Deck</p>
      <h2>${slide.title}</h2>
      <p>${slide.subtitle}</p>
      <ul>${slide.body.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `;

  qs("#slide-meta").innerHTML = `
    <h3>页面信息</h3>
    <dl>
      <div><dt>页码</dt><dd>${state.selectedSlide + 1} / ${state.slides.length}</dd></div>
      <div><dt>来源</dt><dd>需求诊断 + 案例匹配 + 行业方案模板</dd></div>
      <div><dt>备注</dt><dd>${slide.note}</dd></div>
      <div><dt>后续扩展</dt><dd>可接入 pptxgenjs 或 python-pptx 导出真实 PPTX。</dd></div>
    </dl>
    <label class="edit-field">
      <span>页面标题</span>
      <input id="slide-title-edit" value="${escapeHtml(slide.title)}" />
    </label>
    <label class="edit-field">
      <span>页面要点</span>
      <textarea id="slide-body-edit">${slide.body.map((item) => escapeHtml(item)).join("\n")}</textarea>
    </label>
    <button class="primary-action" id="apply-slide-edit">应用修改</button>
  `;

  qsa(".slide-thumb").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSlide = Number(button.dataset.slide);
      renderSlides();
    });
  });

  qs("#apply-slide-edit").addEventListener("click", () => {
    slide.title = qs("#slide-title-edit").value.trim() || slide.title;
    slide.body = qs("#slide-body-edit")
      .value.split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    renderSlides();
    showToast("当前幻灯片已更新");
  });
}

function solutionToHtml() {
  const task = currentTask();
  return `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><title>${escapeHtml(task.name)} 解决方案</title></head>
<body>
  <h1>${escapeHtml(task.name)} 解决方案</h1>
  ${state.slides
    .map(
      (slide) => `
        <section>
          <h2>${escapeHtml(slide.title)}</h2>
          <p>${escapeHtml(slide.subtitle)}</p>
          <ul>${slide.body.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `,
    )
    .join("")}
</body>
</html>`;
}

function solutionToMarkdown() {
  return state.slides
    .map((slide, index) => {
      const body = slide.body.map((item) => `- ${item}`).join("\n");
      return `## ${index + 1}. ${slide.title}\n\n${slide.subtitle}\n\n${body}`;
    })
    .join("\n\n");
}

function renderAgents() {
  const task = currentTask();
  const baseAgents = [
    {
      name: "资料解析 Agent",
      desc: "解析 PDF、Word、Excel、录屏转写文本和会议纪要，输出统一结构化材料。",
      input: "客户材料",
      output: "结构化文本",
    },
    {
      name: "需求诊断 Agent",
      desc: "识别客户显性需求、隐性需求、痛点、风险、机会评分和推荐策略。",
      input: "结构化材料",
      output: "诊断报告",
    },
    {
      name: "案例匹配 Agent",
      desc: "按行业、场景、痛点和客户规模匹配同行案例，并解释匹配原因。",
      input: "诊断报告",
      output: "案例清单",
    },
    {
      name: "方案生成 Agent",
      desc: "综合诊断结果和同行案例，生成 HTML 报告和解决方案 PPT 大纲。",
      input: "诊断 + 案例",
      output: "PPT 大纲",
    },
    {
      name: "质检复核 Agent",
      desc: "检查逻辑一致性、敏感信息、案例可引用等级和输出完整度。",
      input: "报告 + PPT",
      output: "质检意见",
    },
    {
      name: "推送通知 Agent",
      desc: "根据客户、负责人和铁三角映射关系推送诊断报告与方案材料。",
      input: "最终资产",
      output: "推送记录",
    },
  ];

  qs("#agent-grid").innerHTML = baseAgents
    .map(
      (agent, index) => `
        <article class="agent-card">
          <h3>${agent.name}</h3>
          <p>${agent.desc}</p>
          <div class="agent-meta">
            <span class="tag">${task.name}</span>
            <span class="tag">${task.industry}</span>
            <span class="tag">${task.scenario}</span>
            <span class="tag">输入：${agent.input}</span>
            <span class="tag">输出：${agent.output}</span>
          </div>
          <label class="switch-row">
            <input type="checkbox" ${index < 4 ? "checked" : ""} />
            <span>${index < 4 ? "参与当前工作流" : "作为增强能力启用"}</span>
          </label>
        </article>
      `,
    )
    .join("");
}

function renderAssets() {
  const filteredAssets = assets.filter(
    (asset) => state.assetTypeFilter === "all" || asset.type === state.assetTypeFilter,
  );
  qs("#asset-grid").innerHTML = filteredAssets
    .map(
      (asset, index) => `
        <article class="asset-card">
          <h3>${asset.title}</h3>
          <p>${asset.type} · ${asset.owner} · ${asset.date}</p>
          <p>${asset.summary || "该资产来自当前演示工作流，可作为后续 KH/KMS 发布或方案复用的候选材料。"}</p>
          <div class="asset-meta">
            <span class="tag">可查阅</span>
            <span class="tag">可复用</span>
            <span class="tag">可推送</span>
          </div>
          <button class="ghost-action asset-open" data-asset-index="${index}">查看摘要</button>
        </article>
      `,
    )
    .join("") || `<article class="asset-card"><h3>暂无历史资产</h3><p>请先运行诊断、案例匹配或方案生成。</p></article>`;

  qsa(".asset-open").forEach((button) => {
    button.addEventListener("click", () => {
      const asset = filteredAssets[Number(button.dataset.assetIndex)];
      showToast(`${asset.title}：${asset.summary || asset.type}`);
    });
  });
}

function addAsset(title, type, owner, render = true) {
  const exists = assets.some((asset) => asset.title === title && asset.type === type);
  if (!exists) {
    assets.unshift({
      title,
      type,
      owner,
      date: today(),
      summary: `${type} 已由 ConsWork 工作流生成，后续可发布到 KMS 或关联 KH 资料。`,
    });
  }
  saveWorkspace();
  if (render) {
    renderAssets();
  }
}

function renderSettings() {
  qs("#settings-grid").innerHTML = connectors
    .map(
      (connector) => `
        <article class="setting-card">
          <h3>${connector.name}</h3>
          <p>${connector.desc}</p>
          <span class="status-pill warning">配置占位</span>
          <input type="password" value="${state.tokens[connector.name] || ""}" placeholder="${connector.placeholder}" aria-label="${connector.name} token" data-token-name="${connector.name}" />
          <button class="ghost-action token-save" data-token-name="${connector.name}">保存配置</button>
        </article>
      `,
    )
    .join("");

  qsa(".token-save").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.tokenName;
      const input = qs(`input[data-token-name="${name}"]`);
      state.tokens[name] = input.value.trim();
      persistTokens();
      showToast(`${name} 配置已保存到本地浏览器`);
    });
  });
}

function renderAll() {
  renderMetrics();
  renderTasks();
  renderPipeline();
  renderContexts();
  renderDiagnosis();
  renderCases();
  renderAgents();
  renderAssets();
  renderSettings();
  if (state.slides.length) {
    renderSlides();
  } else {
    generateSlides({ silent: true });
  }
}

function bindEvents() {
  qsa(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  qsa("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  qs("#task-select").addEventListener("change", (event) => {
    selectTask(event.target.value);
  });

  qs("#load-sample").addEventListener("click", () => {
    qs("#requirement-input").value = sampleRequirement;
    showToast("已载入客户需求样例");
  });

  qs("#run-diagnosis").addEventListener("click", buildDiagnosis);
  qs("#save-report").addEventListener("click", () => {
    const report = ensureDiagnosis();
    addAsset(`${report.customer} 需求诊断报告`, "HTML 报告", currentTask().owner.split(" / ")[0]);
    showToast("诊断报告已保存到历史资产");
  });
  qs("#export-report-html").addEventListener("click", () => {
    const report = ensureDiagnosis();
    downloadFile(`${report.customer}-需求诊断报告.html`, diagnosisToHtml(), "text/html;charset=utf-8");
  });
  qs("#export-report-json").addEventListener("click", () => {
    const report = ensureDiagnosis();
    downloadFile(
      `${report.customer}-需求诊断报告.json`,
      JSON.stringify(report, null, 2),
      "application/json;charset=utf-8",
    );
  });
  qs("#create-kms-draft").addEventListener("click", () => {
    const report = ensureDiagnosis();
    addAsset(`${report.customer} KMS 诊断草稿`, "KMS 草稿", currentTask().owner.split(" / ")[0]);
    showToast("已生成 KMS 草稿占位，后续可接入内部文档撰写系统");
  });
  qs("#run-cases").addEventListener("click", matchCases);
  qs("#case-source-filter").addEventListener("change", (event) => {
    state.caseSourceFilter = event.target.value;
    renderCases();
  });
  qs("#case-type-filter").addEventListener("change", (event) => {
    state.caseTypeFilter = event.target.value;
    renderCases();
  });
  qs("#export-cases").addEventListener("click", exportCaseList);
  qs("#generate-solution").addEventListener("click", generateSlides);
  qs("#save-solution").addEventListener("click", () => {
    const task = currentTask();
    addAsset(`${task.name} 解决方案 PPT 大纲`, "PPT 大纲", task.owner.split(" / ")[0]);
    showToast("方案大纲已沉淀到历史资产");
  });
  qs("#export-solution-html").addEventListener("click", () => {
    if (!state.slides.length) generateSlides({ silent: true });
    downloadFile(`${currentTask().name}-解决方案.html`, solutionToHtml(), "text/html;charset=utf-8");
  });
  qs("#export-solution-md").addEventListener("click", () => {
    if (!state.slides.length) generateSlides({ silent: true });
    downloadFile(`${currentTask().name}-解决方案.md`, solutionToMarkdown(), "text/markdown;charset=utf-8");
  });
  qs("#asset-type-filter").addEventListener("change", (event) => {
    state.assetTypeFilter = event.target.value;
    renderAssets();
  });
  qs("#clear-local-data").addEventListener("click", () => {
    localStorage.removeItem("conswork.tasks");
    localStorage.removeItem("conswork.assets");
    localStorage.removeItem("conswork.tokens");
    showToast("本地演示数据已清空，刷新页面后恢复默认样例");
  });
  qs("#run-workflow").addEventListener("click", () => {
    buildDiagnosis();
    matchCases();
    generateSlides();
    renderPipeline(true);
    showToast("完整 Agent 工作流已运行完成");
  });

  qs("#new-task").addEventListener("click", () => {
    qs("#task-composer").hidden = false;
    qs("#task-name").focus();
  });

  qs("#cancel-task").addEventListener("click", () => {
    qs("#task-composer").hidden = true;
  });

  qs("#task-composer").addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
      id: `task-${Date.now()}`,
      name: qs("#task-name").value.trim(),
      industry: qs("#task-industry").value,
      scenario: qs("#task-scenario").value.trim(),
      stage: qs("#task-stage").value,
      owner: qs("#task-owner").value.trim(),
      status: "待诊断",
      updated: today(),
      requirement: `客户：${qs("#task-name").value.trim()}\n背景：请在此补充客户背景、交流纪要或需求文件摘要。\n当前问题：\n1. \n2. \n期望：`,
    };
    tasks.unshift(task);
    saveWorkspace();
    qs("#task-composer").reset();
    qs("#task-composer").hidden = true;
    selectTask(task.id);
    showToast("客户任务已创建，可以进入需求诊断");
  });
}

function init() {
  loadWorkspace();
  loadTokens();
  const task = currentTask();
  qs("#requirement-input").value = task.requirement || sampleRequirement;
  renderAll();
  bindEvents();
}

init();
