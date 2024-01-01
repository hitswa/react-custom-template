import { ReportHandler, Metric } from 'web-vitals';

interface WebVitals {
  getCLS: (onPerfEntry: ReportHandler) => void;
  getFID: (onPerfEntry: ReportHandler) => void;
  getFCP: (onPerfEntry: ReportHandler) => void;
  getLCP: (onPerfEntry: ReportHandler) => void;
  getTTFB: (onPerfEntry: ReportHandler) => void;
}

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }: WebVitals) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
