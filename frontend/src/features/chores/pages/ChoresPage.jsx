import { CheckCircle, Clock, Plus } from "lucide-react";
import { Badge, Button, Card } from "../../../components/ui";

function Chores() {
  const chores = [
    { title: "Kitchen Cleaning", person: "Aisha", due: "Today", done: false },
    { title: "Take Trash Out", person: "Marcus", due: "Completed", done: true },
    { title: "Vacuum Living Room", person: "Julian", due: "Tomorrow", done: false },
  ];

  return (
    <div className="min-h-screen bg-hive-canvas p-5 sm:p-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-hive-ink sm:text-5xl">House Chores</h1>
          <p className="mt-3 text-hive-muted">Keep your Hive clean and organized.</p>
        </div>
        <Button size="lg" className="self-start sm:self-auto"><Plus />Add Chore</Button>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {chores.map((item) => (
          <Card key={item.title} interactive className="p-7">
            <div className="flex justify-between gap-4">
              <h2 className="text-xl font-bold text-hive-ink">{item.title}</h2>
              {item.done ? <CheckCircle className="shrink-0 text-hive-sage" /> : <Clock className="shrink-0 text-hive-terracotta" />}
            </div>
            <p className="mt-6 text-sm text-hive-muted">Assigned to</p>
            <h3 className="mt-1 text-lg font-bold text-hive-ink">{item.person}</h3>
            <Badge className="mt-6" variant={item.done ? "success" : "warning"}>{item.done ? "Completed" : item.due}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Chores;
