    function checkIfNew(options, cb) {
      //options is {"tag": "div", parentNode: "document.querySelector(".parentClass")}

      "use strict";

      var parentNode = options.parent || document;

      var nodeList = parentNode.getElementsByTagName(options.tag);
      var tempList = [].slice.call(nodeList);

      function conditional() {

        var tempLength = tempList.length,
            nodeLength = nodeList.length,
            lastTemp = tempList[tempLength - 1],
            lastNode = nodeList[nodeLength - 1],
            condition = false;

            condition = tempLength === nodeLength ? false : true;
            //this check covers if an item is removed and added before timer fires
            condition = lastTemp === lastNode ? false : true;

            return condition;

      }

      function compareTemp() {

          if (conditional()) { //|| tempList[ tempList.length - 1 ] !== nodeList[ nodeList.length - 1 ]) {

            tempList = [].slice.call(nodeList);

            //may change to return diffs from a filter
            //added or removed
            cb(tempList);

          }

          window.requestAnimationFrame(compareTemp);

        }

      return {

        loopList: function() {

          window.requestAnimationFrame(compareTemp);

        },
        getCurrent: function() {

          return tempList;

        }

      };

    }
