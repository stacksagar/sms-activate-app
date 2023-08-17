export default function delay(time: number) {
  return new Promise((r) => setTimeout(() => r(1), time));
}
