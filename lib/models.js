Calendar = new Meteor.Collection('calendar');

Meteor.methods({
	setBusy: function(data) { //Do this for the next 52 weeks

		var values = {
			title: "Busy",
			start: data.start,
			end: data.end,
			allDay: false,
			description: "Availability",
			instructor_id: data.instructor_id
		} 

		data.parent_id = Calendar.insert(values);

		Meteor.call("setBusyRecurring", data);
	},
	setBusyRecurring: function(data) {
		/* Creates calendar events on the same day of week for the next 51 weeks 
		   with a parentId linking to original event */
		var values = {
			title: "Busy",
			allDay: false,
			description: "Availability",
			instructor_id: data.instructor_id,
			parent_id: data.parent_id
		}

		for (var i = 1; i<52; i++) { 
			var nextStart = new Date(data.start);
			var nextEnd = new Date(data.end);
			nextStart.setDate(data.start.getDate() + 7 * i);
			nextEnd.setDate(data.end.getDate() + 7 * i); // i weeks into the future

			values.start = nextStart;
			values.end = nextEnd;

			Calendar.insert(values);
		}
	},
	deleteEvent: function(id) {
		Calendar.remove( { parent_id: id });
		Calendar.remove( { _id: id });
	}
});