/*
	Math.randomInt(max) - видає випадкове ціле число від 0 до max не включаючи max.

	Math.randomItem(arr) - видає випадкове значення з масива.

	xht(file, callback) - отримує з сервера модуль (розширення і папку /xht/ вказувати не треба, лише внутрішні підпапки за наявності) та після отримання запускає callback-функцію, в яку передає отриманий html-код модуля.
		Якщо callback-функцію не задано - html-код модуля буде влаштовано в головний блок.
		xht('test', fun) - отримає модуль /xht/test.xht і передасть у функцію fun html-код модуля
		xht('hey/ho') - отримає модуль /xht/hey/ho.xht і влаштовує html-код модуля в головний блок

	pull(url, callback) - відправляє get-запит на сервер і викликає callback-функцію з отриманим json.
		папку /php/ в запиті вказувати не потрібно, лише файл, дані та підпапку в разі потреби
*/

Math.randomInt = function (max){ return Math.floor(Math.random() * max); }
Math.randomItem = function (arr){ return arr[Math.randomInt(arr.length)]; }

const xht = function (file, callback){ if (!callback) callback = function (html){ $g.html(html); }; fetch('/xht/' + file + '.xht').then(resp => resp.text()).then(callback); }
const pull = function (url, callback){ fetch('/php/' + url).then(resp => resp.json()).then(callback); }
