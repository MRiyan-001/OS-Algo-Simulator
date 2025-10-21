import React from "react";
import GanttChart from "./GanttChart";

const ResultDisplay = ({ results }) => {
  return results.length === 0 ? (
    <div className="p-6 shadow-md border-border/50">
      <p className="text-center text-gray-500">
        Select algorithms and click "Run Simulation" to see results.
      </p>
    </div>
  ) : (
    <div className="sm:grid sm:grid-cols-2 space-y-6">
      {results.map((result, index) => (
        <div
          key={index}
          className="p-6 shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] border-border/50 space-y-6"
        >
          <div>
            <h3 className="text-xl font-bold mb-4 bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] bg-clip-text text-transparent">
              {result.algorithmName}
            </h3>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Gantt Chart
              </h4>
              <GanttChart executions={result.ganttChart} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-gray-600 mb-1">Average Waiting Time</p>
              <p className="text-2xl font-bold font-mono bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] text-transparent bg-clip-text">
                {result.averageWaitingTime.toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm text-gray-600 mb-1">
                Average Turnaround Time
              </p>
              <p className="text-2xl font-bold font-mono bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] text-transparent bg-clip-text">
                {result.averageTurnaroundTime.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Process Details
            </h4>
            <table className="w-full bg-gray-50 rounded-lg">
              <thead className="text-gray-600 bg-gray-200">
                <tr className="border-b border-gray-300 p-3 text-start hover:bg-[hsl(220_15%_60%)]/10 ">
                  <th className="font-semibold p-4 text-start">Process</th>
                  <th className="font-semibold p-4 text-start">Arrival</th>
                  <th className="font-semibold p-4 text-start">Burst</th>
                  {result.processResults[0]?.priority !== undefined && (
                    <th className="font-semibold p-4 text-start">Priority</th>
                  )}
                  <th className="font-semibold p-3 text-start">Completion</th>
                  <th className="font-semibold p-3 text-start">Turnaround</th>
                  <th className="font-semibold p-3 text-start">Waiting</th>
                </tr>
              </thead>
              <tbody>
                {result.processResults.map((process) => (
                  <tr
                    key={process.processId}
                    className="border-b border-gray-200 hover:bg-[hsl(220_15%_60%)]/10  transition-colors text-gray-500"
                  >
                    <td className="font-semibold p-4">{process.processName}</td>
                    <td className="font-mono p-4">{process.arrivalTime}</td>
                    <td className="font-mono p-4">{process.burstTime}</td>
                    {process.priority !== undefined && (
                      <td className="font-mono p-4">{process.priority}</td>
                    )}
                    <td className="font-mono p-4">{process.completionTime}</td>
                    <td className="font-mono p-4">{process.turnaroundTime}</td>
                    <td className="font-mono p-4">{process.waitingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
