import React from "react";

const SelectAlgorithm = ({
  selectedAlgorithms,
  onAlgorithmToggle,
  timeQuantum,
  onTimeQuantumChange,
}) => {
  const algorithms = [
    { value: "FCFS", label: "FCFS", description: "First Come First Serve" },
    { value: "SJF", label: "SJF", description: "Shortest Job First" },
    {
      value: "SRTF",
      label: "SRTF",
      description: "Shortest Remaining Time First",
    },
    {
      value: "Priority",
      label: "Priority",
      description: "Priority Scheduling",
    },
    { value: "RR", label: "Round Robin", description: "Round Robin" },
  ];
  return (
    <div className="p-6 shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] border-border/50">
      <h2 className="text-xl font-bold mb-4 bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] bg-clip-text text-transparent">
        Select Algorithms
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map((algorithm) => (
            <div
              key={algorithm.value}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[hsl(220_15%_60%)]/10 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAlgorithms.includes(algorithm.value)}
                onChange={() => onAlgorithmToggle(algorithm.value)}
                name={algorithm.value}
                id={algorithm.value}
                className="h-4 w-4 shrink-0 rounded-sm focus-visible:outline-none mt-1 cursor-pointer"
              />
              <div className="flex-1 leading-5">
                <label
                  htmlFor={algorithm.value}
                  className="font-medium block cursor-pointer"
                >
                  {algorithm.label}
                </label>
                <label
                  htmlFor={algorithm.value}
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  {algorithm.description}
                </label>
              </div>
            </div>
          ))}
        </div>

        {selectedAlgorithms.includes("RR") && (
          <div className="pt-4 border-t border-gray-300">
            <div className="flex items-center gap-4">
              <label
                htmlFor="timeQuantum"
                className="whitespace-nowrap font-medium text-gray-600"
              >
                Time Quantum:
              </label>
              <input
                id="timeQuantum"
                type="number"
                min="1"
                placeholder="2"
                value={timeQuantum}
                onChange={(e) => onTimeQuantumChange(e.target.value)}
                className="w-24 transition-all focus:shadow-sm px-3 py-2 rounded-md border-2 border-[hsl(220_20%_88%)] font-mono bg-[hsl(220_25%_97%)] outline-none focus:border-[hsl(250_75%_60%)]"
              />
              <span className="text-sm text-gray-500">
                (for Round Robin algorithm)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAlgorithm;
