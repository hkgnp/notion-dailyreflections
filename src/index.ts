import dotenv from "dotenv";
import { getCreighton } from "./get-creighton";
import { getGospel } from "./get-gosptel";
import { createNotionPage } from "./create-notion-page";
import { CronJob } from "cron";

dotenv.config();

const main = async () => {
  const creighton = await getCreighton();
  const gospel = await getGospel();
  await createNotionPage(creighton, gospel);
};

new CronJob(
  "0 6 * * *",
  async function () {
    await main();
  },
  null,
  true,
  "Asia/Singapore",
);
