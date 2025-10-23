class Carousel {
    constructor(containerId, images, options = {}) {
        // 初始化基本属性
        this.container = document.getElementById(containerId);
        this.images = images || [];
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        // 配置选项
        this.options = {
            autoPlay: options.autoPlay !== undefined ? options.autoPlay : true,
            interval: options.interval || 5000,
            prevBtnId: options.prevBtnId || 'carousel-prev',
            nextBtnId: options.nextBtnId || 'carousel-next',
            indicatorsId: options.indicatorsId || 'carousel-indicators'
        };
        
        // 获取DOM元素
        this.prevBtn = document.getElementById(this.options.prevBtnId);
        this.nextBtn = document.getElementById(this.options.nextBtnId);
        this.indicatorsContainer = document.getElementById(this.options.indicatorsId);
        
        // 初始化轮播
        this.init();
    }
    
    // 初始化轮播
    init() {
        // 检查容器是否存在
        if (!this.container) {
            console.error('轮播容器不存在');
            return;
        }
        
        // 如果没有图片，显示默认内容
        if (this.images.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // 创建轮播图片
        this.createSlides();
        
        // 创建指示器
        this.createIndicators();
        
        // 绑定事件
        this.bindEvents();
        
        // 启动自动播放
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
        
        console.log('轮播图初始化完成');
    }
    
    // 创建轮播图片
    createSlides() {
        // 清空容器
        this.container.innerHTML = '';
        
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `absolute inset-0 transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
            slide.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.alt || `轮播图片 ${index + 1}`;
            img.className = 'w-full h-full object-cover';
            
            // 图片加载错误处理
            img.onerror = () => {
                console.log(`图片 ${image.url} 加载失败，使用备用图片`);
                img.src = `https://picsum.photos/1200/600?random=${index}`;
            };
            
            slide.appendChild(img);
            this.container.appendChild(slide);
        });
    }

    // 创建指示器
    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        // 清空指示器容器
        this.indicatorsContainer.innerHTML = '';
        
        this.images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `w-2.5 h-2.5 rounded-full transition-all ${index === 0 ? 'bg-white w-8' : 'bg-white/50'}`;
            indicator.dataset.index = index;
            indicator.title = `切换到第 ${index + 1} 张图片`;
            
            // 绑定点击事件
            indicator.addEventListener('click', () => {
                console.log(`点击指示器 ${index}`);
                this.goToSlide(index);
            });
            
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    // 绑定事件
    bindEvents() {
        // 上一张按钮
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                console.log('点击上一张按钮');
                this.prevSlide();
            });
            
            // 添加键盘事件支持
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    console.log('左箭头键 - 上一张');
                    this.prevSlide();
                }
            });
        }
        
        // 下一张按钮
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                console.log('点击下一张按钮');
                this.nextSlide();
            });
            
            // 添加键盘事件支持
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    console.log('右箭头键 - 下一张');
                    this.nextSlide();
                }
            });
        }
        
        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => {
            if (this.options.autoPlay) {
                console.log('鼠标悬停 - 暂停自动播放');
                this.stopAutoPlay();
            }
        });
        
        // 鼠标离开时恢复自动播放
        this.container.addEventListener('mouseleave', () => {
            if (this.options.autoPlay) {
                console.log('鼠标离开 - 恢复自动播放');
                this.startAutoPlay();
            }
        });
    }
    
    // 切换到上一张
    prevSlide() {
        if (this.isAnimating) return;
        
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(newIndex);
    }
    
    // 切换到下一张
    nextSlide() {
        if (this.isAnimating) return;
        
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(newIndex);
    }
    
    // 切换到指定索引的幻灯片
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex || index < 0 || index >= this.images.length) {
            return;
        }
        
        this.isAnimating = true;
        console.log(`切换到幻灯片 ${index}`);
        
        // 获取所有幻灯片
        const slides = this.container.querySelectorAll('[data-index]');
        
        // 隐藏当前幻灯片
        slides[this.currentIndex].classList.remove('opacity-100');
        slides[this.currentIndex].classList.add('opacity-0');
        
        // 显示目标幻灯片
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        
        // 更新指示器
        this.updateIndicators(index);
        
        // 更新当前索引
        this.currentIndex = index;
        
        // 动画结束后重置状态
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    // 更新指示器状态
    updateIndicators(activeIndex) {
        if (!this.indicatorsContainer) return;
        
        const indicators = this.indicatorsContainer.querySelectorAll('button');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('bg-white', 'w-8');
                indicator.classList.remove('bg-white/50');
            } else {
                indicator.classList.add('bg-white/50');
                indicator.classList.remove('bg-white', 'w-8');
            }
        });
    }
    
    // 开始自动播放
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        this.autoPlayInterval = setInterval(() => {
            console.log('自动播放 - 切换到下一张');
            this.nextSlide();
        }, this.options.interval);
    }
    
    // 停止自动播放
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // 显示空状态
    showEmptyState() {
        this.container.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-gray-100">
                <p class="text-gray-500">没有图片可显示</p>
            </div>
        `;
    }
}

// 优秀玩家展示功能
function initFeaturedPlayers() {
    const playersContainer = document.getElementById('players-container');
    const playersData = AppConfig.featuredPlayers || [];
    
    if (!playersContainer || playersData.length === 0) return;
    
    // 清空容器
    playersContainer.innerHTML = '';
    
    // 渲染玩家卡片
    playersData.forEach(player => {
        // 创建标签HTML
        const tagsHtml = player.tags.map(tag => `
            <span class="tag ${tag.color}">
                ${tag.name}
            </span>
        `).join('');
        
        // 创建玩家卡片
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card bg-white rounded-xl p-6 shadow-sm';
        playerCard.innerHTML = `
            <div class="flex flex-col items-center text-center mb-4">
                <img src="${player.avatar}" alt="${player.name}的头像" 
                     class="player-avatar w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm mb-4">
                <h3 class="text-xl font-semibold mb-2">${player.name}</h3>
                <div class="flex flex-wrap justify-center">
                    ${tagsHtml}
                </div>
            </div>
            <p class="text-dark text-sm mb-4">${player.description}</p>
            <div class="flex items-center text-primary text-sm">
                <i class="fa fa-envelope-o mr-2"></i>
                <span>${player.contact}</span>
            </div>
        `;
        
        playersContainer.appendChild(playerCard);
    });
}


// 初始化截图浏览功能
function initScreenshots() {
    const container = document.getElementById('screenshot-container');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicators = document.getElementById('page-indicators');
    const pageInfo = document.getElementById('page-info');
    const screenshots = AppConfig.screenshots || [];
    const itemsPerPage = 4; // 保持每页4项，用于2x2布局
    let currentPage = 0;
    let totalPages = Math.ceil(screenshots.length / itemsPerPage);
    
    // 创建截图页面
    function createScreenshotPages() {
        if (!container) return;
        
        container.innerHTML = '';
        
        // 计算总页数
        totalPages = Math.ceil(screenshots.length / itemsPerPage);
        
        // 更新页码信息
        if (pageInfo) {
            pageInfo.textContent = `第 ${currentPage + 1} 页，共 ${totalPages} 页`;
        }
        
        // 创建页码指示器
        if (pageIndicators) {
            pageIndicators.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.className = `page-dot ${i === currentPage ? 'active' : ''}`;
                dot.addEventListener('click', () => goToPage(i));
                pageIndicators.appendChild(dot);
            }
        }
        
        // 禁用/启用分页按钮
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;
        
        // 创建当前页的截图
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, screenshots.length);
        const currentScreenshots = screenshots.slice(startIndex, endIndex);
        
        // 修改网格布局为固定2列，实现2x2效果
        const page = document.createElement('div');
        page.className = 'grid grid-cols-2 gap-6'; // 关键修改：固定为2列
        
        currentScreenshots.forEach(screenshot => {
            const item = document.createElement('div');
            item.className = 'screenshot-item rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow';
            
            const img = document.createElement('img');
            img.src = screenshot.url;
            img.alt = screenshot.alt;
            img.className = 'w-full h-full object-cover transform transition-transform duration-500 hover:scale-110';
            
            item.appendChild(img);
            page.appendChild(item);
        });
        
        container.appendChild(page);
    }
    
    // 切换到指定页
    function goToPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        currentPage = pageIndex;
        createScreenshotPages();
    }
    
    // 上一页
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                createScreenshotPages();
            }
        });
    }
    
    // 下一页
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                createScreenshotPages();
            }
        });
    }
    
    // 初始化截图页面
    createScreenshotPages();
}

// 服务器状态功能
function initServerStatus() {
    if (!document.getElementById('server-status')) return;
    
    // 添加超时设置
    async function fetchWithTimeout(url, timeout = 5000) {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('请求超时')), timeout)
            )
        ]);
    }

    async function fetchServerStatus() {
        try {
            setLoadingState(true);
            
            let response, data;
            try {
                response = await fetchWithTimeout(AppConfig.serverStatus.apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP错误: ${response.status}`);
                }
                
                data = await response.json();
            } catch (error) {
                console.warn('获取服务器状态失败，使用备用数据:', error);
                data = AppConfig.serverStatus.fallback;
            }
            
            updateServerStatusUI(data);
            document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
            
        } catch (error) {
            console.error('获取服务器状态失败:', error);
            showErrorState();
        } finally {
            setLoadingState(false);
        }
    }

    function updateServerStatusUI(data) {
        const serverStatus = document.getElementById('server-status');
        const serverStatusIndicator = document.getElementById('server-status-indicator');
        const playerCount = document.getElementById('player-count');
        
        const isOnline = data.online === true || data.status === 'online';
        const playersOnline = data.players?.online ?? 0;
        const playersMax = data.players?.max ?? 0;
        const version = data.version ?? '未知';
        
        if (isOnline) {
            serverStatus.textContent = '在线';
            serverStatus.className = 'text-primary font-semibold';
            serverStatusIndicator.className = 'status-indicator online w-4 h-4 rounded-full bg-green-500';
            
            playerCount.textContent = playersOnline;
            document.getElementById('server-version').textContent = version;
            document.getElementById('max-players').textContent = playersMax;
        } else {
            serverStatus.textContent = '离线';
            serverStatus.className = 'text-red-500 font-semibold';
            serverStatusIndicator.className = 'status-indicator w-4 h-4 rounded-full bg-red-500';
            
            playerCount.textContent = '0';
            document.getElementById('server-version').textContent = '未知';
            document.getElementById('max-players').textContent = '未知';
        }
    }

    function showErrorState() {
        const serverStatus = document.getElementById('server-status');
        const serverStatusIndicator = document.getElementById('server-status-indicator');
        const playerCount = document.getElementById('player-count');
        
        serverStatus.textContent = '无法连接';
        serverStatus.className = 'text-dark font-semibold';
        serverStatusIndicator.className = 'status-indicator w-4 h-4 rounded-full bg-yellow-500';
        
        playerCount.textContent = '?';
        document.getElementById('server-version').textContent = '未知';
        document.getElementById('max-players').textContent = '未知';
    }

    function setLoadingState(isLoading) {
        document.querySelectorAll('.loading-spinner').forEach(el => {
            el.style.display = isLoading ? 'inline-block' : 'none';
        });
    }

    // 初始化服务器状态
    fetchServerStatus();
    // 定时更新
    setInterval(fetchServerStatus, 30000);
}

