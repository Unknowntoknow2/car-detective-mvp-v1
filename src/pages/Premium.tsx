
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Premium() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Premium Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Unlock advanced vehicle valuation features with our premium plan.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Detailed market analysis</li>
            <li>Historical pricing trends</li>
            <li>Comprehensive vehicle reports</li>
            <li>Priority support</li>
          </ul>
          <Button className="w-full">Upgrade to Premium</Button>
        </CardContent>
      </Card>
    </div>
  );
}
