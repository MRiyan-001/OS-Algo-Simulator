import { Edit2, Trash2 } from "lucide-react";

const ProcessTable = ({ onRemoveProcess, processes }) => {
  return processes.length === 0 ? (
    <div className="p-8 shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] border-border/50">
      <p className="text-center text-gray-500">
        No processes added yet. Add a process to get started.
      </p>
    </div>
  ) : (
    <div className="p-8 shadow-[0_2px_8px_0px_rgba(99,99,99,0.2)] border-border/50 overflow-hidden">
      <h2 className="text-xl font-bold mb-4 bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] bg-clip-text text-transparent">
        Process Queue
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-b-gray-200 text-gray-600">
            <tr className="border-border/50 p-3 text-start hover:bg-[hsl(220_15%_60%)]/10 ">
              <th className="font-semibold p-3 text-start ">Process</th>
              <th className="font-semibold p-3 text-start ">Arrival Time</th>
              <th className="font-semibold p-3 text-start ">Burst Time</th>
              <th className="font-semibold p-3 text-start ">Priority</th>
              <th className="font-semibold text-right p-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes?.map((process) => (
              <tr
                key={process.id}
                className="hover:bg-[hsl(220_15%_60%)]/10  transition-colors text-gray-500"
              >
                <td className="font-semibold p-4">{process.name}</td>
                <td className="font-mono p-4">{process.arrivalTime}</td>
                <td className="font-mono p-4">{process.burstTime}</td>
                <td className="font-mono p-4">{process.priority}</td>
                <td className="text-right space-x-1 p-4">
                  {/* <button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveProcess(process.id)}
                    className="hover:bg-gray-100 p-2 rounded-full cursor-pointer text-gray-600 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button> */}
                  <button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveProcess(process.id)}
                    className="hover:bg-red-100 p-2 rounded-full cursor-pointer text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
