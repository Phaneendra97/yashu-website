import React from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import './GanttView.css';

export const GanttView = ({ tasks }) => {
    return (
        <div className="gantt-container">
            <div className="gantt-chart-wrapper">
                <Gantt
                    tasks={tasks}
                    viewMode={ViewMode.Year}
                    columnWidth={60}
                    listCellWidth="300px" /* Wider for Name since dates are gone */
                    barFill={60}
                    barCornerRadius={4}
                    barBackgroundColor="#0052CC"
                    barBackgroundSelectedColor="#0052CC"
                    barProgressColor="#36B37E"
                    barProgressSelectedColor="#36B37E"
                    projectBackgroundColor="#EBECF0"
                    projectBackgroundSelectedColor="#DEEBFF"
                    labelTextColor="transparent" /* Hide chart labels */
                    fontSize={12}
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    TooltipContent={({ task, fontSize, fontFamily }) => {
                        return (
                            <div className="gantt-tooltip" style={{ fontSize, fontFamily }}>
                                <div className="tooltip-header">{task.name}</div>
                                <div className="tooltip-dates">
                                    {task.start.toLocaleDateString()} - {task.end.toLocaleDateString()}
                                </div>
                                {task.details && (
                                    <div className="tooltip-details">{task.details}</div>
                                )}
                            </div>
                        );
                    }}
                    TaskListHeader={({ headerHeight, fontFamily, fontSize, rowWidth }) => {
                        return (
                            <div
                                style={{
                                    fontFamily: fontFamily,
                                    fontSize: fontSize,
                                    height: headerHeight,
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "10px",
                                    borderBottom: "1px solid #dfe1e5",
                                    backgroundColor: "#f4f5f7",
                                    fontWeight: "bold",
                                    width: rowWidth
                                }}
                            >
                                <div>Name</div>
                            </div>
                        );
                    }}
                    TaskListTable={({
                        rowHeight,
                        rowWidth,
                        tasks,
                        fontFamily,
                        fontSize,
                        locale,
                        onExpanderClick,
                    }) => {
                        return (
                            <div
                                style={{
                                    fontFamily: fontFamily,
                                    fontSize: fontSize,
                                    width: rowWidth
                                }}
                            >
                                {tasks.map((t, i) => {
                                    // Define background based on project/category
                                    let rowBg = "#ffffff";
                                    if (t.project === 'Experience') {
                                        rowBg = "#F3F0FF"; // Light Lavender for Experience
                                    } else if (t.project === 'Education') {
                                        rowBg = "#E6FFFA"; // Light Mint for Education
                                    } else {
                                        rowBg = i % 2 === 0 ? "#ffffff" : "#f4f5f7"; // Default
                                    }

                                    return (
                                        <div
                                            key={`${t.id}_list`}
                                            style={{
                                                height: rowHeight,
                                                width: rowWidth,
                                                display: "flex",
                                                alignItems: "center",
                                                paddingLeft: "10px",
                                                borderBottom: "1px solid #dfe1e5",
                                                cursor: "pointer",
                                                backgroundColor: rowBg,
                                            }}
                                            onClick={() => onExpanderClick(t)}
                                        >
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>
                                                {t.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
};
