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

import { Button, Checkbox, Form, Input, Layout, Select, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPlugin, getPlugin, updatePlugin } from 'services/api';
import {
	ParamsTypes,
	PluginItem,
	PluginItemApi,
	PluginParamsItem,
} from 'services/inrfaces-api';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './plugin.scss';
import { renderInput } from './utils';
import { ROUTES } from 'const/ROUTES';
import Title from 'antd/es/typography/Title';

function Plugin({ createMode = false }): JSX.Element {
	const [form] = Form.useForm();
	const { name } = useParams();
	const navigate = useNavigate();

	const [plugin, setPlugin] = useState<PluginItem>({
		parameters: [],
		plugin_name: '',
		plugin_url: '',
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, triggerUpdate] = useState();

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	useEffect(() => {
		if (!name) return;
		getPlugin(name).then((data) => {
			if (!data) return;
			setPlugin(data.plugin);
			form.setFieldsValue(data.plugin);
		});
	}, [name]);

	const onFinish = (values: PluginItem) => {
		const result: PluginItemApi = {
			plugin: { ...values },
		};
		if (plugin.id !== undefined) {
			result.plugin.id = plugin.id;
		}
		if (name) {
			result.plugin.plugin_name = name;
		}
		console.log('Success result', result);
		if (createMode) {
			createPlugin(result);
		} else {
			updatePlugin(result);
		}
		setTimeout(() => {
			navigate('/' + ROUTES.PLUGINS);
		}, 200);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const defaultVal: PluginParamsItem = {
		parameter_key: '',
		parameter_type: ParamsTypes.string,
		is_mandatory: false,
		is_read_only: false,
	};

	return (
		<div className="test-suite">
			<Form
				form={form}
				initialValues={plugin}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<div className="test-suite-header">
					{createMode ? (
						<Form.Item
							name="plugin_name"
							rules={[
								{
									required: true,
									message: 'Please input name!',
								},
							]}
							style={{
								margin: '12px 0'
							}}
						>
							<Input addonBefore="Name"></Input>
						</Form.Item>
					) : (
						<h2>{name}</h2>
					)}
					<Button
						onClick={() => {
							form.submit();
						}}
					>
						Save
					</Button>
					<Button>
						<Link to={'/' + ROUTES.PLUGINS}>Cancel</Link>
					</Button>
				</div>

				<Layout>
					<div
						style={{
							flex: 'auto',
							margin: '24px 16px',
							paddingRight: 24,
							minHeight: 280,
						}}
					>
						<div
							style={{
								margin: '24px 16px',
								padding: 24,
								paddingBottom: 2,
								minHeight: 280,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
								width: '100%',
							}}
						>
							<Form.Item
								name="plugin_url"
								rules={[
									{
										required: true,
										message: 'Please input url!',
									},
								]}
							>
								<Input addonBefore="URL"></Input>
							</Form.Item>

							<Form.List name="parameters">
								{(fields, { add, remove }, { errors }) => (
									<>
										{fields.map((field, index) => (
											<div key={field.key} className="row">
												<Form.Item name={[field.name, 'parameter_type']}>
													<Select
														onChange={(value) => {
															form.setFieldValue(
																['parameters', field.name, 'default'],
																undefined,
															);
															triggerUpdate(value);
														}}
													>
														<Select.Option value={ParamsTypes.string}>String</Select.Option>
														<Select.Option value={ParamsTypes.integer}>Integer</Select.Option>
													</Select>
												</Form.Item>

												<Form.Item
													name={[field.name, 'parameter_key']}
													rules={[
														{
															required: true,
															message: 'Please input key!',
														},
													]}
												>
													<Input addonBefore="Key"></Input>
												</Form.Item>

												<Form.Item
													name={[field.name, 'is_mandatory']}
													valuePropName="checked"
												>
													<Checkbox>Mandatory</Checkbox>
												</Form.Item>
												<Form.Item
													name={[field.name, 'is_read_only']}
													valuePropName="checked"
												>
													<Checkbox>Read only</Checkbox>
												</Form.Item>

												<Form.Item name={[field.name, 'default_value']}>
													{renderInput(form.getFieldValue('parameters')?.[field.name])}
												</Form.Item>

												<Form.Item>
													<MinusCircleOutlined
														className="dynamic-delete-button"
														onClick={() => remove(field.name)}
													/>
												</Form.Item>
											</div>
										))}

										<Form.Item>
											<Button
												type="dashed"
												onClick={() => add(defaultVal)}
												style={{
													width: '60%',
												}}
												icon={<PlusOutlined />}
											>
												Add Parameter
											</Button>
											<Form.ErrorList errors={errors} />
										</Form.Item>
									</>
								)}
							</Form.List>
						</div>
					</div>
				</Layout>
			</Form>
		</div>
	);
}

export default Plugin;
