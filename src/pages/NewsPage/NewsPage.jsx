import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/news/operations";
import {
  selectNewsResults,
  selectNewsTotalPages,
} from "../../redux/news/selectors";
import Title from "../../components/Shared/Title/Title";
import SearchField from "../../components/Shared/SearchField/SearchField";
import NewsList from "../../components/News/NewsList/NewsList";
import Pagination from "../../components/Shared/Pagination/Pagination";
import styles from "./NewsPage.module.css";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const news = useSelector(selectNewsResults);
  const totalPages = useSelector(selectNewsTotalPages);

  useEffect(() => {
    dispatch(getNews({ keyword, page: currentPage, limit: 6 }));
  }, [dispatch, keyword, currentPage]);

  const handleSearch = (searchValue) => {
    setKeyword(searchValue);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const paginationElement = document.querySelector(".paginationContainer");
    if (paginationElement) {
      paginationElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <Title text="News" />
        <div className={styles.searchContainer}>
          <SearchField onSearch={handleSearch} value={keyword} />
        </div>
      </div>

      <NewsList news={news} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NewsPage;
