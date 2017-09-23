import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const Table = ({data}) => (
	<div>
		<BootstrapTable data={data} striped={true} hover={true}>
			<TableHeaderColumn
				dataField="id"
				isKey={true}
				dataAlign="center"
				dataSort={true}
				width="5%"
			>
				Código
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name" dataSort={true} width="10%">
				Nombre
			</TableHeaderColumn>
			<TableHeaderColumn dataField="idParent" dataSort={true} width="5%">
				Código Padre
			</TableHeaderColumn>
			<TableHeaderColumn dataField="nameParent" dataSort={true} width="10%">
				Descripción Padre
			</TableHeaderColumn>
		</BootstrapTable>
	</div>
);

export default Table;
