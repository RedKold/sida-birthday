"use strict";

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Elements
  const body = document.body;
  const yearEl = $("#year");
  const audio = $("#audio");
  const playPauseBtn = $("#playPauseBtn");
  const muteBtn = $("#muteBtn");
  const playBtn = $("#playBtn");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const seekBar = $("#seekBar");
  const volumeBar = $("#volumeBar");
  const trackTitle = $("#trackTitle");
  const currentTimeEl = $("#currentTime");
  const durationEl = $("#duration");
  const playlistEl = $("#playlist");
  const timelineList = $("#timelineList");
  const themeToggle = $("#themeToggle");
  const confettiBtn = $("#confettiBtn");
  const wishForm = $("#wishForm");
  const wishName = $("#wishName");
  const wishText = $("#wishText");
  const wishList = $("#wishList");

  // State
  const state = {
    tracks: [
      {
        title: "Distortion!! -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/01.mp3",
        duration: 0
      },
      {
        title: "ひとりぼっち東京 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/02.mp3",
        duration: 0
      },
      {
        title: "カラカラ -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/03.mp3",
      },
      {
        title: "Re_Re_ -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/04.mp3",
      },
      {
        title: "あのバンド -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/05.mp3",
      },
      {
        title: "ドッペルゲンガー -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/06.mp3",
      },
      {
        title: "星座になれたら -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/07.mp3",
      },
      {
        title: "忘れてやらない -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/08.mp3",
      },
      
    ],
    currentIndex: 0,
    wishesKey: "sida_birthday_wishes_v1",
    themeKey: "sida_theme_v1"
  };

  // Utils
  const fmtTime = (sec) => {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const loadTheme = () => {
    const t = localStorage.getItem(state.themeKey);
    if (t === "light") {
      body.classList.remove("theme-bocchi");
      body.classList.add("theme-light");
    } else {
      body.classList.remove("theme-light");
      body.classList.add("theme-bocchi");
    }
  };

  const toggleTheme = () => {
    if (body.classList.contains("theme-light")) {
      localStorage.setItem(state.themeKey, "dark");
    } else {
      localStorage.setItem(state.themeKey, "light");
    }
    loadTheme();
  };

  // Audio / Playlist
  const renderPlaylist = () => {
    playlistEl.innerHTML = "";
    state.tracks.forEach((t, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.className = i === state.currentIndex ? "active" : "";
      li.innerHTML = `
        <div class="meta">
          <span class="title">${t.title}</span>
          <span class="sub">${t.artist || "未知艺术家"}</span>
        </div>
        <div class="sub">${t.duration ? fmtTime(t.duration) : ""}</div>
      `;
      li.addEventListener("click", () => selectTrack(i));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectTrack(i);
        }
      });
      playlistEl.appendChild(li);
    });
  };

  const selectTrack = (index) => {
    state.currentIndex = (index + state.tracks.length) % state.tracks.length;
    const track = state.tracks[state.currentIndex];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    $$("#playlist li").forEach((li, i) => {
      li.classList.toggle("active", i === state.currentIndex);
    });
    audio.play().catch(() => {});
    updatePlayButtons(true);
  };

  const updatePlayButtons = (isPlaying) => {
    if (isPlaying) {
      playPauseBtn.textContent = "⏸";
      playBtn.textContent = "⏸";
      playPauseBtn.setAttribute("aria-label", "暂停音乐");
      playBtn.setAttribute("aria-label", "暂停");
    } else {
      playPauseBtn.textContent = "▶";
      playBtn.textContent = "▶";
      playPauseBtn.setAttribute("aria-label", "播放音乐");
      playBtn.setAttribute("aria-label", "播放");
    }
  };

  const wireAudio = () => {
    audio.addEventListener("loadedmetadata", () => {
      durationEl.textContent = fmtTime(audio.duration);
      seekBar.value = "0";
      state.tracks[state.currentIndex].duration = Math.floor(audio.duration);
      renderPlaylist();
    });
    audio.addEventListener("timeupdate", () => {
      currentTimeEl.textContent = fmtTime(audio.currentTime);
      if (audio.duration) {
        seekBar.value = ((audio.currentTime / audio.duration) * 100).toFixed(2);
      }
    });
    audio.addEventListener("play", () => updatePlayButtons(true));
    audio.addEventListener("pause", () => updatePlayButtons(false));
    audio.addEventListener("ended", () => next());
  };

  const playPause = () => {
    if (audio.paused) audio.play().catch(() => {}); else audio.pause();
  };
  const prev = () => { selectTrack(state.currentIndex - 1); };
  const next = () => { selectTrack(state.currentIndex + 1); };

  // Seek & Volume
  const wireControls = () => {
    playPauseBtn.addEventListener("click", playPause);
    playBtn.addEventListener("click", playPause);
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
    muteBtn.addEventListener("click", () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? "🔈" : "🔇";
      muteBtn.setAttribute("aria-label", audio.muted ? "取消静音" : "静音");
    });
    seekBar.addEventListener("input", () => {
      if (audio.duration) {
        const newTime = (Number(seekBar.value) / 100) * audio.duration;
        audio.currentTime = newTime;
      }
    });
    volumeBar.addEventListener("input", () => {
      audio.volume = Number(volumeBar.value);
    });
  };

  // Timeline
  async function loadMemories() {
    const paths = [
      "./data/memories.json",
      "data/memories.json",
      "/data/memories.json"
    ];
    
    for (const path of paths) {
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.warn(`无法加载 ${path}: ${res.status} ${res.statusText}`);
          continue;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          console.log(`成功加载 ${data.length} 条回忆数据`);
          renderTimeline(data);
          return;
        } else {
          console.warn(`${path} 返回的数据为空或格式不正确`);
        }
      } catch (e) {
        console.warn(`加载 ${path} 失败:`, e);
        continue;
      }
    }
    
    // 如果所有路径都失败，使用默认数据
    console.warn("所有路径都失败，使用默认数据");
    renderTimeline([
      { date: "2024-12-01", title: "第一次喝到思达推荐的手冲", place: "街角咖啡", detail: "清爽的花香调，像冬日的阳光。" },
      { date: "2025-03-22", title: "周末即兴 Jam", place: "朋友家客厅", detail: "吉他riff太上头了，BPM越打越快。" }
    ]);
  }
  function renderTimeline(items) {
    timelineList.innerHTML = "";
    items.sort((a, b) => (a.date > b.date ? 1 : -1));
    for (const item of items) {
      const li = document.createElement("li");
      const imgHtml = item.image ? `
            <figure class="event-media">
              <img src="${item.image}" 
                   alt="${item.imageAlt || item.title || "回忆图片"}"
                   loading="lazy"
                   onerror="console.error('图片加载失败:', this.src); this.style.display='none';">
            </figure>` : "";
      li.innerHTML = `
        <span class="dot"></span>
        <div class="time">${item.date}${item.place ? " · " + item.place : ""}</div>
        <div class="event-card">
          <div class="event-title">${item.title}</div>
          ${imgHtml}
          <div class="event-meta">${item.detail || ""}</div>
        </div>
      `;
      timelineList.appendChild(li);
      
      // 预加载图片并检查是否成功
      if (item.image) {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ 图片加载成功: ${item.image}`);
        };
        img.onerror = () => {
          console.error(`❌ 图片加载失败: ${item.image} - 请检查文件是否存在或路径是否正确`);
        };
        img.src = item.image;
      }
    }
  }

  // Confetti（轻量 Canvas 彩带）
  const confetti = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const colors = ["#ff4da6","#7a2cff","#00e0c7","#ffe66d","#70ff9c"];
    const parts = Array.from({ length: 160 }).map(() => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      r: 4 + Math.random() * 8,
      c: colors[Math.floor(Math.random() * colors.length)],
      s: 2 + Math.random() * 3,
      a: Math.random() * Math.PI * 2
    }));
    let animId;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y += p.s;
        p.x += Math.sin(p.a += 0.05) * 1.5;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (parts.some(p => p.y < canvas.height + 30)) {
        animId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(animId);
        canvas.remove();
      }
    };
    tick();
  };

  // Wishes (Supabase + localStorage 降级)
  let supabaseClient = null;
  let useSupabase = false;
  
  // 初始化 Supabase（如果配置存在）
  const initSupabase = () => {
    try {
      const config = window.SUPABASE_CONFIG;
      if (config && config.url && config.anonKey && window.supabase) {
        supabaseClient = window.supabase.createClient(config.url, config.anonKey);
        useSupabase = true;
        console.log("✅ Supabase 已连接，留言将跨设备同步");
        return true;
      }
    } catch (e) {
      console.warn("Supabase 初始化失败，使用 localStorage:", e);
    }
    console.log("ℹ️ 使用 localStorage（仅本地存储）");
    return false;
  };

  // 从 Supabase 加载留言
  const loadWishesFromSupabase = async () => {
    if (!useSupabase || !supabaseClient) return [];
    try {
      const { data, error } = await supabaseClient
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return (data || []).map(w => ({
        name: w.name || "匿名",
        text: w.text,
        at: new Date(w.created_at).getTime()
      }));
    } catch (e) {
      console.error("从 Supabase 加载留言失败:", e);
      return [];
    }
  };

  // 保存留言到 Supabase
  const saveWishToSupabase = async (name, text) => {
    if (!useSupabase || !supabaseClient) return false;
    try {
      const { error } = await supabaseClient
        .from("wishes")
        .insert([{
          name: name || "匿名",
          text: text,
          created_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
      return true;
    } catch (e) {
      console.error("保存留言到 Supabase 失败:", e);
      return false;
    }
  };

  // 从 localStorage 加载留言
  const loadWishesFromLocal = () => {
    let items = [];
    try { items = JSON.parse(localStorage.getItem(state.wishesKey) || "[]"); } catch {}
    return items;
  };

  // 保存留言到 localStorage
  const saveWishToLocal = (name, text) => {
    let items = loadWishesFromLocal();
    items.unshift({ name, text, at: Date.now() });
    localStorage.setItem(state.wishesKey, JSON.stringify(items.slice(0, 100)));
    return items;
  };

  // 加载留言（自动选择数据源）
  const loadWishes = async () => {
    let items = [];
    if (useSupabase) {
      items = await loadWishesFromSupabase();
      // 如果 Supabase 失败，降级到 localStorage
      if (items.length === 0) {
        items = loadWishesFromLocal();
      }
    } else {
      items = loadWishesFromLocal();
    }
    renderWishes(items);
    
    // 如果使用 Supabase，设置实时订阅
    if (useSupabase && supabaseClient) {
      supabaseClient
        .channel("wishes-channel")
        .on("postgres_changes", 
          { event: "INSERT", schema: "public", table: "wishes" },
          () => {
            console.log("🔄 检测到新留言，自动刷新");
            loadWishes();
          }
        )
        .subscribe();
    }
  };

  // 渲染留言列表
  const renderWishes = (items) => {
    wishList.innerHTML = "";
    if (items.length === 0) {
      wishList.innerHTML = '<li class="wish-item" style="text-align: center; color: var(--muted); padding: 20px;">还没有留言，来第一个吧！</li>';
      return;
    }
    for (const w of items) {
      const li = document.createElement("li");
      li.className = "wish-item";
      li.innerHTML = `
        <div class="who">${w.name || "匿名"}</div>
        <div class="text">${w.text}</div>
        <div class="when">${new Date(w.at).toLocaleString()}</div>
      `;
      wishList.appendChild(li);
    }
  };

  // 提交留言
  const submitWish = async (e) => {
    e.preventDefault();
    const name = (wishName.value || "").trim();
    const text = (wishText.value || "").trim();
    if (!text) return;

    // 显示加载状态
    const submitBtn = wishForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "发送中...";
    submitBtn.disabled = true;

    try {
      if (useSupabase) {
        const success = await saveWishToSupabase(name, text);
        if (success) {
          // Supabase 会自动通过实时订阅更新，但我们也手动刷新一次
          await loadWishes();
        } else {
          // Supabase 失败，降级到 localStorage
          const items = saveWishToLocal(name, text);
          renderWishes(items);
        }
      } else {
        const items = saveWishToLocal(name, text);
        renderWishes(items);
      }
      wishText.value = "";
      wishName.value = "";
    } catch (e) {
      console.error("提交留言失败:", e);
      alert("发送失败，请稍后重试");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  };

  // Init
  async function init() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    loadTheme();
    themeToggle.addEventListener("click", toggleTheme);
    confettiBtn.addEventListener("click", confetti);

    renderPlaylist();
    wireAudio();
    wireControls();
    selectTrack(0);
    loadMemories();

    // 初始化 Supabase 并加载留言
    initSupabase();
    await loadWishes();
    wishForm.addEventListener("submit", submitWish);
  }

  document.addEventListener("DOMContentLoaded", init);
})();


