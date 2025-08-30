export default async function (text, context) {
  const lowered = text.toLowerCase();

  // Basic spice tagging by key phrases
  if (/on my knees|i belong to you|take control/i.test(lowered)) {
    context.spice = 3;
  } else if (/touch me|make me feel|i want you/i.test(lowered)) {
    context.spice = 2;
  } else if (/kiss me|closer|stay with me/i.test(lowered)) {
    context.spice = 1;
  } else {
    context.spice = 0;
  }

  return text;
}
