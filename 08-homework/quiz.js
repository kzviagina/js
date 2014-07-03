var Quiz = {
    /**
     * Свойство в котором будем хранить ссылку на объект который отвечает за тег кнопки начала тесте
     */
    startButton     : null,
    /**
     * Свойство в котором будем хранить ссылку на объект который отвечает за тег div c id quiz-container
     */
    mainContainer   : null,
    /**
     * Свойство в котором будем хранить ссылку на объект который отвечает за тег div c id question-title.
     * Сюда мы будем вставлять наш вопрос.
     */
    titleContainer  : null,
    resultsContainer: null,
    /**
     * Свойство которое отвечает за возможность возврата к предыдущему вопросу
     */
    canGoBack       : false,
    /**
     * Индекс вопроса из свойства questions который сейчас отображается на экране
     */
    currentIndex    : 0,
    history         : [],
    mark            : 0,
    name            : '',
    /**
     * МАссив объектов вопросов
     */
    questions: [
        {
            question: 'What is your name?',
            answers : [],
            chosen  : [],
            multi   : true,
            canBeSkipped: false,
            canEnterAnswer: true

        },
        {
            question: 'What semantic tag is used to highlight the text?',
            answers : [
               '<text>', '<mark>', '<strong>', '<b>'
            ],
            correct : [1],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        },
        {
            question: 'Mark pseudo elements',
            answers : [
               ':hover', ':before', ':focus', ':after'
            ],
            correct : [1, 3],
            chosen  : [],
            multi   : true,
            canBeSkipped: false


        },
        {
            question: 'What rule is often used to write responsive css',
            answers : [
               '@responsive', '@adaptive', '@media', '@page'
            ],
            correct : [2],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        },
        {
            question: 'What property is required for :before?',
            answers : [
               'content', 'font-size', 'display'
            ],
            correct : [0],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        },
        {
            question: 'What position value is default?',
            answers : [
               'relative', 'static', 'absolute'
            ],
            correct : [1],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        }
    ],
    /**
     * Главный метод который вызывается при инциализации. Срабатывает на событие onload документа
     */
    init: function () {
        //сохраняем ссылку на this
        var self = this;

        //Получаем объект нашей кнопки
        this.startButton =  document.getElementById('start-button');

        //Вешаем обработчик на кнопку для начала теста
        this.startButton.addEventListener('click', function () {
            if (self.history.length === 0) {
                self.startQuiz();                
            } else {
                self.hideResults();
                self.startQuiz();                
            }
        }, false);

        //Вешаем обработчик на нажатие для кнопки перехода к следующему вопросу
        document.getElementById('next-btn').addEventListener('click', function () {
            self.goTo(1);
        }, false);

        //Вешаем обработчик на нажатие для кнопки возврата к предыдщему вопросу
        document.getElementById('back-btn').addEventListener('click', function () {
            self.goTo(-1);
        }, false);

        //Получаем ссылку на объект главного контейнера
        this.mainContainer      = document.getElementById('quiz-container');

        //Получаем ссылку на объект контейнера где будут выводится вопросы
        this.answersContainer   = document.getElementById('answers-container');

        //Получаем ссылку на объект где будет выводится сам вопрос
        this.titleContainer     = document.getElementById('question-title');

    },
    /**
     * Метод для начала опросника
     */
    startQuiz: function () {

        //Скрываем кнопку начала теста
        this.startButton.style.display = 'none';

        //Вызываем метод который выводит на экран вопрос
        this.showQuestion();

        //Вызываем метод который вставляет на страницу вопросы
        this.renderQuestion();

        //Отображаем наш главный контейнер
        this.mainContainer.style.display = 'block';
    },
    /**
     * Метод для отображения вопроса и вариантов ответа на него
     */
    renderQuestion: function () {
        var $ul = this.createAnswersList();
        this.answersContainer.appendChild($ul);
    },
    /**
     * Метод для показа вопроса
     */
    showQuestion: function () {
        this.titleContainer.innerHTML = this.questions[this.currentIndex].question;
    },
    /**
     * Метод для очищения контейнера с текущим вопросом. Используется при переключении вопросов.
     */
    removeQuestion: function () {
        this.answersContainer.innerHTML = '';
    },
    /**
     * Метод для отрисовки списка вариантов ответа
     * @returns {HTMLElement}
     */
    createAnswersList: function () {

        //Создаем тег списка для вставки в него списка ответов
        var $ul = document.createElement('UL'),
            //Переменная в которой будет на каждой итерации цкила хранится елемент списка
            $li,
            //Определяем какой тип инпута мы будет вставлять. Если вопрос с множественным выбором то checkbox если нет radio
            controlName = (this.questions[this.currentIndex].multi) ? 'checkbox' : 'radio',
            //Переменная в которой будет на каждой итерации цкила хранится елемент input
            $control,
            //Переменная в которой будет на каждой итерации цкила хранится елемент label для варианта ответа
            $label,
            //Переменная в которой будет на каждой итерации цкила хранится елемент текстовой ноды
            $text,
            //Переменная в которой хранится объект нашего вопроса. Просто для сокращения записи.
            question = this.questions[this.currentIndex];

        //Перебираем наши варианты ответов
        if (question.answers.length !== 0) {
            for (var i = 0; i < question.answers.length; i++) {

                //Создаем елемент списка
                $li = document.createElement('li');
                //Создаем елемент на который пользователь будет нажимать для выбора
                $control = document.createElement('input');
                //Ставим ему тип в зависимости от того мульти или нет
                $control.type = controlName;

                //Если можно отметить только один вариант ставим для radio одно и тоже значение name
                if (!question.multi && controlName == 'radio') {
                    $control.name = 'answer';
                }

                //Если мы уже отвечали на это вопрос и индекс ответа совпадает с индексов текущего вариана. Отображаем это.
                if (question.chosen.indexOf(i) != -1) {
                    $control.checked = "checked";
                }

                //Создаем элемент для вывода варианта
                $label = document.createElement('label');
                //Создаем текстовый узел с текстом вопроса
                $text = document.createTextNode(question.answers[i]);

                //Вставляем наш текст и наш input в тег label
                $label.appendChild($control);
                $label.appendChild($text);

                //Вставляем label в элемент списка li
                $li.appendChild($label);

                //Вставляем елемент списка в сам список
                $ul.appendChild($li);
            }
        } else {
            $li = document.createElement('li');
            $control = document.createElement('input');
            $control.type = 'text';
            $li.appendChild($control);
            $ul.appendChild($li);
        }

        //Возращаем из метода объект списка. На текущий момент список еще не вставлен в страницу. Он только в памяти существует.
        return $ul;
    },

    /**
     * Метод для переключения между вопросами.
     * @param direction Параметр который определяет на какой вопрос переключаемся. Значение 1 - вперед. -1 - назад
     * @returns {boolean}
     */
    goTo: function ( direction ) {
        //Переменная в которой хранится объект нашего вопроса. Просто для сокращения записи.
        var question        = this.questions[this.currentIndex],
            //Массив где будем хранить выбранные варианты ответа
            chosen          = [],
            enteredAnswer   = null;


        //В нашем контейнере находим все елементы которые отвечают за выбор пользователя
        var $inputs = this.answersContainer.getElementsByTagName('input');

        //Перебираем их
        for (var i = 0; i < $inputs.length; i++) {
            //Если элемент отмечен сохраняем выбор
            if ($inputs[i].checked) {
                //Сохраняем выбранный вариант ответа
                chosen.push(i);
            } else if (question.canEnterAnswer && $inputs[i].value !== '') {
                enteredAnswer = $inputs[i].value;
            }
        }
        

        //Если пользователь не выбрал ниодного варианта и вопрос не может быть пропущен говорим пользователю и непереключаем
        if (chosen.length == 0 && !question.canBeSkipped && enteredAnswer === null ) {
            alert('Question can\'t be skipped!');
            return false;
        }

        //Сохраняем варианты в объекте вопроса
        question.chosen = chosen;
        
        //Save name only if it is entered
        if (enteredAnswer !== null) {
            this.name = enteredAnswer;
        }
        
        //Если направление назад и мы на первом вопросе - останавливаем переключение
        if (direction == -1 && this.currentIndex == 0 ) {
            return false;
        }
        //If we can't go back 
        else if (direction == -1 && this.canGoBack == false ) {
            alert('You can\'t go back');
        }
        //Если мы на последнем вопросе и направление вперед - останавливаемся
        else if (direction == 1 && this.currentIndex == this.questions.length - 1) {
            //return false;
            this.finishQuiz();
        } else {
            //Устанавливаем значение нового текущего вопроса.
            this.currentIndex += direction;

            //Удаляем предыдущий вопрос
            this.removeQuestion();

            this.showQuestion();
            //Вставляем новый
            this.renderQuestion();

            return true;
        }
    },
    checkAnswers: function () {
        for (var i = 0; i < this.questions.length; i++) {
            if (typeof this.questions[i].correct !== 'undefined') {
                if (this.questions[i].chosen.toString() === this.questions[i].correct.toString()) {
                    this.mark++;
                }
            }
        }
    },
    showResults: function () {
        var $fragment = document.createDocumentFragment(),
            $p,
            $h2;
        
        this.resultsContainer = document.getElementById('results-container');
        
        $p = document.createElement('p');
        $h2 = document.createElement('h2');
        
        $h2.innerHTML = 'Dear ' + this.name + '!';

        switch (this.mark) {
            case 5:
                $p.innerHTML = 'Excellent! Your knowledge of html and css is great!';
                break;
            case 4:
                $p.innerHTML = 'Congratulations! Your knowledge of html and css is good!';
                break;
            case 3:
                $p.innerHTML = 'Not bad! Learn and you will achieve success!';
                break;
            case 2:
                $p.innerHTML = 'Badly! There are a lot of things to learn!';
                break;
            case 1:
                $p.innerHTML = 'Awfully! You need to learn too much!';
                break;
            case 0:
                $p.innerHTML = 'Absolutely awfull! Are you sure that you know html and css?';
                break;
        }
        $fragment.appendChild($h2);
        $fragment.appendChild($p);
        this.resultsContainer.appendChild($fragment);

        //Hide questions block
        this.mainContainer.style.display = 'none';
        //Show results block
        this.resultsContainer.style.display = 'block';
        //Show button
        this.startButton.innerHTML = 'Try once more';
        this.startButton.style.display = 'inline-block';
        
    },
    Result: function (name, mark) {
        this.name = name;
        this.mark = mark;
    },
    finishQuiz: function() {
        var resultItem;
        
        this.checkAnswers();
        this.showResults();
        
        //Save data
        resultItem = new this.Result(this.name, this.mark);
        this.history.push(resultItem);
        
        console.log(this.history);
        
        //Clear all history
        this.mark = 0;
        this.currentIndex = 0;
        this.removeQuestion();
        for (var i = 0; i < this.questions.length; i++) {
            this.questions[i].chosen = [];
        }

    },
    hideResults: function () {
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.style.display = 'none';
    }
};