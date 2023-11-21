export default function classNameToArray(className: string) {
  if (!className) {
    return [];
  }

  return className.split(" ");
}
