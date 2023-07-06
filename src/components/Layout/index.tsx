import React from 'react';

interface ILayourProps extends React.PropsWithChildren {
  theme?: string;
}

function Layout({ children }: ILayourProps) {
  return (
    <div className="w-full min-h-screen bg-paper py-6 px-5">
      <div className="max-w-[1440px] m-auto">{children}</div>
    </div>
  );
}

export default Layout;
