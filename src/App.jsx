import React, { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import { assets } from "./assets/assests";
import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import SelectAlgorithm from "./components/SelectAlgorithm";
import { Play } from "lucide-react";
import ResultDisplay from "./components/ResultDisplay";
// import { useToast } from "./components/ui/use-toast";
import { toast } from "./hooks/useToast";
import { calculateFCFS, calculatePriority, calculateRoundRobin, calculateSJF, calculateSRTF } from "./components/utlis/schedulingAlgorithms";

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [results, setResults] = useState([]);

  // const { toast } = useToast();

  // Adding process
  const handleAddProcess = (process) => {
    setProcesses([...processes, process]);
    toast({
      title: "Process Added",
      description: `${process.name} has been added to the queue.`,
    });
  };

  // Removing process
  const handleRemoveProcess = (id) => {
    const process = processes.find((p) => p.id === id);
    setProcesses(processes.filter((p) => p.id !== id));
    toast({
      title: "Process Removed",
      description: `${process?.name} has been removed from the queue.`,
      variant: "destructive",
    });
  };

  // Selecting Algorithms
  const handleAlgorithmToggle = (algorithm) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithm)
        ? prev.filter((a) => a !== algorithm)
        : [...prev, algorithm]
    );
  };

  const handleRunSimulation = () => {
    // if there is no process selected
    if (processes.length === 0) {
      toast({
        title: "No Processes",
        description: "Please add at least one process to run the simulation.",
        variant: "destructive",
      });
      return;
    }

    // if there is no selected algorithm
    if (selectedAlgorithms.length === 0) {
      toast({
        title: "No Algorithms Selected",
        description: "Please select at least one scheduling algorithm.",
        variant: "destructive",
      });
      return;
    }

    const newResults = [];

    selectedAlgorithms.forEach((algorithm) => {
      switch (algorithm) {
        case "FCFS":
          newResults.push(calculateFCFS(processes));
          break;
        case "SJF":
          newResults.push(calculateSJF(processes));
          break;
        case "SRTF":
          newResults.push(calculateSRTF(processes));
          break;
        case "Priority":
          newResults.push(calculatePriority(processes));
          break;
        case "RR":
          newResults.push(calculateRoundRobin(processes, timeQuantum));
          break;
      }
    });

    setResults(newResults);
    
    toast({
      title: "Simulation Complete",
      description: `Successfully simulated ${
        selectedAlgorithms.length
      } algorithm${selectedAlgorithms.length > 1 ? "s" : ""}.`,
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[var(--gradient-hero)">
      <img
        src={assets.bgImg}
        alt="bgImg"
        className="absolute -z-5 h-[90vh] -translate-x-20 -translate-y-30 object-cover"
      />
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        {/* Process Form */}
        <ProcessForm onAddProcess={handleAddProcess} />
        <ProcessTable
          processes={processes}
          onRemoveProcess={handleRemoveProcess}
        />
        <SelectAlgorithm
          onAlgorithmToggle={handleAlgorithmToggle}
          selectedAlgorithms={selectedAlgorithms}
          timeQuantum={timeQuantum}
          onTimeQuantumChange={setTimeQuantum}
        />

        <div className="flex justify-center">
          <button
            onClick={handleRunSimulation}
            size="lg"
            className="flex items-center justify-center text-white text-sm font-semibold bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] px-5 py-3 rounded-lg w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Play className="mr-2 h-5 w-5" />
            Run Simulation
          </button>
        </div>

        <ResultDisplay results={results} />
      </div>
    </div>
  );
};

export default App;
