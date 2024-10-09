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


import {
	// UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { PathRouteProps } from "react-router-dom";
import Home from "pages/home/home";
// import Test2 from "pages/test2/test2";
import PluginsTable from "pages/test-suites-table/plugins-table";
import Plugin from "pages/plugin/plugin";

export enum ROUTES {
  HOME = '/',
  PLUGINS = 'plugins',
  PLUGIN_ADD = 'plugins/add',
  PLUGIN = 'plugins/:name',
}

export const MenuItems = [
  {
    key: ROUTES.HOME,
    icon: <UserOutlined />,
    label: 'Home',
  },
  {
    key: ROUTES.PLUGINS,
    icon: <VideoCameraOutlined />,
    label: 'Plugins',
  },
];

export const AppRoutes: PathRouteProps[] = [
  {
    path: ROUTES.HOME,
    element: <Home></Home>
  },
  {
    path: ROUTES.PLUGIN_ADD,
    element: <Plugin createMode={true}></Plugin>
  },
  {
    path: ROUTES.PLUGINS,
    element: <PluginsTable></PluginsTable>
  },
  {
    path: ROUTES.PLUGIN,
    element: <Plugin></Plugin>
  },
];
