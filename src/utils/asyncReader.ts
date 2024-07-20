import { getAsset } from './prepareAssets';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;



export const readAsArrayBuffer = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readAsPDF = async (file: File): Promise<PDF> => {
  const pdfjsLib = await getAsset('pdfjsLib');
  // Safari possibly get webkitblobresource error 1 when using origin file blob
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  return pdfjsLib.getDocument(url).promise;
};
// const loadingTask = pdfjsLib.getDocument(url);
// loadingTask.promise.then((pdf) => {
//   setPdfDoc(pdf);
//   setPageNumber(1); // PDF가 로드될 때 페이지 번호를 1로 설정
// });
// }, []);

// export const readAsPDF = async (file: File) => {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await getDocument({ data: arrayBuffer }).promise;
//   return pdf;
// };

// export const readAsImage = (src: Blob | string): Promise<HTMLImageElement> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     if (src instanceof Blob) {
//       const url = window.URL.createObjectURL(src);
//       img.src = url;
//     } else {
//       img.src = src;
//     }
//   });
// };

// export const readAsDataURL = (
//   file: File
// ): Promise<string | ArrayBuffer | null> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// };


export const readAsDataURL = (file: File) : Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const readAsImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataURL;
  });
};


interface PDF {
  numPages: number;
  getPage: (index: number) => Promise<any>;
}

// PDF 페이지 렌더링 함수
export const renderPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement) => {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1 });
  const context = canvas.getContext('2d');

  if (context) {
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    await page.render(renderContext).promise;
  } else {
    throw new Error('Failed to get canvas context');
  }
};
