import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const Conference = dynamic(() => import("../components/Conference"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const fetchToken = async () => {
    const result = await fetch("/api/auth");
    const data = await result.json();

    return data.accessToken;
  };

  useEffect(() => {
    fetchToken().then((accessToken) => {
      setToken(accessToken);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading && <div>loading...</div>}
        {!loading && (
          <Conference oauthToken={token} refreshTokenCallback={fetchToken} />
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
