export const site = {
  name: "Xander",
  handle: "coder-xander",
  role: "偏系统方向的全栈工程师",
  location: "上海，中国",
  github: "https://github.com/coder-xander",
  intro:
    "负责复杂机器人与消费级 Linux 产品的软件架构设计和代码实现。这里记录我在 Ropedia 从板级系统到云端、客户端与产线工具的项目实践，以及自己的 C++ 开源项目。",
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
    title: "桌面与移动",
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
    note: "模型运行与工具编排",
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
