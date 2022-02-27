import { FC, Fragment, useState } from 'react';
import { Contacts } from './Contacts.styled';
import { faker } from '@faker-js/faker';
import { usePageStackRouter } from '../PageStackRouter';
import { ProfileComponent } from '../Profile/Profile.component';
import { Helmet } from '../Helmet/Helmet.styled';

interface ContactsProps {}
interface ContactProps {
  name: string;
}

const ContactComponent: FC<ContactProps> = ({ name }) => {
  const { push } = usePageStackRouter();
  return (
    <Contacts.Item
      onClick={() => {
        push(() => {
          return <ProfileComponent name={name} />;
        });
      }}
    >
      <Contacts.ItemName>{name}</Contacts.ItemName>
    </Contacts.Item>
  );
};

const ContactsComponent: FC<ContactsProps> = (props) => {
  // generate 100 random contacts using faker
  const [contacts] = useState(() => {
    const contacts = [];
    for (let i = 0; i < 100; i++) {
      contacts.push({
        name: faker.name.findName(),
      });
    }
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <Contacts.Container>
      <Helmet.Container>
        <Helmet.Left>Groups</Helmet.Left>
        <Helmet.Title>Contacts</Helmet.Title>
        <Helmet.Right>+</Helmet.Right>
      </Helmet.Container>
      <Contacts.List>
        {contacts.map((contact, i, arr) => {
          // if the first character of the contact's name is the different from the previous contact's name,
          // then render a new ContactListItemIndex
          if (i === 0 || contact.name[0] !== arr[i - 1].name[0]) {
            return (
              <Fragment key={contact.name[0]}>
                <Contacts.Item>
                  <Contacts.ItemIndex>{contact.name[0]}</Contacts.ItemIndex>
                </Contacts.Item>
                <ContactComponent key={contact.name} name={contact.name} />
              </Fragment>
            );
          }

          return <ContactComponent key={contact.name} name={contact.name} />;
        })}
        {/* <ContactComponent name="John Doe" /> */}
      </Contacts.List>
    </Contacts.Container>
  );
};

export { ContactsComponent };
