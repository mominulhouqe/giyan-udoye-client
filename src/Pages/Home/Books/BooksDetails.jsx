import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Rate, Spin, message, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import ReviewForm from './ReviewForm';

const BooksDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Failed to fetch book details", error);
                message.error("Failed to fetch book details");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);
  

    if (loading) {
        return <Spin className="block mx-auto mt-20" />;
    }

    if (!book) {
        return <div className="text-center mt-20">Book not found</div>;
    }

    return (
        <div className="container mx-auto p-6 lg:p-12 bg-white shadow-md rounded-lg">
            {/* Book Cover and Details */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-8">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full lg:w-1/3 rounded-lg shadow-lg mb-6 lg:mb-0"
                />
                <div className="lg:ml-10 text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
                    <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
                    <p className="text-gray-500 mt-4">{book.description}</p>
                    <div className="mt-6 flex items-center justify-center lg:justify-start">
                        <Rate disabled defaultValue={book.averageRating} />
                        <span className="ml-2 text-gray-700">({book.averageRating} / 5)</span>
                    </div>
                    <div className="mt-4">
                        {book.genre && (
                            <Tag color="blue" className="mr-2">
                                {book.genre}
                            </Tag>
                        )}
                        <Tag icon={<ClockCircleOutlined />} color="red">
                            {book.publishedYear}
                        </Tag>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Reviews</h2>
                {/* Placeholder for reviews */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
                </div>
            </div>

            {/* Review Form Section */}
            <div className="mt-12">
            
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    {/* ReviewForm component would be rendered here */}
                    <ReviewForm />
                </div>
            </div>
        </div>
    );
};

export default BooksDetails;
