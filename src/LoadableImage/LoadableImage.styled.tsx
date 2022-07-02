import styled from 'styled-components'

export const LoadableImgStyled = styled.img.attrs(({ draggable }) => {
  return {
    draggable: draggable ?? false,
  }
})`
  width: 100%;
`
