import { useEffect, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { getPageNumbers } from "../../../utils/getPageNumbers";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = getPageNumbers(currentPage, totalPages, isMobile);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="Go to first page"
      >
        <svg width="20" height="20">
          <use href={`${sprite}#icon-arrow-left`} />
        </svg>
        <svg width="20" height="20" style={{ marginLeft: "-14px" }}>
          <use href={`${sprite}#icon-arrow-left`} />
        </svg>
      </button>

      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <svg width="20" height="20">
          <use href={`${sprite}#icon-arrow-left`} />
        </svg>
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.activePageButton : ""
            }`}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <svg width="20" height="20">
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      </button>

      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Go to last page"
      >
        <svg width="20" height="20">
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
        <svg width="20" height="20" style={{ marginLeft: "-14px" }}>
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
