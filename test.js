const _svm = require("./svm");

let data = [[1,2,3], [5,6,7], [2,1,3], [6,7,5]];
let labels = [-1, 1, -1, 1];

let svm = new _svm.SVM();
svm.train(data, labels, {kernel: "rbf"});

console.log(svm.predict([[2,3,1], [7,5,6], [1,1,1], [6,7,5], [1,2,3]]));