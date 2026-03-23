import styles from './styles/GameCardSkeleton.module.css';

export default function GameCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true" role="presentation">
      <div className={styles.thumbnail} />
      <div className={styles.body}>
        <div className={`${styles.line} ${styles.lineTitle}`} />
        <div className={`${styles.line} ${styles.lineDesc1}`} />
        <div className={`${styles.line} ${styles.lineDesc2}`} />
        <div className={styles.footer}>
          <div className={styles.linePlatform} />
          <div className={styles.linePlay} />
        </div>
      </div>
    </div>
  );
}
