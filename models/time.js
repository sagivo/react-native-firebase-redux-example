import moment from 'moment';

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s",
    s:  "now",
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1 month",
    MM: "%d months",
    y:  "1y",
    yy: "%dy"
  }
});

export default moment;