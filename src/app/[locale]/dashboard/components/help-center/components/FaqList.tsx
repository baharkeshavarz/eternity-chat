'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

// TODO: make this data to be multi language
interface IFAQ {
  question: string;
  answer: string;
}

const faqData: IFAQ[] = [
  {
    question: 'List of common queries and solutions.',
    answer:
      'List of common queries and solutions. List of common queries and solutions.',
  },
  {
    question: 'List of common queries and solutions.',
    answer:
      'List of common queries and solutions. List of common queries and solutions.List of common queries and solutions. List of common queries and solutions.List of common queries and solutions. List of common queries and solutions.List of common queries and solutions. List of common queries and solutions.List of common queries and solutions. List of common queries and solutions.',
  },
  {
    question: 'List of common queries and solutions.',
    answer:
      'List of common queries and solutions. List of common queries and solutions.',
  },
];

const FaqList = () => {
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);

  const handleChange =
    (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedIndex(isExpanded ? index : false);
    };
  const typoClass = `latoStyleRegular-${locale}`;

  return (
    <>
      <Stack spacing={1}>
        {faqData.map((faq, index: number) => (
          <Accordion
            key={index}
            expanded={expandedIndex === index}
            onChange={handleChange(index)}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="subtitle1" className={typoClass}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" className={typoClass}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </>
  );
};

export default FaqList;
