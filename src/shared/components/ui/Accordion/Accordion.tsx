'use client';

import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import styles from './styles/Accordion.module.css';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <ul className={styles.list} role="list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-answer-${item.id}`}
              id={`acc-btn-${item.id}`}
            >
              <span>{item.question}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
              </span>
            </button>
            <div
              id={`acc-answer-${item.id}`}
              role="region"
              aria-labelledby={`acc-btn-${item.id}`}
              className={[styles.answer, isOpen ? styles.answerOpen : ''].join(' ')}
            >
              <p className={styles.answerText}>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
