/**
 * Copyright 2024 Cisco Systems, Inc. and its affiliates
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { PluginItemApi, PluginParamsItem, PluginsApi } from 'services/inrfaces-api';
import { deletePlugin, getPlugins } from 'services/api';
import { Link } from 'react-router-dom';

import './plugins-table.scss';

function arrayDiv(d?: PluginParamsItem<string>[]): JSX.Element {
	return (
		<div>
			{d?.map((d) => (
				<div key={d.parameter_key}>{d.parameter_key}: {d.parameter_type}; 
				mandatory: {d.is_mandatory.toString()},
				read_only: {d.is_read_only.toString()},
				default: {d.default_value?.toString() || 'not set'}</div>
			))}
		</div>
	);
}

const columns: TableColumnsType<PluginItemApi> = [
	{
		title: 'Name',
		dataIndex: ['plugin', 'plugin_name'],
		render: (data, row): JSX.Element => <Link to={`${row.plugin.plugin_name}`}>{data}</Link>,
	},
	{
		title: 'Params',
		dataIndex: ['plugin',  'parameters'],
		render: arrayDiv,
	}
];

function PluginsTable() {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	// const [loading, setLoading] = useState(true);
	const [data, setData] = useState<PluginsApi | undefined>();
	useEffect(() => {
		getPlugins().then((data) => {
			setData(data);
		});
	}, []);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	return (
		<div className='container-plugins'>
			<div style={{ marginBottom: 16 }}>
				{!hasSelected ? (
					<Button>
						<Link to="add">Add plugin</Link>
					</Button>
				) : (
					<>
						<Button
							onClick={() => {
								if (data) {
									deletePlugin({
										plugins: data.plugins.filter((item) =>
											selectedRowKeys.includes(item.plugin.plugin_name),
										),
									});
									setData({
										...data,
										plugins: data.plugins.filter(
											(item) => !selectedRowKeys.includes(item.plugin.plugin_name),
										),
									});
									setSelectedRowKeys([]);
								}
							}}
						>
							Delete
						</Button>
						<span style={{ marginLeft: 8 }}>
							{`${selectedRowKeys.length} Selected items`}
						</span>
					</>
				)}
			</div>
			<Table
				rowKey={(row) => row.plugin.plugin_name}
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data?.plugins}
			/>

		</div>
	);
}

export default PluginsTable;
