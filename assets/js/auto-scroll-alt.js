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
    // Function to initialize auto-scrolling for tables
    function initTableAutoScroll() {
        // Get the table element
        const tableEl = document.getElementById("behavior-benchmark-main-table");
        if (!tableEl) {
            console.log("Table element not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        const tableWrapper = tableEl.querySelector(".tabulator-tableholder");
        if (!tableWrapper) {
            console.log("Table wrapper not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        console.log("Auto-scroll initialized for table");
        
        // Variables for auto-scrolling
        let scrollAmount = 0;
        const scrollSpeed = 1; // Pixels per interval
        let scrollInterval;
        let scrollDirection = 1; // 1 for right, -1 for left
        let maxScroll;
        
        // Start auto-scrolling
        function startAutoScroll() {
            scrollInterval = setInterval(function() {
                maxScroll = tableWrapper.scrollWidth - tableWrapper.clientWidth;
                
                // Only scroll if there's content to scroll
                if (maxScroll <= 0) return;
                
                // Update scroll position
                scrollAmount += (scrollSpeed * scrollDirection);
                
                // Change direction when reaching the end
                if (scrollAmount >= maxScroll) {
                    scrollDirection = -1;
                } else if (scrollAmount <= 0) {
                    scrollDirection = 1;
                }
                
                // Apply scroll
                tableWrapper.scrollLeft = scrollAmount;
            }, 30); // Adjust interval for smoother/faster scrolling
        }
        
        // Pause scrolling when hovering
        tableWrapper.addEventListener("mouseenter", function() {
            clearInterval(scrollInterval);
        });
        
        // Resume scrolling when mouse leaves
        tableWrapper.addEventListener("mouseleave", function() {
            startAutoScroll();
        });
        
        // Start scrolling initially
        startAutoScroll();
    }
    
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
        
        // 创建一个容器来包含轮播和展开的内容
        const carouselAndContentContainer = document.createElement("div");
        carouselAndContentContainer.className = "carousel-and-content-container";
        carouselAndContentContainer.style.position = "relative";
        carouselAndContentContainer.style.width = "100%";
        carouselAndContentContainer.style.marginBottom = "10px";
        
        // 创建展开内容区域
        const expandedContentArea = document.createElement("div");
        expandedContentArea.className = "expanded-content-area";
        expandedContentArea.style.display = "none";
        expandedContentArea.style.width = "100%";
        expandedContentArea.style.padding = "15px";
        expandedContentArea.style.backgroundColor = "#ffffff";
        expandedContentArea.style.borderRadius = "8px";
        expandedContentArea.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        expandedContentArea.style.marginTop = "20px";
        expandedContentArea.style.zIndex = "10";
        expandedContentArea.style.position = "relative";
        
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
                    // 创建一个包含按钮和内容的容器
                    const collapsibleContainer = document.createElement("div");
                    collapsibleContainer.className = "collapsible-container";
                    collapsibleContainer.style.width = "500px";
                    collapsibleContainer.style.position = "relative";
                    collapsibleContainer.style.marginTop = "5px";
                    collapsibleContainer.style.zIndex = "2";
                    collapsibleContainer.style.display = "flex";
                    collapsibleContainer.style.flexDirection = "column";
                    
                    // 克隆按钮
                    const button = collapsibleSection.querySelector("button").cloneNode(true);
                    button.style.width = "500px";
                    button.style.maxWidth = "500px";
                    button.style.boxSizing = "border-box";
                    button.style.zIndex = "2";
                    
                    // 获取原始折叠内容
                    const content = collapsibleSection.querySelector(".collapse-content");
                    
                    // 创建内容容器
                    const contentContainer = document.createElement("div");
                    contentContainer.className = "collapse-content";
                    contentContainer.style.display = "none";
                    contentContainer.style.width = "100%";
                    contentContainer.style.padding = "10px";
                    contentContainer.style.backgroundColor = "#ffffff";
                    contentContainer.style.borderRadius = "8px";
                    contentContainer.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                    contentContainer.style.marginTop = "10px";
                    contentContainer.style.zIndex = "2";
                    contentContainer.style.position = "relative";
                    
                    // 复制内容
                    if (content) {
                        contentContainer.innerHTML = content.innerHTML;
                    }
                    
                    // 添加按钮点击事件
                    button.addEventListener("click", function() {
                        // 获取展开内容区域
                        const expandedArea = document.querySelector('.expanded-content-area');
                        
                        // 检查展开内容区域是否已显示
                        const isExpanded = expandedArea && expandedArea.style.display === "block";
                        
                        // 如果已经展开，则收起
                        if (isExpanded) {
                            // 隐藏展开内容
                            expandedArea.style.display = "none";
                            expandedArea.innerHTML = "";
                            
                            // 更新图标
                            const icon = button.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-up');
                                icon.classList.add('fa-angle-down');
                            }
                            
                            // 恢复轮播
                            isPaused = false;
                            carouselContainer.style.cursor = "grab";
                            startContinuousScroll();
                        } else {
                            // 获取所有内容容器
                            const allContentContainers = document.querySelectorAll('.collapse-content');
                            
                            // 先隐藏所有内容
                            allContentContainers.forEach(container => {
                                container.style.display = "none";
                            });
                            
                            // 更新所有按钮图标
                            const allButtons = document.querySelectorAll('.collapsible-container button');
                            allButtons.forEach(btn => {
                                const btnIcon = btn.querySelector('.fas');
                                if (btnIcon) {
                                    btnIcon.classList.remove('fa-angle-up');
                                    btnIcon.classList.add('fa-angle-down');
                                }
                            });
                            
                            // 更新图标
                            const icon = button.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-down');
                                icon.classList.add('fa-angle-up');
                            }
                            
                            // 暂停轮播
                            isPaused = true;
                            carouselContainer.style.cursor = "default";
                            stopScroll();
                            
                            // 将内容克隆到展开区域
                            expandedContentArea.innerHTML = contentContainer.innerHTML;
                            expandedContentArea.style.display = "block";
                        }
                    });
                    
                    // 将按钮和内容添加到折叠容器
                    collapsibleContainer.appendChild(button);
                    collapsibleContainer.appendChild(contentContainer);
                    
                    // 将折叠容器添加到视频项
                    videoItem.appendChild(videoWrapper);
                    videoItem.appendChild(collapsibleContainer);
                    
                    // 将视频项添加到数组
                    videoItems.push(videoItem);
                }
            }
        });
        
        // 将所有视频项添加到轮播轨道
        videoItems.forEach(item => {
            carouselTrack.appendChild(item);
        });
        
        // 复制视频项以实现无限滚动效果
        videoItems.forEach(item => {
            const clonedItem = item.cloneNode(true);
            
            // 为克隆的按钮添加点击事件
            const clonedButton = clonedItem.querySelector("button");
            if (clonedButton) {
                clonedButton.addEventListener("click", function() {
                    // 获取展开内容区域
                    const expandedArea = document.querySelector('.expanded-content-area');
                    
                    // 检查展开内容区域是否已显示
                    const isExpanded = expandedArea && expandedArea.style.display === "block";
                    
                    // 如果已经展开，则收起
                    if (isExpanded) {
                        // 隐藏展开内容
                        expandedArea.style.display = "none";
                        expandedArea.innerHTML = "";
                        
                        // 更新图标
                        const icon = clonedButton.querySelector('.fas');
                        if (icon) {
                            icon.classList.remove('fa-angle-up');
                            icon.classList.add('fa-angle-down');
                        }
                        
                        // 恢复轮播
                        isPaused = false;
                        carouselContainer.style.cursor = "grab";
                        startContinuousScroll();
                    } else {
                        // 获取所有内容容器
                        const allContentContainers = document.querySelectorAll('.collapse-content');
                        
                        // 先隐藏所有内容
                        allContentContainers.forEach(container => {
                            container.style.display = "none";
                        });
                        
                        // 更新所有按钮图标
                        const allButtons = document.querySelectorAll('.collapsible-container button');
                        allButtons.forEach(btn => {
                            const btnIcon = btn.querySelector('.fas');
                            if (btnIcon) {
                                btnIcon.classList.remove('fa-angle-up');
                                btnIcon.classList.add('fa-angle-down');
                            }
                        });
                        
                        // 更新图标
                        const icon = clonedButton.querySelector('.fas');
                        if (icon) {
                            icon.classList.remove('fa-angle-down');
                            icon.classList.add('fa-angle-up');
                        }
                        
                        // 暂停轮播
                        isPaused = true;
                        carouselContainer.style.cursor = "default";
                        stopScroll();
                        
                        // 获取内容容器
                        const contentContainer = clonedItem.querySelector('.collapse-content');
                        
                        // 将内容克隆到展开区域
                        if (contentContainer) {
                            expandedContentArea.innerHTML = contentContainer.innerHTML;
                            expandedContentArea.style.display = "block";
                        }
                    }
                });
            }
            
            carouselTrack.appendChild(clonedItem);
        });
        
        // 将轮播轨道添加到轮播容器
        carouselContainer.appendChild(carouselTrack);
        
        // 将展开内容区域添加到轮播和内容容器
        carouselAndContentContainer.appendChild(expandedContentArea);
        
        // 将轮播容器添加到轮播和内容容器
        carouselAndContentContainer.appendChild(carouselContainer);
        
        // 替换原始表格
        videoContainer.innerHTML = '';
        videoContainer.appendChild(carouselAndContentContainer);
        
        // 计算轨道宽度
        const originalTrackWidth = videoItems.length * 510; // 每个项的宽度加上边距
        
        // 变量用于自动滚动
        let scrollPosition = 0;
        let scrollDirection = 1; // 1 表示向右，-1 表示向左
        let scrollInterval;
        let isPaused = false;
        
        // 变量用于拖动
        let isDragging = false;
        let startX;
        let scrollLeft;
        
        // 启动连续滚动
        function startContinuousScroll() {
            stopScroll(); // 先停止现有的滚动
            
            scrollInterval = setInterval(() => {
                // 更新滚动位置
                scrollPosition += scrollDirection * 0.5; // 调整滚动速度
                
                // 检查是否需要重置位置
                if (scrollPosition >= originalTrackWidth) {
                    scrollPosition = 0;
                } else if (scrollPosition < 0) {
                    scrollPosition = originalTrackWidth - 1;
                }
                
                // 应用滚动
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }, 16); // 约60fps
        }
        
        // 停止滚动
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 鼠标按下时开始拖动
        carouselContainer.addEventListener("mousedown", function(e) {
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = scrollPosition;
            carouselTrack.style.transition = 'none'; // 拖动时移除过渡效果
            carouselContainer.style.cursor = 'grabbing'; // 更改光标样式
            stopScroll(); // 停止自动滚动
            
            e.preventDefault(); // 防止选中文本
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
            } else if (scrollPosition > originalTrackWidth) {
                scrollPosition = originalTrackWidth;
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
        
        // 点击轮播区域（非按钮和非折叠内容）时关闭所有折叠内容并恢复滚动
        carouselContainer.addEventListener("click", function(e) {
            // 检查点击的元素是否是按钮或折叠内容或其子元素
            let target = e.target;
            let isButtonOrContent = false;
            
            while (target && target !== carouselContainer) {
                if (target.tagName === 'BUTTON' || target.classList.contains('collapse-content')) {
                    isButtonOrContent = true;
                    break;
                }
                target = target.parentElement;
            }
            
            // 如果点击的不是按钮或折叠内容，关闭所有折叠内容并恢复滚动
            if (!isButtonOrContent && isPaused) {
                // 关闭所有折叠内容
                const contents = document.querySelectorAll('.collapse-content');
                contents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 隐藏展开内容区域
                const expandedArea = document.querySelector('.expanded-content-area');
                if (expandedArea) {
                    expandedArea.style.display = "none";
                    expandedArea.innerHTML = "";
                }
                
                // 更新所有图标
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    const icon = button.querySelector('.fas');
                    if (icon) {
                        icon.classList.remove('fa-angle-up');
                        icon.classList.add('fa-angle-down');
                    }
                });
                
                isPaused = false;
                carouselContainer.style.cursor = "grab";
                startContinuousScroll();
                console.log("Clicked outside content, carousel resumed");
            }
        });
        
        // 添加点击展开内容区域外部时关闭展开内容
        document.addEventListener("click", function(e) {
            const expandedArea = document.querySelector('.expanded-content-area');
            if (!expandedArea || expandedArea.style.display !== "block") return;
            
            // 检查点击是否在展开内容区域外部
            if (!expandedArea.contains(e.target) && !e.target.closest('.collapsible-container')) {
                // 隐藏展开内容
                expandedArea.style.display = "none";
                expandedArea.innerHTML = "";
                
                // 更新所有按钮图标
                const allButtons = document.querySelectorAll('button');
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
        console.log("Total track width:", originalTrackWidth * 2, "px");
        console.log("Number of items:", videoItems.length);
    }
    
    // 初始化紫色背景轮播
    setTimeout(function() {
        createAltVideoCarousel();
    }, 1500);
}); 