// 初始化玩家留言
function initComments() {
    const commentsContainer = document.getElementById('comments-container');
    const prevBtn = document.getElementById('prev-comments');
    const nextBtn = document.getElementById('next-comments');
    const pageInfoEl = document.getElementById('comments-page-info');
    const commentsPerPage = AppConfig.comments.perPage || 5;
    let currentPage = 1;
    let totalPages = 1;
    
    // 加载留言
    function loadComments(page = 1) {
        if (!commentsContainer) return;
        
        // 显示加载状态
        commentsContainer.innerHTML = '<div class="text-center py-8"><i class="fa fa-circle-o-notch loading-spinner text-primary text-2xl"></i></div>';
        
        // 构建API请求URL
        let url = `${AppConfig.comments.apiUrl}?per_page=${commentsPerPage}&page=${page}`;
        if (AppConfig.comments.pageId) {
            url += `&post=${AppConfig.comments.pageId}`;
        }
        
        fetch(url)
            .then(response => {
                // 获取总页数
                const total = response.headers.get('X-WP-Total');
                totalPages = Math.ceil(total / commentsPerPage);
                
                // 更新分页信息
                if (pageInfoEl) {
                    pageInfoEl.textContent = `第 ${page} 页，共 ${totalPages} 页`;
                }
                
                // 禁用/启用分页按钮
                if (prevBtn) prevBtn.disabled = page === 1;
                if (nextBtn) nextBtn.disabled = page === totalPages;
                
                return response.json();
            })
            .then(comments => {
                renderComments(comments);
            })
            .catch(error => {
                console.error('获取留言失败:', error);
                commentsContainer.innerHTML = '<p class="text-center text-red-500 py-8">加载留言失败，请稍后重试</p>';
            });
    }
    
    // 渲染留言
    function renderComments(comments) {
        if (!commentsContainer) return;
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="text-center text-dark py-8">暂无留言</p>';
            return;
        }
        
        commentsContainer.innerHTML = '';
        
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'bg-white rounded-xl p-6 shadow-sm mb-4';
            commentEl.innerHTML = `
                <div class="flex items-start">
                    <img src="${comment.author_avatar_urls['48'] || 'https://picsum.photos/48/48'}" alt="${comment.author_name}的头像" class="w-10 h-10 rounded-full mr-3 object-cover">
                    <div class="flex-1">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h4 class="font-medium">${comment.author_name}</h4>
                            <span class="text-gray-400 text-sm mt-1 sm:mt-0">${new Date(comment.date).toLocaleString()}</span>
                        </div>
                        <p class="text-dark comment-content">${comment.content.rendered}</p>
                    </div>
                </div>
            `;
            
            commentsContainer.appendChild(commentEl);
        });
    }
    
    // 上一页
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadComments(currentPage);
            }
        });
    }
    
    // 下一页
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                loadComments(currentPage);
            }
        });
    }
    
    // 初始加载第一页留言
    loadComments(currentPage);
}

