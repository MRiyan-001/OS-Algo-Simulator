import { Plus } from "lucide-react";
import React, { useState } from "react";

const ProcessForm = ({ onAddProcess }) => {
  const [name, setName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");

  // creating process form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !arrivalTime || !burstTime || !priority) return;

    const newProcess = {
      id: Math.random().toString(36).slice(2),
      name,
      arrivalTime: Number(arrivalTime),
      burstTime: Number(burstTime),
      priority: Number(priority),
    };

    onAddProcess(newProcess);

    setName("");
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  return (
    <div className="p-6  shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] border-border/50 rounded-lg">
      <h2 className="text-xl font-bold mb-4 bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] bg-clip-text text-transparent">
        Add Process
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-600 font-medium" >Process Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="P1"
              required
              className="transition-all focus:shadow-sm px-3 py-2 rounded-md border-2 border-[hsl(220_20%_88%)] font-mono bg-[hsl(220_25%_97%)] outline-none focus:border-[hsl(250_75%_60%)]"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="arrivalTime" className="text-gray-600 font-medium" >Arrival Time</label>
            <input
              id="arrivalTime"
              type="number"
              min="0"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              placeholder="0"
              required
              className="transition-all focus:shadow-sm px-3 py-2 rounded-md border-2 border-[hsl(220_20%_88%)] font-mono bg-[hsl(220_25%_97%)] outline-none focus:border-[hsl(250_75%_60%)]"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="burstTime" className="text-gray-600 font-medium" >Burst Time</label>
            <input
              id="burstTime"
              type="number"
              min="1"
              value={burstTime}
              onChange={(e) => setBurstTime(e.target.value)}
              placeholder="5"
              required
              className="transition-all focus:shadow-sm px-3 py-2 rounded-md border-2 border-[hsl(220_20%_88%)] font-mono bg-[hsl(220_25%_97%)] outline-none focus:border-[hsl(250_75%_60%)]"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="priority" className="text-gray-600 font-medium" >Priority</label>
            <input
              id="priority"
              type="number"
              min="1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="1"
              required
              className="transition-all focus:shadow-sm px-3 py-2 rounded-md border-2 border-[hsl(220_20%_88%)] font-mono bg-[hsl(220_25%_97%)] outline-none focus:border-[hsl(250_75%_60%)]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center text-white text-sm font-semibold bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] px-5 py-3 rounded-lg w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Process
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;
