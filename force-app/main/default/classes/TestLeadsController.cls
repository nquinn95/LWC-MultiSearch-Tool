public with sharing class TestLeadsController {

        @AuraEnabled
        public static List<Lead> getTestLeads(String searchTerm, String searchTerm2, String searchTerm3, String searchTerm4, String searchTerm5){
                String searchFirst = '%' + searchTerm + '%';
                String searchLast = '%' + searchTerm2 + '%';
                String searchEmail = '%' + searchTerm3 + '%';
                String searchPhone = '%' + searchTerm4 + '%';
                String searchCompany = '%' + searchTerm5 + '%';

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
                if(searchTerm5 != null){
                    if(searchTerm5 != null){
                        params.add('Company LIKE :searchCompany');
                    }
                }
    
                
                //return [SELECT Id, FirstName, LastName, Email, Company, Phone, MobilePhone FROM Lead WHERE FirstName LIKE :searchFirst AND LastName LIKE :searchLast AND Email LIKE :searchEmail AND Company LIKE :searchCompany AND Phone LIKE :searchPhone];

                String query; 

                if(params.size() > 0){
                    query = 'SELECT Id, FirstName, LastName, Email, Company, Phone, MobilePhone FROM Lead';
                    query += ' WHERE ' + String.join(params, ' AND ');
                }

                return Database.query(query);
                

        }
        

}
