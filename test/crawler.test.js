const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
import 'babel-polyfill';

import {
	getSiteData,
	getLinkStatus,
	getLinks,
	getOneLevelLinks,
	isLinkClean
} from '../crawler';

chai.use(chaiHttp);
let website = {};

describe('Crawler program', () => {
	describe('getOneLevelLinks', () => {
		it('returns correct output', () => {
			let site = 'https://www.google.co.in';
			let domain = 'www.google.co.in';
			getOneLevelLinks(site, 0, domain).then((res) => {
				expect(res).to.be.an('object');
			})
		});
		it('returns empty object on error', () => {
			let site = 'https://www.gogle.co.in';
			let domain = 'www.google.co.in';
			getOneLevelLinks(site, 0, domain).catch((err) => {
				expect(err).to.be.true;
			});
		});
	});
	describe('getSiteData', () => {
		it('gets called', () => {
			let site = 'https://www.google.co.in';
			getSiteData(site).then((res) => {
				Object.assign(website, res);
				expect(res).to.exist;
			})

		});
	});
	describe('getLinkStatus', () => {
		it('returns right message', () => {
			let site = 'https://www.google.co.in/en';
			let domain = 'www.google.co.in';
			let response = getLinkStatus(site, domain);
			expect(response).to.be.true;
		});
		it('displays approppriate error message', () => {
			let site = 'https://www.google.co.in/en';
			let domain = 'www.facebook.com';
			let response = getLinkStatus(site, domain);
			expect(response).to.not.be.true;
		})
	});
	describe('isLinkClean', () => {
		it('returns right message', () => {
			let site = 'https://www.google.co.in/en';
			let domain = 'www.google.co.in';
			let response = isLinkClean(site, domain);
			expect(response).to.be.true;
		});
		it('displays approppriate error message', () => {
			let site = 'https://www.google.co.in/en';
			let domain = 'www.facebook.com';
			let response = isLinkClean(site, domain);
			expect(response).to.not.be.true;
		})
	});
	describe('getLinks', () => {
		it('returns a document map', () => {
			let tag = 'a';
			let website = {};
			getSiteData('https://www.google.co.in').then((res) => {
				Object.assign(website, res);
				getLinks(website, tag).then((resp) => {
					expect(resp).to.exist;
				}).catch((err) => {
					expect(err).to.exist;
				})
			});
		});
	});
});