export function PredictionsCard() {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-lg font-semibold">
          AI Predictions
        </h3>
  
        <div className="mt-4 space-y-4">
  
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="font-medium">
              Burnout Risk
            </p>
  
            <p className="text-sm text-muted-foreground">
              Predicted increase of 7% next month.
            </p>
          </div>
  
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="font-medium">
              School Wellness
            </p>
  
            <p className="text-sm text-muted-foreground">
              Expected improvement in student engagement.
            </p>
          </div>
  
        </div>
      </div>
    );
  }