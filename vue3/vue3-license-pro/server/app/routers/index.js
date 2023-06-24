'use strict';
module.exports = app => {
    const { router, controller } = app;
    router.post('/query', controller.license.test);
};
