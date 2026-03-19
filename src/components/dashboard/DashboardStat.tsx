import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
}

export function DashboardStat({ title, value, icon: Icon, change }: DashboardStatProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-semibold mt-2 text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-2">{change}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
