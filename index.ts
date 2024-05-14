#! /usr/bin/env node

import { differenceInSeconds } from "date-fns/differenceInSeconds";
import inquirer from "inquirer";
import chalk from "chalk";

// COUNT-DOWN

const userInput = await inquirer.prompt({
  name: "count",
  type: "number",
  message: "Select seconds to count down.",
  validate: (input) => {
    if (isNaN(input)) {
      return "Invalid number";
    } else if (input > 60) {
      return "you can countdown between 1 to 60";
    } else if (input == "") {
      return "you have to fill it";
    } else {
      return true;
    }
  },
});

const answer = userInput.count;

function countDown(num: number) {
  const sec = new Date().setSeconds(new Date().getSeconds() + (num += 2));
  const setTime = new Date(sec);
  setInterval(() => {
    const date = new Date();
    const timeDiff = differenceInSeconds(setTime, date);
    if (timeDiff <= 0) {
      console.log(chalk.italic.bold.grey("\nTime's up."));
      process.exit();
    }
    const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const second = Math.floor(timeDiff % 60);
    console.log(
      chalk.bold.italic.blue(`${minute.toString().padStart(2, "0")}`) +
        chalk.italic.bold.red(":") +
        chalk.bold.italic.green(`${second.toString().padStart(2, "0")}`)
    );
  }, 1000);
}

// invoking function
countDown(answer); 
