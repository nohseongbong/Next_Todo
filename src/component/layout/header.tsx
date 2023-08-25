import styles from "@/styles/Main.module.css";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <Button onClick={() => router.push("/create")} variant="secondary" className="ml-2">
          Create
        </Button>
        <Button onClick={() => router.push("/login")} variant="secondary" className="ml-2">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header;
