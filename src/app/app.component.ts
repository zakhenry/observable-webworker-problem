import { Component } from '@angular/core';
import { fromWorker } from 'observable-webworker';
import { Observable, of } from 'rxjs';

const nonObservableWorker = new Worker('./non-observable.worker', {
  name: 'non-observable-worker',
  type: 'module'
});

@Component({
  selector: 'app-root',
  template: `
    <h1>Non-observable worker: {{ nonObs }}</h1>
    <h1>Observable worker: {{ obs$ | async }}</h1>
  `,
})
export class AppComponent {
  nonObs: string;
  obs$: Observable<string>;

  constructor() {
    // "Normal" Angular 8 Web Worker
    nonObservableWorker.postMessage('Hello from main thread');
    nonObservableWorker.addEventListener('message', message => {
      this.nonObs = message.data;
    });

    // observable-webworker
    const input$ = of('Hello from main thread');
    this.obs$ = fromWorker<string, string>(() => new Worker('./observable.worker', { type: 'module' }), input$);
  }
}
