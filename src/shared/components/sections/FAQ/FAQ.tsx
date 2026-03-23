import Container from '@/shared/components/ui/Container/Container';
import SectionHeader from '@/shared/components/ui/SectionHeader/SectionHeader';
import Accordion from '@/shared/components/ui/Accordion/Accordion';
import type { Translations } from '@/core/i18n/translations';
import styles from './styles/FAQ.module.css';

interface FAQProps {
  faqT: Translations['sections']['faq'];
}

export default function FAQ({ faqT }: FAQProps) {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <Container narrow>
        <SectionHeader
          eyebrow={faqT.eyebrow}
          title={<span id="faq-heading">{faqT.title}</span>}
          description={faqT.description}
          centered
        />
        <Accordion items={faqT.items} />
      </Container>
    </section>
  );
}
