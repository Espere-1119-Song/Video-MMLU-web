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
    // 基本设置保持不变
    const carouselAndContentContainer = document.createElement("div");
    carouselAndContentContainer.className = `carousel-and-content-container-alt container-${index}`;
    carouselAndContentContainer.style.width = "100%";
    carouselAndContentContainer.style.position = "relative";
    
    const carouselContainer = document.createElement("div");
    carouselContainer.className = `video-carousel-container-alt carousel-${index}`;
    carouselContainer.style.width = "100%";
    carouselContainer.style.height = "420px";
    carouselContainer.style.backgroundColor = "rgba(230, 230, 250, 0.6)"; // 浅紫色背景
    carouselContainer.style.overflow = "hidden";
    carouselContainer.style.position = "relative";
    carouselContainer.style.margin = "0 auto";
    carouselContainer.style.borderRadius = "8px";
    carouselContainer.style.padding = "10px";
    carouselContainer.style.boxSizing = "border-box";
    carouselContainer.style.border = "none";
    carouselContainer.style.cursor = "grab";
    
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
            collapsibleContainer.style.width = "100%";
            collapsibleContainer.style.position = "relative";
            collapsibleContainer.style.marginTop = "5px";
            collapsibleContainer.style.zIndex = "2";
            collapsibleContainer.style.display = "flex";
            collapsibleContainer.style.flexDirection = "column";
            
            // 获取原始按钮和内容
            const originalButton = collapsibleSection.querySelector("button");
            const targetId = originalButton.getAttribute("aria-controls");
            const originalContent = document.getElementById(targetId);
            
            // 创建新按钮 - 使用与绿色部分相同的样式和结构
            const button = document.createElement("button");
            button.className = "button is-fullwidth";
            button.setAttribute("aria-controls", `carousel-content-${index}-${cellIndex}`);
            button.style.textAlign = "center";
            button.style.padding = "8px 12px";
            button.style.backgroundColor = "#f5f5f5";
            button.style.border = "1px solid #dbdbdb";
            button.style.borderRadius = "4px";
            button.style.cursor = "pointer";
            button.style.fontWeight = "normal";
            button.style.fontSize = "1em";
            button.style.color = "#363636";
            
            // 设置按钮文本
            button.textContent = originalButton.querySelector("span").textContent;
            
            // 创建内容区域 - 直接在按钮下方，而不是在轮播外部
            const contentArea = document.createElement("div");
            contentArea.id = `carousel-content-${index}-${cellIndex}`;
            contentArea.className = "collapse-content";
            contentArea.style.display = "none";
            contentArea.style.width = "100%";
            contentArea.style.padding = "15px";
            contentArea.style.backgroundColor = "#ffffff";
            contentArea.style.borderRadius = "0 0 4px 4px";
            contentArea.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            contentArea.style.marginTop = "5px";
            contentArea.style.zIndex = "3";
            contentArea.style.position = "relative";
            
            // 复制原始内容
            if (originalContent) {
                contentArea.innerHTML = originalContent.innerHTML;
            } else {
                const fallbackContent = collapsibleSection.querySelector(".collapse-content");
                if (fallbackContent) {
                    contentArea.innerHTML = fallbackContent.innerHTML;
                } else {
                    contentArea.innerHTML = "<p>内容不可用</p>";
                }
            }
            
            // 为按钮添加点击事件 - 类似绿色部分的简单切换
            button.addEventListener("click", function() {
                console.log("Button clicked - index:", index, "cellIndex:", cellIndex);
                
                // 简单切换内容显示/隐藏
                if (contentArea.style.display === "none") {
                    contentArea.style.display = "block";
                    
                    // 暂停轮播
                    isPaused = true;
                    carouselContainer.style.cursor = "default";
                    stopScroll();
                } else {
                    contentArea.style.display = "none";
                    
                    // 恢复轮播
                    isPaused = false;
                    carouselContainer.style.cursor = "grab";
                    startContinuousScroll();
                }
            });
            
            // 禁用原始按钮的点击事件
            originalButton.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                button.click();
                return false;
            });
            
            collapsibleContainer.appendChild(button);
            collapsibleContainer.appendChild(contentArea); // 内容直接添加到按钮下方
            videoItem.appendChild(collapsibleContainer);
        }
        
        carouselTrack.appendChild(videoItem);
    });
    
    carouselContainer.appendChild(carouselTrack);
    carouselAndContentContainer.appendChild(carouselContainer);
    
    // 将包装容器添加到页面
    videoContainer.innerHTML = '';
    videoContainer.appendChild(carouselAndContentContainer);
    
    // 轮播变量和事件处理保持不变
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
                
                // 如果到达最左边，重置到开始位置
                if (currentTranslate < minTranslate) {
                    currentTranslate = 0;
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