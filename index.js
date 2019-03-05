const csvModule = require("read-csv-json");
const _svm = require("./multiclass_svm");


const {shuffleArray, trainTestSplit} = require("./helper");




let fieldsName = ["sepal_length","sepal_width","petal_length","petal_width","species"];

let csvRead = new csvModule("./iris.csv", fieldsName);


function main(jsonData) {

    shuffleArray(jsonData);

    let species_map = {"virginica": 1, "versicolor": 2, "setosa": 3};
    let reverse_species_map = {1: "virginica", 2: "versicolor", 3: "setosa"};

    let datasets = [];
    let labels = [];

    for (let i=1; i<jsonData.length; i++) {
        let datum = [jsonData[i].sepal_length, jsonData[i].sepal_width, jsonData[i].petal_length, jsonData[i].petal_width];
        let label = species_map[jsonData[i].species];

        datum = [parseFloat(datum[0]), parseFloat(datum[1]), parseFloat(datum[2])];

        if (datum && label) {
            datasets.push(datum);
            labels.push(label);
        }
    }


    let data_split = trainTestSplit(datasets, 6, 4);
    let label_split = trainTestSplit(labels, 6, 4);


    let train_data = data_split[0];
    let train_labels = label_split[0];
    let test_data = data_split[1];
    let test_labels =  label_split[1];



    // train multiclass SVM classifier
    let svm = new _svm.SVM(3);
    svm.train(train_data, train_labels);

    // test with the test data
    let right = 0;
    let wrong = 0;
    for (let i=0; i<test_data.length; i++) {

        let pred = svm.predictOne(test_data[i]);
        console.log(" actual : %s,   predicted: %s", reverse_species_map[test_labels[i]], reverse_species_map[pred]);

        if (pred == test_labels[i])
            right++;
        else 
            wrong++;
    }

    console.log("right: %d, wrong %d", right, wrong);
    console.log("accuracy: %f\%", (right/(right+wrong)) * 100) ;
}


csvRead.getCSVJson().then(function(result){
    main(result);

  },function(err){
    console.log('err: ', err)
  });