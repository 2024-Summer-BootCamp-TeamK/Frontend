import React, { useEffect, useRef, useState } from 'react';

interface Props {
  page: any;
  dimensions?: Dimensions;
  updateDimensions: ({ width, height }: Dimensions) => void;
}

export const Page = ({ page, dimensions, updateDimensions }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState((dimensions && dimensions.width) || 0);
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0);

  useEffect(() => {
    const renderPage = async (p: any) => {
      const _page = await p;
      if (_page && typeof _page.getViewport == 'function'){
          const context = canvasRef.current?.getContext('2d');
          const viewport = _page.getViewport({ scale: 1 });

          setWidth(viewport.width);
          setHeight(viewport.height);

          if (context) {
            await _page.render({
              canvasContext: context,
              viewport,
            }).promise;

            const newDimensions = {
              width: viewport.width,
              height: viewport.height,
            };

            updateDimensions(newDimensions as Dimensions);
          }
        } else {
          console.error('Invalid page object', p);
        }
      };

    renderPage(page);
  }, [page, updateDimensions]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
