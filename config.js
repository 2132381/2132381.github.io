const AppConfig = {
    // 网站基本信息
    siteInfo: {
        name: "梦之云",
        serverIp: "ratozi.top",
        version: "1.21.9",
        maxPlayers: 100,
        launchDate: "2024-01-10"
    },
    
    
    // 导航链接配置
    navLinks: {
        features: "#features",
        screenshots: "#screenshots",
        status: "#status",
        comments: "#comments",
        donate: "donate.html",
        join: "#join",
        players: "#featured-players"
    },
    
    // 顶部轮播图片配置
    heroImages: [
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" }
    ],
    
    // 游戏截图配置
    screenshots: [
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" },
        { url: "img/1.webp", alt: "暂无" }
    ],
    
    // 服务器状态API配置
    serverStatus: {
        apiUrl: "https://api.mcsrvstat.us/2/ratozi.top",
        fallback: {
            online: true,
            players: {
                online: 0,
                max: 60,
            },
            version: "1.21.9"
        }
    },
    
    // 留言板配置
    comments: {
        apiUrl: "https://kook.vip/oJO7OB",
        pageId: 91, // 替换为实际的留言板页面ID
        perPage: 5
    },
    
    // 赞助者数据
    donors: [
        // {
        //     name: "Steve_Pro",
        //     amount: 200,
        //     message: "服务器很棒，希望越做越好！",
        //     date: "2025-05-18",
        //     avatar: "https://picsum.photos/id/10/48/48"
        // },
		
		    {
				name: "mujiyu",
				amount: 300,
				message: "服务器机子",
				date: "2024-2025",
				avatar: "images/5.png"
			},
		
            {
				name: "一只企鹅",
				amount: 10,
				message: "服务器很棒，希望越做越好！",
				date: "2024年",
				avatar: "images/3.jpg"
			},
		
		
		   {
				name: "欣",
				amount: 10,
				message: "服务器很棒，希望越做越好！",
				date: "2024",
				avatar: "images/6.jpg"
			},
		
    ],

    // 优秀玩家配置
    featuredPlayers: [

        {
            id: 1,
            name: "mujiyu",
            avatar: "img/5.png",
            contact: "1719395375@qq.com",
            description: "擅长制作我的世界生存类服务器，网页开发",
            tags: [
                { name: "服务器拥有者", color: "bg-green-500" },
                { name: "网站开放", color: "bg-purple-500" }
            ]
        },
        {
            id: 2,
            name: "X_IE",
            avatar: "img/2.jpg",
            contact: "3542705790@qq.com",
            description: "建筑专家、视频创作者，经常为服务器制作视频、策划活动等",
            tags: [
                { name: "建筑专家", color: "bg-yellow-500" },
                { name: "视频作者", color: "bg-blue-500" }
            ]
        },
        {
            id: 3,
            name: "wind_Blood",
            avatar: "img/1.jpg",
            contact: "1635999066@qq.com",
            description: "合作XSMP服务器",
            tags: [
                { name: "管理员", color: "bg-orange-500" },
                { name: "合作伙伴", color: "bg-teal-500" }
            ]
        },
        {
            id: 4,
            name: "一只企鹅",
            avatar: "img/3.jpg",
            contact: "441666132@qq.com",
            description: "服务器元老级玩家，经常为服务器策划活动、建设活动场地、为新人玩家答疑解惑",
            tags: [
                { name: "管理员", color: "bg-red-500" },
                { name: "老玩家", color: "bg-gray-700" }
            ]
        }
    ],
    
    // 支持页面链接
    supportLinks: {
        helpCenter: "https://qm.qq.com/q/eU9V8Aa1ji",
        rules: "https://qm.qq.com/q/eU9V8Aa1ji",
        contact: "https://qm.qq.com/q/eU9V8Aa1ji",
        reportIssue: "https://qm.qq.com/q/eU9V8Aa1ji",
        forum: "https://qm.qq.com/q/eU9V8Aa1ji",
        discord: "https://qm.qq.com/q/eU9V8Aa1ji",
        qqGroup: "https://qm.qq.com/q/eU9V8Aa1ji",
        bilibili: "https://qm.qq.com/q/eU9V8Aa1ji"
    },
    
    // 收款码图片
    paymentQrCodes: {
        wechat: "images/4.jpg",
        alipay: "images/5.jpg"
    }
};