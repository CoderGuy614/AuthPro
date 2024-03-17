import React from 'react';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Authenticator, View } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import Home from './pages/home/Home';

Amplify.configure(awsExports);


function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { route } = useAuthenticator(context => [context.route]);
  return route === 'authenticated' ? <>{children}</> : <Authenticator />;
}

function ProtectedPage() {
  const { signOut } = useAuthenticator();
  return (
    <div>
      <h3>Protected</h3>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: 'protected', element: <PrivateRoute><ProtectedPage /></PrivateRoute> }
  ]
);

export default function App() {
  return (
    <ThemeProvider>
      <Authenticator.Provider>
        <View>
          <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
        </View>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

