import { ReactNode } from 'react';
import { TwitterSidebar } from './TwitterSidebar';
import { TwitterRightSidebar } from './TwitterRightSidebar';

interface TwitterLayoutProps {
  children: ReactNode;
}

export const TwitterLayout = ({ children }: TwitterLayoutProps) => {
  return (
    <div className="min-h-screen bg-tw-bg-primary">
      <div className="max-w-[1400px] mx-auto flex">
        <TwitterSidebar />
        {children}
        <TwitterRightSidebar />
      </div>
    </div>
  );
};
