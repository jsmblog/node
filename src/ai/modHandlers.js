import { systemprompt } from "./systemprompt.js";
import { userPrompt } from "./userprompt.js";

export const MOD_HANDLERS = {
  searching: {
    system: systemprompt,
    user: userPrompt,
    tokens:500,
  }
};
