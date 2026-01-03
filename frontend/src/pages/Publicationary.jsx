import React, { useState } from 'react';

const Publicationary = () => {
  const [publications, setPublications] = useState([
    {
      id: 1,
      title: 'My Trip to Bali',
      description: 'An amazing journey through Bali\'s temples and beaches',
      author: 'John Doe',
      date: '2024-01-15',
      likes: 42,
      tags: ['Bali', 'Beach', 'Temples'],
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'European Adventure',
      description: 'Backpacking through Europe on a budget',
      author: 'Jane Smith',
      date: '2024-01-10',
      likes: 28,
      tags: ['Europe', 'Budget', 'Backpacking'],
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Japanese Cherry Blossoms',
      description: 'Chasing cherry blossoms in Tokyo and Kyoto',
      author: 'Alex Chen',
      date: '2024-01-05',
      likes: 56,
      tags: ['Japan', 'Cherry Blossoms', 'Spring'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const [newPublication, setNewPublication] = useState({
    title: '',
    description: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPub = {
      id: publications.length + 1,
      title: newPublication.title,
      description: newPublication.description,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      tags: newPublication.tags.split(',').map(tag => tag.trim()),
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    setPublications([newPub, ...publications]);
    setNewPublication({ title: '', description: '', tags: '' });
  };

  const likePublication = (id) => {
    setPublications(publications.map(pub => 
      pub.id === id ? { ...pub, likes: pub.likes + 1 } : pub
    ));
  };

  return (
    <div className="publicationary">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/trips" className="nav-link">My Trips</a>
          <a href="/publicationary" className="nav-link active">Publicationary</a>
          <a href="/profile" className="nav-link">Profile</a>
        </div>
      </nav>

      <div className="container">
        <div className="publicationary-header">
          <h1>📖 Publicationary</h1>
          <p>Share your travel stories and experiences with the community</p>
        </div>

        {/* Create New Publication */}
        <div className="card create-publication">
          <h3>Share Your Story</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title of your travel story"
                value={newPublication.title}
                onChange={(e) => setNewPublication({...newPublication, title: e.target.value})}
                className="form-input"

                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Tell your story..."
                value={newPublication.description}
                onChange={(e) => setNewPublication({...newPublication, description: e.target.value})}
                className="form-input"
                rows="4"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tags (comma separated, e.g., Bali, Beach, Adventure)"
                value={newPublication.tags}
                onChange={(e) => setNewPublication({...newPublication, tags: e.target.value})}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">Publish Story</button>
          </form>
        </div>

        {/* Publications Grid */}
        <div className="publications-grid">
          {publications.map(publication => (
            <div key={publication.id} className="publication-card card">
              <div className="publication-image">
                <img src={publication.image} alt={publication.title} />
              </div>
              <div className="publication-content">
                <div className="publication-header">
                  <h3>{publication.title}</h3>
                  <button 
                    className="like-btn"
                    onClick={() => likePublication(publication.id)}
                  >
                    ❤️ {publication.likes}
                  </button>
                </div>
                <p className="publication-description">{publication.description}</p>
                
                <div className="publication-meta">
                  <span className="author">👤 {publication.author}</span>
                  <span className="date">📅 {publication.date}</span>
                </div>
                
                <div className="publication-tags">
                  {publication.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="publication-actions">
                  <button className="action-btn">💬 Comment</button>
                  <button className="action-btn">🔗 Share</button>
                  <button className="action-btn">📌 Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .publicationary {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 100vw;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px 5vw;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100vw;
          box-sizing: border-box;
        }

        .nav-brand h1 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          margin: 0;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: clamp(10px, 1.5vw, 20px);
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          padding: clamp(8px, 1vw, 10px) clamp(15px, 1.5vw, 20px);
          border-radius: 10px;
          transition: all 0.3s ease;
          font-size: clamp(0.8rem, 1.2vw, 0.95rem);
          white-space: nowrap;
        }

        .nav-link:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 30px 5vw;
          box-sizing: border-box;
        }

        .publicationary-header {
          text-align: center;
          margin-bottom: 40px;
          width: 100%;
        }

        .publicationary-header h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 10px;
          color: white;
          background: linear-gradient(90deg, #FFF, #FFD166);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .publicationary-header p {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .create-publication {
          margin-bottom: 40px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 100%;
          box-sizing: border-box;
        }

        .create-publication h3 {
          margin-bottom: 20px;
          color: #333;
          font-size: clamp(1.2rem, 1.8vw, 1.5rem);
        }

        .form-group {
          margin-bottom: 20px;
          width: 100%;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: clamp(14px, 1.2vw, 16px);
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        textarea.form-input {
          resize: vertical;
          min-height: 120px;
        }

        .btn {
          padding: clamp(12px, 1.5vw, 15px) clamp(20px, 2.5vw, 30px);
          border: none;
          border-radius: 10px;
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .publications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          width: 100%;
        }

        .publication-card {
          transition: transform 0.3s ease;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
        }

        .publication-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
        }

        .publication-image {
          height: 200px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
          width: 100%;
        }

        .publication-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .publication-card:hover .publication-image img {
          transform: scale(1.1);
        }

        .publication-content {
          padding: 25px;
          display: flex;
          flex-direction: column;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .publication-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
          width: 100%;
        }

        .publication-header h3 {
          margin: 0;
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          color: #333;
          flex: 1;
          line-height: 1.4;
        }

        .like-btn {
          background: #ffeef0;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          color: #e74c3c;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
          font-size: clamp(12px, 1vw, 14px);
          flex-shrink: 0;
        }

        .like-btn:hover {
          background: #ffd6da;
          transform: scale(1.1);
        }

        .publication-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          font-size: clamp(14px, 1.2vw, 16px);
        }

        .publication-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          color: #888;
          font-size: clamp(12px, 1vw, 14px);
          width: 100%;
        }

        .author, .date {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .publication-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          width: 100%;
        }

        .tag {
          background: linear-gradient(135deg, #667eea20, #764ba220);
          color: #667eea;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: clamp(11px, 0.9vw, 13px);
          font-weight: 500;
          white-space: nowrap;
        }

        .publication-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          border-top: 1px solid #eee;
          padding-top: 15px;
          width: 100%;
        }

        .action-btn {
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: clamp(12px, 1vw, 14px);
          width: 100%;
          box-sizing: border-box;
        }

        .action-btn:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: #667eea;
          transform: translateY(-2px);
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .container {
            padding-left: 4vw;
            padding-right: 4vw;
          }
          
          .publications-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 1024px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
            padding: 15px 4vw;
          }
          
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .publications-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 3vw;
          }
          
          .create-publication {
            padding: 20px;
            border-radius: 15px;
          }
          
          .publicationary-header h1 {
            font-size: 1.8rem;
          }
          
          .publicationary-header p {
            font-size: 0.9rem;
          }
          
          .publications-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .publication-image {
            height: 180px;
          }
          
          .publication-content {
            padding: 20px;
          }
        }

        @media (max-width: 640px) {
          .navbar {
            padding: 12px 3vw;
          }
          
          .nav-link {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
          
          .container {
            padding: 15px;
          }
          
          .create-publication {
            padding: 15px;
            margin-bottom: 30px;
          }
          
          .form-input {
            padding: 12px;
          }
          
          .btn {
            padding: 12px 20px;
          }
          
          .publication-actions {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .action-btn {
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px;
          }
          
          .publicationary-header {
            margin-bottom: 30px;
          }
          
          
          
          
          .create-publication h3 {
            font-size: 1.2rem;
          }
          
          .publication-header {
            flex-direction: column;
            gap: 10px;
          }
          
          .like-btn {
            align-self: flex-start;
          }
          
          .publication-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .publication-tags {
            gap: 6px;
          }
          
          .tag {
            padding: 4px 10px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .container {
            padding: 10px;
          }
          
          .publicationary-header h1 {
            font-size: 1.4rem;
          }
          
          .create-publication {
            padding: 12px;
          }
          
          .publication-card {
            border-radius: 15px;
          }
          
          .publication-image {
            height: 150px;
          }
          
          .publication-content {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Publicationary;
