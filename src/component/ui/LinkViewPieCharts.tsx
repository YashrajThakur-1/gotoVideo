// import React from "react";
// import { useEffect, useState } from "react";
// import { AiFillLock } from "react-icons/ai";

// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { RiCheckboxBlankFill } from "react-icons/ri";
// import { useGetDocumentByCustomNameQuery } from "../../redux/Service/LinkService";

// type Props = {
//   deviceCount: any;
//   referer_counts: any;
// };
// const refferesData = [
//   {
//     name: "Group A",
//     value: 400,
//   },
//   {
//     name: "Group B",
//     value: 300,
//   },
//   {
//     name: "Group C",
//     value: 300,
//   },
// ];
// const deviceData = [
//   {
//     mac: "Group A",
//     value: 400,
//   },
//   {
//     name: "Group B",
//     value: 200,
//   },
//   {
//     name: "Group C",
//     value: 300,
//   },
// ];
// const BaseUrl = process.env.REACT_APP_BASE_URL;
// const LinkViewPieCharts = ({ deviceCount, referer_counts }: Props) => {
//   // const [isChartLoading, setIsChartFetching] = useState(false);
//   // const [chartData, setChartData] = useState<any>({});
//   // const { data, isLoading, isError, isFetching } =
//   //   useGetDocumentByCustomNameQuery("spb2");
//   // console.log(chartData, "datagfhjf");
//   // useEffect(() => {
//   //   if (isLoading && isFetching) {
//   //     setIsChartFetching(true);
//   //   } else {
//   //     setChartData(data );
//   //     setIsChartFetching( false);
//   //   }
//   // }, [isLoading, isFetching, data]);

//   const colors = [
//     "#febf44",
//     "#2de5a6",
//     "#089fea",
//     "#8d78d6",
//     "#fc657b",
//     "#1e29fa",
//   ];
//   const deviceCountsData = deviceCount?.data?.device_counts;
//   const refererCountsData = referer_counts?.data?.browser_counts;

//   // Convert device_counts object into an array of objects
//   const deviceDataForChart =
//     deviceCountsData && typeof deviceCountsData === "object"
//       ? Object.entries(deviceCountsData).map(([name, value]) => ({
//           name: name as string, // Explicitly specify the type as string
//           value: value as number,
//         }))
//       : [];

//   const refererCountsforData =
//     refererCountsData && typeof refererCountsData === "object"
//       ? Object.entries(refererCountsData).map(([name, value]) => ({
//           name: name as string, // Explicitly specify the type as string
//           value: value as number,
//         }))
//       : [];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         <div className="flex justify-between">
//           <div className="text-[20px] font-bold">Referres</div>
//           <button className="text-[14px] text-white bg-black flex items-center rounded-lg p-2">
//             <span>
//               <AiFillLock />
//             </span>
//             Upgrate
//           </button>
//         </div>
//         <div className="flex  flex-col sm:flex-row gap-5 items-center">
//           <div className="">
//             <ResponsiveContainer width={300} height={200}>
//               <PieChart width={300} height={200}>
//                 <Pie
//                   data={refererCountsforData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius="80%"
//                   outerRadius="100%"
//                 >
//                   {refererCountsforData.map((entry, index) => {
//                     return (
//                       <Cell
//                         style={{ padding: 0, gap: 0 }}
//                         key={`cell-${index}`}
//                         fill={colors[index]}
//                       />
//                     );
//                   })}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex flex-col gap-1 w-full h-full">
//             {refererCountsforData?.map((el, index) => {
//               console.log("referce", el);
//               return (
//                 <div>
//                   <div className="flex justify-center gap-5 sm:justify-between">
//                     <span className="font-medium">{el?.name}</span>
//                     <span className="font-medium flex gap-3 items-center">
//                       <span>
//                         <RiCheckboxBlankFill style={{ color: colors[index] }} />
//                       </span>
//                       {el?.value}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <div className="bg-white shadow-lg rounded-lg p-4">
//         <div className="flex justify-between">
//           <div className="text-[20px] font-bold">Devices</div>

