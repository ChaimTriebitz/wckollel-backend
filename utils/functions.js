module.exports = {
   formatTime,
}

function formatTime(time = '13:00') {

   let [hours, minutes] = time.split(':');


   hours = parseInt(hours);


   let period = 'AM';
   if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
         hours -= 12;
      }
   } else if (hours === 0) {
      hours = 12;
   }

   return `${hours}:${minutes} ${period}`;
}

