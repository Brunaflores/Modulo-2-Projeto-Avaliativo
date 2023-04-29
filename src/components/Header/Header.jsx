import React from "react";
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <>
        <div>
          <img src="/logo.png" alt="Logo" />
        </div>
        <div>
          <h1>Lab Receitas</h1>
        </div>
      </>
    </header>
  );
};
