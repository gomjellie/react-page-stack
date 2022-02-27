import styled from 'styled-components';

namespace Contacts {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;
  export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    margin-top: 2rem;
  `;
  export const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    flex-shrink: 1;
    cursor: pointer;
    border-bottom: 0.5px solid var(--list-border-color);

    /* &::after {
      content: '';
      top: auto;
      right: auto;
      left: 1rem;
      transform-origin: 50% 100%;
      transform: translateY(1.5rem);
      position: relative;
      background-color: var(--list-border-color);
      display: block;
      width: calc(100% - 2rem);
      height: 0.5px;
    } */
  `;
  export const ItemName = styled.div`
    color: var(--white-100);
    font-size: 1rem;
  `;
  export const ItemIndex = styled.div`
    color: var(--gray-100);
    font-size: 1rem;
    font-weight: bold;
  `;
}

export { Contacts };
