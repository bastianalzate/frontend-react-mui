import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';

export default function TitlebarBelowImageList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'xl'));
  const itemData = useSelector((state) => state.myFeature.itemData);

  const columns = isSmallScreen
    ? 'repeat(1, 1fr)'
    : isMediumScreen
    ? 'repeat(2, 1fr)'
    : 'repeat(3, 1fr)';

  return (
    <ImageList
      sx={{ width: '100%', height: '100%' }}
      style={{ gridTemplateColumns: columns }}
    >
      {itemData?.map((item) => (
        <ImageListItem key={item.img}>
          <ImageWithSkeleton
            src={`${item.img}?w=800&fit=crop&auto=format`}
            srcSet={`${item.img}?w=800&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function ImageWithSkeleton({ src, srcSet, alt }) {
  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: showSkeleton ? 'none' : 'block',
        }}
        loading="lazy"
      />
      {showSkeleton && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
    </>
  );
}
