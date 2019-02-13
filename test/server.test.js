const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');
const fs = require('fs');

chai.use(chaiHttp);

describe('NodeJS Assignment', () => {

	describe('/outputFileContents', () => {
		let testString = 'This is the example file. For NodeJS assignment. Some more text here.';
		it('should fetch data from data/example.txt', (done) => {
			chai.request(server)
				.get('/outputFileContents')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.text).to.equal(testString);
				});
			done();
		});
	});

	describe('/multiply', () => {
		let x = 2;
		let y = 3;
		it('should give correct result of multiplication', (done) => {
			chai.request(server)
				.get(`/multiply?x=${x}&y=${y}`)
				.end((err, res) => {
					expect(res.text).to.equal(`The result is: ${x*y}`);
				});
			done();
		});
		it('should give correct response on wrong input', (done) => {
			chai.request(server)
				.get(`/multiply?x=x&y=${y}`)
				.end((err, res) => {
					expect(res.text).to.equal('The result is: NaN');
				});
			chai.request(server)
				.get(`/multiply?x=x&y=${y}&z=z`)
				.end((err, res) => {
					expect(res.text).to.equal('Send two parameters only');
				});
			chai.request(server)
				.get(`/multiply?y=y&z=${y}`)
				.end((err, res) => {
					expect(res.text).to.equal('Set the parameters as x and y.\nFor Example: http://localhost:3001/multiply?x=7&y=4');
				});
			done();
		});
	});

	describe('/fileWrite', () => {
		it('should write to the required file', (done) => {
			let testString = {
				'text': 'Some text to be tested'
			};
			chai.request(server)
				.post('/fileWrite')
				.set('Content-type', 'application/json')
				.send(testString)
				.end((err, res) => {
					let content = fs.readFileSync(__dirname + '/../data/thirdQuesOutput.txt', 'utf-8');
					expect(content).to.equal(testString['text']);
				});
			done();
		});
		it('should display appropriate error message', (done) => {
			let testString = {
				'text': 'Some text to be tested',
				'text2': 'Some other random text'
			};
			chai.request(server)
				.post('/fileWrite')
				.set('Content-type', 'application/json')
				.send(testString)
				.end((err, res) => {
					expect(res.text).to.equal('Send one body content. In JSON format. Make sure to set header "Content-type" to "application/json"');
				});
			done();
		});
	});

	describe('/nonRepeatingCharacter', () => {
		it('should get the first non-repeating character', (done) => {
			let string = 'abhishek';
			chai.request(server)
				.get(`/nonRepeatingCharacter?string=${string}`)
				.end((err, res) => {
					expect(res.text).to.equal('Non-repeating character is: a');
				})
			done();
		});
		it('should display no non-repeating character if none exist', (done) => {
			let string = 'aabbcc';
			chai.request(server)
				.get(`/nonRepeatingCharacter?string=${string}`)
				.end((err, res) => {
					expect(res.text).to.equal('No non-repeating character');
				})
			done();
		});
		it('should display appropriate error message if wrong input given', (done) => {
			let string = 'aabbcc';
			chai.request(server)
				.get(`/nonRepeatingCharacter?ing=${string}`)
				.end((err, res) => {
					expect(res.text).to.equal('Set string parameter.');
				})
			done();
		});
	});
});