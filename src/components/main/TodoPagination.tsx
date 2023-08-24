import { Pagination } from "react-bootstrap";
import styles from "@/styles/Main.module.css";
import { Dispatch, SetStateAction } from "react";
import { TodoType } from "@/types/todo";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

type PaginationProps = {
  todos: TodoType[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const TodoPagination = ({ todos, currentPage, setCurrentPage }: PaginationProps) => {
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination className={styles.pagination_wrap}>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
};

export default TodoPagination;
