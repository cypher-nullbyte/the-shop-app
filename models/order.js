import moment from "moment";

class Order {
    constructor(id,items,totalAmount,date)
    {
        this.id=id;
        this.items=items;
        this.totalAmount=totalAmount;
        this.date=date;
    }
    get readableDate(){
        // return this.date.toLocaleDateString('en-EN',{
        //     year:'numeric',
        //     month:'long',
        //     day:'numeric',
        //     hour:'2-digit',
        //     minute:'2-digit',
        // });
        //---------------The above one will not work in Android, cause RN engine for Android
        //doesn't suppor this 'toLocaleDateString' method of .js
        // INstall moment library instead
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;