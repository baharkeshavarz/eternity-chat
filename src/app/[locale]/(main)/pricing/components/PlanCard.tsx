'use client';

import {
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { FC } from 'react';
import { FeatureItem, plans } from './PaymentPlansData';

interface IPlanCard {
  planFormat: string;
  card: {
    price: string;
    duration: string;
    title: string;
    planType: string;
    subTilte: string;
    features?: FeatureItem[];
    moreDetails: string;
    buttonTilte: string;
  };
  onClick?: VoidFunction;
}

const PlanCard: FC<IPlanCard> = ({ card, planFormat, onClick }) => {
  const {
    price,
    title,
    planType,
    duration,
    subTilte,
    features,
    moreDetails,
    buttonTilte,
  } = card;
  return (
    <Card
      sx={{
        borderRadius: 1,
        padding: 3,
        mx: 'auto',
        backgroundColor: '#fff',
      }}
    >
      <CardContent sx={{ minHeight: 420, position: 'relative' }}>
        <Typography fontSize="48px" fontWeight="bold">
          {price}
          {duration && (
            <Typography
              variant="body2"
              fontWeight="bold"
              component="span"
              color="#8D8D8D"
            >
              {duration}
            </Typography>
          )}
        </Typography>

        <Typography variant="h3" mt={3} mb={1}>
          {title}
          <Typography variant="h5" component="span">
            {planType}
          </Typography>
        </Typography>

        <List>
          {features &&
            features?.map((feature, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.text}
                  slotProps={{
                    primary: {
                      variant: 'body2',
                      fontWeight: 400,
                    },
                  }}
                />
              </ListItem>
            ))}
        </List>

        <Typography variant="button" color="text.secondary" mt={2}>
          {moreDetails}
        </Typography>

        <Box position="absolute" bottom={0} right={0} width="100%">
          <Button
            fullWidth
            variant={planFormat === plans[0] ? 'outlined' : 'contained'}
            size="large"
            onClick={() => onClick?.()}
            sx={{
              mt: 3,
              borderRadius: 10,
              fontWeight: 700,
              textTransform: 'none',
              color: planFormat === plans[0] ? '#000' : '#fff',
              borderColor:
                planFormat === plans[0]
                  ? '#979DA5'
                  : (theme) => theme.palette.primary.main,
              backgroundColor:
                planFormat === plans[0]
                  ? '#fff'
                  : (theme) => theme.palette.primary.main,
            }}
          >
            {buttonTilte}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
