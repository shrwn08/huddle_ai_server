import User from "../models/user.models.js";

export const normalizeUsername = (value = "") =>
  value.toLowerCase().trim().replace(/^@+/, "");

const randomDigits = (length) =>
  Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");

/*create usernames 
    use of "set" so there will be no  dublicates
*/
const buildCandidates = (base) => {
  const candidates = new Set();
  while (candidates.size < 10) {
    candidates.add(`${base}${randomDigits(2)}`);
    candidates.add(`${base}${randomDigits(3)}`);
    candidates.add(`${base}${randomDigits(4)}`);
    candidates.add(`${base}_${new Date().getFullYear()}`);
  }
  return [...candidates];
};

export const generateUsernameSuggestion = async (username, count = 3) => {
  const base = normalizeUsername(username).replace(/^a-z0-9_/g, "");

  const suggestions = [];

  for (let attemp = 0; attemp < 3 && suggestions.length; attemp++) {
    //base is username
    const candidates = buildCandidates(base);
    const taken = await User.find({ username: { $in: candidates } }).select(
      "username",
    );

    const takenSet = new Set(taken.map((u) => u.username));

    for (const candidate of candidates) {
      if (!takenSet.has(candidate) && !suggestions.includes(candidate)) {
        suggestions.push(candidate);
      }
      if (suggestions.length === count) break;
    }
  }

  return suggestions.map((s)=>s);
};
