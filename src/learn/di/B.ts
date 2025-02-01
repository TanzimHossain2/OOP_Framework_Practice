import { delay, inject, injectable } from 'tsyringe';
import { A } from './A';

@injectable()
export class B {
  constructor(
    @inject(delay(() => A))
    private readonly a: A
  ) {
    console.log('B is created');
  }
}
