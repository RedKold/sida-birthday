// Supabase 配置示例
// 复制此文件为 config.js 并填入你的 Supabase 项目信息

window.SUPABASE_CONFIG = {
  // 从 https://supabase.com/dashboard 获取
  url: "https://your-project.supabase.co",
  anonKey: "your-anon-key-here"
};

// 如果不想使用 Supabase，可以设置为 null，系统会自动降级到 localStorage
// window.SUPABASE_CONFIG = null;

