const watchTaskProvider = require('../watchlisttasks/watchlisttaskprovider');
const taskErrorHandler = require('./taskerrhandler');

const logger = require('../../applogger');

var taskProcessor = function() {

    this.processNewTask = function(watchTask) {
        //Processing of the task involves 
        //Initialize the task object based on the specified type and pass the variables for construction
        //call doTask on it

        var taskModule = watchTaskProvider.getProvider(watchTask.type);
        if (taskModule === undefined) {
            throw new Error("Unregistered watch task of type ", watchTask.type);
        }

        setImmediate(function() {
            try {
                logger.debug("Starting task of type ", watchTask.type,
                    " for watchlist: ", watchTask.watchName,
                    " of organisation: ", watchTask.orgsite,
                    " subscribing to: ", watchTask.subFrom,
                    " publishing to: ", watchTask.pubTo);

                var task = new taskModule(watchTask.subFrom, watchTask.pubTo, watchTask.payload);
                task.doTask();

            } catch (err) {
                logger.error("Error in executing Task ", watchTask.type);

                taskErrorHandler.handleError(err, watchTask);
            }
        });

        return;
    }
}

module.exports = taskProcessor;