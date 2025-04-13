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

// REFACTORED Function to toggle sub-columns and update icon
// Now accepts table instance and group name
function toggleSubColumns(table, groupName) {
    console.log("toggleSubColumns called for group:", groupName); // Log when function starts

    let fieldsToToggle = [];
    let iconElementSelector = '';
    let headerElementSelector = ''; // Selector to find the specific header div

    if (groupName === "notebook") {
        fieldsToToggle = ['notebook_math', 'notebook_physics', 'notebook_chemistry'];
        iconElementSelector = '.notebook-toggle-icon';
        headerElementSelector = '.clickable-group-header[data-group="notebook"]';
    } else if (groupName === "quiz") {
        fieldsToToggle = ['quiz_math', 'quiz_physics', 'quiz_chemistry'];
        iconElementSelector = '.quiz-toggle-icon';
        headerElementSelector = '.clickable-group-header[data-group="quiz"]';
    } else {
        console.log("Group not identified.");
        return; // Exit if group not identified
    }

    console.log("Fields to toggle:", fieldsToToggle);

    if (fieldsToToggle.length > 0) {
        // Check current visibility state based on the first column to toggle
        const firstSubColumn = table.getColumn(fieldsToToggle[0]);
        if (!firstSubColumn) {
            console.error("Could not find the first sub-column:", fieldsToToggle[0]);
            return; // Safety check
        }
        console.log("First sub-column to check visibility:", firstSubColumn.getField());

        const isCurrentlyVisible = firstSubColumn.isVisible();
        console.log("Sub-columns currently visible:", isCurrentlyVisible);

        // Toggle visibility of each subject column
        fieldsToToggle.forEach(field => {
            const subCol = table.getColumn(field);
            if (subCol) {
                 console.log("Toggling column:", field);
                 table.toggleColumn(field);
            } else {
                console.error("Could not find column to toggle:", field);
            }
        });

        // Update the icon in the header element directly
        // Find the specific header element within the table's element
        const tableElement = table.element; // Get the main table container element
        const headerElement = tableElement.querySelector(headerElementSelector); // Find the specific div
        console.log("Header element found:", headerElement);

        if (headerElement) {
            const iconElement = headerElement.querySelector(iconElementSelector);
            console.log("Icon element found:", iconElement);

            if (iconElement) {
                if (isCurrentlyVisible) {
                    console.log("Changing icon to plus");
                    iconElement.classList.remove('fa-minus-square');
                    iconElement.classList.add('fa-plus-square');
                } else {
                    console.log("Changing icon to minus");
                    iconElement.classList.remove('fa-plus-square');
                    iconElement.classList.add('fa-minus-square');
                }
            } else {
                 console.error("Could not find icon element with selector:", iconElementSelector, "within", headerElement);
            }
        } else {
            console.error("Could not find header element with selector:", headerElementSelector);
        }
    }
}

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
                {
                    title: "Model",
                    field: "model",
                    widthGrow: 2,
                    minWidth: 70,
                    frozen: true // Freeze the Model column
                },
                {
                    title: "#F",
                    field: "frames",
                    widthGrow: 0.6,
                    minWidth: 35
                },
                {
                    title: "#T",
                    field: "tpf",
                    widthGrow: 0.6,
                    minWidth: 35,
                    sorter: "number" // Explicitly set the sorter to number
                },
                {
                    title: "Avg.",
                    field: "avg_acc",
                    widthGrow: 0.7,
                    minWidth: 50,
                    formatter: colorFormatterAvg,
                    sorter: function(a, b, aRow, bRow, column, dir, sorterParams){
                        // Convert to numbers for proper sorting
                        var a_val = parseFloat(a) || 0;
                        var b_val = parseFloat(b) || 0;
                        return a_val - b_val;
                    }
                },
                {
                    // Add class and data-group to the div, remove headerClick
                    title: "<div class='clickable-group-header' data-group='notebook' style='text-align: center; cursor: pointer;'>Notebook <i class='fas fa-plus-square notebook-toggle-icon'></i></div>",
                    columns: [
                        {
                            title: "<span style='font-size: 0.85em;'>Avg.</span>",
                            field: "notebook_avg",
                            hozAlign: "center",
                            formatter: colorFormatterActionSeq,
                            minWidth: 60,
                            widthGrow: 0.7
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Math</span>",
                            field: "notebook_math",
                            hozAlign: "center",
                            formatter: colorFormatterActionSeq,
                            minWidth: 60,
                            widthGrow: 0.7,
                            visible: false // Initially hidden
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Physics</span>",
                            field: "notebook_physics",
                            hozAlign: "center",
                            formatter: colorFormatterActionSeq,
                            minWidth: 60,
                            widthGrow: 0.8,
                            visible: false // Initially hidden
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Chemistry</span>",
                            field: "notebook_chemistry",
                            hozAlign: "center",
                            formatter: colorFormatterActionSeq,
                            minWidth: 70,
                            widthGrow: 1.2,
                            visible: false // Initially hidden
                        }
                    ]
                },
                {
                     // Add class and data-group to the div, remove headerClick
                    title: "<div class='clickable-group-header' data-group='quiz' style='text-align: center; cursor: pointer;'>Quiz <i class='fas fa-plus-square quiz-toggle-icon'></i></div>",
                    columns: [
                        {
                            title: "<span style='font-size: 0.85em;'>Avg.</span>",
                            field: "quiz_avg",
                            hozAlign: "center",
                            formatter: simpleColorFormatter,
                            minWidth: 55,
                            widthGrow: 0.7
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Math</span>",
                            field: "quiz_math",
                            hozAlign: "center",
                            formatter: simpleColorFormatter,
                            minWidth: 55,
                            widthGrow: 0.7,
                            visible: false // Initially hidden
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Physics</span>",
                            field: "quiz_physics",
                            hozAlign: "center",
                            formatter: simpleColorFormatter,
                            minWidth: 60,
                            widthGrow: 0.8,
                            visible: false // Initially hidden
                        },
                        {
                            title: "<span style='font-size: 0.85em;'>Chemistry</span>",
                            field: "quiz_chemistry",
                            hozAlign: "center",
                            formatter: simpleColorFormatter,
                            minWidth: 70,
                            widthGrow: 1.2,
                            visible: false // Initially hidden
                        }
                    ]
                }
            ];

            behavior_columns.forEach(column => {
                if (column.columns) {
                    column.columns.forEach(subColumn => {
                        let { min, max } = getColumnMinMax(behavior_total_benchmark_data, subColumn.field);
                        subColumn.formatterParams = { min, max };
                    });
                } else if (column.field !== "model" && column.field !== "frames" && column.field !== "tpf") {
                    let { min, max } = getColumnMinMax(behavior_total_benchmark_data, column.field);
                    column.formatterParams = { min, max };
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
                height: "800px", // Set a fixed height for the table
                virtualDom: true, // Enable virtual DOM for better performance with large datasets
                // ADD tableBuilt callback
                tableBuilt: function(){
                    console.log("Table built, attaching listeners...");
                    // Attach click listeners to the custom header divs
                    this.element.querySelectorAll('.clickable-group-header').forEach(headerDiv => {
                        headerDiv.addEventListener('click', () => {
                            const group = headerDiv.getAttribute('data-group');
                            console.log("Manual listener clicked for group:", group);
                            toggleSubColumns(this, group); // 'this' refers to the table instance
                        });
                    });
                }
            });
        });
})

