import React, { Component } from 'react';
import './Newsitems.css'
export default class Newsitem extends Component {


    render() {
        let { title, desc, ImageUrl, NewsUrl, date, author, content ,source} = this.props;
        return (
            <>
                <div className='container my-3'>
                    <div className="card" style={{ width: "18rem" }}>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span>
                        <img title={content} src={ImageUrl} style={{ height: "161px", cursor: 'pointer' }} className="card-img-top" alt={title} />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{desc}</p>
                            <p className="card-text"><small className="text-muted">By <strong>{author}</strong> on {new Date(date).toDateString()} </small></p>
                            <a href={NewsUrl} target='_blank' title={content} className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}
