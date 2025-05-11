const whitelist = ["test@gmail.com"];

export default function checkIsWhitelist(email: string | undefined) {
  if (!email) return false;
  return whitelist.includes(email);
}
