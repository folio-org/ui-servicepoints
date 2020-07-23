const error = console.error;
const blacklist = [
  /Warning: Encountered two children with the same key/,
  /Warning: Each child in a list should have a unique "key" prop/,
];

export default function turnOffErrors() {
  console.error = function (...args) {
    if (blacklist.some(rx => rx.test(args[0]))) {
      return;
    }
    error.apply(console, args);
  };
}
