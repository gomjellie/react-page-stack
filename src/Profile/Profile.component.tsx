import faker from '@faker-js/faker';
import { FC, useMemo, useState } from 'react';
import { Helmet } from '../Helmet/Helmet.styled';
import { usePageStackRouter } from '../PageStackRouter';
import { Profile } from './Profile.styled';

interface ProfileProps {
  name: string;
}

const LoadableImage: FC<{ src: string }> = ({ src }) => {
  const defaultAvatar =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

  const [loaded, setLoaded] = useState(false);
  const [avatar, setAvatar] = useState(src);

  const getError = () => {
    setAvatar(defaultAvatar);
    setLoaded(true);
  };

  const onLoad = () => {
    setAvatar(src);
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <Profile.Avatar.Image src={defaultAvatar} />}
      <Profile.Avatar.Image
        style={!loaded ? { visibility: 'hidden' } : undefined}
        src={avatar}
        onLoad={onLoad}
        onError={getError}
      />
    </>
  );
};

const ProfileComponent: FC<ProfileProps> = (props) => {
  // random phone number generated by faker
  const phoneNumber = useMemo(() => faker.phone.phoneNumber(), []);
  const avatarImg = useMemo(() => faker.image.avatar(), []);
  const email = useMemo(() => faker.internet.email(), []);
  const { pop } = usePageStackRouter();

  return (
    <Profile.Container>
      <Helmet.Container>
        <Helmet.Left onClick={pop}>Contacts</Helmet.Left>
        <Helmet.Title>{props.name}</Helmet.Title>
        <Helmet.Right>Edit</Helmet.Right>
      </Helmet.Container>
      <Profile.Avatar.Container>
        <LoadableImage src={avatarImg} />
        <Profile.Avatar.Label>{props.name}</Profile.Avatar.Label>
      </Profile.Avatar.Container>
      <Profile.Phone.Container>
        <Profile.Phone.Label>Phone</Profile.Phone.Label>
        <Profile.Phone.Number>{phoneNumber}</Profile.Phone.Number>
      </Profile.Phone.Container>
      <Profile.Email.Container>
        <Profile.Email.Label>Email</Profile.Email.Label>
        <Profile.Email.Address>{email}</Profile.Email.Address>
      </Profile.Email.Container>
      <Profile.Notes.Container>
        <Profile.Notes.Label>Notes</Profile.Notes.Label>
        <Profile.Notes.Text></Profile.Notes.Text>
      </Profile.Notes.Container>
    </Profile.Container>
  );
};

export { ProfileComponent };
