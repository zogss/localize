import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
})`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 26px;
`;

export const ListBlockContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

export const ListContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
