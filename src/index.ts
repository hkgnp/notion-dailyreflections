import { getCreighton } from "./get-creighton";
import { getGospel } from "./get-gosptel";
import { createNotionPage } from "./create-notion-page";
import dotenv from "dotenv";
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
    try {
      console.log(`Executing script at ${new Date().toLocaleString()}`);
      await main();
      console.log("Reflection successfully sent to Notion");
    } catch (error) {
      console.error(error);
      console.log("Error executing script");
    }
  },
  null,
  true,
  "Asia/Singapore",
);

// The below is for testing purposes
// main()
//   .then(() => process.exit(0))
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

console.log("Container running");
