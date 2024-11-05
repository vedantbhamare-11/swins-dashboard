// ./src/components/RecentReviews.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Review {
  reviewer: string;
  reviewedPerson: string;
  comment: string;
  timeAgo: string;
  type: 'Positive' | 'Negative';
}

interface RecentReviewsProps {
  reviews: Review[]; // Accept reviews as props
}

const RecentReviews: React.FC<RecentReviewsProps> = ({ reviews }) => {
  return (
    <Card className="h-auto p-5 rounded-lg bg-white shadow-md">
      <CardHeader className='p-2'>
        <CardTitle className="text-2xl">Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="flex justify-between items-start p-2 border-b">
              <div className="flex flex-col">
                <span className="font-bold">{review.reviewer} commented on {review.reviewedPerson}</span>
                <p className="text-gray-700">{review.comment}</p>
                <span className="text-sm text-gray-500">{review.timeAgo}</span>
              </div>
              <span className={`rounded w-[100px] h-[40px] flex justify-center items-center  ${review.type === 'Positive' ? 'bg-green-200' : 'bg-red-200'}`}>
                {review.type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReviews;
