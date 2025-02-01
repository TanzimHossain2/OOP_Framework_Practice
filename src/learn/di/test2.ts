import 'reflect-metadata';
import { container, inject, injectable, singleton } from 'tsyringe';

interface ILogger {
  log(message: string): void;
}

@singleton()
class ConsoleLogger implements ILogger {
  log(message: string) {
    console.log(`LOG: ${message}`);
  }
}

const LoggerToken = Symbol.for('Logger');
container.register<ILogger>(LoggerToken, {
  useClass: ConsoleLogger,
});

@injectable()
class ReportService {
  constructor(@inject(LoggerToken) private readonly logger: ILogger) {}

  generateReport() {
    this.logger.log('Generating report');

    for (let i = 0; i < 1000000; i++) {
      for (let j = 0; j < 1000; j++) {}
    }

    this.logger.log('Report generated');
  }
}

const reportService = container.resolve(ReportService);

reportService.generateReport();

