import styled from 'styled-components';

namespace Profile {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* height: 100%; */
    width: 100%;
  `;

  export namespace Avatar {
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 8rem;
      margin-bottom: 1rem;
    `;

    export const Image = styled.img`
      height: 6rem;
      width: 6rem;
      border-radius: 50%;
    `;

    export const Label = styled.label`
      margin-top: 1rem;
      color: var(--white-100);
      font-size: 1rem;
      font-weight: bold;
    `;
  }

  export namespace Phone {
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 4rem;
      width: calc(100% - 1rem);
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      flex-shrink: 1;
      background-color: var(--gray-200);
      border-radius: 0.5rem;
      margin: 0.5rem;
      gap: 0.1rem;
    `;
    export const Label = styled.label`
      color: var(--white-100);
    `;
    export const Number = styled.div`
      color: var(--blue-50);
      font-size: 1rem;
    `;
  }

  export namespace Email {
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 4rem;
      width: calc(100% - 1rem);
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      flex-shrink: 1;
      background-color: var(--gray-200);
      border-radius: 0.5rem;
      margin: 0.5rem;
      gap: 0.1rem;
    `;
    export const Label = styled.label`
      color: var(--white-100);
    `;
    export const Address = styled.div`
      color: var(--blue-50);
      font-size: 1rem;
    `;
  }

  export namespace Notes {
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      height: 7rem;
      width: calc(100% - 1rem);
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      flex-shrink: 1;
      background-color: var(--gray-200);
      border-radius: 0.5rem;
      margin: 0.5rem;
      gap: 0.1rem;
    `;
    export const Label = styled.label`
      color: var(--white-100);
    `;
    export const Text = styled.div`
      color: var(--blue-50);
      font-size: 1rem;
    `;
  }
}

export { Profile };
