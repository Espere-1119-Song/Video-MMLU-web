// document.addEventListener('DOMContentLoaded', function() {
//     // 获取所有启用轮播的视频容器
//     const videoContainers = document.querySelectorAll(".video-container.carousel-enabled-alt");
    
//     // 为每个容器创建轮播
//     videoContainers.forEach((videoContainer, index) => {
//         createVideoCarousel(videoContainer, index);
//     });
    
//     // 初始化表格自动滚动
//     initTableAutoScroll();
// });

// function createVideoCarousel(videoContainer, index) {
//     // 基本设置保持不变
//     const carouselAndContentContainer = document.createElement("div");
//     carouselAndContentContainer.className = `carousel-and-content-container-alt container-${index}`;
//     carouselAndContentContainer.style.width = "100%";
//     carouselAndContentContainer.style.position = "relative";
    
//     const carouselContainer = document.createElement("div");
//     carouselContainer.className = `video-carousel-container-alt carousel-${index}`;
//     carouselContainer.style.width = "100%";
//     carouselContainer.style.height = "420px";
//     carouselContainer.style.backgroundColor = "rgba(230, 230, 250, 0.6)"; // 浅紫色背景
//     carouselContainer.style.overflow = "hidden";
//     carouselContainer.style.position = "relative";
//     carouselContainer.style.margin = "0 auto";
//     carouselContainer.style.borderRadius = "8px";
//     carouselContainer.style.padding = "10px";
//     carouselContainer.style.boxSizing = "border-box";
//     carouselContainer.style.border = "none";
//     carouselContainer.style.cursor = "grab";
    
//     const carouselTrack = document.createElement("div");
//     carouselTrack.className = `video-carousel-track-alt track-${index}`;
//     carouselTrack.style.display = "flex";
//     carouselTrack.style.alignItems = "center";
//     carouselTrack.style.position = "absolute";
//     carouselTrack.style.left = "0";
//     carouselTrack.style.top = "0";
//     carouselTrack.style.height = "100%";
//     carouselTrack.style.padding = "10px";
//     carouselTrack.style.boxSizing = "border-box";
//     carouselTrack.style.transition = "transform 0.3s ease";
//     carouselTrack.style.overflow = "hidden";
    
//     // 获取现有表格
//     const existingTable = videoContainer.querySelector("table");
//     if (!existingTable) {
//         console.log("Video table not found");
//         return;
//     }
    
//     // 获取所有视频单元格
//     const videoCells = existingTable.querySelectorAll("td");
//     if (!videoCells.length) {
//         console.log("No video cells found");
//         return;
//     }
    
//     // 为每个视频单元格创建一个视频项
//     videoCells.forEach((cell, cellIndex) => {
//         const videoItem = document.createElement("div");
//         videoItem.className = `video-carousel-item-alt item-${index}-${cellIndex}`;
//         videoItem.style.display = "flex";
//         videoItem.style.flexDirection = "column";
//         videoItem.style.alignItems = "center";
//         videoItem.style.justifyContent = "center";
//         videoItem.style.minWidth = "500px";
//         videoItem.style.maxWidth = "500px";
//         videoItem.style.height = "100%";
//         videoItem.style.margin = "0 5px";
//         videoItem.style.boxSizing = "border-box";
//         videoItem.style.position = "relative";
//         videoItem.style.overflow = "visible";
        
//         // 获取视频和折叠部分
//         const video = cell.querySelector("video");
//         const collapsibleSection = cell.querySelector(".collapsible-section");
        
//         if (video) {
//             const videoWrapper = document.createElement("div");
//             videoWrapper.className = `video-wrapper-alt wrapper-${index}-${cellIndex}`;
//             videoWrapper.style.width = "100%";
//             videoWrapper.style.maxWidth = "500px";
//             videoWrapper.style.height = "300px";
//             videoWrapper.style.margin = "0 auto";
//             videoWrapper.style.position = "relative";
//             videoWrapper.style.overflow = "hidden";
//             videoWrapper.style.zIndex = "1";
            
//             const videoClone = video.cloneNode(true);
//             videoClone.style.width = "100%";
//             videoClone.style.height = "100%";
//             videoClone.style.objectFit = "contain";
            
//             videoWrapper.appendChild(videoClone);
//             videoItem.appendChild(videoWrapper);
//         }
        
