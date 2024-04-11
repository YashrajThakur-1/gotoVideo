// import React from "react";
// import { AiFillLock } from "react-icons/ai";
// import { RiCheckboxBlankFill } from "react-icons/ri";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";

// type Props = {
//   citycount: any;
// };
// const locationsData = [
//   {
//     location: "Group A",
//     value: 400,
//   },
//   {
//     location: "Group B",
//     value: 300,
//   },
//   {
//     location: "Group C",
//     value: 600,
//   },
//   {
//     location: "Group D",
//     value: 300,
//   },
//   {
//     location: "Group E",
//     value: 100,
//   },
// ];
// const LinkViewProgressBar = ({ citycount }: Props) => {
//   const cityCountsData = citycount?.data?.city_counts;

//   const cityDataForChart =
//     cityCountsData && typeof cityCountsData === "object"
//       ? Object.entries(cityCountsData).map(([location, value]) => ({
//         location: location as string, // Explicitly specify the type as string
//         value: value as number,
//       }))
//       : [];

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4">
//       <div className="flex justify-between ">
//         <div className="text-[15px] font-bold">Locations</div>
//         <button className="text-[14px] text-white bg-black flex items-center rounded-md p-2">
//           <span>
//             <AiFillLock />
//           </span>
//           Upgrate
//         </button>
//       </div>
//       <div className="flex gap-5 items-center">
//         <div className="flex flex-col gap-1 w-full h-full">
//           {cityDataForChart?.map((el) => {
//             return (
//               <div>
//                 <div className="flex  justify-between">
//                   <span className="font-medium">{el?.location}</span>
//                   <span className="font-medium flex gap-3 items-center"><span ><RiCheckboxBlankFill style={{ color: "1e29fa" }} /></span>{el?.value}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="hidden sm:inline">
//           <BarChart
//             layout="vertical"
//             width={600}
//             height={90}
//             data={cityDataForChart}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >

//             <XAxis hide type="number" />
//             <YAxis hide dataKey="name" type="category" />
//             <Bar
//               dataKey="value"
//               stackId="value"
//               fill="#1e29fa"
//               barSize={10}
//               radius={[10, 0, 0, 10]}
//               background={{ fill: "#F4F6FA" }}
//             />
//           </BarChart>
//         </div>
//         <div className="flex flex-col gap-1 w-full h-full">
//           {cityDataForChart?.map((el, value) => {
//             console.log("citydata", el)
//             return (
//               <div>
//                 <div className="flex  justify-between">
//                   <span className="font-medium">{el?.location}</span>
//                   <span className="font-medium flex gap-3 items-center"><span ><RiCheckboxBlankFill style={{ color: "1e29fa" }} /></span>{el?.value}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkViewProgressBar;


import React from "react";
import { AiFillLock } from "react-icons/ai";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import countryCounts from "../../assets/images/countryCounts.png";

type Props = {
  citycount: any;
};



const LinkViewProgressBar = ({ citycount }: Props) => {
  const cityCountsData = citycount?.data?.city_counts;

  const cityDataForChart =
    cityCountsData && typeof cityCountsData === "object"
      ? Object.entries(cityCountsData).map(([location, value]) => ({
        location: location as string,
        value: value as number,
      }))
      : [];

  const hasRealData = cityDataForChart.length > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Locations</div>
        <button className="text-sm text-white bg-black px-4 py-2 rounded-md flex items-center">
          <span className="mr-1">
            <AiFillLock />
          </span>
          Upgrade
        </button>
      </div>
      <div className="flex gap-5 items-center mt-4">
        {hasRealData ? (
          <>
            <div className="flex flex-col gap-2 w-full h-full">
              {cityDataForChart?.map((el) => (
                <div key={el.location} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span className="font-medium">{el?.location}</span>
                  <span className="font-medium flex gap-3 items-center">
                    <span>
                      <RiCheckboxBlankFill style={{ color: "#1e29fa" }} />
                    </span>
                    {el?.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden sm:inline">
              <BarChart
                layout="vertical"
                width={600}
                height={90}
                data={cityDataForChart}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis hide type="number" />
                <YAxis hide dataKey="name" type="category" />
                <Bar
                  dataKey="value"
                  stackId="value"
                  fill="#1e29fa"
                  barSize={10}
                  radius={[10, 0, 0, 10]}
                  background={{ fill: "#F4F6FA" }}
                />
              </BarChart>
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
              {cityDataForChart?.map((el) => (
                <div key={el.location} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span className="font-medium">{el?.location}</span>
                  <span className="font-medium flex gap-3 items-center">
                    <span>
                      <RiCheckboxBlankFill style={{ color: "#1e29fa" }} />
                    </span>
                    {el?.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <img src={countryCounts} alt="Country Counts" className="w-full rounded-md" />
        )}
      </div>
    </div>
  );
};

export default LinkViewProgressBar;