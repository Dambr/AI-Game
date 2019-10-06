// Умножение матриц
function multiplyMatrix(A,B){
	let rowsA = A.length, colsA = A[0].length,
		rowsB = B.length, colsB = B[0].length;
	let C = [];
	if (colsA != rowsB) return false;
	for (let i = 0; i < rowsA; i++){
		C[i] = [];	
	}
	for (let k = 0; k < colsB; k++){
		for (let i = 0; i < rowsA; i++){
			let temp = 0;
			for (let j = 0; j < rowsB; j++){
				temp += A[i][j]*B[j][k];
			}
			C[i][k] = temp;
		}
	}
	return C;
}
// Транспланирование матрицы
const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

module.exports = () => {
	
}