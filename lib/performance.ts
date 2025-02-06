import { PerformanceObserver, performance } from 'perf_hooks';

interface PerformanceMetrics {
  timeToFirstPaint: number;
  timeToInteractive: number;
  memoryUsage: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    timeToFirstPaint: 0,
    timeToInteractive: 0,
    memoryUsage: 0,
  };

  private constructor() {
    this.setupObserver();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupObserver() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'first-paint':
            this.metrics.timeToFirstPaint = entry.startTime;
            break;
          case 'time-to-interactive':
            this.metrics.timeToInteractive = entry.startTime;
            break;
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'measure'] });
  }

  measureOperation(name: string, operation: () => void) {
    const start = performance.now();
    operation();
    const end = performance.now();
    performance.measure(name, { start, end });
  }

  async measureAsyncOperation(name: string, operation: () => Promise<any>) {
    const start = performance.now();
    await operation();
    const end = performance.now();
    performance.measure(name, { start, end });
  }

  getMetrics(): PerformanceMetrics {
    this.metrics.memoryUsage = performance.memory?.usedJSHeapSize || 0;
    return { ...this.metrics };
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance(); 