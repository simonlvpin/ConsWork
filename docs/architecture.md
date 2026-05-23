# ConsWork 架构设计

## 产品定位

ConsWork 是一个行业需求诊断与方案生成 Agent 管理平台，目标是把客户交流材料、客户需求文件、行业方案、同行案例、KH、KMS、本地电脑资料整合成可执行的 Agent 工作流。

平台面向的核心流程是：

```text
资料导入 -> 需求识别 -> 诊断分类 -> 案例匹配 -> 方案生成 -> 报告/PPT 推送 -> 历史资产沉淀
```

## 前端模块

### 工作台首页

- 展示客户任务、诊断报告、案例素材、方案 PPT 数量。
- 展示 Agent 工作流状态。
- 作为售前和方案团队的日常入口。

### 客户任务中心

- 管理客户任务。
- 记录客户、行业、场景、阶段、负责人和状态。
- 后续可接 CRM 或手工导入客户清单。

### 需求诊断

- 输入客户材料。
- 选择客户任务并读取客户材料。
- 输出结构化诊断报告。

### 同行案例匹配

- 根据诊断结果匹配案例。
- 展示匹配度、匹配原因、材料来源和可引用等级。

### 方案生成

- 根据诊断报告和案例生成 PPT 大纲。
- 以幻灯片预览方式呈现。
- 后续支持导出 PPTX。

### Agent / Skill 配置

- 配置客户级 Agent 流程。
- 每个流程可以绑定不同 Skill、Prompt、知识源和输出模板。

### 历史资产

- 沉淀历史报告、方案、案例清单、Agent 流程模板。
- 支持后续复用与版本追踪。

### 平台令牌

- 配置 KH、KMS、GitHub、企业微信/飞书、LLM Provider、本地知识目录等连接信息。
- 正式版本需要后端加密存储。

## 后端建议架构

当前 MVP 是静态前端。正式版本建议演进为：

```text
Frontend Web
  -> API Backend
  -> Agent Workflow Runtime
  -> Knowledge Connectors
  -> Database / Vector Store / File Store
```

### API 模块

```text
/api/tasks
/api/documents
/api/diagnosis
/api/cases
/api/solutions
/api/agents
/api/tokens
/api/push
/api/history
```

### 服务层

```text
TaskService
DocumentService
DiagnosisService
CaseMatchService
SolutionService
AgentRuntimeService
KnowledgeSourceService
TokenService
PushService
```

## 数据模型建议

```text
customers
requirements
documents
diagnosis_reports
case_materials
case_matches
solutions
ppt_generations
agents
agent_runs
platform_tokens
push_records
```

## Agent 工作流

### 资料解析 Agent

负责解析 PDF、Word、Excel、录屏转写文本、会议纪要，并输出统一结构化文本。

### 需求诊断 Agent

负责识别客户显性需求、隐性需求、痛点、风险、机会评分和推荐策略。

### 案例匹配 Agent

负责从本地电脑、KH、KMS、历史报告、历史 PPT 中匹配同行案例，并给出匹配原因。

### 方案生成 Agent

负责把诊断结果和案例材料转换为 HTML 报告、PPT 大纲、每页核心文案。

### 质检复核 Agent

负责检查敏感信息、引用权限、报告完整度、逻辑一致性。

### 推送通知 Agent

负责把报告和方案推送给客户对应铁三角成员。

## 知识源抽象

建议将所有资料统一抽象为 Knowledge Source：

```text
LocalFolderSource
KHSource
KMSSource
GitHubSource
HistoryReportSource
ManualCaseSource
```

每条材料建议包含：

```json
{
  "title": "某银行智能客服项目方案",
  "source": "KMS",
  "industry": "金融",
  "scenario": "智能客服",
  "customer_type": "银行",
  "visibility": "internal",
  "tags": ["客服", "知识库", "大模型", "降本增效"],
  "url": "",
  "file_path": "",
  "updated_at": ""
}
```

## 技术路线建议

### MVP

- 静态 Web 页面。
- Mock 数据。
- Agent 流程展示。
- GitHub Pages 发布。

### V1

- Next.js 或 React + FastAPI。
- PostgreSQL 保存任务和报告。
- 本地文件解析。
- LLM API 接入。
- HTML 报告生成。

### V2

- KH/KMS API 对接。
- 向量检索。
- 案例脱敏。
- PPTX 导出。
- 企业微信/飞书推送。

### V3

- 客户级 Agent 流程配置。
- Agent 运行日志。
- 权限体系。
- 审批流。
- 团队资产沉淀。
