'use client';

import { ReactNode, useState } from 'react';
import i18next from '@/i18n/i18n';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import MenuSidebar from '../MenuSidebar/MenuSidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  return i18next.isInitialized ? (
    <div>
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground/40" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 bg-background">
                <TransitionChild
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <Button
                      variant="ghost"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="size-6 text-white" aria-hidden="true" />
                    </Button>
                  </div>
                </TransitionChild>

                <MenuSidebar />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div
        className={`hidden md:w-72 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${shrink ? 'lg:w-16' : ''}`}
      >
        <MenuSidebar shrink={shrink} setShrink={setShrink} />
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 p-4 shadow-sm sm:px-6 lg:hidden">
        <Button
          type="button"
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={() => setSidebarOpen(true)}
          variant="ghost"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </div>

      <main
        className={`${shrink ? 'py-6 lg:pl-12' : 'py-6 lg:pl-72'} transition-all duration-150`}
      >
        <div className="px-4 sm:px-6">{children}</div>
      </main>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Layout;
