import React from "react";

type Props = {};

const LoadingCardComponent = (props: Props) => {
  return (
    <div className="grid grid-cols gap-3">
      {Array(2)
        .fill(0)
        .map((index) => {
          return (
            <div className="">
              <div className="animate-pulse shadow rounded-md p-4 w-full h-[250px] ">
                <div className="animate-pulse gap-3 bg-white p-4 w-full">
                  <div className=" p-2">
               
                    <div className=" bg-slate-200 h-[35px] w-[35px] rounded-full "></div>
                  </div>
                  <div className=" space-y-3 py-1">
                    <div className="p-4 bg-slate-200 rounded"></div>
                    <div className="p-2 bg-slate-200 rounded w-[400px]"></div>
                    <div className="p-2 bg-slate-200 rounded w-[600px]"></div>
                  </div>
                <div className="grid grid-cols-4 gap-6 w-[400px] pt-2">
                <div className="p-3 bg-slate-200 "></div>
                <div className="p-3 bg-slate-200 "></div>
                <div className="p-3 bg-slate-200 "></div>
                <div className="p-3 bg-slate-200 "></div>
                </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LoadingCardComponent;