//Formatter to generate charts
var chartFormatter = function (cell, formatterParams, onRendered) {
    var content = document.createElement("span");
    var values = cell.getValue();

    //invert values if needed
    if (formatterParams.invert) {
        values = values.map(val => val * -1);
    }

    //add values to chart and style
    content.classList.add(formatterParams.type);
    content.innerHTML = values.join(",");

    //setup chart options
    var options = {
        width: 50,
        // min: 0.0,
        // max: 100.0,
    }

    if (formatterParams.fill) {
        options.fill = formatterParams.fill
    }

    //instantiate piety chart after the cell element has been aded to the DOM
    onRendered(function () {
        peity(content, formatterParams.type, options);
    });

    return content;
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
                // Model column - keep default (left) alignment
                { title: "Model", field: "model", widthGrow: 1, minWidth: 60, frozen: true },
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
                {
                    title: "Avg.", field: "avg_acc", widthGrow: 0.8, minWidth: 50, formatter: colorFormatterAvg, headerHozAlign: "center",
                    sorter: function(a, b, aRow, bRow, column, dir, sorterParams){
                        var a_val = parseFloat(a) || 0;
                        var b_val = parseFloat(b) || 0;
                        return a_val - b_val;
                    }
                },
                // --- Unnested Notebook Columns ---
                {
                    title: "Notebook",
                    field: "notebook_avg",
                    hozAlign: "center", // Cell content alignment
                    headerHozAlign: "center", // Header alignment
                    formatter: colorFormatterActionSeq,
                    minWidth: 60,
                    widthGrow: 1,
                    cssClass: "clickable-avg notebook-avg-cell"
                },
                // Hidden Notebook subject columns
                { title: "Notebook Math", field: "notebook_math", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },
                { title: "Notebook Physics", field: "notebook_physics", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },
                { title: "Notebook Chemistry", field: "notebook_chemistry", visible: false, formatter: colorFormatterActionSeq, headerHozAlign: "center" },

                // --- Unnested Quiz Columns ---
                {
                    title: "Quiz",
                    field: "quiz_avg",
                    hozAlign: "center", // Cell content alignment
                    headerHozAlign: "center", // Header alignment
                    formatter: simpleColorFormatter,
                    minWidth: 55,
                    widthGrow: 1,
                    cssClass: "clickable-avg quiz-avg-cell"
                },
                // Hidden Quiz subject columns
                { title: "Quiz Math", field: "quiz_math", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" },
                { title: "Quiz Physics", field: "quiz_physics", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" },
                { title: "Quiz Chemistry", field: "quiz_chemistry", visible: false, formatter: simpleColorFormatter, headerHozAlign: "center" }
            ];

            // --- Update formatterParams assignment logic ---
            behavior_columns.forEach(column => {
                // Check if the column field is one that needs min/max params
                // This includes the visible averages and the hidden subject scores
                const fieldsNeedingParams = [
                    "avg_acc",
                    "notebook_avg", "notebook_math", "notebook_physics", "notebook_chemistry",
                    "quiz_avg", "quiz_math", "quiz_physics", "quiz_chemistry"
                ];

                if (fieldsNeedingParams.includes(column.field)) {
                    // Ensure the column has a formatter function before assigning params
                    if (column.formatter) {
                        let { min, max } = getColumnMinMax(behavior_total_benchmark_data, column.field);
                        column.formatterParams = { min, max };
                    } else {
                        // Optional: Log a warning if a column needing params is missing a formatter
                        // console.warn(`Column "${column.field}" needs params but is missing a formatter.`);
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

            // Helper function to generate HTML string for a detail type
            function createDetailHTML(rowData, type) {
                const math = rowData[`${type}_math`];
                const physics = rowData[`${type}_physics`];
                const chemistry = rowData[`${type}_chemistry`];

                // Format values
                const mathVal = math !== undefined && math !== null ? math.toFixed(1) : '-';
                const physicsVal = physics !== undefined && physics !== null ? physics.toFixed(1) : '-';
                const chemistryVal = chemistry !== undefined && chemistry !== null ? chemistry.toFixed(1) : '-';

                // Add the specific class back to the main section div
                return `
                    <div class="detail-section ${type}-details">
                        <div class="detail-labels">
                            <span class="detail-item">Math</span>
                            <span class="detail-item">Physics</span>
                            <span class="detail-item">Chemistry</span>
                        </div>
                        <div class="detail-values">
                            <span class="detail-item">${mathVal}</span>
                            <span class="detail-item">${physicsVal}</span>
                            <span class="detail-item">${chemistryVal}</span>
                        </div>
                    </div>
                `;
            }

            var behavior_table = new Tabulator("#behavior-benchmark-main-table", {
                data: behavior_total_benchmark_data,
                layout: "fitColumns",
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
                    var element = row.getElement(); // Get the row DOM element
                    var data = row.getData(); // Get the data for the row

                    // Find the clickable average cells
                    var notebookAvgCell = element.querySelector('.notebook-avg-cell');
                    var quizAvgCell = element.querySelector('.quiz-avg-cell');

                    // Function to render/update the combined details container
                    const renderCombinedDetails = () => {
                        // Check expansion state (using data attributes on the row element)
                        const notebookExpanded = element.dataset.notebookExpanded === 'true';
                        const quizExpanded = element.dataset.quizExpanded === 'true';

                        // Find existing details container or create if needed
                        let detailContainer = element.querySelector('.combined-details-container');

                        // Remove container if nothing is expanded
                        if (!notebookExpanded && !quizExpanded) {
                            if (detailContainer) {
                                detailContainer.remove();
                            }
                            return; // Exit
                        }

                        // Create container if it doesn't exist
                        if (!detailContainer) {
                            detailContainer = document.createElement('div');
                            detailContainer.classList.add('combined-details-container');
                            element.appendChild(detailContainer); // Append once
                        }

                        // Generate HTML based on state
                        let combinedHTML = '';
                        if (notebookExpanded) {
                            combinedHTML += createDetailHTML(data, 'notebook');
                        }
                        if (quizExpanded) {
                            combinedHTML += createDetailHTML(data, 'quiz');
                        }

                        // *** Add console log for debugging ***
                        if (notebookExpanded && quizExpanded) {
                            console.log("Attempting to render BOTH Notebook and Quiz sections in row for model:", data.model);
                        }
                        // *** End console log ***

                        // Update the container's content
                        detailContainer.innerHTML = combinedHTML;
                    };

                    // Add click listener for Notebook Avg
                    if (notebookAvgCell) {
                        notebookAvgCell.style.cursor = 'pointer';
                        notebookAvgCell.title = 'Click to see subject scores';
                        notebookAvgCell.addEventListener('click', () => {
                            // Toggle state
                            const isExpanded = element.dataset.notebookExpanded === 'true';
                            element.dataset.notebookExpanded = isExpanded ? 'false' : 'true';
                            notebookAvgCell.classList.toggle('expanded', !isExpanded);
                            // Re-render details
                            renderCombinedDetails();
                        });
                    }

                    // Add click listener for Quiz Avg
                    if (quizAvgCell) {
                        quizAvgCell.style.cursor = 'pointer';
                        quizAvgCell.title = 'Click to see subject scores';
                        quizAvgCell.addEventListener('click', () => {
                            // Toggle state
                            const isExpanded = element.dataset.quizExpanded === 'true';
                            element.dataset.quizExpanded = isExpanded ? 'false' : 'true';
                            quizAvgCell.classList.toggle('expanded', !isExpanded);
                            // Re-render details
                            renderCombinedDetails();
                        });
                    }

                    // Initial render in case state is somehow preserved (optional)
                    // renderCombinedDetails();
                }
            });
        });
});

