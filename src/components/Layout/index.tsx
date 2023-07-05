import React from 'react';

interface ILayourProps extends React.PropsWithChildren {
  theme?: string;
}

function Layout({ children }: ILayourProps) {
  return (
    <div className="w-full h-screen bg-paper">
      <div className="max-w-[1440px] m-auto">{children}</div>
    </div>
  );
}

export default Layout;
