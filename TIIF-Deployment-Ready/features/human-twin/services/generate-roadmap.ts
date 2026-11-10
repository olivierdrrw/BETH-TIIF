export function generateRoadmap(
  twin: any
) {

  const roadmap = [];

  if (
    twin.identityScore < 60
  ) {

    roadmap.push(

      "Complete Values Assessment"

    );

  }

  if (
    twin.wellbeingScore < 60
  ) {

    roadmap.push(

      "Track Mood Daily"

    );

  }

  if (
    twin.goalsProgress < 50
  ) {

    roadmap.push(

      "Break Goals Into Milestones"

    );

  }

  return roadmap;
}