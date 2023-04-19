import moment from 'moment';

function displayDateDifference (startDate, endDate) {
  const diff = moment.duration(moment(endDate).diff(moment(startDate)));

  if (diff.asSeconds() < 3600) {
    console.log(diff.asMinutes().toFixed(0) + ' minutes');
  } else if (diff.asSeconds() < 86400) {
    const hours = Math.floor(diff.asHours());
    const minutes = Math.floor(diff.asMinutes() - (hours * 60));

    console.log(hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' hours');
  } else {
    console.log(diff.asDays().toFixed(0) + ' days');
  }
}

export default displayDateDifference;
