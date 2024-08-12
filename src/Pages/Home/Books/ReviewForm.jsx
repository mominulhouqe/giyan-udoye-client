import React, { useState } from 'react';
import { Rate, Button, Input } from 'antd';

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        // Handle review submission logic
        console.log({ rating, review });
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold">Write a Review</h3>
            <div className="mt-4">
                <Rate onChange={setRating} value={rating} />
            </div>
            <div className="mt-4">
                <Input.TextArea
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                />
            </div>
            <Button type="primary" className="mt-4" onClick={handleSubmit}>
                Submit Review
            </Button>
        </div>
    );
};

export default ReviewForm;
