export function calculateFCFS(processes) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const ganttChart = [];
  const processResults = [];
  let currentTime = 0;

  sorted.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = currentTime + process.burstTime;

    ganttChart.push({
      processId: process.id,
      processName: process.name,
      startTime,
      endTime,
    });

    const completionTime = endTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    processResults.push({
      processId: process.id,
      processName: process.name,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = endTime;
  });

  return {
    algorithmName: "First Come First Serve (FCFS)",
    ganttChart,
    processResults,
    averageWaitingTime:
      processResults.reduce((sum, p) => sum + p.waitingTime, 0) /
      processResults.length,
    averageTurnaroundTime:
      processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) /
      processResults.length,
  };
}

export function calculateSJF(processes) {
  const ganttChart = [];
  const processResults = [];
  const remaining = processes.map((p) => ({
    ...p,
    remaining: p.burstTime,
    completed: false,
  }));
  let currentTime = 0;
  let completed = 0;

  while (completed < processes.length) {
    const available = remaining.filter(
      (p) => !p.completed && p.arrivalTime <= currentTime
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    const shortest = available.reduce((min, p) =>
      p.burstTime < min.burstTime ? p : min
    );
    const startTime = currentTime;
    const endTime = currentTime + shortest.burstTime;

    ganttChart.push({
      processId: shortest.id,
      processName: shortest.name,
      startTime,
      endTime,
    });

    const completionTime = endTime;
    const turnaroundTime = completionTime - shortest.arrivalTime;
    const waitingTime = turnaroundTime - shortest.burstTime;

    processResults.push({
      processId: shortest.id,
      processName: shortest.name,
      arrivalTime: shortest.arrivalTime,
      burstTime: shortest.burstTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    const index = remaining.findIndex((p) => p.id === shortest.id);
    remaining[index].completed = true;
    currentTime = endTime;
    completed++;
  }

  return {
    algorithmName: "Shortest Job First (SJF)",
    ganttChart,
    processResults,
    averageWaitingTime:
      processResults.reduce((sum, p) => sum + p.waitingTime, 0) /
      processResults.length,
    averageTurnaroundTime:
      processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) /
      processResults.length,
  };
}

export function calculateSRTF(processes) {
  const ganttChart = [];
  const processResults = [];
  const remaining = processes.map((p) => ({
    ...p,
    remaining: p.burstTime,
    completionTime: 0,
    firstStart: -1,
  }));

  let currentTime = 0;
  let completed = 0;
  let lastProcessId = null;
  let lastStartTime = 0;

  while (completed < processes.length) {
    const available = remaining.filter(
      (p) => p.remaining > 0 && p.arrivalTime <= currentTime
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    const shortest = available.reduce((min, p) =>
      p.remaining < min.remaining ? p : min
    );

    if (lastProcessId !== shortest.id) {
      if (lastProcessId !== null) {
        ganttChart.push({
          processId: lastProcessId,
          processName: remaining.find((p) => p.id === lastProcessId).name,
          startTime: lastStartTime,
          endTime: currentTime,
        });
      }
      lastProcessId = shortest.id;
      lastStartTime = currentTime;
    }

    shortest.remaining--;
    currentTime++;

    if (shortest.remaining === 0) {
      shortest.completionTime = currentTime;
      completed++;
    }
  }

  if (lastProcessId !== null) {
    ganttChart.push({
      processId: lastProcessId,
      processName: remaining.find((p) => p.id === lastProcessId).name,
      startTime: lastStartTime,
      endTime: currentTime,
    });
  }

  remaining.forEach((process) => {
    const turnaroundTime = process.completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    processResults.push({
      processId: process.id,
      processName: process.name,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      completionTime: process.completionTime,
      turnaroundTime,
      waitingTime,
    });
  });

  return {
    algorithmName: "Shortest Remaining Time First (SRTF)",
    ganttChart,
    processResults,
    averageWaitingTime:
      processResults.reduce((sum, p) => sum + p.waitingTime, 0) /
      processResults.length,
    averageTurnaroundTime:
      processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) /
      processResults.length,
  };
}

export function calculatePriority(processes) {
  const ganttChart = [];
  const processResults = [];
  const remaining = processes.map((p) => ({ ...p, completed: false }));
  let currentTime = 0;
  let completed = 0;

  while (completed < processes.length) {
    const available = remaining.filter(
      (p) => !p.completed && p.arrivalTime <= currentTime
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    const highest = available.reduce((max, p) =>
      p.priority > max.priority ? p : max
    );
    const startTime = currentTime;
    const endTime = currentTime + highest.burstTime;

    ganttChart.push({
      processId: highest.id,
      processName: highest.name,
      startTime,
      endTime,
    });

    const completionTime = endTime;
    const turnaroundTime = completionTime - highest.arrivalTime;
    const waitingTime = turnaroundTime - highest.burstTime;

    processResults.push({
      processId: highest.id,
      processName: highest.name,
      arrivalTime: highest.arrivalTime,
      burstTime: highest.burstTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      priority: highest.priority,
    });

    const index = remaining.findIndex((p) => p.id === highest.id);
    remaining[index].completed = true;
    currentTime = endTime;
    completed++;
  }

  return {
    algorithmName: "Priority Scheduling",
    ganttChart,
    processResults,
    averageWaitingTime:
      processResults.reduce((sum, p) => sum + p.waitingTime, 0) /
      processResults.length,
    averageTurnaroundTime:
      processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) /
      processResults.length,
  };
}

export function calculateRoundRobin(processes, timeQuantum) {
  const ganttChart = [];
  const processResults = [];
  const queue = [];
  const remaining = processes.map((p) => ({
    ...p,
    remaining: p.burstTime,
    completionTime: 0,
  }));

  let currentTime = 0;
  let completed = 0;
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let processIndex = 0;

  // Add first process
  if (sorted.length > 0) {
    currentTime = sorted[0].arrivalTime;
    const proc = remaining.find((p) => p.id === sorted[0].id);
    queue.push({ process: sorted[0], remaining: proc.remaining });
    processIndex++;
  }

  while (completed < processes.length || queue.length > 0) {
    if (queue.length === 0) {
      if (processIndex < sorted.length) {
        currentTime = sorted[processIndex].arrivalTime;
        const proc = remaining.find((p) => p.id === sorted[processIndex].id);
        queue.push({
          process: sorted[processIndex],
          remaining: proc.remaining,
        });
        processIndex++;
      }
      continue;
    }

    const current = queue.shift();
    const executionTime = Math.min(current.remaining, timeQuantum);
    const startTime = currentTime;
    const endTime = currentTime + executionTime;

    ganttChart.push({
      processId: current.process.id,
      processName: current.process.name,
      startTime,
      endTime,
    });

    currentTime = endTime;
    current.remaining -= executionTime;

    // Add newly arrived processes
    while (
      processIndex < sorted.length &&
      sorted[processIndex].arrivalTime <= currentTime
    ) {
      const proc = remaining.find((p) => p.id === sorted[processIndex].id);
      queue.push({ process: sorted[processIndex], remaining: proc.remaining });
      processIndex++;
    }

    if (current.remaining > 0) {
      queue.push(current);
    } else {
      const proc = remaining.find((p) => p.id === current.process.id);
      proc.completionTime = currentTime;
      completed++;
    }
  }

  remaining.forEach((process) => {
    const turnaroundTime = process.completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    processResults.push({
      processId: process.id,
      processName: process.name,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      completionTime: process.completionTime,
      turnaroundTime,
      waitingTime,
    });
  });

  return {
    algorithmName: `Round Robin (Time Quantum: ${timeQuantum})`,
    ganttChart,
    processResults,
    averageWaitingTime:
      processResults.reduce((sum, p) => sum + p.waitingTime, 0) /
      processResults.length,
    averageTurnaroundTime:
      processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) /
      processResults.length,
  };
}
