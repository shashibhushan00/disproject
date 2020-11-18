module.exports = {
    uids: {
        fs: "d9ce25c4-2342-4b2b-8339-dc1024df40e4",
        client1: "",
        transactionKey: ""
    },
    create_UUID: () => {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}