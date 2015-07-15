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

Template.event_details.events({ //WHY NOT WORKING????
	'click .delete-event-btn': function(event, t) {

		AntiModals.dismissAll();
		Meteor.call("deleteEvent", t.data._id);
	}
});