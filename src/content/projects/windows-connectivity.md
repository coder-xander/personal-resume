---
title: "Windows USB 网络连接"
summary: "用 Rust 用户态服务连接系统 WinUSB 与官方 Wintun，为采集设备提供 Windows 主机侧的 IPv4 链路。"
category: connectivity
order: 6
role: "主机协议与安装交付"
technologies: ["Rust", "USB ECM", "WinUSB", "Wintun", "NSIS"]
pipeline: ["Windows IP", "Wintun", "Rust 服务", "WinUSB", "USB ECM 设备"]
---

## 项目背景

设备已有 USB ECM 网络接口，但 Windows 端需要配套连接方案，并且不能影响复合设备中的 ADB 接口。

我负责 Windows 主机连接方案、协议实现和安装工具。方案从历史内核 miniport 路径演进为当前的用户态桥接，旧实现保留作技术追溯。

## 我负责的部分

- 解析 USB 描述符、接口与端点，读取设备 MAC，限定到需要的 ECM 接口。
- 使用 Rust 服务连接系统 WinUSB 与官方 Wintun，转换 IPv4 和以太网帧，处理 ARP、队列上限和断线重连。
- 建立 Windows 服务、安装卸载、网络配置、诊断日志和 NSIS 安装包流程。
- 通过 Docker 构建与缓存依赖，记录源码版本与产物校验信息。

## 关键实现

连接方案使用已有签名的系统组件与官方 Wintun，协议转换放在用户态，避免继续分发自研内核驱动。设备匹配限定到网络接口，保留 ADB 用于诊断与维护。

ARP 请求具有重试和等待上限，收发队列有边界，超时数据会丢弃并记录计数。服务管理断开和重新连接，日志轮转避免长期运行耗尽存储。

## 交付与验证

自动化验证覆盖协议转换、Wintun 网卡与会话、WinUSB 包入库及服务流程。目标是 Windows 11 x64 的设备 IPv4 连接，实际设备收发、吞吐、拔插和睡眠恢复仍需实机验证；不能据 CI 结果声称所有 Windows 环境已通过。应用和安装器签名也与内核组件签名分别说明。

## 在产品链路中的位置

USB 网络链路让[Desktop](../desktop/)访问设备预览与控制服务，同时保留[现场工具](../factory-tool/)使用的 ADB 通道。
