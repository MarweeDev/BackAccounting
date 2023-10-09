class utilitys {
    getCurrentTimestamp() {
        const currentDate = new Date(); 
        
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const Milliseconds = String(currentDate.getMilliseconds()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${Milliseconds}Z`;
        
        return formattedDate;
    }

    getGenerateCodeOrder(count) {
        if(count == 0){
            count = 1;
        }

        const currentDate = new Date();
        const year = String(currentDate.getFullYear()).slice(-2);
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        const codigo = `${year}${month}${day}-${count}`;
        return codigo;
    }
}

module.exports = utilitys;