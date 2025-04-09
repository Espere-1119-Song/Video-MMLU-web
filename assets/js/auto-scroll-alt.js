document.addEventListener('DOMContentLoaded', function() {
    // 获取所有启用轮播的视频容器
    const videoContainers = document.querySelectorAll(".video-container.carousel-enabled-alt");
    
    // 为每个容器创建轮播
    videoContainers.forEach((videoContainer, index) => {
        createVideoCarousel(videoContainer, index);
    });
    
    // 初始化表格自动滚动
    initTableAutoScroll();
});

function createVideoCarousel(videoContainer, index) {
    // 只处理带有 carousel-enabled-alt 类的视频容器
    if (!videoContainer) {
        console.log("Carousel-enabled-alt video container not found");
        return;
    }
    
    // 获取现有表格
    const existingTable = videoContainer.querySelector("table");
    if (!existingTable) {
        console.log("Video table not found");
        return;
    }
    
    // 获取所有视频单元格
    const videoCells = existingTable.querySelectorAll("td");
    if (!videoCells.length) {
        console.log("No video cells found");
        return;
    }
    
    // 创建一个容器来包含轮播和展开的内容
    const carouselAndContentContainer = document.createElement("div");
    carouselAndContentContainer.className = `carousel-and-content-container-alt carousel-${index}`;
    carouselAndContentContainer.style.position = "relative";
    carouselAndContentContainer.style.width = "100%";
    carouselAndContentContainer.style.marginBottom = "10px";
    
    // 创建轮播容器 - 这里使用不同的背景颜色
    const carouselContainer = document.createElement("div");
    carouselContainer.className = `video-carousel-container-alt carousel-${index}`;
    carouselContainer.style.width = "100%";
    carouselContainer.style.height = "420px";
    carouselContainer.style.backgroundColor = "rgba(230, 230, 250, 0.6)"; // 淡紫色背景
    carouselContainer.style.overflow = "hidden";
    carouselContainer.style.position = "relative";
    carouselContainer.style.margin = "0 auto";
    carouselContainer.style.borderRadius = "8px";
    carouselContainer.style.padding = "10px";
    carouselContainer.style.boxSizing = "border-box";
    carouselContainer.style.border = "none";
    carouselContainer.style.cursor = "grab";
    
    // 创建轮播轨道
    const carouselTrack = document.createElement("div");
    carouselTrack.className = `video-carousel-track-alt track-${index}`;
    carouselTrack.style.display = "flex";
    carouselTrack.style.alignItems = "center";
    carouselTrack.style.position = "absolute";
    carouselTrack.style.left = "0";
    carouselTrack.style.top = "0";
    carouselTrack.style.height = "100%";
    carouselTrack.style.padding = "10px";
    carouselTrack.style.boxSizing = "border-box";
    carouselTrack.style.transition = "transform 0.3s ease";
    carouselTrack.style.overflow = "hidden";
    
    // 创建展开内容区域
    const expandedContentArea = document.createElement("div");
    expandedContentArea.className = `expanded-content-area-alt expanded-area-${index}`;
    expandedContentArea.style.width = "100%";
    expandedContentArea.style.display = "none";
    expandedContentArea.style.marginTop = "5px";
    expandedContentArea.style.position = "relative";
    expandedContentArea.style.zIndex = "5";
    expandedContentArea.style.backgroundColor = "white";
    expandedContentArea.style.borderRadius = "8px";
    expandedContentArea.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    expandedContentArea.style.padding = "15px";
    expandedContentArea.style.boxSizing = "border-box";
    expandedContentArea.style.transition = "height 0.3s ease";
    expandedContentArea.style.maxHeight = "none";
    expandedContentArea.style.overflowY = "visible";
    
    // 为每个视频单元格创建一个视频项
    videoCells.forEach((cell, cellIndex) => {
        const videoItem = document.createElement("div");
        videoItem.className = `video-carousel-item-alt item-${index}-${cellIndex}`;
        videoItem.style.display = "flex";
        videoItem.style.flexDirection = "column";
        videoItem.style.alignItems = "center";
        videoItem.style.justifyContent = "center";
        videoItem.style.minWidth = "500px";
        videoItem.style.maxWidth = "500px";
        videoItem.style.height = "100%";
        videoItem.style.margin = "0 5px";
        videoItem.style.boxSizing = "border-box";
        videoItem.style.position = "relative";
        videoItem.style.overflow = "visible";
        
        // 获取视频和折叠部分
        const video = cell.querySelector("video");
        const collapsibleSection = cell.querySelector(".collapsible-section");
        
        if (video) {
            const videoWrapper = document.createElement("div");
            videoWrapper.className = `video-wrapper-alt wrapper-${index}-${cellIndex}`;
            videoWrapper.style.width = "100%";
            videoWrapper.style.maxWidth = "500px";
            videoWrapper.style.height = "300px";
            videoWrapper.style.margin = "0 auto";
            videoWrapper.style.position = "relative";
            videoWrapper.style.overflow = "hidden";
            videoWrapper.style.zIndex = "1";
            
            const videoClone = video.cloneNode(true);
            videoClone.style.width = "100%";
            videoClone.style.height = "100%";
            videoClone.style.objectFit = "contain";
            
            videoWrapper.appendChild(videoClone);
            videoItem.appendChild(videoWrapper);
        }
        
        if (collapsibleSection) {
            const collapsibleContainer = document.createElement("div");
            collapsibleContainer.className = `collapsible-container-alt container-${index}-${cellIndex}`;
            collapsibleContainer.style.width = "500px";
            collapsibleContainer.style.position = "relative";
            collapsibleContainer.style.marginTop = "5px";
            collapsibleContainer.style.zIndex = "2";
            collapsibleContainer.style.display = "flex";
            collapsibleContainer.style.flexDirection = "column";
            
            // 克隆原始按钮
            const originalButton = collapsibleSection.querySelector("button");
            const button = originalButton.cloneNode(true);
            
            // 保存原始按钮的控制ID
            const targetId = originalButton.getAttribute('aria-controls');
            
            // 设置按钮样式
            button.style.width = "100%";
            button.style.padding = "8px 12px";
            button.style.backgroundColor = "#f5f5f5";
            button.style.border = "1px solid #ddd";
            button.style.borderRadius = "4px";
            button.style.cursor = "pointer";
            button.style.display = "flex";
            button.style.justifyContent = "space-between";
            button.style.alignItems = "center";
            
            // 为按钮添加点击事件
            button.addEventListener("click", function() {
                const icon = this.querySelector(".icon i");
                const originalContent = document.getElementById(targetId);
                
                if (expandedContentArea.style.display === "none") {
                    // 显示内容
                    expandedContentArea.style.display = "block";
                    expandedContentArea.innerHTML = "";
                    
                    // 获取折叠内容
                    const content = collapsibleSection.querySelector(".collapse-content").cloneNode(true);
                    expandedContentArea.appendChild(content);
                    
                    // 同步显示原始内容
                    if (originalContent) {
                        originalContent.style.display = "block";
                    }
                    
                    // 更改图标 - 同时更新原始按钮和克隆按钮的图标
                    if (icon) {
                        icon.className = "fas fa-angle-up";
                    }
                    
                    const originalIcon = originalButton.querySelector(".icon i");
                    if (originalIcon) {
                        originalIcon.className = "fas fa-angle-up";
                    }
                    
                    // 暂停轮播
                    isPaused = true;
                    carouselContainer.style.cursor = "default";
                    stopScroll();
                } else {
                    // 隐藏内容
                    expandedContentArea.style.display = "none";
                    
                    // 同步隐藏原始内容
                    if (originalContent) {
                        originalContent.style.display = "none";
                    }
                    
                    // 更改图标 - 同时更新原始按钮和克隆按钮的图标
                    if (icon) {
                        icon.className = "fas fa-angle-down";
                    }
                    
                    const originalIcon = originalButton.querySelector(".icon i");
                    if (originalIcon) {
                        originalIcon.className = "fas fa-angle-down";
                    }
                    
                    // 恢复轮播
                    isPaused = false;
                    carouselContainer.style.cursor = "grab";
                    startContinuousScroll();
                }
            });
            
            // 禁用原始按钮的点击事件，防止冲突
            originalButton.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 触发克隆按钮的点击事件
                button.click();
                
                return false;
            });
            
            collapsibleContainer.appendChild(button);
            videoItem.appendChild(collapsibleContainer);
        }
        
        carouselTrack.appendChild(videoItem);
    });
    
    carouselContainer.appendChild(carouselTrack);
    
    // 将展开内容区域添加到包装容器，但放在轮播容器之后
    carouselAndContentContainer.appendChild(carouselContainer);
    carouselAndContentContainer.appendChild(expandedContentArea);
    
    // 将包装容器添加到页面
    videoContainer.innerHTML = '';
    videoContainer.appendChild(carouselAndContentContainer);
    videoContainer.style.overflow = "hidden";
    
    // 轮播变量
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let isPaused = false;
    let scrollInterval;
    
    // 触摸事件
    carouselContainer.addEventListener('mousedown', dragStart);
    carouselContainer.addEventListener('touchstart', dragStart);
    carouselContainer.addEventListener('mouseup', dragEnd);
    carouselContainer.addEventListener('touchend', dragEnd);
    carouselContainer.addEventListener('mousemove', drag);
    carouselContainer.addEventListener('touchmove', drag);
    carouselContainer.addEventListener('mouseleave', dragEnd);
    
    // 拖动开始
    function dragStart(event) {
        if (isPaused) return;
        
        event.preventDefault();
        if (event.type === 'touchstart') {
            startPosition = event.touches[0].clientX;
        } else {
            startPosition = event.clientX;
        }
        
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        carouselContainer.style.cursor = 'grabbing';
        
        stopScroll();
    }
    
    // 拖动中
    function drag(event) {
        if (isDragging) {
            let currentPosition;
            if (event.type === 'touchmove') {
                currentPosition = event.touches[0].clientX;
            } else {
                currentPosition = event.clientX;
            }
            
            const diff = currentPosition - startPosition;
            currentTranslate = prevTranslate + diff;
        }
    }
    
    // 拖动结束
    function dragEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100) {
            // 向左滑动
            prevTranslate = currentTranslate;
        } else if (movedBy > 100) {
            // 向右滑动
            prevTranslate = currentTranslate;
        } else {
            // 回到原位
            currentTranslate = prevTranslate;
        }
        
        setSliderPosition();
        carouselContainer.style.cursor = 'grab';
        
        if (!isPaused) {
            startContinuousScroll();
        }
    }
    
    // 动画
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // 设置滑块位置
    function setSliderPosition() {
        // 计算最大和最小平移值
        const trackWidth = carouselTrack.scrollWidth;
        const containerWidth = carouselContainer.offsetWidth;
        const maxTranslate = 0;
        const minTranslate = containerWidth - trackWidth;
        
        // 限制平移范围
        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
            prevTranslate = maxTranslate;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
            prevTranslate = minTranslate;
        }
        
        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    // 开始连续滚动
    function startContinuousScroll() {
        stopScroll(); // 先停止之前的滚动
        
        scrollInterval = setInterval(() => {
            if (!isPaused && !isDragging) {
                const trackWidth = carouselTrack.scrollWidth;
                const containerWidth = carouselContainer.offsetWidth;
                const minTranslate = containerWidth - trackWidth;
                
                currentTranslate -= 2; // 保持2像素的滚动速度
                
                // 如果到达最左边，实现平滑循环
                if (currentTranslate < minTranslate) {
                    // 不要直接跳回到0，而是添加一个平滑过渡
                    // 克隆第一个视频项并添加到轨道末尾
                    const firstItems = carouselTrack.querySelectorAll(`.video-carousel-item-alt[class*="item-${index}-0"]`);
                    
                    if (firstItems.length > 0) {
                        // 如果已经有克隆的项，不再重复克隆
                        if (!carouselTrack.querySelector(`.cloned-item-${index}`)) {
                            videoCells.forEach((cell, cellIndex) => {
                                const originalItem = carouselTrack.querySelector(`.item-${index}-${cellIndex}`);
                                if (originalItem) {
                                    const clonedItem = originalItem.cloneNode(true);
                                    clonedItem.classList.add(`cloned-item-${index}`);
                                    carouselTrack.appendChild(clonedItem);
                                }
                            });
                        }
                    } else {
                        // 如果找不到第一个项，直接重置位置
                        currentTranslate = 0;
                    }
                }
                
                // 如果已经滚动到克隆项的位置，重置到原始位置
                if (currentTranslate < minTranslate - 500) { // 假设每个项宽度约500px
                    currentTranslate = 0;
                    // 移除所有克隆项
                    const clonedItems = carouselTrack.querySelectorAll(`.cloned-item-${index}`);
                    clonedItems.forEach(item => item.remove());
                }
                
                prevTranslate = currentTranslate;
                setSliderPosition();
            }
        }, 20); // 保持20毫秒的更新频率
    }
    
    // 停止滚动
    function stopScroll() {
        clearInterval(scrollInterval);
    }
    
    // 开始自动滚动
    startContinuousScroll();
}

function initTableAutoScroll() {
    // 获取所有折叠按钮
    const toggleButtons = document.querySelectorAll('.toggle-section');
    
    // 为每个按钮添加点击事件（如果尚未添加）
    toggleButtons.forEach(button => {
        // 检查按钮是否已经有点击事件
        const hasClickEvent = button.getAttribute('data-has-click-event');
        
        if (!hasClickEvent) {
            button.setAttribute('data-has-click-event', 'true');
            
            button.addEventListener('click', function(e) {
                // 获取目标内容的ID
                const targetId = this.getAttribute('aria-controls');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    // 切换内容的显示状态
                    const isVisible = window.getComputedStyle(targetContent).display !== 'none';
                    
                    if (isVisible) {
                        targetContent.style.display = 'none';
                        // 更改图标
                        const icon = this.querySelector('.icon i');
                        if (icon) {
                            icon.className = 'fas fa-angle-down';
                        }
                    } else {
                        targetContent.style.display = 'block';
                        // 更改图标
                        const icon = this.querySelector('.icon i');
                        if (icon) {
                            icon.className = 'fas fa-angle-up';
                        }
                    }
                }
            });
        }
    });
}