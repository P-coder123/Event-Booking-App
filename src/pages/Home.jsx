import EventList from '../components/EventList'

export default function Home(){

    return (
       <div className="p-6">
         <h1 className="text-2xl font-bold text-center">🎊 Welcome to Event Booking</h1>
         <EventList/>
       </div>
    );

}