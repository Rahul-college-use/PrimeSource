import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        pageSize: 6,
        category: "general",
        country: "in"
    };

    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        category: PropTypes.string,
        country: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            apiKey: this.props.api //"afad08a1625b455d86ed5b1008dc6bde"
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Prime Source News`;
    }

    capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    };

    componentDidMount() {
        this.fetchArticles(this.state.page);
    }

    fetchArticles = async (page) => {
        this.setState({ loading: true });
        const { category, country, pageSize } = this.props;
        const { apiKey } = this.state;

        const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        try {
            this.props.setProgress(20);
            const response = await fetch(url);
            this.props.setProgress(50);
            const data = await response.json();
            this.props.setProgress(80);
            
            if (data && Array.isArray(data.articles)) {
                this.setState(prevState => ({
                    articles: page === 1 ? data.articles : [...prevState.articles, ...data.articles],
                    totalResults: data.totalResults || 0,
                    loading: false,
                    page: page
                }));
                this.props.setProgress(90);
                console.log(url)
                this.props.setProgress(100);
            } else {
                console.error("Invalid data format from API:", data);
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("API fetch error:", error);
            this.setState({ loading: false });
        }
    };

    fetchMore = () => {
        this.fetchArticles(this.state.page + 1);
    };

    render() {
        const { articles, loading, totalResults, page } = this.state;
        const maxPage = Math.ceil(totalResults / this.props.pageSize);
        const hasMore = page < maxPage;

        return (
            <div className="container my-4">
                <h2 className="text-center mb-4">
                    HeadLine - <strong style={{ color: "gray" }}>{this.capitalizeFirstLetter(this.props.category)}</strong> - PrimeSource News
                </h2>

                {loading && articles.length === 0 && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchMore}
                    hasMore={hasMore}
                    loader={hasMore ? <Spinner />: null}
                    endMessage={
                        !hasMore && (
                            <p className="text-center mt-4 text-muted">
                                <b>Yay! You have seen it all. <i className="ri-check-double-line"></i></b>
                            </p>
                        )
                    }
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((ele) => (
                                <div className="col-md-4" key={ele.url}>
                                    <Newsitem
                                        title={ele.title ? ele.title.slice(0, 30) + "..." : ''}
                                        desc={ele.description ? ele.description.slice(0, 89) + "..." : ''}
                                        ImageUrl={ele.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                                        NewsUrl={ele.url}
                                        date={ele.publishedAt}
                                        author={!ele.author ? "Unknown" : ele.author}
                                        content={!ele.content ? "" : ele.content.slice(0, 200) + "..."}
                                        source={ele.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }

}