// 初始化通用功能
function initCommonFeatures() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('bg-white/80');
                navbar.classList.add('bg-white');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('bg-white/80');
                navbar.classList.remove('bg-white');
            }
        });
    }
    
    // 设置网站名称
    const siteNameElements = [
        document.getElementById('site-name'),
        document.getElementById('footer-site-name')
    ];
    siteNameElements.forEach(el => {
        if (el) {
            el.textContent = AppConfig.siteInfo.name;
        }
    });
    
    // 设置加入服务器标题
    const joinTitle = document.getElementById('join-title');
    if (joinTitle) {
        joinTitle.textContent = `加入 ${AppConfig.siteInfo.name}`;
    }
    
    // 设置加入服务器IP
    const joinServerIp = document.getElementById('join-server-ip');
    if (joinServerIp) {
        joinServerIp.textContent = AppConfig.siteInfo.serverIp;
    }
    // 设置服务器IP
    const ipElements = [
        document.getElementById('server-ip'),
        document.getElementById('join-server-ip')
    ];
    ipElements.forEach(el => {
        if (el) el.textContent = AppConfig.siteInfo.serverIp;
    });
    
    // 设置支持链接
    const supportLinks = {
        'forum-link': 'forum',
        'discord-link': 'discord',
        'qqgroup-link': 'qqGroup',
        'bilibili-link': 'bilibili',
        'helpcenter-link': 'helpCenter',
        'rules-link': 'rules',
        'contact-link': 'contact',
        'report-link': 'reportIssue'
    };
    
    Object.keys(supportLinks).forEach(id => {
        const el = document.getElementById(id);
        if (el && AppConfig.supportLinks[supportLinks[id]]) {
            el.href = AppConfig.supportLinks[supportLinks[id]];
        }
    });
}

