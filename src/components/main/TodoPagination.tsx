import { Pagination } from "react-bootstrap";
import styles from "@/styles/Main.module.css";

type PaginationProps = {
  total: number;
};

const TodoPagination = ({ total }: PaginationProps) => {
  return (
    <Pagination className={styles.pagination_wrap}>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{total}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default TodoPagination;
