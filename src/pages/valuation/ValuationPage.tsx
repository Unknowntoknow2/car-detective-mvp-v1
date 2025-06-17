
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ValuationPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Valuation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Get an accurate valuation for your vehicle using our AI-powered platform.</p>
        </CardContent>
      </Card>
    </div>
  );
}
