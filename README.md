maths-problems.js
==

maths-problems allows you to generate random maths questions with answers that can be validated.

See examples/addition-example.js for a basic example usage.

Problems
--
    problemSchema = {
      "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
      "answer" : ["{x}+{y}"],
      "answerFormat" : "0"
    }

**question** = The question text that will appear to the student after replacing variables (declared within curly brackets {}) with numeric values returned by the [mathjs](http://mathjs.org) function.

**answer** = The answer field is an array of strings representing formulas to calculate the answer to each part of the question. Variables can be referenced by their name within curly brackets ({}).

**answerFormat** = Format the answer should be written in where each integer refers to an index in the _answers_ array. For example, "0" => the value of "{x}+{y}" after evaluated. We can use this to add units or algebraic variables eg. "0 cm" or "0x".

Questions
--
Problems are used to generate questions, an example Question object:

    questionSchema = {
        "text" : "What is 5 + 4?",
        "variables" :
          [{
            "name":"x",
            "value": 5
          },
          {
            "name":"y",
            "value":4
          }]
    }

**text** = The actual question text to show to the student. A Problem's _question_ with variable values added.

**variables** = An array of variables each with a name and value. In this case the value is the output of the mathjs function _randomInt(1,10)_.
