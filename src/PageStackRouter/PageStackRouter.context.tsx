import { createContext, FC, useContext } from 'react';

const PageStackRouterContext = createContext<{
  push: (page: FC) => void;
  pop: () => void;
  replace: (page: FC) => void;
}>({ push: () => {}, pop: () => {}, replace: () => {} });

const usePageStackRouter = () => useContext(PageStackRouterContext);

export { PageStackRouterContext, usePageStackRouter };
