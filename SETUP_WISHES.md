# 跨设备留言同步设置指南

本网页支持两种留言存储方式：
1. **Supabase（推荐）** - 跨设备实时同步，所有访客的留言都会共享
2. **localStorage（默认）** - 仅本地存储，换设备或清理缓存后会消失

## 方案一：使用 Supabase（跨设备同步）

### 步骤 1：创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 注册/登录账号（免费）
3. 点击 "New Project"
4. 填写项目信息：
   - **Name**: `sida-birthday`（或任意名称）
   - **Database Password**: 设置一个强密码（记住它）
   - **Region**: 选择离你最近的区域（如 `Southeast Asia (Singapore)`）
5. 点击 "Create new project"，等待 1-2 分钟创建完成

### 步骤 2：创建数据库表

1. 在 Supabase 项目页面，点击左侧菜单的 **"SQL Editor"**
2. 点击 **"New query"**
3. 复制并执行以下 SQL：

```sql
-- 创建留言表
CREATE TABLE wishes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT DEFAULT '匿名',
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 Row Level Security (RLS)
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- 设置策略：允许所有人读取和插入（公开留言板）
CREATE POLICY "任何人都可以查看留言"
  ON wishes FOR SELECT
  USING (true);

CREATE POLICY "任何人都可以添加留言"
  ON wishes FOR INSERT
  WITH CHECK (true);
```

4. 点击 **"Run"** 执行 SQL

### 步骤 3：获取 API 密钥

1. 在 Supabase 项目页面，点击左侧菜单的 **"Settings"**（齿轮图标）
2. 点击 **"API"**
3. 找到以下信息：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 一长串字符串（以 `eyJ...` 开头）

### 步骤 4：配置网站

1. 在项目根目录，复制 `config.example.js` 为 `config.js`：
   ```bash
   cp config.example.js config.js
   ```

2. 编辑 `config.js`，填入你的 Supabase 信息：
   ```javascript
   window.SUPABASE_CONFIG = {
     url: "https://你的项目ID.supabase.co",  // 从 Supabase Settings → API 获取
     anonKey: "你的anon key"                  // 从 Supabase Settings → API 获取
   };
   ```

3. **重要**：`config.js` 会被推送到 GitHub，但这是安全的，因为使用的是 `anon key`（公开密钥），只能读写你设置的 `wishes` 表。

### 步骤 5：测试

1. 打开网站，打开浏览器开发者工具（F12）
2. 在 Console 中应该看到：`✅ Supabase 已连接，留言将跨设备同步`
3. 提交一条测试留言
4. 在其他设备/浏览器打开同一网站，应该能看到刚才的留言

## 方案二：不使用 Supabase（仅本地存储）

如果你不想设置 Supabase，系统会自动使用 localStorage：

1. **不创建 `config.js`**，或者
2. 创建 `config.js` 但设置为：
   ```javascript
   window.SUPABASE_CONFIG = null;
   ```

这样留言只会存储在浏览器的 localStorage 中，换设备或清理缓存后会消失。

## 实时同步功能

如果使用 Supabase，留言支持**实时同步**：
- 当有人提交新留言时，所有打开网页的用户会在几秒内自动看到新留言
- 无需刷新页面

## 安全说明

- `anon key` 是公开的，但通过 Row Level Security (RLS) 策略限制，只能访问 `wishes` 表
- 留言是公开的，任何人都可以查看和添加
- 如果需要更严格的控制（如审核、删除功能），需要额外的后端逻辑

## 故障排除

### 留言没有同步

1. 检查浏览器 Console 是否有错误信息
2. 确认 `config.js` 中的 URL 和 Key 是否正确
3. 确认 Supabase 项目中的表是否创建成功
4. 检查 Supabase 项目的 API 是否启用（Settings → API）

### 仍然使用 localStorage

- 检查 `config.js` 是否存在且格式正确
- 检查浏览器 Console 是否有 Supabase 初始化错误
- 确认 Supabase CDN 是否加载成功（检查 Network 标签）

## 免费额度

Supabase 免费版提供：
- 500MB 数据库存储
- 2GB 带宽/月
- 50,000 次 API 请求/月

对于生日留言板来说，完全够用！

