/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { MemoPage, Page } from './Page.styled';
import { PageStackRouterContext } from './PageStackRouter.context';

type CurrentActionType = 'willPush' | 'push' | 'willPop' | 'pop' | 'replace';

const PageStackRouter: FC<{ children?: ReactNode }> = ({ children }) => {
  const lastRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const [pageStack, setPageStack] = useState<FC[]>([]);
  const [currentAction, setCurrentAction] = useState<CurrentActionType>('push');
  const [startX, setStartX] = useState<number | undefined>(undefined);
  const [pageX, setPageX] = useState<number | undefined>(undefined);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (currentAction === 'willPop') {
      const sched = setTimeout(() => {
        prevRef.current?.removeAttribute('style');
        setPageStack((pageStack) => pageStack.slice(0, -1));
        setCurrentAction('pop');
      }, 500);

      return () => {
        clearTimeout(sched);
      };
    }
  }, [currentAction]);

  useEffect(() => {
    if (currentAction === 'willPush') {
      const sched = setTimeout(() => {
        setCurrentAction('push');
      }, 500);

      return () => {
        clearTimeout(sched);
      };
    }
  }, [currentAction]);
  const push = (page: FC) => {
    setPageStack((pageStack) => [...pageStack, page]);
    setCurrentAction('willPush');
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

  useEffect(() => {
    if (!lastRef.current) return;
    if (!prevRef.current) return;
    const $ref = lastRef.current;
    const $prevRef = prevRef.current;
    const { width: pageWidth } = $ref.getBoundingClientRect();
    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      const { pageX, clientX, screenX } = e.touches[0];
      startX = pageX;
      if (startX > pageWidth * 0.25) return;
      $ref.removeAttribute('style');
      $prevRef.removeAttribute('style');

      document.body.style.overflow = 'hidden';
      // console.log(`pageX: ${pageX}, clientX: ${clientX}, screenX: ${screenX}`);
    };

    const onTouchMove = (e: TouchEvent) => {
      const { pageX, clientX, screenX } = e.touches[0];
      if (startX > pageWidth * 0.25) return;
      const deltaX = Math.max(pageX - startX, 0);
      $ref.style.transform = `translateX(${deltaX}px)`;
      $prevRef.style.transform = `translateX(${
        (25 * deltaX) / pageWidth - 25
      }%)`;
    };

    const onTouchEnd = (e: TouchEvent) => {
      // console.log('touch end');
      document.body.removeAttribute('style');
      const { pageX, clientX, screenX } = e.changedTouches[0];
      setPageX(pageX);
      setStartX(startX);
      setPageWidth(pageWidth);
      if (pageX > pageWidth * 0.5 + startX) {
        prevRef.current?.removeAttribute('style');
        pop();
      } else {
        $ref.style.transform = ``;
        $ref.style.transition = `all 0.3s ease`;
        $prevRef.style.transform = ``;
        $prevRef.style.transition = `all 0.3s ease`;
      }
    };

    $ref.addEventListener('touchstart', onTouchStart, { passive: true });
    $ref.addEventListener('touchmove', onTouchMove, { passive: true });
    $ref.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      $ref.removeEventListener('touchstart', onTouchStart);
      $ref.removeEventListener('touchmove', onTouchMove);
      $ref.removeEventListener('touchend', onTouchEnd);
    };
  }, [pageStack, lastRef]);
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
          if (currentAction === 'willPush') {
            lastPageStyle = 'entering';
          } else if (currentAction === 'push') {
            lastPageStyle = 'entered';
          } else if (currentAction === 'willPop') {
            lastPageStyle = 'popping';
          } else if (currentAction === 'pop') {
            lastPageStyle = 'recalled';
          }
          return (
            <MemoPage
              pageX={pageX}
              pageWidth={pageWidth}
              startX={startX}
              key={index}
              className={lastPageStyle}
              ref={lastRef}
            >
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
          } else if (currentAction === 'push') {
            pageStyle = 'left';
          }
          return (
            <MemoPage
              pageX={pageX}
              pageWidth={pageWidth}
              startX={startX}
              key={index}
              className={pageStyle}
              ref={prevRef}
            >
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
