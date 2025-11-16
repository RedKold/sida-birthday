## 朱思达生日网页（孤独摇滚 ACG 风）

一个纯静态、可直接部署到 GitHub Pages 的生日专题网页，包含：
- 扁平化 ACG 风 UI（Bocchi vibes）
- 音乐播放器（播放列表、进度、音量、静音）
- 回忆时间轴（使用 `data/memories.json`）
- 祝福留言（本地存储，不需要后端）
- 彩带撒花动画

### 使用方法
1. 替换音乐
   - 将你的音频文件放入 `assets/audio/`
   - 默认 `assets/audio/main.mp3`、`assets/audio/track2.mp3`
   - 如需改名，在 `assets/js/main.js` 的 `state.tracks` 中调整 `src/title/artist`

2. 编辑回忆时间轴
   - 修改 `data/memories.json`，按时间从早到晚或任意顺序书写：
   ```json
   [
     {
       "date": "2025-01-01",
       "title": "标题",
       "place": "地点",
       "detail": "描述",
       "image": "assets/img/memory-1.jpg",
       "imageAlt": "可选：图片的替代文字（无障碍用）"
     }
   ]
   ```
   - `image` 与 `imageAlt` 为可选字段，不填则不显示图片

3. 替换 Logo/插画（可选）
   - `assets/img/logo.svg`、`assets/img/guitar.svg`

4. 本地预览
   - 直接双击打开 `index.html` 即可离线预览（时间轴和样式正常，音乐需本地文件存在）

### GitHub Pages 发布
方法一：使用 `main` 分支根目录
1. 将本项目代码推送到你的 GitHub 仓库（例如 `username/sida-birthday`）
2. 在 GitHub → 仓库 → Settings → Pages：
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main` / 根目录 `/ (root)`
3. 保存后等待几分钟，访问地址：`https://username.github.io/sida-birthday/`

方法二：使用 `gh-pages` 分支
1. 新建 `gh-pages` 分支并推送当前静态文件
2. Settings → Pages：Branch 选择 `gh-pages`，目录 `/ (root)`

### 定制主题
- 切换明/暗主题：右上角月亮按钮
- 修改配色：编辑 `assets/css/style.css` 中的 `:root` 变量

### 无后端的留言说明
- 留言存储在浏览器 `localStorage`，换设备/清理缓存后会消失
- 若需要跨设备共享，可后续接入轻量后端或无服务函数

### 版权与素材
- 音频请使用你有权使用/授权的文件
- 插画为项目内置简化 SVG，可自由替换

---
Made with ♡ for Sida.


