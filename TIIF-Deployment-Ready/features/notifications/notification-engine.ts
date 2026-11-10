export function shouldNotify(
  lastJournalDays: number
) {

  return (
    lastJournalDays > 3
  );
}