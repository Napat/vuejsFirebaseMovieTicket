const pushToArray = (seat, currentSelectSeats) => {
    const idOfSelectSeatsBuf = currentSelectSeats.map(s => s.id)
            const idcheck = idOfSelectSeatsBuf.indexOf(seat.id)

            if (idcheck === -1){
                //if not available(-1) then add new object to array buf
                currentSelectSeats.push(seat)
            } else{
                //if available then delete object from array buf
                currentSelectSeats.splice(idcheck, 1)
            }
}

export { pushToArray }
