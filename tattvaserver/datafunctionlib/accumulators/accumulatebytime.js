var moment = require('momentjs');

function TimeAccumulator () {
  var timeBucket = {};
  var slideWindowStart = undefined
  var slideWindowEnd = undefined;

  var lookup = {
    'hh':  { format: "YYYY-MM-DD HH", unit: moment.HOUR },
    'mm':  { format: "YYYY-MM-DD HH:mm", unit: moment.MINUTE },
    'ss':  { format: "YYYY-MM-DD HH:mm:ss", unit: moment.SECOND },
    // 'sss': { format: "YYYY-MM-DD HH:mm:ss.SSS", unit: moment.MILLISECOND }
  };
  var slideDuration = undefined;
  var slideTsFormat = undefined;
  var slideDurationUnit = undefined;

  //Valid duration units can be Hour, Minute, Seconds, MilliSecons
  this.accumulateTill = function(duration, unit) {
    if(!duration) {
      throw new Error("Invalid arguments passed for accumulation");
    } else {
      //Parsing to ensure this is always a absolute value and not a floating value
      slideDuration = parseInt(duration);

      if(!unit) {
        unit = 'ss'; //Default unit is seconds
      }

      unit = unit.toLowerCase();
      var s = lookup[unit];
      if(s !== undefined) {
        slideTsFormat = s.format;
        slideDurationUnit = s.unit;
      } else {
        throw new Error("Unit is invalid, valid values are 'HH'->Hour, 'MM'->Minute, 'SS'->Seconds, 'SSS'->Milili Seconds");
      }
    }
    return;
  };

  this.collectData = function(usrRecord) {
    if(!usrRecord) {
      return false;
    }

    //Stamping the current date time for each incoming record
    var slotObj = { rec: usrRecord, ts: moment().format(slideTsFormat) };

    if(slideWindowStart == undefined || slideWindowEnd == undefined) {
      //set the time when the accumulating should shift or slide to next timewindow
      slideWindowStart = slotObj.ts;
      slideWindowEnd   = moment(slideWindowStart).add(slideDuration, slideDurationUnit).format(slideTsFormat);
      console.log("Time acccumulate windows is ", slideWindowStart, " to ", slideWindowEnd);
    }

    pushToBucket(slotObj);

    //check if collection is now complete
    if(slotObj.ts > slideWindowEnd) {
      //SlidingWindow Time Has reached
      var slotIdsToRemove = [];
      var slotRecordsToFlush = [];
      var accumulatedSlots = {};

      //loop through timeBucket to create new array of records, which can be returned
      for(slotId in timeBucket) {
        if(slotId >= slideWindowStart && slotId < slideWindowEnd) {
          // accumulatedSlots[slotId] = timeBucket[slotId]
          slotObjsArray = timeBucket[slotId];
          for(i = 0; i < slotObjsArray.length; i++) {
            slotObj = slotObjsArray[i];
            slotRecordsToFlush.push(slotObj.rec);
          }
        }

        if (slotId <= slideWindowStart) {
          slotIdsToRemove.push(slotId);
        }
      }

      // console.log(slotIdsToRemove.length, " number of slots will be removed");
      for(i =0; i < slotIdsToRemove.length; i++) {
        slotId = slotIdsToRemove[i];
        // console.log("Slot for ", slotId, " is deleted");
        delete timeBucket[slotId];
      }

      //Redadjust the window by Increment the start and end by one unit
      slideWindowStart = moment(slideWindowStart).add(1, slideDurationUnit).format(slideTsFormat);
      slideWindowEnd   = moment(slideWindowEnd).add(1, slideDurationUnit).format(slideTsFormat);

      // console.log("The new time acccumulate windows is ", slideWindowStart, " to ", slideWindowEnd);

      return slotRecordsToFlush;
      // return accumulatedSlots;
    }

    return false;
  };

  //=== Internal methods =====

  function pushToBucket (slotObj) {
    //Check which slot this record should go to and place the record in that slot
    // console.log(slotObj.ts, " - ", slotObj.rec);
    var timeSlotId = slotObj.ts;
    // console.log("Trying to push record:", slotObj);
    //Check if the slot exists already
    if(!timeBucket[timeSlotId]) {
      //if no records in this slot exists until now, initilise it with a empty array
      timeBucket[timeSlotId] = [];
    }

    timeBucket[timeSlotId].push(slotObj);

    return;
  }
}

module.exports = TimeAccumulator;
