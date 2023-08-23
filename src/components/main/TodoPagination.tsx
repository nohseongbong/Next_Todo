import { Pagination } from "react-bootstrap";
import styles from "@/styles/Main.module.css";
import { Dispatch, SetStateAction } from "react";
import { TodoType } from "@/types/todo";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

type PaginationProps = {
  todos: TodoType[];
  current: { currentPage: number; setCurrentPage: Dispatch<SetStateAction<number>> };
};

const TodoPagination = ({ todos, current }: PaginationProps) => {
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    current.setCurrentPage(page);
  };

  return (
    <Pagination className={styles.pagination_wrap}>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(Math.max(1, current.currentPage - 1))} />
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item key={index} active={index + 1 === current.currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, current.currentPage + 1))} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
};

export default TodoPagination;
