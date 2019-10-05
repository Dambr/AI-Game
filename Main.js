const mysql = require('mysql');
const fs = require('fs');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'test'
});

const defaultValue = 1 / require('./First').solutions.length;
const solutions = require('./First').solutions;
const insertQuery = 'Решение VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, ' + require('./First').stb.join(` DOUBLE NOT NULL DEFAULT ${defaultValue}, `) + ` DOUBLE NOT NULL DEFAULT ${defaultValue}`;
const stb = '\'' + require('./First').stb.join('\', \'') + '\'';


new Promise(function(response, reject){
	connection.query('DROP TABLE test', function(err, res){
		console.log('Прежние данные стерты');
		// Конфигурация таблицы
		connection.query('CREATE TABLE test(' + 'id INT AUTO_INCREMENT PRIMARY KEY, ' + insertQuery + ')',
		function(err, res){
			if (err) throw err;
			console.log('Новые данные сконфигурированы');
			response();
		});
	});
})
.then(
	() => {
		// Заполнение таблицы новыми данными
		for (let solution of solutions){
			connection.query('INSERT INTO test(Решение) VALUES(\'' + solution + '\')');
		}
	}
)
.then(
	() => {
		require('./Helper.js')();
	}
)
.then(
	() => {
		// Запись в файл принятия решений
		connection.query('SELECT * FROM test', function(err, res){
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
