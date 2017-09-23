import React, {Component} from 'react';
import Table from './Table';

class Ubigeos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Departament: [],
			Province: [],
			District: []
		};

		this._getFile = this._getFile.bind(this);
	}

	_getFile(e) {
		const self = this;
		let fileUbigeos = e.target.files[0],
			data = [],
			Departament = [],
			Province = [],
			District = [];
		const reader = new FileReader();

		reader.onload = function(e) {
			const result = e.target.result;

			data = self._getSplit(result, '\n');
			data.map(d => {
				let item = d.replace(/^“|”$/g, '');
				let array_item = self._getSplit(item, '/');
				let idDept = '',
					nameDept = '',
					idProv = '',
					nameProv = '',
					idDist = '',
					nameDist = '';

				array_item.map((a_i, index) => {
					const id = a_i.match(/\d+/g) ? a_i.match(/\d+/g) : [];
					const name = a_i.match(/\D+/g) ? a_i.match(/\D+/g) : [];

					let idUbi = id.filter(num => num.trim() != '')[0];
					idUbi = idUbi === undefined ? '' : idUbi.trim();

					let nameUbi = name.filter(str => str.trim() != '')[0];
					nameUbi = nameUbi === undefined ? '' : nameUbi.trim();

					if (index === 0) {
						idDept = idUbi;
						nameDept = nameUbi;
					} else if (index === 1) {
						idProv = idUbi;
						nameProv = nameUbi;
					} else if (index === 2) {
						idDist = idUbi;
						nameDist = nameUbi;
					}
				});

				const existDep = self._searchUbigeo(Departament, idDept);
				if (existDep.length === 0 && idDept !== '') {
					Departament = Departament.concat({
						id: idDept,
						name: nameDept
					});
				}

				const existProv = self._searchUbigeo(Province, idProv);
				if (existProv.length === 0 && idProv !== '') {
					Province = Province.concat({
						id: idProv,
						name: nameProv,
						idParent: idDept
					});
				}

				const existDist = self._searchUbigeo(District, idDist);
				if (existDist.length === 0 && idDist !== '') {
					District = District.concat({
						id: idDist,
						name: nameDist,
						idParent: idProv
					});
				}
			});
			self._ubigeoUpdate(Departament, Province, District);
		};

		reader.readAsText(fileUbigeos);
	}

	_getSplit(dataSplit, separator) {
		return dataSplit.trim().split(separator);
	}

	_searchUbigeo(dataSearch, search) {
		return dataSearch.filter(das => das.id === search);
	}

	_searchParent(array, arrayParent) {
		let result = [];
		array.map(a => {
			const parent = this._searchUbigeo(arrayParent, a.idParent)[0];
			if (!parent) {
				result = result.concat({
					id: a.id,
					name: a.name,
					idParent: '-',
					nameParent: '-'
				});
			} else {
				result = result.concat({
					id: a.id,
					name: a.name,
					idParent: parent.id,
					nameParent: parent.name
				});
			}
		});
		return result;
	}
	_ubigeoUpdate(Departament, Province, District) {
		const Dep = this._searchParent(Departament, []);
		const Prov = this._searchParent(Province, Departament);
		const Dist = this._searchParent(District, Province);

		this.setState({
			Departament: Dep,
			Province: Prov,
			District: Dist
		});
	}

	render() {
		const {Departament, Province, District} = this.state;

		return (
			<div className="container">
				<h1> Ubigeos </h1>
				<input type="file" id="fileText" onChange={this._getFile} className="btn btn-primary" />
				<div >

					<h2>Departamentos</h2>
					<Table data={Departament} />

					<h2>Provincias</h2>
					<Table data={Province} />

					<h2>Distrito</h2>
					<Table data={District} />
				</div>
			</div>
		);
	}
}

export default Ubigeos;
