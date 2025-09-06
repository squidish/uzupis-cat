import { PropsWithChildren } from 'react';

export default function CRTFrame({ children }: PropsWithChildren) {
  return <div className="crt-frame">{children}</div>;
}
