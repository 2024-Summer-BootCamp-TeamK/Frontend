import { useState, useCallback } from 'react';
import { save } from '../utils/pdf';

export interface Pdf {
  name: string;
  file: File;
  pages: Promise<any>[];
}

export const usePdf = () => {
  const [name, setName] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [dimensions, setDimensions] = useState();
  const [file, setFile] = useState<File>();
  const [pages, setPages] = useState<any>([]);
  const [isMultiPage, setIsMultiPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const currentPage = pages[pageIndex];

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions]);

  const nextPage = () => {
    const newPageIndex = pageIndex + 1;
    setPageIndex(pageIndex + 1);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const previousPage = () => {
    const newPageIndex = pageIndex - 1;
    setPageIndex(newPageIndex);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const initialize = ({ name, file, pages: _pages }: Pdf) => {
    if (!(file instanceof File)) {
      throw new Error('The provided file is not of type File');
    }
    const multi = _pages.length > 1;
    setName(name);
    setFile(file);
    setPages(_pages);
    setPageIndex(0);
    setIsMultiPage(multi);
    setIsFirstPage(true);
    setIsLastPage(_pages.length === 1);
  };

  const savePdf = async (attachments) => {
    if (isSaving || !file) return null;

    setIsSaving(true);

    try {
      const savedPdfBlob = await save(file, attachments, name);
      return savedPdfBlob;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentPage,
    dimensions,
    setDimensions: setDimensionsHandler,
    name,
    setName,
    pageIndex,
    setPageIndex,
    file,
    setFile,
    nextPage,
    pages,
    savePdf,
    initialize,
    isMultiPage,
    previousPage,
    isFirstPage,
    isLastPage,
    isSaving,
  };
};