// 初始化所有动态内容
function initDynamicContent() {
    // 设置网站名称
    const siteNameElements = [
        document.getElementById('site-name'),
        document.getElementById('footer-site-name'),
        document.getElementById('join-title')
    ];
    siteNameElements.forEach(el => {
        if (el) {
            if (el.id === 'join-title') {
                el.textContent = `加入 ${AppConfig.siteInfo.name}`;
            } else {
                el.textContent = AppConfig.siteInfo.name;
            }
        }
    });
}

// 等待DOM和配置文件加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查配置是否加载
    if (typeof AppConfig === 'undefined') {
        console.error('配置文件未加载，请确保正确引入config.js');
        // 显示错误信息
        const errorEl = document.createElement('div');
        errorEl.className = 'fixed top-0 left-0 right-0 bg-red-500 text-white p-4 z-50 text-center';
        errorEl.textContent = '网站配置加载失败，请刷新页面重试';
        document.body.prepend(errorEl);
        return;
    }

    // 初始化所有动态内容
    initDynamicContent();
    
    // 初始化顶部轮播 - 使用重构后的Carousel类
    if (document.getElementById('carousel')) {
        console.log('初始化轮播图');
        new Carousel('carousel', AppConfig.heroImages, {
            autoPlay: true,
            interval: 5000,
            prevBtnId: 'carousel-prev',
            nextBtnId: 'carousel-next',
            indicatorsId: 'carousel-indicators'
        });
    }

    
    // 初始化截图功能
    initScreenshots();
    
    // 初始化服务器状态
    initServerStatus();
    
    // 初始化玩家留言
    initComments();
    
    // 初始化赞助者列表（如果在赞助页面）
    if (document.getElementById('donors-list')) {
        initDonorsList();
    }
