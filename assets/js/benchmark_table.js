//Formatter to generate charts
var chartFormatter = function (cell, formatterParams, onRendered) {
    const value = cell.getValue();
    const field = cell.getField();
    const rowData = cell.getRow().getData(); // <<< Get row data to access subject scores AND model name
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
    const { min = 0, max = 100, startColor, endColor, barColor = '#90EE90' } = formatterParams || {};
    const percentage = Math.max(0, Math.min(100, ((numValue - min) / (max - min)) * 100));

    // --- Create the Bar ---
    const bar = document.createElement("div");
    bar.classList.add("score-bar");
    bar.style.width = percentage + "%";
    bar.style.position = "absolute";
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.borderRadius = "4px";
    bar.style.zIndex = "1";

    // <<< Apply gradient if start/end colors provided, else solid color >>>
    if (startColor && endColor) {
        bar.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
    } else {
        bar.style.backgroundColor = barColor; // Use barColor or default
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

    // --- Add Tooltip ---
    let tooltipTitle = '';
    let tooltipDetails = '';
    const modelName = rowData.model || ''; // Get model name from row data
    // Helper to format scores, handling null/undefined
    const formatScore = (score) => (score !== undefined && score !== null && !isNaN(parseFloat(score))) ? parseFloat(score).toFixed(1) : '-';

    // Construct tooltip title and details separately, including the model name in the title
    if (field === 'notebook_avg') {
        tooltipTitle = `Notebook Scores of ${modelName}`; // <<< Remove colon from title
        tooltipDetails = `Math: ${formatScore(rowData.notebook_math)}\nPhysics: ${formatScore(rowData.notebook_physics)}\nChemistry: ${formatScore(rowData.notebook_chemistry)}`;
    } else if (field === 'quiz_avg') {
        tooltipTitle = `Quiz Scores of ${modelName}`; // <<< Remove colon from title
        tooltipDetails = `Math: ${formatScore(rowData.quiz_math)}\nPhysics: ${formatScore(rowData.quiz_physics)}\nChemistry: ${formatScore(rowData.quiz_chemistry)}`;
    }

    // <<< ADD event listeners for custom tooltip >>>
    if (tooltipTitle && tooltipDetails) { // Check if both title and details exist
        const tooltipElement = document.getElementById('custom-tooltip'); // Get the tooltip element
        if (tooltipElement) {
            container.addEventListener('mouseover', (event) => {
                // <<< UPDATE innerHTML structure for styling AND ICONS >>>
                // Define icons for subjects
                const icons = {
                    Math: '<i class="fas fa-calculator fa-fw" style="margin-right: 5px; color: #6c757d;"></i>', // Added fa-fw for fixed width
                    Physics: '<i class="fas fa-atom fa-fw" style="margin-right: 5px; color: #6c757d;"></i>',
                    Chemistry: '<i class="fas fa-flask fa-fw" style="margin-right: 5px; color: #6c757d;"></i>'
                };

                // Process details to add icons
                const detailLines = tooltipDetails.split('\n').map(line => {
                    const parts = line.split(':'); // Split "Subject: Score"
                    if (parts.length === 2) {
                        const subject = parts[0].trim();
                        const score = parts[1].trim();
                        const icon = icons[subject] || ''; // Get icon or empty string
                        return `${icon}${subject}: ${score}`; // Add icon before subject
                    }
                    return line; // Return original line if format doesn't match
                }).join('<br>'); // Join lines with <br>

                tooltipElement.innerHTML = `
                    <div style="text-align: center; font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${tooltipTitle}</div>
                    <div style="line-height: 1.6;">${detailLines}</div>
                `;
                // <<< END UPDATE innerHTML >>>

                tooltipElement.style.left = `${event.pageX + 10}px`; // Position near cursor
                tooltipElement.style.top = `${event.pageY + 10}px`;
                tooltipElement.style.display = 'block'; // Show tooltip
            });

            container.addEventListener('mousemove', (event) => {
                // Update position as mouse moves within the cell
                tooltipElement.style.left = `${event.pageX + 10}px`;
                tooltipElement.style.top = `${event.pageY + 10}px`;
            });

            container.addEventListener('mouseout', () => {
                tooltipElement.style.display = 'none'; // Hide tooltip
            });
        } else {
            console.error("Custom tooltip element not found!");
        }
    }
    // --- End Tooltip ---

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
    const { min = 0, max = 100 } = formatterParams || {}; // Default min/max if not provided
    const percentage = Math.max(0, Math.min(100, ((numValue - min) / (max - min)) * 100));

    // --- Create the Bar ---
    const bar = document.createElement("div");
    bar.classList.add("score-bar"); // Use bar class
    bar.style.width = percentage + "%";
    bar.style.position = "absolute"; // Position behind text
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.backgroundColor = '#D8BFD8'; // Light purple color for Quiz
    bar.style.borderRadius = "4px"; // <<< Added rounded corners for the bar
    bar.style.zIndex = "1"; // Bar behind text

    // --- Create the Text ---
    const text = document.createElement("span");
    text.classList.add("score-text"); // Use text class
    text.textContent = numValue.toFixed(1); // Display value with one decimal place
    text.style.position = "relative"; // Position text above bar
    text.style.zIndex = "2"; // Text above bar
    text.style.color = "#333"; // Darker text color for readability
    text.style.fontWeight = "500"; // Slightly bolder text

    // --- Assemble the Cell ---
    container.style.position = "relative"; // Needed for absolute positioning of bar
    container.style.overflow = "hidden"; // Hide bar overflow
    container.style.borderRadius = "4px"; // <<< Added rounded corners for the container
    container.style.padding = "4px 8px"; // Add some padding
    container.style.backgroundColor = "#f0f0f0"; // Light grey background for the cell container
    container.style.textAlign = "center"; // Center the text horizontally

    container.appendChild(bar);
    container.appendChild(text);

    return container;
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

// --- BEGIN NEW SORTER ---
// Custom sorter for model sizes (e.g., "7B", "500M", "-")
const modelSizeSorter = function(a, b, aRow, bRow, column, dir, sorterParams) {
    const parseSize = (sizeStr) => {
        if (typeof sizeStr !== 'string' || sizeStr === '-') {
            return -1; // Treat '-' or non-strings as smallest
        }
        const size = parseFloat(sizeStr);
        if (isNaN(size)) {
            return -1;
        }
        // Convert B to M for consistent comparison
        if (sizeStr.toUpperCase().includes('B')) {
            return size * 1000; // e.g., 7B -> 7000
        }
        if (sizeStr.toUpperCase().includes('M')) {
            return size; // e.g., 500M -> 500
        }
        return -1; // Fallback for unknown formats (treat as smallest)
    };

    const sizeA = parseSize(a);
    const sizeB = parseSize(b);

    // Standard numeric comparison
    return sizeA - sizeB;
};
// --- END NEW SORTER ---

document.addEventListener('DOMContentLoaded', function () {
    // <<< ADD: Create and append the custom tooltip element once >>>
    const tooltipDiv = document.createElement('div');
    tooltipDiv.id = 'custom-tooltip';
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.display = 'none';
    tooltipDiv.style.backgroundColor = '#f8f9fa'; // Light grey background (Bootstrap default light)
    tooltipDiv.style.color = '#212529';           // Dark text color (Bootstrap default dark)
    tooltipDiv.style.border = '1px solid #dee2e6'; // Add a light border
    tooltipDiv.style.padding = '10px 15px';
    tooltipDiv.style.borderRadius = '6px';
    tooltipDiv.style.zIndex = '1000';
    tooltipDiv.style.fontSize = '15px';
    tooltipDiv.style.fontFamily = 'inherit';
    tooltipDiv.style.lineHeight = '1.5'; // Base line height
    tooltipDiv.style.whiteSpace = 'pre-line';
    tooltipDiv.style.pointerEvents = 'none';
    tooltipDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; // Slightly softer shadow
    document.body.appendChild(tooltipDiv);
    // <<< END ADD >>>

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
                // Model column - add formatter for icons and links
                {
                    title: "Model",
                    field: "model",
                    widthGrow: 1,
                    minWidth: 150,
                    frozen: true,
                    formatter: function(cell, formatterParams, onRendered) {
                        const modelName = cell.getValue();
                        const rowData = cell.getRow().getData();
                        const modelType = rowData.model_type;
                        const modelUrl = rowData.model_url; // Get the URL from data

                        let iconHtml = '';
                        let iconTitle = '';

                        if (modelType === 'proprietary') {
                            iconHtml = '<i class="fas fa-lock model-icon proprietary-icon"></i> ';
                            iconTitle = 'Proprietary Model';
                        } else if (modelType === 'open-source') {
                            iconHtml = '<i class="fas fa-box-open model-icon open-source-icon"></i> ';
                            iconTitle = 'Open Source Model';
                        } else if (modelType === 'llm') {
                            iconHtml = '<i class="fas fa-brain model-icon llm-icon"></i> ';
                            iconTitle = 'Base LLM';
                        }

                        // Content with icon and name
                        const content = `${iconHtml}${modelName}`;

                        // If a URL exists, wrap the content in a link
                        if (modelUrl) {
                            // Use target="_blank" to open in new tab, rel="noopener noreferrer" for security
                            return `<a href="${modelUrl}" target="_blank" rel="noopener noreferrer" title="${iconTitle}: ${modelName}">${content}</a>`;
                        } else {
                            // Otherwise, just return the content in a span with the title
                            return `<span title="${iconTitle}: ${modelName}">${content}</span>`;
                        }
                    }
                },
                // Model Size column
                {
                    title: "Size",
                    field: "model_size",
                    widthGrow: 0.6,
                    minWidth: 40,
                    hozAlign: "center",
                    headerHozAlign: "center",
                    sorter: modelSizeSorter,
                    formatter: function(cell, formatterParams){
                        const value = cell.getValue();
                        return value !== null && value !== undefined ? value : "-";
                    }
                },
                // #F column
                {
                    title: "#F", field: "frames", widthGrow: 0.5, minWidth: 5, sorter: "number",
                    hozAlign: "center",
                    headerHozAlign: "center",
                    formatter: function(cell, formatterParams){
                        const value = cell.getValue();
                        if (value === Infinity || value === null || value === undefined) {
                            return "-";
                        }
                        return value;
                    }
                },
                // #T column
                {
                    title: "#T", field: "tpf", widthGrow: 0.5, minWidth: 5, sorter: "number",
                    hozAlign: "center",
                    headerHozAlign: "center",
                    formatter: function(cell, formatterParams){
                        const value = cell.getValue();
                        if (value === Infinity || value === null || value === undefined) {
                            return "-";
                        }
                        return value;
                    }
                },
                // Overall column
                {
                    title: "Overall", field: "avg_acc", widthGrow: 1, minWidth: 100,
                    hozAlign: "center",
                    headerHozAlign: "center",
                    sorter: function(a, b, aRow, bRow, column, dir, sorterParams) {
                        const valA = parseFloat(a);
                        const valB = parseFloat(b);
                        const numA = isNaN(valA) ? -Infinity : valA;
                        const numB = isNaN(valB) ? -Infinity : valB;
                        return numA - numB;
                    },
                    // formatter: ringFormatter // <<< Commented out the ring formatter
                },
                // Notebook column - uses chartFormatter with GREEN gradient
                {
                    title: "Notebook", field: "notebook_avg", widthGrow: 1, minWidth: 230,
                    hozAlign: "center",
                    headerHozAlign: "center",
                    sorter: "number",
                    formatter: chartFormatter,
                    formatterParams: {
                        startColor: '#F0FFF0', // Honeydew (very light green)
                        endColor: '#90EE90'    // LightGreen (medium green)
                    },
                    cssClass: "notebook-avg-cell"
                },
                // Quiz column - uses chartFormatter with purple gradient
                {
                    title: "Quiz", field: "quiz_avg", widthGrow: 1, minWidth: 230,
                    hozAlign: "center",
                    headerHozAlign: "center",
                    sorter: "number",
                    formatter: chartFormatter,
                    formatterParams: {
                        startColor: '#E6E6FA', // Lavender
                        endColor: '#B19CD9'    // Light Purple
                    },
                    cssClass: "quiz-avg-cell"
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

            // --- formatterParams assignment logic (should still work) ---
            behavior_columns.forEach(column => {
                const fieldsNeedingParams = [
                    "notebook_avg", "notebook_math", "notebook_physics", "notebook_chemistry",
                    "quiz_avg", "quiz_math", "quiz_physics", "quiz_chemistry"
                ];

                if (fieldsNeedingParams.includes(column.field)) {
                    if (column.formatter) {
                        let { min, max } = getColumnMinMax(behavior_total_benchmark_data, column.field);
                        let defaultParams = { min: 0, max: 1 };

                        if (min !== undefined && max !== undefined && !isNaN(min) && !isNaN(max)) {
                           defaultParams = { min, max };
                        } else {
                           console.warn(`Could not determine min/max for ${column.field}. Using defaults.`);
                        }

                        // Merge calculated min/max with existing formatterParams (like start/endColor)
                        column.formatterParams = {
                            ...(column.formatterParams || {}),
                            ...defaultParams
                        };
                    }
                }
            });

            // Pre-process data (ensure numeric types where needed)
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
                // No specific processing needed for model_size here as it's handled by the sorter/formatter
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

                // --- Remove Row Formatter Logic for Click Popups ---
                rowFormatter: function(row) {
                    // The specific click listeners for notebook/quiz cells are no longer needed
                    // as the tooltip is handled by the chartFormatter now.
                    // You can keep this function if it's used for other row-level formatting.
                    // var element = row.getElement();
                    // var data = row.getData();

                    /* --- REMOVED ---
                    var notebookAvgCell = element.querySelector('.notebook-avg-cell');
                    var quizAvgCell = element.querySelector('.quiz-avg-cell');

                    if (notebookAvgCell) {
                        // ... listener code removed ...
                    }

                    if (quizAvgCell) {
                        // ... listener code removed ...
                    }
                    */
                },
                // --- End Row Formatter Update ---
            });

            // --- The showDetailsPopup function is no longer called by the rowFormatter ---
            // --- but can remain if used elsewhere or for future reference ---
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
