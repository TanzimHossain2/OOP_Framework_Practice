import chalk from "chalk";

export class Logger {
  constructor() {}

  log(message: string) {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  warn(message: string) {
    console.warn(chalk.yellow(`⚠️  ${message}`));
  }

  error(message: string) {
    console.error(chalk.red(`❌ ${message}`));
  }
}