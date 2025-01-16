'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Marquee from '@/components/core/marquee';
import Image from 'next/image';

// Function to generate star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 >= 0.5; // Half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Empty stars

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500">★</span>
        ))}
      {halfStar && <span className="text-yellow-500">☆</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">★</span>
        ))}
    </div>
  );
};

const ReviewCard = ({
  name,
  username,
  body,
  rating,
  img,
}: {
  name: string;
  username: string;
  body: string;
  rating: number;
  img?: string; // Optional image URL
}) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
        <div className='flex flex-row items-center gap-2 '>
            {img ? (
                <Image src={img} alt={"User"} className="w-10 h-10 rounded-full" />
            ) : (
                <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full">
                <svg
                    className="w-7 h-7 text-gray-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                    />
                </svg>
                </div>
            )}
            <div className='flex flex-col'>
                <figcaption className='text-sm font-medium dark:text-white'>
                    {name} <StarRating rating={rating} />
                </figcaption>
            {/* <p className='text-xs font-medium dark:text-white/40'>{username}</p> */}
            </div>
        </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
      <div className='mt-2 text-sm flex items-center gap-2'>
        
      </div>
    </figure>
  );
};

const MarqueeDemo = () => {
  const [reviews, setReviews] = useState<
    { name: string; username: string; body: string; rating: number; img?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/auth/review'); // Fetch reviews from your API
        const data = await response.json();

        if (response.ok && data.success) {
          // Map reviews to a structure compatible with the ReviewCard
          const mappedReviews = data.reviews.map((review: any) => ({
            name: review.username || 'Anonymous',
            username: review.username || 'Unknown',
            body: review.reviewText || 'No review text provided.',
            rating: review.rating || 0, // Default rating to 0 if not provided
            img: review.img || '', // Placeholder if no image
          }));
          setReviews(mappedReviews);
        } else {
          console.error(data.message || 'Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <div className='relative flex h-50 w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <>
          <Marquee pauseOnHover className='[--duration:5s]'>
            {firstRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className='[--duration:5s]'>
            {secondRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
        </>
      )}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 from-slate-200 dark:from-background'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 from-slate-200 dark:from-background'></div>
    </div>
  );
};

export default MarqueeDemo;
