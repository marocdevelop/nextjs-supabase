import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'

import { fetchArticles } from '../../lib/article.service';

import Article from '../../models/Article';

import styles from '../../styles/Home.module.css'

const Articles = (props: any) => {
  const perPage = 2;
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [router, setRouter] = useState({ pathname: '', selected: 0 });

  useEffect(() => {
    async function fetchData() {
      const { data, count }: any = await fetchArticles(0, perPage - 1);
      console.log(`data`, data)
      console.log(`count`, count)
      setArticles(data);
      setCount(count);
    }
    fetchData()
  }, [])

  const handlePageClick = async (pagerData) => {
    let selected = pagerData.selected;
    let offset = Math.ceil(selected * perPage);

    const start = perPage * selected;
    const end = ((perPage * selected) + perPage) - 1;

    const { data, count }: any = await fetchArticles(start, end);
    console.log(`data`, data)
    setArticles(data);
    setCount(count);
  };

  const renderListArticles = (props) => {
    return (
      <>
        <ul>
          {articles.map((article: any) => {
            return (
              <li key={article.id}>
                <div className="card-container">
                  <p>
                    <strong>{article.id}</strong>
                  </p>
                  <p>{article.title}</p>
                  <p>{article.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={count / perPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Articles</h1>
      <pre>
        <code>
          {JSON.stringify(articles, null, 2)}
        </code>
      </pre>
      <hr />
      {renderListArticles(props)}
    </div>
  )
}

// export async function getServerSideProps({ query: { page = 0 } }) {
//   let articles = [];
//   const { data, count }: any = await fetchArticles(2, 0);
//   articles = data;

//   console.log(`articles`, articles)

//   return {
//     props: {
//       articles,
//       count: count,
//       page: parseInt(page),
//     },
//   };
// }

export default Articles;
