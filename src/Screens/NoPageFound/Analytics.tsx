import React from "react";
import SideNavigationLayout from "../../component/ui/SideNavigationLayout";

type Props = {};

const Analytics = (props: Props) => {
  return (
    <SideNavigationLayout>
      <div className="flex items-center text-[25px] font-bold justify-center">
        Page Under development
      </div>
    </SideNavigationLayout>
  );
};

export default Analytics;
// import React from "react";
// import SideNavigationLayout from "../../component/ui/SideNavigationLayout";
// import "./Analytics.css";
// const Analytics: React.FC = () => {
//   return (
//     <SideNavigationLayout>
//       {" "}
//       <div className="orb-sticky" style={{ top: "55px" }}>
//         <div className="inner">
//           <header className="analytics-header">
//             <section className="header-top">
//               <h1 className="orb-typography h1 stripped text-3xl font-bold">
//                 Analytics
//               </h1>
//               <button className="orb-button default add-module" tabIndex={0}>
//                 <span className="orb-button-icon">
//                   <span className="orb-icon"></span>
//                 </span>
//                 Add module
//               </button>
//             </section>
//             <section className="header-middle">
//               <div className="orb-alert promo left-border title">
//                 <span className="orb-icon icon left title">
//                   <svg
//                     stroke="currentColor"
//                     fill="currentColor"
//                     strokeWidth="0"
//                     viewBox="0 0 24 24"
//                     role="graphics-document"
//                     height="20"
//                     width="20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <title>Icon</title>
//                     <path fill="none" d="M0 0h24v24H0z"></path>
//                     <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"></path>
//                   </svg>
//                 </span>
//                 <div className="message">
//                   <h4 className="orb-typography h4">Free preview</h4>
//                   This is an example of our new Analytics dashboard using sample
//                   data.{" "}
//                   <button type="button" className="orb-link underline">
//                     Upgrade
//                   </button>{" "}
//                   to display your data in real-time and make this report
//                   actionable.
//                 </div>
//               </div>
//             </section>
//             <section className="header-bottom">
//               <div className="dates-filters disabled">
//                 <div className="orb-date-range-picker"> </div>
//                 <button
//                   className="orb-button neutral-secondary add-filters"
//                   disabled
//                   tabIndex={0}
//                 >
//                   <span className="orb-button-icon"></span>
//                   Add filters
//                 </button>
//                 <span className="orb-typography p stripped small note cursor-not-allowed	">
//                   Showing data for all links and QR Codes
//                 </span>
//               </div>
//             </section>
//           </header>
//         </div>
//       </div>
//     </SideNavigationLayout>
//   );
// };

// export default Analytics;
