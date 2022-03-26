const swapStrikers = (data) => {
    var temp = data.striker;
    data.striker=data.nonStriker;
    data.nonStriker=temp;
}

export default swapStrikers;