const state = {
  activeView: "dashboard",
  industry: "finance",
  selectedSlide: 0,
  diagnosis: null,
  matchedCases: [],
  slides: [],
};

const industryModels = {
  finance: {
    label: "金融行业",
    scenario: "智能客服与知识运营",
    summary:
      "面向银行、保险、证券等客户，重点识别合规风控、服务效率、知识一致性、坐席赋能和智能化运营机会。",
    agents: [
      "金融需求诊断 Skill",
      "金融案例匹配 Skill",
      "合规风险复核 Skill",
      "金融方案生成 Skill",
    ],
  },
  manufacturing: {
    label: "制造行业",
    scenario: "生产运营与售后知识管理",
    summary:
      "面向离散制造、装备制造、流程制造客户，重点识别生产协同、售后效率、知识沉淀、质量追溯和 ROI 测算机会。",
    agents: [
      "制造需求诊断 Skill",
      "制造案例匹配 Skill",
      "ROI 测算 Skill",
      "制造方案生成 Skill",
    ],
  },
  retail: {
    label: "零售行业",
    scenario: "门店运营与会员增长",
    summary:
      "面向连锁零售、品牌商、平台型客户，重点识别会员运营、导购赋能、服务体验、营销效率和数据洞察机会。",
    agents: [
      "零售需求诊断 Skill",
      "增长案例匹配 Skill",
      "会员运营分析 Skill",
      "零售方案生成 Skill",
    ],
  },
  government: {
    label: "政企行业",
    scenario: "政务服务与知识协同",
    summary:
      "面向政务、园区、公共事业客户，重点识别办事效率、政策知识、跨部门协同、国产化适配和安全合规机会。",
    agents: [
      "政企需求诊断 Skill",
      "政企案例匹配 Skill",
      "安全合规复核 Skill",
      "政企方案生成 Skill",
    ],
  },
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
    name: "华东某股份制银行",
    industry: "金融",
    scenario: "智能客服",
    stage: "试点规划",
    owner: "王晨 / 售前",
    status: "方案生成中",
    updated: "2026-05-23",
  },
  {
    name: "长三角装备制造集团",
    industry: "制造",
    scenario: "售后知识库",
    stage: "立项评估",
    owner: "李可 / 行业方案",
    status: "案例匹配完成",
    updated: "2026-05-22",
  },
  {
    name: "华南连锁零售品牌",
    industry: "零售",
    scenario: "会员运营",
    stage: "需求调研",
    owner: "陈璐 / 客成",
    status: "需求诊断完成",
    updated: "2026-05-21",
  },
  {
    name: "某省政务服务中心",
    industry: "政企",
    scenario: "政策问答",
    stage: "招标准备",
    owner: "周远 / 售前",
    status: "待诊断",
    updated: "2026-05-20",
  },
];

const cases = [
  {
    title: "某国有银行智能客服知识库升级",
    industry: "金融",
    scenario: "客服降本增效",
    score: 94,
    visibility: "内部可引用",
    source: "KMS",
    reason:
      "同属银行客服场景，均存在知识库分散、坐席检索慢、回复口径不一致的问题，可复用智能知识检索、答案质检和人工闭环方案。",
  },
  {
    title: "某保险集团销售助手与合规问答",
    industry: "金融",
    scenario: "合规问答",
    score: 88,
    visibility: "脱敏可引用",
    source: "KH",
    reason:
      "案例覆盖合规话术、知识授权和敏感内容拦截，与当前客户对合规风险控制的隐含诉求高度相关。",
  },
  {
    title: "某制造企业售后专家经验沉淀",
    industry: "制造",
    scenario: "售后知识管理",
    score: 82,
    visibility: "内部可引用",
    source: "本地电脑",
    reason:
      "虽然行业不同，但在知识分散、专家经验难复用、服务响应慢方面具备横向参考价值，可作为知识运营方法论补充。",
  },
  {
    title: "某城商行网点运营知识助手",
    industry: "金融",
    scenario: "网点运营",
    score: 91,
    visibility: "准标杆",
    source: "历史 PPT",
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
  },
  {
    title: "智能客服知识库升级方案",
    type: "PPT 大纲",
    owner: "王晨",
    date: "2026-05-23",
  },
  {
    title: "装备制造售后知识运营案例清单",
    type: "案例清单",
    owner: "李可",
    date: "2026-05-22",
  },
  {
    title: "零售会员运营 AI 诊断模板",
    type: "Agent 模型",
    owner: "陈璐",
    date: "2026-05-21",
  },
];

