'use client';
import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.info('[web-vitals]', metric.name, Math.round(metric.value));
  }
  try {
    navigator.sendBeacon?.('/api/vitals', JSON.stringify(metric));
  } catch {}
}

export default function VitalsClient() {
  useEffect(() => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);
  return null;
}
