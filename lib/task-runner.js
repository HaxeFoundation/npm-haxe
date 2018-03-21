var path = require('path');

var TaskRunner = function(){
    this.taskList = [];
    this.currentTaskIndex = 0;
    this.run = function () {
       var exitTask = {
           run: function () {
               console.log("END");
               process.exit(0);
           }
       };
      this.addTask(exitTask);
      this.taskList[0].run(this.delegate(this));
   };

   this.addTask = function (task) {
        this.taskList.push(task);
    };

     this.delegate = function(self){
        return function () {
            self.currentTaskIndex++;
            self.taskList[self.currentTaskIndex].run(self.delegate(self));
        };
     }
}
module.exports.TaskRunner = TaskRunner;