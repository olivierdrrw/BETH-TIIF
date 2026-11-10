"use client";

export function NotificationCenter(){

 const notifications=[

  {
   title:
   "7 Day Streak"
  },

  {
   title:
   "Goal Completed"
  },

 ];

 return(

  <div
   className="
   rounded-3xl
   border
   p-6
   "
  >

   <h2>
    Notifications
   </h2>

   {notifications.map(

    (item,index)=>(

     <div key={index}>

      {item.title}

     </div>

    )

   )}

  </div>

 );

}