Calendar = new Meteor.Collection('calendar');

Meteor.methods({
    addEvent: function (rawFormData) {
        var validationObject = Mesosphere.newEvent.validate(rawFormData);
        if (validationObject.errors) {
            return;
        }

        var formData = validationObject.formData,
            date = formData.date.split('-'),
            allDay = formData.time !== 'has-time',
            time = allDay ? null : formData['time-value'].split(':');

        date = new Date(date[0], date[1] - 1, date[2]);
        if (time) {
            date = new Date(date.setHours(time[0], time[1]));
        }

        var values = {
            title: formData.title,
            start: date,
            allDay: allDay,
            description: formData.description
        };
        Calendar.insert(values);
    },
    setAvail: function(data) {
        var values = {
            title: data.available ? "Available" : "Busy",
            start: data.start,
            end: data.end,
            allDay: false,
            description: "Availability",
            instructor: data.instructor
        }

        Calendar.insert(values);
    },
    deleteEvent: function(data) {
    	Calendar.remove( { _id: data._id })
    }
});