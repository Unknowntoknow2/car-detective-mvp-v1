
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useValuationResult } from '@/hooks/useValuationResult';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function OffersPage() {
  const { user } = useAuth();
  const { result, isLoading, error, calculateValuation } = useValuationResult();

  const handleCalculateValuation = async () => {
    try {
      await calculateValuation({
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 50000
      });
    } catch (err) {
      console.error('Error calculating valuation:', err);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dealer Offers</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Get Offers</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div>
                <p>Estimated Value: ${result.estimatedValue?.toLocaleString()}</p>
                <p>Confidence: {result.confidenceScore}%</p>
              </div>
            ) : (
              <div>
                <p>Calculate your vehicle valuation to receive dealer offers.</p>
                <Button onClick={handleCalculateValuation} disabled={isLoading}>
                  {isLoading ? 'Calculating...' : 'Get Valuation'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
