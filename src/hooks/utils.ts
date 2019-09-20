let uid = 0;
export function getUid() {
  return (uid = uid + (1 % (Number.MAX_SAFE_INTEGER - 1)));
}
