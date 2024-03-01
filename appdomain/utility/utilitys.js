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

    getGenerateCodeOrder(codeLength) {
        console.log("contar: ", codeLength)
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = "0123456789";
        let randomCodeChar = '';
        let randomCodeInt = '';

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCodeChar += characters.charAt(randomIndex);
        }
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            randomCodeInt += numbers.charAt(randomIndex);
        }

        return randomCodeChar + randomCodeInt + "-" + codeLength;
    }
}

module.exports = utilitys;