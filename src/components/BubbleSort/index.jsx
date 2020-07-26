const BubbleSort = (orgArray, sortIndex) => {
    var isSorted = false;
    var sortCount = 0;
    var tempArray = orgArray;

    while(!isSorted) {
        isSorted = true;

        for(let i = 0; i < orgArray.length - sortCount - 1; i++) {
            if(tempArray[i][sortIndex] > tempArray[i+1][sortIndex]) {
                let temp = tempArray[i+1];
                tempArray[i+1] = tempArray[i];
                tempArray[i] = temp;

                isSorted = false;
            }
        }

        sortCount++;
    }

    return tempArray;
}

export default BubbleSort;