const connectors = [
  {
    name: "KH",
    desc: "行业方案、客户交流纪要、专家经验库",
    placeholder: "kh_xxx",
  },
  {
    name: "KMS",
    desc: "知识库、案例库、历史方案材料",
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

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function switchView(view) {
  state.activeView = view;
  qsa(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  qsa(".nav-item").forEach((item) =>
    item.classList.toggle("active", item.dataset.view === view),
  );

  const titles = {
    dashboard: "AI 行业需求诊断与方案生成平台",
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
  const dashboard = qs("#dashboard-tasks");
  dashboard.innerHTML = tasks
    .slice(0, 3)
    .map(
      (task) => `
        <article class="task-row">
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
        <article class="task-table-row">
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

function buildDiagnosis() {
  const model = industryModels[state.industry];
  const content = qs("#requirement-input").value.trim() || sampleRequirement;
  const isFinance = state.industry === "finance";

  state.diagnosis = {
    customer: content.includes("客户：")
      ? content.split("客户：")[1].split("\n")[0].trim()
      : "未命名客户",
    industry: model.label,
    scenario: model.scenario,
    score: isFinance ? 88 : 81,
    summary: `客户处于${isFinance ? "智能客服试点规划" : model.scenario}阶段，核心诉求是将分散知识、历史方案和客户交流材料转化为可复用的业务生产能力。`,
    explicitNeeds: [
      "统一接入客户需求文件、会议纪要、录屏转写等多源材料",
      "自动输出客户需求诊断报告",
      "匹配同行案例并形成可引用材料清单",
      "生成面向管理层和铁三角的解决方案 PPT",
    ],
    implicitNeeds: [
      "需要建立可配置的行业诊断模型，而不是一次性问答",
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

  renderDiagnosis();
  showToast("需求诊断 Agent 已生成结构化报告");
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
  const preferred = state.industry === "finance" ? "金融" : industryModels[state.industry].label.replace("行业", "");
  state.matchedCases = cases
    .map((item) => ({
      ...item,
      adjustedScore: item.industry === preferred ? item.score : item.score - 8,
    }))
    .sort((a, b) => b.adjustedScore - a.adjustedScore);
  renderCases();
  showToast("案例匹配 Agent 已完成排序和推荐");
}

function renderCases() {
  const list = state.matchedCases.length ? state.matchedCases : cases;
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
          </div>
        </article>
      `,
    )
    .join("");
}

function generateSlides() {
  const diagnosis = state.diagnosis || {
    customer: "华东某股份制银行",
    industry: "金融行业",
    scenario: "智能客服与知识运营",
    strategy:
      "先落地需求诊断、案例匹配、方案生成闭环，再接入 KH、KMS、本地文件和推送渠道。",
  };
  const topCases = (state.matchedCases.length ? state.matchedCases : cases).slice(0, 2);

  state.slides = [
    {
      title: `${diagnosis.customer} AI 需求诊断与解决方案`,
      subtitle: `${diagnosis.industry} · ${diagnosis.scenario}`,
      body: ["客户需求理解", "同行案例对标", "AI 方案生成与实施路径"],
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
        "第 3 阶段：加入权限、质检、推送和多行业模型运营",
      ],
      note: "用于明确下一步项目推进节奏。",
    },
  ];

  state.selectedSlide = 0;
  renderSlides();
  showToast("方案生成 Agent 已生成 PPT 大纲");
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
  `;

  qsa(".slide-thumb").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSlide = Number(button.dataset.slide);
      renderSlides();
    });
  });
}

function renderAgents() {
  const model = industryModels[state.industry];
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
      (agent) => `
        <article class="agent-card">
          <h3>${agent.name}</h3>
          <p>${agent.desc}</p>
          <div class="agent-meta">
            <span class="tag">${model.label}</span>
            <span class="tag">输入：${agent.input}</span>
            <span class="tag">输出：${agent.output}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderAssets() {
  qs("#asset-grid").innerHTML = assets
    .map(
      (asset) => `
        <article class="asset-card">
          <h3>${asset.title}</h3>
          <p>${asset.type} · ${asset.owner} · ${asset.date}</p>
          <div class="asset-meta">
            <span class="tag">可查阅</span>
            <span class="tag">可复用</span>
            <span class="tag">可推送</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderSettings() {
  qs("#settings-grid").innerHTML = connectors
    .map(
      (connector) => `
        <article class="setting-card">
          <h3>${connector.name}</h3>
          <p>${connector.desc}</p>
          <input type="password" placeholder="${connector.placeholder}" aria-label="${connector.name} token" />
        </article>
      `,
    )
    .join("");
}

function refreshForIndustry() {
  renderAgents();
  matchCases();
  state.slides = [];
  renderSlides();
  showToast(`已切换到${industryModels[state.industry].label}诊断模型`);
}

function bindEvents() {
  qsa(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  qsa("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  qs("#industry-select").addEventListener("change", (event) => {
    state.industry = event.target.value;
    refreshForIndustry();
  });

  qs("#load-sample").addEventListener("click", () => {
    qs("#requirement-input").value = sampleRequirement;
    showToast("已载入客户需求样例");
  });

  qs("#run-diagnosis").addEventListener("click", buildDiagnosis);
  qs("#run-cases").addEventListener("click", matchCases);
  qs("#generate-solution").addEventListener("click", generateSlides);
  qs("#run-workflow").addEventListener("click", () => {
    buildDiagnosis();
    matchCases();
    generateSlides();
    renderPipeline(true);
    showToast("完整 AI 工作流已运行完成");
  });

  qs("#new-task").addEventListener("click", () => {
    showToast("MVP 当前使用模拟数据，后续版本将接入任务创建表单");
  });
}

function init() {
  qs("#requirement-input").value = sampleRequirement;
  renderTasks();
  renderPipeline();
  renderDiagnosis();
  renderCases();
  renderAgents();
  renderAssets();
  renderSettings();
  generateSlides();
  bindEvents();
}

init();
