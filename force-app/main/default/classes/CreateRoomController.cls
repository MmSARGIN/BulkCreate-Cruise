public with sharing class CreateRoomController {
   @AuraEnabled(cacheable=true)
   public static List<Cruis_ship__c> createRoom(){
    try {
        List<Cruis_ship__c> rooms = [SELECT Name FROM Cruis_ship__c];
        return rooms;
        
    } catch (Exception e) {
        throw new AuraHandledException('Olmadı Kanks'); 
    }
    
   }

   @AuraEnabled(cacheable=true)
   public static List<Room_Type__c> getRoomType(){
       try {
        List<Room_Type__c> takeRoom = [SELECT Name FROM Room_Type__c];
           return takeRoom;
       } catch (Exception e) {
           throw new AuraHandledException('olmadı kanks');
       }
   }

   @AuraEnabled
   public static List<Room_Number__c> sendRoom(String id ,Integer many, Integer capacity, Double price, String roomid){
    try {
        List<Room_Number__c>  roomList = new List<Room_Number__c>(); 
        
        for(Integer i = 1; i <= many; i++){
            Room_Number__c newRoom = new Room_Number__c();
            newRoom.Capacity__c = capacity;
            newRoom.Cruise__c = id;
            newRoom.Passenger_Price__c = price;
            newRoom.Room_Type__c = roomid;

             roomList.add(newRoom);
        }
           
             insert roomList;
             System.debug(roomList);
             return roomList;

    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}
