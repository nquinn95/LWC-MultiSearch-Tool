public with sharing class TestCreateNewTaskController {
    
    @AuraEnabled
    public static void createNewTask(String taskSubject, String taskStatus, String contactId, String userId, String accId, String taskPriority, Integer taskDueDate){

        Task newTask = new Task();

        //assign subject, status, priority, whoId, whatId, OwnerId, Due Date
        //add functionality so that we can add a whatId and OwnerId as well



        //whoid = contact and lead task is assigned to
        //whatid = account that the task is associated with
        //ownerId = user that the task is assigned to

        newTask.Subject = taskSubject;
        newTask.Status = taskStatus;
        newTask.Priority = taskPriority;
        newTask.WhoId = contactId; 
        newTask.OwnerId = userId;
        newTask.WhatId = accId;
        newTask.ActivityDate = Date.today() + taskDueDate;

        insert newTask; 

    }

}
