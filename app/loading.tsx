import Image from 'next/image';
import React from 'react';

function Loading() {
  return (
    <div className="loader">
      <div className="loader-det">
           <Image
              src="/images/logo.png"
              alt="No Sekai Logo"
              width={250}
              height={67}
              priority
            />
      </div>
    </div>
  );
}

export default Loading;
