public with sharing class TestTasksController {

    @AuraEnabled
    public static List<Task> getTaskList(String searchTerm){


        
        String subjectSearch = '%' + searchTerm + '%';


        String[] params = new String[0]; 

        if(searchTerm != null){
            if(searchTerm != ''){
                params.add('Subject LIKE :subjectSearch');
            }
        }

        String query;

        if(params.size() > 0){
            query = 'SELECT Id, Subject, Status, ActivityDate, What.Name, Who.Name, Owner.Name FROM  Task';
            query += ' WHERE ' + String.join(params, ' AND ');
        }

        return Database.query(query); 
    }

}