//         if (collapsibleSection) {
//             const collapsibleContainer = document.createElement("div");
//             collapsibleContainer.className = `collapsible-container-alt container-${index}-${cellIndex}`;
//             collapsibleContainer.style.width = "100%";
//             collapsibleContainer.style.position = "relative";
//             collapsibleContainer.style.marginTop = "5px";
//             collapsibleContainer.style.zIndex = "2";
//             collapsibleContainer.style.display = "flex";
//             collapsibleContainer.style.flexDirection = "column";
            
//             // 获取原始按钮和内容
//             const originalButton = collapsibleSection.querySelector("button");
//             const targetId = originalButton.getAttribute("aria-controls");
//             const originalContent = document.getElementById(targetId);
            
//             // 创建新按钮 - 使用与绿色部分相同的样式和结构
//             const button = document.createElement("button");
//             button.className = "button is-fullwidth";
//             button.setAttribute("aria-controls", `carousel-content-${index}-${cellIndex}`);
//             button.style.textAlign = "center";
//             button.style.padding = "8px 12px";
//             button.style.backgroundColor = "#f5f5f5";
//             button.style.border = "1px solid #dbdbdb";
//             button.style.borderRadius = "4px";
//             button.style.cursor = "pointer";
//             button.style.fontWeight = "normal";
//             button.style.fontSize = "1em";
//             button.style.color = "#363636";
            
//             // 设置按钮文本
//             button.textContent = originalButton.querySelector("span").textContent;
            
//             // 创建内容区域 - 直接在按钮下方，而不是在轮播外部
//             const contentArea = document.createElement("div");
//             contentArea.id = `carousel-content-${index}-${cellIndex}`;
//             contentArea.className = "collapse-content";
//             contentArea.style.display = "none";
//             contentArea.style.width = "100%";
//             contentArea.style.padding = "15px";
//             contentArea.style.backgroundColor = "#ffffff";
//             contentArea.style.borderRadius = "0 0 4px 4px";
//             contentArea.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
//             contentArea.style.marginTop = "5px";
//             contentArea.style.zIndex = "3";
//             contentArea.style.position = "relative";
            
//             // 复制原始内容
//             if (originalContent) {
//                 contentArea.innerHTML = originalContent.innerHTML;
//             } else {
//                 const fallbackContent = collapsibleSection.querySelector(".collapse-content");
//                 if (fallbackContent) {
//                     contentArea.innerHTML = fallbackContent.innerHTML;
//                 } else {
//                     contentArea.innerHTML = "<p>内容不可用</p>";
//                 }
//             }
            
//             // 为按钮添加点击事件 - 类似绿色部分的简单切换
//             button.addEventListener("click", function() {
//                 console.log("Button clicked - index:", index, "cellIndex:", cellIndex);
                
//                 // 简单切换内容显示/隐藏
//                 if (contentArea.style.display === "none") {
//                     contentArea.style.display = "block";
                    
//                     // 暂停轮播
//                     isPaused = true;
//                     carouselContainer.style.cursor = "default";
//                     stopScroll();
//                 } else {
//                     contentArea.style.display = "none";
                    
//                     // 恢复轮播
//                     isPaused = false;
//                     carouselContainer.style.cursor = "grab";
//                     startContinuousScroll();
//                 }
//             });
            
//             // 禁用原始按钮的点击事件
//             originalButton.addEventListener("click", function(e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 button.click();
//                 return false;
//             });
            
//             collapsibleContainer.appendChild(button);
//             collapsibleContainer.appendChild(contentArea); // 内容直接添加到按钮下方
//             videoItem.appendChild(collapsibleContainer);
//         }
        
//         carouselTrack.appendChild(videoItem);
//     });
    
//     carouselContainer.appendChild(carouselTrack);
//     carouselAndContentContainer.appendChild(carouselContainer);
    
//     // 将包装容器添加到页面
//     videoContainer.innerHTML = '';
//     videoContainer.appendChild(carouselAndContentContainer);
    
//     // 轮播变量和事件处理保持不变
//     let isDragging = false;
//     let startPosition = 0;
//     let currentTranslate = 0;
//     let prevTranslate = 0;
//     let animationID = 0;
//     let isPaused = false;
//     let scrollInterval;
    
