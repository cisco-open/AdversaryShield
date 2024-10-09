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

import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'const/ROUTES';
import { useState } from 'react';
import { createPlugin } from 'services/api';
import { PluginParamsItem } from 'services/inrfaces-api';

function AddPlugin() {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const [plugin, setPlugin] = useState<string | ArrayBuffer | null>();
	const [params, setParams] = useState<PluginParamsItem[]>();

	const onFinish = (values: any) => {
		console.log('Success:', values);
		console.log('plugin', plugin);
		console.log('params', params);

		if (!plugin || !params) return;

		createPlugin({plugin: {
			plugin_name: values.name,
			plugin_url: `wwww.aaa${Math.random()}.aa`,
			parameters: params,
		}});

		setTimeout(() => {
			navigate('/' + ROUTES.PLUGINS);
		}, 200);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const pluginFile = (e: any) => {
		console.log('Upload event:', e);

		const reader = new FileReader();

		reader.onload = () => {
			console.log(reader.result);
			setPlugin(reader.result?.toString().split('base64,')[1]);
		};

		reader.readAsDataURL(e.target.files.item(0));

		console.log('plugin', plugin);
		return e?.target?.value;
	};

	const paramsFile = (e: any) => {
		console.log('Upload event:', e);
		const reader = new FileReader();

		reader.onload = () => {
			console.log(reader.result);
			setParams(JSON.parse(reader.result as string)?.params);
		};

		reader.readAsText(e.target.files.item(0));
		console.log('params', params);
		return e?.target?.value;
	};

	return (
		<>
			<h2>Add plugin</h2>

			<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
					<Button>
						<Link to={'/' + ROUTES.PLUGINS}>Cancel</Link>
					</Button>
				</Form.Item>

				<Form.Item
					name={'name'}
					label="name"
					rules={[
						{
							required: true,
							message: 'Please input name!',
						},
					]}
				>
					<Input></Input>
				</Form.Item>

				<Form.Item label="Plugin">
					<Form.Item
						name="plugin"
						getValueFromEvent={pluginFile}
						noStyle
						rules={[
							{
								required: true,
								message: 'Please add plugin file!',
							},
						]}
					>
						<Input type="file" accept=".gz"></Input>
					</Form.Item>
				</Form.Item>

				<Form.Item label="Params">
					<Form.Item
						name="params"
						getValueFromEvent={paramsFile}
						noStyle
						rules={[
							{
								required: true,
								message: 'Please add param file!',
							},
						]}
					>
						<Input type="file" accept=".json"></Input>
					</Form.Item>
				</Form.Item>
			</Form>
		</>
	);
}

export default AddPlugin;
