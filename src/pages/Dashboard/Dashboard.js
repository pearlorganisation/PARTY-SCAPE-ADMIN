import { useSelector } from "react-redux";
import CardFour from "../../components/CardFour.js";
import CardOne from "../../components/CardOne.js";
import CardThree from "../../components/CardThree.js";
import CardTwo from "../../components/CardTwo.js";
import ChartOne from "../../components/ChartOne.js";
import ChartThree from "../../components/ChartThree.js";
import ChartTwo from "../../components/ChartTwo.js";
import ChatCard from "../../components/ChatCard.js";
import MapOne from "../../components/MapOne.js";
import TableOne from "../../components/TableOne.js";
// ----------------------------------------------------------------------

const Dashboard = () => {
  const {theaterData} = useSelector((state)=>state.theater)
  const {bookingData} = useSelector((state)=>state.booking)
  const {cakeData} = useSelector((state)=>state.cake)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 ">
        
      
        
        <CardOne data={bookingData.length}/>
        <CardTwo data={theaterData.length}/>
        <CardThree data={cakeData.length}/>
        {/* <CardFour /> */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