//     // 触摸事件
//     carouselContainer.addEventListener('mousedown', dragStart);
//     carouselContainer.addEventListener('touchstart', dragStart);
//     carouselContainer.addEventListener('mouseup', dragEnd);
//     carouselContainer.addEventListener('touchend', dragEnd);
//     carouselContainer.addEventListener('mousemove', drag);
//     carouselContainer.addEventListener('touchmove', drag);
//     carouselContainer.addEventListener('mouseleave', dragEnd);
    
//     // 拖动开始
//     function dragStart(event) {
//         if (isPaused) return;
        
//         event.preventDefault();
//         if (event.type === 'touchstart') {
//             startPosition = event.touches[0].clientX;
//         } else {
//             startPosition = event.clientX;
//         }
        
//         isDragging = true;
//         animationID = requestAnimationFrame(animation);
//         carouselContainer.style.cursor = 'grabbing';
        
//         stopScroll();
//     }
    
//     // 拖动中
//     function drag(event) {
//         if (isDragging) {
//             let currentPosition;
//             if (event.type === 'touchmove') {
//                 currentPosition = event.touches[0].clientX;
//             } else {
//                 currentPosition = event.clientX;
//             }
            
//             const diff = currentPosition - startPosition;
//             currentTranslate = prevTranslate + diff;
//         }
//     }
    
//     // 拖动结束
//     function dragEnd() {
//         cancelAnimationFrame(animationID);
//         isDragging = false;
        
//         const movedBy = currentTranslate - prevTranslate;
        
//         if (movedBy < -100) {
//             // 向左滑动
//             prevTranslate = currentTranslate;
//         } else if (movedBy > 100) {
//             // 向右滑动
//             prevTranslate = currentTranslate;
//         } else {
//             // 回到原位
//             currentTranslate = prevTranslate;
//         }
        
//         setSliderPosition();
//         carouselContainer.style.cursor = 'grab';
        
//         if (!isPaused) {
//             startContinuousScroll();
//         }
//     }
    
//     // 动画
//     function animation() {
//         setSliderPosition();
//         if (isDragging) requestAnimationFrame(animation);
//     }
    
//     // 设置滑块位置
//     function setSliderPosition() {
//         // 计算最大和最小平移值
//         const trackWidth = carouselTrack.scrollWidth;
//         const containerWidth = carouselContainer.offsetWidth;
//         const maxTranslate = 0;
//         const minTranslate = containerWidth - trackWidth;
        
//         // 限制平移范围
//         if (currentTranslate > maxTranslate) {
//             currentTranslate = maxTranslate;
//             prevTranslate = maxTranslate;
//         } else if (currentTranslate < minTranslate) {
//             currentTranslate = minTranslate;
//             prevTranslate = minTranslate;
//         }
        
//         carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
//     }
    
//     // 开始连续滚动
//     function startContinuousScroll() {
//         stopScroll(); // 先停止之前的滚动
        
//         scrollInterval = setInterval(() => {
//             if (!isPaused && !isDragging) {
//                 const trackWidth = carouselTrack.scrollWidth;
//                 const containerWidth = carouselContainer.offsetWidth;
//                 const minTranslate = containerWidth - trackWidth;
                
//                 currentTranslate -= 2; // 保持2像素的滚动速度
                
//                 // 如果到达最左边，重置到开始位置
//                 if (currentTranslate < minTranslate) {
//                     currentTranslate = 0;
//                 }
                
//                 prevTranslate = currentTranslate;
//                 setSliderPosition();
//             }
//         }, 20); // 保持20毫秒的更新频率
//     }
    
//     // 停止滚动
//     function stopScroll() {
//         clearInterval(scrollInterval);
//     }
    
//     // 开始自动滚动
//     startContinuousScroll();
// }

// function initTableAutoScroll() {
//     // 获取所有折叠按钮
//     const toggleButtons = document.querySelectorAll('.toggle-section');
    
//     // 为每个按钮添加点击事件（如果尚未添加）
//     toggleButtons.forEach(button => {
//         // 检查按钮是否已经有点击事件
//         const hasClickEvent = button.getAttribute('data-has-click-event');
        
//         if (!hasClickEvent) {
//             button.setAttribute('data-has-click-event', 'true');
            
//             button.addEventListener('click', function(e) {
//                 // 获取目标内容的ID
//                 const targetId = this.getAttribute('aria-controls');
//                 const targetContent = document.getElementById(targetId);
                
