import styles from "@/styles/Main.module.css";
import { ChangeEventHandler } from "react";
import { Form, FormControl } from "react-bootstrap";

type Props = {
  handleSearchChange: ChangeEventHandler;
};

const TodoSearch = ({ handleSearchChange }: Props) => {
  return (
    <Form className={styles.search_wrap}>
      <FormControl className={styles.search_input} type="text" placeholder="Search" onChange={handleSearchChange} />
    </Form>
  );
};

export default TodoSearch;
