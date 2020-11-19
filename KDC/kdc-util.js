const transactionKey = "d9ce25c4-2342-4b2b";

module.exports = {
    uids: {
        fs: "d9ce25c4-2342-4b2b-8339-dc1024df40e4",
        client1: "client1",
        client2: "client2",
        client3: "client3",
        clientPassword: "1234",
        transactionKey: "d9ce25c4-2342-4b2b"
    },
    create_UUID: () => {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    },
    checkTransaction: (id) =>{
        if(id == transactionKey)
            return true;
        else 
            return false; 
    }
}