import 'reflect-metadata';
import { container, inject, injectable } from 'tsyringe';

@injectable()
class ApiService {
  constructor(@inject('Config') private config: { apiUrl: string }) {}

  fetchData() {
    console.log(`Fetching data from ${this.config.apiUrl}`);
  }
}

const config = { apiUrl: 'https://api.example.com' };
container.register('Config', { useValue: config });

container.register('Config', { useValue: { apiUrl: 'x.com/_tanzim_hossain' } });

const apiService = container.resolve(ApiService);
apiService.fetchData();
