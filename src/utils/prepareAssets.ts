type ScriptName =
  | 'pdfjsLib'
  | 'PDFLib'
  | 'pdfjsWorker'
  | 'download'
  | 'makeTextPDF'
  | 'w3Color';

interface Script {
  name: ScriptName;
  src: string;
}

const scripts: Script[] = [
  {
    name: 'pdfjsLib',
    src: 'https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.min.js', // API 버전
  },
  {
    name: 'pdfjsWorker',
    src: 'https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js', // Worker 버전
  },
  {
    name: 'PDFLib',
    src: 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js',
  },
  {
    name: 'download',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/downloadjs/1.4.8/download.js',
  },
  {
    name: 'makeTextPDF',
    src: 'https://cdn.jsdelivr.net/gh/snamoah/react-pdf-editor/public/makeTextPDF.js',
  },
  { name: 'w3Color', src: 'https://www.w3schools.com/lib/w3color.js' },
];


const assets: Record<string, any> = {};
export const getAsset = (scriptName: string) => assets[scriptName];

export const prepareAssets = (): void => {
  scripts.forEach(({ name, src }) => {
    assets[name] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(window[name as any]);
      //  console.log(`${name} is loaded.`);
      };
      script.onerror = () => reject(`The script ${name} didn't load correctly.`);
      document.body.appendChild(script);
    });
  });
};


interface Font {
  src?: string;
  correction?: (size: number, lineHeight: number) => number;
  [key: string]: any;
}

interface FontsType {
  [key: string]: Font;
}

const fonts: FontsType = {
  Courier: {
    correction(size: number, lineHeight: number) {
      return (size * lineHeight - size) / 2 + size / 6;
    },
  },
  Helvetica: {
    correction(size: number, lineHeight: number) {
      return (size * lineHeight - size) / 2 + size / 10;
    },
  },
  'Times-Roman': {
    correction(size: number, lineHeight: number) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
  },
};

