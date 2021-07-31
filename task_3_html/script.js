// Задание на замыкания
// Напишите функцию “Бюджет”. Внешняя функция создаст Бюджет, а вызов
// внутренней добавляет переданную ЗП в бюджет.
// Попробуйте создать несколько бюджетов.

function func () {
    let budget = [300,600];
    return function (num) {
    budget.push(num)
    console.log(budget)
    };
};

const salary1 = func();
salary1(200);
salary1(220);
salary1(240);


const salary2 = func();
salary2(800);



// Задание на замыкания и декораторы

// Используя декораторы реализуйте кэширование результата выполнения ресурсоемких функций, например этой (весь код
// внутри только для того, чтобы функция была медленной):

// multiple = (a, b) => {

// const stamp = new Date().getTime();

// while (new Date().getTime() < stamp + 2000) {}

// return a*b;

// }

// Декоратор должен принимать 2 параметра “a” и “b” - это числа.

// Внутренняя переменная cache у декоратора должна хранить результаты вычислений основной функции, где ключом одного
// такого результата будет комбинация значений аргументов “a” и “b” (например `${a}-${b}`), а значением и будет результат
// основной функции (multiple(a, b)).

// Таким образом, каждое обращение с определенным набором аргументов к декоратору, сразу будет проверять наличие уже
// вычисленного значения в кэше и если оно там есть, то возвращать его, но если такого значения еще нету будет вычислять
// новое (вызывать multiple()) и класть его в кэш.

// Вопрос: Что это нам даст?

// Ответ: Функция multiple довольно долго вычисляет результаты, поэтому есть смысл хранить уже вычисленные комбинации
// в кэше и при запросе к этой функции с теми же параметрами нам уже не нужно будет ждать, тем самым мы экономим
// время, вычисляя каждую комбинацию только один раз, ибо второй и последующие обращения просто вернут результат из
// кэша.


const multiple = (a, b) => {
    const stamp = new Date().getTime();
    while (new Date().getTime() < stamp + 2000) {}
    return a * b;
  };
  
  console.log(multiple(2, 3));
  
  function decorate() {
    const cache = new Map();
  
    return function (a, b) {
      const key = `${a}-${b}`;
      if (cache.has(key)) {
        return cache.get(key);
      } else {
        const result = multiple(a, b);
        cache.set(key, result);
        return result;
      }
    };
  }
  
  const newMultiple = decorate();
  
  console.log(newMultiple(3, 1));
  console.log(newMultiple(2, 1));
  console.log(newMultiple(1, 1));
  console.log(newMultiple(3, 1));
  console.log(newMultiple(2, 1));
  console.log(newMultiple(1, 1));
  console.log(newMultiple(3, 1));
  console.log(newMultiple(2, 1));
  console.log(newMultiple(1, 1));
