document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const slider = document.querySelector('.slider');
    const selectionBar = document.querySelector('.selection-bar');

    // 更新滑块位置
    function updateSlider(targetItem = document.querySelector('.nav-item.active')) {
        if (!targetItem) return;
        const itemRect = targetItem.getBoundingClientRect();
        const barRect = selectionBar.getBoundingClientRect();
        slider.style.left = `${itemRect.left - barRect.left}px`;
        slider.style.width = `${itemRect.width}px`;
    }

    // 页面切换
    function switchPage(pageId, clickedItem) {
        // 更新滑块（如果有点击项）
        if (clickedItem) {
            updateSlider(clickedItem);
        }

        const newPage = document.getElementById(`${pageId}-page`);
        const oldPage = document.querySelector('.page.active-page');
        if (!newPage || newPage === oldPage) return;

        // 更新导航激活状态
        navItems.forEach(item => item.classList.remove('active'));
        if (clickedItem) {
            clickedItem.classList.add('active');
        } else {
            const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
            if (activeNav) activeNav.classList.add('active');
        }

        // 执行切换动画（仅改变类名，高度由CSS自动处理）
        if (oldPage) {
            oldPage.classList.remove('active-page');
        }
        newPage.classList.add('active-page');
    }

    // 导航点击事件
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) switchPage(page, item);
        });
    });

    // 窗口resize时重新计算滑块位置
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) updateSlider(activeItem);
    });

    // 初始化：激活个人简介，设置滑块
    switchPage('profile', document.querySelector('.nav-item[data-page="profile"]'));

    // 主题切换
    function setTheme(theme) {
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(theme);
        themeToggle.textContent = theme === 'dark-theme' ? '浅色' : '深色';
        // 主题变化后微调滑块（颜色已变，但位置可能因按钮宽度变化而需要调整）
        setTimeout(() => {
            const activeItem = document.querySelector('.nav-item.active');
            if (activeItem) updateSlider(activeItem);
        }, 50);
    }

    themeToggle.textContent = body.classList.contains('light-theme') ? '深色' : '浅色';

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            setTheme('light-theme');
        } else {
            setTheme('dark-theme');
        }
    });

    // 管理面板占位提示
    const adminPlaceholder = document.querySelector('.admin-placeholder');
    if (adminPlaceholder) {
        adminPlaceholder.addEventListener('click', () => {
            console.log('管理面板链接待填充 — 请替换为真实URL');
        });
    }
});