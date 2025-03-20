'use strict';
export function Test(value) {
    return value + 2;
}

export class TaskConstructor {
    constructor (taskid, taskName, taskDesc,   taskPriority, taskStatus, taskDate) {
    this.id = taskid.toString();
    this.name = taskName;
    this.description = taskDesc;   
    this.status = taskStatus;
    this.priority = taskPriority;
    this.date = taskDate;
    }
}

export class projektConstructor {
    constructor (projektId, projektName, projektDesc, projektTasks) {
    this.id = projektId.toString();
    this.name = projektName;
    this.description = projektDesc;   
    this.tasks = projektTasks;
    }
}