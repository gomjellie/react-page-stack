/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, useEffect, useState } from 'react';
import { MemoPage, Page } from './Page.styled';
import { PageStackRouterContext } from './PageStackRouter.context';

type CurrentActionType = 'push' | 'willPop' | 'pop' | 'replace';

const PageStackRouter: FC<{ children?: ReactNode }> = ({ children }) => {
  const [pageStack, setPageStack] = useState<FC[]>([]);
  const [currentAction, setCurrentAction] = useState<CurrentActionType>('push');
  useEffect(() => {
    if (currentAction === 'willPop') {
      const sched = setTimeout(() => {
        setPageStack((pageStack) => pageStack.slice(0, -1));
        setCurrentAction('pop');
      }, 500);

      return () => {
        clearTimeout(sched);
      };
    }
  }, [currentAction]);
  const push = (page: FC) => {
    setPageStack((pageStack) => [...pageStack, page]);
    setCurrentAction('push');
  };
  const pop = () => {
    setCurrentAction('willPop');
  };
  const replace = (page: FC) => {
    setPageStack((pageStack) => pageStack.splice(-1, 1, page));
    setCurrentAction('replace');
  };

  useEffect(() => {
    setPageStack([() => <>{children}</>]);
  }, [children]);
  return (
    <PageStackRouterContext.Provider
      value={{
        push,
        pop,
        replace,
      }}
    >
      {pageStack.map((PageToBeRendered, index) => {
        if (index === pageStack.length - 1) {
          let lastPageStyle: string = 'entering';
          if (currentAction === 'push') {
            lastPageStyle = 'entering';
          } else if (currentAction === 'willPop') {
            lastPageStyle = 'popping';
          } else if (currentAction === 'pop') {
            lastPageStyle = 'recalled';
          }
          return (
            <MemoPage key={index} className={lastPageStyle}>
              <PageToBeRendered />
            </MemoPage>
          );
        }
        if (index === pageStack.length - 2) {
          let pageStyle = 'leaving';
          if (currentAction === 'willPop') {
            pageStyle = 'recalling';
          } else if (currentAction === 'pop') {
            pageStyle = 'left';
          }
          return (
            <MemoPage key={index} className={pageStyle}>
              <PageToBeRendered />
            </MemoPage>
          );
        }

        return null;
      })}
    </PageStackRouterContext.Provider>
  );
};

export { PageStackRouter };
