//Formatter to generate charts
var chartFormatter = function (cell, formatterParams, onRendered) {
    const value = cell.getValue();
    const field = cell.getField();
    const container = document.createElement("div");
    container.classList.add("score-cell-container"); // Use container class

    // Handle non-numeric or missing values
    if (value === undefined || value === null || isNaN(value) || value === "-") {
        container.textContent = "-";
        container.style.textAlign = "center";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        return container;
    }

    const numValue = parseFloat(value);
    const { min = 0, max = 100 } = formatterParams || {};
    const percentage = Math.max(0, Math.min(100, ((numValue - min) / (max - min)) * 100));

    // --- Create the Bar ---
    const bar = document.createElement("div");
    bar.classList.add("score-bar");
    bar.style.width = percentage + "%";
    bar.style.position = "absolute"; // Position behind text
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.zIndex = "1"; // Bar is behind

    // Add specific class for color gradient
    if (field.includes("notebook")) {
        bar.classList.add("notebook-bar");
    } else if (field.includes("quiz")) {
        bar.classList.add("quiz-bar");
    }

    // --- Create the Text ---
    const textSpan = document.createElement("span");
    textSpan.classList.add("score-cell-text"); // Use the text class
    textSpan.textContent = numValue.toFixed(1);
    textSpan.style.position = "relative"; // Relative to allow z-index
    textSpan.style.zIndex = "2"; // Text is on top
    // --- END Text Creation ---


    // --- Assemble Container (Bar and Text) ---
    container.appendChild(bar);
    container.appendChild(textSpan);

    return container;
};

// 基础格式化函数
function createColorFormatter(startColor, endColor) {
    return function(cell, formatterParams) {
        const value = cell.getValue();
        
        // 处理空值或特殊值
        if (value === null || value === undefined || value === "-") {
            return "-";
        }

        // 确保值是数字类型
        const numValue = typeof value === 'number' ? value : parseFloat(value);
        
        // 格式化数值为一位小数
        const formattedValue = isNaN(numValue) ? value : numValue.toFixed(1);
        
        // 如果没有提供参数，直接返回格式化的值
        if (!formatterParams || !formatterParams.min === undefined || formatterParams.max === undefined) {
            return formattedValue;
        }

        const min = formatterParams.min;
        const max = formatterParams.max;
        
        // 防止除以零的情况
        if (min === max) {
            // 如果最小值等于最大值，使用中间颜色
            const red = Math.floor((startColor.r + endColor.r) / 2);
            const green = Math.floor((startColor.g + endColor.g) / 2);
            const blue = Math.floor((startColor.b + endColor.b) / 2);
            
            return `<div style="
                background-color: rgb(${red}, ${green}, ${blue});
                padding: 4px;
                text-align: center;
                width: 100%;
                height: 100%;
            ">${formattedValue}</div>`;
        }
        
        const normalizedValue = Math.max(0, Math.min(1, (numValue - min) / (max - min)));
        
        // 确保 normalizedValue 是有效数字
        if (isNaN(normalizedValue)) {
            return formattedValue;
        }

        // 计算颜色渐变
        const red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
        const green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
        const blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

        return `<div style="
            background-color: rgb(${red}, ${green}, ${blue});
            padding: 4px;
            text-align: center;
            width: 100%;
            height: 100%;
        ">${formattedValue}</div>`;
    };
}

// 为每种类型定义不同的颜色
const colorFormatterAvg = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 215, g: 240, b: 246 }   // 结束颜色（浅蓝色）
);

const colorFormatterGoalInt = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 255, g: 153, b: 153 }   // 结束颜色（浅红色）
);

const colorFormatterActionSeq = createColorFormatter(
    { r: 255, g: 255, b: 255 },  // 开始颜色（白色）
    { r: 126, g: 197, b: 164 }   // 结束颜色（浅绿色）
);

const debugColorFormatter = function(cell, formatterParams) {
    const value = cell.getValue();
    console.log("Quiz cell:", cell.getField(), "Value:", value, "Type:", typeof value);
    console.log("FormatterParams:", formatterParams);
    
    // 使用原始格式化器
    const result = colorFormatterGoalInt(cell, formatterParams);
    console.log("Formatter result:", result);
    return result;
};

