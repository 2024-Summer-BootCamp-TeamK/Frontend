import React, { useEffect, useRef, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  page: any;
  dimensions?: Dimensions;
  updateDimensions: ({ width, height }: Dimensions) => void;
}

export const Page = ({ page, dimensions, updateDimensions }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState((dimensions && dimensions.width) || 0);
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0);
  const renderTaskRef = useRef<any>(null); // Render task 상태 추가

  useEffect(() => {
    const renderPage = async (p: any) => {
      const _page = await p;
      if (_page && typeof _page.getViewport === 'function') {
        const context = canvasRef.current?.getContext('2d');
        const viewport = _page.getViewport({ scale: 1 });

        setWidth(viewport.width);
        setHeight(viewport.height);

        if (context) {
          // 이전 renderTask가 있다면 취소
          if (renderTaskRef.current) {
            renderTaskRef.current.cancel();
          }

          const task = _page.render({
            canvasContext: context,
            viewport,
          });

          renderTaskRef.current = task;

          try {
            await task.promise;

            const newDimensions = {
              width: viewport.width,
              height: viewport.height,
            };

            updateDimensions(newDimensions as Dimensions);
          } catch (error) {
            if (error.name !== 'RenderingCancelledException') {
              console.error('Render task failed', error);
            }
          }
        }
      } else {
        console.error('Invalid page object', p);
      }
    };

    renderPage(page);

    // 컴포넌트 언마운트 시 renderTask 취소
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [page, updateDimensions]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
