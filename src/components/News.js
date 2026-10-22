import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: sampleArticles,
      loading: false,
      page: 1,
      totalResults: sampleArticles.length
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9682d40aaa4349b39cff7d073e350fd6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    try {
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);

      if (parsedData.status === "ok" && parsedData.articles && parsedData.articles.length > 0) {
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults || parsedData.articles.length,
          loading: false
        });
      }
    } catch (error) {
      console.log("Vercel HTTPS limitation reached, showing default articles");
    }

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ page: 1, articles: sampleArticles }, async () => {
        await this.updateNews();
      });
    }
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9682d40aaa4349b39cff7d073e350fd6&page=${nextPage}&pageSize=${this.props.pageSize}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      
      if (parsedData.status === "ok" && parsedData.articles && parsedData.articles.length > 0) {
        this.setState({
          page: nextPage,
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults || this.state.articles.length
        });
      }
    } catch (error) {
      console.log("Error loading more data");
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px', color: this.props.mode === 'dark' ? 'white' : 'black' }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={element.url || index}>
                    <NewsItem 
                      title={element.title ? element.title.slice(0, 45) : ""} 
                      description={element.description ? element.description.slice(0, 88) : ""} 
                      imageUrl={element.urlToImage} 
                      newsUrl={element.url} 
                      author={element.author} 
                      date={element.publishedAt} 
                      source={element.source ? element.source.name : ""} 
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}