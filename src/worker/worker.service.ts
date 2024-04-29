import { Injectable } from '@nestjs/common';
import {} from './script/worker';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

@Injectable()
export class WorkerService {
  createWorker() {
    return new Promise((resolve, reject) => {
      const worker = new Worker(`${__dirname}/script/worker`, {
        workerData: { thread_count: 1 },
      });

      worker.on('message', (data: number[]) => resolve(data));
      worker.on('error', (error) => reject(error));
      worker.on('exit', (code) => {
        if (code != 0) reject(new Error(`worker exited with code ${code}`));
      });
    });
  }

  async runWorker() {
    const workerPromises: Promise<unknown>[] = [];

    for (let i = 0; i < cpus().length; i++) {
      workerPromises.push(this.createWorker());
    }

    const results = await Promise.all(workerPromises);
    return results;
  }
}
