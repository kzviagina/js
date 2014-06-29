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
    /**
     * Свойство которое отвечает за возможность возврата к предыдущему вопросу
     */
    canGoBack       : true,
    /**
     * Индекс вопроса из свойства questions который сейчас отображается на экране
     */
    currentIndex    : 0,
    /**
     * МАссив объектов вопросов
     */
    questions: [
        {
            //Имя вопроса
            question: 'What is your name',
            //Варианты ответов на вопрос
            answers : [
               "Ivan", 'Dima', "Sergei"
            ],
            //Массив индексов ответов. Будет заполнен если пользователь уже ответил на вопрос.
            chosen  : [],
            //Свойство которое говорит можно ли выбирать один или несколько вопросов
            multi   : true,
            //Свойство которое говорит можно ли пропустить вопрос
            canBeSkipped: false

        },
        {
            question: 'Where do you live?',
            answers : [
               "Home", 'Work', "Train station"
            ],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        },
        {
            question: 'Do you like javascript?',
            answers : [
               "Yes", 'No', "I don't know"
            ],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        }
    ],
    /**
     * Главный метод который вызывается при инциализации. Срабатывает на событие onload документа
     */
    init: function () {
        console.log('Quiz inited');

        //сохраняем ссылку на this
        var self = this;

        //Получаем объект нашей кнопки
        this.startButton =  document.getElementById('start-button');

        //Вешаем обработчик на кнопку для начала теста
        this.startButton.addEventListener('click', function () {
            self.startQuiz();
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

        //console.log('Quiz started');
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
        console.log(this.currentIndex);
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
        for (var i = 0; i < question.answers.length; i ++ ) {

            //Создаем елемент списка
            $li             = document.createElement('li');
            //Создаем елемент на который пользователь будет нажимать для выбора
            $control        = document.createElement('input');
            //Ставим ему тип в зависимости от того мульти или нет
            $control.type   = controlName;

            //Если можно отметить только один вариант ставим для radio одно и тоже значение name
            if (!question.multi && controlName == 'radio') {
                $control.name = 'answer';
            }

            //Если мы уже отвечали на это вопрос и индекс ответа совпадает с индексов текущего вариана. Отображаем это.
            if ( question.chosen.indexOf(i) != -1 ) {
                $control.checked = "checked";
            }

            //Создаем элемент для вывода варианта
            $label = document.createElement('label');
            //Создаем текстовый узел с текстом вопроса
            $text  = document.createTextNode(question.answers[i]);

            //Вставляем наш текст и наш input в тег label
            $label.appendChild($control);
            $label.appendChild($text);

            //Вставляем label в элемент списка li
            $li.appendChild($label);

            //Вставляем елемент списка в сам список
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
        var question    = this.questions[this.currentIndex],
            //Массив где будем хранить выбранные варианты ответа
            chosen      = [];


        //В нашем контейнере находим все елементы которые отвечают за выбор пользователя
        var $inputs = this.answersContainer.getElementsByTagName('input');

        //Перебираем их
        for (var i = 0; i < $inputs.length; i++) {
            //Если элемент отмечен сохраняем выбор
            if ($inputs[i].checked) {
                //Сохраняем выбранный вариант ответа
                chosen.push(i);
            }
        }

        //Если пользователь не выбрал ниодного варианта и вопрос не может быть пропущен говорим пользователю и непереключаем
        if (chosen.length == 0 && !question.canBeSkipped) {
            alert('Question can\'t be skipped!');
            return false;
        }

        //Сохраняем варианты в объекте вопроса
        question.chosen = chosen;

        //Если направление назад и мы на первом вопросе - останавливаем переключение
        if (direction == -1 && this.currentIndex == 0 ) {
            return false;

        }
        //Если мы на последнем вопросе и направление вперед - останавливаемся
        else if (direction == 1 && this.currentIndex == this.questions.length - 1) {
            return false;
        }

        //Устанавливаем значение нового текущего вопроса.
        this.currentIndex += direction;

        //Удаляем предыдущий вопрос
        this.removeQuestion();
        
        this.showQuestion();
        //Вставляем новый
        this.renderQuestion();

        return true;
    }
};