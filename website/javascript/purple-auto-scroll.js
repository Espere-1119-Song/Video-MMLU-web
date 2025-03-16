document.addEventListener('DOMContentLoaded', function() {
    // 获取所有带有carousel-enabled类的容器
    const carouselContainers = document.querySelectorAll('.carousel-enabled');
    
    carouselContainers.forEach(container => {
        // 检查是否是紫色容器
        if (container.style.backgroundColor && container.style.backgroundColor.includes('f0e6ff')) {
            // 为紫色容器添加特殊处理
            setupPurpleCarousel(container);
        }
    });
    
    function setupPurpleCarousel(container) {
        // 获取表格和行
        const table = container.querySelector('table');
        const row = table.querySelector('tr');
        const cells = row.querySelectorAll('td');
        
        // 设置自动滚动
        let scrollPosition = 0;
        const scrollSpeed = 1;
        const cellWidth = cells[0].offsetWidth;
        let scrollInterval;
        
        // 创建滚动函数
        function scroll() {
            scrollPosition += scrollSpeed;
            
            // 当滚动到一个单元格的宽度时，重置位置并将第一个单元格移到末尾
            if (scrollPosition >= cellWidth) {
                scrollPosition = 0;
                const firstCell = row.querySelector('td');
                row.appendChild(firstCell);
            }
            
            // 应用滚动位置
            row.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        // 开始滚动
        function startScroll() {
            if (!scrollInterval) {
                scrollInterval = setInterval(scroll, 30);
            }
        }
        
        // 停止滚动
        function stopScroll() {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
        }
        
        // 初始化滚动
        startScroll();
        
        // 鼠标悬停时暂停滚动
        container.addEventListener('mouseenter', stopScroll);
        
        // 鼠标离开时恢复滚动
        container.addEventListener('mouseleave', startScroll);
        
        // 处理折叠/展开按钮
        const toggleButtons = container.querySelectorAll('.toggle-section');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('aria-controls');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent.style.display === 'block') {
                    targetContent.style.display = 'none';
                    this.querySelector('.fas').classList.remove('fa-angle-up');
                    this.querySelector('.fas').classList.add('fa-angle-down');
                    startScroll(); // 收起时恢复滚动
                } else {
                    targetContent.style.display = 'block';
                    this.querySelector('.fas').classList.remove('fa-angle-down');
                    this.querySelector('.fas').classList.add('fa-angle-up');
                    stopScroll(); // 展开时停止滚动
                }
            });
        });
    }
}); 