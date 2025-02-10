import { generateID } from "../utilities/generateID";

export const generateUniqueId = async (prefix, checkFunction) => {
  let id = generateID(prefix);
  let exists = await checkFunction(id);

  while (exists) {
    id = generateID(prefix);
    exists = await checkFunction(id);
  }
  return id;
};
