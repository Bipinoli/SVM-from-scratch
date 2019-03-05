module.exports = {
    shuffleArray: 
        function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        },
    trainTestSplit: 
        function (array, train_frac, test_frac) {
            let border = Math.floor(((train_frac/(test_frac + train_frac)) * array.length));
            train_array = [];
            test_array = [];
            for (let i=0; i<array.length; i++) {
                if (i < border)
                    train_array.push(array[i]);
                else 
                    test_array.push(array[i]);
            }
            return [train_array, test_array];
        }
}