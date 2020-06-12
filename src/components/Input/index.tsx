import React, { useState } from 'react';

import styles from './index.module.scss';

interface Props {
  placeholder?: string;
  onNext(value: string): void;
}

export default function Input(props: Props) {
  const [complete, setComplete] = useState(false);
  const [value, setValue] = useState('');

  return (
    <form
      className={styles.container}
      onSubmit={e => {
        e.preventDefault();

        if (value) {
          setComplete(true);
          props.onNext(value);
        }
      }}
    >
      <input
        className={styles.input}
        disabled={complete}
        placeholder={props.placeholder}
        type="text"
        value={value}
        onInput={e => setValue(e.currentTarget.value)}
      />
      {!complete && (
        <button
          className={styles.next}
          type="submit"
          onClick={() => {
            if (value) {
              setComplete(true);
              props.onNext(value);
            }
          }}
        >
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </button>
      )}
    </form>
  );
}