const simpleColorFormatter = function(cell, formatterParams) {
    const value = cell.getValue();
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    const formattedValue = isNaN(numValue) ? value : numValue.toFixed(1);
    
    if (!formatterParams || formatterParams.min === undefined || formatterParams.max === undefined || isNaN(numValue)) {
        return `<div style="
            background-color: #9494C0;
            padding: 4px;
            text-align: center;
            width: 100%;
            height: 100%;
            color: black;
        ">${formattedValue}</div>`;
    }
    
    const min = formatterParams.min;
    const max = formatterParams.max;
    
    if (min === max) {
        return `<div style="
            background-color: #9494C0;
            padding: 4px;
            text-align: center;
            width: 100%;
            height: 100%;
            color: black;
        ">${formattedValue}</div>`;
    }
    
    const intensity = Math.max(0, Math.min(1, (numValue - min) / (max - min)));
    
    const r = Math.floor(255 - (255 - 148) * intensity);
    const g = Math.floor(255 - (255 - 148) * intensity);
    const b = Math.floor(255 - (255 - 192) * intensity);
    
    return `<div style="
        background-color: rgb(${r}, ${g}, ${b});
        padding: 4px;
        text-align: center;
        width: 100%;
        height: 100%;
        color: black;
    ">${formattedValue}</div>`;
};

// --- NEW: Helper function to interpolate between two hex colors ---
function interpolateColor(value, minVal, maxVal, startColorHex, endColorHex) {
    // Ensure value is within bounds
    value = Math.max(minVal, Math.min(maxVal, value));

    // Calculate the interpolation factor (0 to 1)
    const factor = (value - minVal) / (maxVal - minVal);

    // Convert hex colors to RGB integers
    const startRGB = parseInt(startColorHex.slice(1), 16);
    const endRGB = parseInt(endColorHex.slice(1), 16);

    const startR = (startRGB >> 16) & 255;
    const startG = (startRGB >> 8) & 255;
    const startB = startRGB & 255;

    const endR = (endRGB >> 16) & 255;
    const endG = (endRGB >> 8) & 255;
    const endB = endRGB & 255;

    // Interpolate each color component
    const r = Math.round(startR + factor * (endR - startR));
    const g = Math.round(startG + factor * (endG - startG));
    const b = Math.round(startB + factor * (endB - startB));

    // Convert back to hex string
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}
// --- END HELPER FUNCTION ---

