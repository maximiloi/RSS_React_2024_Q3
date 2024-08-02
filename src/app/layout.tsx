import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '04 - Next.js. Server Side Rendering | iloi',
  description: 'My App is a...',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