//           <button className="text-[14px] text-white bg-black flex items-center rounded-lg p-2">
//             <span>
//               <AiFillLock />
//             </span>
//             Upgrate
//           </button>
//         </div>
//         <div className="flex  flex-col sm:flex-row gap-5 items-center">
//           <div>
//             <ResponsiveContainer width={300} height={200}>
//               <PieChart width={300} height={200}>
//                 <Pie
//                   data={deviceDataForChart} // Updated data prop
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius="80%"
//                   outerRadius="100%"
//                 >
//                   {deviceDataForChart.map((entry, index) => (
//                     <Cell
//                       style={{ padding: 0, gap: 0 }}
//                       key={`cell-${index}`}
//                       fill={colors[index]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex flex-col gap-1 w-full h-full">
//             {deviceDataForChart?.map((el, index) => {
//               console.log("el", el);
//               return (
//                 <div>
//                   <div className="flex justify-center gap-5 sm:justify-between">
//                     <span className="font-medium">{el?.name}</span>
//                     <span className="font-medium flex gap-3 items-center">
//                       <span>
//                         <RiCheckboxBlankFill style={{ color: colors[index] }} />
//                       </span>
//                       {el?.value}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkViewPieCharts;

import React from "react";
import { AiFillLock } from "react-icons/ai";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { RiCheckboxBlankFill } from "react-icons/ri";
import reffers_count from "../../assets/images/reffers_count.png";

type Props = {
  deviceCount: any;
  referer_counts: any;
};

const LinkViewPieCharts = ({ deviceCount, referer_counts }: Props) => {
  const colors = [
    "#febf44",
    "#2de5a6",
    "#089fea",
    "#8d78d6",
    "#fc657b",
    "#1e29fa",
  ];
  const deviceCountsData = deviceCount?.data?.device_counts;
  const refererCountsData = referer_counts?.data?.browser_counts;

  const deviceDataForChart =
    deviceCountsData && typeof deviceCountsData === "object"
      ? Object.entries(deviceCountsData).map(([name, value]) => ({
        name: name as string,
        value: value as number,
      }))
      : [];

  const refererCountsforData =
    refererCountsData && typeof refererCountsData === "object"
      ? Object.entries(refererCountsData).map(([name, value]) => ({
        name: name as string,
        value: value as number,
      }))
      : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Referrers</div>
          <button className="text-sm text-white bg-black flex items-center rounded-lg p-2">
            <span>
              <AiFillLock />
            </span>
            Upgrade
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div className="flex-shrink-0">
            {refererCountsforData && refererCountsforData.length > 0 ? (
              <ResponsiveContainer width={300} height={200}>
                <PieChart width={300} height={200}>
                  <Pie
                    data={refererCountsforData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                  >
                    {refererCountsforData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <img
                src={reffers_count}
                alt="Referrers Counts Image"
                className="w-full h-auto max-h-200 object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full mt-4 sm:mt-0">
            {refererCountsforData?.map((el, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{el?.name}</span>
                <span className="flex gap-3 items-center">
                  <span>
                    <RiCheckboxBlankFill
                      style={{ color: colors[index] }}
                    />
                  </span>
                  {el?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Devices</div>
          <button className="text-sm text-white bg-black flex items-center rounded-lg p-2">
            <span>
              <AiFillLock />
            </span>
            Upgrade
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div className="flex-shrink-0">
            {deviceDataForChart && deviceDataForChart.length > 0 ? (
              <ResponsiveContainer width={300} height={200}>
                <PieChart width={300} height={200}>
                  <Pie
                    data={deviceDataForChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                  >
                    {deviceDataForChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <img
                src={reffers_count}
                alt="Device Counts Image"
                className="w-full h-auto max-h-200 object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full mt-4 sm:mt-0">
            {deviceDataForChart?.map((el, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{el?.name}</span>
                <span className="flex gap-3 items-center">
                  <span>
                    <RiCheckboxBlankFill
                      style={{ color: colors[index] }}
                    />
                  </span>
                  {el?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkViewPieCharts;
