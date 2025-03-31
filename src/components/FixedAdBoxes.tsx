
import React from 'react';

const FixedAdBoxes = () => {
  return (
    <>
      {/* Top fixed ad box */}
      <div className="fixed top-20 left-0 right-0 z-40 flex justify-center">
        <div className="bg-white shadow-md rounded-md overflow-hidden w-[728px] max-w-full">
          <div className="text-xs text-gray-500 text-center p-1 border-b">Advertisement</div>
          <div className="h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-gray-400">Google Ad Space</p>
          </div>
        </div>
      </div>

      {/* Side fixed ad box */}
      <div className="fixed top-1/3 right-4 z-40 hidden lg:block">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="text-xs text-gray-500 text-center p-1 border-b">Advertisement</div>
          <div className="w-[160px] h-[600px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <div className="rotate-90">
              <p className="text-gray-400">Google Ad Space</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FixedAdBoxes;
