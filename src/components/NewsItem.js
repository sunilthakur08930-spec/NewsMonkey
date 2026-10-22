import React, { Component } from 'react'

const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span className="badge rounded-pill bg-danger">
              {source}
            </span>

          </div>
          <img
            src={imageUrl || fallbackImage}
            className="card-img-top"
            alt={title || "News article"}
            style={{ height: "200px", objectFit: "cover" }}
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied) {
                event.currentTarget.src = '/news-placeholder.svg';
                return;
              }
              event.currentTarget.dataset.fallbackApplied = 'true';
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-success">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
