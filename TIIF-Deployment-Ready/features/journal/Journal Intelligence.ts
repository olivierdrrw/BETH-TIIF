export function calculateJournalConsistency(

  entriesPerWeek: number

) {

  return Math.min(

    100,

    entriesPerWeek * 15

  );
}