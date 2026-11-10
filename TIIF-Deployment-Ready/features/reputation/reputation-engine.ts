export function calculateReputation(
  challenges: number,
  posts: number,
  helpfulVotes: number
) {

  return (
    challenges * 2 +
    posts +
    helpfulVotes * 3
  );
}