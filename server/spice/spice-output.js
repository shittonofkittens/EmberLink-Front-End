export function applyEmotionalReframes(input) {
  if (!input || typeof input !== "string") return input;

  const replacements = [
    // Put your own custom phrases and rewrites here
    { find: /example phrase/gi, replace: "metaphorical or safer equivalent" },
  ];

  let output = input;
  for (const { find, replace } of replacements) {
    output = output.replace(find, replace);
  }

  return output;
}
