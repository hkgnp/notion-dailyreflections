import dotenv from "dotenv";
import { getCreighton } from "./get-creighton";
import { getGospel } from "./get-gosptel";
import { createNotionPage } from "./create-notion-page";

dotenv.config();

const main = async () => {
  const creighton = await getCreighton();
  const gospel = await getGospel();

  await createNotionPage(creighton, gospel);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
