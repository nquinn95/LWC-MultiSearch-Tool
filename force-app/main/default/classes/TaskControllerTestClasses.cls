@isTest
public class TaskControllerTestClasses{


    @isTest static void getTaskList(){

        Contact dummyContact = new Contact(firstname='Dummy', lastname='Test', email='test@email.com');
        insert dummyContact;

        Account dummyAccount = new Account(name='Dummy Account');
        insert dummyAccount;


        Task dummyTask = new Task(subject='Test', status='New', priority='High', whoId= dummyContact.Id, whatId= dummyAccount.Id, ownerId= '0051100000GKFV2AAP', activitydate= Date.today());
        insert dummyTask;


        List<Task> task_list = TestTasksController.getTaskList('Test');

        System.assert(task_list.size()>0, 'No Tasks found');
    }

    @isTest static void createNewTask(){

        Contact dummyContact = new Contact(firstname='Dummy', lastname='Test', email='test@email.com');
        insert dummyContact;

        Account dummyAccount = new Account(name='Dummy Account');
        insert dummyAccount;
        

        String contactId = '' + dummyContact.Id;
        String accId = '' + dummyAccount.Id; 




        TestCreateNewTaskController.createNewTask('Test', 'In Progress', contactId, '0051100000GKFV2AAP', accId, 'Medium', 7);

         List<Task> searchTask = [SELECT Id, Subject, Status, ActivityDate, What.Name, Who.Name, Owner.Name FROM Task WHERE Subject = 'Test'];

        System.assert(searchTask.size()>0, 'Task was not created');

    }
}