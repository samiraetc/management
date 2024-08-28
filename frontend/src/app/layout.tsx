// app/layout.tsx
'use client';

import { ThemeProvider } from '@/provider/ThemeProvider';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchInterval={5 * 60}
          refetchWhenOffline={false}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider store={store}>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </Provider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
