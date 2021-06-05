import { useEffect, useState } from 'react';
import Router, { withRouter } from 'next/router'
import ReactPaginate from 'react-paginate';

// Import services.
import { fetchArticles } from '../../lib/article.service';
// Import models.
import Article from '../../models/Article';
// Import styles.
import styles from '../../styles/Home.module.css'
// Declar variables.
const perPage = 2;

const Articles = (props: any) => {
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

    // Update current route.
    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });

    const start = perPage * selected;
    const end = ((perPage * selected) + perPage) - 1;
    const { data, count }: any = await fetchArticles(start, end);

    setArticles(data);
    setCount(count);
  };

  // Render list articles.
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
  const currentPage = page;

  // using range.
  const start = currentPage > 1 ? Math.ceil(currentPage * perPage) - perPage : currentPage;
  const end = (start + perPage) - 1;

  // Fecth articles.
  const { data, count }: any = await fetchArticles(start, end);
  articles = data;

  return {
    props: {
      articles,
      count: count,
      page: currentPage,
    },
  };
}

export default withRouter(Articles);
