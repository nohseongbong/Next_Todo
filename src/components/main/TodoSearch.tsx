import styles from "@/styles/Main.module.css";
import { Form, FormControl } from "react-bootstrap";

const TodoSearch = () => {
  return (
    <Form className={styles.search_wrap}>
      <FormControl className={styles.search_input} type="text" placeholder="Search" />
    </Form>
  );
};

export default TodoSearch;
