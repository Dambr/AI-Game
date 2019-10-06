const mysql = require('mysql');
const fs = require('fs');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'test'
});

const defaultValue = 1 / require('./First').solutions.length;
const events = require('./First').events;
const insertQuery = 'Событие VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, ' + require('./First').solutions.join(` DOUBLE NOT NULL DEFAULT ${defaultValue}, `) + ` DOUBLE NOT NULL DEFAULT ${defaultValue}`;


new Promise(function(response, reject){
	connection.query('DROP TABLE test', (err, res) => {
		console.log('Прежние данные стерты');
		// Конфигурация таблицы
		connection.query('CREATE TABLE test(' + 'id INT AUTO_INCREMENT PRIMARY KEY, ' + insertQuery + ')', (err, res) => {
			if (err) throw err;
			console.log('Новые данные сконфигурированы');
			response();
		});
	});
})
.then(
	() => {
		// Заполнение таблицы новыми данными
		for (let event of events){
			connection.query('INSERT INTO test(Событие) VALUES(\'' + event + '\')', (err, res) => {
				if (err) throw err;
			});
		}
	}
)
.then(
	() => {
		let main = require('./Helper.js');
		main();
	}
)
.then(
	() => {
		// Запись в файл принятия решений
		connection.query('SELECT * FROM test', (err, res) => {
			if (err) throw err;
			fs.writeFileSync('file.json', JSON.stringify(res, null, 4));
			console.log('Файл записан успешно');
		});
	}
)
.then(
	() => {
		connection.end();
	}
);
