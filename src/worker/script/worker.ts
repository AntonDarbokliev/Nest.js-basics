import { workerData, parentPort } from 'worker_threads';

const numbers: number[] = [];

for (let i = 0; i <= 20_000_000 / workerData.thread_count; i++) {
  numbers.push(i);
}

parentPort.postMessage('Done');
