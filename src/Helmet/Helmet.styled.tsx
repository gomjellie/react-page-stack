import styled from 'styled-components';

namespace Helmet {
  export const Container = styled.div`
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    flex-shrink: 1;
  `;
  export const Left = styled.div`
    width: 3rem;
    padding: 0.5rem;
    text-align: left;
    color: var(--blue-100);
    cursor: pointer;
  `;
  export const Right = styled.div`
    width: 3rem;
    padding: 0.5rem;
    text-align: right;
    color: var(--blue-100);
    cursor: pointer;
  `;
  export const Title = styled.div`
    color: white;
    font-size: 1.1rem;
  `;
}

export { Helmet };
