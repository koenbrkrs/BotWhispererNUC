import { ReactNode } from 'react';
import { WhatsAppSidebar } from './WhatsAppSidebar';

interface WhatsAppLayoutProps {
  children: ReactNode;
  groupName: string;
}

export const WhatsAppLayout = ({ children, groupName }: WhatsAppLayoutProps) => {
  return (
    <div className="min-h-screen bg-wa-bg-primary font-['Segoe_UI',system-ui,-apple-system,sans-serif] w-full">
      <div className="flex h-screen flex-col w-full">
        {/* Hide sidebar for Portrait Game Mode */}
        <div className="hidden">
          <WhatsAppSidebar groupName={groupName} />
        </div>
        {children}
      </div>
    </div>
  );
};
