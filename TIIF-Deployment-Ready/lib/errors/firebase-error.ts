import {
  FirebaseError,
} from "firebase/app";

export function getFirebaseError(
  error: unknown
) {

  if (
    error instanceof FirebaseError
  ) {
    return error.message;
  }

  return "Something went wrong.";
}