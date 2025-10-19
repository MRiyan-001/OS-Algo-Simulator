import { Cpu } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center space-y-4 py-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-3 bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] rounded-xl shadow-lg">
          <Cpu className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="bg-[linear-gradient(135deg,hsl(250_75%_60%),hsl(260_70%_65%))] bg-clip-text text-transparent">
          Process Scheduling Simulator
        </span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Visualize and compare CPU scheduling algorithms with interactive Gantt
        charts and detailed metrics
      </p>
    </header>
  );
};

export default Header;
