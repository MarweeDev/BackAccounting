class usersRepository {
    getCurrentTimestamp() {
        const currentDate = new Date();  // Esto obtiene la fecha y hora actual en la zona horaria local del cliente
        
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

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

module.exports = usersRepository;