import React from 'react';
import { Card } from 'antd';
import { motion } from 'framer-motion';

const articles = [
  { title: 'Understanding Fiqh', description: 'An in-depth guide to Fiqh studies.', link: '#' },
  { title: 'The Life of Prophet Muhammad (PBUH)', description: 'A look at the Seerah.', link: '#' },
  { title: 'How to Memorize the Quran', description: 'Tips and techniques for Hifz.', link: '#' },
];

const BlogSection = () => {
  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Recent Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex justify-center"
          >
            <Card
              title={article.title}
              hoverable
              className="w-full shadow-lg"
              extra={<a href={article.link}>Read More</a>}
            >
              <p>{article.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
