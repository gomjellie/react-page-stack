import { FC } from 'react';
import { ContactsComponent } from './Contacts/Contacts.component';
import { PageStackRouter } from './PageStackRouter/PageStackRouter.component';

const App: FC = () => {
  return (
    <div className="App">
      <PageStackRouter>
        <ContactsComponent />
      </PageStackRouter>
    </div>
  );
};

export default App;
