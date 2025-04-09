import React from "react";
import { Link } from "react-router-dom";

function Article() {
  const articles = [
    {
      category: "Chia sẻ học",
      title: "Học Việc Siêu Đầu Của Số Hóa Sáng tạo với AI Powered Learning!",
      description: "Trong thời đại số hóa hiện đại, việc học đã bước vào một kỷ nguyên mới nhờ công nghệ AI. Đây là cách mà bạn có thể tận dụng nó để nâng cao kỹ năng của mình.",
      image: "/logo512.png", // Replace with actual image path
      link: "/article/1", // Example link
      author: "Nguyễn Văn A",
      avatar: "https://placehold.co/50x50", // Replace with actual avatar path
      subject: "ReactJS",
    },
    {
      category: "Chia sẻ học",
      title: "Bài viết 2",
      description: "Mô tả bài viết 2.",
      image: "/logo512.png", // Replace with actual image path
      link: "/article/2", // Example link
      author: "Trần Thị B",
      avatar: "https://placehold.co/50x50", // Replace with actual avatar path
      subject: "HTML",
    },
    {
      category: "Chia sẻ học",
      title: "Bài viết 3",
      description: "Mô tả bài viết 3.",
      image: "/path/to/image3.jpg", // Replace with actual image path
      link: "/article/3", // Example link
      author: "Lê Văn C",
      avatar: "https://placehold.co/50x50", // Replace with actual avatar path
      subject: "Java",
    },
  ];

  return (
    <div className="flex-1 p-8">
      {/* Featured Posts */}
      <section className="featured-articles">
        <h2 className="text-2xl font-bold mb-4">Bài viết nổi bật</h2>
        <p className="text-gray-600 mb-6">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p>
        <div className="articles-grid">
          {articles.map((article, index) => (
            <div className="article-card" key={index}>
              <div className="article-header">
                <img src={article.avatar} alt={article.author} className="article-avatar" />
                <div className="article-author">{article.author}</div>
                <i className="fas fa-ellipsis-h article-ellipsis"></i>
              </div>
              <div className="article-content">
                <span className="article-category">{article.category}</span>
                <h3 className="article-title">
                  <Link to={article.link}>{article.title}</Link>
                </h3>
                <p className="article-description">{article.description}</p>
                <div className="article-subject">{article.subject}</div>
              </div>
              <img src={article.image} alt={article.title} className="article-image" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Article;