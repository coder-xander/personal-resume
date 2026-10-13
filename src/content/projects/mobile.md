---
title: "Ropedia Mobile 工程协作"
summary: "参与移动端工程协作，补齐 macOS 上的 iOS Simulator 构建入口和开发约定，与团队共同衔接设备控制应用。"
category: client
order: 9
role: "工程协作与构建接入"
technologies: ["Expo", "React Native", "TypeScript", "iOS Simulator"]
pipeline: ["开发环境", "Expo Prebuild", "Pods", "Simulator 构建", "团队联调"]
---

## 项目背景

移动端应用承担现场设备控制、预览与采集任务流程。团队采用 Expo、React Native 和 TypeScript，需要一致的本地开发和构建入口，便于多人联调。

这是一项团队协作经历，我在已核对的工作中主要负责本地构建接入和工程流程。

## 我负责的部分

- 补齐 macOS 上的 iOS Simulator 构建入口，复用项目已有 iOS 构建流程。
- 串接 Expo Prebuild、Pods 与模拟器编译，明确完整 Xcode 等环境要求。
- 维护开发约定和 Git 同步规则，减少多人协作中的环境与操作差异。

## 与团队业务的衔接

项目整体包括 BLE 通信、设备状态、无线配置、采集控制和原生视频预览。它们由团队协作开发，我不把整个移动端的业务能力写成个人独立实现。

移动端与设备之间的控制契约需要和[Device Core](../device-core/)配合维护，本地构建入口让这些功能可以进入开发与联调流程。

## 交付与验证

已提供本地 Simulator 构建入口和工程约定。构建脚本存在不等于已经完成设备侧 BLE、视频预览或采集流程的实机验收，App 业务与签名发布也按团队分工说明。

## 在产品链路中的位置

移动端是用户侧的现场入口，与[Desktop](../desktop/)共用设备侧业务能力，但分别处理各自的平台连接和应用生命周期。
