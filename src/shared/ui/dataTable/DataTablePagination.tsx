import { useMemo } from 'react';
import Icon from '../icon/Icon';
import styles from './dataTable.module.scss';

type DataTablePaginationProps = {
  pageIndex: number;
  totalPages: number;
  onChangePage: (pageNumber: number) => void;
};

const DataTablePagination = ({
  pageIndex,
  totalPages,
  onChangePage,
}: DataTablePaginationProps) => {
  const countPerPage = 10;

  const paginationRange = useMemo(() => {
    let resultRange = Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );

    if (totalPages <= countPerPage) {
      return resultRange;
    }

    if (pageIndex <= countPerPage) {
      const startPage = Math.trunc(pageIndex / countPerPage);
      resultRange = resultRange.slice(
        startPage * countPerPage,
        (startPage + 1) * countPerPage,
      );
      return resultRange;
    }

    if (pageIndex > countPerPage) {
      let prevPages = Math.floor(pageIndex / countPerPage);

      if (pageIndex % countPerPage === 0) {
        prevPages -= 1;
      }

      resultRange = resultRange.slice(
        countPerPage * prevPages,
        countPerPage * (prevPages + 1),
      );

      return resultRange;
    }

    return resultRange;
  }, [pageIndex, totalPages]);

  const handleChangePageNumber = (pageNumber: number) => {
    onChangePage(pageNumber - 1);
  };

  const handleChangePageArrow = (type: 'prev' | 'next' | 'first' | 'last') => {
    let targetPageNumber = 0;
    switch (type) {
      case 'prev':
        targetPageNumber = pageIndex - 1;
        break;
      case 'next':
        targetPageNumber = pageIndex + 1;
        break;
      case 'first':
        targetPageNumber = 0;
        break;
      case 'last':
        targetPageNumber = totalPages - 1;
        break;
    }

    onChangePage(targetPageNumber);
  };

  return (
    <div className={styles.pageContainer}>
      <button
        className={styles.pageButton}
        onClick={() => handleChangePageArrow('first')}
        disabled={pageIndex === 0}
      >
        <span>
          <Icon name="arrowBack" width="24px" height="43px" />
        </span>
      </button>
      <button
        className={styles.pageButton}
        onClick={() => handleChangePageArrow('prev')}
        disabled={pageIndex === 0}
      >
        <span>
          <Icon name="arrowBack" width="24px" height="43px" />
        </span>
      </button>
      {paginationRange?.map((number) => (
        <button
          className={`${styles.pageButton} ${number === pageIndex + 1 ? styles.active : ''}`}
          key={number}
          onClick={() => handleChangePageNumber(number)}
          disabled={number === pageIndex + 1}
        >
          <span>{number}</span>
        </button>
      ))}
      <button
        className={styles.pageButton}
        onClick={() => handleChangePageArrow('next')}
        disabled={pageIndex === totalPages - 1}
      >
        <span>
          <Icon name="arrowBack" width="24px" height="43px" />
        </span>
      </button>
      <button
        className={styles.pageButton}
        onClick={() => handleChangePageArrow('last')}
        disabled={pageIndex === totalPages - 1}
      >
        <span>
          <Icon name="arrowBack" width="24px" height="43px" />
        </span>
      </button>
    </div>
  );
};

export default DataTablePagination;
