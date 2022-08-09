import { LightningElement, track, wire } from 'lwc';
import createRoom from '@salesforce/apex/CreateRoomController.createRoom';
import sendRoom from '@salesforce/apex/CreateRoomController.sendRoom';
import getRoomType from '@salesforce/apex/CreateRoomController.getRoomType';


export default class CreateRoomComp extends LightningElement {
    cruise;
    roomData;
    room;
    //APEXE LAZIM OLAN PARAMETRELERİ BİR OBJEDE TOPLADIM
    props = {
        many: null,
        capacity : null,
        price : null,
        cruiseId : '',
        cruiseName: '',
        roomid :'',
        type: ''
    }

    //BURADA CRUİSELARIN İNFOSUNU ÇEKİYORUM PİCKLİSTE EKLEYECEĞİM 
    @wire(createRoom)
    takeData({ error, data }) {
      
      if (data) {
        console.log('Data', data);
        this.cruise = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }
    //BURADA ROOM TYPELARI ÇEKİYORUM PİCKLİSTE EKLEYECEĞİM 
    @wire(getRoomType)
    wiredData({ error, data }) {
      
      if (data) {
        console.log('Data', data);
        this.roomData = data;
      } else if (error) {
        console.error('Error:', error);
      }

     
    }
  
      //BURDA İNPUTA YAZILANLARI DEĞİŞKENLERİME ASSİGN EDİYORUM
    handleChange = (event) => {
       
        if(event.target.name === 'many'){
            this.props.many = event.target.value;
        }else if(event.target.name === 'capacity'){
            this.props.capacity = event.target.value;
        }else if(event.target.name === 'price'){
            this.props.price = event.target.value;
        }else if(event.target.name === 'type'){
            this.props.type = event.target.value;
        }else if(event.target.name === 'cruise'){
          this.props.cruiseName = event.target.value;
        }
       }

       //CLİCK BASILDIĞINDA, TEK TEK İNPUT BİLGİLERİNİ ALIP, APEXE PARAMETRE OLARAK GÖNDERİP, ROOM CREATELENİYOR.
    handleClick = () => {
      console.log(this.cruise);
        this.roomData.map((item) => {
          //BU VE BİR ALTINDAKİ MAP(1) : SEÇİLEN ROOM TYPE VE CRUİSENİN IDSİNİ ALIP PARAMETRE OLARAK GÖNDEREBİLMEMİ SAĞLIYO
          item.Name === this.props.type ? this.props.roomid = item.Id : 'Olmadı kanks';
        });
        this.cruise.map((i)=> {
          // (1)
          i.Name === this.props.cruiseName ? this.props.cruiseId = i.Id : 'Olmadı knkalar';
        })
        if(this.cruiseId !== ''){
          sendRoom({
              id :this.props.cruiseId,
              many : this.props.many,
              capacity : this.props.capacity,
              price : this.props.price,
              roomid : this.props.roomid,
             
              
          })
          .then((res) => console.log('response : ' , res))
          .catch((err) => console.log('error: ' , err));
        };

       


 }
    
        
    
      
        
    

}