// --- Formatter for Percentage Ring (Now Semicircle with Interpolated Color) ---
function ringFormatter(cell, formatterParams, onRendered) {
    const value = cell.getValue();
    const container = document.createElement("div");
    container.classList.add("ring-formatter-container");

    // Handle non-numeric or missing values
    if (value === undefined || value === null || isNaN(value) || value === "-") {
        container.textContent = "-";
        container.style.textAlign = "center";
        return container;
    }

    const numValue = parseFloat(value);
    const percentage = Math.max(0, Math.min(100, numValue));

    // --- SVG Semicircle Elements ---
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    const size = 54;
    const radius = 22;
    const strokeWidth = 5;
    const cx = size / 2;
    const cy = size / 2 + (size - radius * 2 - strokeWidth) / 2 - 2;
    const circumference = 2 * Math.PI * radius;
    const semiCircumference = circumference / 2;
    const offset = semiCircumference * (1 - percentage / 100);
    // No gradient needed now
    // const gradientId = `ringGradient-${cell.getRow().getPosition()}-${cell.getField()}`;

    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.classList.add("progress-ring");

    // --- Calculate Interpolated Color ---
    // Define the color range (e.g., Purple for 0, Aqua for 100)
    const minScoreColor = "#6A0DAD"; // Deep Purple
    const maxScoreColor = "#40E0D0"; // Turquoise / Aqua
    // You could add a mid-point color and do two interpolations if desired
    const calculatedColor = interpolateColor(numValue, 0, 100, minScoreColor, maxScoreColor);
    // --- End Color Calculation ---


    // --- Remove Gradient Definition ---
    // const defs = document.createElementNS(svgNS, "defs");
    // ... gradient definition removed ...
    // svg.appendChild(defs);
    // --- End Remove Gradient ---


    // Background Semicircle (the track)
    const bgCircle = document.createElementNS(svgNS, "circle");
    bgCircle.setAttribute("cx", cx);
    bgCircle.setAttribute("cy", cy);
    bgCircle.setAttribute("r", radius);
    bgCircle.setAttribute("stroke-width", strokeWidth);
    bgCircle.setAttribute("stroke-dasharray", `${semiCircumference} ${circumference}`);
    bgCircle.setAttribute("transform", `rotate(180 ${cx} ${cy})`);
    bgCircle.classList.add("progress-ring-bg");
    svg.appendChild(bgCircle);

    // Progress Semicircle Arc
    const progressCircle = document.createElementNS(svgNS, "circle");
    progressCircle.setAttribute("cx", cx);
    progressCircle.setAttribute("cy", cy);
    progressCircle.setAttribute("r", radius);
    progressCircle.setAttribute("stroke-width", strokeWidth);
    progressCircle.setAttribute("stroke-dasharray", `${semiCircumference} ${circumference}`);
    progressCircle.setAttribute("stroke-dashoffset", offset);
    progressCircle.setAttribute("transform", `rotate(180 ${cx} ${cy})`);
    // Apply the calculated solid color directly
    progressCircle.setAttribute("stroke", calculatedColor); // << Use calculated solid color
    progressCircle.classList.add("progress-ring-bar");
    svg.appendChild(progressCircle);

    // --- Text Value Element ---
    const textSpan = document.createElement("span");
    textSpan.classList.add("ring-formatter-text");
    textSpan.textContent = numValue.toFixed(1);

    // --- Assemble Container ---
    container.appendChild(svg);
    container.appendChild(textSpan);

    return container;
}
// --- END UPDATED FORMATTER ---

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        fetch('assets/data/behavior_total_benchmark.json').then(response => response.json()),
    ])
        .then(([
            behavior_total_benchmark_data,
        ]) => {
            var getColumnMinMax = (data, field) => {
                let values = data.map(item => item[field])
                                 .filter(val => val !== "-" && val !== null && val !== undefined)
                                 .map(val => typeof val === 'number' ? val : parseFloat(val))
                                 .filter(val => !isNaN(val));
                
                if (values.length === 0) {
                    return { min: 0, max: 1 }; // 提供默认值
                }
                
                const min = Math.min(...values);
                const max = Math.max(...values);
                
                // 如果 min 和 max 相等，稍微调整 max 值以避免除以零
                return min === max ? { min, max: max + 0.1 } : { min, max };
            };

            var behavior_columns = [
                // Model column - add formatter for icons
                {
                    title: "Model",
                    field: "model",
                    widthGrow: 1,
                    minWidth: 150, // May need slight increase for icon
                    frozen: true,
                    formatter: function(cell, formatterParams, onRendered) {
                        const modelName = cell.getValue();
                        const rowData = cell.getRow().getData();
                        const modelType = rowData.model_type; // Get the type from data

                        let iconHtml = '';
                        let iconTitle = ''; // Tooltip text

                        if (modelType === 'proprietary') {
                            iconHtml = '<i class="fas fa-lock model-icon proprietary-icon"></i> ';
                            iconTitle = 'Proprietary Model';
                        } else if (modelType === 'open-source') {
                            iconHtml = '<i class="fas fa-box-open model-icon open-source-icon"></i> ';
                            iconTitle = 'Open Source Model';
                        } else if (modelType === 'llm') { // Added condition for LLM
                            iconHtml = '<i class="fas fa-brain model-icon llm-icon"></i> ';
                            iconTitle = 'Base LLM';
                        }
                        // No icon for unspecified types

                        // Create a container span for better control and add tooltip
                        return `<span title="${iconTitle}">${iconHtml}${modelName}</span>`;
                    }
                },
                // Center align headers for the rest
                { title: "#F", field: "frames", widthGrow: 0.5, minWidth: 5},
                {
                    title: "#T", field: "tpf", widthGrow: 0.5, minWidth: 5, sorter: "number",
                    formatter: function(cell, formatterParams){
                        const value = cell.getValue();
                        if (value === Infinity || value === null || value === undefined) {
                            return "-";
                        }
                        return value;
                    }
                },
                // Overall column using ringFormatter
                {
                    title: "Overall", field: "avg_acc", widthGrow: 1, minWidth: 100, // Adjusted width slightly
                    hozAlign: "center", // Center the ring+text combo
                    headerHozAlign: "center",
                    sorter: function(a, b, aRow, bRow, column, dir, sorterParams) {
                        // Handle non-numeric values for sorting
                        const valA = parseFloat(a);
                        const valB = parseFloat(b);
                        const numA = isNaN(valA) ? -Infinity : valA;
                        const numB = isNaN(valB) ? -Infinity : valB;
                        return numA - numB;
                    },
                    formatter: ringFormatter // Use the ring formatter
                    // No formatterParams needed here anymore
                },
                // Notebook column using chartFormatter
                {
                    title: "Notebook", field: "notebook_avg", widthGrow: 1, minWidth: 250,
                    hozAlign: "center", // << Center the content (text) in the cell
                    headerHozAlign: "center",
                    sorter: "number",
                    formatter: chartFormatter, // Use the updated chartFormatter
                    formatterParams: { min: 0, max: 100 }, // Pass min/max if needed
                    cssClass: "notebook-avg-cell" // Keep class for potential specific cell styling
                },
                // Quiz column using chartFormatter
                {
                    title: "Quiz", field: "quiz_avg", widthGrow: 1, minWidth: 250,
                    hozAlign: "center", // << Center the content (text) in the cell
                    headerHozAlign: "center",
                    sorter: "number",
                    formatter: chartFormatter, // Use the updated chartFormatter
                    formatterParams: { min: 0, max: 100 }, // Pass min/max if needed
                    cssClass: "quiz-avg-cell" // Keep class for potential specific cell styling
                },
                // Hidden Notebook subject columns
                { title: "Notebook Math", field: "notebook_math", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },
                { title: "Notebook Physics", field: "notebook_physics", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },
                { title: "Notebook Chemistry", field: "notebook_chemistry", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },
                // Hidden Quiz subject columns
                { title: "Quiz Math", field: "quiz_math", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" },
                { title: "Quiz Physics", field: "quiz_physics", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" },
                { title: "Quiz Chemistry", field: "quiz_chemistry", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" }
            ];

            // --- Update formatterParams assignment logic ---
            behavior_columns.forEach(column => {
                const fieldsNeedingParams = [
                    "notebook_avg", "notebook_math", "notebook_physics", "notebook_chemistry",
                    "quiz_avg", "quiz_math", "quiz_physics", "quiz_chemistry"
                ];

                if (fieldsNeedingParams.includes(column.field)) {
                    if (column.formatter) {
                        let { min, max } = getColumnMinMax(behavior_total_benchmark_data, column.field);
                        column.formatterParams = { min, max };
                    }
                }
            });

            // Process the data to ensure numeric values for sorting
            behavior_total_benchmark_data.forEach(item => {
                // Convert string values to numbers for proper sorting
                if (typeof item.avg_acc === 'string') {
                    item.avg_acc = parseFloat(item.avg_acc) || 0;
                }
                if (typeof item.notebook_avg === 'string') {
                    item.notebook_avg = parseFloat(item.notebook_avg) || 0;
                }
                if (typeof item.notebook_math === 'string') {
                    item.notebook_math = parseFloat(item.notebook_math) || 0;
                }
                if (typeof item.notebook_physics === 'string') {
                    item.notebook_physics = parseFloat(item.notebook_physics) || 0;
                }
                if (typeof item.notebook_chemistry === 'string') {
                    item.notebook_chemistry = parseFloat(item.notebook_chemistry) || 0;
                }
                if (typeof item.quiz_avg === 'string') {
                    item.quiz_avg = parseFloat(item.quiz_avg) || 0;
                }
                if (typeof item.quiz_math === 'string') {
                    item.quiz_math = parseFloat(item.quiz_math) || 0;
                }
                if (typeof item.quiz_physics === 'string') {
                    item.quiz_physics = parseFloat(item.quiz_physics) || 0;
                }
                if (typeof item.quiz_chemistry === 'string') {
                    item.quiz_chemistry = parseFloat(item.quiz_chemistry) || 0;
                }

                // Add conversion for tpf, handling non-numeric like '-'
                if (typeof item.tpf === 'string' || item.tpf === '-') {
                    // Attempt to parse, default to a very large number or 0 if '-' or invalid
                    // Using Infinity ensures '-' goes to one end when sorting
                    item.tpf = parseFloat(item.tpf) || Infinity;
                } else if (typeof item.tpf !== 'number') {
                     item.tpf = Infinity; // Handle other non-numeric types
                }
            });

            var behavior_table = new Tabulator("#behavior-benchmark-main-table", {
                data: behavior_total_benchmark_data,
                layout: "fitDataFill",
                responsiveLayout: "collapse",
                responsiveLayoutCollapseStartOpen: false,
                movableColumns: false,
                initialSort: [
                    { column: "avg_acc", dir: "desc" },
                ],
                columnDefaults: {
                    tooltip: true,
                    headerWordWrap: true,
                },
                columns: behavior_columns,
                height: "800px",
                virtualDom: true,

                rowFormatter: function(row) {
                    var element = row.getElement();
                    var data = row.getData();

                    // Find clickable cells
                    var notebookAvgCell = element.querySelector('.notebook-avg-cell');
                    var quizAvgCell = element.querySelector('.quiz-avg-cell');

                    // Add click listener for Notebook Avg -> Show Popup
                    if (notebookAvgCell) {
                        notebookAvgCell.style.cursor = 'pointer';
                        notebookAvgCell.title = 'Click to see subject scores';
                        // Remove previous listener if any (good practice)
                        notebookAvgCell.replaceWith(notebookAvgCell.cloneNode(true));
                        notebookAvgCell = element.querySelector('.notebook-avg-cell'); // Re-select after clone

                        notebookAvgCell.addEventListener('click', () => {
                            const scores = {
                                math: data.notebook_math,
                                physics: data.notebook_physics,
                                chemistry: data.notebook_chemistry
                            };
                            showDetailsPopup(`${data.model} - Notebook Scores`, scores);
                        });
                    }

                    // Add click listener for Quiz Avg -> Show Popup
                    if (quizAvgCell) {
                        quizAvgCell.style.cursor = 'pointer';
                        quizAvgCell.title = 'Click to see subject scores';
                        // Remove previous listener if any
                        quizAvgCell.replaceWith(quizAvgCell.cloneNode(true));
                        quizAvgCell = element.querySelector('.quiz-avg-cell'); // Re-select

                        quizAvgCell.addEventListener('click', () => {
                            const scores = {
                                math: data.quiz_math,
                                physics: data.quiz_physics,
                                chemistry: data.quiz_chemistry
                            };
                            showDetailsPopup(`${data.model} - Quiz Scores`, scores);
                        });
                    }
                },
            });

            // --- NEW: Function to show the details popup ---
            function showDetailsPopup(title, scores) {
                // Find popup elements
                const popup = document.getElementById('details-popup');
                const popupTitle = document.getElementById('popup-title');
                const popupContent = document.getElementById('popup-content');
                const closeButton = document.getElementById('popup-close');
                const overlay = document.getElementById('popup-overlay');

                if (!popup || !popupTitle || !popupContent || !closeButton || !overlay) {
                    console.error("Popup elements not found!");
                    return;
                }

                // Populate content
                popupTitle.textContent = title;
                popupContent.innerHTML = `
                    <div class="popup-score-item">
                        <span class="popup-label">Math:</span>
                        <span class="popup-value">${scores.math !== undefined && scores.math !== null ? scores.math.toFixed(1) : '-'}</span>
                    </div>
                    <div class="popup-score-item">
                        <span class="popup-label">Physics:</span>
                        <span class="popup-value">${scores.physics !== undefined && scores.physics !== null ? scores.physics.toFixed(1) : '-'}</span>
                    </div>
                    <div class="popup-score-item">
                        <span class="popup-label">Chemistry:</span>
                        <span class="popup-value">${scores.chemistry !== undefined && scores.chemistry !== null ? scores.chemistry.toFixed(1) : '-'}</span>
                    </div>
                `;

                // Show popup and overlay
                popup.style.display = 'block';
                overlay.style.display = 'block';

                // Add listeners to close popup (only add once or manage carefully)
                const closePopup = () => {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                    // Remove listeners to prevent duplicates if popup is reused
                    closeButton.removeEventListener('click', closePopup);
                    overlay.removeEventListener('click', closePopup);
                };

                // Use { once: true } or manage listeners if popup is reused frequently
                closeButton.addEventListener('click', closePopup);
                overlay.addEventListener('click', closePopup);
            }
            // --- END NEW FUNCTION ---
        });
});

