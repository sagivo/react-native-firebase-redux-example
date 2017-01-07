import moment from 'moment';

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s",
    s:  "s",
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1 month",
    MM: "%d months",
    y:  "a year",
    yy: "%d years"
  }
});

export default moment;