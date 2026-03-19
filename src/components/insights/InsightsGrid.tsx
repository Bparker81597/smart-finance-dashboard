import { InsightCard } from "./InsightCard";

const insights = [
  {
    title: "Spending Trend",
    body: "Your spending is down 2.1% compared to last month, which suggests better cost control across recurring categories.",
  },
  {
    title: "Dining Alert",
    body: "You are at 97% of your dining budget. Consider shifting one or two purchases into groceries before month-end.",
  },
  {
    title: "Savings Opportunity",
    body: "Based on current income and expense patterns, you could auto-transfer $300 into savings without exceeding your current budget.",
  },
  {
    title: "Architecture Talking Point",
    body: "This project uses a service layer and a custom hook to separate UI rendering from transaction logic.",
  },
  {
    title: "Product Thinking",
    body: "The interface is designed around trust, readability, and quick scanning — all important in fintech products.",
  },
  {
    title: "Next Technical Step",
    body: "Replace local storage with Firebase or a REST API and add auth-protected routes.",
  },
];

export function InsightsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {insights.map((insight) => (
        <InsightCard key={insight.title} title={insight.title} body={insight.body} />
      ))}
    </div>
  );
}
