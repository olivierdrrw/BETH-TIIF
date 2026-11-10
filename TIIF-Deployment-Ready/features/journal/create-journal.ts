import {
  JournalRepository,
}
from "./journal-repository";

export async function createJournal(
  data: any
) {

  return JournalRepository.create(
    data
  );
}