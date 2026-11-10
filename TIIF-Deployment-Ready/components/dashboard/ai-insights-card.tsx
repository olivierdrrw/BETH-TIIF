export function AIInsightsCard() {
    const insights = [
      "Wellness score increased by 12% this week",
      "Student engagement improved in 8 schools",
      "AI Companion usage grew by 18%",
      "Risk alerts decreased in Kigali region",
    ];
  
    return (
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-lg font-semibold">
          AI Insights
        </h3>
  
        <div className="mt-4 space-y-3">
          {insights.map((insight) => (
            <div
              key={insight}
              className="rounded-xl bg-muted/50 p-3 text-sm"
            >
              {insight}
            </div>
          ))}
        </div>
      </div>
    );
  }