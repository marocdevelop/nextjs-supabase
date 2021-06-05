import { useEffect, useState } from 'react';
import Router, { withRouter } from 'next/router'

import ReactPaginate from 'react-paginate';

import { fetchArticles } from '../../lib/article.service';

import Article from '../../models/Article';

import styles from '../../styles/Home.module.css'

const perPage = 2;

const Articles = (props: any) => {
  console.log(`props`, props)
  const [articles, setArticles] = useState(props.articles);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data, count }: any = await fetchArticles(0, perPage - 1);
      setArticles(data);
      setCount(count);
    }
    fetchData()
  }, [])

  // Hanlder Pager Click.
  const handlePageClick = async (pagerData) => {
    let selected = pagerData.selected;

    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = selected + 1;

    props.router.push({
        pathname: currentPath,
        query: currentQuery,
    });

    const start = perPage * selected;
    const end = ((perPage * selected) + perPage) - 1;
    console.log(`start, end`, start, end)

    const { data, count }: any = await fetchArticles(start, end);

    setArticles(data);
    setCount(count);
  };

  const renderListArticles = (props: any) => {
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
          // previousLabel={'previous'}
          // nextLabel={'next'}
          // breakLabel={'...'}
          // breakClassName={'break-me'}
          // pageCount={count / perPage}
          // marginPagesDisplayed={2}
          // pageRangeDisplayed={5}
          // onPageChange={handlePageClick}
          // containerClassName={'pagination'}
          // activeClassName={'active'}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          activeClassName={'active'}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          initialPage={0}
          pageCount={count/perPage} //page count
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
        />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Articles</h1>
      {renderListArticles(props)}
    </div>
  )
}

export async function getServerSideProps({ query: { page = 0 } }) {
  let articles = [];

  const start = Math.ceil(parseInt(page) + perPage);
  const end = (Math.ceil(parseInt(page) + perPage) + 1);
  const { data, count }: any = await fetchArticles(start, end);
  articles = data;
  console.log(`starts, ends`, start, end)

  return {
    props: {
      articles,
      count: count,
      page: parseInt(page),
    },
  };
}

export default withRouter(Articles);
