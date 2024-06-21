import React from 'react'
import { Link } from 'react-router-dom'
import new1 from "../../assets/img/news-1.jpg"
import new2 from "../../assets/img/news-2.jpg"
import new3 from "../../assets/img/news-3.jpg"
import Filters from "./Filters"
const News = () => {
  return (
    <div className="card">
      <Filters/>

      <div className="card-body pb-0">
        <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>

        <div className="news">
          <div className="post-item clearfix">
            <img src={new1} alt="" />
            <h4><Link to="/" className='txt-dec'>Nihil blanditiis at in nihil autem</Link></h4>
            <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
          </div>

          <div className="post-item clearfix">
            <img src={new2} alt="" />
            <h4><Link to="/" className='txt-dec'>Nihil blanditiis at in nihil autem</Link></h4>
            <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
          </div>

          <div className="post-item clearfix">
            <img src={new3} alt="" />
            <h4><Link to="/" className='txt-dec'>Nihil blanditiis at in nihil autem</Link></h4>
            <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default News
