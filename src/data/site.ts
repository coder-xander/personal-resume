export const site = {
  name: "Xander",
  handle: "coder-xander",
  role: "系统架构与全栈工程师",
  location: "上海，中国",
  github: "https://github.com/coder-xander",
  email: "xhr1028@foxmail.com",
  company: "Ropedia",
  intro:
    "在 Ropedia 独立完成设备系统、采集服务、管理平台、客户端与产线工具的整体架构设计和实现。覆盖硬件接口、数据链路与产品交互，各层通过统一契约组成可运行、可维护、可交付的完整系统。",
  introShort:
    "在 Ropedia 独立完成从设备系统、采集服务到管理平台、客户端与产线工具的架构设计与实现。",
};

export const categories = [
  {
    id: "system",
    title: "系统与固件",
    en: "SYSTEMS",
    note: "启动、驱动与恢复",
  },
  {
    id: "device",
    title: "设备与数据",
    en: "DEVICE",
    note: "采集、同步与数据质量",
  },
  {
    id: "connectivity",
    title: "连接与协议",
    en: "CONNECTIVITY",
    note: "设备与主机之间",
  },
  { id: "cloud", title: "云端平台", en: "CLOUD", note: "设备生命周期与运维" },
  {
    id: "client",
    title: "桌面应用",
    en: "APPLICATIONS",
    note: "连接、监看与工作流",
  },
  {
    id: "factory",
    title: "产线与标定",
    en: "FACTORY",
    note: "从板卡到设备交付",
  },
  {
    id: "ai",
    title: "AI 工程",
    en: "INTELLIGENCE",
    note: "Vera Agent 与工具执行",
  },
  {
    id: "opensource",
    title: "个人开源",
    en: "OPEN SOURCE",
    note: "C++ 并发与基础库实践",
  },
] as const;
export const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const projectUrl = (id: string) => `${base}projects/${id}/`;
export const categoryInfo = (id: string) =>
  categories.find((item) => item.id === id)!;
