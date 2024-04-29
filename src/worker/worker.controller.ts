import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  @Get('get-numbers')
  async getPrimes() {
    const primes = await this.workerService.runWorker();
    return primes;
  }

  @Get('get-numbers-no-workers')
  async getPrimesNoWorkers() {
    const numbers: number[] = [];

    for (let i = 0; i <= 20_000_000; i++) {
      numbers.push(i);
    }

    return 'Done';
  }
}
