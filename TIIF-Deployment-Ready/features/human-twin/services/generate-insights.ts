export function generateInsights(
  twin: any
) {

  const insights = [];

  if (
    twin.identityScore < 50
  ) {

    insights.push(

      "Spend time clarifying your values and purpose."

    );

  }

  if (
    twin.wellbeingScore < 50
  ) {

    insights.push(

      "Prioritize rest and emotional recovery."

    );

  }

  if (
    twin.goalsProgress < 40
  ) {

    insights.push(

      "Break goals into smaller milestones."

    );

  }

  return insights;
}