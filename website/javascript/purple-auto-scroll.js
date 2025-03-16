document.addEventListener('DOMContentLoaded', function() {
    // 函数初始化紫色区域的自动滚动
    function initPurpleTableAutoScroll() {
        // 获取紫色表格元素
        const tableEl = document.getElementById("purple-video-container");
        if (!tableEl) {
            console.log("Purple table element not found, retrying in 500ms");
            setTimeout(initPurpleTableAutoScroll, 500);
            return;
        }
        
        const tableWrapper = tableEl.querySelector("table");
        if (!tableWrapper) {
            console.log("Purple table wrapper not found, retrying in 500ms");
            setTimeout(initPurpleTableAutoScroll, 500);
            return;
        }
        
        console.log("Auto-scroll initialized for purple table");
        
        // 创建一个滚动容器
        const scrollContainer = document.createElement("div");
        scrollContainer.className = "purple-scroll-container";
        scrollContainer.style.width = "100%";
        scrollContainer.style.overflow = "hidden";
        scrollContainer.style.position = "relative";
        
        // 创建一个滚动轨道
        const scrollTrack = document.createElement("div");
        scrollTrack.className = "purple-scroll-track";
        scrollTrack.style.display = "flex";
        scrollTrack.style.transition = "transform 0.5s ease";
        scrollTrack.style.width = "200%"; // 两倍宽度以容纳所有内容
        
        // 复制表格内容到滚动轨道
        const tableContent = tableWrapper.innerHTML;
        scrollTrack.innerHTML = tableContent + tableContent; // 复制一份内容以实现无缝滚动
        
        // 将滚动轨道添加到滚动容器
        scrollContainer.appendChild(scrollTrack);
        
        // 替换原表格
        tableWrapper.parentNode.replaceChild(scrollContainer, tableWrapper);
        
        // 变量用于自动滚动
        let scrollAmount = 0;
        const scrollSpeed = 1; // 每次间隔滚动的像素数
        let scrollInterval;
        let scrollDirection = 1; // 1表示向右，-1表示向左
        let maxScroll;
        let isPaused = false;
        
        // 开始自动滚动
        function startAutoScroll() {
            if (isPaused) return;
            
            scrollInterval = setInterval(function() {
                maxScroll = scrollTrack.scrollWidth / 2; // 只滚动到一半，然后重置
                
                // 只有在有内容可滚动时才滚动
                if (maxScroll <= 0) return;
                
                // 更新滚动位置
                scrollAmount += (scrollSpeed * scrollDirection);
                
                // 当到达末尾时重置位置
                if (scrollAmount >= maxScroll) {
                    scrollAmount = 0;
                }
                
                // 应用滚动
                scrollTrack.style.transform = `translateX(-${scrollAmount}px)`;
            }, 30); // 调整间隔以获得更平滑/更快的滚动
        }
        
        // 停止滚动
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 鼠标悬停时暂停滚动
        scrollContainer.addEventListener("mouseenter", function() {
            stopScroll();
        });
        
        // 鼠标离开时恢复滚动
        scrollContainer.addEventListener("mouseleave", function() {
            if (!isPaused) {
                startAutoScroll();
            }
        });
        
        // 处理折叠/展开按钮
        const toggleButtons = scrollTrack.querySelectorAll('.toggle-section');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('aria-controls');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent.style.display === 'block') {
                    targetContent.style.display = 'none';
                    this.querySelector('.fas').classList.remove('fa-angle-up');
                    this.querySelector('.fas').classList.add('fa-angle-down');
                    isPaused = false;
                    startAutoScroll(); // 收起时恢复滚动
                } else {
                    targetContent.style.display = 'block';
                    this.querySelector('.fas').classList.remove('fa-angle-down');
                    this.querySelector('.fas').classList.add('fa-angle-up');
                    isPaused = true;
                    stopScroll(); // 展开时停止滚动
                }
            });
        });
        
        // 初始启动滚动
        startAutoScroll();
    }
    
    // 初始化紫色区域的自动滚动
    initPurpleTableAutoScroll();
}); 