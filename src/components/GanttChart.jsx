import React from "react";

const GanttChart = ({ executions }) => {
  if (executions.length === 0) return null;
  const maxTime = Math.max(...executions.map((e) => e.endTime));
  const colors = [
    "bg-[hsl(250,75%,60%)]", // primary
    "bg-[hsl(260,60%,55%)]", // secondary
    "bg-[hsl(190,85%,55%)]", // accent
    "bg-[hsl(250,75%,70%)]", // primary-light
    "bg-[hsl(0,72%,55%)]", // destructive
  ];

  const getColor = (processId) => {
    const hash = processId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {executions.map((execution, index) => {
          const width =
            ((execution.endTime - execution.startTime) / maxTime) * 100;
          return (
            <div
              key={index}
              className={`${getColor(
                execution.processId
              )} relative min-w-[60px] h-16 rounded-md flex items-center justify-center text-white font-medium shadow-sm transition-transform`}
              style={{ width: `${width}%` }}
              title={`${execution.processName}: ${execution.startTime} - ${execution.endTime}`}
            >
              <span className="text-sm">{execution.processName}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono text-muted-foreground scrollbar-hide">
        {executions.map((execution, index) => {
          const width =
            ((execution.endTime - execution.startTime) / maxTime) * 100;
          return (
            <div
              key={index}
              className="min-w-[60px] flex justify-between px-1"
              style={{ width: `${width}%` }}
            >
              <span>{execution.startTime}</span>
              {index === executions.length - 1 && (
                <span>{execution.endTime}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;
