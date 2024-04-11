// import React from "react";
// import { AiFillLock } from "react-icons/ai";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// type Props = {
//   browsercount: any;
// };
// const EngagmentsExtraTime = [
//   {
//     location: "Group A",
//     value: 400,
//   },
//   {
//     location: "Group A",
//     value: 40,
//   },
//   {
//     location: "Group A",
//     value: 40,
//   },
//   {
//     location: "Group A",
//     value: 100,
//   },
//   {
//     location: "Group A",
//     value: 300,
//   },
//   {
//     location: "Group A",
//     value: 400,
//   },
//   {
//     location: "Group A",
//     value: 40,
//   },
//   {
//     location: "Group A",
//     value: 20,
//   },
//   {
//     location: "Group C",
//     value: 300,
//   },
//   {
//     location: "Group D",
//     value: 300,
//   },
//   {
//     location: "Group E",
//     value: 300,
//   },
// ];

// const LinkViewBarChart = ({ browsercount }: Props) => {
//   const browserCountsData = browsercount?.data?.browser_counts;

//   const browsercountDataForChart =
//     browserCountsData && typeof browserCountsData === "object"
//       ? Object.entries(browserCountsData).map(([name, value]) => ({
//         name: name as string,
//         value: value as number,
//       }))
//       : [];
//   console.log(browserCountsData, "browser Chart Data");

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-2xl font-bold text-blue-600">Engagements over time</div>
//         <button className="text-sm text-white bg-blue-700 px-4 py-2 rounded-md flex items-center">
//           <span className="mr-1">
//             <AiFillLock />
//           </span>
//           Upgrade
//         </button>
//       </div>
//       <div className="flex items-center">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={browsercountDataForChart}
//             barSize={50}
//             barGap={0}
//             barCategoryGap={-20}
//           >
//             <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//             <YAxis dataKey="value" tick={{ fontSize: 12 }} />
//             <Bar dataKey="value" fill="#05B2BB" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default LinkViewBarChart;



import { AiFillLock } from "react-icons/ai";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import barChartImage from "../../assets/images/barCharts.png";
type Props = {
  browsercount: any;
};
const EngagmentsExtraTime = [
  {
    location: "Group A",
    value: 400,
  },
  {
    location: "Group A",
    value: 40,
  },
  {
    location: "Group A",
    value: 40,
  },
  {
    location: "Group A",
    value: 100,
  },
  {
    location: "Group A",
    value: 300,
  },
  {
    location: "Group A",
    value: 400,
  },
  {
    location: "Group A",
    value: 40,
  },
  {
    location: "Group A",
    value: 20,
  },
  {
    location: "Group C",
    value: 300,
  },
  {
    location: "Group D",
    value: 300,
  },
  {
    location: "Group E",
    value: 300,
  },
];

const LinkViewBarChart = ({ browsercount }: Props) => {
  const browserCountsData = browsercount?.data?.browser_counts;

  const browsercountDataForChart =
    browserCountsData && typeof browserCountsData === "object"
      ? Object.entries(browserCountsData).map(([name, value]) => ({
        name: name as string,
        value: value as number,
      }))
      : [];

  const hasRealData = browsercountDataForChart.length > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Engagements over time</div>
        <button className="text-sm text-white bg-black px-4 py-2 rounded-md flex items-center">
          <span className="mr-1">
            <AiFillLock />
          </span>
          Upgrade
        </button>
      </div>
      <div className="flex items-center">
        {hasRealData ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={browsercountDataForChart}
              barSize={50}
              barGap={0}
              barCategoryGap={-20}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis dataKey="value" tick={{ fontSize: 12 }} />
              <Bar dataKey="value" fill="#05B2BB" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <img src={barChartImage} alt="Bar Chart" />
        )}
      </div>
    </div>
  );
};

export default LinkViewBarChart;