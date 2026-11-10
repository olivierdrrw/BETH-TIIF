export const ActivityFeed = () => {
  const activities = [
    "New therapy session completed",
    "AI Companion engaged by 142 users",
    "Wellness score updated",
    "New school joined TIIF platform",
  ];

  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="text-lg font-semibold">Activity Feed</h3>

      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <div key={activity} className="rounded-xl bg-muted/50 p-3 text-sm">
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;