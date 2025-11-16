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
        src: "assets/audio/結束バンド - Distortion!! -We will B- Live ver..mp3",
        duration: 0
      },
      {
        title: "青春コンプレックス -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 青春コンプレックス -We will B- Live ver..mp3"
      },
      {
        title: "ひとりぼっち東京 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - ひとりぼっち東京 -We will B- Live ver..mp3"
      },
      {
        title: "ギターと孤独と蒼い惑星 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - ギターと孤独と蒼い惑星 -We will B- Live ver..mp3"
      },
      {
        title: "なにが悪い -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - なにが悪い -We will B- Live ver..mp3"
      },
      {
        title: "カラカラ -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - カラカラ -We will B- Live ver..mp3"
      },
      {
        title: "Flashbacker -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - フラッシュバッカー -We will B- Live ver..mp3"
      },
      {
        title: "Re_Re_ -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - Re_Re_ -We will B- Live ver..mp3"
      },
      {
        title: "あのバンド -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - あのバンド -We will B- Live ver..mp3"
      },
      {
        title: "ドッペルゲンガー -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - ドッペルゲンガー -We will B- Live ver..mp3"
      },
      {
        title: "星座になれたら -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 星座になれたら -We will B- Live ver..mp3"
      },
      {
        title: "小さな曲たち（milky way） -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - milky way -We will B- Live ver..mp3"
      },
      {
        title: "忘れてやらない -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 忘れてやらない -We will B- Live ver..mp3"
      },
      {
        title: "夢を束ねて -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 夢を束ねて -We will B- Live ver..mp3"
      },
      {
        title: "光の中へ -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 光の中へ -We will B- Live ver..mp3"
      },
      {
        title: "秒針少女 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 秒針少女 -We will B- Live ver..mp3"
      },
      {
        title: "私なんか -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 私なんか -We will B- Live ver..mp3"
      },
      {
        title: "あのバンド（UNITE） -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - UNITE -We will B- Live ver..mp3"
      },
      {
        title: "今、僕、アンダーグラウンドから -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 今、僕、アンダーグラウンドから -We will B- Live ver..mp3"
      },
      {
        title: "惑う星 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 惑う星 -We will B- Live ver..mp3"
      },
      {
        title: "月並みに輝け -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 月並みに輝け -We will B- Live ver..mp3"
      },
      {
        title: "僕と三原色 -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 僕と三原色 -We will B- Live ver..mp3"
      },
      {
        title: "青い惑星の Re:（転がる岩、君に朝が降る） -We will B- Live ver.",
        artist: "結束バンド",
        src: "assets/audio/結束バンド - 転がる岩、君に朝が降る -We will B- Live ver..mp3"
      }
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
    try {
      const res = await fetch("data/memories.json");
      const data = await res.json();
      renderTimeline(data);
    } catch (e) {
      console.warn("无法加载回忆数据：", e);
      renderTimeline([
        { date: "2024-12-01", title: "第一次喝到思达推荐的手冲", place: "街角咖啡", detail: "清爽的花香调，像冬日的阳光。" },
        { date: "2025-03-22", title: "周末即兴 Jam", place: "朋友家客厅", detail: "吉他riff太上头了，BPM越打越快。" }
      ]);
    }
  }
  function renderTimeline(items) {
    timelineList.innerHTML = "";
    items.sort((a, b) => (a.date > b.date ? 1 : -1));
    for (const item of items) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="dot"></span>
        <div class="time">${item.date}${item.place ? " · " + item.place : ""}</div>
        <div class="event-card">
          <div class="event-title">${item.title}</div>
          ${item.image ? `
            <figure class="event-media">
              <img src="${item.image}" alt="${item.imageAlt || item.title || "回忆图片"}">
            </figure>` : ""}
          <div class="event-meta">${item.detail || ""}</div>
        </div>
      `;
      timelineList.appendChild(li);
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

  // Wishes (localStorage)
  const loadWishes = () => {
    let items = [];
    try { items = JSON.parse(localStorage.getItem(state.wishesKey) || "[]"); } catch {}
    renderWishes(items);
  };
  const saveWishes = (items) => {
    localStorage.setItem(state.wishesKey, JSON.stringify(items.slice(0, 100)));
  };
  const renderWishes = (items) => {
    wishList.innerHTML = "";
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
  const submitWish = (e) => {
    e.preventDefault();
    const name = (wishName.value || "").trim();
    const text = (wishText.value || "").trim();
    if (!text) return;
    let items = [];
    try { items = JSON.parse(localStorage.getItem(state.wishesKey) || "[]"); } catch {}
    items.unshift({ name, text, at: Date.now() });
    saveWishes(items);
    renderWishes(items);
    wishText.value = "";
  };

  // Init
  function init() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    loadTheme();
    themeToggle.addEventListener("click", toggleTheme);
    confettiBtn.addEventListener("click", confetti);

    renderPlaylist();
    wireAudio();
    wireControls();
    selectTrack(0);
    loadMemories();

    loadWishes();
    wishForm.addEventListener("submit", submitWish);
  }

  document.addEventListener("DOMContentLoaded", init);
})();


