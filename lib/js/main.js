(function() {
  'use strict';

  // ============================================
  // 1. 壁纸自适应
  // ============================================
  var img = document.getElementById('bing-wallpaper');
  if (img) {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var isSlow = conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.saveData);
    var isMobile = window.innerWidth < 768;

    var url = 'https://bing.img.run/1920x1080.php';
    if (isMobile) url = 'https://bing.img.run/m.php';
    else if (isSlow) url = 'https://bing.img.run/1366x768.php';
    if (isSlow && isMobile) url = 'https://bing.img.run/1366x768.php';

    img.src = url;
    img.alt = 'Bing 壁纸';
    img.onerror = function() {
      this.src = 'https://bing.img.run/1366x768.php';
    };
  }

  // ============================================
  // 2. 语言 / 主题自动适配
  // ============================================
  var html = document.documentElement;
  var lang = navigator.language || 'zh-CN';
  var langAttr = 'zh-CN';
  if (lang.startsWith('zh')) {
    if (lang.includes('TW') || lang.includes('HK') || lang.includes('MO')) langAttr = 'zh-TW';
    else langAttr = 'zh-CN';
  } else if (lang.startsWith('ja')) {
    langAttr = 'ja';
  } else if (lang.startsWith('en')) {
    langAttr = 'en-US';
  }
  html.setAttribute('lang', langAttr);

  var app = document.getElementById('app');
  if (app) app.dataset.lang = langAttr;

  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (app) {
    app.classList.remove('theme-light', 'theme-dark');
    app.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (app) {
      app.classList.remove('theme-light', 'theme-dark');
      app.classList.add(e.matches ? 'theme-dark' : 'theme-light');
    }
  });

  // ============================================
  // 3. 搜索功能 (全站搜索)
  // ============================================
  // 搜索数据
  
  
  var searchData = [
    { title: '概述 - 探索、创造、分享', url: '#intro', icon: 'fa-compass' },
    { title: '概述 - 这是我的数字世界', url: '#intro', icon: 'fa-compass' },
    { title: '概述 - Ker. - 2026', url: '#intro', icon: 'fa-compass' },
    { title: '项目 - 我的世界成书生成器', url: '/pages/mcbook', icon: 'fa-folder-open' },
	{ title: '项目 - 终末地Logo图标生成器', url: 'https://ark.zker.top/', icon: 'fa-folder-open' },
	{ title: '站长 - Zhangker | Ker', url: 'https://zker.top/', icon: 'fa-folder-open' },
	{ title: '友人 - 素 Az_Su', url: 'https://azsu.top/mc/', icon: 'fa-folder-open' },
	{ title: '友人 - BI4MRT', url: 'https://bi4mrt.top/html/about', icon: 'fa-folder-open' },
	{ title: '友人 - Noctiro', url: 'https://www.noctiro.moe/zh', icon: 'fa-folder-open' },
	{ title: '游戏 - 我的世界Minecraft', url: 'https://minecraft.net/', icon: 'fa-folder-open' },
	{ title: '游戏 - 明日方舟终末地Endfield', url: 'https://endfield.hypergryph.com/', icon: 'fa-folder-open' },
	{ title: '游戏 - 蔚蓝档案BA', url: 'https://bluearchive-cn.com/', icon: 'fa-folder-open' },
    { title: '项目 - 密码小游戏', url: '/pages/password', icon: 'fa-folder-open' },
    { title: '项目 - Ker下载站', url: 'https://ker-download.zker.top/', icon: 'fa-folder-open' },
    { title: '项目 - Ker博客', url: 'https://blog.zker.top/', icon: 'fa-folder-open' },
    { title: '项目 - 管理站(旧)', url: 'https://980765.xyz/admin/login', icon: 'fa-folder-open' },
    { title: '项目 - 管理站', url: 'https://shotcuter.zker.top/', icon: 'fa-folder-open' },
    { title: '友链 - zker.top', url: 'https://zker.top', icon: 'fa-link' },
    { title: '友链 - noctiro.moe', url: 'https://noctiro.moe', icon: 'fa-link' },
    { title: '友链 - azsu.top', url: 'https://azsu.top', icon: 'fa-link' },
	{ title: '本站功能 - 搜索', url: '#', icon: 'fa-compass' },
	{ title: '本站功能 - 鼠标悬浮', url: '#', icon: 'fa-compass' },
	{ title: '本站功能 - 跳转', url: '#', icon: 'fa-compass' },
	{ title: '本站功能 - 介绍', url: '#', icon: 'fa-compass' },
	{ title: '本站功能 - Typer打字机(一言)', url: '#', icon: 'fa-compass' },
	{ title: '一言 - 114514', url: '#', icon: 'fa-message' },
	{ title: '一言 - 探索、创造、分享', url: '#', icon: 'fa-message' },
	{ title: '一言 - 你好中国！', url: '#', icon: 'fa-message' },
	{ title: '一言 - https://zker.top', url: '#', icon: 'fa-message' },
	{ title: '一言 - www.noctiro.moe', url: '#', icon: 'fa-message' },
	{ title: '一言 - 萌ICP备！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 服务器azsu.top', url: '#', icon: 'fa-message' },
	{ title: '一言 - 往人中下面洞里塞炸鸡很舒服', url: '#', icon: 'fa-message' },
	{ title: '一言 - awa qwq owo ovo qaq', url: '#', icon: 'fa-message' },
	{ title: '一言 - 句末请加半括号（', url: '#', icon: 'fa-message' },
	{ title: '一言 - 明天的事后天就知道了', url: '#', icon: 'fa-message' },
	{ title: '一言 - 永远不要在晚上搞机！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 我们使用先进的视窗11系统！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 00后现在没人到30！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 内存=黄金', url: '#', icon: 'fa-message' },
	{ title: '一言 - 去末地种蘑菇吧！', url: '#', icon: 'fa-message' },
	{ title: '一言 - rm -rf /*', url: '#', icon: 'fa-message' },
	{ title: '一言 - Poweroff', url: '#', icon: 'fa-message' },
	{ title: '一言 - Arknights~', url: '#', icon: 'fa-message' },
	{ title: '一言 - Minecart:Jvav', url: '#', icon: 'fa-message' },
	{ title: '一言 - 小猫娘智商不高', url: '#', icon: 'fa-message' },
	{ title: '一言 - 服务器IP是127.0.0.1！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 使用i9级显卡！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 这不是bug,这是特性！', url: '#', icon: 'fa-message' },
	{ title: '一言 - 听君一席话胜听半席话', url: '#', icon: 'fa-message' },
	{ title: '一言 - 一周不见如隔七日', url: '#', icon: 'fa-message' },
    { title: 'GitHub', url: 'https://github.com/AsZhangKer', icon: 'fa-github' },
    { title: 'Bilibili', url: 'https://space.bilibili.com/1909724646', icon: 'fa-bilibili' },
    { title: 'QQ群', url: 'https://qm.qq.com/q/wgSYwLP1Zu', icon: 'fa-qq' },
  ];

  // 创建搜索弹窗
  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = 
    '<div class="search-modal">' +
      '<button class="search-close"><i class="fas fa-times"></i></button>' +
      '<input type="text" class="search-input-lg" placeholder="搜索全站内容..." autofocus>' +
      '<div class="search-results"></div>' +
      '<div class="search-hint">输入关键词搜索，按 Enter 跳转</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var searchOverlay = overlay;
  var searchInput = overlay.querySelector('.search-input-lg');
  var searchResults = overlay.querySelector('.search-results');
  var searchClose = overlay.querySelector('.search-close');

  // 打开搜索
  function openSearch() {
    searchOverlay.classList.add('active');
    setTimeout(function() {
      searchInput.focus();
      searchInput.value = '';
      searchResults.innerHTML = '';
    }, 100);
  }

  // 关闭搜索
  function closeSearch() {
    searchOverlay.classList.remove('active');
  }

  // 搜索逻辑
  function performSearch(query) {
    if (!query || query.trim() === '') {
      searchResults.innerHTML = '';
      return;
    }
    var q = query.toLowerCase().trim();
    var results = searchData.filter(function(item) {
      return item.title.toLowerCase().includes(q);
    });

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="result-empty"><i class="fas fa-search"></i> 没有找到相关结果</div>';
      return;
    }

    var html = '';
    results.forEach(function(item) {
      html += '<a href="' + item.url + '" class="result-item" target="' + (item.url.startsWith('http') ? '_blank' : '_self') + '">' +
        '<i class="fas ' + item.icon + '"></i> ' + item.title +
      '</a>';
    });
    searchResults.innerHTML = html;
  }

  // 事件绑定
  // 导航栏搜索按钮
  var navSearchBtn = document.querySelector('.search-btn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var input = document.querySelector('.search-input');
      if (input && input.value.trim()) {
        // 如果输入框有内容，直接搜索
        openSearch();
        setTimeout(function() {
          searchInput.value = input.value;
          performSearch(input.value);
        }, 150);
      } else {
        openSearch();
      }
    });
  }

  // 导航栏搜索框回车
  var navInput = document.querySelector('.search-input');
  if (navInput) {
    navInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var val = this.value.trim();
        if (val) {
          openSearch();
          setTimeout(function() {
            searchInput.value = val;
            performSearch(val);
          }, 150);
        }
      }
    });
  }

  // 弹窗搜索输入
  searchInput.addEventListener('input', function() {
    performSearch(this.value);
  });

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var firstResult = searchResults.querySelector('.result-item');
      if (firstResult) {
        window.location.href = firstResult.href;
      }
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // 关闭按钮
  searchClose.addEventListener('click', closeSearch);

  // 点击背景关闭
  searchOverlay.addEventListener('click', function(e) {
    if (e.target === this) {
      closeSearch();
    }
  });

  // ESC关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // ============================================
  // 4. 每日一言 (React 组件)
  // ============================================
  if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
    var ReactObj = React;
    var ReactDOMObj = ReactDOM;
    var useState = ReactObj.useState;
    var useEffect = ReactObj.useEffect;
    var useRef = ReactObj.useRef;
    var useCallback = ReactObj.useCallback;

    var clientBios = [
      { text: "114514", count: 0 },
      { text: "探索、创造、分享", count: 0 },
      { text: "你好中国！", count: 0 },
      { text: "https://zker.top", count: 0 },
      { text: "www.noctiro.moe", count: 0 },
      { text: "萌ICP备！", count: 0 },
      { text: "服务器azsu.top", count: 0 },
      { text: "往人中下面洞里塞炸鸡很舒服", count: 0 },
      { text: "awa qwq owo ovo qaq", count: 0 },
      { text: "句末请加半括号（", count: 0 },
      { text: "明天的事后天就知道了", count: 0 },
      { text: "永远不要在晚上搞机！", count: 0 },
      { text: "我们使用先进的视窗11系统！", count: 0 },
      { text: "00后现在没人到30！", count: 0 },
      { text: "内存=黄金", count: 0 },
      { text: "去末地种蘑菇吧！", count: 0 },
      { text: "rm -rf /* ", count: 0 },
      { text: "Poweroff", count: 0 },
      { text: "Arknights~", count: 0 },
      { text: "Minecart:Jvav", count: 0 },
      { text: "小猫娘智商不高", count: 0 },
      { text: "服务器IP是127.0.0.1！", count: 0 },
      { text: "使用i9级显卡！", count: 0 },
      { text: "这不是bug,这是特性！", count: 0 },
      { text: "听君一席话胜听半席话", count: 0 },
      { text: "一周不见如隔七日", count: 0 },
    ];

    var getMaxLength = function() {
      var w = window.innerWidth;
      if (w < 480) return 10;
      if (w < 768) return 14;
      return 20;
    };

    function BioTyper() {
      var biosRef = useRef(JSON.parse(JSON.stringify(clientBios)));
      var lastIndexRef = useRef(-1);
      var displayState = useState("");
      var display = displayState[0];
      var setDisplay = displayState[1];
      var charsState = useState([]);
      var chars = charsState[0];
      var setChars = charsState[1];
      var indexState = useState(0);
      var index = indexState[0];
      var setIndex = indexState[1];
      var stepState = useState("idle");
      var step = stepState[0];
      var setStep = stepState[1];
      var manualState = useState(false);
      var isManualRestart = manualState[0];
      var setIsManualRestart = manualState[1];
      var timeoutRef = useRef(null);
      var maxLenRef = useRef(getMaxLength());

      useEffect(function() {
        var handleResize = function() {
          maxLenRef.current = getMaxLength();
        };
        window.addEventListener('resize', handleResize);
        return function() {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      var pickNext = useCallback(function() {
        var bios = biosRef.current;
        var lastIndex = lastIndexRef.current;
        var available = bios.map(function(bio, idx) {
          return { bio: bio, idx: idx };
        }).filter(function(item) {
          return item.idx !== lastIndex;
        });
        var pool = available.length ? available : bios.map(function(bio, idx) {
          return { bio: bio, idx: idx };
        });
        var weights = pool.map(function(item) {
          return 1 / Math.sqrt(item.bio.count + 1);
        });
        var total = 0;
        for (var i = 0; i < weights.length; i++) {
          total += weights[i];
        }
        var r = Math.random() * total;
        for (var j = 0; j < pool.length; j++) {
          r -= weights[j];
          if (r <= 0) {
            var idx = pool[j].idx;
            lastIndexRef.current = idx;
            bios[idx].count += 1;
            return pool[j].bio.text;
          }
        }
        lastIndexRef.current = pool[0].idx;
        bios[pool[0].idx].count += 1;
        return pool[0].bio.text;
      }, []);

      var clearTimer = useCallback(function() {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, []);

      useEffect(function() {
        clearTimer();
        if (step === "idle") {
          var text = pickNext();
          var maxLen = maxLenRef.current;
          if (text.length > maxLen) {
            text = text.substring(0, maxLen) + '…';
          }
          setChars(Array.from(text));
          setDisplay("");
          setIndex(0);
          setStep("typing");
        } else if (step === "typing") {
          if (index < chars.length) {
            var char = chars[index];
            var delay = 75 + Math.random() * 60 + (/[，。？！、：,.?!:]/.test(char) ? 250 : 0);
            timeoutRef.current = setTimeout(function() {
              setDisplay(function(prev) { return prev + char; });
              setIndex(function(i) { return i + 1; });
            }, delay);
          } else {
            setStep("holding");
          }
        } else if (step === "holding") {
          var holdDelay = isManualRestart ? 0 : Math.max(1500, (chars.length / 5) * 1500);
          timeoutRef.current = setTimeout(function() {
            setStep("deleting");
            setIsManualRestart(false);
          }, holdDelay);
        } else if (step === "deleting") {
          if (index > 0) {
            var delDelay = 20 + (Math.random() + index / chars.length) * 40;
            timeoutRef.current = setTimeout(function() {
              setDisplay(chars.slice(0, index - 1).join(""));
              setIndex(function(i) { return i - 1; });
            }, delDelay);
          } else {
            timeoutRef.current = setTimeout(function() { setStep("idle"); }, 300);
          }
        }
        return clearTimer;
      }, [step, index, chars, isManualRestart, pickNext, clearTimer]);

      var manualRestart = function() {
        clearTimer();
        if (display && step !== "deleting") {
          setIsManualRestart(true);
          setStep("holding");
        } else {
          setStep("idle");
        }
      };

      return ReactObj.createElement('div', {
        onClick: manualRestart,
        className: 'typer-component',
        title: '点击切换文本'
      }, display || '...');
    }

    var rootEl = document.getElementById('typer-root');
    if (rootEl) {
      var root = ReactDOMObj.createRoot(rootEl);
      root.render(ReactObj.createElement(BioTyper, null, null));
    }
  }
})();