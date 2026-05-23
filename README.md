# ConsWork

ConsWork 是一个面向售前、行业方案、客户成功团队的行业需求诊断与方案生成 Agent 平台。

当前版本是可直接打开的 Web MVP，使用静态页面和模拟数据呈现完整业务闭环：

```text
客户需求材料
  -> 需求诊断 Agent
  -> 案例匹配 Agent
  -> 方案生成 Agent
  -> 历史资产与铁三角推送
```

## 功能范围

- 客户任务中心：查看客户、行业、场景、阶段和当前状态。
- 需求诊断：输入客户需求材料，生成结构化诊断报告。
- 案例匹配：按行业、场景、痛点和可引用程度推荐同行案例。
- 方案生成：根据诊断结果和案例生成解决方案 PPT 大纲。
- Agent 配置：展示资料解析、需求诊断、案例匹配、方案生成、质检复核、推送通知等 Skill。
- 历史资产：查看历史诊断报告、方案大纲、案例清单和 Agent 流程模板。
- 令牌配置：预留 KH、KMS、GitHub、企业微信/飞书、LLM Provider、本地知识目录等接入口。

## 本地运行

这是静态页面，无需安装依赖。

直接打开：

```text
index.html
```

或在项目目录启动任意静态服务器：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 项目结构

```text
ConsWork/
  index.html
  assets/
    app.js
    styles.css
  docs/
    architecture.md
```

## 核心 Agent 设计

### 需求诊断 Agent

输入：

- 客户基础信息
- 客户需求文件
- 会议纪要
- 录屏转写文本
- 行业与业务线

输出：

- 需求摘要
- 显性需求
- 隐性需求
- 痛点分析
- 风险点
- 机会评分
- 推荐策略

### 案例匹配 Agent

输入：

- 需求诊断报告
- 行业
- 场景
- 痛点标签
- 客户规模

输出：

- 同行案例清单
- 匹配分
- 匹配原因
- 可引用等级
- 相关材料或准标杆链接

### 方案生成 Agent

输入：

- 需求诊断结果
- 同行案例
- 行业方案模板
- 客户基础信息

输出：

- HTML 诊断报告
- PPT 大纲
- 每页核心文案
- 实施路径
- 价值收益

## 后续路线

1. 接入真实大模型 API，替换当前模拟诊断逻辑。
2. 增加后端服务，保存任务、报告、案例和运行日志。
3. 接入 KH、KMS、本地文件夹和历史 PPT 索引。
4. 增加 RAG 检索和案例脱敏机制。
5. 支持导出真实 PPTX。
6. 支持企业微信、飞书或邮件推送给客户铁三角。
7. 增加用户权限、token 加密存储和客户级 Agent 流程配置。

## GitHub 发布建议

推荐仓库名：

```text
ConsWork
```

如果已经在 GitHub 创建空仓库，可在本地执行：

```bash
git remote add origin https://github.com/simonlvpin/ConsWork.git
git branch -M main
git push -u origin main
```

如果仓库需要使用 GitHub Pages，可在 GitHub 仓库设置中选择：

```text
Settings -> Pages -> Deploy from a branch -> main / root
```
