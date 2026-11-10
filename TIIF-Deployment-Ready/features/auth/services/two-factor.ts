import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  multiFactor,
  getMultiFactorResolver,
  type MultiFactorResolver,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase/auth";

let recaptchaVerifier: RecaptchaVerifier | null = null;

function getRecaptcha(containerId: string) {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
  return recaptchaVerifier;
}

/**
 * Step 1 of enrolling a phone number as a second factor: sends an SMS
 * verification code. Returns a verificationId to pass into
 * confirmPhoneEnrollment along with the code the user receives.
 */
export async function startPhoneEnrollment(
  user: User,
  phoneNumber: string,
  recaptchaContainerId: string
) {
  const session = await multiFactor(user).getSession();
  const provider = new PhoneAuthProvider(auth);

  return provider.verifyPhoneNumber(
    { phoneNumber, session },
    getRecaptcha(recaptchaContainerId)
  );
}

/**
 * Step 2: confirms the SMS code and finalizes 2FA enrollment.
 */
export async function confirmPhoneEnrollment(
  user: User,
  verificationId: string,
  code: string,
  displayName = "Phone"
) {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  const assertion = PhoneMultiFactorGenerator.assertion(credential);
  await multiFactor(user).enroll(assertion, displayName);
}

export function isTwoFactorEnabled(user: User | null | undefined) {
  if (!user) return false;
  return multiFactor(user).enrolledFactors.length > 0;
}

/**
 * Called when loginUser() throws auth/multi-factor-auth-required — resolves
 * the pending sign-in and sends an SMS code to the user's enrolled phone.
 */
export async function startTwoFactorChallenge(
  resolver: MultiFactorResolver,
  recaptchaContainerId: string
) {
  const phoneHint = resolver.hints[0];
  const provider = new PhoneAuthProvider(auth);

  const verificationId = await provider.verifyPhoneNumber(
    { multiFactorHint: phoneHint, session: resolver.session },
    getRecaptcha(recaptchaContainerId)
  );

  return verificationId;
}

export async function confirmTwoFactorChallenge(
  resolver: MultiFactorResolver,
  verificationId: string,
  code: string
) {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  const assertion = PhoneMultiFactorGenerator.assertion(credential);
  return resolver.resolveSignIn(assertion);
}

export { getMultiFactorResolver };
export type { MultiFactorResolver };
