import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  body: string;
}

export function InsightCard({ title, body }: InsightCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 leading-6">{body}</p>
      </CardContent>
    </Card>
  );
}
