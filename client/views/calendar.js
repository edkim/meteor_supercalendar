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
	'click .set-avail-btn': function(event, t) {
		var data = t.data;
		data.available = true;
		data.instructor = $('.instructor-select')[0].value; //Super hacky. Should put this select dropdown inside a form
		Meteor.call("setAvail", data)
	},
	'click .set-unavail-btn': function(event, t) {
		var data = t.data;
		data.available = false;
		data.instructor = $('.instructor-select')[0].value; //Super hacky. Should put this select dropdown inside a form
		
		Meteor.call("setAvail", data)
	}	
});