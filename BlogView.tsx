/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export default function BlogView() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Security', 'Finance'];

  const filteredPosts = BLOG_POSTS.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="blog-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* SECTION A: DETAILED ARTICLE VIEW */}
      {selectedPost ? (
        <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          
          {/* Back button */}
          <button
            id="blog-back-btn"
            onClick={handleBackToList}
            className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Insights Blog</span>
          </button>

          {/* Featured Image */}
          <div className="relative rounded-3xl overflow-hidden h-64 md:h-96 shadow-lg border border-slate-100">
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              {selectedPost.category}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-4">
            <span className="flex items-center space-x-1">
              <User className="h-3.5 w-3.5 text-blue-500" />
              <span>By {selectedPost.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{selectedPost.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{selectedPost.readTime}</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 leading-tight">
            {selectedPost.title}
          </h1>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => {
              // Simple parser for subheaders in content
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display font-bold text-xl text-slate-950 pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-display font-semibold text-base text-slate-900 pt-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('- ')) {
                // List parsing
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-2 text-slate-600">
                    {paragraph.split('\n').map((li, lIdx) => (
                      <li key={lIdx}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="font-sans">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom Card Banner */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <p className="font-semibold text-slate-900 text-sm">Need to convert statements right now?</p>
              <p className="text-xs text-slate-500">Fast, secure file conversions are always available.</p>
            </div>
            <button
              id="article-bottom-cta-btn"
              onClick={handleBackToList} // In real app, links to converter
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition shadow-xs"
            >
              Convert Statement Now
            </button>
          </div>

        </article>
      ) : (
        /* SECTION B: BLOG GRID VIEW */
        <div className="space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">StatementAI Insights</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Accounting, Automation & Security
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Explore professional advice, CPA audits, tax preparation automation, and bank statement conversion guides.
            </p>
          </div>

          {/* Categories Tab selector */}
          <div className="flex justify-center space-x-2 border-b border-slate-100 pb-2">
            {categories.map((cat) => (
              <button
                id={`blog-cat-tab-${cat.toLowerCase()}`}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden border border-slate-150 hover:shadow-xl hover:border-blue-200 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase font-mono tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-display font-semibold text-lg text-slate-900 leading-snug hover:text-blue-600 transition">
                      {post.title}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    id={`blog-read-more-${post.id}`}
                    onClick={() => handleReadPost(post)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read full article</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
