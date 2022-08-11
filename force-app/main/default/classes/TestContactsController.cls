public with sharing class TestContactsController {
    
        @AuraEnabled
        public static List<Contact> getContactList(String searchTerm, String searchTerm2, String searchTerm3, String searchTerm4){
            //the % lets us make it so that the regex around search term can be anything, but as long as the searchtterm is in sequence 
            String searchFirst = '%' + searchTerm + '%';
            String searchLast = '%' + searchTerm2 + '%';
            String searchEmail = '%' + searchTerm3 + '%';
            String searchPhone = '%' + searchTerm4 + '%';

            String[] params = new String[0];

            if (searchTerm != null){
                if(searchTerm != ''){
                params.add('FirstName LIKE :searchFirst');
                }
            }
            if(searchTerm2 != null){
                if(searchTerm2 != ''){
                params.add('LastName LIKE :searchLast');
                }
            }
            if(searchTerm3 != null){
                if(searchTerm3 != ''){
                params.add('Email LIKE :searchEmail');
                }
            }
            if(searchTerm4 != null){
                if(searchTerm4 != ''){
                params.add('Phone LIKE :searchPhone');
                }
            }

            System.debug(params);


            // //for every contact testCon, get each element of contact where some part of the name has test inside of it
            // return [SELECT Id, FirstName, LastName, Email, AccountId, Account.Name, Phone, MobilePhone, OtherPhone FROM Contact 
            // WHERE FirstName LIKE :searchFirst AND LastName LIKE :searchLast AND Email LIKE :searchEmail AND Phone LIKE :searchPhone];

            String query; 

            if(params.size() > 0){
                query = 'SELECT Id, FirstName, LastName, Email, AccountId, Account.Name, Phone, MobilePhone, OtherPhone FROM Contact';
                query += ' WHERE ' + String.join(params, ' AND ');
            }

            return Database.query(query);
            


        }

}