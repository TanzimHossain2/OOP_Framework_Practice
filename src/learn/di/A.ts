import { delay, inject, injectable } from 'tsyringe';
import { B } from './B';

@injectable()
export class A {
  constructor(
    @inject(delay(() => B))
    private readonly b: B
  ) {
    console.log('A is created');
  }
}
