
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';
import Image from './Image';

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

interface Props extends BoxProps {
  title: string;
  img?: string;
  description?: string;
}

export default function EmptyContent({ title, description, img, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Image
        disabledEffect
        visibleByDefault
        alt="empty content"
        src={
          img ||
          'https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_content.svg'
        }
        sx={{ height: 200, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom sx={{ textAlign:'center' }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}