//                 if (targetContent) {
//                     // 切换内容的显示状态
//                     const isVisible = window.getComputedStyle(targetContent).display !== 'none';
                    
//                     if (isVisible) {
//                         targetContent.style.display = 'none';
//                         // 更改图标
//                         const icon = this.querySelector('.icon i');
//                         if (icon) {
//                             icon.className = 'fas fa-angle-down';
//                         }
//                     } else {
//                         targetContent.style.display = 'block';
//                         // 更改图标
//                         const icon = this.querySelector('.icon i');
//                         if (icon) {
//                             icon.className = 'fas fa-angle-up';
//                         }
//                     }
//                 }
//             });
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    // Function to create a horizontal scrolling video carousel with purple background
    function createAltVideoCarousel() {
        // 只选择带有 carousel-enabled-alt 类的视频容器
        const videoContainer = document.querySelector(".video-container.carousel-enabled-alt");
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
        
        // 创建一个包含轮播和内容的主容器
        const mainContainer = document.createElement("div");
        mainContainer.className = "alt-carousel-main-container";
        mainContainer.style.width = "100%";
        mainContainer.style.position = "relative";
        mainContainer.style.margin = "0 auto";
        
        // 创建轮播容器 - 使用紫色透明背景和固定高度
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "video-carousel-container";
        carouselContainer.style.width = "100%";
        carouselContainer.style.height = "420px";
        carouselContainer.style.backgroundColor = "rgba(230, 220, 245, 0.6)"; // 紫色背景带透明度
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
        carouselTrack.className = "video-carousel-track";
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
        
        // 创建内容展示区域 - 放在轮播下方
        const contentDisplayArea = document.createElement("div");
        contentDisplayArea.className = "content-display-area";
        contentDisplayArea.style.width = "100%";
        contentDisplayArea.style.display = "none";
        contentDisplayArea.style.padding = "15px";
        contentDisplayArea.style.backgroundColor = "#ffffff";
        contentDisplayArea.style.borderRadius = "8px";
        contentDisplayArea.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        contentDisplayArea.style.marginTop = "20px";
        contentDisplayArea.style.zIndex = "1";
        contentDisplayArea.style.position = "relative";
        contentDisplayArea.style.maxHeight = "500px";
        contentDisplayArea.style.overflowY = "auto";
        
        // 创建视频项数组
        const videoItems = [];
        
        // 处理每个视频单元格
        videoCells.forEach((cell, index) => {
            // 创建视频项容器
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
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
            
            // 创建视频包装器
            const videoWrapper = document.createElement("div");
            videoWrapper.className = "video-wrapper";
            videoWrapper.style.width = "100%";
            videoWrapper.style.maxWidth = "500px";
            videoWrapper.style.height = "300px";
            videoWrapper.style.margin = "0 auto";
            videoWrapper.style.position = "relative";
            videoWrapper.style.overflow = "hidden";
            videoWrapper.style.zIndex = "1";
            
            // 获取视频元素
            const video = cell.querySelector("video");
            if (video) {
                // 克隆视频元素
                const clonedVideo = video.cloneNode(true);
                clonedVideo.style.width = "100%";
                clonedVideo.style.height = "100%";
                clonedVideo.style.objectFit = "cover";
                clonedVideo.style.borderRadius = "8px";
                clonedVideo.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                
                // 将克隆的视频添加到视频包装器
                videoWrapper.appendChild(clonedVideo);
                
                // 获取折叠部分
                const collapsibleSection = cell.querySelector(".collapsible-section");
                if (collapsibleSection) {
                    // 创建一个包含按钮的容器
                    const buttonContainer = document.createElement("div");
                    buttonContainer.className = "button-container";
                    buttonContainer.style.width = "500px";
                    buttonContainer.style.position = "relative";
                    buttonContainer.style.marginTop = "5px";
                    buttonContainer.style.zIndex = "2";
                    
                    // 创建全新的按钮，而不是克隆现有按钮
                    const button = document.createElement("button");
                    button.className = "custom-toggle-button";
                    button.style.width = "500px";
                    button.style.maxWidth = "500px";
                    button.style.padding = "8px 15px";
                    button.style.backgroundColor = "transparent";
                    button.style.border = "1px solid #ccc";
                    button.style.cursor = "pointer";
                    button.style.display = "flex";
                    button.style.justifyContent = "center"; // 居中对齐
                    button.style.alignItems = "center";
                    button.style.zIndex = "2";
                    button.style.textAlign = "center";
                    
                    // 添加文本
                    const buttonText = document.createElement("span");
                    buttonText.textContent = "View lecture question-answering of case #" + (index + 1);
                    buttonText.style.textAlign = "center";
                    
                    // 组装按钮 - 只添加文本，不添加箭头图标
                    button.appendChild(buttonText);
                    
                    // 获取原始折叠内容
                    const content = collapsibleSection.querySelector(".collapse-content");
                    
                    // 设置数据属性
                    if (content) {
                        button.setAttribute("data-content", content.innerHTML);
                        button.setAttribute("data-index", index);
                    }
                    
                    // 添加按钮点击事件
                    button.addEventListener("click", function(e) {
                        e.stopPropagation(); // 阻止事件冒泡
                        
                        // 获取当前按钮的索引
                        const index = parseInt(this.getAttribute("data-index"));
                        const content = this.getAttribute("data-content");
                        
                        // 检查内容区域是否已显示此内容
                        const isCurrentlyDisplayed = 
                            contentDisplayArea.style.display === "block" && 
                            contentDisplayArea.getAttribute("data-current-index") === index.toString();
                        
                        if (isCurrentlyDisplayed) {
                            // 如果当前内容已显示，则隐藏它
                            contentDisplayArea.style.display = "none";
                            contentDisplayArea.innerHTML = "";
                            contentDisplayArea.removeAttribute("data-current-index");
                            
                            // 恢复轮播
                            isPaused = false;
                            carouselContainer.style.cursor = "grab";
                            startContinuousScroll();
                        } else {
                            // 显示新内容
                            contentDisplayArea.innerHTML = content;
                            contentDisplayArea.style.display = "block";
                            contentDisplayArea.setAttribute("data-current-index", index.toString());
                            
                            // 暂停轮播
                            isPaused = true;
                            carouselContainer.style.cursor = "default";
                            stopScroll();
                        }
                    });
                    
                    // 将按钮添加到按钮容器
                    buttonContainer.appendChild(button);
                    
                    // 将视频包装器和按钮容器添加到视频项
                    videoItem.appendChild(videoWrapper);
                    videoItem.appendChild(buttonContainer);
                } else {
                    // 如果没有折叠部分，只添加视频包装器
                    videoItem.appendChild(videoWrapper);
                }
            }
            
            // 将视频项添加到数组
            videoItems.push(videoItem);
        });
        
        // 将视频项添加到轮播轨道
        videoItems.forEach(item => {
            carouselTrack.appendChild(item);
        });
        
        // 将轮播轨道添加到轮播容器
        carouselContainer.appendChild(carouselTrack);
        
        // 将轮播容器和内容显示区域添加到主容器
        mainContainer.appendChild(carouselContainer);
        mainContainer.appendChild(contentDisplayArea);
        
        // 替换原始表格
        videoContainer.innerHTML = '';
        videoContainer.appendChild(mainContainer);
        
        // 计算轨道宽度
        const originalTrackWidth = videoItems.length * 510; // 每个项的宽度加上边距
        carouselTrack.style.width = originalTrackWidth + "px";
        
        // 变量用于自动滚动
        let scrollPosition = 0;
        let scrollInterval;
        let scrollSpeed = 3; // 增加滚动速度从1到3
        let isPaused = false;
        
        // 变量用于拖动
        let isDragging = false;
        let startX;
        let scrollLeft;
        
        // 开始连续滚动
        function startContinuousScroll() {
            stopScroll(); // 先停止现有的滚动
            
            scrollInterval = setInterval(() => {
                // 更新滚动位置
                scrollPosition += scrollSpeed;
                
                // 检查是否滚动到末尾，如果是则无缝循环
                const containerWidth = carouselContainer.offsetWidth;
                
                // 修改循环逻辑，当最后一个视频完全滚出视图时重置位置
                if (scrollPosition >= originalTrackWidth - containerWidth) {
                    // 无缝循环：重置到开始位置
                    scrollPosition = 0;
                }
                
                // 应用滚动
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }, 20); // 保持20毫秒的更新频率
        }
        
        // 停止滚动
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 鼠标按下时开始拖动
        carouselContainer.addEventListener("mousedown", function(e) {
            if (isPaused) return; // 如果已暂停，不允许拖动
            
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = scrollPosition;
            carouselTrack.style.transition = 'none'; // 拖动时移除过渡效果
            carouselContainer.style.cursor = 'grabbing'; // 更改光标样式
            stopScroll(); // 停止自动滚动
        });
        
        // 鼠标移动时拖动
        carouselContainer.addEventListener("mousemove", function(e) {
            if (!isDragging) return;
            
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2; // 乘以2使拖动更敏感
            scrollPosition = scrollLeft - walk;
            
            // 边界检查 - 确保不会拖动超出容器
            if (scrollPosition < 0) {
                scrollPosition = 0;
            } else if (scrollPosition > originalTrackWidth - carouselContainer.clientWidth) {
                scrollPosition = originalTrackWidth - carouselContainer.clientWidth;
            }
            
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        // 鼠标释放时结束拖动
        carouselContainer.addEventListener("mouseup", function() {
            if (!isDragging) return;
            
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.3s ease'; // 恢复过渡效果
            carouselContainer.style.cursor = 'grab'; // 恢复光标样式
            
            if (!isPaused) {
                startContinuousScroll(); // 恢复自动滚动
            }
        });
        
        // 鼠标离开时结束拖动
        carouselContainer.addEventListener("mouseleave", function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = 'transform 0.3s ease';
                carouselContainer.style.cursor = 'grab';
                
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 点击轮播区域（非按钮）时关闭内容并恢复滚动
        carouselContainer.addEventListener("click", function(e) {
            // 检查点击的元素是否是按钮或其子元素
            let target = e.target;
            let isButton = false;
            
            while (target && target !== carouselContainer) {
                if (target.tagName === 'BUTTON') {
                    isButton = true;
                    break;
                }
                target = target.parentElement;
            }
            
            // 如果点击的不是按钮，且内容区域已显示，则关闭内容并恢复滚动
            if (!isButton && contentDisplayArea.style.display === "block") {
                contentDisplayArea.style.display = "none";
                contentDisplayArea.innerHTML = "";
                contentDisplayArea.removeAttribute("data-current-index");
                
                // 重置所有按钮图标
                const allButtons = carouselContainer.querySelectorAll('button');
                allButtons.forEach(btn => {
                    const btnIcon = btn.querySelector('.fas');
                    if (btnIcon) {
                        btnIcon.classList.remove('fa-angle-up');
                        btnIcon.classList.add('fa-angle-down');
                    }
                });
                
                // 恢复轮播
                isPaused = false;
                carouselContainer.style.cursor = "grab";
                startContinuousScroll();
            }
        });
        
        // 点击内容区域外部时关闭内容
        document.addEventListener("click", function(e) {
            if (contentDisplayArea.style.display !== "block") return;
            
            // 检查点击是否在内容区域外部且不是按钮
            if (!contentDisplayArea.contains(e.target) && 
                !e.target.closest('.button-container') && 
                !e.target.closest('.video-carousel-container')) {
                
                contentDisplayArea.style.display = "none";
                contentDisplayArea.innerHTML = "";
                contentDisplayArea.removeAttribute("data-current-index");
                
                // 重置所有按钮图标
                const allButtons = carouselContainer.querySelectorAll('button');
                allButtons.forEach(btn => {
                    const btnIcon = btn.querySelector('.fas');
                    if (btnIcon) {
                        btnIcon.classList.remove('fa-angle-up');
                        btnIcon.classList.add('fa-angle-down');
                    }
                });
                
                // 恢复轮播
                isPaused = false;
                carouselContainer.style.cursor = "grab";
                startContinuousScroll();
            }
        });
        
        // 鼠标悬停时暂停滚动
        carouselContainer.addEventListener("mouseenter", function() {
            if (!isPaused) {
                stopScroll();
            }
        });
        
        // 鼠标离开时恢复滚动
        carouselContainer.addEventListener("mouseleave", function() {
            if (!isDragging && !isPaused) {
                startContinuousScroll();
            }
        });
        
        // 启动连续滚动
        startContinuousScroll();
        
        console.log("Alt Carousel initialized with original width:", originalTrackWidth, "px");
        console.log("Total track width:", originalTrackWidth, "px");
        console.log("Number of items:", videoItems.length);
    }
    
    // 初始化紫色背景轮播
    setTimeout(function() {
        createAltVideoCarousel();
    }, 1500);
}); 