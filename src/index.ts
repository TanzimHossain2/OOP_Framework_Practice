import http from "http";
import app from "./v1/app";
import chalk from "chalk";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(chalk.bgGreen(`Server is running on port ${port}`));
});

server.on("error", (error: Error) => {
  console.error(chalk.bgRed("Server error: "), error);
});
