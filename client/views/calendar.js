Template.calendar.rendered = function () {
	return SuperCalendar.rendered.call(this);
};

Template.new_event_modal.events({
	'click input[type=radio]': function (event, t) {
		var $timeInput = t.$('#time-input');

		if (event.target.value === 'has-time') {
			return $timeInput.show();
		}

		return $timeInput.hide();
	}
});

Template.availability_modal.events({

	//Most code in set avail is shared, combine?
	'click .set-avail-btn': function(event, t) {
		var data = t.data;
		data.available = true;
		data.instructor = $('.instructor-select')[0].value; //Super hacky. Should put this select dropdown inside a form
		AntiModals.dismissAll();
		Meteor.call("setAvail", data);
	},
	'click .set-unavail-btn': function(event, t) {
		var data = t.data;
		data.available = false;
		data.instructor = $('.instructor-select')[0].value; //Super hacky. Should put this select dropdown inside a form
		AntiModals.dismissAll();
		Meteor.call("setAvail", data);
	}
});

Template.event_details.events({ //WHY NOT WORKING????
	'.click .delete-event-btn': function(event, t) {
		console.log('dlege button clicked', t)
		AntiModals.dismissAll();
		Meteor.call("deleteEvent", data);
	}
});