import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectNoticesResults,
  selectTotalPages,
} from "../../redux/notices/selectors";
import Title from "../../components/Shared/Title/Title";
import NoticesFilters from "../../components/Notices/NoticesFilters/NoticesFilters";
import NoticesList from "../../components/Notices/NoticesList/NoticesList";
import Pagination from "../../components/Shared/Pagination/Pagination";
import styles from "./NoticesPage.module.css";

const NoticesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const notices = useSelector(selectNoticesResults);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const paginationElement = document.querySelector(".paginationContainer");
    if (paginationElement) {
      paginationElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className={styles.container}>
      <Title text="Find your favorite pet" />

      <NoticesFilters
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <NoticesList notices={notices} />
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

export default NoticesPage;
