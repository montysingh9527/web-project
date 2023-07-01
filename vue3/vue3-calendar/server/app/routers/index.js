'use strict';
module.exports = app => {
    const { router, controller } = app;
    router.post('/api/calendar/day', controller.calendar.day);
    router.post('/api/calendar/month', controller.calendar.month);
    router.post('/api/calendar/year', controller.calendar.year);
};
