export function
maskEmail(
  email: string
) {
  const [
    username,
    domain,
  ] =
    email.split("@");

  return `${username.slice(
    0,
    2
  )}****@${domain}`;
}