(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
            <input type="checkbox" name="question${questionNumber}${letter}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}</button>
            </label>`     
          );
          
        }

        // この質問とその回答を出力に追加します
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
            <br>
            <div class="kaisetu"> ${currentQuestion.kaisetu} </div>
            </br>
            </div>`
        );
        
      }
      
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');

    // クイズから回答コンテナを収集します
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    });
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // 解答を評価して結果を表示
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    // 正答した質問の数を表示
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }


  function hidokaisetu(n){
    kaisetu[n].style.display = 'none';
    }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
      answersButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
      answersButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'none';
      answersButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
      answersButton.style.display = 'inline-block';
    }
    hidokaisetu(currentSlide);
  }


  function showNextSlide() {    
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function showanswers() {
    kaisetu[currentSlide].style.display = 'inline-block';
    const answerContainers = quizContainer.querySelectorAll('.answers');
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      if ( currentSlide  == questionNumber ) {
          const answerContainer = answerContainers[questionNumber];
          var answers = "";
          for(letter in currentQuestion.answers){
           const selector = `input[name="question${questionNumber}${letter}"]:checked`;
           const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if(userAnswer!=　null ){
             answers += userAnswer;
            }
          }
          // 解答を評価して結果を表示
          if(answers === currentQuestion.correctAnswer){
            //文字 緑
            answerContainers[questionNumber].style.color = 'lightgreen';       
          }
          else{
            // 文字赤
            answerContainers[questionNumber].style.color = 'red';
          }
      }
    });
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  
  
  const myQuestions = [
    {
      question: "コンピューティングワークロードが変動するアプリケーションにとって、AWS が従来型データセンターよりも経済的であるのはなぜですか。",
      answers: {
        a: "Amazon EC2 の利用料金は毎月請求される。",
        b: "ユーザーは常に、自分の Amazon EC2 インスタンスに対するフル管理アクセス権限を付与される。",
        c: "Amazon EC2 インスタンスは、必要に応じて起動できる。",
        d: "ユーザーは、ピーク時間帯のワークロードを処理するのに十分な数のインスタンスを常に実行できる。"
      },
      correctAnswer:"a",kaisetu:"解説1"
    },
    {
      question: " データベースを AWS に移行するプロセスを簡素化するには、どの AWS サービスを使用すればよいですか。",
      answers: {
        a: "AWS Storage Gateway",
        b: "AWS Database Migration Service (AWS DMS)",
        c: "Amazon EC2"
      },
      correctAnswer: "b",kaisetu:"解説2"
    },
    {
      question: "ソフトウェアソリューションを探して購入し、AWS 環境ですぐに使い始めるには、どの AWS サービスを使用すればよいですか。 ",
      answers: {
        a: "AWS Config",
        b: "AWS OpsWorks",
        c: "AWS SDK",
        d: "AWS Marketplace"
      },
      correctAnswer: "d",kaisetu:"解説3"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  const answersButton = document.getElementById("answers");
  const kaisetu = document.querySelectorAll(".kaisetu");

  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  answersButton.addEventListener("click", showanswers);
})();