import { readAsArrayBuffer } from './asyncReader';
import { getAsset } from './prepareAssets';
import { normalize } from './helpers';

export async function save(pdfFile, objects, name) {
  const PDFLib = await getAsset('PDFLib');
  const download = await getAsset('download');
  let pdfDoc;

  try {
    if (!(pdfFile instanceof Blob)) {
      throw new Error('The provided pdfFile is not a Blob');
    }
    pdfDoc = await PDFLib.PDFDocument.load(await readAsArrayBuffer(pdfFile));
  } catch (e) {
    console.log('Failed to load PDF.');
    throw e;
  }

  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === 'image') {
        const { file, x, y, width, height } = object;
        let img;
        try {
          if (!(file instanceof Blob)) {
            throw new Error('The provided file is not a Blob');
          }
          if (file.type === 'image/jpeg') {
            img = await pdfDoc.embedJpg(await readAsArrayBuffer(file));
          } else {
            img = await pdfDoc.embedPng(await readAsArrayBuffer(file));
          }
          return () =>
            page.drawImage(img, {
              x,
              y: pageHeight - y - height,
              width,
              height,
            });
        } catch (e) {
          console.log('Failed to embed image.', e);
          throw e;
        }
      } else if (object.type === 'text') {
        const { x, y, text, lineHeight, size, fontFamily, width } = object;
        const pdfFont = await pdfDoc.embedFont(fontFamily);
        return () =>
          page.drawText(text, {
            maxWidth: width,
            font: pdfFont,
            size,
            lineHeight,
            x,
            y: pageHeight - size! - y,
          });
      } else if (object.type === 'drawing') {
        const { x, y, path, stroke, strokeWidth, scaleX, scaleY } = object;
        const {
          pushGraphicsState,
          setLineCap,
          popGraphicsState,
          setLineJoin,
          LineCapStyle,
          LineJoinStyle,
          rgb,
        } = PDFLib;
        return () => {
          page.pushOperators(
            pushGraphicsState(),
            setLineCap(LineCapStyle.Round),
            setLineJoin(LineJoinStyle.Round)
          );

          const color = window.w3color(stroke!).toRgb();

          page.drawSvgPath(path, {
            borderColor: rgb(
              normalize(color.r),
              normalize(color.g),
              normalize(color.b)
            ),
            borderWidth: strokeWidth,
            x,
            y: pageHeight - y,
            scale: Math.min(scaleX, scaleY),
          });
          page.pushOperators(popGraphicsState());
        };
      }
    });
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);

  try {
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    download(pdfBytes, name, 'application/pdf'); // PDF 파일 다운로드
    return pdfBlob;
  } catch (e) {
    console.log('Failed to save PDF.');
    throw e;
  }
}