function initServerLaunchInfo() {
    // 获取开服日期配置
    const launchDate = AppConfig.siteInfo.launchDate;
    if (!launchDate) return;
    
    // 显示开服日期
    document.getElementById('server-launch-date').textContent = formatDate(launchDate);
    
    // 计算并显示开服时长
    updateServerUptime(launchDate);
    
    // 每小时更新一次开服时长
    setInterval(() => {
        updateServerUptime(launchDate);
    }, 3600000);
}

// 格式化日期显示
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 计算并更新开服时长
function updateServerUptime(launchDateString) {
    const launchDate = new Date(launchDateString);
    const now = new Date();
    const diffTime = now - launchDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);
    
    let uptimeText = '';
    if (diffYears > 0) {
        uptimeText = `${diffYears}年${diffMonths % 12}月${diffDays % 30}天`;
    } else if (diffMonths > 0) {
        uptimeText = `${diffMonths}月${diffDays % 30}天`;
    } else {
        uptimeText = `${diffDays}天`;
    }
    
    document.getElementById('server-up-time').textContent = uptimeText;
}

    // 赞助者列表功能
function initDonorsList() {
    // 从配置获取赞助者数据
    const donorsData = AppConfig.donors || [];

    // 赞助者列表配置
    const donorsPerPage = 5;
    const donorsList = document.getElementById('donors-list');
    const loadMoreBtn = document.getElementById('load-more-donors');
    const totalAmountEl = document.getElementById('total-amount');
    const donorCountEl = document.getElementById('donor-count');
    const lastUpdateEl = document.getElementById('last-update');
    const sortAmountBtn = document.getElementById('sort-amount');
    const sortDateBtn = document.getElementById('sort-date');
    const donorSearchInput = document.getElementById('donor-search');
    
    let currentDonorsPage = 1;
    let totalDonorsPages = 1;
    let filteredDonors = [...donorsData]; // 用于搜索过滤
    let sortType = 'date'; // 默认按日期排序

    // 初始化赞助者列表
    function initDonorsList() {
        // 计算统计数据
        calculateDonorStats();
        
        // 计算总页数
        totalDonorsPages = Math.ceil(filteredDonors.length / donorsPerPage);
        
        // 显示当前页的赞助者
        displayDonorsPage(currentDonorsPage);
        
        // 更新加载更多按钮状态
        updateLoadMoreButton();
    }

    // 计算赞助统计数据
    function calculateDonorStats() {
        // 计算总金额
        const totalAmount = donorsData.reduce((sum, donor) => sum + donor.amount, 0);
        // 格式化金额显示
        totalAmountEl.textContent = `¥${totalAmount.toLocaleString()}`;
        
        // 显示赞助人数
        donorCountEl.textContent = donorsData.length;
        
        // 显示最后更新日期（取最新的赞助日期）
        if (donorsData.length > 0) {
            const sortedByDate = [...donorsData].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
            lastUpdateEl.textContent = sortedByDate[0].date;
        }
    }

    // 显示指定页的赞助者
    function displayDonorsPage(page) {
        if (!donorsList) return;
        
        // 清空当前列表
        donorsList.innerHTML = '';
        
        // 计算当前页的起始和结束索引
        const startIndex = (page - 1) * donorsPerPage;
        const endIndex = Math.min(startIndex + donorsPerPage, filteredDonors.length);
        
        // 获取当前页的赞助者
        const currentDonors = filteredDonors.slice(startIndex, endIndex);
        
        // 显示赞助者
        currentDonors.forEach(donor => {
            // 确定赞助等级
            let donorClass, badgeClass, badgeText;
            if (donor.amount >= 100) {
                donorClass = 'donor-diamond';
                badgeClass = 'bg-yellow-100 text-yellow-800';
                badgeText = '钻石赞助者';
            } else if (donor.amount >= 50) {
                donorClass = 'donor-gold';
                badgeClass = 'bg-gray-100 text-gray-800';
                badgeText = '黄金赞助者';
            } else {
                donorClass = 'donor-silver';
                badgeClass = 'bg-amber-100 text-amber-800';
                badgeText = '白银赞助者';
            }
            
            // 创建赞助者元素
            const donorEl = document.createElement('div');
            donorEl.className = `p-5 ${donorClass} hover:bg-gray-50 transition-colors`;
            donorEl.innerHTML = `
                <div class="flex flex-wrap justify-between items-start gap-4">
                    <div>
                        <div class="flex items-center">
                            <img src="${donor.avatar || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/48/48`}" 
                                 alt="${donor.name}的头像" 
                                 class="w-8 h-8 rounded-full mr-2 object-cover">
                            <h4 class="font-medium">${donor.name}</h4>
                            <span class="ml-2 px-2 py-0.5 ${badgeClass} text-xs rounded-full">${badgeText}</span>
                        </div>
                        <p class="text-dark text-sm mt-1">"${donor.message}"</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-primary">¥${donor.amount}</p>
                        <p class="text-gray-500 text-xs mt-1">${donor.date}</p>
                    </div>
                </div>
            `;
            
            donorsList.appendChild(donorEl);
        });
        
        // 如果没有赞助者
        if (filteredDonors.length === 0) {
            donorsList.innerHTML = `
                <div class="p-6 text-center">
                    <i class="fa fa-heart-o text-2xl text-gray-300 mb-3"></i>
                    <p class="text-dark">暂无赞助记录</p>
                    <p class="text-sm text-gray-500 mt-2">成为第一个支持服务器的玩家吧！</p>
                </div>
            `;
        }
    }

    // 更新加载更多按钮状态
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        if (currentDonorsPage >= totalDonorsPages) {
            loadMoreBtn.innerHTML = '没有更多了';
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            loadMoreBtn.innerHTML = '查看更多赞助者 <i class="fa fa-chevron-down ml-1"></i>';
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    // 加载更多赞助者
    function loadMoreDonors() {
        if (currentDonorsPage >= totalDonorsPages) return;
        
        currentDonorsPage++;
        displayDonorsPage(currentDonorsPage);
        updateLoadMoreButton();
    }

    // 排序赞助者
    function sortDonors(type) {
        if (sortType === type) return;
        
        sortType = type;
        
        // 更新按钮样式
        if (type === 'amount') {
            sortAmountBtn.classList.add('bg-primary', 'text-white');
            sortAmountBtn.classList.remove('bg-light', 'text-dark');
            sortDateBtn.classList.add('bg-light', 'text-dark');
            sortDateBtn.classList.remove('bg-primary', 'text-white');
            
            // 按金额降序排序
            filteredDonors.sort((a, b) => b.amount - a.amount);
        } else {
            sortDateBtn.classList.add('bg-primary', 'text-white');
            sortDateBtn.classList.remove('bg-light', 'text-dark');
            sortAmountBtn.classList.add('bg-light', 'text-dark');
            sortAmountBtn.classList.remove('bg-primary', 'text-white');
            
            // 按日期降序排序
            filteredDonors.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        // 重置到第一页
        currentDonorsPage = 1;
        displayDonorsPage(currentDonorsPage);
        updateLoadMoreButton();
    }

    // 搜索赞助者
    function handleDonorSearch() {
        const searchTerm = donorSearchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 搜索为空，显示所有
            filteredDonors = [...donorsData];
        } else {
            // 根据名称搜索
            filteredDonors = donorsData.filter(donor => 
                donor.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // 保持当前排序方式
        if (sortType === 'amount') {
            filteredDonors.sort((a, b) => b.amount - a.amount);
        } else {
            filteredDonors.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        // 重置到第一页
        currentDonorsPage = 1;
        totalDonorsPages = Math.ceil(filteredDonors.length / donorsPerPage);
        displayDonorsPage(currentDonorsPage);
        updateLoadMoreButton();
    }

    // 绑定事件
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreDonors);
    }
    
    if (sortAmountBtn && sortDateBtn) {
        sortAmountBtn.addEventListener('click', () => {
            sortDonors('amount');
        });
        sortDateBtn.addEventListener('click', () => {
            sortDonors('date');
        });
    }
    
    if (donorSearchInput) {
        donorSearchInput.addEventListener('input', handleDonorSearch);
    }
    
    // 初始化赞助者列表
    initDonorsList();
}
    // 初始化优秀玩家展示区
    initFeaturedPlayers();
    
    // 初始化通用功能
    initCommonFeatures();
    initServerLaunchInfo();
});