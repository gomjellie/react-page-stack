import classNames from 'classnames';
import type { FC, ImgHTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { LoadableImgStyled } from './LoadableImage.styled';

export const LoadableImage: FC<
  {
    readonly src: string;
    readonly defaultHeight?: string;
  } & ImgHTMLAttributes<HTMLImageElement>
> = ({ src, defaultHeight, ...props }) => {
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    const _img = new Image();
    _img.src = src;
    _img.onload = () => {
      setImg(src);
    };
  }, [src]);

  return (
    <LoadableImgStyled
      {...props}
      src={img ?? src}
      className={classNames(
        {
          loading: img === null,
        },
        props.className
      )}
      {...(img === null ? { height: defaultHeight } : {})}
    />
  );
};
