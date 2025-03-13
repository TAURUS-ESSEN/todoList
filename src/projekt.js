'use strict';
export function Test(value) {
   return value + 2;
}

export class TaskConstructor {
    constructor (taskid, taskName, taskDesc, taskProjekt, taskPriority, taskStatus) {
    this.id = taskid.toString();
    this.name = taskName;
    this.description = taskDesc;   
    this.status = taskStatus;
    this.priority = taskPriority;
    }
}