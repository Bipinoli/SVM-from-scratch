const _svm = require("./svm");

class MultiClass_SVM {
    constructor(num_classes) {
        this.num_classes = num_classes;
        this.svms = [];
        for (let i=0; i<this.num_classes; i++) 
            this.svms.push(new _svm.SVM());
    }

    train(data, label) {
        // one vs all approach of multiclass classification
        
        // train each one vs all svm separately
        for (let i=0; i<this.num_classes; i++) {

            let cur_label = i+1;

            let new_label = [];
            for (let i=0; i<label.length; i++) {
                if (label[i] == cur_label) 
                    new_label.push(1);
                else 
                    new_label.push(-1);
            }

            this.svms[i].train(data, new_label, {kernel: "rbf"});
        }
        
    }

    predictOne(data) {
        let predictions = [];

        for (let i=0; i<this.num_classes; i++) 
            predictions.push(this.svms[i].predictOne(data));


        // selection rule heuristic:
        // 1. if there is only one positive prediction than that is the answer
        // 2. if there are more than one positive prediction than the one with highest positive value is the answer
        // 3. if thre is no positive prediction the highest value is the prediction
        
        let max = predictions[0];
        let max_index = 0;
        for (let i=0; i<predictions.length; i++) {
            if (predictions[i] > max) {
                max = predictions[i];
                max_index = i;
            }
        }
        return max_index + 1;
    }
};


exports.SVM = MultiClass_SVM;