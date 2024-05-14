import { IIngredientType } from "../../types/burger"

export const findItem = (arr: any[], pathName: string) => {
   // console.log('arr==',arr);
   // console.log('pathName', pathName);
    return  arr.find(el => el._id === pathName)
  }
  export const getPrice = (arr: IIngredientType[]) => {
    let total = 0
    arr.forEach(item => total = total + item.price)
    return total
}

const dropHMS=(date:Date)=>{
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
}

export const showDateTime=(dateTime:string)=>{
    let today = new Date(),           // присвоение и форматированние текущей даты
     yesterday = new Date(),             // присвоение и форматирование текущей даты - 1 день
    roomLastMessageDate = new Date(dateTime);           // присвоение и форматирование даты последнего сообщения комнаты

yesterday.setDate(today.getDate() -1);
let hours = roomLastMessageDate.getHours();
let minutes=roomLastMessageDate.getMinutes();

if (dateTime) {   
    if (dropHMS(today) === dropHMS(roomLastMessageDate) ) {                                                                
        return`Сегодня, ${hours}:${minutes>9?minutes:'0'+minutes}`                                                                              
    } else if (dropHMS(yesterday)  === dropHMS(roomLastMessageDate) ) {                                                     
        return `Вчера, ${hours}:${minutes>9?minutes:'0'+minutes}`                                                                                
    } else {                                                                                            
        return roomLastMessageDate;                                                                     
    }
}

}